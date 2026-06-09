"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import Button from "./Button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="px-6 py-section">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-syne text-3xl font-bold text-heading sm:text-4xl">
          Stay in the loop
        </h2>
        <p className="mt-4 text-sm text-grey">
          New arrivals, exclusive offers, and curated picks — delivered
          sparingly.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm text-body">
            Thank you. You&apos;re on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 border border-border bg-white px-4 py-3 text-sm text-heading placeholder:text-grey focus:border-accent focus:outline-none"
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
