import styles from "./add-task.module.scss";

export default function AddTask() {
   return (
      <form className={styles.add_task_form}>
         <div className={styles.task}>
            <label htmlFor="task">Task</label>
            <input type="text" id="task"></input>
         </div>
         <div className={styles.role}>
            <label htmlFor="role">Role</label>
            <select id="role">
               <option>Role A</option>
               <option>Role B</option>
               <option>Role C</option>
            </select>
         </div>
         <div className={styles.priority}>
            <label htmlFor="priority">Priority</label>
            <select id="role">
               <option>Low</option>
               <option>Medium</option>
               <option>High</option>
            </select>
         </div>
         <div className={styles.task}>
            <label htmlFor="deadline">Deadline</label>
            <input type="text" id="deadline"></input>
         </div>
         <div className={styles.task}>
            <label htmlFor="status">Status</label>
            <select id="role">
               <option>Not Started</option>
               <option>In Progress</option>
               <option>Complete</option>
            </select>
         </div>
         <div className={styles.submit_area}>
            <button type="submit" className={styles.create_new_task}>Add</button>
         </div>
      </form>
   )
}