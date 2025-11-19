from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
import os
import json

app = FastAPI(title="Aegis Blockchain API - Series LLC, Escrow, Custody & Attestations")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key validation
API_KEY = os.getenv("API_KEY", "change-me-in-production")

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

# Models
class SeriesLLCRequest(BaseModel):
    collector_wallet: str
    artwork_id: str
    gallery_id: str
    lead_id: str
    jurisdiction: str = "Delaware"
    series_name: Optional[str] = None

class SeriesLLCResponse(BaseModel):
    series_llc_id: str
    legal_entity_address: Optional[str] = None
    filing_reference: Optional[str] = None
    ein: Optional[str] = None
    status: str  # "pending" | "active"
    on_chain_registration_tx: Optional[str] = None

class AttestationRequest(BaseModel):
    lead_id: str
    artwork_id: str
    gallery_id: str
    approval_status: str  # "approve" or "reject"
    approval_reason: str
    wallet_address: str
    series_llc_id: Optional[str] = None
    claims: Dict[str, bool]  # e.g., {"JURISDICTION_USA": True, "IS_ACCREDITED": True}

class AttestationResponse(BaseModel):
    status: str
    transaction_reference: Optional[str] = None
    block_number: Optional[int] = None
    attestation_id: Optional[str] = None
    token_id: Optional[int] = None
    error: Optional[str] = None

class EscrowWalletRequest(BaseModel):
    series_llc_id: str
    artwork_id: str
    gallery_wallet: str
    custodian_wallet: str
    collector_wallet: str
    law_firm_wallet: Optional[str] = None
    required_signatures: int = 2
    release_conditions: Dict[str, bool] = {}

class EscrowWalletResponse(BaseModel):
    escrow_wallet_address: str
    deployment_tx: Optional[str] = None
    signers: List[str]
    required_signatures: int
    status: str  # "pending" | "active"

class DepositFundsRequest(BaseModel):
    escrow_wallet: str
    collector_wallet: str
    amount: str  # In wei or smallest unit
    token_address: str  # USDC, ETH (0x0), etc.
    artwork_id: str

class DepositFundsResponse(BaseModel):
    deposit_tx: str
    amount_deposited: str
    token_address: str
    escrow_balance: str
    status: str  # "locked"

class CustodyTransferRequest(BaseModel):
    artwork_id: str
    series_llc_id: str
    from_location: str
    to_custodian: str  # "GENEVA_FREEPORT" | "DELAWARE_FREEPORT" | etc.
    shipping_manifest: Dict[str, str]
    artwork_details: Dict[str, str]

class CustodyTransferResponse(BaseModel):
    transfer_id: str
    status: str  # "in_transit" | "delivered" | "confirmed"
    tracking_number: Optional[str] = None
    on_chain_record_tx: Optional[str] = None
    estimated_arrival: Optional[str] = None

class CustodyConfirmationRequest(BaseModel):
    transfer_id: str
    custodian_wallet: str
    artwork_id: str
    condition_report: Dict[str, Any]
    storage_location: str
    insurance_coverage: Dict[str, str]

class CustodyConfirmationResponse(BaseModel):
    confirmation_tx: str
    custodian_signature: str
    condition_status: str  # "verified" | "damaged" | "rejected"
    storage_location: str
    insurance_active: bool
    release_authorized: bool

class ReleaseFundsRequest(BaseModel):
    escrow_wallet: str
    artwork_id: str
    series_llc_id: str
    signatures: List[Dict[str, str]]  # [{"signer": "0x...", "signature": "0x..."}]
    release_amount: str
    recipient: str  # Gallery wallet
    token_address: str

class ReleaseFundsResponse(BaseModel):
    release_tx: str
    amount_released: str
    recipient: str
    remaining_balance: str
    status: str  # "completed" | "pending"
    block_number: Optional[int] = None

# Endpoints
@app.get("/health")
async def health():
    return {"status": "healthy", "service": "blockchain-attestation-api"}

