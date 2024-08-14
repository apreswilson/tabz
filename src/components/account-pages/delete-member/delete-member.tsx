import styles from "./delete-member.module.scss";

export default function DeleteMember () {
   return (
      <div className={styles.delete_user}>
         <p>Are you sure you want to delete member: <br /><span className={styles.user_name}>Alex Wilson</span></p>
         <div className={styles.options}>
            <button className={styles.yes}>Yes</button>
            <button className={styles.no}>No</button>
         </div>
      </div>
   )
}