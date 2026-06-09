"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@/lib/types";
import { brands, categories } from "@/data/products";

export type FilterState = {
  category: Category | null;
  brand: string | null;
  priceRange: string | null;
  availability: string | null;
};

type ShopFiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  mobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
};

const priceRanges = [
  { value: "0-100", label: "Under $100" },
  { value: "100-500", label: "$100 – $500" },
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000+", label: "Over $1,000" },
];

function FilterContent({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
          Category
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    category: filters.category === cat ? null : cat,
                  })
                }
                className={`text-sm transition-colors ${
                  filters.category === cat
                    ? "font-medium text-accent"
                    : "text-body hover:text-heading"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
          Brand
        </h3>
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    brand: filters.brand === brand ? null : brand,
                  })
                }
                className={`text-sm transition-colors ${
                  filters.brand === brand
                    ? "font-medium text-accent"
                    : "text-body hover:text-heading"
                }`}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
          Price Range
        </h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range.value}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    priceRange:
                      filters.priceRange === range.value ? null : range.value,
                  })
                }
                className={`text-sm transition-colors ${
                  filters.priceRange === range.value
                    ? "font-medium text-accent"
                    : "text-body hover:text-heading"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
          Availability
        </h3>
        <ul className="space-y-2">
          {[
            { value: "in-stock", label: "In Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
          ].map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    availability:
                      filters.availability === opt.value ? null : opt.value,
                  })
                }
                className={`text-sm transition-colors ${
                  filters.availability === opt.value
                    ? "font-medium text-accent"
                    : "text-body hover:text-heading"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            category: null,
            brand: null,
            priceRange: null,
            availability: null,
          })
        }
        className="text-sm text-grey underline-offset-4 hover:text-heading hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default function ShopFilters({
  filters,
  onChange,
  mobile = false,
  isOpen = false,
  onClose,
}: ShopFiltersProps) {
  if (mobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-80 overflow-y-auto bg-white p-8 pt-24 shadow-subtle"
            >
              <FilterContent filters={filters} onChange={onChange} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <FilterContent filters={filters} onChange={onChange} />
    </aside>
  );
}
