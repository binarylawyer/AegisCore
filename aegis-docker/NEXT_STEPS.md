# Next Steps for Opus Integration

## Immediate Actions Required

### 1. ✅ Replace Opus Swarm with Gemini 2.5 Pro

**Action**: Configure External Service Nodes in Opus workflows

**Steps**:
1. Open your Opus workflow: "Collector Vetting"
2. For each "Agentic Review" node:
   - Remove "Opus Swarm" provider
   - Add External Service Node before it
   - Configure to call AIML API (see `OPUS_NODE_CONFIGURATIONS.md`)
3. Test each node individually

**Files to Reference**:
- `docs/OPUS_NODE_CONFIGURATIONS.md` - Detailed node configurations
- `docs/OPUS_GEMINI_CONFIG.md` - General Gemini 2.5 Pro setup

---

### 2. ✅ Set Up Blockchain Attestation API

**Action**: Complete the blockchain API integration

**Current Status**: 
- ✅ FastAPI service created (`services/blockchain-api/`)
- ✅ Docker service added to compose file
- ⚠️ **TODO**: Implement actual ERC-3643 smart contract integration

**Steps**:
1. **Update `services/blockchain-api/main.py`**:
   - Replace mock implementation with real Web3/ERC-3643 calls
   - Add contract ABI
   - Implement transaction signing
   - Add transaction confirmation waiting

2. **Add Environment Variables** to `.env`:
   ```bash
   BLOCKCHAIN_API_KEY=your-secure-api-key
   BLOCKCHAIN_RPC_URL=https://your-ethereum-node-url
   ERC3643_CONTRACT_ADDRESS=0x...
   ISSUER_WALLET_ADDRESS=0x...
   ISSUER_WALLET_PRIVATE_KEY=your-private-key  # Use secrets manager in production
   ```

3. **Test Blockchain API**:
   ```bash
   curl -X POST http://localhost:8081/api/attestations/mint \
     -H "X-API-Key: your-api-key" \
     -H "Content-Type: application/json" \
     -d '{
       "lead_id": "LEAD-2024-105",
       "artwork_id": "ART-10234",
       "gallery_id": "GALLERY-2024-AB12",
       "approval_status": "approve",
       "approval_reason": "Compliance verified",
       "wallet_address": "0x...",
       "claims": {"JURISDICTION_USA": true, "IS_ACCREDITED": true}
     }'
   ```

---

### 3. ✅ Configure Opus Environment Variables

**Action**: Add API keys and endpoints to Opus

**Steps**:
1. Log into Opus
2. Go to Settings → Environment Variables
3. Add:
   ```
   AIMLAPI_KEY=your-aimlapi-key
   QDRANT_API_KEY=your-qdrant-api-key
   QDRANT_API_URL=http://your-server:8080
   BLOCKCHAIN_API_KEY=your-blockchain-api-key
   BLOCKCHAIN_API_URL=http://your-server:8081
   ```

---

### 4. ✅ Update Opus Workflow Nodes

**Action**: Configure each node as specified

**Priority Order**:
1. **"Check Collector Compliance"** - Add Gemini 2.5 Pro External Service Node
2. **"Review - Approve or Reject"** - Replace Opus Swarm with Gemini 2.5 Pro
3. **"Mint Blockchain Attestation"** - Add External Service Node calling your API
4. **"Review - Mint Blockchain Attestation"** - Add Gemini 2.5 Pro verification

**Reference**: See `docs/OPUS_NODE_CONFIGURATIONS.md` for exact configurations

---

### 5. ✅ Build and Deploy Services

**Action**: Start all services

**Steps**:
```bash
cd aegis-docker

# Build new services
docker compose build qdrant-api blockchain-api

# Start all services
docker compose up -d

# Verify services are running
docker compose ps

# Check logs
docker logs aegis-art-qdrant-api
docker logs aegis-art-blockchain-api
```

---

### 6. ✅ Test End-to-End Workflow

**Action**: Run complete workflow test

**Test Data**:
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

**Test Steps**:
1. Trigger workflow in Opus with test data
2. Verify Gemini 2.5 Pro compliance check runs
3. Verify compliance notes are generated
4. Verify approval/rejection decision is made
5. Verify blockchain attestation is minted
6. Verify transaction hash is returned
7. Verify workflow completes successfully

---

## Architecture Decisions Needed

### 1. Blockchain Network Choice
- [ ] Ethereum Mainnet
- [ ] Ethereum Sepolia (testnet)
- [ ] Etherlink (Tezos-based)
- [ ] Other: _______________

### 2. Smart Contract Deployment
- [ ] Deploy ERC-3643 contract
- [ ] Use existing contract address
- [ ] Contract address: _______________

### 3. Wallet Management
- [ ] Use hardware wallet
- [ ] Use software wallet (secure key management)
- [ ] Use managed service (e.g., Infura, Alchemy)

### 4. API Security
- [ ] Use API keys (current)
- [ ] Add OAuth2/JWT
- [ ] Use mutual TLS
- [ ] IP whitelisting

---

## Production Readiness Checklist

### Security
- [ ] API keys stored securely (secrets manager)
- [ ] Private keys never in code or env files
- [ ] HTTPS enabled (reverse proxy with Let's Encrypt)
- [ ] CORS restricted to Opus domains only
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

### Monitoring
- [ ] Logging configured (structured logs)
- [ ] Error tracking (Sentry, etc.)
- [ ] Metrics collection (Prometheus, etc.)
- [ ] Health check endpoints working
- [ ] Alerting configured

### Performance
- [ ] Load testing completed
- [ ] Database indexes optimized
- [ ] Caching where appropriate
- [ ] Connection pooling configured
- [ ] Timeout values set appropriately

### Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Workflow documentation updated
- [ ] Runbooks for common issues
- [ ] Architecture diagrams updated

---

## Integration Points Summary

```
Opus Workflows
    ↓
External Service Nodes
    ↓
┌─────────────────────────────────────┐
│  Your Docker Stack                 │
│  ┌───────────────────────────────┐ │
│  │ FastAPI Gateway (Port 8080)   │ │
│  │ - Qdrant Search               │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Blockchain API (Port 8081)    │ │
│  │ - Mint Attestations           │ │
│  │ - ERC-3643 Integration        │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ LiteLLM (Port 4000)           │ │
│  │ - Gemini 2.5 Pro Proxy        │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Qdrant (Port 7333)            │ │
│  │ - Vector Database             │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Questions to Answer

1. **ERC-3643 Contract**: Do you have a deployed contract address?
2. **Blockchain Network**: Which network are you using?
3. **Wallet Management**: How will you manage the issuer wallet?
4. **Testing**: Do you want testnet setup first?
5. **Deployment**: Where will you host the docker stack? (AWS, GCP, Azure, self-hosted)

---

## Support Resources

- **Opus Documentation**: https://docs.appliedai.com
- **AIML API Docs**: https://docs.aimlapi.com/api-references/text-models-llm/google/gemini-2.5-pro
- **ERC-3643 Standard**: https://eips.ethereum.org/EIPS/eip-3643
- **Qdrant Docs**: https://qdrant.tech/documentation/
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

## Timeline Estimate

- **Week 1**: Complete blockchain API integration, test Gemini 2.5 Pro nodes
- **Week 2**: End-to-end testing, security hardening
- **Week 3**: Production deployment, monitoring setup
- **Week 4**: Documentation, training, go-live

---

## Need Help?

If you need assistance with:
- Smart contract integration
- Web3/ERC-3643 implementation
- Opus workflow configuration
- Testing strategies

Let me know which area you'd like to tackle first!

