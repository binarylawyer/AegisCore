import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Why Aegis Core?
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Solving the art market's compliance paradox through innovative technology and legal architecture
          </p>
        </div>

        {/* Regulatory Challenges */}
        <section id="compliance" className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The New Regulatory Landscape
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              The global high-value art market operates on a fundamental paradox. Its two most valuable commodities are <strong className="text-zinc-900 dark:text-zinc-100">privacy</strong> and <strong className="text-zinc-900 dark:text-zinc-100">provenance</strong>. High-net-worth (HNW) collectors demand absolute anonymity, while new global AML/CFT regulations (from FinCEN, FATF, and the EU) demand absolute transparency to combat financial crime.
            </p>
            <p>
              This conflict creates a market that is opaque, illiquid, fragmented, and high-friction. Artists and galleries face chronic cash-flow delays, while collectors struggle to navigate complex compliance requirements across multiple jurisdictions.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
              FinCEN's 2024 Proposed Rule
            </h3>
            <p className="mt-2 text-red-800 dark:text-red-200">
              The Financial Crimes Enforcement Network (FinCEN) has proposed new rules targeting dealers, advisors, and intermediaries in the art market. These regulations require comprehensive AML/KYC procedures, transaction monitoring, and suspicious activity reporting—creating an unfunded mandate for galleries and dealers.
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Our Solution: Double-Blind Compliance
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              Aegis Core solves the paradox by separating <em>identity verification</em> from <em>market participation</em>. We've built a "Double-Blind" ecosystem, powered by our compliance engine, that creates a "trustless" marketplace where:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Collectors are blind</strong> to the platform and sellers; their identity is protected by their legal advisors.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Sellers are blind</strong> to the collector's identity; they see only an on-chain, non-falsifiable attestation of their compliance status.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Galleries are blind</strong> to each other's private client lists.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">The Platform is blind</strong> to the personal data of its users, insulating itself from liability and becoming a true, neutral market utility.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How It Works
          </h2>
          <div className="mt-8 space-y-8">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                1. Compliance Engine (Opus)
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Law firms and accounting firms use our B2B SaaS portal to manage AML/KYC workflows for their HNW clients. The platform provides secure file collection, automated screening, and human-in-the-loop review processes—all while maintaining attorney-client privilege.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                2. On-Chain Attestations (ERC-3643)
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Once a law firm completes verification, they issue an anonymous, on-chain attestation. This attestation contains zero PII—only a wallet address and compliance claims (e.g., "JURISDICTION_USA", "IS_ACCREDITED"). The ERC-3643 standard enforces these claims at the token level, making compliance programmatic and instant.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                3. The Marketplace
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Galleries and artists tokenize artworks using ERC-721 (Master NFT) and ERC-3643 (fractional tokens). When a collector attempts to purchase, the smart contract automatically checks their on-chain attestations. If verified, the sale executes atomically—payment and title transfer happen in seconds, not months.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Benefits for All Participants
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">For Collectors</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Maintain absolute anonymity while gaining access to a global marketplace of verified, tokenized artworks. One-time verification provides a "global compliance passport."
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">For Galleries</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Find new, qualified buyers without exposing your client list. Get paid instantly upon sale, not 90 days later. Compliance becomes a software-enabled process, not a cost center.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">For Artists</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Receive payment instantly when your work sells. Automatically receive royalties on all secondary market sales via EIP-2981 enforcement.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">For Law Firms</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                A new, high-value B2B tool to serve HNW clients in this emerging asset class. Maintain full attorney-client privilege while providing auditable compliance workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            About the Founders
          </h2>
          <p className="mt-6 text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Aegis Core was built by legal and art market professionals with deep expertise in both technology and the art industry.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Charles Moye
              </h3>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Founder & Architect
              </p>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <p>
                  Charles Moye is a licensed attorney in the State of New York with nearly 30 years of bar membership. He has represented some of the top artists in both the digital and physical art worlds, and brings extensive expertise as a technology, cryptocurrency, and intellectual property attorney.
                </p>
                <p>
                  As a software architect and engineer, Charles is the architect of Aegis Core, combining his legal expertise with technical innovation to solve the art market's fundamental compliance challenges.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Brittany "Penny" Moye
              </h3>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Co-Founder & Art Market Expert
              </p>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <p>
                  Brittany "Penny" Moye is an art dealer and Vice President at Moye Law. She is the founder of On The Coin, an artist management and creative firm that specializes in advising artists, collectors, curators, attorneys, accountants, and other participants in the art industry on best practices for both physical and digital art.
                </p>
                <p>
                  Penny has organized and curated art events for physical and digital artists at prestigious venues including NFT Week in NYC, Miami Art Basel, and other major art events throughout the United States, bringing deep industry connections and market expertise to Aegis Core.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-3xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to transform your art market operations?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Join galleries, artists, and collectors who are building the future of compliant, liquid art ownership.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

