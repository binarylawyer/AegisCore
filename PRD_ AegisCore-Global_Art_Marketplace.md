## **Product Requirements Document: Aegis Core v1.0**

| Product | Aegis Core & The "Double-Blind" Art Marketplace |
| :---- | :---- |
| **Status** | Scoping (v1.0) |
| **Author** | Project Lead |
| **Stakeholders** | Legal & Compliance, Engineering (Backend, Frontend, Smart Contracts), Product |

---

### **1.0 Introduction & Vision**

#### **1.1. The Problem**

The global high-value art market operates on a fundamental paradox. Its two most valuable commodities are **privacy** and **provenance**. High-net-worth (HNW) collectors demand absolute anonymity, while new global AML/CFT regulations (from FinCEN, FATF, and the EU) demand absolute transparency to combat financial crime.

This conflict creates a market that is:

* **Opaque & High-Risk:** Lacking a single source of truth for compliance.  
* **Illiquid:** Beset by 30-90 day payment and settlement cycles.  
* **Fragmented:** Galleries cannot access new, vetted buyers without risking their private client lists.  
* **High-Friction:** Artists and galleries face chronic cash-flow delays.

#### **1.2. The Solution: "Double-Blind" Compliance**

This platform solves the paradox by separating *identity verification* from *market participation*. We will build a **"Double-Blind"** ecosystem, powered by the **Aegis Core** compliance engine.

This system creates a "trustless" marketplace where:

1. **Collectors are blind** to the platform and sellers; their identity is protected by their legal advisors.  
2. **Sellers are blind** to the collector's identity; they see only an on-chain, non-falsifiable *attestation* of their compliance status.  
3. **Galleries are blind** to each other's private client lists.  
4. **The Platform is blind** to the personal data of its users, insulating itself from liability and becoming a true, neutral market utility.

#### **1.3. Core Components**

The system is comprised of four (4) primary services:

1. **Aegis Core (B2B Compliance Engine):** The central RegTech SaaS, built on the **Opus** agentic automation platform. This is the B2B portal for law firms, banks, and accounting firms to manage compliance workflows and issue on-chain attestations.  
2. **"Sushi Kitchen" (Gallery/Artist Frontend):** The supply-side portal for "Camilla" and "Ari" to manage inventory, tokenize assets, and manage sales.  
3. **Collector Portal (Demand-Side Frontend):** The anonymous, "double-blind" marketplace for "Stefan" to browse and acquire assets.  
4. **"The Profiler" (Internal R\&D Tool):** An internal lead-generation tool for galleries, built on **Google AI** and **Qdrant**, to find new collectors from public data.

---

### **2.0 User Personas & Stories**

| Persona | Role | Needs & Goals (User Stories) |
| :---- | :---- | :---- |
| **Laura (Legal Partner)** | Law Firm / Bank | **As Laura, I need** a secure, multi-tenant portal to manage AML/KYC for my HNW clients in this new asset class. **As Laura, I need** to perform my legal due diligence in an auditable, purpose-built workflow. **As Laura, I need** to attest to my client's status *without* revealing their PII to the platform. |
| **Stefan (Collector)** | HNW Investor (Buyer) | **As Stefan, I need** to browse and purchase high-value art anonymously using my self-custody wallet. **As Stefan, I need** to be able to co-invest with other global collectors without being exposed to their legal jurisdiction. **As Stefan, I need** to trust that the asset I'm buying is real, insured, and legally mine. |
| **Camilla (Gallery Director)** | Art Gallery (Seller) | **As Camilla, I need** to find new, qualified collectors without my current client list being "poached." **As Camilla, ID need** a simple tool to tokenize and list artworks that handles all the legal and technical complexity. **As Camilla, I need** to get paid *instantly* when a sale is made, not 90 days later. |
| **Ari (Artist)** | Creator (Seller) | **As Ari, I need** to be paid my share of a primary sale *at the same time* as the gallery. **As Ari, I need** to automatically and reliably receive royalties on *all* future secondary sales. |

---

