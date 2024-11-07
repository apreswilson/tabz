"use client";
import { logout } from "../actions";
import { redirect } from "next/navigation";
import styles from "./home.module.scss"
export default function LogoutButton() {
   const logoutUser = () => {
      logout();
      redirect("/");
   }

   return (
      <button className={styles.settings} onClick={logoutUser}>Logout</button>
   )
}