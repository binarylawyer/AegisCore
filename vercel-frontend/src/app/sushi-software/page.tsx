'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Database,
  Lock,
  ArrowRight,
  Code,
  Menu,
  X,
} from 'lucide-react';

const terminalLines = [
  '> INITIATING SUSHI_STACK_V2...',
  '> LOADING MODULE: JURISDICTION_ROUTER [CH/LI/DE]',
  '> CONNECTING TO QDRANT VECTOR DB...',
  '> ESTABLISHING RELIANCE_REGISTRY LINK...',
  '> STATUS: SYSTEM OPERATIONAL',
  '> WAITING FOR ATTESTATION INPUT...',
];

export default function SushiSoftwareHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [activeTerminalLine, setActiveTerminalLine] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveTerminalLine((prev) => (prev + 1) % terminalLines.length);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-black font-mono text-gray-200 selection:bg-emerald-900 selection:text-emerald-100">
      <nav
        className={`fixed z-50 w-full border-b border-white/10 transition-all duration-300 ${
          scrollPos > 50
            ? 'bg-black/90 py-4 backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-lg font-bold text-black transition-colors group-hover:bg-emerald-500">
              S
            </div>
            <span className="text-xl font-bold tracking-tighter">
              SUSHI<span className="text-gray-500">SOFTWARE</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#stack" className="transition-colors hover:text-emerald-400">
              THE STACK
            </a>
            <a
              href="#products"
              className="transition-colors hover:text-emerald-400"
            >
              PRODUCTS
            </a>
            <a
              href="#architecture"
              className="transition-colors hover:text-emerald-400"
            >
              ARCHITECTURE
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-white/20 px-4 py-2 transition-all hover:border-emerald-500 hover:text-emerald-400"
            >
              ACCESS KITCHEN
            </a>
          </div>
          <button className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 text-xl">
          <a href="#stack" onClick={toggleMenu}>
            THE STACK
          </a>
          <a href="#products" onClick={toggleMenu}>
            PRODUCTS
          </a>
          <a href="#architecture" onClick={toggleMenu}>
            ARCHITECTURE
          </a>
          <a href="#contact" onClick={toggleMenu} className="text-emerald-400">
            ACCESS KITCHEN
          </a>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-white/5 pt-40 pb-20 md:pt-60 md:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />
        <div className="container relative z-10 mx-auto grid gap-16 px-6 md:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-widest text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              System Status: Operational
            </div>
            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
              COMPLIANCE
              <br />
              AS <span className="text-emerald-500">CODE.</span>
            </h1>
            <p className="max-w-lg text-xl leading-relaxed text-gray-400">
              We build the "Liability Firebreak" infrastructure for the $30
              Trillion RWA migration. Dockerized legal logic. Double-blind
              settlements.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button className="flex items-center justify-center gap-2 rounded-sm bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-emerald-400">
                DEPLOY THE STACK <ArrowRight size={18} />
              </button>
              <button className="flex items-center justify-center gap-2 rounded-sm border border-white/20 px-8 py-4 transition-colors hover:border-white">
                VIEW GITHUB <Code size={18} />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 blur opacity-20" />
            <div className="relative flex min-h-[300px] flex-col rounded-lg border border-white/10 bg-black p-6 font-mono text-sm shadow-2xl">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">
                  root@sushi-kitchen:~
                </span>
              </div>
              <div className="flex-1 space-y-2">
                {terminalLines.map((line, index) => (
                  <div
                    key={line}
                    className={`transition-opacity duration-300 ${
                      index <= activeTerminalLine ? 'opacity-100' : 'opacity-0'
                    } text-emerald-400`}
                  >
                    {line}
                  </div>
                ))}
                <div className="text-gray-500 animate-pulse">_</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="border-b border-white/5 bg-neutral-950/50 py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              THE SUSHI STACK
            </h2>
            <div className="h-1 w-20 bg-emerald-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <StackCard
              icon={<Activity size={24} />}
              title="n8n Orchestration"
              description="The Kitchen engine. Visual workflow automation generating Reliance Letters, hashing them, and routing to cold storage."
              tags={['Node.js', 'Webhooks']}
              iconColor="text-emerald-400"
            />
            <StackCard
              icon={<Database size={24} />}
              title="Qdrant RAG Core"
              description="The Profiler brain. Vector database storing semantic embeddings of global art inventory to power the Double-Blind matching engine."
              tags={['Vector Search', 'Python']}
              iconColor="text-blue-400"
            />
            <StackCard
              icon={<Lock size={24} />}
              title="Chain Gateway"
              description="The Hand of the system. Isolated Python service using Web3.py to sign transactions and write reliance hashes to Polygon."
              tags={['ERC-3643', 'Solidity']}
              iconColor="text-purple-400"
            />
          </div>
        </div>
      </section>

      <ArchitectureSection />
      <MetricsSection />
      <FooterSection />
    </div>
  );
}

function StackCard({
  icon,
  title,
  description,
  tags,
  iconColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  iconColor: string;
}) {
  return (
    <div className="group border border-white/10 bg-black p-8 transition-all hover:border-emerald-500/50">
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition-colors group-hover:text-white ${iconColor}`}
      >
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{description}</p>
      <div className="flex gap-2 text-xs text-gray-600">
        {tags.map((tag) => (
          <span key={tag} className="rounded bg-white/5 px-2 py-1 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-white/5 py-24">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-2">
        <div className="order-2 rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-2xl lg:order-1">
          <div className="relative aspect-video overflow-hidden rounded border border-white/5 bg-black">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-4 p-8 opacity-50">
              <div className="flex items-center justify-center rounded border border-emerald-500/30 text-xs text-emerald-500">
                Law Firm
              </div>
              <div className="flex items-center justify-center rounded border border-white/10 text-xs">
                Sushi Kitchen (n8n)
              </div>
              <div className="flex items-center justify-center rounded border border-white/10 text-xs">
                Aegis Core API
              </div>
              <div className="flex items-center justify-center rounded border border-blue-500/30 text-xs text-blue-500">
                Gallery
              </div>
              <div className="col-span-4 mt-4 border-t border-dashed border-white/20 pt-4 text-center text-xs text-gray-600">
                BLOCKCHAIN SETTLEMENT LAYER (POLYGON)
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-2 font-bold text-white">
              DOUBLE-BLIND NEXUS
            </div>
          </div>
        </div>
        <div className="order-1 space-y-8 lg:order-2">
          <h2 className="text-3xl font-bold tracking-tight">THE ENTITY MAP</h2>
          <p className="leading-relaxed text-gray-400">
            We do not run the exchange. We build the software that makes the
            exchange possible. Our architecture isolates liability by separating
            the Tech (Kitchen), the Rules (Legal), and the Execution (Core).
          </p>
          <ul className="space-y-4">
            {[
              {
                title: 'Sushi Kitchen',
                text: 'The Factory. R&D and IP Holding.',
              },
              {
                title: 'Sushi Law',
                text: 'The Network. Human Oracles issuing Reliance Letters.',
              },
              {
                title: 'Aegis Core',
                text: 'The Product. The liquidity layer.',
              },
            ].map((item, idx) => (
              <li key={item.title} className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { label: 'Addressable RWA Market', value: '$30T' },
    { label: 'Dual-Domicile Logic', value: 'CH/LI' },
    { label: 'Standard Compliance', value: 'ERC-3643' },
    { label: 'Proprietary Code', value: '100%' },
  ];
  return (
    <section className="border-b border-white/5 bg-emerald-950/10 py-24">
      <div className="container mx-auto grid gap-8 px-6 text-center md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 text-4xl font-bold text-white">
              {metric.value}
            </div>
            <div className="text-xs uppercase tracking-widest text-emerald-500">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-black py-12 text-sm text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-white/10" />
          <span className="font-bold tracking-tighter text-gray-400">
            SUSHI<span className="text-gray-700">SOFTWARE</span>
          </span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="transition-colors hover:text-white">
            Documentation
          </a>
          <a href="#" className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-white">
            System Status
          </a>
        </div>
        <div className="text-xs">© 2025 Sushi Kitchen Labs LLC. All Rights Reserved.</div>
      </div>
      <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs font-mono text-gray-800">
        "TRUST IS A FUNCTION OF VERIFICATION, NOT REPUTATION."
      </div>
    </footer>
  );
}
