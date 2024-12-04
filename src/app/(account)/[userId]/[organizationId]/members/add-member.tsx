"use client"
import { useState, FormEvent, useEffect, Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";
import styles from "./add-member.module.scss"
import { inviteNewMember } from "../../actions";

export default function AddMember({
   setAddMember,
   currentUserEmail,
}: {
   setAddMember: Dispatch<SetStateAction<boolean>>
   currentUserEmail: string
}) {
   const [curState, setCurState] = useState<string>("");
   const params = useParams<{ userId: string, organizationId: string }>();
   const [userEmail, setUserEmail] = useState<string>("");
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

   useEffect(() => {
      const testFunction = async () => {
         if (userEmail.length > 0 && userEmail !== currentUserEmail) {
            await inviteNewMember(userEmail, params.organizationId, params.userId);
            setCurState("Successfully Invited Member");
            setTimeout(() => {
               setAddMember(false)
            }, 2000);
         }
         else if (userEmail === currentUserEmail) {
            setCurState("Cannot invite yourself")
         }
      }
      testFunction();
   }, [userEmail, params.userId, params.organizationId, setAddMember, currentUserEmail])

   const handleClick = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      if (emailRegex.test(email)) setUserEmail(email)
   }

   return (
      <form className={styles.add_user} onSubmit={handleClick}>
         <p>Please enter the email address you wish to invite to the organization</p>
         <input type="text" placeholder="Email Address" id="add-user-email" name="email"></input>
         <div className={styles.options}>
            <button type="submit" className={styles.submit}>Invite</button>
            <button className={styles.cancel} onClick={() => setAddMember(false)}>Cancel</button>
         </div>
         <p>{curState}</p>
      </form>
   )
}