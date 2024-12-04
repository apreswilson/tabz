import AccountPageLayout from "@/components/account-pages/account-page-layout";
import MemberList from "./memberlist";
import Organization from "@/models/Organization";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encrypt";
import { SessionInterface } from "@/lib/definitions";

export interface OrganizatioCookienData {
   _id: string,
   organizationName: string,
   dateCreated: string,
   userRole: string
}

export interface MembersInterface {
   _id: string,
   memberName: string,
   memberEmail: string,
   role: string
}

export default async function Members({
   params
}: {
   params: {
      userId: string,
      organizationId: string
   }
}) {

   const { userId, organizationId } = await params;
   const fetchOrganizationData = await Organization.findById({ _id: organizationId });
   const organizedMembers: MembersInterface[] = fetchOrganizationData.members.map(({ _id, memberName, memberEmail, role }: MembersInterface) => ({
      _id: _id.toString(),
      memberName,
      memberEmail,
      role
   }))
   const fetchOrganizationSessionData = (await cookies()).get("org-session")?.value;
   const decryptedData = fetchOrganizationSessionData ? await decrypt(fetchOrganizationSessionData) : undefined;
   const organizationDataProps: OrganizatioCookienData = decryptedData.organizationData;

   const fetchUserSessionData = (await cookies()).get("session")?.value;
   const decryptedUserData = fetchUserSessionData ? await decrypt(fetchUserSessionData) : undefined;
   const userDataProps: SessionInterface = decryptedUserData.userData;

   console.log(organizationDataProps, userDataProps)

   return (
      <AccountPageLayout>
         <MemberList
            members={organizedMembers}
            userId={userId}
            organizationId={organizationId}
            userCookieData={userDataProps}
         />

      </AccountPageLayout>
   )
}