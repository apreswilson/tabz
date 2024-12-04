"use server"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Organization from "@/models/Organization";
import User from "@/models/User";
import { cookies } from "next/headers";
import { z } from "zod";
import { UpdateUser } from "./account/form";
import { hash } from "bcrypt";
import { decrypt, encrypt } from "@/lib/encrypt";
import { SessionInterface } from "@/lib/definitions";
import { UserInputData } from "@/components/account-pages/add-task/add-task";
import { TasksInterface } from "./[organizationId]/tasks/page";
import { revalidatePath } from "next/cache";
import { FormDataInput } from "@/components/account-pages/edit-member/edit-member";


export async function logout() {
   (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function createNewOrganization(prevState: { message: string }, formData: FormData) {
   const CreateSchema = z.object({
      organizationName: z.string().min(2)
   })

   const formValue = {
      organizationName: formData.get("org-name")
   }
   const parse = CreateSchema.safeParse(formValue);
   if (!parse.success) return { message: "Error creating organization. Must be minimum 2 characters." }
   const data = parse.data;

   try {
      await dbConnect();

      const checkIfOrganizationExists = await Organization.exists({ organizationName: data.organizationName });

      if (checkIfOrganizationExists) return { message: "This organization already exists." }
      else {
         const dateobj = new Date();
         const dateString = `${dateobj.getMonth() + 1}/${dateobj.getDate()}/${dateobj.getFullYear()}`;
         await Organization.create({
            organizationName: data.organizationName,
            dateCreated: dateString,
            roles: [
               {
                  roleName: "Owner",
                  permissions: {
                     shout: true,
                     calendar: true,
                     member: true,
                     invite: true,
                     task: true,
                     admin: true
                  }
               },
               {
                  roleName: "Guest",
                  permissions: {
                     shout: false,
                     calendar: false,
                     member: false,
                     invite: false,
                     task: false,
                     admin: false
                  }
               }
            ]
         })
         return { message: "Organization successfully created", success: true, orgname: data.organizationName, timepassed: dateString }
      }
   } catch (error) {
      console.error("Error creating user: ", error);
      return { message: "An error occurred creating the user, please refresh the page and try again." };
   }
}

export async function updateUserOrganizationList(userId: string, orgname: string) {
   await dbConnect();
   const getOrganizationFromDB = await Organization.findOne({ organizationName: orgname });
   const dateobj = new Date();
   const dateString = `${dateobj.getMonth() + 1}/${dateobj.getDate()}/${dateobj.getFullYear()}`;
   await User.findOneAndUpdate(
      { _id: userId },
      { $push: { organizations: { _id: getOrganizationFromDB._id, name: getOrganizationFromDB.organizationName, joined: dateString, role: "Owner" } } },
      { new: true }
   )
   const getUser = await User.findOne({ _id: userId });
   let userRoleInOrganization = "Guest"
   Object.values(getUser.organizations).map((organization: any) => {
      if (getOrganizationFromDB.organizationName === organization.name) {
         userRoleInOrganization = organization.role
      }
   })
   await Organization.findOneAndUpdate(
      { organizationName: orgname },
      {
         $push: {
            members: {
               _id: getUser._id,
               memberName: `${getUser.firstName} ${getUser.lastName}`,
               memberEmail: getUser.email,
               role: userRoleInOrganization
            }
         }
      },
      { new: true }
   )
   await updateSession(userId);
}

export async function leaveOrganization(userId: string, organizationName: string) {
   await dbConnect();
   await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { organizations: { name: organizationName } } },
      { new: true }
   )
   await updateSession(userId);
}

