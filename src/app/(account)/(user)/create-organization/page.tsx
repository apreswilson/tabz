import styles from "./create-organization.module.scss";

export default function CreateOrganization() {
   return (
      <section className={styles.create_organization}>
         <h1>Create Organization</h1>
         <p>
            To create a new organization, Tabz only needs the name and will do the
            rest of the set up for you.
         </p>

         <form>
            <label htmlFor="org-name">Organization Name</label>
            <input type="text" id="org-name"></input>
            <button type="submit">Create</button>
         </form>
      </section>
   )
}