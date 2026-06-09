"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";

type ProductsTableProps = {
  products: Product[];
};

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  };

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-grey">No products found.</p>
    );
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-offwhite">
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Product
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Category
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Price
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Status
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product.id} className="bg-white">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-offwhite">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-heading">{product.name}</p>
                    <p className="text-xs text-grey">{product.brand}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-body">{product.category}</td>
              <td className="px-4 py-4 font-medium text-heading">
                ${product.price.toLocaleString()}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs ${
                      product.inStock !== false
                        ? "text-heading"
                        : "text-grey"
                    }`}
                  >
                    {product.inStock !== false ? "In Stock" : "Out of Stock"}
                  </span>
                  {product.isNew && (
                    <span className="text-xs text-accent">New</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id, product.name)}
                    className="text-sm text-grey hover:text-heading"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
