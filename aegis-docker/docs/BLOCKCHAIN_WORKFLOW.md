# Blockchain Workflow: Series LLC, Custodian, and Fund Release

This document outlines the complete blockchain workflow for artwork tokenization, including Series LLC creation, wallet funding, custodian transfer, and conditional fund release.

## Complete Workflow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Opus Workflow                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Collector Vetting (Gemini 2.5 Pro)                    │  │
│  │ 2. Compliance Check                                       │  │
│  │ 3. Approval Decision                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ↓
┌───────────────────────┴─────────────────────────────────────────┐
│              Blockchain & Legal Workflow                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 4. Create Series LLC (Legal Entity)                       │ │
│  │ 5. Mint ERC-3643 Attestation (On-Chain)                  │ │
│  │ 6. Create Escrow Wallet (Multi-Sig)                      │ │
│  │ 7. Collector Funds Wallet                                │ │
│  │ 8. Transfer Artwork to Custodian                          │ │
│  │ 9. Custodian Confirms Receipt                             │ │
│  │ 10. Release Funds to Gallery (Conditional)               │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Workflow Steps

### Step 1-3: Opus Compliance (Already Configured)
- Collector vetting
- Compliance check
- Approval decision

### Step 4: Create Series LLC

**Purpose**: Create legal entity to hold artwork ownership

**Process**:
1. **Legal Entity Creation** (Off-Chain):
   - Generate Series LLC documents
   - File with Delaware (or chosen jurisdiction)
   - Obtain EIN from IRS
   - Create operating agreement

2. **On-Chain Registration**:
   - Register Series LLC address in registry contract
   - Link to collector wallet
   - Store legal entity metadata on-chain

**API Endpoint**: `POST /api/legal-entities/create`

**Input**:
```json
{
  "collector_wallet": "0x...",
  "artwork_id": "ART-10234",
  "gallery_id": "GALLERY-2024-AB12",
  "lead_id": "LEAD-2024-105",
  "jurisdiction": "Delaware",
  "series_name": "Aegis Art Series 2024-001"
}
```

**Output**:
```json
{
  "series_llc_id": "SERIES-2024-001",
  "legal_entity_address": "0x...",  // On-chain address
  "filing_reference": "DE-2024-...",
  "ein": "XX-XXXXXXX",
  "status": "pending" | "active",
  "on_chain_registration_tx": "0x..."
}
```

### Step 5: Mint ERC-3643 Attestation

**Purpose**: Create on-chain compliance attestation

**Process**:
1. Call ERC-3643 Identity Registry contract
2. Mint attestation token to collector wallet
3. Set compliance claims (JURISDICTION_USA, IS_ACCREDITED, etc.)

**Smart Contract Function**:
```solidity
function mintAttestation(
    address to,
    bytes32[] memory claims,
    bytes memory metadata
) external returns (uint256 tokenId);
```

**API Endpoint**: `POST /api/attestations/mint`

**Input**:
```json
{
  "wallet_address": "0x...",
  "claims": [
    "JURISDICTION_USA",
    "IS_ACCREDITED",
    "COMPLIANCE_VERIFIED",
    "SERIES_LLC_CREATED"
  ],
  "metadata": {
    "lead_id": "LEAD-2024-105",
    "series_llc_id": "SERIES-2024-001",
    "attested_at": "2024-01-15T10:30:00Z",
    "attestor": "law_firm_address"
  }
}
```

**Output**:
```json
{
  "attestation_id": 12345,
  "token_id": 12345,
  "transaction_hash": "0x...",
  "block_number": 12345678,
  "claims": ["JURISDICTION_USA", "IS_ACCREDITED", ...],
  "status": "confirmed"
}
```

### Step 6: Create Escrow Wallet (Multi-Signature)

**Purpose**: Hold funds until artwork is verified by custodian

**Process**:
1. Deploy or use existing multi-sig wallet contract
2. Set signers: Gallery, Custodian, Law Firm (optional)
3. Configure release conditions

**Multi-Sig Configuration**:
- **Signers**: 
  - Gallery (1/3)
  - Custodian (1/3)
  - Law Firm/Escrow Agent (1/3)
- **Required Signatures**: 2 of 3 (or custom)
- **Release Condition**: Custodian confirms artwork receipt

**API Endpoint**: `POST /api/wallets/create-escrow`

**Input**:
```json
{
  "series_llc_id": "SERIES-2024-001",
  "artwork_id": "ART-10234",
  "signers": [
    "0x...",  // Gallery wallet
    "0x...",  // Custodian wallet
    "0x..."   // Law firm wallet
  ],
  "required_signatures": 2,
  "release_conditions": {
    "custodian_confirmation": true,
    "artwork_verification": true,
    "compliance_check": true
  }
}
```

