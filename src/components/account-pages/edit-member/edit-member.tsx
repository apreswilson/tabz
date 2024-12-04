import React, { Dispatch, SetStateAction } from "react";
import styles from "./edit-member.module.scss";
import { editOrganizationMember } from "@/app/(account)/[userId]/actions";
import { useRouter } from "next/navigation";

export interface FormDataInput {
   userId: string,
   organizationId: string,
   name: string,
   email: string,
   role: string
}

export default function EditMember({
   userId,
   organizationId,
   memberName,
   memberEmail,
   memberRole,
   setEditMember
}: {
   userId: string,
   organizationId: string,
   memberName: string,
   memberEmail: string,
   memberRole: string,
   setEditMember: Dispatch<SetStateAction<string | null>>
}) {
   const router = useRouter();
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const formValues = {
         userId,
         organizationId,
         name: formData.get("name") as string,
         email: formData.get("email") as string,
         role: formData.get("role") as string
      }
      await editOrganizationMember(formValues)
      setEditMember(null);
      router.refresh();

   }

   return (
      <form className={styles.edit_member} onSubmit={handleSubmit}>
         <div className={styles.name}>
            <label htmlFor="name">Name</label>
            <input type="text" defaultValue={memberName} name="name" id="name"></input>
         </div>
         <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="text" defaultValue={memberEmail} name="email" id="email"></input>
         </div>
         <div className={styles.role}>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" defaultValue={memberRole}>
               <option>Owner</option>
               <option>Guest</option>
            </select>
         </div>
         <div className={styles.buttons}>
            <button className={styles.cancel} type="reset" onClick={() => setEditMember(null)}>Cancel</button>
            <button type="submit" className={styles.update}>Update</button>
         </div>
      </form>
   )
}