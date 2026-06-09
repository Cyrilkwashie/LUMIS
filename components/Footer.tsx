import Link from "next/link";

const shopLinks = [
  { href: "/shop?category=Phones", label: "Phones" },
  { href: "/shop?category=Laptops", label: "Laptops" },
  { href: "/shop?category=Gaming", label: "Gaming" },
  { href: "/shop?category=Audio", label: "Audio" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop All" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-section lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-syne text-xl font-bold tracking-tight text-heading"
            >
              LUMIS
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-grey">
              The world&apos;s best gadgets. Curated for people who care.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body transition-colors hover:text-heading"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body transition-colors hover:text-heading"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-grey">
              Connect
            </h4>
            <div className="flex gap-5">
              <a
                href="#"
                aria-label="Twitter"
                className="text-heading transition-opacity hover:opacity-60"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-heading transition-opacity hover:opacity-60"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-heading transition-opacity hover:opacity-60"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs text-grey">
            &copy; {new Date().getFullYear()} LUMIS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
