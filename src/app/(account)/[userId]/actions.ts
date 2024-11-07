"use server"

import dbConnect from "@/lib/dbconnect";
import Organization from "@/models/Organization";
import User from "@/models/User";
import { cookies } from "next/headers";
import { z } from "zod";
import { UpdateUser } from "./account/form";
import { hash } from "bcrypt";
import { encrypt } from "@/lib/encrypt";


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
         })
         return { message: "Organization successfully created", success: true, orgname: data.organizationName, timepassed: dateString }
      }
   } catch (error) {
      console.error("Error creating user: ", error);
      return { message: "An error occurred creating the user, please refresh the page and try again." };
   }
}

export async function updateUserOrganizationList(userId: string, orgname: string) {
   const getOrganizationFromDB = await Organization.findOne({ organizationName: orgname });
   const dateobj = new Date();
   const dateString = `Joined: ${dateobj.getMonth() + 1}/${dateobj.getDate()}/${dateobj.getFullYear()}`;
   await User.findOneAndUpdate(
      { _id: userId },
      { $push: { organizations: { _id: getOrganizationFromDB._id, name: getOrganizationFromDB.organizationName, joined: dateString } } },
      { new: true }
   )
   await updateSession(userId);
}

export async function leaveOrganization(userId: string, organizationName: string) {
   await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { organizations: { name: organizationName } } },
      { new: true }
   )
   await updateSession(userId);
}

export async function updateUserData(originalUserData: UpdateUser, userFormInput: UpdateUser) {
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

export async function updateSession(inputValue: string) {
   const idRegex = /^[a-f\d]{24}$/i;
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

   if (!idRegex.test(inputValue) && emailRegex.test(inputValue)) {
      //If email
      console.log("Email update")
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