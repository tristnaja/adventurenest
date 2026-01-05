"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Cart button that displays the number of items in the cart.
 */
export default function CartButton() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/cart">
      <Button variant="outline" className="relative">
        🛒 Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
}
