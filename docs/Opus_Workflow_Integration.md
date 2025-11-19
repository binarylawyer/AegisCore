# Opus ↔ Aegis Core Integration Plan

This note documents how the Opus "Collector Vetting" workflow connects to the Aegis Core API services (Blockchain, Legal Entity, Qdrant) that run in `aegis-docker`.

## 1. Backend Checklist

1. **Server Setup**
   - `ssh sushi@<server>` and `cd /path/to/AegisCore/aegis-docker`.
   - `docker compose ps` → verify all services are running:
     - `redis`, `qdrant`, `postgrest`
     - `blockchain-api` (port 8081)
     - `legal-entity-api` (port 8082)
     - `qdrant-api` (port 8080)
     - `litellm` (port 4000)
     - `n8n` (port 5678)
     - `anythingllm` (port 3001)
2. **Health probes**
   - Qdrant: `curl http://localhost:7333/healthz` (external) or `http://qdrant:6333/healthz` (internal)
   - Blockchain API: `curl http://localhost:8081/health`
   - Legal Entity API: `curl http://localhost:8082/health`
   - Qdrant API: `curl http://localhost:8080/health`
   - LiteLLM: `curl http://localhost:4000/health`
   - n8n: `curl http://localhost:5678/healthz`
   - PostgREST: `curl http://localhost:3000/collector_leads?limit=1`
3. **Workflows & data**
   - Create/import n8n workflows in `aegis-docker/workflows`.
   - Create Qdrant collection: `curl -X PUT http://localhost:7333/collections/aegis_leads -H "Content-Type: application/json" -d '{"vectors":{"size":768,"distance":"Cosine"}}'`.
4. **Environment Variables**
   - Set API keys in `.env` file:
     - `AIMLAPI_KEY` (for Gemini 2.5 Pro)
     - `BLOCKCHAIN_API_KEY`, `LEGAL_ENTITY_API_KEY`, `QDRANT_API_KEY`
     - `BLOCKCHAIN_RPC_URL`, `ERC3643_CONTRACT_ADDRESS`
5. **Repo sync**
   - After any docker-compose change, commit and push so the repo matches the deployed stack.

## 2. API Services & Endpoints

Three FastAPI services act as secure bridges between Opus and backend services:

### 2.1 Blockchain API (`blockchain-api`, Port 8081)

| Method | Route | Purpose |
| ------ | ----- | ------- |
| `POST` | `/api/attestations/mint` | Mint ERC-3643 attestation token. Returns `transaction_reference`, `attestation_id`. |
| `GET` | `/api/attestations/{attestation_id}` | Get attestation details by ID. |
| `GET` | `/api/attestations/wallet/{wallet_address}` | Get all attestations for a wallet. |
| `POST` | `/api/wallets/create-escrow` | Create multi-sig escrow wallet. Returns `escrow_wallet_address`. |
| `POST` | `/api/wallets/deposit-funds` | Collector deposits funds to escrow. Returns `deposit_tx`. |
| `POST` | `/api/wallets/release-funds` | Release funds from escrow to gallery. Returns `release_tx`. |
| `GET` | `/api/wallets/escrow-status/{escrow_wallet}` | Check escrow status and balance. |
| `POST` | `/api/custody/initiate-transfer` | Initiate artwork transfer to custodian. Returns `transfer_id`, `tracking_number`. |
| `POST` | `/api/custody/confirm-receipt` | Custodian confirms receipt (HITL). Returns `confirmation_tx`, `release_authorized`. |
| `GET` | `/api/custody/transfer/{transfer_id}` | Get custody transfer status. |

**Base URL**: `http://your-server:8081`  
**Authentication**: `X-API-Key` header

### 2.2 Legal Entity API (`legal-entity-api`, Port 8082)

| Method | Route | Purpose |
| ------ | ----- | ------- |
| `POST` | `/api/legal-entities/create` | Create legal entity (Series LLC/Co-op/Partnership). Pre-populates forms. Returns `entity_id`, `review_task_id`. |
| `POST` | `/api/legal-entities/{entity_id}/complete` | Complete legal entity filing after HITL review. Returns `filing_reference`. |
| `POST` | `/api/kyc-aml/verify` | Verify KYC/AML via 3rd party (Persona/Onfido/Blockpass). Returns `kyc_status`, `aml_status`, `risk_score`. |
| `GET` | `/api/kyc-aml/status/{verification_id}` | Get KYC/AML verification status. |
| `POST` | `/api/documents/pre-populate` | Pre-populate forms from uploaded spreadsheet/PDF. |

**Base URL**: `http://your-server:8082`  
**Authentication**: `X-API-Key` header

### 2.3 Qdrant API (`qdrant-api`, Port 8080)

