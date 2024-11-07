"use client";
import { leaveOrganization } from "../actions";
import styles from "./home.module.scss";

export function LeaveButton({ userId, organizationName }: { userId: string, organizationName: string }) {

   function leaveHandler(userId: string, organizationName: string) {
      leaveOrganization(userId, organizationName);
   }
   console.log(userId, organizationName);
   return (
      <>
         <button className={styles.leave} onClick={() => leaveHandler(userId, organizationName)}>Leave</button>
      </>
   )
}