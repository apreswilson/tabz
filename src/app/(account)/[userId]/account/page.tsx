import styles from "./account.module.scss";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encrypt";
import { redirect } from "next/navigation";
import UserSettingsForm, { UpdateUser } from "./form";

export default async function Settings() {
  const cookieStore = (await cookies()).get("session");
  const decryptValue = cookieStore ? await decrypt(cookieStore?.value) : null;
  if (!decryptValue) {
    redirect("/login");
  }
  const userData: UpdateUser = decryptValue.userData;

  return (
    <main className={styles.account_page}>
      <UserSettingsForm userData={userData} />
    </main>
  );
}
