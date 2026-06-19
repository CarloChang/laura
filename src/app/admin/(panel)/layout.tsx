import Link from "next/link";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-condensed text-xl uppercase">
              Laura <span className="text-terracotta">admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="hover:text-terracotta">
                Products
              </Link>
              <Link href="/admin/orders" className="hover:text-terracotta">
                Requests
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View site ↗
            </Link>
            <form action={signOut}>
              <Button variant="ghost" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
