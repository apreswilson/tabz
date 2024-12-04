import { removeUserFromOrganization } from "@/app/(account)/[userId]/actions";
import styles from "./delete-member.module.scss";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
export default function DeleteMember({
   userName,
   userId,
   organizationId,
   setDeleteMember
}: {
   userName: string,
   userId: string,
   organizationId: string,
   setDeleteMember: Dispatch<SetStateAction<string | null>>
}) {
   const router = useRouter();
   const deleteUserFromCurrentOrganization = async () => {
      await removeUserFromOrganization(userId, organizationId);
      setDeleteMember(null);
      router.refresh();
   }

   return (
      <div className={styles.delete_user}>
         <p>Are you sure you want to delete member:<br /><span>{userName}</span></p>
         <div className={styles.options}>
            <button className={styles.yes} onClick={deleteUserFromCurrentOrganization}>Yes</button>
            <button className={styles.no} onClick={() => setDeleteMember(null)}>No</button>
         </div>
      </div>
   )
}