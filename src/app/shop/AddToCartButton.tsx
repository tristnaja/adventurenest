"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  disabled?: boolean;
}

/**
 * Button to add products to the shopping cart.
 */
export default function AddToCartButton({
  productId,
  productName,
  price,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({ productId, productName, price });

    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Button onClick={handleAddToCart} disabled={disabled || isAdding}>
      {isAdding ? "Added!" : disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
