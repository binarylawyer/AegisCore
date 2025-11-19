# Opus Node Configurations: Complete Blockchain Workflow

This document provides exact External Service Node configurations for each blockchain-related step in your Opus workflow.

## Complete Workflow Sequence

```
1. Collector Vetting (Gemini 2.5 Pro)
2. Compliance Check (Gemini 2.5 Pro)
3. Approval Decision (Human-in-the-Loop)
4. Create Series LLC → External Service Node
5. Mint ERC-3643 Attestation → External Service Node
6. Create Escrow Wallet → External Service Node
7. Collector Funds Wallet → External Service Node (or direct wallet)
8. Initiate Custodian Transfer → External Service Node
9. Custodian Confirms Receipt → External Service Node
10. Release Funds → External Service Node
```

---

## Node 4: Create Series LLC

**Add External Service Node** after "Approve or Reject Collector Lead"

**Configuration**:
- **URL**: `http://your-server:8081/api/legal-entities/create`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "artwork_id": "{{ $workflow.artwork_id }}",
    "gallery_id": "{{ $workflow.gallery_id }}",
    "lead_id": "{{ $workflow.lead_id }}",
    "jurisdiction": "Delaware",
    "series_name": "Aegis Art Series {{ $workflow.artwork_id }}"
  }
  ```

**Parse Response** (Code Node):
```javascript
const response = $previous_node.json;
return {
  series_llc_id: response.series_llc_id,
  legal_entity_address: response.legal_entity_address,
  filing_reference: response.filing_reference,
  ein: response.ein,
  series_status: response.status,
  registration_tx: response.on_chain_registration_tx
};
```

---

## Node 5: Mint ERC-3643 Attestation

**Add External Service Node** after Series LLC creation

**Configuration**:
- **URL**: `http://your-server:8081/api/attestations/mint`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
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
    "series_llc_id": "{{ $workflow.series_llc_id }}",
    "claims": {
      "JURISDICTION_USA": true,
      "IS_ACCREDITED": true,
      "COMPLIANCE_VERIFIED": true,
      "SERIES_LLC_CREATED": true
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  attestation_id: response.attestation_id,
  token_id: response.token_id,
  transaction_hash: response.transaction_reference,
  block_number: response.block_number,
  attestation_status: response.status
};
```

---

## Node 6: Create Escrow Wallet

**Add External Service Node** after attestation minting

**Configuration**:
- **URL**: `http://your-server:8081/api/wallets/create-escrow`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "series_llc_id": "{{ $workflow.series_llc_id }}",
    "artwork_id": "{{ $workflow.artwork_id }}",
    "gallery_wallet": "{{ $workflow.gallery_wallet }}",
    "custodian_wallet": "{{ $workflow.custodian_wallet }}",
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "law_firm_wallet": "{{ $workflow.law_firm_wallet }}",
    "required_signatures": 2,
    "release_conditions": {
      "custodian_confirmation": true,
      "artwork_verification": true,
      "compliance_check": true
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  escrow_wallet_address: response.escrow_wallet_address,
  escrow_deployment_tx: response.deployment_tx,
  escrow_signers: response.signers,
  required_signatures: response.required_signatures,
  escrow_status: response.status
};
```

---

## Node 7: Collector Funds Wallet

**Note**: This can be done directly by the collector via their wallet, or triggered via Opus

**Option A: Direct Wallet Interaction** (Recommended)
- Collector uses their wallet (MetaMask, etc.) to:
  1. Approve token transfer
  2. Deposit funds to escrow wallet
  3. Transaction is recorded on-chain

**Option B: Via Opus External Service Node** (If collector wants assistance)

**Configuration**:
- **URL**: `http://your-server:8081/api/wallets/deposit-funds`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "escrow_wallet": "{{ $workflow.escrow_wallet_address }}",
    "collector_wallet": "{{ $workflow.collector_wallet }}",
    "amount": "{{ $workflow.purchase_amount }}",
    "token_address": "{{ $workflow.payment_token }}",
    "artwork_id": "{{ $workflow.artwork_id }}"
  }
  ```

**Note**: This endpoint provides instructions/helper, but actual deposit requires collector's wallet signature.

---

## Node 8: Initiate Custodian Transfer

**Add External Service Node** after funds are deposited

**Configuration**:
- **URL**: `http://your-server:8081/api/custody/initiate-transfer`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "artwork_id": "{{ $workflow.artwork_id }}",
    "series_llc_id": "{{ $workflow.series_llc_id }}",
    "from_location": "{{ $workflow.gallery_location }}",
    "to_custodian": "{{ $workflow.custodian_name }}",
    "shipping_manifest": {
      "carrier": "{{ $workflow.shipping_carrier }}",
      "tracking_number": "{{ $workflow.tracking_number }}",
      "estimated_arrival": "{{ $workflow.estimated_arrival }}"
    },
    "artwork_details": {
      "title": "{{ $workflow.artwork_title }}",
      "artist": "{{ $workflow.artwork_artist }}",
      "dimensions": "{{ $workflow.artwork_dimensions }}",
      "condition": "{{ $workflow.artwork_condition }}"
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  transfer_id: response.transfer_id,
  transfer_status: response.status,
  tracking_number: response.tracking_number,
  transfer_tx: response.on_chain_record_tx,
  estimated_arrival: response.estimated_arrival
};
```

---

## Node 9: Custodian Confirms Receipt

**Add External Service Node** (called by custodian system or manually)

**Configuration**:
- **URL**: `http://your-server:8081/api/custody/confirm-receipt`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.CUSTODIAN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "transfer_id": "{{ $workflow.transfer_id }}",
    "custodian_wallet": "{{ $workflow.custodian_wallet }}",
    "artwork_id": "{{ $workflow.artwork_id }}",
    "condition_report": {
      "condition": "excellent",
      "matches_manifest": true,
      "damage_notes": null,
      "photographs": ["ipfs://...", "ipfs://..."]
    },
    "storage_location": "{{ $workflow.storage_location }}",
    "insurance_coverage": {
      "policy_number": "{{ $workflow.insurance_policy }}",
      "coverage_amount": "{{ $workflow.insurance_amount }}",
      "effective_date": "{{ $now }}"
    }
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  confirmation_tx: response.confirmation_tx,
  custodian_signature: response.custodian_signature,
  condition_status: response.condition_status,
  storage_location: response.storage_location,
  insurance_active: response.insurance_active,
  release_authorized: response.release_authorized
};
```

**Critical**: This step authorizes fund release. Only proceed if `release_authorized: true`.

---

## Node 10: Release Funds to Gallery

**Add External Service Node** after custodian confirmation

**Configuration**:
- **URL**: `http://your-server:8081/api/wallets/release-funds`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.BLOCKCHAIN_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "escrow_wallet": "{{ $workflow.escrow_wallet_address }}",
    "artwork_id": "{{ $workflow.artwork_id }}",
    "series_llc_id": "{{ $workflow.series_llc_id }}",
    "signatures": [
      {
        "signer": "{{ $workflow.gallery_wallet }}",
        "signature": "{{ $workflow.gallery_signature }}"
      },
      {
        "signer": "{{ $workflow.custodian_wallet }}",
        "signature": "{{ $workflow.custodian_signature }}"
      }
    ],
    "release_amount": "{{ $workflow.purchase_amount }}",
    "recipient": "{{ $workflow.gallery_wallet }}",
    "token_address": "{{ $workflow.payment_token }}"
  }
  ```

**Parse Response**:
```javascript
const response = $previous_node.json;
return {
  release_tx: response.release_tx,
  amount_released: response.amount_released,
  recipient: response.recipient,
  remaining_balance: response.remaining_balance,
  release_status: response.status,
  release_block: response.block_number
};
```

---

## Complete Opus Workflow Structure

```
Workflow Input
    ↓
