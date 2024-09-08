import styles from "./status-dropdown.module.scss";

export default function StatusDropdown() {
   return (
      <div className={styles.status_options}>
         <p className={styles.not_started}>Not Started</p>
         <p className={styles.in_progress}>In Progress</p>
         <p className={styles.completed}>Complete</p>
      </div>
   )
}