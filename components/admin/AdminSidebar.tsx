"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/homepage", label: "Homepage", exact: false },
  { href: "/admin/orders", label: "Orders", exact: false },
  { href: "/admin/products", label: "Products", exact: false },
  { href: "/admin/customers", label: "Customers", exact: false },
  { href: "/admin/inventory", label: "Inventory", exact: false },
  { href: "/admin/analytics", label: "Analytics", exact: false },
];

type AdminSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-60 flex-col border-r border-border bg-white transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="font-syne text-lg font-bold text-heading">
            LUMIS
          </Link>
          <span className="ml-2 text-xs uppercase tracking-widest text-grey">
            Admin
          </span>
        </div>

        <nav className="flex-1 px-4 py-6" aria-label="Admin navigation">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive(link.href, link.exact)
                      ? "bg-offwhite font-medium text-heading"
                      : "text-body hover:bg-offwhite hover:text-heading"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="block px-3 py-2 text-sm text-grey transition-colors hover:text-heading"
          >
            View Storefront
          </Link>
        </div>
      </aside>
    </>
  );
}
