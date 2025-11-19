# Hackathon Demo Guide - Aegis Core

**Time Remaining: ~2 hours**

This guide shows how to demonstrate the complete Aegis Core workflow for the hackathon.

## Quick Demo Flow

```
1. Collector Vetting (Gemini 2.5 Pro) ✅
2. KYC/AML Check (3rd Party API) ✅
3. Compliance Review (Gemini 2.5 Pro) ✅
4. Approval Decision (Human-in-the-Loop) ✅
5. Create Legal Entity (Series LLC/Co-op) ✅
6. Mint ERC-3643 Attestation ✅
7. Create Escrow Wallet ✅
8. Custodian Transfer ✅
9. Fund Release ✅
```

## Demo Setup (5 minutes)

### 1. Start All Services

```bash
cd aegis-docker
docker compose up -d
```

### 2. Verify Services

```bash
# Check all services are running
docker compose ps

# Test endpoints
curl http://localhost:8081/health  # Blockchain API
curl http://localhost:8082/health  # Legal Entity API
curl http://localhost:8080/health  # Qdrant API
```

### 3. Set Opus Environment Variables

In Opus → Settings → Environment Variables:

```
AIMLAPI_KEY=your-aimlapi-key
BLOCKCHAIN_API_KEY=demo-key-123
LEGAL_ENTITY_API_KEY=demo-key-123
QDRANT_API_KEY=demo-key-123
BLOCKCHAIN_API_URL=http://your-server:8081
LEGAL_ENTITY_API_URL=http://your-server:8082
QDRANT_API_URL=http://your-server:8080
```

## Demo Script

### Step 1: Show Collector Vetting (30 seconds)

**In Opus Workflow**:
1. Click "Workflow Input"
2. Show collector details:
   ```json
   {
     "lead_id": "LEAD-2024-105",
     "artwork_id": "ART-10234",
     "gallery_id": "GALLERY-2024-AB12",
     "collector_details": {
       "name": "Jordan Lee",
       "email": "jordan.smith@samplemail.com",
       "phone": "+1-415-867-5309",
       "address": "123 Main St, San Francisco, CA 94102",
       "identification_number": "SSN-123-45-6789"
     }
   }
   ```

3. Run workflow → Show Gemini 2.5 Pro compliance check

### Step 2: Show KYC/AML Integration (30 seconds)

**External Service Node Configuration**:
- **URL**: `http://your-server:8082/api/kyc-aml/verify`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "lead_id": "{{ $workflow.lead_id }}",
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "collector_data": {
      "name": "{{ $workflow.collector_details.name }}",
      "address": "{{ $workflow.collector_details.address }}",
      "country": "USA"
    },
    "kyc_provider": "persona"
  }
  ```

**Show Response**:
```json
{
  "kyc_status": "passed",
  "aml_status": "passed",
  "risk_score": 0.2,
  "issues": []
}
```

### Step 3: Show Legal Entity Creation (1 minute)

**External Service Node Configuration**:
- **URL**: `http://your-server:8082/api/legal-entities/create`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "entity_type": "series_llc",
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "artwork_id": "{{ $workflow.artwork_id }}",
    "gallery_id": "{{ $workflow.gallery_id }}",
    "lead_id": "{{ $workflow.lead_id }}",
    "jurisdiction": "Delaware",
    "collector_data": {
      "name": "{{ $workflow.collector_details.name }}",
      "address": "{{ $workflow.collector_details.address }}",
      "email": "{{ $workflow.collector_details.email }}"
    },
    "artwork_data": {
      "title": "Untitled #123",
      "artist": "Artist Name",
      "value": "500000"
    }
  }
  ```

**Show Response**:
```json
{
  "entity_id": "SERIES-2024-001-0234",
  "status": "pending_review",
  "review_task_id": "REVIEW-SERIES-2024-001-...",
  "document_url": "/api/documents/SERIES-2024-001-0234/preview"
}
```

**Key Point**: Form is pre-populated, ready for HITL review in Opus.

### Step 4: Show Co-op/Partnership Support (30 seconds)

**Same endpoint, different entity_type**:
```json
{
  "entity_type": "coop",  // or "partnership"
  ...
}
```

**Show**: Different document templates generated automatically.

### Step 5: Show Blockchain Attestation (30 seconds)

**External Service Node**:
- **URL**: `http://your-server:8081/api/attestations/mint`
- **Body**:
  ```json
  {
    "wallet_address": "{{ $workflow.collector_wallet }}",
    "series_llc_id": "{{ $workflow.series_llc_id }}",
    "claims": {
      "JURISDICTION_USA": true,
      "IS_ACCREDITED": true,
      "COMPLIANCE_VERIFIED": true
    }
  }
  ```

**Show**: Transaction hash returned.

### Step 6: Show Escrow & Fund Release (30 seconds)

**Create Escrow** → **Deposit Funds** → **Custodian Transfer** → **Release Funds**

Show the complete flow with transaction hashes.

## Key Talking Points

### 1. **Double-Blind Compliance**
- "Collectors remain anonymous to galleries"
- "Compliance verified by law firms via Opus"
- "Only attestations on-chain, no PII"

### 2. **Legal Entity Automation**
- "Series LLC forms pre-populated from workflow data"
- "Human-in-the-Loop review ensures accuracy"
- "Supports Series LLCs, Co-ops, and Partnerships"

### 3. **KYC/AML Integration**
- "Integrates with Persona, Onfido, Blockpass"
- "Automated pass/fail determination"
- "Risk scoring for compliance decisions"

### 4. **Multi-Chain Support**
- "Ethereum and Polygon for attestations"
- "Arbitrum for liquidity"
- "EVM-compatible, easy to deploy"

### 5. **Custodian Integration**
- "Escrow wallet holds funds until artwork verified"
- "Multi-signature release (2 of 3)"
- "Custodian confirms receipt before fund release"

## Demo Checklist

- [ ] All services running
- [ ] Opus workflow configured
- [ ] Test data prepared
- [ ] API endpoints tested
- [ ] Screenshots/video ready
- [ ] Key talking points memorized

## Quick Fixes if Something Breaks

### Service Not Starting
```bash
docker compose logs [service-name]
docker compose restart [service-name]
```

### API Not Responding
```bash
# Check if port is accessible
curl http://localhost:8081/health
curl http://localhost:8082/health

# Check logs
docker logs aegis-art-blockchain-api
docker logs aegis-art-legal-entity-api
```

### Opus Connection Issues
- Verify API URLs are correct
- Check CORS settings
- Verify API keys are set

## Presentation Flow (5 minutes)

1. **Problem** (30s): Art market compliance paradox
2. **Solution** (1m): Double-blind compliance + legal automation
3. **Demo** (2m): Show Opus workflow with all steps
4. **Technology** (1m): Gemini 2.5 Pro, ERC-3643, Multi-chain
5. **Impact** (30s): Instant payments, global compliance, privacy

## Backup Plan

If Opus has issues:
- Show API endpoints directly via Postman/curl
- Show docker-compose services running
- Show code structure and architecture
- Explain workflow conceptually

## Success Criteria

✅ Workflow runs end-to-end
✅ All API endpoints respond
✅ Legal entity creation works
✅ KYC/AML integration shown
✅ Blockchain attestation demonstrated
✅ Multi-chain support mentioned

Good luck with your hackathon submission! 🚀

