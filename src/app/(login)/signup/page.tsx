"use client";
import styles from "./signup.module.scss";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "../actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
const initialState = {
   message: "",
   success: false,
};

function SubmitButton() {
   const { pending } = useFormStatus();

   return (
      <button type="submit" aria-disabled={pending} className={styles.submit}>Sign Up</button>
   )
}

export default function Signup() {

   const router = useRouter();
   const [state, formAction] = useActionState(createUser, initialState);

   useEffect(() => {
      if (state.success) {
         router.back();
      }
   })

   return (
      <main className={styles.signup_page}>
         <form className={styles.signup_form} action={formAction}>
            <h1>Sign Up</h1>
            <div className={styles.fname}>
               <label htmlFor="fname">First Name</label>
               <input type="text" id="fname" name="fname" required></input>
            </div>
            <div className={styles.lname}>
               <label htmlFor="lname">Last Name</label>
               <input type="text" id="lname" name="lname" required></input>
            </div>
            <div className={styles.email}>
               <label htmlFor="email">Email</label>
               <input type="text" id="email" name="email" required></input>
            </div>
            <div className={styles.password}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password" name="password" required></input>
            </div>
            <SubmitButton />
            <p aria-live="polite" role="status">{state?.message}</p>
         </form>
      </main>
   )
}
