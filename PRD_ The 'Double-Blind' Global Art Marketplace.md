## **Product Requirements Document: The "Double-Blind" Global Art Marketplace (v1.0)**

| Feature | The "Double-Blind" Global Art Marketplace |
| :---- | :---- |
| **Status** | Scoping (v1.0) |
| **Author** | Project Lead |
| **Stakeholders** | Legal & Compliance, Engineering (Backend, Frontend, Smart Contracts), Product |

---

### **1.0 Introduction & Vision**

#### **1.1. The Problem**

The high-value global art market operates on a fundamental paradox:

1. **Buyers** (HNW collectors) demand absolute privacy and anonymity.  
2. **Regulators** (FinCEN, FINMA, etc.) demand absolute transparency to combat money laundering (AML) and terrorist financing (CFT).  
3. **Sellers** (Galleries & Artists) require access to new buyers, protection of their client lists (their primary asset), and fast, reliable payment.

This conflict creates a market that is opaque, illiquid, fragmented, and crippled by slow (30-90 day) payment cycles.

#### **1.2. The Solution: "Double-Blind" Compliance**

This platform solves the paradox by separating *identity verification* from *market participation*. We will build a "double-blind" ecosystem where compliance is abstracted to trusted fiduciaries (law firms, banks) and enforced anonymously on-chain.

* **Collectors are blind** to the platform and sellers; their identity is known only to their legal counsel.  
* **Sellers are blind** to the collector's identity; they see only a non-falsifiable, on-chain attestation of the collector's verified status.  
* **Galleries are blind** to each other's client lists.  
* **The Platform is blind** to its users' PII, insulating itself from liability and becoming a neutral market utility.

#### **1.3. Core Components**

The system is comprised of two (2) primary services and two (2) secondary services:

1. **Primary (B2B): "Opus" Compliance Engine:** A B2B SaaS portal for law firms, accounting firms, and banks to manage compliance workflows and issue on-chain attestations.  
2. **Primary (B2C/B2B): The "Exchange":** The marketplace for tokenizing, buying, and selling art assets. This has two distinct frontends:  
   * **Gallery/Artist Portal ("Sushi Kitchen" Frontend):** The supply-side inventory management and sales tool.  
   * **Collector Portal:** The demand-side "double-blind" marketplace.  
3. **Secondary (Internal): The "Profiler":** A lead-generation tool for galleries, built on Google AI and Qdrant.  
4. **Secondary (Internal): The "Custodian" Network:** A network of integrated, high-security physical custodians (e.g., Geneva and Delaware Freeports).

---

### **2.0 User Personas & Stories**

| Persona | Role | Needs & Goals (User Stories) |
| :---- | :---- | :---- |
| **Laura (Legal Partner)** | Law Firm / Bank | **As Laura, I need** a secure, multi-tenant portal to manage AML/KYC for my HNW clients in this new asset class. **As Laura, I need** to perform my legal due diligence in an auditable, purpose-built workflow. **As Laura, I need** to attest to my client's status *without* revealing their PII to the platform. |
| **Stefan (Collector)** | HNW Investor (Buyer) | **As Stefan, I need** to browse and purchase high-value art anonymously (BYOW \- Bring Your Own Wallet). **As Stefan, I need** to be able to co-invest with other global collectors without being exposed to their legal jurisdiction. **As Stefan, I need** to trust that the asset I'm buying is real, insured, and legally mine. |
| **Camilla (Gallery Director)** | Art Gallery (Seller) | **As Camilla, I need** to find new, qualified collectors without my current client list being "poached." **As Camilla, I need** a simple tool to tokenize and list artworks that handles all the legal and technical complexity. **As Camilla, I need** to get paid *instantly* when a sale is made, not 90 days later. |
| **Ari (Artist)** | Creator (Seller) | **As Ari, I need** to be paid my share of a primary sale *at the same time* as the gallery. **As Ari, I need** to automatically and reliably receive royalties on *all* future secondary sales. |

---

### **3.0 High-Level Legal & Corporate Architecture**

The platform is not one company but a global system of segregated entities. This is non-negotiable for insulating liability and managing regulatory compliance.

