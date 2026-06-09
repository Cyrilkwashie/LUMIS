"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";

const pillars = [
  {
    title: "Curation",
    description:
      "Every product is hand-selected. We carry only what we'd use ourselves — nothing more, nothing less.",
  },
  {
    title: "Quality",
    description:
      "Premium materials, proven performance, lasting value. We partner with brands that share our standards.",
  },
  {
    title: "Speed",
    description:
      "Fast, free shipping on orders over $100. Responsive support. Because great tech shouldn't keep you waiting.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="flex min-h-screen items-center justify-center px-6 pt-16">
        <motion.h1
          className="max-w-4xl text-center font-syne text-4xl font-bold leading-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          We believe great tech should be accessible.
        </motion.h1>
      </section>

      <section className="px-6 py-section">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="text-base leading-relaxed text-body sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            LUMIS was founded on a simple conviction: the best technology
            deserves a better shopping experience. No clutter, no noise — just
            exceptional products, presented with care.
          </motion.p>
        </div>
      </section>

      <section className="bg-offwhite px-6 py-section">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-border">
                <span className="font-syne text-lg font-bold text-heading">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-syne text-xl font-bold text-heading">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 py-section">
        <motion.div
          className="relative mx-auto aspect-[21/9] max-w-7xl overflow-hidden bg-offwhite"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=600&fit=crop"
            alt="LUMIS team workspace"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </motion.div>
      </section>
    </PageWrapper>
  );
}
