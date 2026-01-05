import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ListingForm from "../ListingForm";

/**
 * Page for creating a new marketplace listing.
 */
export default async function NewListingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
      <p className="text-muted-foreground mb-8">
        List your used outdoor gear for sale in the community marketplace
      </p>
      <ListingForm />
    </div>
  );
}
