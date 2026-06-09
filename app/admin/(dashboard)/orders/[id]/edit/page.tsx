import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderForm from "@/components/admin/OrderForm";
import { getOrderById } from "@/lib/orders";
import { getAllProducts } from "@/lib/products";

type Props = { params: { id: string } };

export default function EditOrderPage({ params }: Props) {
  const order = getOrderById(params.id);
  if (!order) notFound();

  const products = getAllProducts();

  return (
    <>
      <AdminHeader
        title="Edit Order"
        description={order.orderNumber}
      />
      <OrderForm mode="edit" order={order} products={products} />
    </>
  );
}
