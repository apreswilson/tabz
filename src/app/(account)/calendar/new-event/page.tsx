import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./new-event.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewEvent() {
   return (
      <AccountPageLayout>
         <section>
            <form className={styles.new_shout_form}>
               <h1>Create New Event</h1>
               <div className={styles.title}>
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title"></input>
               </div>
               <div className={styles.event_date}>
                  <label htmlFor="event-option">Event Date (mm/dd/yyyy)</label>
                  <input type="text" id="event-option"></input>
               </div>
               <div className={styles.time}>
                  <label htmlFor="time">Time (Specify AM or PM)</label>
                  <input type="text" id="time"></input>
               </div>
               <div className={styles.content}>
                  <label htmlFor="content">Content</label>
                  <textarea id="content" className={styles.content_area}></textarea>
               </div>
               <div className={styles.relevant_roles}>
                  <label htmlFor="relevant-roles">Relevant Roles</label>
                  <div className={styles.roles_selected}>
                     <div className={styles.role}>
                        <p>Web Developer</p>
                        <FontAwesomeIcon icon={faCircleXmark} />
                     </div>
                     <div className={styles.role}>
                        <p>Information Architect</p>
                        <FontAwesomeIcon icon={faCircleXmark} />
                     </div>
                  </div>
                  <select id="relevant-roles">
                     <option>Role A</option>
                     <option>Role B</option>
                     <option>Role C</option>
                  </select>
               </div>
               <div className={styles.buttons}>
                  <button type="submit">Add</button>
                  <button type="reset">Reset</button>
               </div>
            </form>
         </section>
      </AccountPageLayout>
   )
}