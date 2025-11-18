"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload Art", href: "/dashboard/upload" },
  { name: "Inventory", href: "/dashboard/inventory" },
  { name: "Collectors", href: "/dashboard/collectors" },
  { name: "Tokenization", href: "/dashboard/tokenization" },
  { name: "Profiler", href: "/profiler" },
  { name: "Market Intel", href: "/market-intelligence" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <span className="text-sm font-bold">AC</span>
                </div>
                <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Aegis Core
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex md:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Gallery Portal
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

