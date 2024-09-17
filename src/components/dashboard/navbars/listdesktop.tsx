"use client";
import {
  Badge,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ListDesktopNav({
  navItems,
}: {
  navItems: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();
  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              pathname === item.href
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } transition-all hover:text-primary`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
