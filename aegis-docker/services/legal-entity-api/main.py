from fastapi import FastAPI, HTTPException, Header, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
import os
import json

app = FastAPI(title="Aegis Legal Entity Filing API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_KEY", "change-me-in-production")

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

# Models
class LegalEntityRequest(BaseModel):
    entity_type: str  # "series_llc" | "coop" | "partnership"
    collector_wallet: str
    artwork_id: str
    gallery_id: str
    lead_id: str
    jurisdiction: str = "Delaware"
    entity_name: Optional[str] = None
    # Pre-populated data
    collector_data: Dict[str, str]  # Name, address, etc.
    artwork_data: Dict[str, str]  # Title, artist, value, etc.

class DocumentGenerationRequest(BaseModel):
    entity_id: str
    entity_type: str
    template_data: Dict[str, Any]
    form_fields: Dict[str, str]  # Fields filled by HITL

class LegalEntityResponse(BaseModel):
    entity_id: str
    entity_type: str
    status: str  # "draft" | "pending_review" | "filed" | "active"
    document_url: Optional[str] = None
    filing_reference: Optional[str] = None
    review_task_id: Optional[str] = None  # For Opus HITL

class KYCAMLRequest(BaseModel):
    lead_id: str
    collector_wallet: str
    collector_data: Dict[str, str]
    kyc_provider: str = "persona"  # "persona" | "onfido" | "blockpass"

class KYCAMLResponse(BaseModel):
    lead_id: str
    kyc_status: str  # "pending" | "passed" | "failed" | "flagged"
    aml_status: str  # "pending" | "passed" | "failed" | "flagged"
    provider: str
    verification_id: Optional[str] = None
    issues: List[str] = []
    risk_score: float = 0.0  # 0.0 (low) to 1.0 (high)

# Endpoints
@app.get("/health")
async def health():
    return {"status": "healthy", "service": "legal-entity-api"}

