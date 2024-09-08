import styles from "./home.module.scss";
import Link from "next/link";
export default function UserHome() {
   return (
      <main className={styles.home}>
         <h1>Welcome User</h1>
         <section className={styles.invites}>
            <h2>Invites</h2>
            <div className={styles.invite}>
               <p>Organization Name</p>
               <div className={styles.options}>
                  <button className={styles.accept}>Accept</button>
                  <button className={styles.decline}>Decline</button>
               </div>
            </div>
            <div className={styles.invite}>
               <p>Organization Name</p>
               <div className={styles.options}>
                  <button className={styles.accept}>Accept</button>
                  <button className={styles.decline}>Decline</button>
               </div>
            </div>
            <div className={styles.invite}>
               <p>Organization Name</p>
               <div className={styles.options}>
                  <button className={styles.accept}>Accept</button>
                  <button className={styles.decline}>Decline</button>
               </div>
            </div>
         </section>
         <section className={styles.organizations}>
            <h2>Organizations</h2>
            <div className={styles.organization}>
               <p>Label IT Technologies</p>
               <p>Joined: August 3rd, 2023</p>
               <button className={styles.leave}>Leave</button>
            </div>
            <div className={styles.organization}>
               <p>Grace Family Church</p>
               <p>Joined: February 10th, 2022</p>
               <button className={styles.leave}>Leave</button>
            </div>

         </section>
         <section className={styles.visit_settings}>
            <h2>Account</h2>
            <p>Wish to view or update your account information?</p>
            <button className={styles.settings}><Link href="/account">Account</Link></button>
         </section>
         <section className={styles.new_organization}>
            <h2>New Organization</h2>
            <p>Wish to create your own organization?</p>
            <button className={styles.create_organization}><Link href="/create-organization">Create</Link></button>
         </section>
      </main>
   )
}