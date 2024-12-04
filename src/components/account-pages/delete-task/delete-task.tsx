import styles from "./delete-task.module.scss";
import { Dispatch, SetStateAction } from "react";
export default function DeleteTask({
   taskId,
   taskName,
   removeTaskFn,
   cancelTaskDelete
}: {
   taskId: string,
   taskName: string
   removeTaskFn: (taskId: string) => void,
   cancelTaskDelete: Dispatch<SetStateAction<string | null>>
}) {
   return (
      <div className={styles.delete_task}>
         <p>Do you wish to delete task: {taskName}</p>
         <div className={styles.options}>
            <button className={styles.yes} onClick={() => removeTaskFn(taskId)}>Yes</button>
            <button className={styles.no} onClick={() => cancelTaskDelete(null)}>No</button>
         </div>
      </div>
   )
}
