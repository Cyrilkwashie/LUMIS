import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found — LUMIS" };
  return {
    title: `${product.name} — LUMIS`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetail product={product} related={related} />;
}
