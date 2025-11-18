# **Product Requirements Document: Aegis Core v2.0 (AI Genesis Master Blueprint)**

## **1.0 Introduction: Vision & Strategic Mandate**

This document provides the definitive technical and product requirements for the "Aegis Core" ecosystem (v2.0). It is a consolidated master blueprint intended to synthesize all prior research and architectural planning into a single, build-ready specification for the AI Genesis hackathon.

### **1.1 The Problem: The Art Market's Privacy-Transparency Paradox**

The global high-value art market, a $65 billion industry, operates on a fundamental and debilitating paradox.1 Its two most valuable commodities, **privacy** and **provenance**, are in direct conflict.2

On one side, high-net-worth (HNW) collectors (Persona: "Stefan") demand absolute anonymity and privacy in their transactions.2 This has been the cultural norm for centuries.

On the other side, a new and non-negotiable wave of global Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) regulations—driven by FinCEN, the FATF, and the EU's 5AMLD—demands absolute transparency to combat financial crime.1

This irreconcilable conflict between anonymity and transparency has created a market that is structurally broken 2:

* **Opaque & High-Risk:** The market lacks a single source of truth for compliance, making it a high-risk environment for financial crime.2  
* **Illiquid:** Transactions are crippled by archaic 30-90 day payment and settlement cycles, locking up billions in capital.2  
* **High-Friction:** Artists (Persona: "Ari") and galleries (Persona: "Camilla") face chronic, business-threatening cash-flow delays.2  
* **Fragmented:** Galleries cannot access a global pool of new, vetted buyers. Doing so would require them to risk their single most valuable business asset: their private client lists.2 A traditional, centralized database of "KYC'd collectors" would be subject to "poaching," destroying the gallery's business model.2

Any viable solution must therefore solve a dual-track problem: it must provide collectors with cryptographic-grade privacy while simultaneously giving regulators provable compliance. Crucially, it must also protect the business-critical assets (client lists) of its own suppliers (galleries).

### **1.2 The Solution: The "Double-Blind" Attestation Ecosystem**

This platform solves the paradox by engineering a system that fundamentally **separates identity verification from market participation**.2

The solution is a "Double-Blind" ecosystem, powered by the eponymous **Aegis Core** compliance engine.2 This architecture creates a "trustless" marketplace by insulating all parties, where compliance is abstracted to trusted, regulated fiduciaries (e.g., law firms) and enforced anonymously on-chain via non-falsifiable cryptographic attestations.3

This "Double-Blind" model functions as follows 2:

1. **Collectors are blind:** Their identity is known *only* to their chosen legal or financial advisor (Persona: "Laura"). It is never revealed to the platform, sellers, or other collectors.3  
2. **Sellers are blind:** They do not see the collector's name or personal data. They see *only* an on-chain, non-falsifiable attestation proving the collector's wallet is "Vetted \- Tier 3".3  
3. **Galleries are blind:** The platform's "asymmetrical visibility" model ensures galleries are cryptographically protected from seeing or "poaching" each other's private client lists.2  
4. **The Platform is blind:** The platform itself *never* sees or stores its users' sensitive Personally Identifiable Information (PII). This insulates the platform from liability and allows it to function as a true, neutral market utility.2

### **1.3 The Market & Opportunity: The $24B RWA Inflection Point**

The strategic timing for this solution is driven by an undeniable market inflection point.1 The Real World Asset (RWA) tokenization market is not an experiment; it is an institutional-grade wave of capital in motion.

* **Massive Growth:** The RWA market has demonstrated **380% growth in three years**, exploding from **$5 billion in 2022 to over $24 billion as of June 2025** (excluding stablecoins).1 It is crypto's second fastest-growing sector.  
* **Trillion-Dollar Projections:** Industry consensus, including projections from Standard Chartered and BCG, places the RWA market at **$10 to $30 trillion by 2030**.1  
* **Institutional Validation:** This growth is validated by massive institutional commitment 1:  
  * **BlackRock:** The $2.9 billion BUIDL fund (largest tokenized MMF) gained **$700 million in its first 11 days**.1  
  * **JPMorgan:** Has **processed over $300 billion** in transactions via its Kinexys tokenized collateral network.1  
  * **Market-wide:** 70% of RWA capital deployed in 2024 came from institutional investors.1

The target vertical—the **$65 billion global art market**—is perfectly positioned for this disruption.1 While the RWA market explodes, the traditional art market is simultaneously **declining 12% year-over-year (2024)**.1

This is the "Great Migration" thesis: the traditional art market is declining *because* it is illiquid and opaque. The RWA market is succeeding *because* it programmatically solves liquidity. Aegis Core is the essential, compliance-first *bridge* that allows the $65B of "stranded" illiquid art assets to safely and legally migrate to the liquid, transparent, and rapidly growing $24B+ RWA ecosystem.

