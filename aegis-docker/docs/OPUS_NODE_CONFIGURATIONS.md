# Opus Node Configuration Guide

This guide provides specific configurations for each node in your Collector Vetting workflow, showing how to integrate Gemini 2.5 Pro and your blockchain attestation system.

## Node Configurations

### 1. "Check Collector Compliance" Node

**Current Setup**: Uses built-in Opus logic

**Recommended Change**: Add External Service Node before this node to use Gemini 2.5 Pro

#### Configuration Steps:

1. **Add External Service Node** before "Check Collector Compliance"
2. **Configure**:
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
           "content": "You are a compliance analyst for Aegis Core. Analyze collector details for regulatory compliance per Section 326 of the USA PATRIOT Act. Check:\n1. Identification number format and validity\n2. Address completeness (street, city, state/province)\n3. Contact information validity\n4. Required field completeness\n\nRespond with JSON: {\"compliance_status\": \"compliant\"|\"non-compliant\", \"compliance_notes\": \"detailed explanation\", \"issues\": [\"issue1\", \"issue2\"], \"risk_score\": 0.0-1.0}"
         },
         {
           "role": "user",
           "content": "Collector Details:\nName: {{ $workflow.collector_details.name }}\nEmail: {{ $workflow.collector_details.email }}\nPhone: {{ $workflow.collector_details.phone }}\nAddress: {{ $workflow.collector_details.address }}\nIdentification Number: {{ $workflow.collector_details.identification_number }}"
         }
       ],
       "max_tokens": 15000,
       "temperature": 0.2,
       "response_format": {
         "type": "json_object"
       }
     }
     ```

3. **Add Code Node** to parse response:
   ```javascript
   const response = $previous_node.json;
   const content = JSON.parse(response.choices[0].message.content);
   
   return {
     compliance_status: content.compliance_status,
     compliance_notes: content.compliance_notes,
     issues: content.issues || [],
     risk_score: content.risk_score || 0.5
   };
   ```

4. **Connect** parsed output to "Check Collector Compliance" node inputs

---

### 2. "Review - Approve or Reject Collector Lead" Node

**Current Setup**: Uses "Opus Swarm" agentic provider

**Recommended Change**: Replace with External Service Node calling Gemini 2.5 Pro

#### Option A: Replace Agentic Review with External Service Node

1. **Remove** the "Review - Approve or Reject..." node's agentic configuration
2. **Add External Service Node** before the review node
3. **Configure**:
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
           "content": "You are a senior compliance officer reviewing collector lead approvals. Review the compliance status, notes, and lead record. Make a decision: approve or reject. Provide clear justification.\n\nRespond with JSON: {\"approval_status\": \"approve\"|\"reject\", \"approval_reason\": \"detailed justification\", \"risk_assessment\": \"low\"|\"medium\"|\"high\", \"recommendations\": [\"rec1\", \"rec2\"]}"
         },
         {
           "role": "user",
           "content": "Compliance Review:\nStatus: {{ $workflow.compliance_status }}\nNotes: {{ $workflow.compliance_notes }}\nLead Reference: {{ $workflow.lead_record_reference }}\n\nReview this lead and provide approval decision with justification."
         }
       ],
       "max_tokens": 15000,
       "temperature": 0.3,
       "response_format": {
         "type": "json_object"
       }
     }
     ```

4. **Parse Response** (Code Node):
   ```javascript
   const response = $previous_node.json;
   const content = JSON.parse(response.choices[0].message.content);
   
   return {
     approval_status: content.approval_status,
     approval_reason: content.approval_reason,
     risk_assessment: content.risk_assessment,
     recommendations: content.recommendations || []
   };
   ```

5. **Connect** to Human-in-the-Loop Review node (for final approval)

#### Option B: Keep Agentic Review but Customize Provider

If Opus allows custom agentic providers:
1. Change "Agentic Provider" from "Opus Swarm" to "Custom"
2. Configure endpoint: `https://api.aimlapi.com/v1/chat/completions`
3. Set API key in environment variables

---

### 3. "Approve or Reject Collector Lead" Node

**Current Setup**: Decision-making node

**Recommended Enhancement**: Add LLM assistance for decision justification

#### Configuration:

1. **Add External Service Node** before this node (or enhance existing logic)
2. **Use Gemini 2.5 Pro** to generate detailed approval reason:
   ```json
   {
     "model": "google/gemini-2.5-pro",
     "messages": [
       {
         "role": "system",
         "content": "Generate a clear, professional approval or rejection reason based on compliance findings. Reference specific compliance issues or positive indicators."
       },
       {
         "role": "user",
         "content": "Compliance Status: {{ $workflow.compliance_status }}\nCompliance Notes: {{ $workflow.compliance_notes }}\nDecision: {{ $workflow.approval_status }}\n\nGenerate a professional justification for this decision."
       }
     ],
     "max_tokens": 2000,
     "temperature": 0.4
   }
   ```

---

### 4. "Mint Blockchain Attestation" Node

**Current Setup**: Creates blockchain attestations

**Required**: Integration with your blockchain/ERC-3643 system

#### Configuration Steps:

1. **Add External Service Node** to call your blockchain API
2. **Configure**:
   - **URL**: `http://your-server:3000/api/attestations/mint` (or your blockchain API endpoint)
   - **Method**: `POST`
   - **Headers**:
     ```
     Authorization: Bearer {{ $env.BLOCKCHAIN_API_KEY }}
     Content-Type: application/json
     ```
   - **Body**:
     ```json
     {
       "lead_id": "{{ $workflow.lead_id }}",
       "artwork_id": "{{ $workflow.artwork_id }}",
       "gallery_id": "{{ $workflow.gallery_id }}",
       "approval_status": "{{ $workflow.approval_status }}",
       "approval_reason": "{{ $workflow.approval_reason }}",
       "wallet_address": "{{ $workflow.collector_wallet }}",
       "claims": {
         "JURISDICTION_USA": true,
         "IS_ACCREDITED": true,
         "COMPLIANCE_VERIFIED": true
       }
     }
     ```

