const footerLinks = [
  {
    title: "Platform",
    items: [
      { label: "Architecture", href: "/platform" },
      { label: "Compliance Engine", href: "/solutions#compliance" },
      { label: "Marketplace", href: "/solutions#marketplace" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Docs", href: "/platform#blueprint" },
      { label: "RWA Research", href: "/platform#research" },
      { label: "Profiler", href: "/profiler" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Press Kit", href: "/contact#press" },
      { label: "Careers", href: "/contact#careers" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-white">Aegis Core</p>
          <p className="mt-2 text-sm text-zinc-400">
            The vertically integrated infrastructure for compliant, tokenized art markets.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-400">Powered by Opus x ERC-3643</p>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {column.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Aegis Core. Built for artists, galleries, custodians, and collectors.
      </div>
    </footer>
  );
}