### **3.0 High-Level System Architecture (Docker Compose Stack)**

The platform will be built as a containerized, microservice-based stack, orchestrated via docker-compose for development and Kubernetes for production.

**docker-compose.yml Service Definitions:**

1. aegis-core: The B2B compliance portal, running the **Opus** application.  
2. sushi-kitchen-frontend: The "Sushi Kitchen" gallery/artist frontend (e.g., React/Next.js).  
3. collector-frontend: The anonymous marketplace frontend (e.g., React/Next.js).  
4. api-gateway: The main backend API (e.g., Node.js/Python) to handle business logic and route traffic.  
5. file-storage-service: A dedicated microservice to manage authentication and abstraction for the **Google File API** (Google Cloud Storage).  
6. profiler-api: The RAG API for the "Profiler" tool, interfacing with google-ai and qdrant\_db.  
7. qdrant\_db: The **Qdrant** vector database service.  
8. chain-listener-service: An "Oracle" service that listens for on-chain events (e.g., SaleExecuted) to trigger off-chain workflows (e.g., call custodian API).  
9. chain-tx-service: A secure, server-side wallet (using MPC or HSM) used by aegis-core to send "Attest" transactions to the blockchain.  
10. postgres\_db: Primary database for application state, user accounts (for galleries), and asset metadata.

---

### **4.0 Detailed Requirements: Aegis Core (B2B Compliance Engine)**

This is the central nervous system of the platform, built using the **Opus** agentic automation platform to ensure auditable, compliance-first workflows for regulated industries.

#### **4.1. User & Tenant Management (Opus Portal)**

* **FR-4.1.1:** Must be a multi-tenant application. A firm (e.g., "Firm A") can *only* see its own partners, clients, and workflows.  
* **FR-4.1.2:** Must provide granular, role-based access controls (e.g., Partner, Associate, Paralegal).  
* **FR-4.1.3:** The portal UI shall be a visual canvas displaying active workflows, tasks, and audit logs.

#### **4.2. Vetting Workflow (The Core "Opus" Flow)**

This workflow is the primary "product" sold to law firms.

* **FR-4.2.1:** **Trigger (Data Node):** Workflow is triggered by a "NewCollectorInvite" API call from the sushi-kitchen-frontend or manually by the firm.  
* **FR-4.2.2:** **Client Portal (Data Node):** Must generate a secure, branded, single-use portal for the end-client (Collector) to upload sensitive documents (e.g., Passport, Proof of Funds, Proof of Address).  
* **FR-4.2.3:** **Automated Vetting (AI Agent Node):** The workflow shall use Opus's Large Work Model (LWM) to perform initial automated tasks.  
  * Perform OCR and data extraction from uploaded documents.  
  * Trigger External Service Node calls to third-party AML/KYC APIs (e.g., Chainalysis, World-Check) for sanctions screening.  
* **FR-4.2.4:** **Human-in-the-Loop (Review Node):** The workflow *must* pause and assign a task to a human reviewer (e.g., Paralegal). The UI must present a "dossier" with the AI's findings and the source documents.  
* **FR-4.2.5:** **Partner Approval (Review Node):** A final approval step *must* be assigned to a Partner-level user ("Laura") to make the final legal determination.  
* **FR-4.2.6:** This entire workflow must be fully auditable and transparent to the firm and regulators.

#### **4.3. The "Double-Blind" Bridge (The "Attest" Function)**

* **FR-4.3.1:** The "Attest" button in the Partner Approval node (FR-4.2.5) is the key integration point.  
* **FR-4.3.2:** When the partner clicks "Attest," an Opus workflow must be triggered that executes the following *server-side* actions via an **External Service Node**:  
  1. Call the chain-tx-service (defined in 3.0).  
  2. The chain-tx-service shall call the addClaim function on the global **ERC-3643 Identity Registry** smart contract.  
* **FR-4.3.3:** The payload for this function call shall be *anonymous* and contain *no PII*. It shall *only* contain:  
  * walletAddress: The client's public wallet address.  
  * claimTopic: e.g., JURISDICTION\_USA or ACCREDITED\_INVESTOR.  
  * claimValue: (e.g., a cryptographic hash or boolean value).  
