"use client"
import AccountPageLayout from "@/components/account-pages/account-page-layout";
import EditMember from "@/components/account-pages/edit-member/edit-member";
import DeleteMember from "@/components/account-pages/delete-member/delete-member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
   faPen, 
   faTrash,
   faEnvelope,
   faMagnifyingGlass,
   faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import styles from "./members.module.scss";
import { useState } from "react";

export default function Members() {
   const [editUser, setEditUser] = useState(false);
   const [deleteUser, setDeleteUser] = useState(false);

   const editUserDetails = () => {
      setEditUser(prev => !prev);
      setDeleteUser(false);
   }

   const deleteUserOption = () => {
      setDeleteUser(prev => !prev);
      setEditUser(false);
   }

   return (
      <AccountPageLayout>
         <main>
            <section className={styles.form_section}>
               <form className={styles.search_form}>
                  <input type="text" placeholder="Search"></input>
                  <button type="submit">
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </form>
               <select>
                  <option>All</option>
                  <option>Role A</option>
                  <option>Role B</option>
                  <option>Role C</option>
               </select>
            </section>

            {/*Only visible on < 675px*/}
            <h1 className={styles.mobile_header}>Employees</h1>

            <section className={styles.member_list}>
               <div className={styles.top_row}>
                  <h1>Name</h1>
                  <h1>Email</h1>
                  <h1>Role</h1>
                  <h1>Options</h1>
               </div>
               <div className={styles.member}>
                  <span>Name</span> 
                  <p>Alex Wilson</p>
                  <span>Email</span>
                  <p>apreswilson@gmail.com</p>
                  <span>Role</span>
                  <p>Web Developer</p>
                  <span>Options</span>
                  <div className={styles.admin_options}>
                     <FontAwesomeIcon icon={faEnvelope} /> 
                     <FontAwesomeIcon icon={faPen} onClick={editUserDetails}/>
                     <FontAwesomeIcon icon={faTrash} onClick={deleteUserOption}/>
                  </div>
               </div>
               {editUser ? 
                  <EditMember />
                  :
                  <></>
               }
               {deleteUser ?
                  <DeleteMember />
                  :
                  <></>
               }<div className={styles.member}>
                  <span>Name</span> 
                  <p>Alex Wilson</p>
                  <span>Email</span>
                  <p>apreswilson@gmail.com</p>
                  <span>Role</span>
                  <p>Web Developer</p>
                  <span>Options</span>
                  <div className={styles.admin_options}>
                     <FontAwesomeIcon icon={faEnvelope} /> 
                     <FontAwesomeIcon icon={faPen} onClick={editUserDetails}/>
                     <FontAwesomeIcon icon={faTrash} onClick={deleteUserOption}/> 
                  </div>
               </div>
            </section>
         </main>
      </AccountPageLayout>
   )
}