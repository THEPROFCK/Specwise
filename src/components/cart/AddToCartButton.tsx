"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  listingId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost";
  showText?: boolean;
}

export function AddToCartButton({
  listingId,
  className,
  size = "default",
  variant = "default",
  showText = true,
}: AddToCartButtonProps) {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some(
    (item) => item.listing_id === listingId
  );

  const handleClick = async () => {
    if (isInCart) return;

    setIsAdding(true);
    await addToCart(listingId);
    setIsAdding(false);
  };

  return (
    <Button
      variant={isInCart ? "secondary" : variant}
      size={size}
      className={cn(className)}
      onClick={handleClick}
      disabled={isAdding || isInCart}
    >
      {isAdding ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isInCart ? (
        <Check className="h-4 w-4" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}

      {showText && (
        <span className="ml-2">
          {isInCart ? "In Cart" : "Add to Cart"}
        </span>
      )}
    </Button>
  );
}
