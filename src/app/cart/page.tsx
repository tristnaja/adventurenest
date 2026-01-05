"use client";

import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

/**
 * Shopping cart page displaying cart items and checkout.
 */
export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Your cart is empty
            </p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cart Items ({totalItems})</CardTitle>
          <CardDescription>Review your items before checkout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div className="flex-grow">
                <h3 className="font-semibold">{item.productName}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.productId,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
                <p className="font-semibold w-24 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/checkout" className="flex-1">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
