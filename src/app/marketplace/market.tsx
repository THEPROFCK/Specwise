"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  Watch,
  Headphones,
  Star,
  MapPin,
  ShieldCheck,
  Store,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

/* =======================
   CONFIG
======================= */

const deviceTypeIcons: Record<string, React.ElementType> = {
  phone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  tv: Tv,
  smartwatch: Watch,
  earbuds: Headphones,
};

const conditionColors: Record<string, string> = {
  new: "bg-green-500/10 text-green-600 border-green-500/20",
  refurbished: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  used: "bg-muted text-muted-foreground border-border",
};

interface VendorListing {
  id: string;
  device_name: string;
  device_type: string;
  brand: string;
  model: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  condition: "new" | "refurbished" | "used";
  stock_quantity: number;
  images: string[];
  specifications: unknown;
  warranty_months: number;
  is_featured: boolean;
  vendor: {
    id: string;
    business_name: string;
    slug: string;
    status: string;
    rating: number;
    total_reviews: number;
    location: string | null;
    country: string | null;
  } | null;
}

/* =======================
   PAGE
======================= */

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null
  );
  const [listings, setListings] = useState<VendorListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);

    const { data, error } = await supabase
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
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setListings(data);
      setBrands([...new Set(data.map((l) => l.brand))]);
    }

    setLoading(false);
  };

  const filteredListings = listings.filter((listing) => {
    const q = searchQuery.toLowerCase();
    return (
      (!searchQuery ||
        listing.device_name.toLowerCase().includes(q) ||
        listing.brand.toLowerCase().includes(q) ||
        listing.vendor?.business_name.toLowerCase().includes(q)) &&
      (!selectedBrand || listing.brand === selectedBrand) &&
      (!selectedType || listing.device_type === selectedType) &&
      (!selectedCondition || listing.condition === selectedCondition)
    );
  });

  const deviceTypes = [...new Set(listings.map((l) => l.device_type))];

  const getVendorBadge = (status: string) => {
    const styles: Record<string, string> = {
      official: "bg-primary/10 text-primary border-primary/20",
      trusted: "bg-green-500/10 text-green-600 border-green-500/20",
      verified: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    };

    if (!styles[status]) return null;

    return (
      <Badge className={`${styles[status]} gap-1`}>
        <ShieldCheck className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Marketplace (Coming Soon)</h1>
          </div>
          <p className="text-muted-foreground">
            Buy devices from verified vendors across Africa & Europe
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={!selectedType ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
          >
            All Devices
          </Button>

          {deviceTypes.map((type) => {
            const Icon = deviceTypeIcons[type] || Smartphone;
            return (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {type}
              </Button>
            );
          })}
        </div>

        {/* SEARCH + FILTERS */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search devices, brands, vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

            <Select
              value={selectedBrand || "all"}
              onValueChange={(v) =>
                setSelectedBrand(v === "all" ? null : v)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCondition || "all"}
              onValueChange={(v) =>
                setSelectedCondition(v === "all" ? null : v)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="refurbished">Refurbished</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredListings.map((listing) => {
              const Icon = deviceTypeIcons[listing.device_type] || Smartphone;

              return (
                <Card key={listing.id} className="overflow-hidden">
                  <Link href={`/product/${listing.id}`}>
                    <div className="aspect-video bg-muted relative">
                      {listing.images?.[0] ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.device_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="h-16 w-16 text-muted-foreground/30 mx-auto my-auto" />
                      )}
                      <Badge
                        className={`absolute top-2 left-2 ${conditionColors[listing.condition]}`}
                        variant="outline"
                      >
                        {listing.condition}
                      </Badge>
                    </div>
                  </Link>

                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold">{listing.device_name}</h3>
                    <div className="text-2xl font-bold text-primary">
                      ${listing.price.toLocaleString()}
                    </div>

                    <div className="flex gap-2">
                      <AddToCartButton
                        listingId={listing.id}
                        className="flex-1"
                      />
                      {listing.vendor && (
                        <Link href={`/vendor/${listing.vendor.slug}`}>
                          <Button variant="outline" size="icon">
                            <Store className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Store className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold">No listings found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
