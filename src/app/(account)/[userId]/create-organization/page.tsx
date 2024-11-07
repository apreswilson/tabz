"use client";
import { useActionState, useEffect } from "react";
import styles from "./create-organization.module.scss";
import { createNewOrganization, updateUserOrganizationList } from "../actions";
import { useParams, useRouter } from "next/navigation";

const initialState = {
   message: "",
   success: false,
   orgname: "",
   timepassed: ""
};

export default function CreateOrganization() {
   const [state, formAction] = useActionState(createNewOrganization, initialState);
   const router = useRouter();
   const params = useParams().userId as string;

   useEffect(() => {
      const appendOrganizationList = async () => {
         if (state.success) {
            await updateUserOrganizationList(params, state.orgname);
            router.push(`/${params}/home`);
         }
      }
      appendOrganizationList();
   }, [params, router, state.orgname, state.success])

   return (
      <section className={styles.create_organization}>
         <h1>Create Organization</h1>
         <p>
            To create a new organization, Tabz only needs the name and will do the
            rest of the set up for you.
         </p>

         <form action={formAction}>
            <label htmlFor="org-name">Organization Name</label>
            <input type="text" id="org-name" name="org-name"></input>
            <button type="submit">Create</button>
            <p>{state?.message}</p>
         </form>
      </section>
   )
}