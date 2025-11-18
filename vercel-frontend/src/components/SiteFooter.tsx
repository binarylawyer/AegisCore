import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <span className="text-sm font-bold">AC</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Aegis Core</span>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              The Double-Blind Art Marketplace protecting all parties through compliant tokenization.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Learn</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/regulatory-risks" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Regulatory Risks
                </Link>
              </li>
              <li>
                <Link href="/solution" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  The Solution
                </Link>
              </li>
              <li>
                <Link href="/platform" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">For Your Role</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/roles/artists" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/roles/galleries" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Galleries
                </Link>
              </li>
              <li>
                <Link href="/roles/curators" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Curators
                </Link>
              </li>
              <li>
                <Link href="/roles/law-firms" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Law Firms
                </Link>
              </li>
              <li>
                <Link href="/roles/corporations" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Corporations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/market-intelligence" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Market Intelligence
                </Link>
              </li>
              <li>
                <Link href="/profiler" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Profiler
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © 2024 Aegis Core. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

