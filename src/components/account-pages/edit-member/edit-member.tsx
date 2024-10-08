import styles from "./edit-member.module.scss";

export default function EditMember() {
   return (
      <form className={styles.edit_member}>
         <div className={styles.name}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Alex Wilson" name="name" id="name"></input>
         </div>
         <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="apreswilson@gmail.com" name="email" id="email"></input>
         </div>
         <div className={styles.role}>
            <label htmlFor="role">Role</label>
            <select id="role">
               <option>Role A</option>
               <option>Role B</option>
               <option>Role C</option>
            </select>
         </div>
         <div className={styles.buttons}>
            <button className={styles.cancel}>Cancel</button>
            <button type="submit" className={styles.update}>Update</button>
         </div>
      </form>
   )
}