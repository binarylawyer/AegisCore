# Aegis Core - Hackathon Submission

**Complete Double-Blind Art Market Compliance Platform**

## 🚀 Quick Start (2 minutes)

```bash
# 1. Start all services
docker compose up -d

# 2. Verify services
curl http://localhost:8081/health  # Blockchain API
curl http://localhost:8082/health  # Legal Entity API
curl http://localhost:8080/health  # Qdrant API

# 3. Configure Opus (see OPUS_COMPLETE_WORKFLOW.md)
```

## 🎯 What We Built

### Core Features
- ✅ **Double-Blind Compliance**: Collectors anonymous, compliance verified
- ✅ **Gemini 2.5 Pro Integration**: AI-powered compliance analysis
- ✅ **Legal Entity Automation**: Series LLC, Co-op, Partnership support
- ✅ **KYC/AML Integration**: Persona, Onfido, Blockpass APIs
- ✅ **Multi-Chain Support**: Ethereum, Polygon, Arbitrum
- ✅ **Escrow & Custody**: Multi-sig wallets, conditional fund release

### Technology Stack
- **AI**: Google Gemini 2.5 Pro (via AIML API)
- **Blockchain**: ERC-3643 attestations, Multi-sig escrow
- **Workflow**: Opus (Applied AI) for law firms
- **Infrastructure**: Docker Compose, FastAPI, Qdrant, PostgreSQL

## 📋 Complete Workflow

1. **Collector Vetting** → Gemini 2.5 Pro analyzes collector data
2. **KYC/AML Check** → 3rd party API (Persona/Onfido/Blockpass)
3. **Compliance Review** → Gemini 2.5 Pro compliance analysis
4. **Human Approval** → Law firm partner reviews in Opus
5. **Legal Entity Creation** → Pre-populated Series LLC/Co-op forms
6. **Entity Filing** → HITL completion → File with jurisdiction
7. **Blockchain Attestation** → Mint ERC-3643 token
8. **Escrow Setup** → Create multi-sig wallet
9. **Fund Deposit** → Collector deposits to escrow
10. **Custodian Transfer** → Artwork shipped to custodian
11. **Custodian Confirmation** → HITL form confirms receipt
12. **Fund Release** → Multi-sig releases funds to gallery

## 🔧 Services

| Service | Port | Purpose |
|---------|------|---------|
| Blockchain API | 8081 | ERC-3643, Escrow, Custody |
| Legal Entity API | 8082 | Series LLC, Co-op, KYC/AML |
| Qdrant API | 8080 | Vector search, Lead matching |
| LiteLLM | 4000 | Gemini 2.5 Pro proxy |
| n8n | 5678 | Advanced workflows |
| Qdrant | 7333 | Vector database |

## 📚 Documentation

- **`HACKATHON_DEMO_GUIDE.md`** - Step-by-step demo script
- **`OPUS_COMPLETE_WORKFLOW.md`** - All Opus node configurations
- **`BLOCKCHAIN_WORKFLOW.md`** - Architecture details
- **`OPUS_INTEGRATION.md`** - Integration guide

## 🎤 Demo Talking Points

### Problem
Art market faces compliance paradox: privacy vs. transparency

### Solution
- **Double-Blind System**: Identity verification separate from market participation
- **Legal Automation**: Pre-populated forms, HITL review, automated filing
- **Multi-Chain**: Ethereum/Polygon for attestations, Arbitrum for liquidity
- **Instant Settlement**: Escrow → Custody → Release in minutes

### Impact
- ✅ Galleries get paid instantly (not 90 days)
- ✅ Collectors remain anonymous
- ✅ Law firms automate compliance
- ✅ Global regulatory compliance

## 🏗️ Architecture

```
Law Firms → Opus Workflows
    ↓
External Service Nodes
    ↓
Aegis Core Stack:
  ├─ Legal Entity API (Series LLC, Co-op, KYC/AML)
  ├─ Blockchain API (ERC-3643, Escrow, Custody)
  ├─ Qdrant API (Vector Search)
  └─ LiteLLM (Gemini 2.5 Pro)
```

## ✅ Hackathon Checklist

- [x] Gemini 2.5 Pro integration
- [x] Opus workflow configuration
- [x] Legal entity automation
- [x] KYC/AML integration
- [x] Blockchain attestations
- [x] Escrow & custody flow
- [x] Multi-chain support
- [x] Demo documentation

## 🚀 Ready to Demo!

All services are configured and ready. Follow `HACKATHON_DEMO_GUIDE.md` for the demo script.

**Good luck! 🎉**

