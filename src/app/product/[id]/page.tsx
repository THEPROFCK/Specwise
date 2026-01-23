import { supabase } from "@/integrations/supabase/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Store, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { data: listing } = await supabase
    .from("vendor_listings")
    .select(
      `
      *,
      vendor:vendors(
        id,
        business_name,
        slug,
        status,
        rating,
        total_reviews,
        location,
        country
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (!listing) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
          {listing.images?.[0] && (
            <Image
              src={listing.images[0]}
              alt={listing.device_name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* DETAILS */}
        <div>
          <Badge variant="secondary" className="mb-3">
            {listing.brand}
          </Badge>

          <h1 className="text-3xl font-bold mb-4">
            {listing.device_name}
          </h1>

          <p className="text-muted-foreground mb-6">
            {listing.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">
              ${listing.price.toLocaleString()}
            </span>

            {listing.original_price && (
              <span className="line-through text-muted-foreground">
                ${listing.original_price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm mb-6">
            {listing.warranty_months > 0 && (
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                {listing.warranty_months} months warranty
              </span>
            )}
            <span
              className={
                listing.stock_quantity > 0
                  ? "text-green-600"
                  : "text-destructive"
              }
            >
              {listing.stock_quantity > 0
                ? `${listing.stock_quantity} in stock`
                : "Out of stock"}
            </span>
          </div>

          <AddToCartButton listingId={listing.id} size="lg" />

          {/* VENDOR */}
          {listing.vendor && (
            <div className="mt-10 p-6 rounded-xl border bg-muted/50">
              <Link href={`/vendor/${listing.vendor.slug}`}>
                <h3 className="font-semibold text-lg hover:text-primary">
                  <Store className="inline h-4 w-4 mr-2" />
                  {listing.vendor.business_name}
                </h3>
              </Link>

              <div className="flex items-center gap-4 text-sm mt-2">
                {listing.vendor.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {listing.vendor.rating.toFixed(1)}
                  </span>
                )}
                {listing.vendor.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {listing.vendor.location}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
