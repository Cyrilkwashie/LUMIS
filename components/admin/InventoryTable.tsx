"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";

export default function InventoryTable({ products }: { products: Product[] }) {
  const router = useRouter();

  const updateStock = async (id: string, stockCount: number) => {
    await fetch("/api/admin/inventory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stockCount, inStock: stockCount > 0 }),
    });
    router.refresh();
  };

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-offwhite">
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Product</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Category</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Stock</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Status</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => {
            const stock = product.stockCount ?? (product.inStock === false ? 0 : 50);
            const lowStock = stock > 0 && stock <= 10;
            return (
              <tr key={product.id} className="bg-white">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden bg-offwhite">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-heading">{product.name}</p>
                      <p className="text-xs text-grey">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-body">{product.category}</td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    defaultValue={stock}
                    onBlur={(e) => updateStock(product.id, Number(e.target.value))}
                    className="w-20 border border-border px-2 py-1 text-sm text-heading focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-medium ${stock === 0 ? "text-grey" : lowStock ? "text-accent" : "text-heading"}`}>
                    {stock === 0 ? "Out of Stock" : lowStock ? "Low Stock" : "In Stock"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button type="button" onClick={() => updateStock(product.id, 0)} className="mr-3 text-xs text-grey hover:text-heading">
                    Mark out
                  </button>
                  <button type="button" onClick={() => updateStock(product.id, 50)} className="text-xs text-accent hover:underline">
                    Restock
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
