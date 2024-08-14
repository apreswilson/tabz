import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./top-bar.module.scss";


export default function TopBar() {
   return (
      <section className={styles.top_bar}>
         <h1>Organization Title</h1>
      </section>
   )
}