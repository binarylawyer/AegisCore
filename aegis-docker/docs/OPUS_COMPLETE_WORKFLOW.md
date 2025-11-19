# Complete Opus Workflow Configuration

**For Hackathon Demo - All Nodes Configured**

## Complete Node Sequence

```
1. Workflow Input
2. [External Service] → KYC/AML Verification
3. [External Service] → Gemini 2.5 Pro Compliance Check
4. Check Collector Compliance
5. Store Collector Lead Data
6. Prepare Approval Package
7. [External Service] → Gemini 2.5 Pro Review
8. Review - Approve or Reject (Human-in-the-Loop)
9. Approve or Reject Collector Lead
10. [External Service] → Create Legal Entity (Series LLC/Co-op)
11. [External Service] → Complete Legal Entity Filing (HITL)
12. [External Service] → Mint ERC-3643 Attestation
13. [External Service] → Create Escrow Wallet
14. [External Service] → Initiate Custodian Transfer
15. [External Service] → Custodian Confirms Receipt (HITL)
16. [External Service] → Release Funds
17. Review - Mint Blockchain Attestation
18. Workflow Output
```

---

## Node 2: KYC/AML Verification

**Add External Service Node** after Workflow Input

**Configuration**:
- **URL**: `{{ $env.LEGAL_ENTITY_API_URL }}/api/kyc-aml/verify`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.LEGAL_ENTITY_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "lead_id": "{{ $workflow.lead_id }}",
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "collector_data": {
      "name": "{{ $workflow.collector_details.name }}",
      "address": "{{ $workflow.collector_details.address }}",
      "email": "{{ $workflow.collector_details.email }}",
      "phone": "{{ $workflow.collector_details.phone }}",
      "identification_number": "{{ $workflow.collector_details.identification_number }}",
      "country": "USA"
    },
    "kyc_provider": "persona"
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  kyc_status: response.kyc_status,
  aml_status: response.aml_status,
  kyc_provider: response.provider,
  verification_id: response.verification_id,
  risk_score: response.risk_score,
  kyc_issues: response.issues || []
};
```

**Conditional Logic**:
- If `kyc_status === "failed"` OR `aml_status === "failed"` → Reject
- If `kyc_status === "flagged"` OR `aml_status === "flagged"` → Human Review
- If `kyc_status === "passed"` AND `aml_status === "passed"` → Continue

---

## Node 3: Gemini 2.5 Pro Compliance Check

**Add External Service Node** after KYC/AML

**Configuration**:
- **URL**: `https://api.aimlapi.com/v1/chat/completions`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer {{ $env.AIMLAPI_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "model": "google/gemini-2.5-pro",
    "messages": [
      {
        "role": "system",
        "content": "You are a compliance analyst. Analyze collector data and KYC results. Check identification format, address completeness, and regulatory compliance. Respond with JSON: {\"compliance_status\": \"compliant\"|\"non-compliant\", \"compliance_notes\": \"explanation\", \"issues\": [\"issue1\"], \"risk_score\": 0.0-1.0}"
      },
      {
        "role": "user",
        "content": "Collector: {{ $workflow.collector_details.name }}\nAddress: {{ $workflow.collector_details.address }}\nKYC Status: {{ $workflow.kyc_status }}\nAML Status: {{ $workflow.aml_status }}\nRisk Score: {{ $workflow.risk_score }}\n\nAnalyze compliance."
      }
    ],
    "max_tokens": 15000,
    "temperature": 0.2,
    "response_format": {"type": "json_object"}
  }
  ```

---

## Node 10: Create Legal Entity

**Add External Service Node** after Approval

**Configuration**:
- **URL**: `{{ $env.LEGAL_ENTITY_API_URL }}/api/legal-entities/create`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.LEGAL_ENTITY_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "entity_type": "{{ $workflow.entity_type || 'series_llc' }}",
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
      "title": "{{ $workflow.artwork_title }}",
      "artist": "{{ $workflow.artwork_artist }}",
      "value": "{{ $workflow.artwork_value }}"
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  entity_id: response.entity_id,
  entity_type: response.entity_type,
  entity_status: response.status,
  review_task_id: response.review_task_id,
  document_url: response.document_url
};
```

---

## Node 11: Complete Legal Entity Filing (HITL)

**Add Human-in-the-Loop Node** after Legal Entity Creation

**Configuration**:
- **Node Type**: Human-in-the-Loop / Review Node
- **Input**: Pre-populated form from Node 10
- **Action**: Lawyer/Paralegal/Banker fills remaining fields
- **Output**: Completed form data

