import { Suspense } from "react";
import ShopContent from "@/components/ShopContent";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Shop — LUMIS",
  description: "Browse our curated collection of premium technology.",
};

export const dynamic = "force-dynamic";

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center pt-16">
          <p className="text-grey">Loading...</p>
        </div>
      }
    >
      <ShopContent products={products} />
    </Suspense>
  );
}
