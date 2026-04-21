import Link from "next/link";
import { navLinks } from "@/app/lib/penny-data";

export function NavBar() {
  return (
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          Penny Juice Prototype
        </Link>
        <nav className="flex flex-wrap items-center gap-2 md:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-emerald-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
