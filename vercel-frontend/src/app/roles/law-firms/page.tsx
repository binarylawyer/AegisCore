import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function LawFirmsPage() {
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
            For Law Firms, Banks & Accounting Firms
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Manage AML/KYC workflows for HNW clients in the art market with minimal administrative burden while maintaining attorney-client privilege and professional liability protection.
          </p>
        </div>

        {/* The Challenge */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Compliance Challenge
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              FinCEN's 2024 proposed rule, EU's 5AMLD, and emerging regulations across the UK, UAE, and Asia are creating new compliance obligations for your HNW clients in the art market. As their legal advisors, you face the challenge of:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Administrative Burden:</strong> Manual compliance processes create significant overhead. Traditional methods are inefficient, error-prone, and require substantial time investment from your team.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Professional Liability:</strong> If your clients' transactions violate AML regulations, your firm faces professional liability. You need auditable workflows that demonstrate due diligence.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Attorney-Client Privilege:</strong> You must maintain complete confidentiality while providing compliance services. Traditional platforms may expose client data to third parties, creating privilege risks.</span>
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
                Opus B2B Compliance Portal
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Our B2B SaaS portal provides a secure, multi-tenant environment where your firm sees only your own clients. Each firm receives its own "walled garden" instance, ensuring complete attorney-client privilege protection.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">AI-Powered Automation:</strong> Large Work Models (LWM) perform initial automated tasks—OCR, data extraction, sanctions screening—reducing manual work by up to 70%.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Human-in-the-Loop Review:</strong> The workflow pauses for your team's professional judgment. Paralegals review AI findings; partners make final legal determinations.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Auditable Workflows:</strong> Every step is recorded in an immutable audit trail. When regulators ask, you have complete documentation demonstrating due diligence.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Zero PII Exposure:</strong> The platform never sees your client's personal information. All documents remain within your secure portal, maintaining complete privilege.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                On-Chain Attestation Without PII Exposure
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When you complete verification, you issue an anonymous, on-chain attestation. This attestation contains zero PII—only a wallet address and compliance claims (e.g., "JURISDICTION_USA", "IS_ACCREDITED"). Your client's identity remains protected while enabling compliant transactions.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Example:</strong> You verify a client for Tier 3 ({'>'}$2M) transactions. The platform stores only: wallet address "0xABC..." and claim "TIER_3". No name, no passport, no financial documents—only the verifiable attestation that enables compliant participation.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Regulatory Reporting Assistance
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The platform includes pre-formatted templates for Suspicious Activity Reports (SARs) that your firm can use for its own filing obligations to FinCEN or other Financial Intelligence Units (FIUs) per FATF recommendations. This reduces administrative burden while ensuring compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Key Benefits for Your Firm
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Minimal Administrative Burden</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                AI automation handles routine tasks. Your team focuses on professional judgment, not paperwork. Reduce compliance overhead by up to 70%.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Professional Liability Protection</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Complete audit trails demonstrate due diligence. When regulators review, you have organized, auditable records proving compliance.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Attorney-Client Privilege Maintained</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Multi-tenant architecture ensures your clients' data never leaves your secure portal. The platform never sees PII, maintaining complete privilege.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">New Revenue Opportunity</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Offer compliance services for art market transactions—a new, high-value service line for your HNW clients in this emerging asset class.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Streamline Your Compliance Workflows?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Access the Opus B2B portal and start managing art market compliance with minimal administrative burden.
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

