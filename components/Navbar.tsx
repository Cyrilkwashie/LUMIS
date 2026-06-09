"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const textClass = transparent
    ? "text-white hover:text-white/80"
    : "text-body hover:text-heading";

  const iconClass = transparent
    ? "text-white transition-opacity hover:opacity-60"
    : "text-heading transition-opacity hover:opacity-60";

  const logoClass = transparent
    ? "font-syne text-xl font-bold tracking-tight text-white"
    : "font-syne text-xl font-bold tracking-tight text-heading";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: transparent ? "rgba(255,255,255,0)" : "#FFFFFF",
          borderBottomWidth: scrolled || !isHome ? 1 : 0,
          borderBottomColor: "#E5E7EB",
        }}
        transition={{ duration: 0.3 }}
        style={{ borderBottomStyle: "solid" }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link href="/" className={logoClass}>
            LUMIS
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`text-sm transition-colors ${textClass}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Search"
              className={iconClass}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16 16" />
              </svg>
            </button>

            <Link
              href="/cart"
              className={`relative ${iconClass}`}
              aria-label={`Cart, ${itemCount} items`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 6h15l-1.5 9h-12L6 6z" />
                <path d="M6 6L5 3H2" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              className={`md:hidden ${iconClass}`}
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-syne text-xl font-bold text-heading">
                LUMIS
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="text-heading"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-syne text-3xl text-heading"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
