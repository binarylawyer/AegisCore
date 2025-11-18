import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ArtistsPage() {
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
            For Artists
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Receive payment instantly when your work sells. Build relationships with collectors. Automatically receive royalties on all secondary market sales through enforced EIP-2981 compliance.
          </p>
        </div>

        {/* The Challenge */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Artist's Challenge
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              Artists face fundamental challenges in the traditional art market:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Payment Delays:</strong> Traditional art sales involve 30-90 day payment cycles. You need to wait months for payment while managing studio costs and living expenses.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">No Secondary Market Royalties:</strong> When your work is resold on the secondary market, you typically receive nothing. Traditional contracts cannot enforce royalty payments.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Limited Collector Access:</strong> Building relationships with collectors requires gallery intermediaries. You have limited direct access to your collector base.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Co-op Governance:</strong> Managing sales with galleries, estates, or collectives requires complex coordination and approval processes.</span>
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
                Instant Payment
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When your work sells, the PaymentSplitter contract atomically distributes funds. You receive your share instantly in USDC or EURC—at the same time as the gallery. No more 90-day waits. This solves the chronic cash flow problem that cripples artists.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Example:</strong> A $100,000 painting sells. The smart contract instantly splits: $90,000 to you (90%), $10,000 to the gallery (10%). Both parties receive payment in seconds—not months.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Enforced Secondary Market Royalties
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Our custom RoyaltyComplianceModule enforces EIP-2981 royalties on all secondary market sales. When someone tries to resell your work, the ERC-3643 Compliance contract checks royaltyInfo(). If the royalty isn't paid, the transfer fails. This makes royalties non-optional and automatically enforced.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Set your royalty percentage (e.g., 10%) when tokenizing your work</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Royalties are automatically paid to your wallet on every secondary sale</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No contracts to enforce—the smart contract does it automatically</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Co-op Multi-Sig Governance
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Form "co-ops" with galleries, estates, or collectives using Gnosis Safe multi-sig wallets. Set custom rules (e.g., "2-of-3 signatures required for sale approval"). The platform provides "Multi-Sig-as-a-Service," automatically deploying secure wallets for collective governance.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Example:</strong> You, your gallery, and your lawyer form a co-op. All three must approve a sale. When a buyer makes an offer, you each receive a notification to sign. Once the threshold is met, the sale executes automatically.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Building Collector Relationships
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When collectors purchase your work, you can build relationships while maintaining their privacy. The platform enables direct communication channels while protecting collector anonymity. You know they're verified and compliant—without seeing their identity unless they choose to reveal it.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Key Benefits for Artists
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Instant Payment</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Receive payment immediately upon sale via atomic smart contract execution. Solve cash flow problems and focus on creating.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Automatic Royalties</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Receive royalties on all secondary market sales automatically. No contracts to enforce—the smart contract does it.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Collector Relationships</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Build direct relationships with collectors while maintaining their privacy. Access verified, compliant buyers.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Co-op Governance</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Manage sales collectively with galleries, estates, or collectives using secure multi-sig wallets. Simple, automated approval processes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Transform Your Art Career?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Access the artist portal to upload works, set royalties, and manage sales.
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

