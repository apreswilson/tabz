"use client";
import styles from "./account.module.scss";
import { useRouter } from "next/navigation";
import { updateUserData } from "../actions";

export interface UpdateUser {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   password?: string;
}

export default function UserSettingsForm({ userData }: { userData: UpdateUser }) {
   const router = useRouter();

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const inputData = new FormData(event.currentTarget);
      const formValues = {
         _id: userData._id,
         firstName: inputData.get("fname") as string,
         lastName: inputData.get("lname") as string,
         email: inputData.get("email") as string,
         password: inputData.get("password") as string,
      }
      await updateUserData(userData, formValues);
      router.push(`/${userData._id}/home`);
   }

   return (
      <form className={styles.account_info} onSubmit={handleSubmit}>
         <h1>Account</h1>
         <div className={styles.fname}>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="fname" placeholder={userData.firstName}></input>
         </div>
         <div className={styles.lname}>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="lname" placeholder={userData.lastName}></input>
         </div>
         <div className={styles.email}>
            <label htmlFor="email-address">Email Address</label>
            <input type="text" id="email-address" name="email" placeholder={userData.email}></input>
         </div>
         <div className={styles.password}>
            <label htmlFor="pw">Password</label>
            <input type="password" name="password" placeholder="Password Hidden" id="pw"></input>
         </div>

         {/*Might get rid of color theme, undecided for now*/}
         {/* <div className={styles.color_theme}>
               <p>Color Theme</p>
               <div className={styles.theme_options}>
                  <button className={`${styles.active} ${styles.dark}`}>Dark</button>
                  <button className={`${styles.inactive} ${styles.light}`}>Light</button>
               </div>
            </div> */}
         <p></p>
         <div className={styles.buttons}>
            <button className={styles.cancel} type="button" onClick={() => router.back()}>Cancel</button>
            <button className={styles.save} type="submit">Submit</button>
         </div>
      </form>
   )
}