@app.post("/api/legal-entities/create", response_model=LegalEntityResponse)
async def create_legal_entity(
    request: LegalEntityRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Create legal entity (Series LLC, Co-op, or Partnership).
    
    Pre-populates forms with collector and artwork data.
    Returns draft document ready for HITL review.
    """
    try:
        entity_id = request.entity_name or f"{request.entity_type.upper()}-{datetime.now().strftime('%Y-%m%d')}-{request.artwork_id[-4:]}"
        
        # Pre-populate form data
        form_data = {
            "entity_type": request.entity_type,
            "entity_name": entity_id,
            "jurisdiction": request.jurisdiction,
            "collector": {
                "name": request.collector_data.get("name", ""),
                "address": request.collector_data.get("address", ""),
                "email": request.collector_data.get("email", ""),
                "wallet": request.collector_wallet
            },
            "artwork": {
                "title": request.artwork_data.get("title", ""),
                "artist": request.artwork_data.get("artist", ""),
                "value": request.artwork_data.get("value", ""),
                "artwork_id": request.artwork_id
            },
            "gallery_id": request.gallery_id,
            "lead_id": request.lead_id,
            "created_at": datetime.now().isoformat()
        }
        
        # Generate document template based on entity type
        if request.entity_type == "series_llc":
            template = "series_llc_operating_agreement"
        elif request.entity_type == "coop":
            template = "art_cooperative_agreement"
        elif request.entity_type == "partnership":
            template = "art_partnership_agreement"
        else:
            template = "generic_entity_agreement"
        
        # Create review task for Opus HITL
        review_task_id = f"REVIEW-{entity_id}-{datetime.now().timestamp()}"
        
        return LegalEntityResponse(
            entity_id=entity_id,
            entity_type=request.entity_type,
            status="pending_review",
            document_url=f"/api/documents/{entity_id}/preview",
            filing_reference=None,
            review_task_id=review_task_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create legal entity: {str(e)}")

@app.post("/api/legal-entities/{entity_id}/complete", response_model=LegalEntityResponse)
async def complete_legal_entity(
    entity_id: str,
    request: DocumentGenerationRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Complete legal entity filing after HITL review.
    
    Merges pre-populated data with HITL-filled fields and files entity.
    """
    try:
        # Merge template data with HITL form fields
        final_document = {
            **request.template_data,
            **request.form_fields,
            "completed_at": datetime.now().isoformat(),
            "reviewed_by": request.form_fields.get("reviewer_name", "HITL Reviewer")
        }
        
        # TODO: File with jurisdiction (Delaware, etc.)
        # filing_reference = file_with_jurisdiction(final_document)
        
        # Mock filing reference
        filing_reference = f"DE-2024-{entity_id}"
        
        return LegalEntityResponse(
            entity_id=entity_id,
            entity_type=request.entity_type,
            status="filed",
            document_url=f"/api/documents/{entity_id}/final",
            filing_reference=filing_reference,
            review_task_id=None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to complete legal entity: {str(e)}")

@app.get("/api/legal-entities/{entity_id}/document")
async def get_document(
    entity_id: str,
    api_key: str = Depends(verify_api_key)
):
    """Get legal entity document (preview or final)"""
    # TODO: Return actual document PDF or HTML
    return {
        "entity_id": entity_id,
        "document_type": "operating_agreement",
        "status": "draft",
        "preview_url": f"/api/documents/{entity_id}/preview"
    }

@app.post("/api/kyc-aml/verify", response_model=KYCAMLResponse)
async def verify_kyc_aml(
    request: KYCAMLRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Verify KYC/AML via 3rd party provider.
    
    Simulates calling Persona, Onfido, or Blockpass API.
    Returns pass/fail status for Opus workflow.
    """
    try:
        # TODO: Integrate with actual KYC/AML providers
        # Example: Persona API
        # persona_api_key = os.getenv("PERSONA_API_KEY")
        # response = requests.post(
        #     "https://api.persona.com/inquiries",
        #     headers={"Authorization": f"Bearer {persona_api_key}"},
        #     json={"data": request.collector_data}
        # )
        # result = response.json()
        
        # Mock response for demo
        # In production, this would call actual KYC provider
        verification_id = f"VERIFY-{request.lead_id}-{datetime.now().timestamp()}"
        
        # Simulate KYC check
        kyc_status = "passed"  # Could be "pending", "passed", "failed", "flagged"
        aml_status = "passed"
        risk_score = 0.2  # Low risk
        
        # Simulate potential issues
        issues = []
        if request.collector_data.get("country", "").upper() in ["XX", "YY"]:  # Sanctioned countries
            aml_status = "flagged"
            issues.append("Country of residence flagged for AML review")
            risk_score = 0.8
        
        if not request.collector_data.get("identification_number"):
            kyc_status = "failed"
            issues.append("Missing identification number")
        
        return KYCAMLResponse(
            lead_id=request.lead_id,
            kyc_status=kyc_status,
            aml_status=aml_status,
            provider=request.kyc_provider,
            verification_id=verification_id,
            issues=issues,
            risk_score=risk_score
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to verify KYC/AML: {str(e)}")

@app.get("/api/kyc-aml/status/{verification_id}")
async def get_kyc_status(
    verification_id: str,
    api_key: str = Depends(verify_api_key)
):
    """Get KYC/AML verification status"""
    # TODO: Query provider API for status
    return {
        "verification_id": verification_id,
        "kyc_status": "passed",
        "aml_status": "passed",
        "risk_score": 0.2
    }

@app.post("/api/documents/pre-populate")
async def pre_populate_from_file(
    file: UploadFile = File(...),
    entity_type: str = "series_llc",
    api_key: str = Depends(verify_api_key)
):
    """
    Pre-populate legal entity form from uploaded spreadsheet or PDF.
    
    Accepts CSV, Excel, or PDF and extracts relevant data.
    """
    try:
        # TODO: Parse file and extract data
        # - CSV/Excel: Parse rows and columns
        # - PDF: OCR and extract structured data
        
        # Mock response
        extracted_data = {
            "collector_name": "Extracted from file",
            "collector_address": "Extracted from file",
            "artwork_title": "Extracted from file",
            "artwork_value": "Extracted from file"
        }
        
        return {
            "status": "success",
            "extracted_data": extracted_data,
            "entity_type": entity_type,
            "fields_found": list(extracted_data.keys())
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to pre-populate: {str(e)}")

