"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ShopFilters, { FilterState } from "@/components/ShopFilters";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";
import { Category, Product } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

function matchesPriceRange(price: number, range: string | null): boolean {
  if (!range) return true;
  switch (range) {
    case "0-100":
      return price < 100;
    case "100-500":
      return price >= 100 && price <= 500;
    case "500-1000":
      return price > 500 && price <= 1000;
    case "1000+":
      return price > 1000;
    default:
      return true;
  }
}

type ShopContentProps = {
  products: Product[];
};

export default function ShopContent({ products }: ShopContentProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    brand: null,
    priceRange: null,
    availability: null,
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam,
    }));
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.priceRange) {
      result = result.filter((p) =>
        matchesPriceRange(p.price, filters.priceRange)
      );
    }
    if (filters.availability === "in-stock") {
      result = result.filter((p) => p.inStock !== false);
    }
    if (filters.availability === "out-of-stock") {
      result = result.filter((p) => p.inStock === false);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sort, products]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  return (
    <PageWrapper>
      <section className="px-6 pb-section pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-syne text-4xl font-bold text-heading">
                Shop
              </h1>
              <p className="mt-2 text-sm text-grey">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="border border-border px-4 py-2 text-sm text-heading lg:hidden"
              >
                Filter
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-border bg-white px-4 py-2 text-sm text-heading focus:border-accent focus:outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="flex gap-12">
            <ShopFilters filters={filters} onChange={handleFilterChange} />

            <div className="flex-1">
              {visibleProducts.length === 0 ? (
                <p className="py-20 text-center text-body">
                  No products match your filters.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="mt-16 text-center">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setVisibleCount((c) => c + ITEMS_PER_PAGE)
                    }
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ShopFilters
        filters={filters}
        onChange={(f) => {
          handleFilterChange(f);
          setDrawerOpen(false);
        }}
        mobile
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </PageWrapper>
  );
}