Aegis Core is not just a platform; it is the regulatory and technical engine for this migration.

### **1.4 Core User Personas & Stories**

All functional requirements are grounded in the needs of four core user personas.

*Table 1.1: Core User Personas & User Stories*

| Persona | Role | Needs & Goals (User Stories) |
| :---- | :---- | :---- |
| **Laura (Legal Partner)** | Law Firm / Bank | As Laura, I need a secure, multi-tenant portal to manage AML/KYC for my HNW clients in this new asset class. 2 As Laura, I need to perform my legal due diligence in an auditable, purpose-built workflow. 2 As Laura, I need to attest to my client's status *without* revealing their PII to the platform. 2 |
| **Stefan (Collector)** | HNW Investor (Buyer) | As Stefan, I need to browse and purchase high-value art anonymously using my self-custody wallet (BYOW). As Stefan, I need to be able to co-invest with other global collectors without being exposed to their legal jurisdiction. As Stefan, I need to trust that the asset I'm buying is real, insured, and legally mine. |
| **Camilla (Gallery Director)** | Art Gallery (Seller) | As Camilla, I need to find new, qualified collectors *without* my current client list being "poached." As Camilla, I need a simple tool to tokenize and list artworks that handles all the legal and technical complexity. As Camilla, I need to get paid *instantly* when a sale is made, not 90 days later. |
| **Ari (Artist)** | Creator (Seller) | As Ari, I need to be paid my share of a primary sale *at the same time* as the gallery. As Ari, I need to automatically and reliably receive royalties on *all* future secondary sales. |

## **2.0 Foundational Architecture: The "Double-Blind" Framework**

The Aegis Core solution is a "full-stack" architecture, where the off-chain legal "wrapper" is as critical as the on-chain "plumbing." This architecture is a primary product feature, providing institutional-grade resilience and liability insulation.

### **2.1 Off-Chain Legal & Corporate Structure (The "Wrapper")**

The platform will adopt an advanced, multi-jurisdictional corporate structure to manage regulatory risk, ensure business continuity, and optimize for global operations.5 This structure is a sophisticated "legal engineering" solution that provides two key benefits: resilience and risk-delegation.

1. **Resilience (The "Protocol-OpCo" Separation):** This architecture is built for long-term survival. The core intellectual property (IP), source code, and smart contract designs for the "Aegis Core" / "Opus" protocol are *not* held by the day-to-day operating company. Instead, they are vested in a **Liechtenstein *Stiftung*** (Foundation).5 This entity is legally and financially insulated. The **Swiss AG** (the "Global OpCo") *licenses* this IP from the *Stiftung*.5 If the Swiss AG ever faces operational or legal distress, the core protocol IP remains untouched and protected within the *Stiftung*, which can then license it to a new, healthy OpCo to continue the mission.5 This resilience is a critical feature for institutional partners who must build on a platform that will outlive any single company. This structure strategically leverages the "Swiss Anchor" (stability) and "Liechtenstein Gateway" (EEA-passporting) model.7  
2. **Risk Delegation (The "Compliance DAO"):** The US compliance layer is a **Delaware C-Corp** (for US operations) with a subsidiary **Delaware DAO LLC**.5 This DAO LLC's members are the US-based, AML-regulated galleries and partners who use the platform. When a regulator like FinCEN asks, "Who decides your US compliance standards?", the answer is: "Our US-based 'Compliance DAO,' which is legally structured as a Delaware LLC and is composed of our US-based, AML-regulated gallery partners, who vote to collaboratively set and enforce these standards".5 This architecture elegantly deflects regulatory pressure, distributes liability, and creates mandatory, collaborative buy-in from the platform's most important users.

Table 2.1: Global Corporate Architecture (Synthesized) 2

| Entity (Legal Form) | Jurisdiction | Governing Regulation | Role in Ecosystem | Primary Asset(s) Held |
| :---- | :---- | :---- | :---- | :---- |
| **Liechtenstein Foundation** (*Stiftung*) | Liechtenstein | Token and VT Service Providers Act (TVT) | **Global IP Holder, Protocol Governance** | Core "Aegis Core" / "Opus" IP, Smart Contracts, Protocol Reserve |
| **Swiss AG** (*Aktiengesellschaft*) | Switzerland (Zug) | FINMA, Swiss FADP | **Global OpCo (ex-US)**, Treasury Management | Global (ex-US) Operations, EUR/CHF/Stablecoin Treasury, Licenses IP from *Stiftung* |
| **Delaware C-Corp** (*Corporation*) | USA (Delaware) | FinCEN, BSA | **US OpCo**, US Compliance Layer | US Operations, USD Treasury, US Partner Contracts, Subsidiary of Swiss AG |
| **Delaware DAO LLC** (*DAO LLC*) | USA (Delaware / WY) | Delaware LLC Act | **US Compliance Governance** | US-specific Compliance Voting Rights, Subsidiary of DE C-Corp |
| **Delaware Series LLCs** / **Luxembourg SVs** | Delaware / Luxembourg | US / EU Law | **Asset SPVs** (Special Purpose Vehicles) | Legal title to individual artworks, Isolates liability per-asset |

