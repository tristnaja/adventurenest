import ActivityForm from "../ActivityForm";

/**
 * Page for creating a new activity.
 */
export default function NewActivityPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Activity</h1>
      <ActivityForm />
    </div>
  );
}