[External Service] → Gemini 2.5 Pro Compliance Check
    ↓
Check Collector Compliance
    ↓
Store Collector Lead Data
    ↓
Prepare Approval Package
    ↓
[External Service] → Gemini 2.5 Pro Review
    ↓
Review - Approve or Reject (Human-in-the-Loop)
    ↓
Approve or Reject Collector Lead
    ↓
[External Service] → Create Series LLC
    ↓
[External Service] → Mint ERC-3643 Attestation
    ↓
[External Service] → Create Escrow Wallet
    ↓
[External Service] → Collector Funds Wallet (or direct)
    ↓
[External Service] → Initiate Custodian Transfer
    ↓
[External Service] → Custodian Confirms Receipt
    ↓
[External Service] → Release Funds to Gallery
    ↓
Review - Mint Blockchain Attestation
    ↓
Workflow Output
```

---

## Environment Variables for Opus

Add these in Opus Settings → Environment Variables:

```bash
# Blockchain API
BLOCKCHAIN_API_KEY=your-blockchain-api-key
BLOCKCHAIN_API_URL=http://your-server:8081

# Custodian API (if separate)
CUSTODIAN_API_KEY=your-custodian-api-key

# Payment tokens
PAYMENT_TOKEN_USDC=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
PAYMENT_TOKEN_ETH=0x0000000000000000000000000000000000000000

# Wallet addresses
GALLERY_WALLET=0x...
CUSTODIAN_WALLET=0x...
LAW_FIRM_WALLET=0x...
```

---

## Error Handling

Each External Service Node should handle errors:

**Code Node for Error Handling**:
```javascript
const response = $previous_node.json;

if (response.error || response.status === "failed") {
  return {
    error: true,
    error_message: response.error || "Unknown error",
    workflow_status: "failed",
    retry_required: true
  };
}

return {
  error: false,
  ...response
};
```

---

## Testing Checklist

- [ ] Series LLC creation returns valid ID
- [ ] Attestation minting creates on-chain token
- [ ] Escrow wallet deploys successfully
- [ ] Fund deposit locks tokens
- [ ] Custodian transfer initiates correctly
- [ ] Custodian confirmation authorizes release
- [ ] Fund release executes with multi-sig
- [ ] All transactions are recorded on-chain
- [ ] Error handling works for each step

