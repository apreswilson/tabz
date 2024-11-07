import styles from "./home.module.scss";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encrypt";
import { SessionInterface } from "@/lib/definitions";
import LogoutButton from "./logout";
import { redirect } from "next/navigation";
import { LeaveButton } from "./leave";

export default async function UserHome({ params }: { params: { userId: string } }) {
   const { userId } = await params;
   const cookieStore = (await cookies()).get('session');
   const decryptValue = cookieStore ? await decrypt(cookieStore?.value) : null;
   if (!decryptValue) {
      redirect("/login");
   }

   const userData: SessionInterface = decryptValue.userData;

   return (
      <main className={styles.home}>
         <h1>Welcome {userData?.firstName || "N/A"}</h1>
         <section className={styles.invites}>
            <h2>Invites</h2>
            {userData?.invites.map((invite) => (
               <div className={styles.invite} key={invite.name}>
                  <p>{invite.name}</p>
                  <div className={styles.options}>
                     <button className={styles.accept}>Accept</button>
                     <button className={styles.decline}>Decline</button>
                  </div>
               </div>
            ))}
         </section>

         <section className={styles.organizations}>
            <h2>Organizations</h2>
            {userData?.organizations.map((organization) => (
               <div className={styles.organization} key={organization.name}>
                  <p>{organization.name}</p>
                  <p>Joined: {organization.joined ? new Date(organization.joined).toLocaleDateString("en-US") : "Date not available"}</p>
                  <LeaveButton userId={userId} organizationName={organization.name} />
               </div>
            ))}
         </section>

         <section className={styles.visit_settings}>
            <h2>Account</h2>
            <p>Wish to view or update your account information?</p>
            <div className={styles.action_buttons}>
               <button className={styles.settings}><Link href={`/${userId}/account`}>Account</Link></button>
               <LogoutButton />
            </div>
         </section>

         <section className={styles.new_organization}>
            <h2>New Organization</h2>
            <p>Wish to create your own organization?</p>
            <button className={styles.create_organization}><Link href={`/${userId}/create-organization`}>Create</Link></button>
         </section>

      </main>
   )
}