### **2.2 On-Chain Asset & Compliance Structure (The "Plumbing")**

The platform will implement a "phygital" (physical \+ digital) asset architecture. This will be the "NFT Vault" model, which unifies the need for 1-of-1 title transfer and fractional economic participation.2

This model provides maximum market flexibility. It allows a "whale" (like Stefan) to acquire 100% of the fractional tokens and execute a redeem() function on the Vault.sol contract, which would burn the fractional tokens and transfer the 1-of-1 "Master NFT" to his wallet, giving him full legal title. It also allows co-investors to buy and sell smaller fractional shares, solving the market's liquidity problem.

The "NFT Vault" minting process is as follows:

1. **ERC-721 "Master NFT":** A single, indivisible **ERC-721** token is minted to represent 100% of the *legal title* and *custodial claim* on the physical artwork (which is legally held in a segregated SPV).2 This NFT's metadata is **dynamic**, controlled by trusted oracles (the custodians and insurers) to reflect real-time, on-chain data for Physical\_Location, Insurance\_Status, and Legal\_Docs\_Hash.2  
2. **Vault.sol:** This "Master NFT" is immediately transferred to and **locked** within a new, purpose-built **Vault.sol** smart contract.2  
3. **ERC-3643 Fractional Tokens:** The Vault.sol contract, which now "owns" the Master NFT, mints a fixed supply (e.g., 1,000,000) of **ERC-3643** tokens (e.g., $PICASSO).2 These fungible, *permissioned* tokens represent the fractional *economic interests* in the asset held by the vault. These are the tokens that are bought and sold on the marketplace.

The entire ecosystem is built on the **ERC-3643 (T-REX)** standard, an open-source suite of contracts designed for regulated assets, which bakes compliance directly into the token protocol.2

Table 2.2: On-Chain Smart Contract Suite 2

| Contract / Standard | Name | Role & Function |
| :---- | :---- | :---- |
| **ERC-721** | **Master NFT** | **Title & Metadata:** 1-of-1 "Phygital" token representing legal title. Holds *dynamic metadata* (Location, Insurance) updated by trusted oracles (Custodians). |
| **Smart Contract** | **Vault.sol** | **Asset Lockbox:** Locks the "Master NFT" (ERC-721). Mints/burns the fractional tokens (ERC-3643) that represent economic interest in the locked asset. |
| **ERC-3643** | **Fractional Tokens** | **Economic Interest:** The fungible, "permissioned" tokens (e.g., $PICASSO) that are bought and sold on the marketplace. |
| **ERC-3643 Contract** | **IdentityRegistry.sol** | **Global Allow-list:** A *single* global registry that stores anonymous, on-chain "claims" (WalletAddress \-\> ClaimTopic \-\> ClaimValue). Contains *no PII*. |
| **ERC-3643 Contract** | **TrustedIssuersRegistry.sol** | **Gatekeeper List:** Lists the wallets authorized to add/revoke claims in the Identity Registry. This will be the platform's chain-tx-service wallet. |
| **ERC-3643 Contract** | **Compliance.sol** | **Asset Rulebook:** A *per-asset* contract. Defines the *rules* for that asset (e.g., "Requires Claim: JURISDICTION\_USA AND Claim: IS\_ACCREDITED"). |
| **OpenZeppelin** | **PaymentSplitter.sol** | **Instant Pay:** Used for atomic settlement. Modified to split ERC-20 stablecoins (USDC, EURC) to artist and gallery wallets. |
| **OpenZeppelin** | **EIP-2981** / **Custom Module** | **Enforced Royalties:** RoyaltyComplianceModule.sol. A custom ERC-3643 module that *enforces* EIP-2981 royalties by making canTransfer fail unless the royalty is paid. |
| **Standard** | **GnosisSafe.sol** | **"Co-op" Governance:** The standard, audited multi-sig wallet used to give artists/galleries shared control over asset sales. |

## **3.0 Core Product 1: "Aegis Core" (The B2B Compliance Engine)**

**AI Genesis Hackathon \- Priority 1**

This is the central, eponymous product of the ecosystem. It is the B2B RegTech SaaS portal for "Laura" (Legal Partner) and her firm.

### **3.1 Overview & User Stories (Persona: Laura, Legal Partner)**

