import styles from "./signup.module.scss";

export default function Signup() {
   return (
      <main className={styles.signup_page}>
         <form className={styles.signup_form}>
            <h1>Sign Up</h1>
            <div className={styles.fname}>
               <label htmlFor="fname">First Name</label>
               <input type="text" id="fname"></input>
            </div>
            <div className={styles.lname}>
               <label htmlFor="lname">Last Name</label>
               <input type="text" id="lname"></input>
            </div>
            <div className={styles.email}>
               <label htmlFor="email">Email</label>
               <input type="text" id="email"></input>
            </div>
            <div className={styles.password}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password"></input>
            </div>
            <button type="submit" className={styles.submit}>Sign Up</button>
         </form>
      </main>
   )
}