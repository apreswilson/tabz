"use client";
import { useRouter } from "next/navigation";
import styles from "./home.module.scss";
import { LeaveButton } from "./leave";
import { createOrganizationSession } from "../actions";

export default function OrganizationList({ userId, organizationName, organizationJoined, organizationId }: { userId: string, organizationName: string, organizationJoined: string, organizationId: string }) {
   const router = useRouter();
   const handleClick = async () => {
      //Function to add cookie info
      await createOrganizationSession(organizationId, userId);
      router.push(`/${userId}/${organizationId}/dashboard`);
   }

   return (
      <div className={styles.organization} >
         <p>{organizationName}</p>
         <p>Joined: {organizationJoined ? new Date(organizationJoined).toLocaleDateString("en-US") : "Date not available"}</p>
         <div className={styles.options}>
            {/* Add server action to this click */}
            <button className={styles.go} onClick={handleClick}>Go</button>
            <LeaveButton userId={userId} organizationName={organizationName} />
         </div>
      </div>
   )
}

