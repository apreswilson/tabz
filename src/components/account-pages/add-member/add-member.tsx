import styles from "./add-member.module.scss";

export default function AddMember() {
   return (
      <form className={styles.add_user}>
         <p>Please enter the email address you wish to invite to the organization</p>
         <input type="text" placeholder="Email Address" id="add-user-email"></input>
         <div className={styles.options}>
            <button type="submit" className={styles.submit}>Invite</button>
            <button className={styles.cancel}>Cancel</button>
         </div>
      </form>
   )
}