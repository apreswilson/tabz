import styles from "./tasks.module.scss";
import { Dispatch, SetStateAction } from "react";
import { TasksInterface } from "./page";
import { useRouter } from "next/navigation";
import { updateTasksList } from "../../actions";

export default function SaveChanges({
   setTableState,
   originalTable,
   buttonVisibility,
   mostCurrentTable,
   organizationId,
   operationType,
   itemsToRemove,
   userId
}: {
   setTableState: Dispatch<SetStateAction<TasksInterface[]>>,
   originalTable: TasksInterface[],
   buttonVisibility: Dispatch<SetStateAction<boolean>>,
   mostCurrentTable: TasksInterface[],
   organizationId: string,
   operationType: "pop" | "set",
   itemsToRemove?: string[],
   userId: string
}) {
   const router = useRouter()

   const cancelChange = () => {
      setTableState(originalTable)
      buttonVisibility(false)
   }

   const updateTableData = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Updated table");
      await updateTasksList(organizationId, mostCurrentTable, operationType, itemsToRemove, userId)
      buttonVisibility(false)
      window.location.reload();
   }

   return (
      <>
         <p>Save changes?</p>
         <form onSubmit={updateTableData} className={styles.save_changes}>
            <button type="button" onClick={cancelChange}>Cancel</button>
            <button type="submit">Save</button>
         </form>
      </>
   )
}