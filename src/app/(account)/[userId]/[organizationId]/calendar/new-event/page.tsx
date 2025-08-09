import NewEvent from "./form";

export default async function CreateEventPage({ params }: { params: any }) {
  const { organizationId, userId } = (await params) as {
    organizationId: string;
    userId: string;
  };
  return <NewEvent organizationId={organizationId} userId={userId} />;
}
