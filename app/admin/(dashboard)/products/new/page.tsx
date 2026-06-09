import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <AdminHeader
        title="Add Product"
        description="Create a new product listing."
      />
      <ProductForm mode="create" />
    </>
  );
}
