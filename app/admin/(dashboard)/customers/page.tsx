import AdminHeader from "@/components/admin/AdminHeader";
import CustomersTable from "@/components/admin/CustomersTable";
import OrdersTable from "@/components/admin/OrdersTable";
import { getAllCustomers, getCustomerOrders } from "@/lib/customers";

type Props = {
  searchParams: { email?: string };
};

export default function CustomersPage({ searchParams }: Props) {
  const customers = getAllCustomers();
  const selectedEmail = searchParams.email;
  const customerOrders = selectedEmail
    ? getCustomerOrders(selectedEmail)
    : null;
  const selectedCustomer = selectedEmail
    ? customers.find((c) => c.email === selectedEmail)
    : null;

  return (
    <>
      <AdminHeader
        title="Customers"
        description={`${customers.length} unique customers`}
      />

      <CustomersTable customers={customers} />

      {selectedCustomer && customerOrders && (
        <div className="mt-12">
          <h2 className="mb-2 font-syne text-xl font-bold text-heading">
            Orders for {selectedCustomer.name}
          </h2>
          <p className="mb-6 text-sm text-grey">{selectedCustomer.email}</p>
          <OrdersTable orders={customerOrders} showCustomer={false} />
        </div>
      )}
    </>
  );
}