The "Aegis Core" engine is the central RegTech SaaS, built on the **Opus** agentic automation platform.2 It is the secure B2B portal for law firms, banks, and accounting firms to manage complex, art-specific AML/KYC compliance workflows and, crucially, to issue the resulting anonymous on-chain attestations.2

* **User Story:** "As Laura, I need a secure, multi-tenant portal to manage AML/KYC for my HNW clients in this new asset class".2  
* **User Story:** "As Laura, I need to perform my legal due diligence in an auditable, purpose-built workflow".2  
* **User Story:** "As Laura, I need to attest to my client's status *without* revealing their PII to the platform".2

### **3.2 Feature: Multi-Tenant B2B SaaS Portal**

* **FR-3.2.1:** The platform **must** be a multi-tenant application. A subscribed firm (e.g., "Firm A") **must** only be able to see its own partners, clients, and active workflows. It must have zero visibility into "Firm B's" data, ensuring strict attorney-client privilege.2  
* **FR-3.2.2:** The platform **must** provide granular, role-based access controls (RBAC) (e.g., Partner, Associate, Paralegal) to mirror the firm's internal structure.2  
* **FR-3.2.3:** The portal UI **shall** be a visual canvas displaying active workflows, pending tasks, and immutable audit logs for regulatory review.2

### **3.3 Feature: The "Opus" Agentic Vetting Workflow**

This is the core AI-driven workflow of the "Aegis Core" engine. It is an "AI-Assistant" model designed specifically for a high-liability, regulated environment. The workflow is not a "black box" AI decision-maker; it is an auditable, AI-powered *assistant* that prepares data for a *human* decision-maker.

The workflow proceeds as follows 2:

* **FR-3.3.1: Trigger (Data Node):** The workflow is initiated either by an API call (e.g., NewCollectorInvite from the sushi-kitchen-frontend) or manually by a firm member (e.g., a Paralegal).2  
* **FR-3.3.2: Secure Client Portal (Data Node):** The system **must** generate a secure, branded, single-use portal for the end-client (Collector) to upload sensitive documents (e.g., Passport, Proof of Funds, Proof of Address) directly to their chosen law firm.2 The platform *never* has access to these files.  
* **FR-3.3.3: AI Agent Node (Opus LWM):** This is a primary "AI Genesis" component. The workflow **shall** use Opus's **Large Work Model (LWM)** (or an equivalent agentic model) to perform initial automated tasks 2:  
  * Perform **OCR (Optical Character Recognition)** and structured data extraction from all uploaded documents.  
  * Trigger **External Service Node** calls to third-party AML/KYC APIs (e.g., Chainalysis, World-Check) for automated sanctions screening and address verification.  
* **FR-3.3.4: Human-in-the-Loop (Review Node):** The workflow **must** then **pause** and assign a task to a human reviewer (e.g., Paralegal).2 The UI **must** present a "dossier" comparing the AI's findings (e.g., "Sanctions Screen: CLEAR") against the original source documents for human verification.2  
* **FR-3.3.5: Partner Approval (Review Node):** A final, mandatory approval step **must** be assigned to a Partner-level user ("Laura").2 This human-in-the-loop step is where the final *legal determination* is made and signed off on.  
* **FR-3.3.6:** The entire end-to-end workflow, including every AI-generated datum and human approval, **must** be fully auditable and transparent to the firm and its regulators.2

This "AI-Agent \-\> HITL-Review \-\> HITL-Approval" chain is the only viable model for this B2B product. The platform sells "AI-powered assistance," not "AI-driven liability." The AI agent performs the low-value, high-friction, automated tasks. It then prepares a dossier and hands off to a human for the high-value, high-liability task: *judgment*. This model makes the AI an auditable *assistant* and keeps 100% of the legal-determination liability with the (insured) law firm.5

### **3.4 Feature: The "Double-Blind" Bridge (Attestation Service)**

This feature is the "magic" that bridges the off-chain, PII-filled compliance workflow (Section 3.3) to the on-chain, anonymous marketplace (Section 2.2).

* **FR-3.4.1:** The "Attest" button within the Partner Approval node (FR-3.3.5) **shall** be the key integration point.2  
* **FR-3.4.2:** When "Laura" clicks "Attest," an Opus workflow (External Service Node) **must** be triggered **server-side**.2  
* **FR-3.4.3:** This server-side workflow **must** call the chain-tx-service microservice. This service manages a secure, platform-controlled wallet (e.g., using MPC or HSM).2  
* **FR-3.4.4:** The chain-tx-service (whose address is listed in the TrustedIssuersRegistry.sol) **shall** then call the addClaim function on the global IdentityRegistry.sol smart contract.2  
* **FR-3.4.5:** The payload for this addClaim function **must** be **anonymous** and contain **zero PII**.2 It **shall** *only* contain:  
  * walletAddress: The client's public, self-custody wallet address.  
  * claimTopic: A bytes32 identifier (e.g., JURISDICTION, ACCREDITED\_INVESTOR).  
  * claimValue: A bytes32 identifier (e.g., USA, TRUE).  
