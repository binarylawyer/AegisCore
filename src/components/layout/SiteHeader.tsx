const navigation = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Profiler", href: "/profiler" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <a href="/" className="text-lg font-semibold tracking-wide text-white">
            Aegis Core
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            Double-Blind Art Infrastructure
          </p>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white md:inline-flex"
          >
            Talk to us
          </a>
          <a
            href="#demo"
            className="rounded-full bg-emerald-400/90 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}