| Entity | Jurisdiction | Role |
| :---- | :---- | :---- |
| **Swiss Foundation** | Switzerland | **Global IP Holder.** Owns the brand, code, and smart contract designs. Licenses IP to OpCos. |
| **Marshall Islands DAO** | Marshall Islands | **Global Artist Governance.** A community body that advises the Foundation on creator/artist-rights issues. |
| **"Opus USA" (OpCo)** | Delaware C-Corp | **US Operating Company & Securities Fortress.** Licenses platform IP. Manages all US compliance, operates the Opus workflow, and serves as the legal manager for the Delaware Series LLCs. |
| **"Opus Global" (OpCo)** | Swiss AG | **EU/RoW Operating Company.** Licenses platform IP. Manages all non-US compliance and serves as the legal manager for the Luxembourg SVs. |
| **Delaware DAO LLC** | Delaware, USA | **US Compliance Council.** A body of US law/accounting firms that advises "Opus USA" on its US compliance standards. |
| **Delaware Series LLCs** | Delaware, USA | **US Asset SPVs.** A new "Series" is created for *each piece of art* to hold legal title and isolate liability. |
| **Luxembourg SVs** | Luxembourg | **RoW Asset SPVs.** A segregated "compartment" is created for each non-US artwork. |

---

### **4.0 Core Application 1: "Opus" Compliance Engine (B2B Portal)**

This is the B2B SaaS portal for "Laura" (Law Firms, Banks). It will be built using the **Opus** agentic automation platform.

#### **4.1. User & Tenant Management**

* **FR-4.1.1:** Must be a multi-tenant application. A firm (e.g., "Firm A") can *only* see its own partners, clients, and workflows.  
* **FR-4.1.2:** Must provide granular, role-based access controls (e.g., Partner, Associate, Paralegal).

#### **4.2. Vetting Workflow (The Core "Opus" Flow)**

* **FR-4.2.1:** Must present a visual, auditable workflow for each client.  
* **FR-4.2.2:** **Client Intake:** Workflow is triggered by an "Invite" from the Gallery Portal or manually by the firm.  
* **FR-4.2.3:** **Secure Client Portal:** Must generate a secure, branded portal for the end-client (Collector) to upload sensitive documents (Passport, Proof of Funds, etc.).  
* **FR-4.2.4:** **Automated Checks (AI Agent Node):** The workflow shall use AI agents to perform initial automated tasks:  
  * OCR and data extraction from uploaded documents.  
  * Automated API calls to third-party providers (e.g., sanctions lists, address verification).  
* **FR-4.2.5:** **Human-in-the-Loop (Review Node):** The workflow *must* pause and assign a task to a human reviewer (e.g., Paralegal) to review the AI's findings and the client's file.  
* **FR-4.2.6:** **Final Approval (Review Node):** A senior partner ("Laura") must perform a final review and make the legal determination.

#### **4.3. The "Double-Blind" Bridge (The "Attest" Function)**

* **FR-4.3.1:** The final approval step ("Attest") is the key integration point.  
* **FR-4.3.2:** When the partner clicks "Attest," an Opus workflow must be triggered that executes the following *server-side* actions via an **External Service Node**:  
  1. Securely authenticate with the platform's blockchain interaction service.  
  2. Call the addClaim function on the Identity Registry (ERC-3643) smart contract.  
  3. The payload for this function call shall be *anonymous* and contain *no PII*. It shall only contain:  
     * walletAddress: The client's public wallet address.  
     * claimTopic: e.g., JURISDICTION.  
     * claimValue: e.g., USA.  
* **FR-4.3.3:** The workflow must log the on-chain transaction hash for a complete, immutable audit trail.

---

### **5.0 Core Application 2: "Gallery/Artist Portal" (Frontend)**

This is the "Sushi Kitchen" frontend, a B2B application for "Camilla" and "Ari" (Galleries & Artists) to manage their inventory and sales.

#### **5.1. Inventory & File Management**

* **FR-5.1.1:** Must provide a simple interface for galleries to upload and manage their art inventory (images, descriptions, provenance).  
* **FR-5.1.2:** **Google File API Integration:** The frontend must use the specified "Google File API" (e.g., Google Cloud Storage API) for uploading and retrieving all high-resolution images, videos, and provenance documents (PDFs, etc.).  
* **FR-5.1.3:** The platform's datastore (e.g., Google Cloud Storage bucket) will hold the files. The on-chain tokens will only store the *hash* or a secure URI of these files, never the files themselves.

#### **5.2. Tokenization & Governance**

* **FR-5.2.1:** **"Tokenize Asset" Workflow:** A simple wizard that guides the gallery through the asset tokenization process.  
  1. Select art from inventory.  
  2. Set price (e.g., $1,000,000) and fractional share count (e.g., 1,000,000 tokens).  
  3. Select jurisdiction (triggers US or EU legal wrapper).  
  4. This workflow triggers the *backend* creation of the Delaware Series LLC / Lux SV and the full ERC-721/ERC-3643 "Vault" minting process.  