* **FR-4.3.4:** The workflow must log the on-chain transaction hash for a complete, immutable audit trail.

---

### **5.0 Core Application 2: "Sushi Kitchen" (Gallery/Artist Frontend)**

This is the B2B/B2C frontend for "Camilla" and "Ari" to manage their inventory and sales.

#### **5.1. Inventory & File Management**

* **FR-5.1.1:** Must provide a simple, beautiful interface for galleries to upload and manage their art inventory (images, descriptions, provenance).  
* **FR-5.1.2:** **Google File API Integration:** The frontend must use the specified **"Google File API"** for all file operations (upload, retrieve).  
* **FR-5.1.3:** The file-storage-service microservice will handle authentication and abstraction, storing files in a secure Google Cloud Storage bucket. The on-chain tokens will only store the *hash* or a secure URI of these files, never the files themselves.

#### **5.2. Tokenization & Governance**

* **FR-5.2.1:** **"Tokenize Asset" Workflow:** A simple wizard that guides the gallery through the asset tokenization process.  
  1. Select art from inventory.  
  2. Set price (e.g., $1,000,000) and fractional share count (e.g., 1,000,000 tokens).  
  3. Select jurisdiction (triggers US or EU legal wrapper).  
  4. This workflow triggers the *backend* creation of the **Delaware Series LLC / Lux SV** and the full **ERC-721/ERC-3643 "Vault"** minting process.  
* **FR-5.2.2:** **"Form Co-op" (Multi-Sig):** A UI to deploy a **Gnosis Safe** for a specific artwork, allowing the gallery to add other signers (e.t., the artist, a lawyer) to approve sales.  
* **FR-5.2.3:** **"Instant Pay" Setup:** A settings page to define the PaymentSplitter wallet addresses and percentages for the artist and gallery.  
* **FR-5.2.4:** **Enforced Royalties:** A field to set the **EIP-2981** secondary market royalty percentage.

#### **5.3. The "Double-Blind" Invite & CRM**

* **FR-5.3.1:** A simple "Invite Collector" CRM.  
* **FR-5.3.2:** When a gallery invites a collector, it triggers an API call to aegis-core to start the "Vetting Workflow" (FR-4.2.1).  
* **FR-5.3.3:** The gallery's dashboard shall *only* show the anonymized status of their invited collectors (e.g., "Pending," "Vetted \- Tier 3"). It must *never* show collectors invited by other galleries.

---

### **6.0 Core Application 3: "Collector Portal" (Frontend)**

This is the "Exchange," the anonymous marketplace for "Stefan" (Collectors).

* **FR-6.1.1:** Users must connect *only* with a self-custody web3 wallet (e.g., MetaMask, Coinbase Wallet) (BYOW \- Bring Your Own Wallet). No email/password.  
* **FR-6.1.2:** Users can anonymously browse all tokenized assets.  
* **FR-6.1.3:** **Dynamic "Bid/Buy" Button:** The "Buy" button for an asset must be *dynamic*.  
  * The frontend shall make a read-call to the asset's ERC-3643 Compliance contract (e.g., canTransfer) in real-time.  
  * If the user's wallet holds the required claims, the button is "Active."  
  * If not, the button is "Disabled," and a message reads, "Your wallet is not verified for this asset. Please contact your legal advisor to begin verification."  
* **FR-6.1.4:** **"My Collection" Vault:** A portfolio view showing the user's ERC-3643 tokens and the dynamic metadata from the associated ERC-721 "Master NFT" (e.g., "Physical Location: Geneva Freeport," "Insurance: Active").  
* **FR-6.1.5:** **Custody Workflow:** A "Request Move" button that triggers an off-chain workflow (via aegis-core) for the physical custodian and logistics partners.

---

### **7.0 Core Service 1: "The Profiler" (RAG Lead-Gen Engine)**

