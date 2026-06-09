"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-section pt-28">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="mb-12 text-center font-syne text-4xl font-bold text-heading">
            Contact
          </h1>

          {submitted ? (
            <p className="text-center text-body">
              Thank you for reaching out. We&apos;ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-widest text-grey"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-heading placeholder:text-grey focus:border-accent focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-widest text-grey"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-heading placeholder:text-grey focus:border-accent focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-widest text-grey"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none border-b border-border bg-transparent py-3 text-sm text-heading placeholder:text-grey focus:border-accent focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          )}

          <div className="mt-16 space-y-2 text-center text-sm text-grey">
            <p>hello@lumis.com</p>
            <p>+1 (800) 555-0199</p>
            <p>San Francisco, CA</p>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
