"use client";
//Components
import AccountPageLayout from "@/components/account-pages/account-page-layout";
import EditMember from "@/components/account-pages/edit-member/edit-member";
import DeleteMember from "@/components/account-pages/delete-member/delete-member";
import OptionsDropdown from "@/components/account-pages/options-dropdown/options-dropdown";
import AddMember from "@/components/account-pages/add-member/add-member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Libs
import {
   faPen,
   faTrash,
   faEnvelope,
   faMagnifyingGlass,
   faEllipsis,
   faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

//Other
import styles from "./members.module.scss";

export default function Members() {
   const [editUser, setEditUser] = useState(false);
   const [deleteUser, setDeleteUser] = useState(false);
   const [addUser, setAddUser] = useState(false);
   const [expandOptions, setExpandOptions] = useState(false);

   const editUserHandler = () => {
      setEditUser(prev => !prev);
      setDeleteUser(false);
   }

   const deleteUserHandler = () => {
      setDeleteUser(prev => !prev);
      setEditUser(false);
   }

   const addUserHandler = () => {
      setAddUser(prev => !prev);
   }

   const expandOptionsHandler = () => {
      setExpandOptions(prev => !prev);
   }

   return (
      <AccountPageLayout>
         <section>
            <section className={styles.form_section}>
               <form className={styles.search_form}>
                  <input type="text" placeholder="Search" name="search"></input>
                  <button type="submit">
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </form>
               <div className={styles.categories}>
                  <label htmlFor="role-selection">Roles</label>
                  <select name="role-selection" id="role-selection">
                     <option>All</option>
                     <option>Role A</option>
                     <option>Role B</option>
                     <option>Role C</option>
                  </select>
               </div>
               <button className={styles.add} onClick={addUserHandler}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <p>Add</p>
               </button>
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
                  <div className={styles.options}>
                     <div className={styles.email}>
                        <span>Email</span>
                        <a href="mailto: apreswilson@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                     </div>
                     <div className={styles.edit} onClick={editUserHandler}>
                        <span>Edit</span>
                        <FontAwesomeIcon icon={faPen} />
                     </div>
                     <div className={styles.delete} onClick={deleteUserHandler}>
                        <span>Delete</span>
                        <FontAwesomeIcon icon={faTrash} />
                     </div>
                  </div>
                  {/*Only viewable on smaller screens*/}
                  <div className={styles.options_mobile}>
                     <div className={styles.dropdown_wrapper} onMouseEnter={expandOptionsHandler} onMouseLeave={expandOptionsHandler}>
                        <FontAwesomeIcon icon={faEllipsis} />
                        {expandOptions ?
                           <OptionsDropdown />
                           :
                           <></>
                        }
                     </div>
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
               }
               {addUser ?
                  <AddMember />
                  :
                  <></>
               }

            </section>
         </section>
      </AccountPageLayout>
   )
}