* **FR-5.2.2:** **"Form Co-op" (Multi-Sig):** A UI to deploy a Gnosis Safe for a specific artwork, allowing the gallery to add other signers (e.g., the artist, a lawyer) to approve sales.  
* **FR-5.2.3:** **"Instant Pay" Setup:** A settings page to define the PaymentSplitter wallet addresses and percentages for the artist and gallery.  
* **FR-5.2.4:** **Enforced Royalties:** A field to set the **EIP-2981** secondary market royalty percentage.

#### **5.3. The "Double-Blind" Invite**

* **FR-5.3.1:** A simple "Invite Collector" CRM.  
* **FR-5.3.2:** When a gallery invites a collector, it triggers an email from the Opus system (see FR-4.2.2).  
* **FR-5.3.3:** The gallery's dashboard shall *only* show the anonymized status of their invited collectors (e.g., "Pending," "Vetted \- Tier 3"). It must *never* show collectors invited by other galleries.

---

### **6.0 Core Application 3: "Collector Portal" (Frontend)**

This is the "Exchange," the anonymous marketplace for "Stefan" (Collectors).

* **FR-6.1.1:** Users must log in *only* with a self-custody web3 wallet (e.g., MetaMask, Coinbase Wallet). No email/password.  
* **FR-6.1.2:** Users can anonymously browse all tokenized assets.  
* **FR-6.1.3:** **Dynamic "Bid/Buy" Button:** The "Buy" button for an asset must be *dynamic*.  
  * The frontend shall query the asset's ERC-3643 Compliance contract in real-time.  
  * If the user's wallet holds the required claims (e.g., "JURISDICTION\_USA"), the button is "Active."  
  * If not, the button is "Disabled," and a message reads, "Your wallet is not verified for this asset. Please contact your legal advisor to begin verification."  
* **FR-6.1.4:** **"My Collection" Vault:** A portfolio view showing the user's ERC-3643 tokens and the dynamic metadata from the associated ERC-721 "Master NFT" (e.g., "Physical Location: Geneva Freeport," "Insurance: Active").  
* **FR-6.1.5:** **Custody Workflow:** A "Request Move" button that triggers an off-chain workflow (e.g., in Opus) for the custodian and logistics partners.

---

### **7.0 Core Service 1: "The Profiler" (Lead-Gen Engine)**

This is an internal-facing tool for verified galleries ("Camilla") to research potential new collectors.

* **FR-7.1.1:** **Data Ingestion:** A backend pipeline must ingest and process public documents (art auction catalogs, articles).  
* **FR-7.1.2:** **Embedding Pipeline:** Use **Google AI (e.g., Vertex AI)** to perform OCR and generate multimodal (text and image) vector embeddings from these documents.  
* **FR-7.1.3:** **Vector Database:** Store all embeddings in a **Qdrant** vector database.  
* **FR-7.1.4:** **Search Interface:** A simple UI within the Gallery Portal where Camilla can upload an image or text description.  
* **FR-7.1.5:** **RAG Workflow:** The query is embedded and used to search the Qdrant DB. The system returns a list of the *original source documents* (e.g., "Sotheby's Catalog, May 2024, Page 45") that are most semantically similar. It *does not* return names, only the source material for the gallery's own research.

---

### **8.0 On-Chain & Infrastructure Requirements**

This defines the technical "how."

#### **8.1. Smart Contract Suite (EVM-Compatible)**

