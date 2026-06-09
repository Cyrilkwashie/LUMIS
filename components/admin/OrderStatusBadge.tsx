import { OrderStatus, PaymentStatus } from "@/lib/types";

const orderStyles: Record<OrderStatus, string> = {
  pending: "bg-warm text-body",
  processing: "bg-offwhite text-heading border border-border",
  shipped: "bg-offwhite text-accent border border-border",
  delivered: "bg-offwhite text-heading border border-border",
  cancelled: "bg-offwhite text-grey line-through",
};

const paymentStyles: Record<PaymentStatus, string> = {
  pending: "bg-warm text-body",
  paid: "bg-offwhite text-heading border border-border",
  refunded: "bg-offwhite text-grey",
  failed: "bg-offwhite text-red-600 border border-border",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-medium capitalize ${orderStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-medium capitalize ${paymentStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default OrderStatusBadge;
