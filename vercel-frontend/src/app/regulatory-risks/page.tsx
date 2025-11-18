import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function RegulatoryRisksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            Regulatory Risks in the Art Market
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            New AML/KYC regulations are creating unprecedented compliance obligations and legal exposure for art market participants across all major jurisdictions.
          </p>
        </div>

        {/* Overview */}
        <section className="mx-auto mt-24 max-w-4xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-950/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              The Compliance Mandate
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              The art market is transitioning from a largely unregulated space to one with comprehensive AML/CFT requirements. FinCEN's 2022 study identified key vulnerabilities—anonymity, use of shell companies, and the portability of high-value assets. The 2024 proposed rule is the direct response, targeting dealers, advisors, and intermediaries with mandatory compliance obligations.
            </p>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Similar regulatory frameworks are emerging globally, creating a complex, multi-jurisdictional compliance landscape that requires sophisticated infrastructure to navigate safely.
            </p>
          </div>
        </section>

        {/* Jurisdiction Breakdowns */}
        <section className="mx-auto mt-24 max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            Regulatory Requirements by Jurisdiction
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* United States */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">US</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">United States</h3>
              </div>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">FinCEN Proposed Rule (2024)</h4>
                  <p className="mt-1 text-sm">
                    Targets dealers, advisors, and intermediaries in art transactions exceeding $10,000. Requires AML program implementation, customer due diligence, and suspicious activity reporting.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Bank Secrecy Act (BSA)</h4>
                  <p className="mt-1 text-sm">
                    Existing framework requiring financial institutions to assist government agencies in detecting and preventing money laundering. Art market participants may be subject to similar requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Regulatory Exposure</h4>
                  <p className="mt-1 text-sm">
                    Non-compliance can result in significant fines, legal liability, and reputational damage. The proposed rule creates an unfunded mandate requiring substantial infrastructure investment.
                  </p>
                </div>
              </div>
            </div>

            {/* European Union */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">EU</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">European Union</h3>
              </div>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">5th Anti-Money Laundering Directive (5AMLD)</h4>
                  <p className="mt-1 text-sm">
                    Explicitly includes art market participants as "obliged entities." Requires customer due diligence, record-keeping, and reporting of suspicious transactions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">6AMLD Implementation</h4>
                  <p className="mt-1 text-sm">
                    Strengthens criminal liability for money laundering offenses. Art dealers and intermediaries face increased scrutiny and enforcement actions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">MiCA Framework</h4>
                  <p className="mt-1 text-sm">
                    Markets in Crypto-Assets regulation affects tokenized art assets, requiring compliance with securities-like regulations for fractional ownership structures.
                  </p>
                </div>
              </div>
            </div>

            {/* United Kingdom */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">UK</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">United Kingdom</h3>
              </div>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Money Laundering Regulations 2017</h4>
                  <p className="mt-1 text-sm">
                    Art market participants are designated as "relevant persons" subject to AML obligations. Requires registration with HMRC, customer due diligence, and ongoing monitoring.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Economic Crime Act 2022</h4>
                  <p className="mt-1 text-sm">
                    Introduces new powers for law enforcement and increases penalties for non-compliance. Creates register of overseas entities affecting art transactions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">FCA Oversight</h4>
                  <p className="mt-1 text-sm">
                    Financial Conduct Authority may extend oversight to art market participants, particularly those involved in tokenized or fractionalized art assets.
                  </p>
                </div>
              </div>
            </div>

            {/* UAE */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">UAE</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">United Arab Emirates</h3>
              </div>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Federal Decree-Law No. 20 (2018)</h4>
                  <p className="mt-1 text-sm">
                    Comprehensive AML/CFT framework requiring designated non-financial businesses and professions (DNFBPs), including art dealers, to implement compliance programs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Central Bank Regulations</h4>
                  <p className="mt-1 text-sm">
                    Enhanced due diligence requirements for high-value transactions. Art market participants must register with relevant authorities and maintain compliance infrastructure.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Dubai & Abu Dhabi Frameworks</h4>
                  <p className="mt-1 text-sm">
                    Local regulations in financial centers require art dealers to conduct customer due diligence and report suspicious transactions to the Financial Intelligence Unit.
                  </p>
                </div>
              </div>
            </div>

            {/* Asia (General) */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">AS</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Asia-Pacific</h3>
              </div>
              <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Singapore</h4>
                  <p className="mt-1 text-sm">
                    MAS (Monetary Authority of Singapore) regulations require art dealers to conduct customer due diligence and report suspicious transactions. Enhanced requirements for high-value art transactions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Hong Kong</h4>
                  <p className="mt-1 text-sm">
                    Anti-Money Laundering and Counter-Terrorist Financing Ordinance requires art dealers to implement AML programs, conduct due diligence, and maintain records for seven years.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Regional Trends</h4>
                  <p className="mt-1 text-sm">
                    FATF recommendations driving harmonization across APAC jurisdictions. Art market participants face increasing compliance obligations as regional frameworks mature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Risks */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            Common Compliance Risks
          </h2>
          <div className="mt-12 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Administrative Burden</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Manual compliance processes create significant administrative costs. Regulators require comprehensive documentation, but traditional methods are inefficient and error-prone, leading to increased regulatory scrutiny and potential fines.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Legal Liability</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Non-compliance can result in severe penalties, including fines, criminal liability, and reputational damage. Law firms and accounting firms face professional liability if their clients' transactions violate AML regulations.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Relationship Protection</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Galleries risk exposing their private client lists during compliance processes. Collectors demand anonymity, but compliance requirements demand transparency—creating a fundamental conflict that threatens business relationships.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Documentation Management</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Regulators, tax bodies, and legal representatives require access to organized, auditable compliance documentation. Without proper infrastructure, documentation becomes fragmented, creating audit risks and compliance gaps.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Aegis Core Solves These Challenges
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Our Double-Blind compliance framework protects all parties while meeting regulatory requirements across all jurisdictions.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/solution"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Learn How It Works
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

