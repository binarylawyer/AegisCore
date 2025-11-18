import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
              Regulatory Compliance for the
              <span className="block text-indigo-600 dark:text-indigo-400">Global Art Market</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-zinc-600 dark:text-zinc-400 sm:text-2xl">
              Aegis Core provides institutional-grade compliance infrastructure that protects all parties—law firms, galleries, artists, curators, and collectors—while enabling compliant, liquid art transactions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Access Dashboard
              </Link>
              <Link
                href="/regulatory-risks"
                className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100"
              >
                Understand the Risks <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Risk Alert */}
      <section className="bg-red-50 dark:bg-red-950/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-white p-8 dark:border-red-800 dark:bg-zinc-900">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  New Regulatory Requirements Are Coming to the Art Market
                </h2>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                  FinCEN's 2024 proposed rule, EU's 5AMLD, and emerging regulations in the UK, UAE, and across Asia are creating unprecedented compliance obligations for art market participants. Galleries, dealers, advisors, and intermediaries now face mandatory AML/KYC requirements, transaction monitoring, and suspicious activity reporting—creating significant legal and financial exposure.
                </p>
                <div className="mt-6">
                  <Link
                    href="/regulatory-risks"
                    className="inline-flex items-center text-base font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    Review Regulatory Requirements by Jurisdiction
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Aegis Core Protects All Parties */}
      <section className="bg-white py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
              Protecting All Parties Through Double-Blind Compliance
            </h2>
            <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
              Aegis Core's Double-Blind framework ensures regulatory compliance while preserving the privacy and relationships that make the art market function.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Law Firms */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Law Firms</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Manage AML/KYC workflows for HNW clients with minimal administrative burden. Our B2B SaaS portal provides auditable compliance workflows while maintaining attorney-client privilege.
                </p>
                <Link
                  href="/roles/law-firms"
                  className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  Learn More →
                </Link>
              </div>

              {/* Galleries */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Galleries</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Protect your client relationships while meeting new compliance obligations. Access verified collectors without exposing your private client lists. Get paid instantly upon sale.
                </p>
                <Link
                  href="/roles/galleries"
                  className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  Learn More →
                </Link>
              </div>

              {/* Artists */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Artists</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Receive payment instantly when your work sells. Build relationships with collectors. Automatically receive royalties on all secondary market sales through enforced EIP-2981 compliance.
                </p>
                <Link
                  href="/roles/artists"
                  className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Overview */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
              The Double-Blind Solution
            </h2>
            <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
              Separate identity verification from market participation. Compliance is abstracted to trusted fiduciaries and enforced anonymously on-chain.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Compliance-as-a-Service</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Law firms use our B2B portal to manage AML/KYC workflows. The platform never sees client PII—maintaining attorney-client privilege while providing auditable compliance records.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">On-Chain Attestations</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Verified collectors receive anonymous, on-chain attestations (ERC-3643 claims). Galleries see only compliance status—never identities. This creates a "walled garden" of verified participants.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Protected Relationships</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Galleries cannot see each other's client lists. Collectors remain anonymous to sellers. The platform never stores user PII, insulating itself from liability.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Organized Documentation</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  All compliance documentation, provenance records, custody agreements, and insurance policies are organized and accessible to authorized parties—collectors, regulators, tax bodies, and their representatives.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/solution"
                className="inline-flex items-center text-base font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Learn How It Works
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="bg-white py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
              The $24B RWA Inflection Point
            </h2>
            <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
              The Real World Asset tokenization market has demonstrated 380% growth in three years, reaching $24B+ in 2025. Industry consensus projects $10-30 trillion by 2030.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">380%</div>
                <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Growth in 3 years</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">$24B+</div>
                <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Current market size</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">$10-30T</div>
                <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Projected by 2030</div>
              </div>
            </div>
            <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-zinc-100">Institutional Validation:</strong> BlackRock's $2.9B BUIDL fund gained $700M in 11 days. JPMorgan processed $300B+ through tokenized networks. Goldman Sachs is spinning out its Digital Asset Platform. 70% of 2024 capital deployed from institutional investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Protect Your Art Market Operations?
            </h2>
            <p className="mt-6 text-xl leading-8 text-indigo-100">
              Join law firms, galleries, and artists who are building compliant, liquid art market infrastructure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Access Dashboard
              </Link>
              <Link href="/solution" className="text-base font-semibold leading-6 text-white">
                Learn How It Works <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