| Method | Route | Purpose |
| ------ | ----- | ------- |
| `POST` | `/collections/{collection_name}/search` | Vector search for lead matching. Returns similar leads. |
| `GET` | `/collections` | List all Qdrant collections. |
| `GET` | `/collections/{collection_name}/info` | Get collection information. |

**Base URL**: `http://your-server:8080`  
**Authentication**: `X-API-Key` header

All routes require API key authentication via `X-API-Key` header. Services communicate internally via Docker network (`http://qdrant:6333`, etc.).

## 3. Opus Workflow Mapping

Complete workflow with all nodes:

| Opus Node | Action | API Endpoint |
| --------- | ------ | ------------ |
| **Workflow Input** | Receives `{lead_id, artwork_id, gallery_id, collector_details, collector_wallet}` from Sushi Kitchen or n8n webhook. | N/A |
| **[External Service]** → **KYC/AML Verification** | Calls 3rd party KYC/AML provider (Persona/Onfido/Blockpass). | `POST /api/kyc-aml/verify` (Legal Entity API) |
| **[External Service]** → **Gemini 2.5 Pro Compliance Check** | AI-powered compliance analysis. | `POST https://api.aimlapi.com/v1/chat/completions` |
| **Check Collector Compliance** | Uses LLM output to determine compliance status. | Internal logic |
| **Store Collector Lead Data** | Store lead in database. Can call PostgREST or Supabase directly. | `POST http://postgrest:3000/collector_leads` |
| **Prepare Approval Package** | Combine compliance results, KYC status, and lead data. | Internal logic |
| **[External Service]** → **Gemini 2.5 Pro Review** | AI-assisted review for human reviewer. | `POST https://api.aimlapi.com/v1/chat/completions` |
| **Review – Approve or Reject** | Human-in-the-Loop review node. Replaces "Opus Swarm" with Gemini 2.5 Pro. | HITL Node |
| **Approve or Reject Collector Lead** | Decision node based on review. | Internal logic |
| **[External Service]** → **Create Legal Entity** | Create Series LLC/Co-op/Partnership. Pre-populates forms. | `POST /api/legal-entities/create` (Legal Entity API) |
| **[HITL]** → **Complete Legal Entity Filing** | Lawyer/Paralegal completes pre-populated form. | `POST /api/legal-entities/{id}/complete` (Legal Entity API) |
| **[External Service]** → **Mint ERC-3643 Attestation** | Mint blockchain attestation token. | `POST /api/attestations/mint` (Blockchain API) |
| **[External Service]** → **Create Escrow Wallet** | Deploy multi-sig escrow wallet. | `POST /api/wallets/create-escrow` (Blockchain API) |
| **[External Service]** → **Collector Funds Wallet** | Collector deposits funds (or direct wallet interaction). | `POST /api/wallets/deposit-funds` (Blockchain API) |
| **[External Service]** → **Initiate Custodian Transfer** | Record artwork transfer to custodian. | `POST /api/custody/initiate-transfer` (Blockchain API) |
| **[HITL]** → **Custodian Confirms Receipt** | Custodian fills form confirming receipt and condition. | `POST /api/custody/confirm-receipt` (Blockchain API) |
| **[External Service]** → **Release Funds** | Multi-sig release funds to gallery. | `POST /api/wallets/release-funds` (Blockchain API) |
| **Review – Mint Blockchain Attestation** | Verify attestation transaction. | HITL Node |
| **Workflow Output** | Final status and transaction references. | N/A |

**Key Changes from Original**:
- ✅ Added KYC/AML verification step (3rd party API)
- ✅ Replaced "Opus Swarm" with Gemini 2.5 Pro External Service Nodes
- ✅ Added Series LLC/Co-op creation workflow
- ✅ Added escrow wallet and fund management
- ✅ Added custodian transfer and confirmation
- ✅ Added conditional fund release

## 4. Complete Execution Flow

### Phase 1: Compliance & Approval
1. **Submit from Sushi Kitchen** → Webhook to Opus Workflow Input with collector data.
2. **KYC/AML Verification** → External Service Node calls Legal Entity API → 3rd party provider (Persona/Onfido/Blockpass).
3. **Compliance Check** → External Service Node calls Gemini 2.5 Pro via AIML API for compliance analysis.
4. **Store Lead Data** → Store in Postgres/Supabase via PostgREST.
5. **Prepare Approval Package** → Combine KYC results, compliance notes, and lead data.
6. **Human Review** → Human-in-the-Loop node reviews package (assisted by Gemini 2.5 Pro).
7. **Approve/Reject Decision** → If rejected, workflow ends. If approved, continue.