3. **Handle Response**:
   ```javascript
   const response = $previous_node.json;
   
   return {
     blockchain_attestation_result: {
       status: response.status || "pending",
       transaction_reference: response.tx_hash || response.transaction_id,
       block_number: response.block_number,
       attestation_id: response.attestation_id
     }
   };
   ```

#### Alternative: Direct Smart Contract Call

If you have a smart contract endpoint:

```json
{
  "contract_address": "0x...",
  "function": "mintAttestation",
  "parameters": {
    "wallet": "{{ $workflow.collector_wallet }}",
    "claims": ["JURISDICTION_USA", "IS_ACCREDITED"],
    "metadata": {
      "lead_id": "{{ $workflow.lead_id }}",
      "approved_at": "{{ $now }}"
    }
  }
}
```

---

### 5. "Review - Mint Blockchain Attestation" Node

**Current Setup**: Agentic review using "Opus Swarm"

**Recommended Change**: Replace with External Service Node

#### Configuration:

1. **Add External Service Node** before review
2. **Use Gemini 2.5 Pro** to verify attestation:
   ```json
   {
     "model": "google/gemini-2.5-pro",
     "messages": [
       {
         "role": "system",
         "content": "Review blockchain attestation results. Verify:\n1. Transaction was successful\n2. All required claims are present\n3. Metadata is correct\n4. No errors in attestation\n\nRespond with JSON: {\"verification_status\": \"verified\"|\"failed\", \"verification_notes\": \"details\", \"issues\": []}"
       },
       {
         "role": "user",
         "content": "Attestation Result:\nTransaction: {{ $workflow.blockchain_attestation_result.transaction_reference }}\nStatus: {{ $workflow.blockchain_attestation_result.status }}\nBlock: {{ $workflow.blockchain_attestation_result.block_number }}\n\nVerify this attestation."
       }
     ],
     "max_tokens": 15000,
     "temperature": 0.2,
     "response_format": {
       "type": "json_object"
     }
   }
   ```

---

## Complete Workflow Integration

### Workflow Flow with Gemini 2.5 Pro:

```
Workflow Input (Collector Details)
    ↓
[External Service Node] → Gemini 2.5 Pro Compliance Check
    ↓
Check Collector Compliance (uses LLM output)
    ↓
Store Collector Lead Data
    ↓
Prepare Approval Package
    ↓
[External Service Node] → Gemini 2.5 Pro Review
    ↓
Review - Approve or Reject (Human-in-the-Loop)
    ↓
Approve or Reject Collector Lead
    ↓
[External Service Node] → Mint Blockchain Attestation (Your API)
    ↓
Review - Mint Blockchain Attestation (Gemini 2.5 Pro Verification)
    ↓
Workflow Output
```

---

## Environment Variables for Opus

Add these in Opus Settings → Environment Variables:

```bash
# AIML API for Gemini 2.5 Pro
AIMLAPI_KEY=your-aimlapi-key-here

# Your Blockchain API
BLOCKCHAIN_API_KEY=your-blockchain-api-key
BLOCKCHAIN_API_URL=http://your-server:3000/api

# Qdrant API (for lead matching)
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_API_URL=http://your-server:8080
```

---

## Next Steps

1. **Replace Opus Swarm with Gemini 2.5 Pro**:
   - Configure External Service Nodes as shown above
   - Test each node individually

2. **Set up Blockchain API Endpoint**:
   - Create FastAPI endpoint for attestation minting
   - Integrate with ERC-3643 smart contracts
   - Add to docker-compose.yml

3. **Test Integration**:
   - Run test workflow with sample collector data
   - Verify Gemini 2.5 Pro responses
   - Verify blockchain attestation creation

4. **Production Setup**:
   - Secure API keys
   - Set up HTTPS (reverse proxy)
   - Configure CORS for Opus domains
   - Add monitoring/logging

---

## API Modifications Needed

### 1. Create Blockchain Attestation API

Add to your FastAPI service (`services/qdrant-api/main.py` or create new service):

```python
@app.post("/api/attestations/mint")
async def mint_attestation(
    request: AttestationRequest,
    api_key: str = Depends(verify_api_key)
):
    """Mint blockchain attestation for approved collector"""
    # Your ERC-3643 integration logic here
    # Call smart contract
    # Return transaction hash
    pass
```

### 2. Add Qdrant Search Endpoint

Already in FastAPI gateway - use `/collections/{collection_name}/search`

### 3. Add Lead Matching Endpoint

```python
@app.post("/api/leads/match")
async def match_lead(
    request: LeadMatchRequest,
    api_key: str = Depends(verify_api_key)
):
    """Find similar leads using vector search"""
    # Generate embedding
    # Search Qdrant
    # Return matches
    pass
```

---

## Testing Checklist

- [ ] Gemini 2.5 Pro compliance check works
- [ ] Compliance notes are properly formatted
- [ ] Approval/rejection decisions are accurate
- [ ] Blockchain attestation API responds correctly
- [ ] Transaction hashes are captured
- [ ] Qdrant search returns relevant leads
- [ ] Error handling works for all nodes
- [ ] Human-in-the-loop reviews function properly

