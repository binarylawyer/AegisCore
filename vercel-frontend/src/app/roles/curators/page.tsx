import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CuratorsPage() {
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
            For Curators
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Represent collectors and build relationships with galleries without AML/KYC concerns. Focus on art expertise while compliance is handled by legal professionals.
          </p>
        </div>

        {/* The Challenge */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Compliance Challenge for Curators
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              As a curator representing collectors, you face unique challenges in the evolving art market:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">AML/KYC Burden:</strong> New regulations require comprehensive compliance checks. As a curator, you may not have the legal infrastructure to handle these requirements, creating barriers to representing your clients effectively.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Client Privacy:</strong> Your collector clients demand anonymity, but galleries need assurance of compliance. Balancing these competing needs creates friction in transactions.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Limited Access:</strong> Without proper compliance documentation, you may be excluded from certain transactions or face delays that prevent your clients from acquiring desired artworks.</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-zinc-900 dark:text-zinc-100">Administrative Overhead:</strong> Managing compliance paperwork and documentation distracts from your core expertise: curating collections and building relationships.</span>
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
                Compliance Handled by Legal Professionals
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When you represent a collector on Aegis Core, their compliance verification is handled entirely by their legal advisor through the Opus portal. You never see their personal information or handle AML/KYC documentation. Instead, you see only their verified compliance status—allowing you to focus on what you do best: curating and acquiring art.
              </p>
              <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Separation of Concerns:</strong> Legal compliance is handled by law firms and accounting firms. Your role as curator remains focused on art expertise, client relationships, and collection strategy.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Anonymous Representation
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The Double-Blind system ensures your collector clients remain anonymous to galleries. When you facilitate a transaction, galleries see only an on-chain attestation of compliance—never the collector's identity. This protects your clients' privacy while ensuring galleries meet their regulatory obligations.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your clients' identities remain completely protected</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Galleries receive proof of compliance without seeing PII</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You can represent multiple collectors without conflicts</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Access to Global Marketplace
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Once your collector clients are verified, they gain access to a global marketplace of tokenized artworks from galleries worldwide. You can browse inventory, facilitate purchases, and build relationships with galleries—all while maintaining your clients' anonymity and ensuring compliance.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Focus on Your Expertise
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Aegis Core removes the administrative burden of compliance from your workflow. You can focus entirely on curating collections, identifying artworks, negotiating terms, and building relationships—while the platform handles compliance verification, payment processing, and title transfer automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Key Benefits for Curators
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No AML/KYC Burden</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Compliance is handled entirely by your clients' legal advisors. You never need to collect, store, or manage sensitive personal information or compliance documentation.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Client Privacy Protected</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Your collector clients remain anonymous to galleries and other parties. Their identity is protected by attorney-client privilege while still enabling transactions.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Global Access</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Once verified, your clients gain access to artworks from galleries worldwide. One-time verification provides a "global compliance passport" for all transactions.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Focus on Art</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Remove administrative overhead and focus entirely on your core expertise: curating collections, identifying artworks, and building relationships with galleries and collectors.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Represent Collectors Without Compliance Concerns?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Learn more about how Aegis Core enables curators to focus on art while compliance is handled by legal professionals.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/roles/law-firms"
                className="rounded-md border border-indigo-600 px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
              >
                Learn About Legal Partners
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

