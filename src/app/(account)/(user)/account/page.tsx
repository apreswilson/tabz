import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./account.module.scss";

export default function Settings() {
   return (
      <main className={styles.account_page}>
         <section className={styles.account_info}>
            <h1>Account</h1>
            <div className={styles.fname}>
               <label htmlFor="first-name">First Name</label>
               <input type="text" id="first-name" placeholder="Alex"></input>
            </div>
            <div className={styles.lname}>
               <label htmlFor="last-name">Last Name</label>
               <input type="text" id="last-name" placeholder="Wilson"></input>
            </div>

            <div className={styles.email}>
               <label htmlFor="email-address">Email Address</label>
               <input type="text" id="email-address" placeholder="example@gmail.com"></input>
            </div>
            <div className={styles.password}>
               <label htmlFor="pw">Password</label>
               <input type="password" id="pw" ></input>
            </div>
            <div className={styles.buttons}>
               <button className={styles.cancel}>Cancel</button>
               <button className={styles.save}>Edit</button>
            </div>
         </section>
      </main>
   )
}