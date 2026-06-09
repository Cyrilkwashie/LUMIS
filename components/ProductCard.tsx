"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      variant: product.variants[0]?.label ?? "Standard",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className="relative aspect-square overflow-hidden bg-offwhite"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            initial={false}
            animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 bg-heading py-3 text-center text-sm font-medium text-white"
          >
            Add to Cart
          </motion.button>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs uppercase tracking-widest text-grey">
            {product.brand}
          </p>
          <h3 className="font-syne text-base text-heading">{product.name}</h3>
          <p className="text-sm font-medium text-heading">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