This is an internal-facing tool for verified galleries ("Camilla") to research potential new collectors.

* **FR-7.1.1:** **Data Ingestion:** A backend pipeline must ingest and process public documents (art auction catalogs, articles, press releases).  
* **FR-7.1.2:** **Embedding Pipeline:** Use **Google AI (e.g., Vertex AI)** to perform OCR and generate multimodal (text and image) vector embeddings from these documents.  
* **FR-7.1.3:** **Vector Database:** Store all embeddings in the **qdrant\_db** vector database service.  
* **FR-7.1.4:** **Search Interface:** A simple UI within the "Sushi Kitchen" Portal where Camilla can upload an image or text description.  
* **FR-7.1.5:** **RAG Workflow:** The query is embedded and used to search the qdrant\_db. The system returns a list of the *original source documents* (e.g., "Sotheby's Catalog, May 2024, Page 45") that are most semantically similar. It *does not* return names, only the source material for the gallery's own research.

---

### **8.0 Core Legal & Governance Architecture (Off-Chain)**

The platform's operation is contingent on this legal "scaffolding."

| Entity | Jurisdiction | Role |
| :---- | :---- | :---- |
| **Swiss Foundation** | Switzerland | **Global IP Holder.** Owns the "Aegis Core" brand, code, and smart contract designs. Licenses IP to OpCos. |
| **Marshall Islands DAO** | Marshall Islands | **Global Artist Governance.** A community body that advises the Foundation on artist/creator-rights issues. |
| **"Opus USA" (OpCo)** | Delaware C-Corp | **US Operating Company & Securities Fortress.** Licenses platform IP. Manages all US compliance (Reg D) and serves as the legal manager for the Delaware Series LLCs. |
| **"Opus Global" (OpCo)** | Swiss AG | **EU/RoW Operating Company.** Licenses platform IP. Manages all non-US compliance (MiCA) and serves as the legal manager for the Luxembourg SVs. |
| **Delaware DAO LLC** | Delaware, USA | **US Compliance Council.** A body of US law/accounting firms that advises "Opus USA" on its US compliance standards. |
| **Delaware Series LLCs** | Delaware, USA | **US Asset SPVs.** A new "Series" is created for *each piece of art* to hold legal title and isolate liability. |
| **Luxembourg SVs** | Luxembourg | **RoW Asset SPVs.** A segregated "compartment" is created for each non-US artwork. |

---

### **9.0 Core On-Chain Architecture (Smart Contracts)**

This is the technical "plumbing" that enforces the legal architecture.

#### **9.1. Core Standard: ERC-3643 (T-REX)**

The entire platform is built on **ERC-3643**, an open-source standard for permissioned, RWA-backed tokens. It embeds compliance logic directly at the token level.

#### **9.2. Asset Pattern: The "NFT Vault"**

* **SR-9.2.1:** **ERC-721 ("Master NFT"):** A dynamic NFT representing 100% membership interest in the off-chain **Delaware Series LLC** or **Luxembourg SV**.  
  * Its metadata shall be dynamic, updateable by trusted oracles (e.g., custodians) to reflect Physical\_Location, Insurance\_Status, and Legal\_Docs\_Hash.  
* **SR-9.2.2:** **Vault.sol:** A smart contract that locks the ERC-721 (Master NFT).  
* **SR-9.2.3:** **ERC-3643 (Fractional Tokens):** Minted by the Vault.sol contract, these tokens (e.g., $PICASSO) represent the fractional economic interests in the Vault's asset.

#### **9.3. Compliance & Governance Contracts**

* **SR-9.3.1:** **IdentityRegistry.sol:** A *single, global* registry contract (part of the ERC-3643 standard) that stores anonymous "claims" for all wallets (e.g., JURISDICTION\_USA, IS\_ACCREDITED).  
* **SR-9.3.2:** **TrustedIssuersRegistry.sol:** A contract listing the wallet addresses of the chain-tx-service (controlled by "Opus USA" and "Opus Global") as the *only* entities authorized to add or revoke claims.  
* **SR-9.3.3:** **Compliance.sol:** A *per-asset* contract (part of ERC-3643) that defines the *rules* for that asset.  
  * *Example (US Asset):* Compliance.sol for $BUIDL requires claims: JURISDICTION\_USA AND IS\_ACCREDITED.  
  * *Example (EU Asset):* Compliance.sol for $PICASSO requires claims: JURISDICTION\_EU OR JURISDICTION\_CHE OR JURISDICTION\_HKG.  
