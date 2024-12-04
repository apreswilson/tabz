import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faPen,
   faTrash,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./options-dropdown.module.scss";
import { Dispatch, SetStateAction } from "react";

export default function OptionsDropdown({
   userId,
   setEditMember,
   memberEmail,
   setDeleteMember
}: {
   userId: string,
   setEditMember: Dispatch<SetStateAction<string | null>>
   setDeleteMember: Dispatch<SetStateAction<string | null>>
   memberEmail: string
}) {
   return (
      <div className={styles.options_dropdown}>
         <div className={styles.email}>
            <span>Email</span>
            <a href={`mailto: ${memberEmail}`}><FontAwesomeIcon icon={faEnvelope} /></a>
         </div>
         <div className={styles.edit} onClick={() => setEditMember(userId)}>
            <span>Edit</span>
            <FontAwesomeIcon icon={faPen} />
         </div>
         <div className={styles.delete} onClick={() => setDeleteMember(userId)}>
            <span>Delete</span>
            <FontAwesomeIcon icon={faTrash} />
         </div>
      </div>
   )
}