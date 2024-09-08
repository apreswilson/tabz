import styles from "./priority-dropdown.module.scss";

export default function PriorityDropdown() {
   return (
      <div className={styles.priority_options}>
         <p className={styles.low}>Low</p>
         <p className={styles.medium}>Medium</p>
         <p className={styles.high}>High</p>
      </div>
   )
}