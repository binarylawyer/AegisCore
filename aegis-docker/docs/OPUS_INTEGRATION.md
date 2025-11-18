# Opus Integration Guide

This document explains how to integrate Aegis Core's docker-compose stack with Opus workflows, enabling law firms to use Opus while maintaining control over vector databases and advanced workflows.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Law Firm / Bank / CPA                     │
│                      (Opus Workflows)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collector Vetting Workflow                          │   │
│  │  - Check Compliance (Gemini 2.5 Pro via AIML API)   │   │
│  │  - Human-in-the-Loop Reviews                         │   │
│  │  - Blockchain Attestation                            │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/HTTPS
                        │ External Service Nodes
                        │
┌───────────────────────┴─────────────────────────────────────┐
│              Aegis Core Docker Stack                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  FastAPI Gateway (Qdrant API)                        │   │
│  │  - Vector Search Endpoints                           │   │
│  │  - Collection Management                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Qdrant (Vector Database)                             │   │
│  │  - Lead embeddings                                    │   │
│  │  - Art market intelligence                            │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  n8n (Advanced Workflows)                             │   │
│  │  - Lead generation                                    │   │
│  │  - Market pulse                                       │   │
│  │  - Movement monitoring                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  LiteLLM (Gemini 2.5 Pro Proxy)                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Key Integration Points

### 1. **Qdrant Access from Opus**

Opus can access your Qdrant instance via External Service Nodes. You have two options:

#### Option A: Direct Qdrant API (Simple)
- Qdrant exposes REST API on port `7333`
- Opus External Service Node calls Qdrant directly
- **Pros**: Simple, no additional services
- **Cons**: Less control, no authentication layer

#### Option B: FastAPI Gateway (Recommended)
- FastAPI service acts as API gateway
- Provides authentication, rate limiting, and custom endpoints
- **Pros**: Full control, security, custom logic
- **Cons**: Additional service to maintain

### 2. **Gemini 2.5 Pro Integration**

Opus workflows call Gemini 2.5 Pro via:
- **Direct**: AIML API (recommended for Opus)
- **Via LiteLLM**: Your docker stack's LiteLLM proxy (if you want unified logging/caching)

## Setup Instructions

### Step 1: Add FastAPI Gateway (Recommended)

Add this service to your `docker-compose.yml`:

```yaml
  qdrant-api:
    build:
      context: ./services/qdrant-api
      dockerfile: Dockerfile
    container_name: aegis-art-qdrant-api
    restart: unless-stopped
    depends_on:
      qdrant:
        condition: service_started
    environment:
      QDRANT_HOST: qdrant
      QDRANT_PORT: 6333
      QDRANT_GRPC_PORT: 6334
      API_KEY: "${QDRANT_API_KEY:-change-me-in-production}"
      CORS_ORIGINS: "${QDRANT_CORS_ORIGINS:-*}"
    ports:
      - "8080:8080"
    networks:
      - aegis-bento-net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 5
```

### Step 2: Create FastAPI Service

Create `services/qdrant-api/main.py`:

```python
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
```

Create `services/qdrant-api/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

Create `services/qdrant-api/requirements.txt`:

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
qdrant-client==1.7.0
pydantic==2.5.0
```

### Step 3: Expose Qdrant to Opus

#### Option A: Direct Qdrant Access

In Opus External Service Node:
- **URL**: `http://your-server:7333/collections/{collection_name}/points/search`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "vector": [0.1, 0.2, ...],
    "limit": 10,
    "with_payload": true
  }
  ```

#### Option B: FastAPI Gateway (Recommended)

In Opus External Service Node:
- **URL**: `http://your-server:8080/collections/{collection_name}/search`
- **Method**: `POST`
- **Headers**: 
  ```
  X-API-Key: your-api-key
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "collection_name": "aegis_leads",
    "query_vector": [0.1, 0.2, ...],
    "limit": 10,
    "score_threshold": 0.7
  }
  ```

### Step 4: Configure Opus Workflow for Compliance Check

Based on your screenshots, here's how to configure the "Check Collector Compliance" node:

