# Server Setup Guide

This guide covers setting up the Aegis Core Docker stack on your server with Supabase integration.

## Prerequisites

- Docker and Docker Compose installed
- Supabase project created
- Server with SSH access
- Environment variables configured

## Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd AegisCore/aegis-docker
```

### 2. Configure Environment Variables

Create a `.env` file in `aegis-docker/`:

```env
# Supabase Connection (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
POSTGRES_HOST=db.your-project.supabase.co
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-supabase-db-password
POSTGRES_SSLMODE=require

# API Keys
BLOCKCHAIN_API_KEY=your-secure-api-key-here
LEGAL_ENTITY_API_KEY=your-secure-api-key-here
QDRANT_API_KEY=your-secure-api-key-here

# Blockchain Configuration
BLOCKCHAIN_RPC_URL=https://your-rpc-endpoint
ERC3643_CONTRACT_ADDRESS=0x...
ISSUER_WALLET_ADDRESS=0x...
ISSUER_WALLET_PRIVATE_KEY=your-private-key

# KYC/AML Providers (Optional)
PERSONA_API_KEY=your-persona-key
ONFIDO_API_KEY=your-onfido-key
BLOCKPASS_API_KEY=your-blockpass-key

# n8n Configuration
N8N_ENCRYPTION_KEY=your-n8n-encryption-key
N8N_HOST=your-domain.com
N8N_PORT=5678

# External APIs
ARTSY_CLIENT_ID=your-artsy-client-id
ARTSY_CLIENT_SECRET=your-artsy-secret
RESERVOIR_API_KEY=your-reservoir-key
MARKET_SLACK_WEBHOOK=https://hooks.slack.com/...

# AI/LLM
AIMLAPI_KEY=your-aimlapi-key
LITELLM_MASTER_KEY=your-litellm-key
LITELLM_SCORING_MODEL=google/gemini-2.5-pro

# Redis
REDIS_PASSWORD=your-redis-password

# AnythingLLM
ANYTHINGLLM_JWT_SECRET=your-jwt-secret
ANYTHINGLLM_PG_SCHEMA=anythingllm

# CORS (adjust for production)
BLOCKCHAIN_CORS_ORIGINS=https://your-frontend.com
LEGAL_ENTITY_CORS_ORIGINS=https://your-frontend.com
QDRANT_CORS_ORIGINS=https://your-frontend.com
```

### 3. Initialize Database

Run the Supabase initialization script:

```bash
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=${POSTGRES_SSLMODE}" -f sql/supabase_init.sql
```

This creates:
- `collector_leads` table
- `art_market_events` table
- `art_movements` table
- `artworks` table

### 4. Build and Start Services

```bash
docker compose build
docker compose up -d
```

### 5. Verify Services

Check all services are running:

```bash
docker compose ps
```

You should see:
- ✅ `aegis-art-redis`
- ✅ `aegis-art-qdrant`
- ✅ `aegis-art-qdrant-api` (port 8080)
- ✅ `aegis-art-blockchain-api` (port 8081)
- ✅ `aegis-art-legal-entity-api` (port 8082)
- ✅ `aegis-art-ollama`
- ✅ `aegis-art-postgrest` (port 3000)
- ✅ `aegis-art-n8n` (port 5678)
- ✅ `aegis-art-litellm` (port 4000)
- ✅ `aegis-art-anythingllm` (port 3001)

### 6. Health Checks

Test each service:

```bash
# Qdrant
curl http://localhost:7333/healthz

# Qdrant API
curl -H "X-API-Key: ${QDRANT_API_KEY}" http://localhost:8080/health

# Blockchain API
curl -H "X-API-Key: ${BLOCKCHAIN_API_KEY}" http://localhost:8081/health

# Legal Entity API
curl -H "X-API-Key: ${LEGAL_ENTITY_API_KEY}" http://localhost:8082/health

# LiteLLM
curl http://localhost:4000/health

# n8n
curl http://localhost:5678/healthz