**Output**:
```json
{
  "escrow_wallet_address": "0x...",
  "deployment_tx": "0x...",
  "signers": ["0x...", "0x...", "0x..."],
  "required_signatures": 2,
  "status": "active"
}
```

### Step 7: Collector Funds Wallet

**Purpose**: Collector deposits funds into escrow wallet

**Process**:
1. Collector approves token transfer (USDC, ETH, etc.)
2. Collector transfers funds to escrow wallet
3. Escrow contract locks funds
4. Emit event: `FundsDeposited`

**API Endpoint**: `POST /api/wallets/deposit-funds`

**Input**:
```json
{
  "escrow_wallet": "0x...",
  "collector_wallet": "0x...",
  "amount": "100000",  // In wei or smallest unit
  "token_address": "0x...",  // USDC, ETH (0x0), etc.
  "artwork_id": "ART-10234"
}
```

**Output**:
```json
{
  "deposit_tx": "0x...",
  "amount_deposited": "100000",
  "token_address": "0x...",
  "escrow_balance": "100000",
  "status": "locked"
}
```

### Step 8: Transfer Artwork to Custodian

**Purpose**: Physically transfer artwork to secure custodian

**Process**:
1. **Off-Chain**: Physical transfer logistics
2. **On-Chain**: Record transfer intent
3. Generate transfer manifest
4. Update artwork status

**API Endpoint**: `POST /api/custody/initiate-transfer`

**Input**:
```json
{
  "artwork_id": "ART-10234",
  "series_llc_id": "SERIES-2024-001",
  "from_location": "Gallery Warehouse",
  "to_custodian": "GENEVA_FREEPORT",
  "shipping_manifest": {
    "carrier": "Brink's",
    "tracking_number": "BR-2024-001",
    "estimated_arrival": "2024-01-20"
  },
  "artwork_details": {
    "title": "Untitled #123",
    "artist": "Artist Name",
    "dimensions": "24x36 inches",
    "condition": "excellent"
  }
}
```

**Output**:
```json
{
  "transfer_id": "TRANSFER-2024-001",
  "status": "in_transit",
  "tracking_number": "BR-2024-001",
  "on_chain_record_tx": "0x...",
  "estimated_arrival": "2024-01-20"
}
```

### Step 9: Custodian Confirms Receipt

**Purpose**: Custodian verifies artwork receipt and condition

**Process**:
1. Custodian receives artwork
2. Custodian performs condition check
3. Custodian signs confirmation (on-chain)
4. Emit event: `ArtworkReceived`

**API Endpoint**: `POST /api/custody/confirm-receipt`

**Input**:
```json
{
  "transfer_id": "TRANSFER-2024-001",
  "custodian_wallet": "0x...",  // Custodian's signing wallet
  "artwork_id": "ART-10234",
  "condition_report": {
    "condition": "excellent",
    "matches_manifest": true,
    "damage_notes": null,
    "photographs": ["ipfs://...", "ipfs://..."]
  },
  "storage_location": "VAULT-A-12-34",
  "insurance_coverage": {
    "policy_number": "INS-2024-001",
    "coverage_amount": "500000",
    "effective_date": "2024-01-20"
  }
}
```

**Output**:
```json
{
  "confirmation_tx": "0x...",
  "custodian_signature": "0x...",
  "condition_status": "verified",
  "storage_location": "VAULT-A-12-34",
  "insurance_active": true,
  "release_authorized": true
}
```

### Step 10: Release Funds to Gallery (Conditional)

**Purpose**: Release escrowed funds after all conditions met

**Conditions**:
- ✅ Custodian confirmed receipt
- ✅ Artwork condition verified
- ✅ Compliance attestation valid
- ✅ Series LLC active
- ✅ Required signatures collected

**Process**:
1. Check all release conditions
2. Collect required signatures (2 of 3)
3. Execute fund release from escrow
4. Transfer funds to gallery wallet
5. Emit event: `FundsReleased`

**API Endpoint**: `POST /api/wallets/release-funds`

**Input**:
```json
{
  "escrow_wallet": "0x...",
  "artwork_id": "ART-10234",
  "series_llc_id": "SERIES-2024-001",
  "signatures": [
    {
      "signer": "0x...",  // Gallery
      "signature": "0x..."
    },
    {
      "signer": "0x...",  // Custodian
      "signature": "0x..."
    }
  ],
  "release_amount": "100000",
  "recipient": "0x...",  // Gallery wallet
  "token_address": "0x..."  // USDC, ETH, etc.
}
```

**Output**:
```json
{
  "release_tx": "0x...",
  "amount_released": "100000",
  "recipient": "0x...",
  "remaining_balance": "0",
  "status": "completed",
  "block_number": 12345680
}
```

## Smart Contract Architecture

