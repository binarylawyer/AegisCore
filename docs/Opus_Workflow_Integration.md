# Opus ↔ Profiler Integration Plan

This note documents how the Opus “Collector Vetting” workflow connects to the Profiler/FastAPI/Qdrant stack that runs in `aegis-docker`.

## 1. Backend Checklist

1. **Hetzner server**
   - `ssh sushi@<server>` and `cd /path/to/AegisCore/aegis-docker`.
   - `docker compose ps` → verify `redis`, `qdrant`, `profiler-api` (FastAPI), `n8n`, `anythingllm`, and the database layer are running.
2. **Health probes**
   - Qdrant: `curl http://localhost:6333/healthz`.
   - FastAPI: `curl http://localhost:<fastapi-port>/docs`.
   - n8n: `curl http://localhost:5678/healthz`.
   - PostgREST or Supabase equivalent: `curl http://localhost:3000/collector_leads?limit=1`.
3. **Workflows & data**
   - Create/import n8n workflows in `aegis-docker/workflows`.
   - Create Qdrant collection: `curl -X PUT http://localhost:6333/collections/aegis_leads -H "Content-Type: application/json" -d '{"vectors":{"size":768,"distance":"Cosine"}}'`.
4. **Repo sync**
   - After any docker-compose change, commit and push so the repo matches the deployed stack before the hackathon submission.

## 2. FastAPI Endpoints

FastAPI acts as the secure bridge between Opus and the local services (Supabase/Postgres + Qdrant). Minimum routes:

| Method | Route | Purpose |
| ------ | ----- | ------- |
| `POST` | `/leads` | Store lead metadata in Supabase; upsert embeddings into local Qdrant. Returns `lead_ref`. |
| `POST` | `/vetting-complete` | Update lead status (`approved`/`rejected`) with notes + compliance outputs so dashboards refresh. |
| `POST` | `/attestations/mint` | Trigger the blockchain attestation service; respond with `tx_hash`/status. |
| `POST` | `/attestations/complete` | Final callback after minting; records the attestation hash and notifies downstream services (n8n, Collector Portal). |

All routes should require API keys or Supabase JWT verification. FastAPI talks to Qdrant through the internal docker network (`http://qdrant:6333`).

## 3. Opus Workflow Mapping

| Opus Node | Action |
| --------- | ------ |
| **Workflow Input** | Expose as an External Service webhook. Sushi Kitchen or n8n posts `{lead_id, artwork_id, gallery_id, collector_details}` to start the vetting flow. |
| **Store Collector Lead Data** | HTTP node → `POST /leads` (FastAPI). Output the returned `lead_ref` for later steps. |
| **Check Collector Compliance** | Automated External Service nodes hitting AML/KYC APIs. Outputs `compliance_status` + `compliance_notes`. |
| **Review – Check Compliance** | Human/agentic review of the automated findings. |
| **Prepare Approval Package** | Combine `lead_ref`, compliance outputs, and any documentation to set up the reviewer. |
| **Approve or Reject Collector Lead (review node)** | Human decision. On approval, continue; on rejection, call `POST /vetting-complete` with `{status:"rejected"}`. |
| **Mint Blockchain Attestation** | External Service node calling `POST /attestations/mint` with lead/artwork/gallery IDs and approval metadata. |
| **Review – Mint Blockchain Attestation** | Optional review to confirm the tx hash/result. |
| **Workflow Output** | Final External Service node calling `POST /attestations/complete` (or reuse `/vetting-complete`) to store the tx hash and mark the lead as “Vetted – Tier X”. |

## 4. Execution Flow

1. **Submit from Sushi Kitchen** → Webhook to Opus and `/leads`.
2. **Opus compliance steps** → run automated checks + human review.
3. **Approval branch**:
   - Call `/vetting-complete` with `approved` status.
   - Mint attestation via `/attestations/mint`; confirm result.
   - Call `/attestations/complete` with the tx hash.
4. **Rejection branch**:
   - Call `/vetting-complete` with `rejected` status; no blockchain step.
5. **Downstream effects**:
   - n8n watches Supabase for status updates → notifies galleries/collectors.
   - Collector Portal polls the attestation service or listens to the chain to flip the `canTransfer` button.

This document should be updated whenever the FastAPI routes or Opus workflow change so the integration remains traceable.