export async function updateUserData(originalUserData: UpdateUser, userFormInput: UpdateUser) {
   await dbConnect();
   const nameRegex = /^[a-zA-Z]{2,}$/;
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_]).{8,}$/;
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

   const confirmedFirstName = nameRegex.test(userFormInput.firstName) ?
      userFormInput.firstName.charAt(0).toUpperCase() + userFormInput.firstName.slice(1).toLowerCase()
      :
      originalUserData.firstName;
   const confirmedLastName = nameRegex.test(userFormInput.lastName) ?
      userFormInput.lastName.charAt(0).toUpperCase() + userFormInput.lastName.slice(1).toLowerCase()
      :
      originalUserData.lastName;
   const confirmedEmail = emailRegex.test(userFormInput.email) ?
      userFormInput.email
      :
      originalUserData.email;
   const confirmedPassword = passwordRegex.test(userFormInput.password as string) ?
      true
      :
      false;

   if (!confirmedPassword) {
      await User.findOneAndUpdate(
         { email: originalUserData.email },
         {
            firstName: confirmedFirstName,
            lastName: confirmedLastName,
            email: confirmedEmail
         },
         { new: true }
      )
   } else {
      const hashedPW = await hash(userFormInput.password as string, 10);
      await User.findOneAndUpdate(
         { email: originalUserData.email },
         {
            firstName: confirmedFirstName,
            lastName: confirmedLastName,
            email: confirmedEmail,
            password: hashedPW
         },
         { new: true }
      )
   }
   await updateSession(confirmedEmail);
}

export async function createOrganizationSession(organizationId: string, userId: string) {
   await dbConnect();
   const getOrganizationFromDb = await Organization.findById({ _id: organizationId });
   const userData = await User.findById({ _id: userId });
   let userRole = "Guest"
   Object.values(userData.organizations).map((organization: any) => {
      if (organization.name === getOrganizationFromDb.organizationName) {
         userRole = organization.role
      }
   })

   const organizationData = {
      _id: getOrganizationFromDb._id,
      organizationName: getOrganizationFromDb.organizationName,
      dateCreated: getOrganizationFromDb.dateCreated,
      userRole
   }
   const session = await encrypt({ organizationData });
   (await cookies()).set({
      name: "org-session",
      value: session,
      httpOnly: true,
      path: "/",
      secure: true
   })
}

export async function removeOrganizationSession() {
   ((await cookies()).delete("org-session"));
}

export async function inviteNewMember(userEmail: string, organizationId: string, userId?: string) {
   await dbConnect();
   const getUserFromDB = await User.findOne({ email: userEmail });
   if (!getUserFromDB) return
   const getOrganizationFromDB = await Organization.findOne({ _id: organizationId })
   console.log(getUserFromDB, getOrganizationFromDB)
   const checkIfUserIsAlreadyInvited = getUserFromDB.invites.some((invite: any) =>
      invite._id.toString() === getOrganizationFromDB._id.toString()
   ) || false;
   const checkIfUserInOrganization = getOrganizationFromDB.members.some((member: any) =>
      member.memberEmail === userEmail
   ) || false;
   console.log(checkIfUserInOrganization, checkIfUserIsAlreadyInvited)
   if (!checkIfUserInOrganization && !checkIfUserIsAlreadyInvited) {
      await User.findOneAndUpdate(
         { email: userEmail },
         { $push: { invites: { _id: organizationId, name: getOrganizationFromDB.organizationName, } } },
         { new: true }
      )
   }
}

export async function acceptInvite(userId: string, inviteId: string, inviteName: string) {
   await dbConnect();
   await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { invites: { _id: inviteId } } },
      { new: true }
   )
   const dateobj = new Date();
   const dateString = `${dateobj.getMonth() + 1}/${dateobj.getDate()}/${dateobj.getFullYear()}`;
   await User.findOneAndUpdate(
      { _id: userId },
      { $push: { organizations: { _id: inviteId, name: inviteName, joined: dateString, role: "Guest" } } },
      { new: true }
   )
   const getUserFromDb = await User.findOne({ _id: userId });
   await Organization.findOneAndUpdate(
      { _id: inviteId },
      {
         $push: {
            members: {
               _id: userId,
               memberName: `${getUserFromDb.firstName} ${getUserFromDb.lastName}`,
               memberEmail: getUserFromDb.email,
               role: "Guest"
            }
         }
      }
   )
   await updateSession(userId);
}

export async function declineInvite(userId: string, inviteName: string) {
   await dbConnect();
   await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { invites: { name: inviteName } } },
      { new: true }
   )
   await updateSession(userId);
}

