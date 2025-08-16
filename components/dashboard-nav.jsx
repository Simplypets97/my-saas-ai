"use client" // This is a client component because it uses the `usePathname` hook

import Link from "next/link"
import { usePathname } from "next/navigation"

// A helper function to manage CSS classes
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function DashboardNav() {
  const pathname = usePathname()

  // Define your dashboard navigation links here
  const navLinks = [
    {
      href: "/dashboard",
      name: "Overview"
    },
    {
      href: "/dashboard/tools/hook-generator",
      name: "Tweet Hook Generator"
    },
    // Add new tools here in the future
  ];

  return (
    <nav className="grid items-start gap-2">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === link.href ? "bg-accent" : "transparent"
            )}
          >
            <span>{link.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}
