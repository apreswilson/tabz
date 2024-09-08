import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./new-shout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function NewShout() {
   return (
      <AccountPageLayout>
         <section>
            <form className={styles.new_shout_form}>
               <h1>Create New Shout</h1>
               <div className={styles.title}>
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title"></input>
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
                  <button type="submit">Post</button>
                  <button type="reset">Reset</button>
               </div>
            </form>
         </section>
      </AccountPageLayout>
   )
}