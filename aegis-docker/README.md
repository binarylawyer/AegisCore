# AEGIS Profiler Bento

Self-contained bundle of the art-intelligence stack described in docs/aegis-core/PRD_ AegisCore-Global_Art_Marketplace.md (Sec. 7.0 "The Profiler"). Drop this folder into any repo and run the docker compose recipe to get:

- Lead generation workflows that ingest public data (Artsy, GDELT, Reservoir) via n8n
- Local inference (Ollama + LiteLLM) for scoring, embedding, and digesting
- Qdrant + Postgres storage, exposed through PostgREST for quick APIs
- AnythingLLM UI for Camilla/Ari to search the resulting lead graph

```
AEGIS/
├─ docker-compose.yml
├─ .env.example
├─ README.md (this file)
├─ config/
│  └─ litellm/litellm.yaml
├─ sql/
│  └─ aegis_art_intel_init.sql
└─ workflows/
   ├─ lead-scout.json
   ├─ market-pulse.json
   └─ movement-monitor.json
```

## Quick Start

1. Copy `.env.example` to `.env` and fill every placeholder.
2. (Optional) Pull an embedding model once: `docker exec -it aegis-art-ollama ollama pull nomic-embed-text`.
3. Start the stack:
   ```bash
   docker compose up -d
   ```
4. Create the Qdrant collection used by AnythingLLM + n8n:
   ```bash
   curl -X PUT http://localhost:6333/collections/aegis_leads \
     -H "Content-Type: application/json" \
     -d '{ "vectors": { "size": 768, "distance": "Cosine" } }'
   ```
5. Import the workflows:
   ```bash
   docker compose exec n8n n8n import:workflow --separate --input /workflows/lead-scout.json
   docker compose exec n8n n8n import:workflow --separate --input /workflows/market-pulse.json
   docker compose exec n8n n8n import:workflow --separate --input /workflows/movement-monitor.json
   ```
6. Open AnythingLLM at http://localhost:3001, point a workspace at the `aegis_leads` collection, and start asking for potential collectors similar to the artwork you care about.

## Workflow overview

| File | Purpose |
| --- | --- |
| `lead-scout.json` | 6h cron → Artsy shows → LiteLLM scoring → Qdrant + Postgres + Slack alert. Aligns with FR-7.1.1 through FR-7.1.5. |
| `market-pulse.json` | Daily (07:00 UTC) art-market digest via GDELT, writes structured events and sends Markdown brief. |
| `movement-monitor.json` | 12h sweep merging physical logistics (GDELT) + on-chain transfers (Reservoir API) with Slack alerts on high-risk events. |

## Services (docker-compose.yml)

- `postgres`, `postgrest`, `qdrant`, `redis`: storage/search/backing services.
- `ollama`, `litellm`: inference + scoring (LiteLLM config mounted from `config/litellm/litellm.yaml`).
- `n8n`: workflow engine (mounts `/workflows`).
- `anythingllm`: UI for research + Profiler-style search.

## Notes

- Make sure Artsy and Reservoir API keys are valid; the workflows will fail fast if not.
- Slack webhook is optional but recommended for alerting.
- Adjust cron schedules inside n8n if you need tighter cadences for the hackathon demo.
