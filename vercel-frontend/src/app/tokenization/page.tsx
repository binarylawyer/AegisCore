import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function TokenizationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            Art Tokenization Explained
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            How Aegis Core uses Ethereum standards ERC-721 and ERC-3643 to create compliant, fractional ownership of artworks while maintaining regulatory compliance and privacy.
          </p>
        </div>

        {/* What is Tokenization */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            What is Art Tokenization?
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              Tokenization converts ownership of a physical artwork into digital tokens on a blockchain. Each token represents a fractional share of the artwork, enabling multiple investors to own a piece of a valuable asset that would otherwise be inaccessible.
            </p>
            <p>
              Aegis Core uses a dual-token architecture combining two Ethereum standards: <strong className="text-zinc-900 dark:text-zinc-100">ERC-721</strong> (the Master NFT representing 100% ownership) and <strong className="text-zinc-900 dark:text-zinc-100">ERC-3643</strong> (compliant fractional tokens). This architecture ensures both legal compliance and programmatic enforcement of ownership rights.
            </p>
          </div>
        </section>

        {/* ERC-721: The Master NFT */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            ERC-721: The Master NFT
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                What is ERC-721?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                ERC-721 is the Ethereum standard for Non-Fungible Tokens (NFTs). Unlike cryptocurrencies like Bitcoin or Ethereum (which are fungible—one unit is identical to another), NFTs are unique, indivisible tokens. Each ERC-721 token has a unique identifier and cannot be split or duplicated.
              </p>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-900/20">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                How Aegis Core Uses ERC-721
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                In Aegis Core's architecture, the ERC-721 token (called the "Master NFT") represents <strong className="text-zinc-900 dark:text-zinc-100">100% membership interest</strong> in an off-chain legal entity—typically a Delaware Series LLC or Luxembourg Société à Responsabilité Limitée (SARL).
              </p>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Legal Entity Ownership:</strong> The Master NFT holder owns the legal entity that holds title to the physical artwork. This creates a clear legal structure recognized by courts.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Indivisible Title:</strong> The Master NFT cannot be split. It represents the entire legal entity, ensuring clear title ownership.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Metadata Storage:</strong> The Master NFT stores critical metadata: provenance records, custody agreements, insurance policies, and physical location—all updated in real-time via API integrations with custodians and insurers.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Vault Pattern:</strong> The Master NFT acts as the "vault" that holds the artwork. Fractional shares (ERC-3643 tokens) represent ownership of this vault, not direct ownership of the artwork.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ERC-3643: Compliant Fractional Tokens */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            ERC-3643: Compliant Fractional Tokens
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                What is ERC-3643 (T-REX)?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                ERC-3643, also known as T-REX (Token for Regulated EXchanges), is an open-source standard developed by Tokeny Solutions for creating <strong className="text-zinc-900 dark:text-zinc-100">permissioned, compliant tokens</strong> representing Real World Assets (RWAs). Unlike ERC-721, ERC-3643 tokens are fungible—one token is identical to another—and can be divided into fractional shares.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                The key innovation of ERC-3643 is its <strong className="text-zinc-900 dark:text-zinc-100">built-in compliance logic</strong>. Each token contract includes a Compliance contract that defines jurisdiction-specific rules (e.g., "only accredited investors in the USA" or "only qualified investors in the EU"). These rules are enforced programmatically at the smart contract level.
              </p>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-900/20">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                How Aegis Core Uses ERC-3643
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                When an artwork is tokenized, Aegis Core creates fractional shares using ERC-3643. For example, a $1 million painting might be divided into 1,000,000 tokens, each representing 0.0001% ownership of the Master NFT (and thus the legal entity holding the artwork).
              </p>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Programmatic Compliance:</strong> The Compliance contract's <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">canTransfer()</code> function automatically checks the Identity Registry before any transfer. If the recipient doesn't hold required claims (e.g., "IS_ACCREDITED", "JURISDICTION_USA"), the transfer fails.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Identity Registry:</strong> The ERC-3643 Identity Registry stores anonymous compliance claims (e.g., wallet address "0xABC..." holds claim "TIER_3"). No PII is stored—only verifiable attestations issued by law firms.</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Fractional Ownership:</strong> Investors can purchase any number of tokens, enabling fractional ownership. A collector might own 100,000 tokens (10% of the artwork) or 1 token (0.0001%).</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-zinc-900 dark:text-zinc-100">Secondary Market Trading:</strong> ERC-3643 tokens can be traded on compliant secondary markets. Each transfer is automatically checked for compliance, ensuring only verified investors can participate.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How They Work Together */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The NFT Vault Pattern: How ERC-721 and ERC-3643 Work Together
          </h2>
          <div className="mt-8 space-y-6">
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Aegis Core uses the "NFT Vault Pattern" to combine the unique title ownership of ERC-721 with the fractional, compliant shares of ERC-3643. This architecture solves the fundamental challenge of tokenizing physical assets: maintaining clear legal title while enabling fractional ownership.
            </p>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Step-by-Step Tokenization Process
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">1</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Artwork Upload & Legal Entity Formation</h4>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      A gallery or artist uploads an artwork to Aegis Core. The platform facilitates formation of a Delaware Series LLC or Luxembourg SARL that will hold legal title to the artwork. This entity is the "vault."
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">2</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Master NFT Creation (ERC-721)</h4>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      A single ERC-721 token (the Master NFT) is minted, representing 100% membership interest in the legal entity. This NFT is indivisible and represents complete ownership of the "vault." Metadata includes provenance, custody location, and insurance details.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">3</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Fractional Token Creation (ERC-3643)</h4>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      Fractional shares are minted using ERC-3643. For example, 1,000,000 tokens might be created, each representing 0.0001% ownership of the Master NFT. The Compliance contract defines jurisdiction-specific rules (e.g., "only Tier 3 investors").
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">4</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Compliant Distribution</h4>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      When an investor attempts to purchase tokens, the Compliance contract checks the Identity Registry. If the investor holds required claims (verified by their law firm via Opus), the transfer proceeds. If not, it fails automatically.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">5</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Ongoing Management</h4>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      The Master NFT's metadata is updated in real-time via API integrations with custodians (Geneva Freeport, Delaware Freeport) and insurers (AXA Art, Chubb). Token holders can verify custody status, insurance coverage, and physical location at any time.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Benefits of This Architecture
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Clear Legal Title</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                The Master NFT represents ownership of a legal entity recognized by courts. This creates enforceable property rights, unlike direct NFT ownership of physical assets.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Programmatic Compliance</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                ERC-3643's Compliance contract enforces regulatory requirements automatically. No manual checks required—the smart contract ensures only verified investors can hold tokens.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Fractional Ownership</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Investors can own any fraction of an artwork, making high-value art accessible to a broader range of collectors. A $10 million painting can be divided into 10 million tokens at $1 each.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Liquidity</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Fractional tokens can be traded on compliant secondary markets, providing liquidity that doesn't exist in traditional art ownership. Investors can exit positions without selling the entire artwork.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Transparency</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                All ownership, transfers, and compliance checks are recorded on-chain, creating an immutable audit trail. Regulators can verify compliance without accessing private information.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Privacy Protection</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                The Identity Registry stores only anonymous compliance claims—no PII. Collectors remain anonymous while meeting regulatory requirements, preserving the privacy essential to the art market.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Technical Implementation Details
          </h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Compliance Contract Functions
              </h3>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono">canTransfer(address _from, address _to, uint256 _amount)</code>
                  <p className="mt-2 text-sm">
                    Checks the Identity Registry to verify that the recipient holds required compliance claims. Returns <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">true</code> if transfer is allowed, <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">false</code> otherwise. This function is called automatically before every token transfer.
                  </p>
                </div>
                <div>
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono">identityRegistry()</code>
                  <p className="mt-2 text-sm">
                    Returns the address of the ERC-3643 Identity Registry contract that stores compliance claims. This registry is global and shared across all ERC-3643 tokens on the platform.
                  </p>
                </div>
                <div>
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono">compliance()</code>
                  <p className="mt-2 text-sm">
                    Returns the address of the Compliance contract that defines jurisdiction-specific rules. Each artwork's token contract references its own Compliance contract, allowing different artworks to have different compliance requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Identity Registry Claims
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                The Identity Registry stores anonymous compliance claims as key-value pairs. Examples include:
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">JURISDICTION_USA</code> - Investor is verified for US transactions</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">IS_ACCREDITED</code> - Investor meets SEC accredited investor requirements</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">TIER_3</code> - Investor verified for transactions exceeding $2M</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">JURISDICTION_EU</code> - Investor is verified for EU transactions</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">IS_QUALIFIED</code> - Investor meets EU MiFID II qualified investor requirements</li>
              </ul>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                These claims are issued by law firms via the Opus portal after completing AML/KYC verification. The platform never sees the underlying documentation—only the final attestation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-12 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Ready to Tokenize Your Artwork?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Learn how to tokenize your artwork using Aegis Core's compliant infrastructure.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/tokenization"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Start Tokenization
              </Link>
              <Link
                href="/platform"
                className="rounded-md border border-indigo-600 bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 dark:bg-zinc-900 dark:text-indigo-400"
              >
                View Platform Architecture
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
