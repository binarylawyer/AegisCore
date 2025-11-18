import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GalleriesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8">
            <Link href="/roles" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              ← Back to All Roles
            </Link>
          </nav>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            For Galleries
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Protect your client relationships while meeting new compliance obligations. Access verified collectors without exposing your private client lists. Get paid instantly upon sale.
          </p>
        </div>

        {/* The Challenge */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Compliance Challenge
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              FinCEN's 2024 proposed rule and similar regulations globally are creating an unfunded mandate for galleries, dealers, and advisors. You now face:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Client List Protection:</strong> Your private client list is your most valuable asset. Traditional compliance processes risk exposing these relationships to competitors or third parties.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Cash Flow Problems:</strong> Traditional art sales involve 30-90 day payment cycles. You need to wait months for payment while managing operational costs.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Limited Access to New Collectors:</strong> Finding new, qualified buyers requires exposing your current client list or relying on inefficient, manual processes.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Compliance Burden:</strong> Meeting AML/KYC requirements manually creates significant administrative overhead and legal exposure.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* The Solution */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How Aegis Core Solves This
          </h2>
          <div className="mt-8 space-y-8">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Protected Client Relationships
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The Double-Blind system ensures galleries cannot see each other's client lists. When you invite a collector, they appear in your dashboard as "Vetted - Tier 3"—but other galleries cannot see them. This protects your most valuable asset: your relationships.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Collector-Controlled Disclosure:</strong> Collectors can anonymously browse all galleries' inventory. Only when they show interest in your work do you receive a notification: "An anonymous, Tier 3-vetted buyer is interested." The collector initiated contact—protecting your client list.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Compliance-as-a-Service
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When you invite a collector, they're routed to their legal advisor for verification through the Opus portal. You see only their compliance status—never their identity. This provides a "safe harbor": you prove to regulators that you're only transacting with professionally certified buyers.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Compliance becomes a software-enabled process, not a cost center</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All transactions are provably compliant with organized documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reduce regulatory risk and legal exposure</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Instant Payment
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Solve the 90-day payment lag. When a sale executes, the PaymentSplitter contract atomically distributes funds. You receive payment instantly in USDC or EURC—not 90 days later. This transforms your cash flow and enables faster inventory turnover.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                The Profiler: Find New Collectors
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Our AI-powered Profiler tool uses RAG (Qdrant + Google AI) to search public art market data—auction catalogs, museum announcements, art publications. Upload an artwork image or description, and receive research packets showing where similar works have appeared. Your sales team then researches these public documents to identify potential collectors.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Privacy-First:</strong> The Profiler searches only public data. It never exposes verified user information or other galleries' client lists. This is "Blind 4" of our Double-Blind framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Key Benefits for Galleries
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Protect Client Lists</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Your private client relationships remain completely protected. Other galleries cannot see your collectors, even when they're verified on the platform.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Instant Payment</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Receive payment immediately upon sale via atomic smart contract execution. No more 90-day waits—transform your cash flow.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Compliance Safe Harbor</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Prove to regulators that you're meeting AML/KYC obligations by only transacting with professionally certified buyers. Organized documentation for audits.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Access to Verified Collectors</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Find new, qualified buyers through the Profiler tool and the platform's verified collector pool—without exposing your client list.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Protect Your Gallery Operations?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Access the gallery portal to manage inventory, invite collectors, and tokenize artworks.
            </p>
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Access Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