* **FR-3.4.6:** The Aegis Core workflow **must** log the on-chain transaction hash for a complete, immutable audit trail, linking the off-chain diligence file to the on-chain anonymous attestation.2

This chain-tx-service is a critical piece of UX. It acts as a *gas relayer*. The lawyer ("Laura") is not required to hold cryptocurrency or manage a MetaMask wallet to issue attestations. She clicks a "Web2" button, and the platform's secure server-side wallet pays the L2 gas fee. This abstracts 100% of the blockchain complexity away from the B2B user, making adoption feasible.

## **4.0 Core Product 2: "The Profiler" (The RAG Lead-Gen Engine)**

**AI Genesis Hackathon \- Priority 2**

This is the second core AI component, an internal R\&D and lead-generation tool for verified galleries ("Camilla").

### **4.1 Overview & User Stories (Persona: Camilla, Gallery Director)**

"The Profiler" is a Retrieval-Augmented Generation (RAG) system built using **Google AI** and **Qdrant**.2 It is a research utility that helps galleries find new leads from *public* data, without exposing the platform's *private* user base.

* **User Story:** "As Camilla, I need to find new, qualified collectors without my current client list being 'poached'".2

### **4.2 Feature: Public Data Ingestion Pipeline**

* **FR-4.2.1:** A backend pipeline **must** be built to ingest and process massive, **publicly available** art-world documents: auction catalogs, museum acquisition announcements, art magazine articles, and press releases.2

### **4.3 Feature: Multimodal Embedding Pipeline (Google AI)**

* **FR-4.3.1:** The pipeline **must** use **Google AI (e.g., Vertex AI)** to perform:  
  * OCR on all ingested documents.  
  * Generation of multimodal (text and image) vector embeddings from this content.2  
    This is a key "AI Genesis" technology.

### **4.4 Feature: RAG Search Interface**

* **FR-4.4.1: Vector Database:** All generated embeddings **must** be stored in the **qdrant\_db** vector database service.2 This is a key "AI Genesis" technology.  
* **FR-4.4.2: Search Interface:** A simple UI **must** be provided within the "Sushi Kitchen" Portal (Section 5.0) where "Camilla" can upload an **image or text description** as a query.2  
* **FR-4.4.3: RAG Workflow:** The system **must** execute the following RAG workflow:  
  1. The user's query (image or text) is embedded using the Google AI model.  
  2. This query vector is used to search the qdrant\_db for semantically similar documents/images.  
  3. The system **must** return a list of the **original source documents** (e.g., "Sotheby's Catalog, May 2024, Page 45").2  
* **FR-4.4.4: Critical "Blind" Requirement:** The system **must not** return names, PII, or any data from the private "Aegis Core" database. It **must only** return the source material for the gallery's own research.2

This "Public-to-Private" ethical and legal wall is "Blind 4" of the framework.3 The "Profiler" (public data) is *completely separate* and *blind* to the "Exchange" (private, verified user base). The tool *never* tells Camilla, "Our verified user *Stefan* (Wallet 0xABC) owns a similar piece," as this would be a catastrophic breach of privacy. Instead, it tells her, "A piece *visually similar* to yours was sold at Sotheby's in 2024, as noted in this *public* catalog." It is then up to Camilla's *human* sales team to research that *public* document, find the collector's name (if listed), and *then* use the "Invite" function (Section 5.6) to bring them into the *private* "Aegis Core" ecosystem.

## **5.0 Core Application 3: "Sushi Kitchen" (Gallery/Artist Frontend)**

This is the B2B/B2C supply-side portal for "Camilla" (Gallery Director) and "Ari" (Artist) to manage inventory, tokenize assets, and manage sales.2

### **5.1 Overview & User Stories (Personas: Camilla, Ari)**

* **User Story:** "As Camilla, I need a simple tool to tokenize and list artworks that handles all the legal and technical complexity".2  
* **User Story:** "As Camilla, I need to get paid *instantly* when a sale is made, not 90 days later".2  
* **User Story:** "As Ari, I need to be paid my share of a primary sale *at the same time* as the gallery".2  
* **User Story:** "As Ari, I need to automatically and reliably receive royalties on *all* future secondary sales".2

### **5.2 Feature: Inventory & File Management (Google File API)**