### 1. Series LLC Registry Contract

```solidity
contract SeriesLLCRegistry {
    struct SeriesLLC {
        string seriesId;
        address legalEntityAddress;
        address collectorWallet;
        string jurisdiction;
        string filingReference;
        bool active;
        uint256 createdAt;
    }
    
    mapping(string => SeriesLLC) public seriesLLCs;
    mapping(address => string[]) public collectorSeries;
    
    function registerSeriesLLC(
        string memory seriesId,
        address legalEntityAddress,
        address collectorWallet,
        string memory jurisdiction,
        string memory filingReference
    ) external returns (bool);
    
    function getSeriesLLC(string memory seriesId) 
        external view returns (SeriesLLC memory);
}
```

### 2. Escrow Wallet Contract (Multi-Sig)

```solidity
contract ArtworkEscrowWallet {
    struct Escrow {
        address artworkOwner;  // Series LLC address
        address gallery;
        address custodian;
        address collector;
        uint256 amount;
        address tokenAddress;
        bool custodianConfirmed;
        bool fundsReleased;
        uint256 createdAt;
    }
    
    mapping(bytes32 => Escrow) public escrows;
    
    function createEscrow(
        address gallery,
        address custodian,
        address collector,
        address tokenAddress
    ) external returns (bytes32 escrowId);
    
    function depositFunds(
        bytes32 escrowId,
        uint256 amount
    ) external;
    
    function confirmArtworkReceipt(
        bytes32 escrowId,
        string memory conditionReport
    ) external;  // Only custodian
    
    function releaseFunds(
        bytes32 escrowId,
        bytes[] memory signatures
    ) external;  // Requires multi-sig
    
    function checkReleaseConditions(bytes32 escrowId) 
        external view returns (bool);
}
```

### 3. Custodian Registry Contract

```solidity
contract CustodianRegistry {
    struct Custodian {
        address walletAddress;
        string name;
        string location;
        bool active;
        uint256 registrationDate;
    }
    
    mapping(address => Custodian) public custodians;
    mapping(bytes32 => TransferRecord) public transfers;
    
    struct TransferRecord {
        string artworkId;
        address from;
        address to;  // Custodian address
        string trackingNumber;
        bool confirmed;
        string conditionReport;
        uint256 confirmedAt;
    }
    
    function registerCustodian(
        address walletAddress,
        string memory name,
        string memory location
    ) external;
    
    function initiateTransfer(
        bytes32 transferId,
        string memory artworkId,
        address from,
        address to,
        string memory trackingNumber
    ) external;
    
    function confirmReceipt(
        bytes32 transferId,
        string memory conditionReport
    ) external;  // Only custodian
}
```

## Opus Workflow Integration

### Updated Opus Workflow Nodes

1. **Collector Vetting** → Gemini 2.5 Pro
2. **Compliance Check** → Gemini 2.5 Pro
3. **Approval Decision** → Human-in-the-Loop
4. **Create Series LLC** → External Service Node → Your API
5. **Mint Attestation** → External Service Node → Blockchain API
6. **Create Escrow Wallet** → External Service Node → Blockchain API
7. **Collector Funds Wallet** → External Service Node → Blockchain API (or direct wallet interaction)
8. **Initiate Custodian Transfer** → External Service Node → Custody API
9. **Custodian Confirmation** → External Service Node → Custody API (with custodian signature)
10. **Release Funds** → External Service Node → Blockchain API (with multi-sig)

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/legal-entities/create` | POST | Create Series LLC |
| `/api/attestations/mint` | POST | Mint ERC-3643 attestation |
| `/api/wallets/create-escrow` | POST | Create multi-sig escrow wallet |
| `/api/wallets/deposit-funds` | POST | Collector deposits funds |
| `/api/custody/initiate-transfer` | POST | Initiate artwork transfer |
| `/api/custody/confirm-receipt` | POST | Custodian confirms receipt |
| `/api/wallets/release-funds` | POST | Release funds to gallery |
| `/api/wallets/escrow-status/{escrowId}` | GET | Check escrow status |
| `/api/legal-entities/{seriesId}` | GET | Get Series LLC info |

## Security Considerations

1. **Multi-Signature Wallets**: Require 2 of 3 signatures for fund release
2. **Time Locks**: Optional time delay before fund release
3. **Condition Checks**: Verify all conditions before release
4. **Custodian Verification**: Only registered custodians can confirm
5. **Audit Trail**: All actions recorded on-chain

## Next Steps

1. Implement smart contracts (Series LLC Registry, Escrow, Custodian Registry)
2. Deploy contracts to testnet
3. Create API endpoints for each workflow step
4. Integrate with Opus External Service Nodes
5. Test end-to-end workflow
6. Deploy to mainnet

