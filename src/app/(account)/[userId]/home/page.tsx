import styles from "./home.module.scss";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encrypt";
import { SessionInterface } from "@/lib/definitions";
import LogoutButton from "./logout";
import { redirect } from "next/navigation";
import OrganizationList from "./organization";
import OrganizationInvite from "./invite";

export default async function UserHome({ params }: { params: any }) {
  const { userId } = params as {
    userId: string;
  };
  const cookieStore = (await cookies()).get("session");
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
          <OrganizationInvite userId={userId} inviteName={invite.name} inviteId={invite._id} key={invite.name} />
        ))}
      </section>

      <section className={styles.organizations}>
        <h2>Organizations</h2>
        {userData?.organizations.map((organization) => (
          <OrganizationList
            userId={userId}
            organizationName={organization.name}
            organizationJoined={organization.joined}
            organizationId={organization._id}
            key={organization.name}
          />
        ))}
      </section>

      <section className={styles.visit_settings}>
        <h2>Account</h2>
        <p>Wish to view or update your account information?</p>
        <div className={styles.action_buttons}>
          <button className={styles.settings}>
            <Link href={`/${userId}/account`}>Account</Link>
          </button>
          <LogoutButton />
        </div>
      </section>

      <section className={styles.new_organization}>
        <h2>New Organization</h2>
        <p>Wish to create your own organization?</p>
        <button className={styles.create_organization}>
          <Link href={`/${userId}/create-organization`}>Create</Link>
        </button>
      </section>
    </main>
  );
}