* **FR-5.2.1:** The portal **must** provide a simple, beautiful interface for galleries to upload and manage their art inventory (high-res images, descriptions, provenance documents).2  
* **FR-5.2.2:** The frontend **must** use the specified **"Google File API"** (Google Cloud Storage) for all file operations, via the file-storage-service microservice.2  
* **FR-5.2.3:** The on-chain tokens (ERC-721) **shall** only store the *hash* or a secure URI of these files, never the files themselves.2

### **5.3 Feature: "Tokenize Asset" Wizard (ERC-721/3643 Vault)**

* **FR-5.3.1:** The portal **must** provide a simple wizard that guides "Camilla" through the asset tokenization process 2:  
  1. Select art from inventory.  
  2. Set price (e.g., $1,000,000) and fractional share count (e.g., 1,000,000 tokens).  
  3. Select jurisdiction (e.g., US or EU), which triggers the appropriate legal wrapper.  
* **FR-5.3.2:** This workflow **shall** trigger the **backend** creation of the **Delaware Series LLC / Lux SV** (the off-chain legal SPV) and the full **ERC-721/ERC-3643 "Vault"** minting process as defined in Section 2.2.2

### **5.4 Feature: "Instant Pay" & Royalty Management (PaymentSplitter, EIP-2981)**

* **FR-5.4.1:** The portal **must** provide a settings page ("Instant Pay" Setup) to define the wallet addresses and percentages for the PaymentSplitter.sol contract.2 This allows "Ari" and "Camilla" to be paid their respective shares *atomically* at the moment of sale.3  
* **FR-5.4.2:** The portal **must** include a field to set the **EIP-2981** secondary market royalty percentage.2  
* **FR-5.4.3:** This royalty **must** be programmatically enforced by the custom RoyaltyComplianceModule.sol (defined in Table 2.2), which will cause canTransfer (Section 6.3) to fail unless the royalty is satisfied. This makes royalties non-optional, solving a core problem for "Ari".2

### **5.5 Feature: "Co-op" Governance (Gnosis Safe Factory)**

* **FR-5.5.1:** The portal **must** provide a "Form Co-op" UI ("Multi-Sig-as-a-Service") to deploy a **Gnosis Safe** (multi-sig wallet) for a specific artwork.2  
* **FR-5.5.2:** This UI **shall** allow "Camilla" to add other signers (e.g., the artist "Ari," a lawyer) and set rules (e.g., 2-of-3) to approve all sales.2 The minted tokens (Sec 5.3) will be held by this Gnosis Safe.

### **5.6 Feature: "Invite Collector" CRM (Asymmetrical Visibility Model)**

This is the most critical feature for gallery adoption, as it directly addresses their fear of "poaching".2

* **FR-5.6.1:** The portal **must** provide a simple "Invite Collector" CRM.2  
* **FR-5.6.2:** When a gallery invites a collector, it **must** trigger an API call to aegis-core to start the "Vetting Workflow" (FR-3.3.1).2  
* **FR-5.6.3:** The gallery's dashboard **shall** *only* show the anonymized status of collectors *they* have invited (e.g., "Pending," "Vetted \- Tier 3").2  
* **FR-5.6.4: Critical Adoption Requirement:** The platform **must** implement the "Collector-Controlled-Disclosure" / "Asymmetrical Visibility" model 5:  
  1. Gallery A invites its client, Collector X. Collector X gets vetted by "Aegis Core."  
  2. Collector X appears *only* in Gallery A's "My Collectors" dashboard, as "Vetted \- Tier 3."  
  3. Gallery B, also on the platform, **cannot see Collector X at all**. Collector X *does not* appear in any global "cleared buyer" list.  
  4. Collector X (as an anonymous wallet) browses the *entire* marketplace and "favorites" or "bids on" a piece from Gallery B.  
  5. *Only then* does Gallery B receive a notification: "An anonymous, 'Tier 3' vetted buyer is interested in your piece." Gallery B can engage, but the *collector initiated contact*.

This model is the *only* way to protect the galleries' primary asset (their client list) while still allowing the platform's total pool of vetted, anonymous buyers to grow.

## **6.0 Core Application 4: "Collector Portal" (Anonymous Marketplace)**

This is the "Exchange," the anonymous, demand-side marketplace for "Stefan" (Collector).2

### **6.1 Overview & User Stories (Persona: Stefan, Collector)**

* **User Story:** "As Stefan, I need to browse and purchase high-value art anonymously using my self-custody wallet (BYOW)".2  
* **User Story:** "As Stefan, I need to trust that the asset I'm buying is real, insured, and legally mine".2

### **6.2 Feature: Anonymous Connection (BYOW \- Bring Your Own Wallet)**