### Phase 2: Legal Entity & Attestation
8. **Create Legal Entity** → External Service Node calls Legal Entity API → Pre-populated Series LLC/Co-op form created.
9. **Complete Legal Entity Filing** → Human-in-the-Loop completes form → File with jurisdiction.
10. **Mint ERC-3643 Attestation** → External Service Node calls Blockchain API → Mint attestation token on-chain.

### Phase 3: Escrow & Custody
11. **Create Escrow Wallet** → External Service Node calls Blockchain API → Deploy multi-sig wallet.
12. **Collector Funds Wallet** → Collector deposits funds (via wallet or API helper).
13. **Initiate Custodian Transfer** → External Service Node calls Blockchain API → Record transfer intent.
14. **Custodian Confirms Receipt** → Human-in-the-Loop form → Custodian confirms artwork received and condition.
15. **Release Funds** → External Service Node calls Blockchain API → Multi-sig releases funds to gallery.

### Phase 4: Completion
16. **Review Attestation** → Verify blockchain transaction.
17. **Workflow Output** → Final status with all transaction references.

### Rejection Branch
- If rejected at any step: Update lead status in database, notify gallery, end workflow.

### Downstream Effects
- **n8n workflows** watch Postgres/Supabase for status updates → notify galleries/collectors.
- **Collector Portal** polls attestation service or listens to blockchain events.
- **Gallery Dashboard** updates with approval status and fund release confirmation.

## 5. API Service Architecture

```
Opus Workflows
    ↓ (External Service Nodes)
┌─────────────────────────────────────────┐
│  Aegis Core API Services                │
│  ┌───────────────────────────────────┐ │
│  │ Blockchain API (8081)              │ │
│  │ - ERC-3643 Attestations            │ │
│  │ - Escrow Wallets                   │ │
│  │ - Custody Transfers                │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ Legal Entity API (8082)           │ │
│  │ - Series LLC/Co-op Creation        │ │
│  │ - KYC/AML Integration              │ │
│  │ - Document Pre-population         │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ Qdrant API (8080)                 │ │
│  │ - Vector Search                   │ │
│  │ - Lead Matching                   │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
    ↓
Backend Services:
- Qdrant (Vector DB)
- PostgreSQL/Supabase
- LiteLLM (Gemini 2.5 Pro Proxy)
- n8n (Advanced Workflows)
```

## 6. Environment Variables

**In Opus** (Settings → Environment Variables):
```
AIMLAPI_KEY=your-aimlapi-key
BLOCKCHAIN_API_KEY=your-blockchain-api-key
LEGAL_ENTITY_API_KEY=your-legal-entity-api-key
QDRANT_API_KEY=your-qdrant-api-key

BLOCKCHAIN_API_URL=http://your-server:8081
LEGAL_ENTITY_API_URL=http://your-server:8082
QDRANT_API_URL=http://your-server:8080
```

**In `.env` file** (aegis-docker):
```
# API Keys
BLOCKCHAIN_API_KEY=your-secure-key
LEGAL_ENTITY_API_KEY=your-secure-key
QDRANT_API_KEY=your-secure-key

# Blockchain
BLOCKCHAIN_RPC_URL=https://your-ethereum-node
ERC3643_CONTRACT_ADDRESS=0x...
ISSUER_WALLET_ADDRESS=0x...

# KYC Providers (optional)
PERSONA_API_KEY=your-persona-key
ONFIDO_API_KEY=your-onfido-key
BLOCKPASS_API_KEY=your-blockpass-key
```

## 7. Key Integration Points

### Gemini 2.5 Pro Integration
- **Compliance Check**: `https://api.aimlapi.com/v1/chat/completions`
- **Model**: `google/gemini-2.5-pro`
- **Max Tokens**: `15000` (required for reasoning models)
- **Temperature**: `0.2-0.3` for compliance tasks

### KYC/AML Providers
- **Persona**: `https://api.persona.com/inquiries`
- **Onfido**: `https://api.onfido.com/v3/checks`
- **Blockpass**: `https://api.blockpass.org/v1/kyc/`

### Blockchain Networks
- **Ethereum**: Mainnet/Sepolia for attestations
- **Polygon**: Mainnet/Mumbai for attestations
- **Arbitrum**: For liquidity/fractionalization

## 8. Documentation References

- **Complete Opus Workflow**: `aegis-docker/docs/OPUS_COMPLETE_WORKFLOW.md`
- **Blockchain Workflow**: `aegis-docker/docs/BLOCKCHAIN_WORKFLOW.md`
- **Node Configurations**: `aegis-docker/docs/OPUS_NODE_CONFIGURATIONS.md`
- **Hackathon Demo**: `aegis-docker/docs/HACKATHON_DEMO_GUIDE.md`
- **Integration Guide**: `aegis-docker/docs/OPUS_INTEGRATION.md`

---

**Last Updated**: Hackathon submission - Complete workflow with Series LLC, Escrow, Custody, and Fund Release
