"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HomepageFeatured, Product } from "@/lib/types";

type HomepageEditorProps = {
  featured: HomepageFeatured[];
  products: Product[];
};

export default function HomepageEditor({
  featured: initialFeatured,
  products,
}: HomepageEditorProps) {
  const router = useRouter();
  const [featured, setFeatured] = useState(initialFeatured);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addProductId, setAddProductId] = useState("");

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const usedIds = new Set(featured.map((f) => f.productId));
  const availableProducts = products.filter((p) => !usedIds.has(p.id));

  const save = async (next: HomepageFeatured[]) => {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: next }),
    });
    if (res.ok) {
      setSaved(true);
      router.refresh();
    }
    setSaving(false);
  };

  const handleAdd = () => {
    if (!addProductId) return;
    const next = [
      ...featured,
      { productId: addProductId, imageFirst: featured.length % 2 === 0 },
    ];
    setFeatured(next);
    setAddProductId("");
    save(next);
  };

  const handleRemove = (index: number) => {
    const next = featured.filter((_, i) => i !== index);
    setFeatured(next);
    save(next);
  };

  const toggleImageFirst = (index: number) => {
    const next = featured.map((item, i) =>
      i === index ? { ...item, imageFirst: !item.imageFirst } : item
    );
    setFeatured(next);
    save(next);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= featured.length) return;
    const next = [...featured];
    [next[index], next[target]] = [next[target], next[index]];
    setFeatured(next);
    save(next);
  };

  return (
    <div className="space-y-8">
      <div className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">
          Add Featured Product
        </h2>
        <p className="mt-1 text-sm text-grey">
          Products appear on the homepage in the alternating image + text layout.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <select
            value={addProductId}
            onChange={(e) => setAddProductId(e.target.value)}
            className="min-w-[240px] flex-1 border border-border bg-white px-3 py-2 text-sm text-heading focus:border-accent focus:outline-none"
          >
            <option value="">Select a product...</option>
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.brand}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!addProductId || saving}
            className="bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50"
          >
            Add to Homepage
          </button>
        </div>
      </div>

      {featured.length === 0 ? (
        <p className="py-12 text-center text-sm text-grey">
          No featured products yet. Add one above.
        </p>
      ) : (
        <div className="space-y-4">
          {featured.map((entry, index) => {
            const product = getProduct(entry.productId);
            if (!product) return null;

            return (
              <div
                key={`${entry.productId}-${index}`}
                className="border border-border bg-white p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-offwhite">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-grey">
                      {product.brand}
                    </p>
                    <h3 className="font-syne text-lg font-bold text-heading">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-body">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0 || saving}
                      className="border border-border px-3 py-1.5 text-xs text-body hover:border-heading disabled:opacity-40"
                    >
                      Move Up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, 1)}
                      disabled={index === featured.length - 1 || saving}
                      className="border border-border px-3 py-1.5 text-xs text-body hover:border-heading disabled:opacity-40"
                    >
                      Move Down
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleImageFirst(index)}
                      disabled={saving}
                      className="border border-border px-3 py-1.5 text-xs text-body hover:border-heading"
                    >
                      Image {entry.imageFirst ? "Left" : "Right"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      disabled={saving}
                      className="px-3 py-1.5 text-xs text-grey hover:text-heading"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs text-grey">Preview layout</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex h-16 items-center justify-center border border-border ${
                        entry.imageFirst ? "bg-offwhite text-heading" : "text-grey"
                      }`}
                    >
                      {entry.imageFirst ? "Image" : "Text"}
                    </div>
                    <div
                      className={`flex h-16 items-center justify-center border border-border ${
                        !entry.imageFirst ? "bg-offwhite text-heading" : "text-grey"
                      }`}
                    >
                      {!entry.imageFirst ? "Image" : "Text"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {saving && (
        <p className="text-sm text-grey">Saving...</p>
      )}
      {saved && !saving && (
        <p className="text-sm text-accent">Homepage updated.</p>
      )}
    </div>
  );
}
