import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
   faPen, 
   faTrash,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./options-dropdown.module.scss";

export default function OptionsDropdown () {
   return (
      <div className={styles.options_dropdown}>
         <div className={styles.email}>
            <span>Email</span>
            <FontAwesomeIcon icon={faEnvelope} />
         </div>
         <div className={styles.edit}>
            <span>Edit</span>
            <FontAwesomeIcon icon={faPen} />
         </div>
         <div className={styles.delete}>
            <span>Delete</span>
            <FontAwesomeIcon icon={faTrash} />
         </div>
      </div>
   )
}