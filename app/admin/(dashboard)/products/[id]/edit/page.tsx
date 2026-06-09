import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";

type Props = { params: { id: string } };

export default function EditProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <>
      <AdminHeader
        title="Edit Product"
        description={product.name}
      />
      <ProductForm mode="edit" product={product} />
    </>
  );
}
