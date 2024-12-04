import styles from "./priority-dropdown.module.scss";

export default function PriorityDropdown({ updatePriority }: { updatePriority: (newPriority: string) => void }) {
   return (
      <div className={styles.priority_options}>
         <p className={styles.low} onClick={() => updatePriority("Low")}>Low</p>
         <p className={styles.medium} onClick={() => updatePriority("Medium")}>Medium</p>
         <p className={styles.high} onClick={() => updatePriority("High")}>High</p>
      </div>
   )
}