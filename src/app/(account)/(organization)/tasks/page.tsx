"use client"
import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./tasks.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { use, useState } from "react";
import PriorityDropdown from "@/components/account-pages/priority-dropdown/priority-dropdown";
import StatusDropdown from "@/components/account-pages/status-dropdown/status-dropdown";
import OptionsDropdown from "@/components/account-pages/options-dropdown/options-dropdown";
import AddTask from "@/components/account-pages/add-task/add-task";

export default function Tasks() {
   const [openPriorityMenu, setOpenPriorityMenu] = useState<boolean>(false);
   const [openStatusMenu, setOpenStatusMenu] = useState<boolean>(false);
   const [addTask, setAddTask] = useState<boolean>(false)

   const priorityOptionsMenuHandler = () => {
      if (openStatusMenu) {
         setOpenStatusMenu(false)
      }
      setOpenPriorityMenu(prev => !prev);
   }

   const statusOptionsMenuHandler = () => {
      if (openPriorityMenu) {
         setOpenPriorityMenu(false)
      }
      setOpenStatusMenu(prev => !prev);
   }

   const addTaskHandler = () => {
      setAddTask(prev => !prev)
   }

   return (
      <AccountPageLayout>
         <section>
            <section className={styles.tasks_section}>
               <h1>Incomplete Tasks</h1>
               <table className={styles.incomplete_tasks}>
                  <thead>
                     <tr>
                        <th>Task</th>
                        <th>Roles</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Complete centering of div</td>
                        <td>Web Developer</td>
                        <td className={styles.priority__low} onClick={priorityOptionsMenuHandler}>
                           <p className={styles.priority_text}>Low</p>
                           {openPriorityMenu ?
                              <PriorityDropdown />
                              :
                              <></>
                           }
                        </td>
                        <td>4 PM 08/25</td>
                        <td className={styles.status__not_started} onClick={statusOptionsMenuHandler}>
                           <p>Not Started</p>
                           {openStatusMenu ?
                              <StatusDropdown />
                              :
                              <></>
                           }
                        </td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr className={styles.add_task} onClick={addTaskHandler}>
                        <td colSpan={5}>Add Task +</td>
                     </tr>
                  </tfoot>
               </table>
               {addTask ?
                  <AddTask />
                  :
                  <></>
               }
               <h1>Complete Tasks</h1>
               <table className={styles.complete_tasks}>
                  <thead>
                     <tr>
                        <th>Task</th>
                        <th>Roles</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Complete centering of div</td>
                        <td>Web Developer</td>
                        <td className={styles.priority__low} onClick={priorityOptionsMenuHandler}>
                           <p className={styles.priority_text}>Low</p>
                           {openPriorityMenu ?
                              <PriorityDropdown />
                              :
                              <></>
                           }
                        </td>
                        <td>4 PM 08/25</td>
                        <td className={styles.status__complete} onClick={statusOptionsMenuHandler}>
                           <p>Complete</p>
                           {openStatusMenu ?
                              <StatusDropdown />
                              :
                              <></>
                           }
                        </td>
                     </tr>
                  </tbody>
               </table>
            </section>
         </section>
      </AccountPageLayout>
   )
}