import AdminHeader from "@/components/admin/AdminHeader";
import OrderForm from "@/components/admin/OrderForm";
import { getAllProducts } from "@/lib/products";

export default function NewOrderPage() {
  const products = getAllProducts();

  return (
    <>
      <AdminHeader
        title="Create Order"
        description="Manually create a new order."
      />
      <OrderForm mode="create" products={products} />
    </>
  );
}
