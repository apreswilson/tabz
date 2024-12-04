"use client";
import styles from "./members.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faMagnifyingGlass,
   faUserPlus,
   faEnvelope,
   faEllipsis,
   faPen,
   faTrash
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import OptionsDropdown from "@/components/account-pages/options-dropdown/options-dropdown";
import EditMember from "@/components/account-pages/edit-member/edit-member";
import DeleteMember from "@/components/account-pages/delete-member/delete-member";
import AddMember from "./add-member";
import { MembersInterface } from "./page";
import { SessionInterface } from "@/lib/definitions";

interface PageState {
   search: string,
   role: string
}

export default function MemberList({
   members,
   userId,
   organizationId,
   userCookieData
}: {
   members: MembersInterface[],
   userId: string,
   organizationId: string,
   userCookieData: SessionInterface
}) {

   const [memberList, setMemberList] = useState<MembersInterface[]>(members)
   const [editUser, setEditUser] = useState<string | null>(null);
   const [deleteUser, setDeleteUser] = useState<string | null>(null);
   const [addUser, setAddUser] = useState(false);
   const [expandOptions, setExpandOptions] = useState<string | null>(null);
   const [pageState, setPageState] = useState<PageState>({
      search: "",
      role: "All"
   })

   useEffect(() => {
      const filterMembers = members.filter((member) => {
         const searchMatch = member.memberName.toLowerCase().includes(pageState.search.toLowerCase());
         const roleMatch = pageState.role === "All" ?
            true
            :
            member.role === pageState.role
         return searchMatch && roleMatch
      })
      setMemberList(filterMembers)
   }, [members, pageState])

   const editUserHandler = (memberId: string) => {
      setEditUser((prev) => (prev === memberId ? null : memberId));
   }

   const deleteUserHandler = (memberId: string) => {
      setDeleteUser((prev) => (prev === memberId ? null : memberId));
   }

   const addUserHandler = () => {
      setAddUser(prev => !prev);
   }

   const expandOptionsHandler = (memberId: string) => {
      setExpandOptions((prev) => (prev === memberId ? null : memberId));
   }

   const updateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      if (name === "role") {
         setPageState((prevState) => {
            if (prevState.role === event.target.value) {
               return prevState;
            }

            return {
               ...prevState,
               role: event.target.value
            }
         })
      } else {
         setPageState(prevState => ({
            ...prevState,
            [name]: value
         }))
      }
   }

   return (
      <>
         <section>
            <section className={styles.form_section}>
               <form className={styles.search_form}>
                  <input
                     type="text"
                     placeholder="Search"
                     name="search"
                     value={pageState.search}
                     onChange={updateChange}
                  />

                  <button type="submit">
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </form>
               <div className={styles.categories}>
                  <label htmlFor="role-selection">Roles</label>
                  <select
                     name="role"
                     id="role-selection"
                     value={pageState.role}
                     onChange={updateChange}
                  >

                     <option>All</option>
                     <option>Owner</option>
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
               {memberList.map((member) => (
                  <div className={styles.member} key={member._id}>
                     <span>Name</span>
                     <p>{member.memberName}</p>
                     <span>Email</span>
                     <p>{member.memberEmail}</p>
                     <span>Role</span>
                     <p>{member.role}</p>
                     <span>Options</span>
                     <div className={styles.options}>
                        <div className={styles.email}>
                           <span>Email</span>
                           <a href={`mailto: ${member.memberEmail}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                        </div>
                        <div className={styles.edit} onClick={() => editUserHandler(member._id)}>
                           <span>Edit</span>
                           <FontAwesomeIcon icon={faPen} />
                        </div>
                        <div className={styles.delete} onClick={() => deleteUserHandler(member._id)}>
                           <span>Delete</span>
                           <FontAwesomeIcon icon={faTrash} />
                        </div>
                     </div>
                     <div className={styles.options_mobile}>
                        <div
                           className={styles.dropdown_wrapper}
                           onMouseEnter={() => expandOptionsHandler(member._id)}
                           onMouseLeave={() => expandOptionsHandler(member._id)}
                        >
                           <FontAwesomeIcon icon={faEllipsis} />
                           {expandOptions === member._id &&
                              <OptionsDropdown
                                 setEditMember={setEditUser}
                                 userId={member._id}
                                 memberEmail={member.memberEmail}
                                 setDeleteMember={setDeleteUser}
                              />
                           }
                        </div>
                     </div>
                     {editUser === member._id &&
                        <EditMember
                           userId={userId}
                           organizationId={organizationId}
                           memberName={member.memberName}
                           memberEmail={member.memberEmail}
                           memberRole={member.role}
                           setEditMember={setEditUser}
                        />
                     }
                     {deleteUser === member._id &&
                        <DeleteMember
                           userName={member.memberName}
                           userId={member._id}
                           organizationId={organizationId}
                           setDeleteMember={setDeleteUser}
                        />
                     }
                  </div>
               ))}
               {addUser &&
                  <AddMember
                     setAddMember={setAddUser}
                     currentUserEmail={userCookieData.email}
                  />
               }
            </section>
         </section>
      </>
   )
}