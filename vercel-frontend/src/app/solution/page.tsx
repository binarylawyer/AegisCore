import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            The Double-Blind Solution
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Aegis Core separates identity verification from market participation, enabling compliant transactions while preserving the privacy and relationships essential to the art market.
          </p>
        </div>

        {/* How It Works */}
        <section className="mx-auto mt-24 max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            How Double-Blind Compliance Works
          </h2>
          <div className="mt-12 space-y-12">
            {/* Step 1 */}
            <div className="flex gap-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Law Firm Verification (Opus Portal)
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Law firms, banks, and accounting firms use our B2B SaaS portal to manage AML/KYC workflows for their HNW clients. The platform provides secure file collection, automated screening via AI agents, and human-in-the-loop review processes—all while maintaining attorney-client privilege. The law firm makes the legal determination; Aegis Core provides the infrastructure.
                </p>
                <div className="mt-4 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-900 dark:text-zinc-100">Key Point:</strong> The platform never sees client PII. All sensitive documents remain within the law firm's secure, multi-tenant portal, ensuring complete attorney-client privilege protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  On-Chain Attestation (ERC-3643)
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Once verification is complete, the law firm issues an anonymous, on-chain attestation via the ERC-3643 Identity Registry. This attestation contains zero PII—only a wallet address and compliance claims (e.g., "JURISDICTION_USA", "IS_ACCREDITED"). The ERC-3643 standard enforces these claims at the token level, making compliance programmatic and instant.
                </p>
                <div className="mt-4 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-900 dark:text-zinc-100">Technical Implementation:</strong> The canTransfer() function in each asset's Compliance contract automatically checks the Identity Registry. If the wallet holds required claims, the transaction proceeds. If not, it fails—ensuring trustless, programmatic compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Protected Marketplace Transactions
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Galleries list tokenized artworks. Collectors browse anonymously. When a collector attempts to purchase, the smart contract automatically verifies their on-chain attestations. If verified, the sale executes atomically—payment and title transfer happen in seconds via PaymentSplitter, solving the 90-day payment lag. All parties are protected: collectors remain anonymous, galleries cannot see each other's clients, and the platform never stores PII.
                </p>
                <div className="mt-4 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-900 dark:text-zinc-100">Documentation Management:</strong> All compliance documentation, provenance records, custody agreements, and insurance policies are organized and accessible to authorized parties—collectors, their legal representatives, regulators, and tax bodies—through secure, auditable portals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Matrix */}
        <section className="mx-auto mt-24 max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            How Each Party Is Protected
          </h2>
          <div className="mt-12">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead className="bg-zinc-50 dark:bg-zinc-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">Party</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">Protection</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Collectors</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Identity protected by legal advisors; platform never sees PII</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Absolute anonymity while maintaining compliance</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Galleries</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Cannot see other galleries' client lists; see only compliance status</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Protect relationships while meeting compliance obligations</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Artists</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Instant payment; automated royalty enforcement</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Solve cash flow problems; build collector relationships</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Law Firms</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Maintain attorney-client privilege; auditable workflows</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Minimal administrative burden; professional liability protection</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Regulators</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Organized, auditable compliance documentation</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Reduced administrative costs; transparent compliance records</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">Platform</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Never stores user PII; neutral utility status</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Insulated from liability; scalable infrastructure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mx-auto mt-24 max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            Key Infrastructure Components
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Opus Compliance Engine</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                B2B SaaS portal for law firms with AI-powered automation (Large Work Models) and human-in-the-loop review. Provides secure file collection, automated screening, and auditable workflows while maintaining attorney-client privilege.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">ERC-3643 Identity Registry</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Global on-chain registry storing anonymous compliance claims. Enables programmatic, trustless verification without exposing PII. Each asset's Compliance contract defines jurisdiction-specific rules.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Phygital Custody Stack</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Integrated APIs with custodians (Geneva Freeport, Delaware Freeport) and insurers (AXA Art, Chubb) update Master NFT metadata in real-time. Physical custody workflows automate title transfer and insurance updates.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Documentation Management</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Organized, secure repository for compliance documentation, provenance records, custody agreements, and insurance policies. Accessible to authorized parties—collectors, legal representatives, regulators, and tax bodies—through role-based portals.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Implement Double-Blind Compliance?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              See how Aegis Core protects your specific role in the art market.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/roles"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                View Role-Specific Solutions
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md border border-indigo-600 bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 dark:bg-zinc-900 dark:text-indigo-400"
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

