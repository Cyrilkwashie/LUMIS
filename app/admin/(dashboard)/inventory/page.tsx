import AdminHeader from "@/components/admin/AdminHeader";
import InventoryTable from "@/components/admin/InventoryTable";
import StatCard from "@/components/admin/StatCard";
import { getAllProducts } from "@/lib/products";

export default function InventoryPage() {
  const products = getAllProducts();
  const outOfStock = products.filter((p) => (p.stockCount ?? 50) === 0).length;
  const lowStock = products.filter((p) => {
    const s = p.stockCount ?? 50;
    return s > 0 && s <= 10;
  }).length;

  return (
    <>
      <AdminHeader
        title="Inventory"
        description="Manage stock levels across your catalog."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total SKUs" value={products.length} />
        <StatCard label="Low Stock" value={lowStock} subtext="10 or fewer units" />
        <StatCard label="Out of Stock" value={outOfStock} />
      </div>

      <InventoryTable products={products} />
    </>
  );
}
