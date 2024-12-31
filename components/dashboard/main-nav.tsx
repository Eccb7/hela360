"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Receipt,
  Wallet,
  FileSpreadsheet,
  Home,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/tax", label: "Tax Filing", icon: Receipt },
  { href: "/dashboard/banking", label: "Banking", icon: Wallet },
  { href: "/dashboard/documents", label: "Documents", icon: FileSpreadsheet },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2",
            pathname === href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}