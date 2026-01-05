import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Default images for marketplace items (in production, users would upload their own)
const marketplaceImages = [
  "https://images.unsplash.com/photo-1622260614927-9a5182c82505?q=80&w=2070&auto=format&fit=crop", // backpack
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop", // tent
  "https://images.unsplash.com/photo-1486849353243-6c73f1e22c1e?q=80&w=2070&auto=format&fit=crop", // camping gear
  "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=2070&auto=format&fit=crop", // hiking boots
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop", // outdoor equipment
];

/**
 * Community Marketplace page for C2C transactions.
 */
export default async function MarketplacePage() {
  const session = await auth();

  const listings = await prisma.marketplaceItem.findMany({
    where: {
      status: "AVAILABLE",
    },
    include: {
      seller: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Marketplace</h1>
          <p className="text-muted-foreground">
            Buy and sell used outdoor gear with other members
          </p>
        </div>
        {session?.user && (
          <Link href="/market/new">
            <Button size="lg">List an Item</Button>
          </Link>
        )}
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No items listed yet. Be the first to list!
            </p>
            {session?.user && (
              <Link href="/market/new">
                <Button>Create Your First Listing</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <Card key={listing.id} className="flex flex-col">
              <CardHeader>
                <img
                  src={marketplaceImages[index % marketplaceImages.length]}
                  alt={listing.title}
                  className="rounded-t-lg h-48 w-full object-cover mb-4"
                />
                <CardTitle>{listing.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{listing.description}</CardDescription>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Seller:</strong> {listing.seller.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Posted:</strong>{" "}
                    {listing.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-2xl font-bold">
                  ${Number(listing.price).toFixed(2)}
                </p>
                <Button>Contact Seller</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {session?.user && (
        <div className="mt-8">
          <Link href="/market/my-listings">
            <Button variant="outline">View My Listings</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
