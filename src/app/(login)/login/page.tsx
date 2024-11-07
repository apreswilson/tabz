"use client";
import React, { useEffect, useActionState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { loginUser } from "../actions";

const initialState = {
   message: "",
   success: false,
   redirectUrl: ""
};

function SubmitButton() {
   const { pending } = useFormStatus();

   return (
      <button type="submit" aria-disabled={pending} className={styles.submit}>Sign In</button>
   )
}

export default function Login() {

   const [state, formAction] = useActionState(loginUser, initialState);

   useEffect(() => {
      if (state.success && state.redirectUrl) {
         window.location.href = `${state.redirectUrl}?loggedIn=true`;
      }
   })

   return (
      <main className={styles.login_page}>
         <form className={styles.login_form} action={formAction}>
            <h1>Sign In</h1>
            <div className={styles.email}>
               <label htmlFor="email">Email</label>
               <input type="text" id="email" name="email"></input>
            </div>
            <div className={styles.password}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password" name="password"></input>
            </div>
            <SubmitButton />
            <p>{state?.message}</p>
            <div className={styles.bar}></div>
            <p>Don&apos;t have an account? <Link href="/signup">Sign Up</Link></p>
            <Link href="#">Forgot Password?</Link>
         </form>
      </main >
   )
}