**After HITL Completion, Add External Service Node**:
- **URL**: `{{ $env.LEGAL_ENTITY_API_URL }}/api/legal-entities/{{ $workflow.entity_id }}/complete`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "entity_id": "{{ $workflow.entity_id }}",
    "entity_type": "{{ $workflow.entity_type }}",
    "template_data": {{ $workflow.legal_entity_template }},
    "form_fields": {
      "reviewer_name": "{{ $workflow.reviewer_name }}",
      "additional_terms": "{{ $workflow.additional_terms }}",
      "signature_date": "{{ $now }}"
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  entity_id: response.entity_id,
  filing_reference: response.filing_reference,
  entity_status: response.status,
  final_document_url: response.document_url
};
```

---

## Supporting Multiple Entity Types

### Series LLC
```json
{
  "entity_type": "series_llc",
  ...
}
```

### Co-op
```json
{
  "entity_type": "coop",
  ...
}
```

### Partnership
```json
{
  "entity_type": "partnership",
  ...
}
```

The API automatically selects the correct document template.

---

## Pre-Population from Spreadsheet/PDF

**Add External Service Node** before Legal Entity Creation:

- **URL**: `{{ $env.LEGAL_ENTITY_API_URL }}/api/documents/pre-populate`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: Upload file (CSV, Excel, or PDF)

**Response**: Extracted data ready for legal entity creation

---

## Complete Workflow JSON Structure

```json
{
  "workflow_input": {
    "lead_id": "LEAD-2024-105",
    "artwork_id": "ART-10234",
    "gallery_id": "GALLERY-2024-AB12",
    "collector_wallet": "0x...",
    "collector_details": {
      "name": "Jordan Lee",
      "email": "jordan.smith@samplemail.com",
      "phone": "+1-415-867-5309",
      "address": "123 Main St, San Francisco, CA 94102",
      "identification_number": "SSN-123-45-6789"
    },
    "artwork_data": {
      "title": "Untitled #123",
      "artist": "Artist Name",
      "value": "500000"
    },
    "entity_type": "series_llc"
  },
  "workflow_output": {
    "series_llc_id": "SERIES-2024-001-0234",
    "filing_reference": "DE-2024-SERIES-2024-001-0234",
    "attestation_tx": "0x...",
    "escrow_wallet": "0x...",
    "fund_release_tx": "0x...",
    "status": "completed"
  }
}
```

---

## Environment Variables Summary

```bash
# Opus Environment Variables
AIMLAPI_KEY=your-aimlapi-key
BLOCKCHAIN_API_KEY=demo-key-123
LEGAL_ENTITY_API_KEY=demo-key-123
QDRANT_API_KEY=demo-key-123

BLOCKCHAIN_API_URL=http://your-server:8081
LEGAL_ENTITY_API_URL=http://your-server:8082
QDRANT_API_URL=http://your-server:8080

# Optional: KYC Provider Keys
PERSONA_API_KEY=your-persona-key
ONFIDO_API_KEY=your-onfido-key
BLOCKPASS_API_KEY=your-blockpass-key
```

---

## Quick Test Commands

```bash
# Test KYC/AML
curl -X POST http://localhost:8082/api/kyc-aml/verify \
  -H "X-API-Key: demo-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "lead_id": "LEAD-001",
    "collector_wallet": "0x123",
    "collector_data": {"name": "Test", "country": "USA"},
    "kyc_provider": "persona"
  }'

# Test Legal Entity Creation
curl -X POST http://localhost:8082/api/legal-entities/create \
  -H "X-API-Key: demo-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_type": "series_llc",
    "collector_wallet": "0x123",
    "artwork_id": "ART-001",
    "gallery_id": "GALLERY-001",
    "lead_id": "LEAD-001",
    "collector_data": {"name": "Test"},
    "artwork_data": {"title": "Test Art"}
  }'
```

---

## Demo Flow Summary

1. ✅ **Input**: Collector data
2. ✅ **KYC/AML**: 3rd party verification (Persona/Onfido)
3. ✅ **Compliance**: Gemini 2.5 Pro analysis
4. ✅ **Approval**: Human-in-the-Loop decision
5. ✅ **Legal Entity**: Pre-populated form → HITL completion → Filing
6. ✅ **Attestation**: ERC-3643 on-chain
7. ✅ **Escrow**: Multi-sig wallet creation
8. ✅ **Custody**: Transfer → Confirmation → Fund release

**Total Time**: ~5 minutes end-to-end (with HITL pauses)

Good luck! 🚀

