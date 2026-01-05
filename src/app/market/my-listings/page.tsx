export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListingActions from "./ListingActions";

/**
 * Page displaying the current user's marketplace listings.
 */
export default async function MyListingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">User not found</p>
      </div>
    );
  }

  const listings = await prisma.marketplaceItem.findMany({
    where: {
      sellerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Listings</h1>
          <p className="text-muted-foreground">
            Manage your marketplace listings
          </p>
        </div>
        <Link href="/market/new">
          <Button>Create New Listing</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Items ({listings.length})</CardTitle>
          <CardDescription>All your marketplace listings</CardDescription>
        </CardHeader>
        <CardContent>
          {listings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven&apos;t listed any items yet
              </p>
              <Link href="/market/new">
                <Button>Create Your First Listing</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableCaption>All your marketplace listings</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">
                      {listing.title}
                    </TableCell>
                    <TableCell>${Number(listing.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          listing.status === "AVAILABLE"
                            ? "text-green-600 font-semibold"
                            : "text-gray-600 font-semibold"
                        }
                      >
                        {listing.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {listing.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <ListingActions
                        listingId={listing.id}
                        currentStatus={listing.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
