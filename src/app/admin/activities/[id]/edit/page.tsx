export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ActivityForm from "../../ActivityForm";

/**
 * Page for editing an existing activity.
 */
export default async function EditActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const activity = await prisma.activity.findUnique({
    where: { id: params.id },
  });

  if (!activity) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Activity</h1>
      <ActivityForm activity={activity} isEdit />
    </div>
  );
}