* **SR-9.3.4:** **GnosisSafe.sol:** The standard, audited Gnosis Safe contract shall be used for all "Co-op" and DAO wallets.

#### **9.4. Financial Contracts**

* **SR-9.4.1:** **PaymentSplitter.sol:** Must use OpenZeppelin's PaymentSplitter contract.  
  * It must be configured to split **ERC-20 tokens** (USDC, EURC), not just native ETH.  
  * This contract will be called by the Sale.sol contract to atomically distribute funds upon a successful sale.  
* **SR-9.4.2:** **RoyaltyComplianceModule.sol:** This is a *custom module* for the ERC-3643 Compliance contract.  
  * It must enforce **EIP-2981** royalties on *secondary transfers*.  
  * The canTransfer check must fail unless the royaltyInfo is satisfied, effectively making royalties non-optional.

---

### **10.0 Non-Functional Requirements (NFRs)**

* **NFR-10.1. Security:** Full, independent, third-party security audits of all smart contracts (e.g., by OpenZeppelin, Hacken) *before* mainnet deployment.  
* **NFR-10.2. Wallet Custody (Hybrid Model):**  
  * **Collectors (HNW):** 100% **Self-Custody (BYOW)**. Must support MetaMask, Ledger, Fireblocks, etc..  
  * **Sellers (Galleries/Artists):** **Managed MPC Wallets** (e.g., via Fireblocks, BitGo) to provide a simple, secure "email login" experience.  
  * **Treasury (OpCos/Foundation):** **Institutional-Grade Custody** (e.g., BitGo, Coinbase Custody) with multi-sig governance policies.  
* **NFR-10.3. Physical Custody:** The platform must integrate with and hold contracts with multiple high-security, insured fine art freeports (e.g., **Geneva, Delaware**).  
* **NFR-10.4. Blockchain:** All contracts must be deployed on a high-throughput, low-fee, EVM-compatible L2 (e.g., **Base, Polygon, Arbitrum**).  
* **NFR-10.5. Payment Rails:** All transactions must be conducted in highly-regulated, 1:1 backed stablecoins (e.g., **USDC, EURC**). No volatile cryptocurrencies for payments.

---

### **11.0 Phased Rollout (Roadmap)**

1. **Phase 1 (MVP): The "Compliance Engine"**  
   * **Focus:** Build Aegis Core (Opus portal) & On-chain Identity Registry.  
   * **Legal:** Establish the full LI/CH/DE corporate structure.  
   * **Goal:** Onboard the first 10 law firms as Trusted Issuers.  
2. **Phase 2: The "Marketplace"**  
   * **Focus:** Build Sushi Kitchen & Collector Portal. Build the **"NFT Vault"** (ERC-721/ERC-3643) tokenization workflow.  
   * **Integrations:** Integrate **one (1) US** (Delaware Freeport) and **one (1) EU** (Geneva Freeport) custodian.  
   * **Goal:** Execute the first 10 compliant, fractional sales.  
3. **Phase 3: The "Ecosystem"**  
   * **Focus:** Build the **PaymentSplitter** and **EIP-2981 Royalty Module**. Launch the "Instant Pay" feature.  
   * **Goal:** Capture the secondary market and solve the artist payment-lag problem.  
4. **Phase 4: "Scale & Intelligence"**  
   * **Focus:** Build and launch the **"Profiler" (RAG) tool**. Launch the **DAOs** (Marshall Islands & Delaware) for governance.  
   * **Goal:** Scale the ecosystem, provide unique data-driven value, and begin decentralizing governance.