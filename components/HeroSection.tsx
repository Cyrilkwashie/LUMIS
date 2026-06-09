"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroVideo from "./HeroVideo";

const headline = "Technology, Refined.";

export default function HeroSection() {
  const words = headline.split(" ");

  return (
    <section className="relative isolate h-[100svh] w-full overflow-hidden bg-black md:h-screen">
      <HeroVideo />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 max-w-4xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block font-syne text-[40px] font-bold text-white md:text-[72px]"
              style={{ letterSpacing: "-0.03em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mb-10 max-w-md font-sans text-[18px] text-white/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The world&apos;s best gadgets. Curated for people who care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-medium tracking-wide text-heading transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
