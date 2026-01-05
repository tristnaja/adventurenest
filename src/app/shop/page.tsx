import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./AddToCartButton";

// Image mapping for products (in production, these would be stored in the database)
const productImages: Record<string, string> = {
  "Professional Hiking Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop",
  "Camping Tent (4-Person)": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop",
  "Portable Water Filter": "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop",
};

const defaultProductImage = "https://images.unsplash.com/photo-1486849353243-6c73f1e22c1e?w=800&auto=format&fit=crop";

/**
 * New Gear Shop page displaying all available products.
 */
export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">New Gear Shop</h1>
        <p className="text-muted-foreground">
          Premium outdoor equipment and merchandise
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <img
                  src={productImages[product.name] || defaultProductImage}
                  alt={product.name}
                  className="rounded-t-lg h-48 w-full object-cover mb-4"
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{product.description}</CardDescription>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Stock:</strong>{" "}
                    {product.stock > 0 ? (
                      <span className="text-green-600">
                        {product.stock} available
                      </span>
                    ) : (
                      <span className="text-red-600">Out of stock</span>
                    )}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-2xl font-bold">
                  ${Number(product.price).toFixed(2)}
                </p>
                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                  price={Number(product.price)}
                  disabled={product.stock === 0}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
