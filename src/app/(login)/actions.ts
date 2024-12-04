"use server";
import dbConnect from "@/lib/dbconnect";
import User, { UserInterface } from "@/models/User";
import { z } from "zod";
import { hash, compare } from "bcrypt";
import { encrypt } from "@/lib/encrypt";
import { cookies } from "next/headers";
import { SessionInterface } from "@/lib/definitions";


export async function createUser(prevState: { message: string; }, formData: FormData) {
   const SignupSchema = z.object({
      firstName: z.string().min(2).trim(),
      lastName: z.string().min(2).trim(),
      email: z.string().email().trim(),
      password: z.
         string()
         .min(8)
         .regex(/[a-zA-Z]/)
         .regex(/[0-9]/)
         .regex(/[^a-zA-Z0-9]/)
         .trim()
   })

   const formValues = {
      firstName: formData.get("fname"),
      lastName: formData.get("lname"),
      email: formData.get("email"),
      password: formData.get("password")
   }

   const parse = SignupSchema.safeParse(formValues);

   if (!parse.success) {
      return { message: "First and last name must be 2 characters. Email must be a valid email address. Password must be 8 characters and include 1 letter, number, and special character." }
   }

   const data = parse.data;

   try {
      await dbConnect();

      const checkIfEmailAlreadyExists = await User.exists({ email: data.email });

      if (checkIfEmailAlreadyExists) {
         return { message: "A user with this email address already exists." }
      } else {
         const encryptPW = await hash(data.password, 10);

         await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encryptPW,
            invites: [],
            organizations: []
         });

         return { message: "User successfully created", success: true };
      }
   } catch (error) {
      console.error("Error creating user:", error)
      return { message: "An error occurred creating the user, please refresh the page and try again." }
   }
}

export async function loginUser(prevState: { message: string }, formData: FormData) {
   const LoginSchema = z.object({
      email: z.string().email().trim(),
      password: z.
         string()
         .min(8)
         .regex(/[a-zA-Z]/)
         .regex(/[0-9]/)
         .regex(/[^a-zA-Z0-9]/)
         .trim()
   })

   const formValues = {
      email: formData.get("email"),
      password: formData.get("password")
   }

   const parse = LoginSchema.safeParse(formValues);

   if (!parse.success) {
      return { message: "Email or password entered was invalid." }
   }

   const data = parse.data;

   try {
      await dbConnect();
      const fetchMatchingEmail: UserInterface = await User.findOne({ email: data.email }) as UserInterface;
      if (!fetchMatchingEmail) {
         return { message: "No account found with the entered email address." }
      } else {
         const comparePasswords = await compare(data.password, fetchMatchingEmail.password);
         const userData = {
            _id: fetchMatchingEmail._id,
            firstName: fetchMatchingEmail.firstName,
            lastName: fetchMatchingEmail.lastName,
            email: fetchMatchingEmail.email,
            invites: fetchMatchingEmail.invites,
            organizations: fetchMatchingEmail.organizations
         }

         if (comparePasswords) {
            const session = await encrypt({ userData });
            (await cookies()).set({
               name: "session",
               value: session,
               httpOnly: true,
               path: "/",
               secure: true
            })

            return { message: "Logging in", success: true, redirectUrl: `/${userData._id}/home` };
         } else {
            return { message: "Login failed" };
         }
      }
   } catch (error) {
      console.error("Error logging in:", error);
      return { message: "An error occurred while logging in, please refresh the page and try again." }
   }
}