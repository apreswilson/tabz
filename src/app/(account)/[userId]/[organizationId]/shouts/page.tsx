import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./shouts.module.scss";
import Organization from "@/models/Organization";
import ShoutsSection from "./filterview";
export interface ShoutsInterface {
   _id: string,
   author: string,
   authorRole: string,
   timePosted: string,
   relevantRoles: string[],
   title: string,
   content: string
}

export default async function Shouts({ params }: { params: { userId: string, organizationId: string } }) {
   const { userId, organizationId } = await params;
   const fetchOrganizationFromDB = await Organization.findOne({ _id: organizationId })
   const shoutsList: ShoutsInterface[] = fetchOrganizationFromDB.shouts.map(({ _id, author, authorRole, timePosted, relevantRoles, title, content }: ShoutsInterface) => ({
      _id: _id.toString(),
      author,
      authorRole,
      timePosted,
      relevantRoles,
      title,
      content
   }));

   return (
      <AccountPageLayout>
         <section>
            <ShoutsSection userId={userId} organizationId={organizationId} shouts={shoutsList} />
         </section>
      </AccountPageLayout>
   )
}