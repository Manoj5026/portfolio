"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, BookOpen } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/blog", label: "Blog", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-50 flex items-center justify-center w-full">
      <div className="bg-white/80 backdrop-blur-md border border-zinc-200 shadow-lg rounded-full px-6 py-2 flex items-center justify-center gap-4 min-w-[340px] max-w-full">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50
                ${isActive ? "bg-zinc-200 text-foreground" : "hover:bg-zinc-100 text-zinc-700"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
