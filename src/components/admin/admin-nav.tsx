"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Products" },
  { href: "/admin/orders", label: "Requests" },
  { href: "/admin/about", label: "Content" },
  { href: "/admin/appearance", label: "Appearance" },
];

export function AdminNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: inline links */}
      <nav className="hidden items-center gap-4 text-sm sm:flex">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:text-terracotta",
              isActive(item.href) && "text-terracotta",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: burger toggle */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="-ml-1 inline-flex items-center justify-center rounded-md p-1.5 hover:text-terracotta sm:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile dropdown panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute left-0 right-0 top-14 z-50 border-b border-border bg-card px-4 py-2 shadow-lg sm:hidden">
            <div className="mx-auto flex max-w-5xl flex-col">
              {LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border/60 py-3 text-sm last:border-0 hover:text-terracotta",
                    isActive(item.href) && "text-terracotta",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
