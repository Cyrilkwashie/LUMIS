"use client";

import Link from "next/link";
import { Category } from "@/lib/types";

type CategoryPillProps = {
  label: Category;
  active?: boolean;
  href?: string;
  onClick?: () => void;
};

export default function CategoryPill({
  label,
  active = false,
  href,
  onClick,
}: CategoryPillProps) {
  const classes = `inline-flex shrink-0 items-center px-5 py-2.5 text-sm font-medium tracking-wide rounded-full border transition-colors duration-200 ${
    active
      ? "bg-accent text-white border-accent"
      : "bg-white text-body border-border hover:border-heading hover:text-heading"
  }`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
