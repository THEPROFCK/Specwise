"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  listing_id: string;
  quantity: number;
  listing: {
    id: string;
    device_name: string;
    brand: string;
    price: number;
    images: string[] | null;
    vendor: {
      business_name: string;
      slug: string;
    };
  };
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  itemCount: number;
  total: number;
  addToCart: (listingId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCart = async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        id,
        listing_id,
        quantity,
        vendor_listings (
          id,
          device_name,
          brand,
          price,
          images,
          vendors (
            business_name,
            slug
          )
        )
      `
      )
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
      setIsLoading(false);
      return;
    }

    const cartItems: CartItem[] = (data || []).map((item: any) => ({
      id: item.id,
      listing_id: item.listing_id,
      quantity: item.quantity,
      listing: {
        id: item.vendor_listings.id,
        device_name: item.vendor_listings.device_name,
        brand: item.vendor_listings.brand,
        price: item.vendor_listings.price,
        images: item.vendor_listings.images,
        vendor: {
          business_name: item.vendor_listings.vendors.business_name,
          slug: item.vendor_listings.vendors.slug,
        },
      },
    }));

    setItems(cartItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCart();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchCart();
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = async (listingId: string, quantity = 1) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    const existingItem = items.find(
      (item) => item.listing_id === listingId
    );

    if (existingItem) {
      await updateQuantity(
        existingItem.id,
        existingItem.quantity + quantity
      );
      return;
    }

    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      listing_id: listingId,
      quantity,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });

    await fetchCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
      return;
    }

    await fetchCart();
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Removed",
      description: "Item has been removed from your cart",
    });

    await fetchCart();
  };

  const clearCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
      return;
    }

    setItems([]);
  };

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = items.reduce(
    (sum, item) => sum + item.listing.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        itemCount,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refetch: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
