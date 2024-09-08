'use client';

import styles from "./login.module.scss";
import Link from "next/link";
export default function Login() {
   // const [users, setUsers] = useState<UserInterface[]>([]);
   // useEffect(() => {
   //    const fetchUsers = async () => {
   //       const res = await fetch('/api/users');
   //       const data = await res.json();
   //       if (data.success) {
   //          setUsers(data.data);
   //       }
   //    }

   //    fetchUsers();
   // }, [])

   return (
      <main className={styles.login_page}>
         <form className={styles.login_form}>
            <h1>Sign In</h1>
            <div className={styles.email}>
               <label htmlFor="email">Email</label>
               <input type="text" id="email" autoComplete="off"></input>
            </div>
            <div className={styles.password}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password"></input>
            </div>
            <button className={styles.submit}>Sign In</button>
            <div className={styles.bar}></div>
            <p>Don&apos;t have an account? <Link href="/signup">Sign Up</Link></p>
            <Link href="#">Forgot Password?</Link>
         </form>
      </main >
   )
}