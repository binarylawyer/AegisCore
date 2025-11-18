from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(title="Aegis Qdrant API Gateway")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Qdrant client
qdrant_client = QdrantClient(
    host=os.getenv("QDRANT_HOST", "qdrant"),
    port=int(os.getenv("QDRANT_PORT", "6333")),
    grpc_port=int(os.getenv("QDRANT_GRPC_PORT", "6334")),
)

# API Key validation
API_KEY = os.getenv("API_KEY", "change-me-in-production")

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

# Models
class SearchRequest(BaseModel):
    collection_name: str
    query_vector: List[float]
    limit: int = 10
    score_threshold: Optional[float] = None
    filter: Optional[dict] = None

class SearchResult(BaseModel):
    id: str
    score: float
    payload: dict

class SearchResponse(BaseModel):
    results: List[SearchResult]

# Endpoints
@app.get("/health")
async def health():
    return {"status": "healthy", "qdrant": "connected"}

@app.post("/collections/{collection_name}/search", response_model=SearchResponse)
async def search_collection(
    collection_name: str,
    request: SearchRequest,
    api_key: str = Depends(verify_api_key)
):
    """Search a Qdrant collection"""
    try:
        results = qdrant_client.search(
            collection_name=collection_name,
            query_vector=request.query_vector,
            limit=request.limit,
            score_threshold=request.score_threshold,
            query_filter=request.filter,
        )
        
        return SearchResponse(
            results=[
                SearchResult(
                    id=str(r.id),
                    score=r.score,
                    payload=r.payload
                )
                for r in results
            ]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/collections")
async def list_collections(api_key: str = Depends(verify_api_key)):
    """List all collections"""
    try:
        collections = qdrant_client.get_collections()
        return {"collections": [c.name for c in collections.collections]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/collections/{collection_name}/info")
async def collection_info(
    collection_name: str,
    api_key: str = Depends(verify_api_key)
):
    """Get collection information"""
    try:
        info = qdrant_client.get_collection(collection_name)
        return {
            "name": collection_name,
            "vectors_count": info.vectors_count,
            "points_count": info.points_count,
            "config": info.config.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

