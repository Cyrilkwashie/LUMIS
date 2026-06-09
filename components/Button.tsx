"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent/90 border border-accent",
  outline:
    "bg-transparent text-heading border border-heading hover:bg-heading hover:text-white",
  ghost: "bg-transparent text-heading border border-transparent hover:bg-offwhite",
};

export default function Button({
  variant = "primary",
  children,
  href,
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 rounded disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