@app.post("/api/attestations/mint", response_model=AttestationResponse)
async def mint_attestation(
    request: AttestationRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Mint blockchain attestation for approved collector lead.
    
    This endpoint integrates with ERC-3643 smart contracts to create
    on-chain attestations for compliance-verified collectors.
    """
    try:
        # Only mint attestations for approved leads
        if request.approval_status.lower() != "approve":
            return AttestationResponse(
                status="skipped",
                error=f"Attestation not minted for {request.approval_status} status"
            )
        
        # TODO: Integrate with your blockchain/ERC-3643 contract
        # Example integration points:
        # 1. Connect to Ethereum/Etherlink node
        # 2. Call smart contract function: mintAttestation(wallet, claims, metadata)
        # 3. Wait for transaction confirmation
        # 4. Return transaction hash
        
        # Placeholder implementation
        # Replace with actual blockchain integration
        blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL", "http://localhost:8545")
        contract_address = os.getenv("ERC3643_CONTRACT_ADDRESS", "0x...")
        
        # Example: Call smart contract
        # from web3 import Web3
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # contract = w3.eth.contract(address=contract_address, abi=contract_abi)
        # tx_hash = contract.functions.mintAttestation(
        #     request.wallet_address,
        #     list(request.claims.keys()),
        #     json.dumps({
        #         "lead_id": request.lead_id,
        #         "artwork_id": request.artwork_id,
        #         "gallery_id": request.gallery_id,
        #         "approved_at": datetime.now().isoformat()
        #     })
        # ).transact({'from': issuer_wallet})
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # For now, return mock response
        # Replace with actual blockchain transaction
        mock_tx_hash = f"0x{os.urandom(32).hex()}"
        
        return AttestationResponse(
            status="success",
            transaction_reference=mock_tx_hash,
            block_number=12345678,  # Replace with actual block number
            attestation_id=f"attest_{request.lead_id}_{request.artwork_id}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to mint attestation: {str(e)}")

@app.get("/api/attestations/{attestation_id}")
async def get_attestation(
    attestation_id: str,
    api_key: str = Depends(verify_api_key)
):
    """Get attestation details by ID"""
    # TODO: Query blockchain for attestation details
    # Return attestation metadata, claims, status
    pass

@app.get("/api/attestations/wallet/{wallet_address}")
async def get_wallet_attestations(
    wallet_address: str,
    api_key: str = Depends(verify_api_key)
):
    """Get all attestations for a wallet address"""
    # TODO: Query blockchain for all attestations for this wallet
    # Return list of attestations
    pass

# ============================================================
# Series LLC Endpoints
# ============================================================

@app.post("/api/legal-entities/create", response_model=SeriesLLCResponse)
async def create_series_llc(
    request: SeriesLLCRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Create Series LLC for artwork ownership.
    
    This endpoint:
    1. Generates Series LLC documents (off-chain)
    2. Registers on-chain address in Series LLC Registry contract
    3. Links to collector wallet and artwork
    """
    try:
        # Generate Series LLC ID
        series_llc_id = request.series_name or f"SERIES-{datetime.now().strftime('%Y-%m%d')}-{request.artwork_id[-4:]}"
        
        # TODO: Integrate with legal entity creation service
        # 1. Generate Series LLC documents
        # 2. File with Delaware (or chosen jurisdiction)
        # 3. Obtain EIN from IRS
        # 4. Create operating agreement
        
        # TODO: Register on-chain in Series LLC Registry contract
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # series_registry_address = os.getenv("SERIES_LLC_REGISTRY_ADDRESS")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # registry = w3.eth.contract(address=series_registry_address, abi=registry_abi)
        # tx_hash = registry.functions.registerSeriesLLC(
        #     series_llc_id,
        #     legal_entity_address,
        #     request.collector_wallet,
        #     request.jurisdiction,
        #     filing_reference
        # ).transact({'from': issuer_wallet})
        
        # Mock response - replace with actual implementation
        legal_entity_address = f"0x{os.urandom(20).hex()}"
        mock_tx = f"0x{os.urandom(32).hex()}"
        
        return SeriesLLCResponse(
            series_llc_id=series_llc_id,
            legal_entity_address=legal_entity_address,
            filing_reference=f"DE-2024-{series_llc_id}",
            ein=f"XX-XXXXXXX",  # Mock EIN
            status="pending",
            on_chain_registration_tx=mock_tx
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create Series LLC: {str(e)}")

@app.get("/api/legal-entities/{series_id}", response_model=SeriesLLCResponse)
async def get_series_llc(
    series_id: str,
    api_key: str = Depends(verify_api_key)
):
    """Get Series LLC information"""
    # TODO: Query Series LLC Registry contract
    pass

# ============================================================
# Escrow Wallet Endpoints
# ============================================================

@app.post("/api/wallets/create-escrow", response_model=EscrowWalletResponse)
async def create_escrow_wallet(
    request: EscrowWalletRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Create multi-signature escrow wallet for artwork purchase.
    
    Signers: Gallery, Custodian, Law Firm (optional)
    Required signatures: 2 of 3 (configurable)
    """
    try:
        signers = [request.gallery_wallet, request.custodian_wallet]
        if request.law_firm_wallet:
            signers.append(request.law_firm_wallet)
        
        # TODO: Deploy multi-sig wallet contract
        # Use Gnosis Safe, or custom escrow contract
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # escrow_factory_address = os.getenv("ESCROW_FACTORY_ADDRESS")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # factory = w3.eth.contract(address=escrow_factory_address, abi=factory_abi)
        # tx_hash = factory.functions.createEscrow(
        #     signers,
        #     request.required_signatures,
        #     request.series_llc_id,
        #     request.artwork_id
        # ).transact({'from': issuer_wallet})
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        # escrow_address = receipt.contractAddress
        
        # Mock response
        escrow_address = f"0x{os.urandom(20).hex()}"
        mock_tx = f"0x{os.urandom(32).hex()}"
        
        return EscrowWalletResponse(
            escrow_wallet_address=escrow_address,
            deployment_tx=mock_tx,
            signers=signers,
            required_signatures=request.required_signatures,
            status="active"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create escrow wallet: {str(e)}")

@app.post("/api/wallets/deposit-funds", response_model=DepositFundsResponse)
async def deposit_funds(
    request: DepositFundsRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Collector deposits funds into escrow wallet.
    
    This locks funds until custodian confirms artwork receipt
    and all release conditions are met.
    """
    try:
        # TODO: Call escrow contract deposit function
        # Escrow contract must:
        # 1. Check collector has approved token transfer
        # 2. Transfer tokens from collector to escrow
        # 3. Lock funds
        # 4. Emit FundsDeposited event
        
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # escrow = w3.eth.contract(address=request.escrow_wallet, abi=escrow_abi)
        # tx_hash = escrow.functions.depositFunds(
        #     request.token_address,
        #     int(request.amount)
        # ).transact({'from': request.collector_wallet})
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Mock response
        mock_tx = f"0x{os.urandom(32).hex()}"
        
        return DepositFundsResponse(
            deposit_tx=mock_tx,
            amount_deposited=request.amount,
            token_address=request.token_address,
            escrow_balance=request.amount,
            status="locked"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to deposit funds: {str(e)}")

@app.post("/api/wallets/release-funds", response_model=ReleaseFundsResponse)
async def release_funds(
    request: ReleaseFundsRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Release funds from escrow to gallery after all conditions met.
    
    Conditions:
    - Custodian confirmed artwork receipt
    - Artwork condition verified
    - Required signatures collected (multi-sig)
    - Compliance attestation valid
    """
    try:
        # TODO: Verify all release conditions
        # 1. Check custodian confirmation on-chain
        # 2. Verify artwork condition report
        # 3. Validate signatures
        # 4. Check compliance attestation
        
        # TODO: Execute fund release
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # escrow = w3.eth.contract(address=request.escrow_wallet, abi=escrow_abi)
        # tx_hash = escrow.functions.releaseFunds(
        #     request.recipient,
        #     request.token_address,
        #     int(request.release_amount),
        #     request.signatures
        # ).transact({'from': issuer_wallet})
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Mock response
        mock_tx = f"0x{os.urandom(32).hex()}"
        
        return ReleaseFundsResponse(
            release_tx=mock_tx,
            amount_released=request.release_amount,
            recipient=request.recipient,
            remaining_balance="0",
            status="completed",
            block_number=12345680
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to release funds: {str(e)}")

@app.get("/api/wallets/escrow-status/{escrow_wallet}")
async def get_escrow_status(
    escrow_wallet: str,
    api_key: str = Depends(verify_api_key)
):
    """Get escrow wallet status and balance"""
    # TODO: Query escrow contract for status
    pass

# ============================================================
# Custody Endpoints
# ============================================================

@app.post("/api/custody/initiate-transfer", response_model=CustodyTransferResponse)
async def initiate_custody_transfer(
    request: CustodyTransferRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Initiate artwork transfer to custodian.
    
    Records transfer intent on-chain and generates tracking manifest.
    """
    try:
        transfer_id = f"TRANSFER-{datetime.now().strftime('%Y-%m%d')}-{request.artwork_id[-4:]}"
        
        # TODO: Record transfer on-chain in Custodian Registry contract
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # custodian_registry_address = os.getenv("CUSTODIAN_REGISTRY_ADDRESS")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # registry = w3.eth.contract(address=custodian_registry_address, abi=registry_abi)
        # tx_hash = registry.functions.initiateTransfer(
        #     transfer_id,
        #     request.artwork_id,
        #     request.series_llc_id,
        #     request.to_custodian,
        #     request.shipping_manifest.get("tracking_number", "")
        # ).transact({'from': issuer_wallet})
        
        # Mock response
        mock_tx = f"0x{os.urandom(32).hex()}"
        
        return CustodyTransferResponse(
            transfer_id=transfer_id,
            status="in_transit",
            tracking_number=request.shipping_manifest.get("tracking_number"),
            on_chain_record_tx=mock_tx,
            estimated_arrival=request.shipping_manifest.get("estimated_arrival")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initiate transfer: {str(e)}")

@app.post("/api/custody/confirm-receipt", response_model=CustodyConfirmationResponse)
async def confirm_custody_receipt(
    request: CustodyConfirmationRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Custodian confirms artwork receipt and condition.
    
    This is a critical step that authorizes fund release.
    Only registered custodian wallets can call this endpoint.
    """
    try:
        # TODO: Verify custodian is registered
        # TODO: Record confirmation on-chain
        # blockchain_rpc_url = os.getenv("BLOCKCHAIN_RPC_URL")
        # custodian_registry_address = os.getenv("CUSTODIAN_REGISTRY_ADDRESS")
        # w3 = Web3(Web3.HTTPProvider(blockchain_rpc_url))
        # registry = w3.eth.contract(address=custodian_registry_address, abi=registry_abi)
        # tx_hash = registry.functions.confirmReceipt(
        #     request.transfer_id,
        #     json.dumps(request.condition_report),
        #     request.storage_location
        # ).transact({'from': request.custodian_wallet})
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Mock response
        mock_tx = f"0x{os.urandom(32).hex()}"
        mock_sig = f"0x{os.urandom(65).hex()}"
        
        condition_status = "verified" if request.condition_report.get("matches_manifest", False) else "damaged"
        
        return CustodyConfirmationResponse(
            confirmation_tx=mock_tx,
            custodian_signature=mock_sig,
            condition_status=condition_status,
            storage_location=request.storage_location,
            insurance_active=bool(request.insurance_coverage.get("policy_number")),
            release_authorized=(condition_status == "verified")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to confirm receipt: {str(e)}")

@app.get("/api/custody/transfer/{transfer_id}")
async def get_transfer_status(
    transfer_id: str,
    api_key: str = Depends(verify_api_key)
):
    """Get custody transfer status"""
    # TODO: Query Custodian Registry contract
    pass