#### Using External Service Node for LLM Analysis

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
           "content": "You are a compliance analyst for Aegis Core. Analyze collector details for regulatory compliance. Check identification number format, address completeness, and verify all required fields. Respond with JSON: {\"compliance_status\": \"compliant\"|\"non-compliant\", \"compliance_notes\": \"detailed explanation\", \"issues\": [\"issue1\", \"issue2\"]}"
         },
         {
           "role": "user",
           "content": "Collector Details:\nName: {{ $workflow.collector_details.name }}\nEmail: {{ $workflow.collector_details.email }}\nPhone: {{ $workflow.collector_details.phone }}\nAddress: {{ $workflow.collector_details.address }}"
         }
       ],
       "max_tokens": 15000,
       "temperature": 0.2,
       "response_format": {
         "type": "json_object"
       }
     }
     ```

3. **Parse Response** (Code Node):
   ```javascript
   const response = $previous_node.json;
   const content = JSON.parse(response.choices[0].message.content);
   
   return {
     compliance_status: content.compliance_status,
     compliance_notes: content.compliance_notes,
     issues: content.issues || []
   };
   ```

4. **Connect** parsed output to "Check Collector Compliance" node inputs

### Step 5: Integrate Qdrant Search for Lead Matching

Add External Service Node to search for similar collectors:

- **URL**: `http://your-server:8080/collections/aegis_leads/search`
- **Method**: `POST`
- **Headers**:
  ```
  X-API-Key: {{ $env.QDRANT_API_KEY }}
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "collection_name": "aegis_leads",
    "query_vector": [/* embedding vector */],
    "limit": 5,
    "score_threshold": 0.8
  }
  ```

## Environment Variables

Add to your `.env`:

```bash
# Qdrant API Gateway
QDRANT_API_KEY=your-secure-api-key-here
QDRANT_CORS_ORIGINS=https://app.opus.com,https://workflow.opus.com

# AIML API (for Opus workflows)
AIMLAPI_KEY=your-aimlapi-key-here
```

In Opus, add environment variables:
- `AIMLAPI_KEY`: Your AIML API key
- `QDRANT_API_KEY`: Your Qdrant API gateway key
- `QDRANT_ENDPOINT`: `http://your-server:8080`

## n8n Integration with Opus

n8n can trigger Opus workflows or be triggered by Opus:

### n8n → Opus

In n8n workflow, add HTTP Request node:
- **URL**: `https://app.opus.com/api/workflows/{workflow_id}/trigger`
- **Method**: `POST`
- **Body**: Collector data

### Opus → n8n

In Opus External Service Node:
- **URL**: `http://your-server:5678/webhook/{webhook_id}`
- **Method**: `POST`
- **Body**: Workflow data

## Architecture Benefits

### For Law Firms (Opus)
- ✅ Simple visual workflow builder
- ✅ No infrastructure management
- ✅ Built-in human-in-the-loop
- ✅ Compliance audit trails
- ✅ Easy onboarding

### For IT Pros (Docker Stack)
- ✅ Full control over data
- ✅ Custom workflows (n8n)
- ✅ Vector database control
- ✅ Advanced integrations
- ✅ Self-hosted option

### Hybrid Approach
- Law firms use Opus for compliance workflows
- Your stack provides:
  - Vector search (Qdrant)
  - Lead generation (n8n)
  - Market intelligence
  - Advanced analytics

## Security Considerations

1. **API Keys**: Use strong, unique keys for Qdrant API gateway
2. **CORS**: Restrict CORS origins to Opus domains
3. **Network**: Use VPN or private network if possible
4. **HTTPS**: Use HTTPS in production (reverse proxy with Let's Encrypt)
5. **Rate Limiting**: Add rate limiting to FastAPI gateway

## Next Steps

1. ✅ Add FastAPI gateway to docker-compose
2. ✅ Configure Opus External Service Nodes
3. ✅ Test Qdrant search from Opus
4. ✅ Configure Gemini 2.5 Pro integration
5. ✅ Set up n8n webhooks for Opus triggers
6. ✅ Document workflow connections

## Troubleshooting

### Qdrant Connection Issues
- Check Qdrant is running: `docker ps | grep qdrant`
- Verify port 7333 is accessible
- Check network connectivity

### Opus External Service Node Errors
- Verify API keys are set in Opus environment variables
- Check CORS settings if accessing from browser
- Review Opus workflow logs

### FastAPI Gateway Issues
- Check logs: `docker logs aegis-art-qdrant-api`
- Verify QDRANT_HOST and QDRANT_PORT environment variables
- Test health endpoint: `curl http://localhost:8080/health`