# PostgREST
curl http://localhost:3000/collector_leads?limit=1
```

### 7. Initialize Qdrant Collection

Create the Qdrant collection for lead matching:

```bash
curl -X PUT http://localhost:7333/collections/aegis_leads \
  -H "Content-Type: application/json" \
  -d '{"vectors": {"size": 768, "distance": "Cosine"}}'
```

### 8. Import n8n Workflows

```bash
docker compose exec n8n n8n import:workflow --separate --input /workflows/lead-scout.json
docker compose exec n8n n8n import:workflow --separate --input /workflows/market-pulse.json
docker compose exec n8n n8n import:workflow --separate --input /workflows/movement-monitor.json
```

## Service Details

### FastAPI Services

#### Blockchain API (Port 8081)
- **Purpose**: ERC-3643 attestations, escrow wallets, custody transfers
- **Endpoints**: `/api/attestations/*`, `/api/wallets/*`, `/api/custody/*`
- **Authentication**: `X-API-Key` header
- **Database**: Connects to Supabase PostgreSQL

#### Legal Entity API (Port 8082)
- **Purpose**: Legal entity creation, KYC/AML verification
- **Endpoints**: `/api/legal-entities/*`, `/api/kyc-aml/*`
- **Authentication**: `X-API-Key` header
- **Database**: Connects to Supabase PostgreSQL

#### Qdrant API (Port 8080)
- **Purpose**: Vector search for lead matching
- **Endpoints**: `/collections/*`
- **Authentication**: `X-API-Key` header
- **Backend**: Connects to Qdrant vector database

### Database Services

#### PostgREST (Port 3000)
- **Purpose**: REST API for PostgreSQL tables
- **Database**: Supabase PostgreSQL
- **Access**: Direct queries to `collector_leads`, `art_market_events`, etc.

### AI/LLM Services

#### LiteLLM (Port 4000)
- **Purpose**: LLM proxy for Gemini 2.5 Pro
- **Configuration**: `config/litellm/litellm.yaml`
- **Usage**: Used by n8n workflows for AI scoring

#### Ollama (Port 11434)
- **Purpose**: Local LLM inference
- **Models**: Embedding models (nomic-embed-text)
- **Usage**: Used by AnythingLLM and n8n workflows

### Workflow Services

#### n8n (Port 5678)
- **Purpose**: Workflow automation
- **Workflows**: Lead Scout, Market Pulse, Movement Monitor
- **Database**: Uses Supabase PostgreSQL for workflow storage

#### AnythingLLM (Port 3001)
- **Purpose**: RAG interface for lead research
- **Vector DB**: Qdrant
- **LLM**: Ollama
- **Database**: Supabase PostgreSQL

## Troubleshooting

### Services Won't Start

1. **Check logs**:
   ```bash
   docker compose logs <service-name>
   ```

2. **Verify environment variables**:
   ```bash
   docker compose config
   ```

3. **Check Supabase connection**:
   ```bash
   psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=${POSTGRES_SSLMODE}" -c "SELECT 1;"
   ```

### API Authentication Errors

- Verify `X-API-Key` header matches environment variable
- Check API key is set in `.env` file
- Restart service after changing API keys

### Database Connection Issues

- Verify Supabase credentials are correct
- Check `POSTGRES_SSLMODE=require` is set
- Ensure Supabase project allows connections from your server IP

### Qdrant Connection Issues

- Verify Qdrant container is running: `docker compose ps qdrant`
- Check Qdrant API can reach Qdrant: `curl http://qdrant:6333/healthz` (from within Docker network)

## Production Considerations

1. **Security**:
   - Use strong API keys
   - Restrict CORS origins
   - Use HTTPS (reverse proxy)
   - Secure `.env` file (never commit)

2. **Monitoring**:
   - Set up health check monitoring
   - Monitor Docker container logs
   - Track API usage and errors

3. **Backups**:
   - Backup Supabase database regularly
   - Backup Qdrant data volumes
   - Backup n8n workflow configurations

4. **Scaling**:
   - Use Docker Swarm or Kubernetes for production
   - Consider load balancing for API services
   - Monitor resource usage

## Next Steps

1. Configure Opus workflows to use these APIs
2. Set up frontend to connect to APIs
3. Test end-to-end workflows
4. Monitor and optimize performance

