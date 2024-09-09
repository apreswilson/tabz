import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./shouts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBullhorn,
   faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ActionPopup from "@/components/account-pages/action-popup/action-popup";

export default function Shouts() {
   return (
      <AccountPageLayout>
         <section>
            <form className={styles.top_area}>
               <div className={styles.search}>
                  <input type="text" placeholder="Search" name="search"></input>
                  <button type="submit">
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </div>
               <div className={styles.categories}>
                  <label htmlFor="role-selection">Roles</label>
                  <select name="role-selection" id="role-selection">
                     <option>All</option>
                     <option>Role A</option>
                     <option>Role B</option>
                     <option>Role C</option>
                  </select>
               </div>
               <div className={styles.latest_date}>
                  <label htmlFor="latest-date">Latest</label>
                  <input name="latest-date" type="date" id="latest-date"></input>
               </div>
               <div className={styles.earliest_date}>
                  <label htmlFor="earliest-date">Earliest</label>
                  <input name="earliest-date" type="date" id="earliest-date"></input>
               </div>
               <button className={styles.new_shout}>
                  <Link href="/shouts/new-shout">
                     <FontAwesomeIcon icon={faBullhorn} />
                     <p>New</p>
                  </Link>
               </button>
            </form>
            <section className={styles.shouts_list}>
               <div className={styles.shout}>
                  <h1>This is the shout title</h1>
                  <h2>
                     Posted By: Alex Wilson &nbsp;
                     <span>Senior Web Developer</span>&nbsp;
                     10:38 AM Sunday, August 18, 2024
                  </h2>
                  <div className={styles.roles_to_address}>
                     <h2>Relevant Roles: </h2>
                     <p>Web Developer</p>
                     <p>Information Architect</p>
                     <p>Backend Developer</p>
                  </div>
                  <details>
                     <summary>View</summary>
                     <article>
                        This is the contents of the actual shout
                     </article>
                  </details>
               </div>
               <div className={styles.shout}>
                  <h1>This is the shout title</h1>
                  <h2>Posted By: Alex Wilson <span>Senior Web Developer</span> | 10:38 AM Sunday, August 18, 2024</h2>
                  <div className={styles.roles_to_address}>
                     <h2>Relevant Roles: </h2>
                     <p>Web Developer</p>
                     <p>Information Architect</p>
                     <p>Backend Developer</p>
                  </div>
                  <details>
                     <summary>View</summary>
                     <article>
                        This is the contents of the actual shout
                     </article>
                  </details>
               </div>
               <div className={styles.shout}>
                  <h1>This is the shout title</h1>
                  <h2>Posted By: Alex Wilson <span>Senior Web Developer</span> | 10:38 AM Sunday, August 18, 2024</h2>
                  <div className={styles.roles_to_address}>
                     <h2>Relevant Roles: </h2>
                     <p>Web Developer</p>
                     <p>Information Architect</p>
                     <p>Backend Developer</p>
                  </div>
                  <details>
                     <summary>View</summary>
                     <article>
                        This is the contents of the actual shout
                     </article>
                  </details>
               </div>
               <div className={styles.shout}>
                  <h1>This is the shout title</h1>
                  <h2>Posted By: Alex Wilson <span>Senior Web Developer</span> | 10:38 AM Sunday, August 18, 2024</h2>
                  <div className={styles.roles_to_address}>
                     <h2>Relevant Roles: </h2>
                     <p>Web Developer</p>
                     <p>Information Architect</p>
                     <p>Backend Developer</p>
                  </div>
                  <details>
                     <summary>View</summary>
                     <article>
                        This is the contents of the actual shout
                     </article>
                  </details>
               </div>
               <div className={styles.view_more}>
                  <button>View More</button>
               </div>
            </section>
            {/* <ActionPopup /> */}
         </section>
      </AccountPageLayout>
   )
}