import Link from "next/link";
import { notFound } from "next/navigation";
import OrderDetail from "@/components/admin/OrderDetail";
import { getOrderById } from "@/lib/orders";

type Props = { params: { id: string } };

export default function OrderDetailPage({ params }: Props) {
  const order = getOrderById(params.id);
  if (!order) notFound();

  return (
    <>
      <div className="mb-8">
        <Link href="/admin/orders" className="text-sm text-grey hover:text-heading">
          ← Back to Orders
        </Link>
        <h1 className="mt-4 font-syne text-3xl font-bold text-heading">
          {order.orderNumber}
        </h1>
        <p className="mt-1 text-sm text-grey">{order.id}</p>
      </div>

      <OrderDetail order={order} />
    </>
  );
}
