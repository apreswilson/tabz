"use client";
import styles from "./tasks.module.scss";
import PriorityDropdown from "@/components/account-pages/priority-dropdown/priority-dropdown";
import StatusDropdown from "@/components/account-pages/status-dropdown/status-dropdown";
import AddTask from "@/components/account-pages/add-task/add-task";
import { useState } from "react";
import { TasksInterface } from "./page";
import SaveChanges from "./save";
import { useRouter } from "next/navigation";
export default function NonFinishedTasks({ tasksInProgress, organizationId, userId }: { tasksInProgress: TasksInterface[], organizationId: string, userId: string }) {
   const [tableState, setTableState] = useState<TasksInterface[]>(tasksInProgress);
   const [openPriorityMenu, setOpenPriorityMenu] = useState<string | null>(null);
   const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null);
   const [addTask, setAddTask] = useState<boolean>(false)
   const [changeMade, setChangeMade] = useState<boolean>(false);
   const router = useRouter();

   const priorityOptionsMenuHandler = (taskId: string) => {
      setOpenPriorityMenu((prev) => (prev === taskId ? null : taskId));
   }

   const statusOptionsMenuHandler = (taskId: string) => {
      setOpenStatusMenu((prev) => prev === taskId ? null : taskId)
   }

   const addTaskHandler = () => {
      setAddTask(prev => !prev);
   }

   const updatePriority = (taskId: string, newPriority: string) => {
      setTableState((prevState) =>
         prevState.map((task) =>
            task._id === taskId ? { ...task, priority: newPriority } : task
         )
      )
      setChangeMade(true)
   }

   const updateStatus = (taskId: string, newStatus: string) => {
      setTableState((prevState) =>
         prevState.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
         )
      )
      setChangeMade(true);
   }

   return (
      <>
         {changeMade && (
            <SaveChanges
               setTableState={setTableState}
               originalTable={tasksInProgress}
               buttonVisibility={setChangeMade}
               mostCurrentTable={tableState}
               organizationId={organizationId}
               operationType="set"
               userId={userId}
            />
         )}
         <table className={styles.incomplete_tasks}>
            <thead>
               <tr>
                  <th>Task</th>
                  <th>Role</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {tableState.map((task: TasksInterface) => (
                  <tr key={task._id}>
                     <td>{task.taskName}</td>
                     <td>{task.roles}</td>
                     <td className={
                        task.priority === "Low" ?
                           styles.priority__low
                           : task.priority === "Medium"
                              ? styles.priority__medium
                              : styles.priority__high
                     } onClick={() => priorityOptionsMenuHandler(task._id)}>
                        <p>{task.priority}</p>
                        {openPriorityMenu === task._id && (
                           <PriorityDropdown
                              updatePriority={(newPriority) => updatePriority(task._id, newPriority)}
                           />
                        )}
                     </td>
                     <td>{task.deadline}</td>
                     <td className={
                        task.status === "Not Started"
                           ? styles.status__not_started
                           : task.status === "In Progress"
                              ? styles.status__in_progress
                              : styles.status__complete
                     } onClick={() => statusOptionsMenuHandler(task._id)}>
                        <p>{task.status}</p>
                        {openStatusMenu === task._id && (
                           <StatusDropdown
                              updateStatus={(newStatus) => updateStatus(task._id, newStatus)}
                           />
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
            <tfoot>
               <tr className={styles.add_task} onClick={addTaskHandler}>
                  <td colSpan={5}>Add Task +</td>
               </tr>
            </tfoot>
         </table>
         {addTask &&
            <AddTask
               organizationId={organizationId}
               updateFormVisibility={addTaskHandler}
               userId={userId}
            />}
      </>
   )
}