* **SR-8.1.1:** All contracts must be written in Solidity, based on OpenZeppelin's audited libraries, and must pass a full third-party audit before deployment.  
* **SR-8.1.2:** **ERC-3643 (T-REX) Implementation:** The core permissioned token suite. This includes:  
  * Token (the fractional share, e.g., $PICASSO)  
  * IdentityRegistry (the global on-chain "allow-list")  
  * TrustedIssuersRegistry (lists the platform's OpCo wallets as signers)  
  * Compliance (the *per-asset* rulebook)  
* **SR-8.1.3:** **"NFT Vault" Pattern:**  
  * ERC721 ("Master NFT"): A dynamic NFT to hold metadata (custodian, insurance, legal docs hash).  
  * Vault.sol: A smart contract that holds the ERC-721 and mints the ERC-3643 tokens.  
* **SR-8.1.4:** **PaymentSplitter.sol:** An OpenZeppelin PaymentSplitter modified to handle ERC-20 (USDC) and be compatible with the ERC-3643 transfer restrictions.  
* **SR-8.1.5:** **GnosisSafe:** Use the standard, audited Gnosis Safe contracts for all "Co-op" wallets.  
* **SR-8.1.6:** **EIP2981RoyaltyModule.sol:** A custom Compliance module for ERC-3643 that enforces EIP-2981 royalty payments on secondary transfers by checking royaltyInfo().

#### **8.2. Wallet Infrastructure**

* **SR-8.2.1:** **Collectors (Demand-Side):** Must be **non-custodial (BYOW)**.  
* **SR-8.2.2:** **Galleries/Artists (Supply-Side):** Shall be provided with a **Managed MPC Wallet** (e.g., via Fireblocks, BitGo) for a simple, secure "email login" experience.  
* **SR-8.2.3:** **Platform Treasury:** Must be a qualified institutional custodian (e.g., BitGo, Coinbase Custody) with multi-sig policies.

#### **8.3. Docker Compose Stack & Services**

The system shall be deployed as a containerized, microservice-based stack for scalability and orchestration. The docker-compose.yml file will define and link the following services:

1. opus\_portal: The B2B compliance portal (Opus).  
2. gallery\_app: The "Sushi Kitchen" frontend (e.g., React/Next.js).  
3. collector\_app: The anonymous marketplace frontend (e.g., React/Next.js).  
4. platform\_api\_gateway: Main backend API (e.g., Node.js/Python) to handle business logic.  
5. google\_file\_service: Microservice to manage auth and access to the Google Cloud Storage bucket (as specified "Google File API").  
6. profiler\_api: The RAG API for the "Profiler" tool.  
7. qdrant\_db: The Qdrant vector database service.  
8. chain\_listener\_service: An "Oracle" service that listens for on-chain events (e.g., SaleExecuted) to trigger off-chain workflows (e.g., call custodian API).  
9. chain\_tx\_service: A secure, server-side wallet service (with a hot-wallet or key-management-system) used by the Opus workflow to send "Attest" transactions.

---

### **9.0 Governance & Non-Functional Requirements (NFRs)**

* **NFR-9.1. Governance (Legal):**  
  * **Swiss Foundation:** Governs the IP.  
  * **Marshall Islands DAO:** Global Artist/Creator community governance.  
  * **Delaware DAO LLC:** US-based law firm/gallery governance for US compliance policy.  
* **NFR-9.2. Governance (On-Chain):**  
  * The TrustedIssuersRegistry and Compliance contracts must be upgradeable, controlled by the respective OpCo's institutional multi-sig wallet (e.g., Gnosis Safe).  
* **NFR-9.3. Security:** Must pass a full, third-party security audit (platform and smart contracts).  
* **NFR-9.4. Compliance (Technical):** The platform *must not* store any user PII (names, emails, documents) outside of the segregated, encrypted Opus B2B portal. All other services must interact only with wallet addresses and anonymous claims.  
* **NFR-9.5. Blockchain:** Must be deployed on a low-fee, high-throughput, EVM-compatible L2 (e.g., Base, Polygon, Arbitrum).  
* **NFR-9.6. Payment:** Must exclusively use highly regulated, 1:1 backed stablecoins (e.g., **USDC, EURC**).

---

### **10.0 Phased Rollout (Roadmap)**

1. **Phase 1 (MVP): The "Compliance Engine"**  
   * Build **Opus Portal (B2B)**.  
   * Deploy **ERC-3643 Identity Registry** and core contracts.  
   * Onboard the first 10 law firms as Trusted Issuers.  
   * *Goal: Prove the "double-blind" attestation workflow.*  
2. **Phase 2: The "Marketplace"**  
   * Build **Gallery Portal** ("Sushi Kitchen") and **Collector Portal**.  
   * Build the full **ERC-721/3643 "Vault"** tokenization workflow.  
   * Integrate **one (1) US** (Delaware Freeport) and **one (1) EU** (Geneva Freeport) custodian.  
   * Deploy **PaymentSplitter** and **GnosisSafe** factory.  
   * *Goal: Execute the first 10 compliant, fractional, instantly-paid sales.*  
3. **Phase 3: The "Ecosystem"**  
   * Build and launch the **"Profiler" (RAG) tool**.  
   * Build the **EIP-2981 Royalty Module** for secondary sales.  
   * Launch the **DAOs** (Marshall Islands & Delaware) for governance.  
   * *Goal: Scale the ecosystem, capture the secondary market, and begin decentralizing governance.*