* **FR-6.2.1:** Users **must** connect to the portal **only** with a self-custody web3 wallet (e.g., MetaMask, Ledger, Fireblocks).2  
* **FR-6.2.2:** There **shall** be no email, password, or other PII-based login. This is the **BYOW (Bring Your Own Wallet)** model.2

### **6.3 Feature: Dynamic Marketplace (Real-time ERC-3643 canTransfer check)**

This feature is the technical and UX manifestation of the entire "Double-Blind" thesis.

* **FR-6.3.1:** The "Buy" or "Bid" button for an asset **must** be **dynamic**.2  
* **FR-6.3.2:** The frontend **shall** make a *real-time, client-side read-call* to that specific asset's ERC-3643 Compliance.sol contract (defined in Table 2.2).2  
* **FR-6.3.3:** This call **shall** execute the canTransfer(from, to, value) function, passing in the user's connected walletAddress.2  
* **FR-6.3.4:** The button's state **must** be rendered based on the boolean response from this on-chain call:  
  * **If canTransfer returns TRUE:** The button is "Active."  
  * **If canTransfer returns FALSE:** The button is "Disabled," and a message **must** read, "Your wallet is not verified for this asset. Please contact your legal advisor to begin verification".2

This mechanism ensures programmatic, trustless compliance. The platform (and the frontend) *never* asks a central server "Is this user KYCd?". It asks the *public, on-chain contract* "Does this anonymous wallet *hold the required anonymous claims*?". This preserves Stefan's anonymity while enforcing the law.

### **6.4 Feature: "My Collection" Vault (Portfolio View)**

* **FR-6.4.1:** The portal **must** provide a "My Collection" portfolio view.2  
* **FR-6.4.2:** This view **shall** display the user's ERC-3643 (fractional) tokens, and **must** pull and display the associated *dynamic metadata* from the "Master" ERC-721 NFT (e.g., "Physical Location: Geneva Freeport," "Insurance: Active").2

### **6.5 Feature: Physical Asset & Custody Workflow**

* **FR-6.5.1:** The "My Collection" vault **must** feature a "Request Move" button for assets the user holds 100% of.2  
* **FR-6.5.2:** This button **shall** trigger an *off-chain workflow* (via the api-gateway and aegis-core) that securely communicates authenticated instructions to the physical custodian and logistics partners.2

## **7.0 System & Non-Functional Requirements (NFRs)**

### **7.1 Consolidated Microservice Architecture**

The platform **shall** be built as a containerized, microservice-based stack, orchestrated via docker-compose for development.2 This stack provides the necessary separation of concerns for the "Double-Blind" architecture.

Table 7.1: Microservice Architecture (Docker-Compose Stack) 2

| Service Name | Description | Key Technology / Purpose |
| :---- | :---- | :---- |
| aegis-core | The B2B Compliance Portal (Agentic Workflow Engine). | **Opus** |
| sushi-kitchen-frontend | Gallery/Artist Frontend (Supply-Side). | React / Next.js |
| collector-frontend | Anonymous Marketplace Frontend (Demand-Side). | React / Next.js |
| api-gateway | Main backend API to route traffic and handle business logic. | Node.js / Python |
| file-storage-service | Microservice to abstract file operations. | **Google File API** (GCS) |
| profiler-api | The RAG API for "The Profiler" tool. | Python / FastAPI (interfaces with Google AI) |
| qdrant\_db | Vector database for "The Profiler." | **Qdrant** |
| chain-listener-service | "Oracle" service that listens for on-chain events (e.g., SaleExecuted) to trigger off-chain workflows. | Ethers.js / Viem |
| chain-tx-service | Secure, server-side wallet (MPC/HSM) used by aegis-core to send "Attest" transactions. (Gas Relayer) |  |
| postgres\_db | Primary RDBMS for application state, gallery accounts, asset metadata. | PostgreSQL |

### **7.2 Wallet & Custody Policy (Hybrid Model)**

A one-size-fits-all wallet strategy will fail. The platform **must** support a hybrid model to balance security and usability across different user personas.2

* **Collectors ("Stefan"):** 100% **Self-Custody (BYOW)**. Users must connect with their own wallets (MetaMask, Ledger, Fireblocks, etc.). The platform **shall never** have access to collector keys.2  
* **Sellers ("Camilla/Ari"):** **Managed MPC Wallets**. To simplify onboarding and UX for less technical users, sellers will be provided with a secure, managed wallet using Multi-Party Computation (MPC). This provides a simple "email login" experience while preventing a single point of failure.2  
* **Treasury (OpCos/Foundation):** **Institutional-Grade Custody**. All platform treasury (fees, operational capital) **must** be held in institutional custody (e.g., BitGo, Coinbase Custody) secured by multi-signature governance policies.2

### **7.3 Blockchain & Security (NFRs)**

