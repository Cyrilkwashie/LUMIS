import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsTable from "@/components/admin/ProductsTable";
import { getAllProducts } from "@/lib/products";

export default function AdminProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <AdminHeader
        title="Products"
        description={`${products.length} products in catalog.`}
        action={
          <Link
            href="/admin/products/new"
            className="bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Add Product
          </Link>
        }
      />

      <ProductsTable products={products} />
    </>
  );
}
