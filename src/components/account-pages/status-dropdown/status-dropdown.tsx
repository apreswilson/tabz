import styles from "./status-dropdown.module.scss";

export default function StatusDropdown({ updateStatus }: { updateStatus: (newStatus: string) => void }) {
   return (
      <div className={styles.status_options}>
         <p className={styles.not_started} onClick={() => updateStatus("Not Started")}>Not Started</p>
         <p className={styles.in_progress} onClick={() => updateStatus("In Progress")}>In Progress</p>
         <p className={styles.completed} onClick={() => updateStatus("Complete")}>Complete</p>
      </div>
   )
}