* **NFR-7.3.1 (Blockchain):** All smart contracts **must** be deployed on a high-throughput, low-fee, **EVM-compatible L2** (e.g., Base, Polygon, Arbitrum) to ensure transactions are fast and economical.2  
* **NFR-7.3.2 (Payment Rails):** All payments for assets **must** be conducted in highly-regulated, 1:1 backed **stablecoins (e.g., USDC, EURC)**. No volatile cryptocurrencies shall be used for primary payments.2  
* **NFR-7.3.3 (Security):** Full, independent, third-party **security audits** of all custom smart contracts (Vault, Compliance, Royalty Module, etc.) are **mandatory** before any mainnet deployment.2  
* **NFR-7.3.4 (Data Privacy):** The platform **must not** store any user PII (names, emails, documents) outside of the segregated, encrypted aegis-core (Opus) B2B portal. All other services **must** interact only with wallet addresses and anonymous on-chain claims.4

## **8.0 Hackathon Submission & Phased Rollout**

The long-term vision must be adapted into a pragmatic, high-impact plan for the "AI Genesis" hackathon. The demo's primary goal is to showcase the two core AI engines and their "double-blind" integration.

The winning demo flow must be an "AI-First" narrative:

1. **Start with "The Profiler" (AI \#1):** Show "Camilla" using the RAG tool (Google AI \+ Qdrant) to research a piece and find a *public* lead (a catalog).  
2. **Show the "Invite":** Show "Camilla" using the "Sushi Kitchen" CRM to "Invite" this new lead, triggering the aegis-core workflow.  
3. **Show "Aegis Core" (AI \#2):** Switch personas to "Laura." Show the "Opus" agentic workflow: the AI Agent Node (LWM) auto-fills the "dossier" from uploaded docs, and the Human-in-the-Loop reviews it.  
4. **Show the "Attest" (The Bridge):** Show "Laura" clicking "Attest." Immediately switch to an L2 block explorer (e.g., Basescan) to show the addClaim transaction being confirmed in real-time.  
5. **Show the "Purchase" (The Payoff):** Switch personas to "Stefan" (the newly-vetted collector). Go to the "Collector Portal" and show the "Buy" button for a high-value asset, which is *initially disabled*. Upon the addClaim transaction confirming, the button **must dynamically enable** in real-time as the canTransfer call (Sec 6.3) now returns TRUE.

This flow demonstrates the *entire* thesis: AI-driven lead-gen, AI-driven compliance, and anonymous, programmatically-enforced, on-chain transactions.

*Table 8.1: Hackathon Phased Rollout Plan*

| Phase | Title | Focus | Key Components to Build (for "AI Genesis") | Demo Goal |
| :---- | :---- | :---- | :---- | :---- |
| **Phase 1 (Demo)** | **The AI Core** | Demonstrate the two core AI engines. | **"Aegis Core" (Opus):** Build the agentic workflow (LWM \+ HITL) UI/backend. (Sec 3.3) **"The Profiler" (RAG):** Build the RAG pipeline (Google AI \+ Qdrant) and search UI. (Sec 4.4) | Show the AI tools functioning *independently*. |
| **Phase 2 (MVP)** | **The "Double-Blind" Transaction** | Connect the AI engines to the blockchain and marketplace. | **chain-tx-service:** To send the attestation. **IdentityRegistry.sol:** To store the attestation. **Collector-Frontend (Mockup):** A *single* page with a "Buy" button that makes a *real* on-chain canTransfer call. (Sec 6.3) | Demonstrate the *full, end-to-end loop*: RAG \-\> Invite \-\> Agentic Vetting \-\> On-Chain Attestation \-\> Anonymous, Compliant Purchase. |
| **Phase 3 (Vision)** | **The Full Ecosystem** | (Pitch Deck Only) Show the full, legally-wrapped, multi-product vision. | ERC-721/3643 Vault, PaymentSplitter, Gnosis Safe, full Sushi Kitchen & Collector Portal, Custodian APIs, Legal Wrappers (LI/CH/DE). | Explain how the AI-driven MVP scales into the $65B market-disrupting, RWA-migrating "Great Migration" engine. (Sec 1.3) |

#### **Works cited**

1. RWA Tokenization Market Research  
2. PRD: Aegis Core \- Global Art Marketplace  
3. The Double-Blind Framework: A New Architecture for Art, Anonymity, and Compliance  
4. PRD: The 'Double-Blind' Global Art Marketplace  
5. System Architecture Blueprint: A Vertically Integrated Platform for the Global Art Market V1.5  
6. System Architecture Blueprint: A Vertically Integrated Platform for the Global Art Market \-V1  
7. Strategic Analysis of the Dual-Domicile Swiss-Liechtenstein Corporate Architecture  
8. The Double-Blind Framework: A New Architecture for...