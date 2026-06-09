"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories, brands } from "@/data/products";
import { Category, Product, ProductVariant } from "@/lib/types";

type ProductFormProps = {
  product?: Product;
  mode: "create" | "edit";
};

const inputClass =
  "w-full border border-border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-grey focus:border-accent focus:outline-none";
const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-widest text-grey";

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(product?.name ?? "");
  const [brand, setBrand] = useState(product?.brand ?? brands[0]);
  const [category, setCategory] = useState<Category>(
    product?.category ?? "Phones"
  );
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [images, setImages] = useState(
    product?.images?.join("\n") ?? ""
  );
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [inStock, setInStock] = useState(product?.inStock !== false);
  const [specs, setSpecs] = useState(
    product?.specs
      ? Object.entries(product.specs)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : ""
  );
  const [variants, setVariants] = useState(
    product?.variants
      ?.map((v) => `${v.id}|${v.label}|${v.priceModifier ?? 0}`)
      .join("\n") ?? "default|Standard|0"
  );

  const parseSpecs = (): Record<string, string> => {
    const result: Record<string, string> = {};
    specs.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) {
        result[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
      }
    });
    return result;
  };

  const parseVariants = (): ProductVariant[] =>
    variants
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [id, label, mod] = line.split("|");
        return {
          id: id.trim(),
          label: label.trim(),
          priceModifier: Number(mod) || 0,
        };
      });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name,
      brand,
      category,
      price: Number(price),
      slug,
      description,
      images: images.split("\n").map((s) => s.trim()).filter(Boolean),
      specs: parseSpecs(),
      variants: parseVariants(),
      isNew,
      inStock,
    };

    const url =
      mode === "create"
        ? "/api/admin/products"
        : `/api/admin/products/${product!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Failed to save product.");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Brand</label>
          <select
            className={inputClass}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Price ($)</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated if empty"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} min-h-[100px] resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Images (one URL per line)</label>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y font-mono text-xs`}
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>
            Specs (key: value, one per line)
          </label>
          <textarea
            className={`${inputClass} min-h-[100px] resize-y font-mono text-xs`}
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>
            Variants (id|label|priceModifier, one per line)
          </label>
          <textarea
            className={`${inputClass} min-h-[60px] resize-y font-mono text-xs`}
            value={variants}
            onChange={(e) => setVariants(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-body">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm text-body">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            In Stock
          </label>
        </div>
      </div>

      <div className="flex gap-3 border-t border-border pt-8">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-border px-6 py-2.5 text-sm text-body hover:border-heading hover:text-heading"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
