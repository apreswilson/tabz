"use client"
import { useRouter } from "next/navigation";
import { acceptInvite, declineInvite } from "../actions";
import styles from "./home.module.scss";

export default function OrganizationInvite({ userId, inviteName, inviteId }: {
   userId: string,
   inviteName: string,
   inviteId: string,
}) {
   const router = useRouter();

   const accept = async () => {
      await acceptInvite(userId, inviteId, inviteName)
      router.refresh();
   }

   const decline = async () => {
      await declineInvite(userId, inviteName);
      router.refresh();
   }

   return (
      <div className={styles.invite}>
         <p>{inviteName}</p>
         <div className={styles.options}>
            <button className={styles.accept} onClick={accept}>Accept</button>
            <button className={styles.decline} onClick={decline}>Decline</button>
         </div>
      </div>
   )
}