import styles from "./delete-task.module.scss";

export default function DeleteTask() {
   return (
      <div className={styles.delete_task}>
         <p>Do you wish to delete task: Task Name?</p>
         <div className={styles.options}>
            <button className={styles.yes}>Yes</button>
            <button className={styles.no}>No</button>
         </div>
      </div>
   )
}