export async function createNewShout(organizationId: string, content: string, title: string, relevantRoles: object) {
   await dbConnect();
   const cookieStore = (await cookies()).get('session');
   const decryptValue = cookieStore ? await decrypt(cookieStore?.value) : null;

   const getUserRole = (await cookies()).get("org-session");
   const decryptOrgRole = getUserRole ? await decrypt(getUserRole?.value) : null
   const roleOfUser = decryptOrgRole.organizationData.userRole;
   if (!decryptValue || !decryptOrgRole) return;
   const userData: SessionInterface = decryptValue.userData;

   await Organization.findOneAndUpdate(
      { _id: organizationId },
      {
         $push: {
            shouts: {
               $each: [
                  {
                     author: `${userData.firstName} ${userData.lastName}`,
                     authorRole: roleOfUser as string,
                     timePosted: new Date().toString(),
                     relevantRoles: relevantRoles,
                     title: title,
                     content: content
                  }
               ],
               $position: 0
            }
         }
      },
      { new: true }
   )
}

export async function createNewTask(organizationId: string, formData: UserInputData, userId: string) {
   await dbConnect();
   await Organization.findByIdAndUpdate(
      { _id: organizationId },
      {
         $push: {
            tasks: {
               taskName: formData.task,
               roles: formData.role,
               priority: formData.priority,
               deadline: formData.deadline,
               status: formData.status
            }
         }
      },
      { new: true }
   )
}

export async function removeUserFromOrganization(userId: string, organizationId: string) {
   await dbConnect();
   await User.findOneAndUpdate(
      { _id: userId },
      {
         $pull: {
            organizations: {
               _id: organizationId
            }
         }
      },
      { new: true }
   )
   await Organization.findOneAndUpdate(
      { _id: organizationId },
      {
         $pull: {
            members: {
               _id: userId
            }
         }
      },
      { new: true }
   )
}

export async function updateTasksList(organizationId: string, updatedTasks: TasksInterface[], operationType: string, tasksToRemove: string[] | undefined, userId: string) {
   await dbConnect();
   for (const updatedTask of updatedTasks) {
      await Organization.updateOne(
         { _id: organizationId },
         {
            $set: {
               "tasks.$[task]": updatedTask
            }
         },
         {
            arrayFilters: [
               { "task._id": updatedTask._id }
            ]
         }
      )
   }
   if (tasksToRemove && tasksToRemove.length > 0 && operationType === "pop") {
      await Organization.updateOne(
         { _id: organizationId },
         {
            $pull: {
               tasks: {
                  _id: { $in: tasksToRemove }
               }
            }
         }
      )
   }

}

export async function editOrganizationMember(formData: FormDataInput) {
   await Organization.findOneAndUpdate(
      {
         _id: formData.organizationId,
         "members.memberEmail": formData.email
      },
      {
         $set: {
            "members.$.memberName": formData.name,
            "members.$.memberEmail": formData.email,
            "members.$.role": formData.role
         }
      }
   )
   await User.findOneAndUpdate(
      {
         email: formData.email,
         "organizations._id": formData.organizationId
      },
      {
         $set: {
            "organizations.$.role": formData.role
         }
      }
   )
}

export async function updateSession(inputValue: string) {
   await dbConnect();
   const idRegex = /^[a-f\d]{24}$/i;
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

   if (!idRegex.test(inputValue) && emailRegex.test(inputValue)) {
      //If email
      const getUserByEmail = await User.findOne({ email: inputValue });
      const userData = {
         _id: getUserByEmail._id,
         firstName: getUserByEmail.firstName,
         lastName: getUserByEmail.lastName,
         email: getUserByEmail.email,
         invites: getUserByEmail.invites,
         organizations: getUserByEmail.organizations
      }
      const session = await encrypt({ userData });

      (await cookies()).set({
         name: "session",
         value: session,
         httpOnly: true,
         path: "/",
         secure: true
      })

   } else {
      //If _id 
      console.log("Id update")
      const getUserById = await User.findOne({ _id: inputValue });
      const userData = {
         _id: getUserById._id,
         firstName: getUserById.firstName,
         lastName: getUserById.lastName,
         email: getUserById.email,
         invites: getUserById.invites,
         organizations: getUserById.organizations
      }
      const session = await encrypt({ userData });
      (await cookies()).set({
         name: "session",
         value: session,
         httpOnly: true,
         path: "/",
         secure: true
      })
   }
}