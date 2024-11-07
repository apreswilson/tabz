import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./settings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
   return (
      <AccountPageLayout>
         <section>
            <section className={styles.update_settings}>
               <h1>User Settings</h1>
               <p>The button with the red background is the currently enabled option.</p>
               <div className={styles.status_popups}>
                  <h2>Action Popups</h2>
                  <p>Hides or displays the popup that appears when an action is made.</p>
                  <div className={styles.button_options}>
                     <button className={`${styles.enable_popups} ${styles.active}`}>Enable</button>
                     <button className={`${styles.disable_popups} ${styles.inactive}`}>Disable</button>
                  </div>
               </div>
               <div className={styles.unread_shouts}>
                  <h2>Display Unread Shouts</h2>
                  <p>Hides or displays the number of unread shouts in an icon on the navigation menu.</p>
                  <div className={styles.button_options}>
                     <button className={`${styles.enable_unread_shouts} ${styles.active}`}>Enable</button>
                     <button className={`${styles.disable_unread_shouts} ${styles.inactive}`}>Disable</button>
                  </div>
               </div>
               <div className={styles.event_notify}>
                  <h2>Notify Events</h2>
                  <p>Hides or displays an event that is starting via a popup.</p>
                  <div className={styles.button_options}>
                     <button className={`${styles.enable_event_notify} ${styles.active}`}>Enable</button>
                     <button className={`${styles.disable_event_notify} ${styles.inactive}`}>Disable</button>
                  </div>
               </div>
               <div className={`${styles.button_options} ${styles.submission_buttons}`}>
                  <button className={styles.cancel}>Cancel</button>
                  <button className={styles.save}>Save</button>
               </div>
            </section>

            <section className={styles.admin_update_settings}>
               <h1>Admin Settings</h1>
               <div className={styles.organization_information}>
                  <div className={styles.organization_name}>
                     <h2>Organization Name</h2>
                     <p>Displays the current name of the organization.</p>
                     <input type="text" id="org-name" placeholder="Organization Name"></input>
                  </div>
               </div>
               <div className={styles.add_roles}>
                  <h2>Add Roles</h2>
                  <p>Add a new role to your organization.</p>
                  <form className={styles.role_to_add}>
                     <input type="text" id="role-name" placeholder="New Role Name"></input>
                     <button className={styles.add_role}>Add</button>
                  </form>
               </div>
               <section className={styles.role_list}>
                  <div className={styles.top_area}>
                     <h2>Roles</h2>
                     <input type="text" className={styles.role_search} placeholder="Search"></input>
                  </div>
                  <div className={styles.roles}>
                     <details>
                        <summary>Web Developer</summary>
                        <div className={styles.role_permissions}>
                           <div className={styles.shouts}>
                              <input type="checkbox" id="shout-perm"></input>
                              <label htmlFor="shout-perm">Shout Permissions</label>
                           </div>
                           <div className={styles.calendar}>
                              <input type="checkbox" id="calendar-perm"></input>
                              <label htmlFor="calendar-perm">Calendar Permissions</label>
                           </div>
                           <div className={styles.member}>
                              <input type="checkbox" id="member-perm"></input>
                              <label htmlFor="member-perm">Member Permissions</label>
                           </div>
                           <div className={styles.invite_member}>
                              <input type="checkbox" id="member-perm"></input>
                              <label htmlFor="invite-member-perm">Invite Permissions</label>
                           </div>
                           <div className={styles.tasks}>
                              <input type="checkbox" id="task-perm"></input>
                              <label htmlFor="task-perm">Task Permissions</label>
                           </div>
                           <div className={styles.admin}>
                              <input type="checkbox" id="admin-perm"></input>
                              <label htmlFor="admin-perm">Admin Permissions</label>
                           </div>
                           <div className={styles.delete_role}>
                              <button>Delete Role</button>
                           </div>
                        </div>
                     </details>
                     <details>
                        <summary>Web Developer</summary>
                        <div className={styles.role_permissions}>
                           <div className={styles.shouts}>
                              <input type="checkbox" id="shout-perm"></input>
                              <label htmlFor="shout-perm">Shout Permissions</label>
                           </div>
                           <div className={styles.calendar}>
                              <input type="checkbox" id="calendar-perm"></input>
                              <label htmlFor="calendar-perm">Calendar Permissions</label>
                           </div>
                           <div className={styles.member}>
                              <input type="checkbox" id="member-perm"></input>
                              <label htmlFor="member-perm">Member Permissions</label>
                           </div>
                           <div className={styles.invite_member}>
                              <input type="checkbox" id="member-perm"></input>
                              <label htmlFor="invite-member-perm">Invite Permissions</label>
                           </div>
                           <div className={styles.tasks}>
                              <input type="checkbox" id="task-perm"></input>
                              <label htmlFor="task-perm">Task Permissions</label>
                           </div>
                           <div className={styles.admin}>
                              <input type="checkbox" id="admin-perm"></input>
                              <label htmlFor="admin-perm">Admin Permissions</label>
                           </div>
                        </div>
                     </details>
                  </div>
               </section>
               <div className={styles.admin_button_options}>
                  <button className={styles.admin_cancel}>Cancel</button>
                  <button className={styles.admin_update}>Save</button>
               </div>
            </section>
         </section>
      </AccountPageLayout >
   )
}