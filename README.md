# AegisCore
Aegis Core is the institutional operating system designed to solve the global art market’s critical paradox: the conflict between high-net-worth collector privacy and stringent financial regulation. By pioneering a proprietary "Double-Blind" compliance architecture, Aegis Core separates identity verification from market participation.
# 🛡️ Aegis Core

**The Operating System for Compliant Art Tokenization.**
*Unfreezing the $65B art market through AI-driven discovery and "Double-Blind" legal compliance.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Opus](https://img.shields.io/badge/Powered%20by-Opus-blue.svg)](https://applied-ai.com)
[![Google Cloud AI](https://img.shields.io/badge/Google%20Cloud-AI-red.svg)](https://cloud.google.com/vertex-ai)
[![Built on Polygon](https://img.shields.io/badge/Built%20on-Polygon-purple.svg)](https://polygon.technology/)

-----

## 📖 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Workflow Demo](#-workflow-demo)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)

-----

## 🔻 The Problem

The fine art market is worth over **$65 billion**, yet it remains one of the most illiquid and opaque asset classes in the world.

1.  **Liquidity Trap:** Selling high-value art takes months. Capital is frozen.
2.  **Regulatory Minefield:** Tokenization offers a solution, but strict Securities laws (Reg D), KYC/AML requirements, and privacy concerns for High-Net-Worth (HNW) individuals block adoption.
3.  **Artist Friction:** Artists and galleries often wait 30-90 days for payment settlement after a sale.
4.  **Privacy Paradox:** HNW investors want access to deals but refuse to hand over sensitive ID documents to tech startups.

-----

## 💡 The Solution: Aegis Core

Aegis Core is a dual-engine platform that acts as the bridge between **Institutional Law** and **Web3 Liquidity**.

We introduce a **"Double-Blind" Compliance Model**:

* **Law Firms** use our platform to verify their own clients using **Opus** workflows.
* **The Platform** receives only an anonymized, on-chain attestation (a Soulbound Token).
* **The Result:** Investors remain anonymous to the market but fully verified to the regulators.

Simultaneously, we use **Google AI** to power a visual discovery engine that matches artworks to anonymous investor interest clusters.

-----

## 🏗 System Architecture

Aegis Core is built on a **Two-Sided Architecture**:

### Side A: The Profiler (Discovery Engine)

* **Input:** Ingests auction catalogs, museum press releases, and gallery manifests.
* **Processing:** Uses **Google Cloud Vision API** and **Document AI** to extract visual features and semantic context.
* **Storage:** Stores vectors in **Qdrant** to build anonymous "Interest Clusters" (e.g., "Profile \#145: Minimalist Sculpture Buyer").
* **Output:** A search tool for galleries to find high-probability buyers without seeing PII.

### Side B: The Exchange (Compliance & Settlement)

* **Orchestration:** **Opus by AppliedAI** manages the "Human-in-the-Loop" workflow for law firms.
* **Identity:** **Persona** handles the raw KYC data (sandboxed); **Opus** coordinates the lawyer's approval.
* **On-Chain:**
    * **Polygon (L2):** Low-cost, high-speed EVM settlement.
    * **ERC-3643 (T-REX):** Permissioned token standard for the art assets (`$BLUE`).
    * **Soulbound Tokens (SBTs):** Non-transferable tokens acting as on-chain "Passports" for verified wallets.
    * **USDC:** Regulated stablecoin for settlement.

-----

## 🌟 Key Features

### 1\. The "White-Glove" Opus Portal

A dedicated dashboard for Law Firms and Accounting Firms. They input client data, the **Opus Agent** pre-screens it against a Compliance Matrix, and the lawyer clicks "Approve." No crypto knowledge required.

### 2\. Double-Blind Verification

Sensitive data stays with the lawyer. The platform only receives a binary "Verified" signal via API, triggering the minting of a Soulbound Token to the user's wallet.

### 3\. Atomic Settlement & Payment Splitting

When a "Buying Co-op" executes a purchase:

* Investors receive fractional tokens.
* **Artist receives 50% of funds instantly.**
* Gallery receives 50% of funds instantly.
* No intermediaries, no delays.

### 4\. AI Visual Search

Galleries can upload a photo of a new piece, and our **Vertex AI** integration finds the "Interest Clusters" most likely to buy it based on historical public data.

-----

## 💻 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Orchestration** | **Opus by AppliedAI** | Managing the complex "Lawyer-in-the-Loop" workflows and API triggers. |
| **AI / ML** | **Google Vertex AI** | Vector embeddings for art matching. |
| **Computer Vision** | **Google Vision API** | Analyzing artwork style, medium, and visual signatures. |
| **Vector DB** | **Qdrant** | Storing and searching collector interest profiles. |
| **Data Store** | **Google File API** | Secure, scalable storage for frontend assets and legal docs. |
| **Blockchain** | **Polygon (L2)** | EVM-compatible Layer 2 for fast, cheap settlement. |
| **Smart Contracts** | **Solidity (ERC-3643)** | Permissioned token standard for RWA compliance. |
| **Identity** | **Persona API** | Off-chain identity verification. |
| **Frontend** | **React / Docker** | The "Sushi Kitchen" stack for scalable UI deployment. |

-----

## 🔄 Workflow Demo

### The "Lawyer" Flow (Compliance)

1.  Lawyer logs into Aegis Core via **Opus**.
2.  Uploads Client Trust documents.
3.  **Opus Agent** reads docs via **Document AI**, verifies dates and jurisdiction ("USA").
4.  Opus flags user as "Accredited."
5.  Lawyer clicks "Attest."
6.  **System** mints `Verified-USA` Soulbound Token to client wallet `0x...`.

### The "Gallery" Flow (Sales)

1.  Gallery uploads image of "Blue Nude" sculpture.
2.  **Vision API** tags image; **Qdrant** finds "Cluster \#88" (Verified HNW Investors).
3.  Gallery creates an Offering.
4.  Investors (holding SBTs) fund the **Buying Co-op**.
5.  Sale executes on **Polygon**; Artist gets paid in **USDC**.

-----

## 🚀 Getting Started

### Prerequisites

* Docker & Docker Compose
* Node.js v18+
* Google Cloud Service Account (Vertex AI enabled)
* Opus API Key
* Polygon Mumbai RPC Endpoint (for development)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/yourusername/aegis-core.git](https://github.com/yourusername/aegis-core.git)
    cd aegis-core
    ```

2.  **Configure Environment Variables**
    Create a `.env` file in the root directory:

    ```env
    OPUS_API_KEY=your_opus_key
    GOOGLE_APPLICATION_CREDENTIALS=path/to/gcp_creds.json
    QDRANT_URL=http://localhost:6333
    POLYGON_RPC_URL=[https://rpc-mumbai.polygon.technology/](https://rpc-mumbai.polygon.technology/) # Or your custom RPC
    ```

3.  **Launch the Stack (Sushi Kitchen)**

    ```bash
    docker-compose up --build
    ```

4.  **Deploy Smart Contracts**

    ```bash
    cd contracts
    npx hardhat run scripts/deploy_identity_registry.js --network mumbai
    ```

-----

## 🗺️ Roadmap

* **Phase 1 (Current):** Core Opus workflow, Qdrant integration, and Polygon settlement.
* **Phase 2:** Integration with **Circle Arc** (once Mainnet) for native institutional compliance.
* **Phase 3:** Expansion of the "Profiler" to include luxury watches and classic cars.
* **Phase 4:** Mobile app for investors to view their art portfolio and vote in Co-op governance.

-----



Trusted law firms utilize our Opus-powered compliance engine to verify clients off-chain, issuing anonymous, non-falsifiable ERC-3643 attestations on-chain. This allows verified collectors to trade fractionalized, high-value art assets—legally wrapped in Delaware Series LLCs or Luxembourg Compartments—with absolute anonymity, while providing sellers with cryptographic proof of eligibility.

Using a proprietary "Double-Blind" architecture, we separate identity verification from market participation. Law firms use our Opus compliance engine to verify clients off-chain, issuing anonymous ERC-3643 attestations on-chain. This allows collectors to trade fractionalized, physical art assets (held in Delaware Series LLCs) with total anonymity, while providing galleries absolute proof of compliance.

Featuring AI-driven discovery via Google Vertex AI and instant atomic settlements, Aegis Core transforms art into a liquid, trusted, and compliant global asset class.
Beyond compliance, Aegis Core unlocks liquidity through the "Profiler," a lead-generation tool powered by Google Vertex AI and Qdrant that discovers collectors from public data without exposing private users. With features like atomic settlement for instant payments and enforced secondary-market royalties, Aegis Core transforms art from an opaque collectible into a liquid, trusted, and legally compliant global asset class.