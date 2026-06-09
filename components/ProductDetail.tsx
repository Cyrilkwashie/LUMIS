"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";

type ProductDetailProps = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({
  product,
  related,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.id ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const variant = product.variants.find((v) => v.id === selectedVariant);
  const price = product.price + (variant?.priceModifier ?? 0);
  const variantLabel = variant?.label ?? "Standard";

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price,
        image: product.images[selectedImage],
        variant: variantLabel,
      },
      quantity
    );
  };

  return (
    <PageWrapper>
      <section className="px-6 pb-section pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="relative aspect-square overflow-hidden bg-offwhite">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square overflow-hidden border bg-offwhite ${
                      selectedImage === i
                        ? "border-heading"
                        : "border-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-grey">
                {product.brand}
              </p>
              <h1 className="mt-2 font-syne text-[32px] font-bold leading-tight text-heading">
                {product.name}
              </h1>
              <p className="mt-4 text-[28px] font-bold text-heading">
                ${price.toLocaleString()}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-body">
                {product.description}
              </p>

              {product.variants.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-grey">
                    Variant
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.id)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          selectedVariant === v.id
                            ? "border-accent bg-accent text-white"
                            : "border-border text-body hover:border-heading"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-grey">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-heading hover:bg-offwhite"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="w-12 text-center text-sm text-heading">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-heading hover:bg-offwhite"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleAddToCart} className="flex-1">
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-section border-t border-border pt-section">
            <h2 className="mb-8 font-syne text-2xl font-bold text-heading">
              Specifications
            </h2>
            <dl className="grid max-w-2xl gap-0">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-2 gap-4 border-b border-border py-4"
                >
                  <dt className="text-sm text-grey">{key}</dt>
                  <dd className="text-sm text-heading">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {related.length > 0 && (
            <div className="mt-section border-t border-border pt-section">
              <h2 className="mb-12 font-syne text-2xl font-bold text-heading">
                Related Products
              </h2>
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
