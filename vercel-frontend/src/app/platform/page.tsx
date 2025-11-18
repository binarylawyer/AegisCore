import Link from "next/link";

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <span className="text-sm font-bold">AC</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Aegis Core
              </span>
            </Link>
            <nav className="hidden md:flex md:space-x-8">
              <Link
                href="/about"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                About
              </Link>
              <Link
                href="/platform"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                Platform
              </Link>
              <Link
                href="/market-intelligence"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Market Intelligence
              </Link>
              <Link
                href="/profiler"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Profiler
              </Link>
            </nav>
            <Link
              href="/dashboard"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Platform Architecture
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Built on institutional-grade infrastructure with compliance-first design
          </p>
        </div>

        {/* Market Opportunity */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The $24B RWA Inflection Point
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              The Real World Asset (RWA) tokenization market has demonstrated <strong className="text-zinc-900 dark:text-zinc-100">380% growth in three years</strong>, exploding from <strong className="text-zinc-900 dark:text-zinc-100">$5 billion in 2022 to over $24 billion as of June 2025</strong>. It is crypto's second fastest-growing sector.
            </p>
            <p>
              Industry consensus, including projections from Standard Chartered and BCG, places the RWA market at <strong className="text-zinc-900 dark:text-zinc-100">$10 to $30 trillion by 2030</strong>.
            </p>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Institutional Validation
              </h3>
              <ul className="mt-4 space-y-2 text-emerald-800 dark:text-emerald-200">
                <li>• <strong>BlackRock:</strong> $2.9B BUIDL fund gained $700M in 11 days</li>
                <li>• <strong>JPMorgan:</strong> Processed $300B+ through tokenized networks</li>
                <li>• <strong>Goldman Sachs:</strong> Spinning out entire Digital Asset Platform</li>
                <li>• <strong>70% of 2024 capital</strong> from institutional investors</li>
              </ul>
            </div>
            <p>
              The $65 billion global art market is perfectly positioned for this disruption. While the RWA market explodes, the traditional art market is simultaneously <strong className="text-zinc-900 dark:text-zinc-100">declining 12% year-over-year</strong>—ripe for transformation through tokenization.
            </p>
          </div>
        </section>

        {/* Corporate Structure */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Global Corporate Architecture
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Swiss/Liechtenstein Protocol Foundation
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The core intellectual property (IP), source code, and smart contract designs are vested in a <strong className="text-zinc-900 dark:text-zinc-100">Liechtenstein Stiftung (Foundation)</strong>. This entity is legally and financially insulated from operational liabilities. The <strong className="text-zinc-900 dark:text-zinc-100">Swiss AG (Opus Global)</strong> licenses this IP, ensuring long-term resilience and institutional-grade stability.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Parallel US/EU Operating Companies
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-zinc-100">Opus USA (Delaware C-Corp)</strong> manages all US operations, compliance, and serves as legal manager for Delaware Series LLCs. <strong className="text-zinc-900 dark:text-zinc-100">Opus Global (Swiss AG)</strong> manages EU/RoW operations and Luxembourg Securitization Vehicles. This parallel structure ensures jurisdictional compliance and risk isolation.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Compliance DAO (Delaware DAO LLC)
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                A novel compliance mechanism where US-based, AML-regulated galleries and institutional partners vote on US-specific compliance parameters. When regulators ask "Who decides your compliance standards?", the answer is: <strong className="text-zinc-900 dark:text-zinc-100">"Our US-based Compliance DAO, legally structured as a Delaware LLC, composed of our AML-regulated gallery partners."</strong> This turns compliance from a burden into a collaborative, transparent, and legally defensible process.
              </p>
            </div>
          </div>
        </section>

        {/* On-Chain Architecture */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            On-Chain Architecture: The "Phygital" Model
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Master NFT + Vault Pattern
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Each artwork is represented by an <strong className="text-zinc-900 dark:text-zinc-100">ERC-721 "Master NFT"</strong> that represents 100% membership interest in the legal entity (Delaware Series LLC or Luxembourg SV). This Master NFT is immediately locked in a <strong className="text-zinc-900 dark:text-zinc-100">Vault smart contract</strong>, which then mints <strong className="text-zinc-900 dark:text-zinc-100">ERC-3643 fractional tokens</strong> (e.g., $PICASSO) representing fractional economic interests. The Master NFT's metadata is dynamic, updateable by trusted oracles (custodians, insurers) to reflect physical location, insurance status, and legal documentation.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                ERC-3643 Compliance Protocol
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The platform uses <strong className="text-zinc-900 dark:text-zinc-100">ERC-3643 (T-REX)</strong>, an open-source standard for permissioned, RWA-backed tokens. It consists of:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">Identity Registry:</strong> Global on-chain database linking wallet addresses to anonymous "claims" (e.g., JURISDICTION_USA, IS_ACCREDITED)</li>
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">Trusted Issuers Registry:</strong> Lists authorized entities (Opus USA/Global) that can add/revoke claims</li>
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">Compliance Contract:</strong> Per-asset contract defining rules (e.g., "Only wallets with JURISDICTION_USA AND IS_ACCREDITED can hold this token")</li>
              </ul>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-900/20">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Dynamic canTransfer() Checking
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When a collector attempts to purchase tokens, the frontend makes a <strong className="text-zinc-900 dark:text-zinc-100">real-time, client-side read-call</strong> to the asset's ERC-3643 Compliance contract, executing <code className="rounded bg-indigo-100 px-1 py-0.5 text-sm dark:bg-indigo-900/40">canTransfer(from, to, value)</code>. The button state is rendered based on the boolean response:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">TRUE:</strong> Button is "Active" - transaction can proceed</li>
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">FALSE:</strong> Button is "Disabled" - "Your wallet is not verified for this asset. Please contact your legal advisor to begin verification."</li>
              </ul>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                This ensures <strong className="text-zinc-900 dark:text-zinc-100">programmatic, trustless compliance</strong>. The platform never asks a central server "Is this user KYC'd?"—it asks the public, on-chain contract "Does this anonymous wallet hold the required anonymous claims?"
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Jurisdiction-Aware Allow-Lists
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The Identity Registry stores jurisdiction-specific claims (JURISDICTION_USA, JURISDICTION_EU, JURISDICTION_HKG, etc.). Each asset's Compliance contract defines which jurisdictions are allowed. For example:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">US Asset:</strong> Requires JURISDICTION_USA AND IS_ACCREDITED</li>
                <li>• <strong className="text-zinc-900 dark:text-zinc-100">EU Asset:</strong> Requires JURISDICTION_EU OR JURISDICTION_CHE OR JURISDICTION_HKG</li>
              </ul>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                This enables global collectors to form "buying co-ops" while maintaining regulatory compliance—a European investor and a Hong Kong investor can both hold the same EU-domiciled asset, as long as they meet the asset's specific compliance rules.
              </p>
            </div>
          </div>
        </section>

        {/* Financial Infrastructure */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Financial Infrastructure
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                PaymentSplitter & Instant Pay
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Uses OpenZeppelin's <strong className="text-zinc-900 dark:text-zinc-100">PaymentSplitter</strong> contract configured to handle ERC-20 tokens (USDC, EURC). Upon sale, the Sale contract atomically:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">
                <li>Pulls payment from buyer's wallet</li>
                <li>Splits funds according to pre-configured percentages (artist, gallery, platform)</li>
                <li>Transfers ERC-3643 tokens to buyer</li>
                <li>Distributes payments instantly—solving the 90-day payment lag</li>
              </ol>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Gnosis Safe Co-ops
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Galleries, artist estates, or collectives can deploy a <strong className="text-zinc-900 dark:text-zinc-100">Gnosis Safe multi-sig wallet</strong> for collective governance. The platform provides "Multi-Sig-as-a-Service" by automatically deploying Gnosis Safe contracts with custom rules (e.g., "2-of-3 signatures required for sale approval"). The Master NFT and fractional tokens are held by this co-op until sale approval.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                EIP-2981 Enforced Royalties
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                A custom <strong className="text-zinc-900 dark:text-zinc-100">RoyaltyComplianceModule</strong> for ERC-3643 enforces EIP-2981 royalty payments on secondary transfers. The <code className="rounded bg-zinc-200 px-1 py-0.5 text-sm dark:bg-zinc-800">canTransfer</code> check fails unless the royalty is satisfied, making royalties <strong className="text-zinc-900 dark:text-zinc-100">non-optional and automatically enforced</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Physical Custody */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Phygital Custody Stack
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Custodian & Insurer APIs
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The platform integrates with high-security custodians (Geneva Freeport, Delaware Freeport) and insurers (AXA Art, Chubb) via APIs. These partners act as <strong className="text-zinc-900 dark:text-zinc-100">"oracles"</strong> that update the Master NFT's dynamic metadata in real-time:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• Physical location (e.g., "Vault 42, Sector B, Geneva Freeport")</li>
                <li>• Insurance status and policy numbers</li>
                <li>• Legal documentation hashes</li>
                <li>• Movement tracking (when art is in transit)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Physical Custody Workflows
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                When a sale executes on-chain, the smart contract emits a <code className="rounded bg-zinc-200 px-1 py-0.5 text-sm dark:bg-zinc-800">SaleExecuted</code> event. An off-chain "Oracle" listener immediately triggers authenticated API calls to:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-900 dark:text-zinc-100">Custodian:</strong> Update owner registry</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Insurer:</strong> Transfer policy to new beneficiary</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Master NFT:</strong> Update metadata with new ownership and custody information</li>
              </ol>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                This workflow settles a multi-million dollar, international art sale—including payment, title transfer, and updating of custodial and insurance records—in approximately <strong className="text-zinc-900 dark:text-zinc-100">15 seconds</strong>, for less than $5 in L2 gas fees.
              </p>
            </div>
          </div>
        </section>

        {/* Opus Workflow */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Opus Compliance Engine
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Large Work Model (LWM) + Human-in-the-Loop (HITL)
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The Opus workflow uses AI agents (Large Work Models) to perform initial automated tasks:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• OCR and data extraction from uploaded documents</li>
                <li>• Automated API calls to third-party AML/KYC providers (Chainalysis, World-Check)</li>
                <li>• Sanctions screening and address verification</li>
              </ul>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                The workflow then <strong className="text-zinc-900 dark:text-zinc-100">pauses for human review</strong>—a paralegal reviews the AI's findings, and a Partner makes the final legal determination. This "human-in-the-loop" ensures professional judgment while automating routine tasks.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                External Service Nodes
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Opus workflows can call custom APIs via <strong className="text-zinc-900 dark:text-zinc-100">External Service Nodes</strong>. These nodes can:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• Launch Docker stacks for isolated processing</li>
                <li>• Call third-party compliance APIs</li>
                <li>• Execute on-chain transactions (via secure server-side wallets)</li>
                <li>• Pass rich JSON payloads between workflow steps</li>
              </ul>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                File handling uses <strong className="text-zinc-900 dark:text-zinc-100">pre-signed URLs</strong> (not base64) for secure, efficient document transfer.
              </p>
            </div>
          </div>
        </section>

        {/* Phased Delivery */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Phased Delivery Roadmap
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Phase 1: Opus Compliance Engine
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Build the B2B SaaS portal for law firms. Deploy ERC-3643 Identity Registry and core contracts. Onboard the first 10 law firms as Trusted Issuers. <strong className="text-zinc-900 dark:text-zinc-100">Goal:</strong> Prove the "double-blind" attestation workflow.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Phase 2: The Marketplace
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Build Gallery Portal ("Sushi Kitchen") and Collector Portal. Build the full ERC-721/ERC-3643 "Vault" tokenization workflow. Integrate one US (Delaware Freeport) and one EU (Geneva Freeport) custodian. Deploy PaymentSplitter and GnosisSafe factory. <strong className="text-zinc-900 dark:text-zinc-100">Goal:</strong> Execute the first 10 compliant, fractional, instantly-paid sales.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Phase 3: Instant Pay & Ecosystem
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Build and launch the "Profiler" (RAG) tool. Build the EIP-2981 Royalty Module for secondary sales. Launch the DAOs (Marshall Islands & Delaware) for governance. <strong className="text-zinc-900 dark:text-zinc-100">Goal:</strong> Scale the ecosystem, capture the secondary market, and begin decentralizing governance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-3xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to build on Aegis Core?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Join galleries, artists, and collectors who are transforming the art market through compliant tokenization.
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
    </div>
  );
}

