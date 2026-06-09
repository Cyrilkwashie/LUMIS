"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CategoryPill from "@/components/CategoryPill";
import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import PageWrapper from "@/components/PageWrapper";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { Product } from "@/lib/types";

const brands = ["Apple", "Sony", "Samsung", "LG", "Microsoft"];

type HomeContentProps = {
  newArrivals: Product[];
  featuredProducts: { product: Product; imageFirst: boolean }[];
};

export default function HomeContent({
  newArrivals,
  featuredProducts,
}: HomeContentProps) {
  return (
    <PageWrapper>
      <HeroSection />

      <section className="px-6 py-section">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 font-syne text-2xl font-bold text-heading">
            Categories
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                href={`/shop?category=${cat}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite px-6 py-section">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-syne text-2xl font-bold text-heading">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-section">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 md:gap-20">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-syne text-lg font-bold tracking-widest text-grey grayscale"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {featuredProducts.map(({ product, imageFirst }, idx) => (
        <section
          key={product.slug}
          className={`px-6 py-section ${idx % 2 === 1 ? "bg-warm" : ""}`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              className={`relative aspect-[4/3] overflow-hidden bg-offwhite ${
                imageFirst ? "order-1" : "order-1 lg:order-2"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              className={imageFirst ? "order-2" : "order-2 lg:order-1"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-xs uppercase tracking-widest text-grey">
                {product.brand}
              </p>
              <h2 className="mt-3 font-syne text-3xl font-bold text-heading sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-body">
                {product.description}
              </p>
              <Link
                href={`/shop/${product.slug}`}
                className="mt-6 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                View
              </Link>
            </motion.div>
          </div>
        </section>
      ))}

      <NewsletterSection />
    </PageWrapper>
  );
}
