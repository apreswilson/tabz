"use client"
import styles from "./tasks.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PriorityDropdown from "@/components/account-pages/priority-dropdown/priority-dropdown";
import StatusDropdown from "@/components/account-pages/status-dropdown/status-dropdown";
import { useState } from "react";
import SaveChanges from "./save";
import { TasksInterface } from "./page";
import DeleteTask from "@/components/account-pages/delete-task/delete-task";
export default function CompletedTasksTable({ completeTasks, organizationId, userId }: { completeTasks: TasksInterface[], organizationId: string, userId: string }) {
   const [tableState, setTableState] = useState<TasksInterface[]>(completeTasks);
   const [openPriorityMenu, setOpenPriorityMenu] = useState<string | null>(null);
   const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null);
   const [openDeleteTask, setOpenDeleteTask] = useState<string | null>(null)
   const [changeMade, setChangeMade] = useState<boolean>(false);
   const [tasksToRemove, setTasksToRemove] = useState<string[]>([])

   const priorityOptionsMenuHandler = (taskId: string) => {
      setOpenPriorityMenu((prev) => (prev === taskId ? null : taskId));
   }

   const statusOptionsMenuHandler = (taskId: string) => {
      setOpenStatusMenu((prev) => prev === taskId ? null : taskId)
   }

   const deleteTaskHandler = (taskId: string) => {
      setOpenDeleteTask((prev) => (prev === taskId ? null : taskId))
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

   const updateDeletedTasks = (taskId: string) => {
      const deleteTaskFromTable = tableState.filter((tableItem) => tableItem._id !== taskId);
      setTasksToRemove((prev) => [...prev, taskId])
      setTableState(deleteTaskFromTable);
      setChangeMade(true);
   }

   return (
      <>
         {changeMade && (
            <SaveChanges
               setTableState={setTableState}
               originalTable={completeTasks}
               buttonVisibility={setChangeMade}
               mostCurrentTable={tableState}
               organizationId={organizationId}
               operationType="pop"
               itemsToRemove={tasksToRemove}
               userId={userId}
            />
         )}
         <table className={styles.complete_tasks}>
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
                  <tr key={task._id} className={styles.task_completed}>
                     <td>
                        <FontAwesomeIcon
                           icon={faTrash}
                           onClick={(() => deleteTaskHandler(task._id))}
                        />
                        {openDeleteTask === task._id &&
                           <DeleteTask
                              taskId={task._id}
                              taskName={task.taskName}
                              removeTaskFn={updateDeletedTasks}
                              cancelTaskDelete={setOpenDeleteTask}
                           />
                        }
                        <span>{task.taskName}</span></td>
                     <td>{task.roles}</td>
                     <td className={
                        task.priority === "Low" ?
                           styles.priority__low
                           : task.priority === "Medium"
                              ? styles.priority__medium
                              : styles.priority__high
                     } onClick={() => priorityOptionsMenuHandler(task._id)}>
                        <p>{task.priority}</p>
                        {openPriorityMenu === task._id &&
                           <PriorityDropdown
                              updatePriority={(newPriority) => updatePriority(task._id, newPriority)}
                           />
                        }
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
                        {openStatusMenu === task._id &&
                           <StatusDropdown
                              updateStatus={(newStatus) => updateStatus(task._id, newStatus)}
                           />
                        }
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   )
}