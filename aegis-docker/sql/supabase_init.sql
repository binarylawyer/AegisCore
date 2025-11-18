-- Bootstrap script for running the Profiler tables on a managed Postgres
-- instance (e.g., Supabase). Run this once with psql:
--   PGPASSWORD=... psql "host=<host> port=<port> dbname=<db> user=<user> sslmode=require" -f supabase_init.sql

SET statement_timeout TO 0;
SET lock_timeout TO 0;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS n8n AUTHORIZATION CURRENT_USER;
CREATE SCHEMA IF NOT EXISTS anythingllm AUTHORIZATION CURRENT_USER;

CREATE TABLE IF NOT EXISTS public.collector_leads (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id     text UNIQUE NOT NULL,
    full_name       text,
    organization    text,
    role            text,
    region          text,
    medium_focus    text,
    likelihood      numeric(5,2) DEFAULT 0.50,
    persona_tags    text[] DEFAULT ARRAY[]::text[],
    lead_summary    text,
    source          jsonb DEFAULT '{}'::jsonb,
    source_url      text,
    last_seen_at    timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.art_market_events (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    headline        text NOT NULL,
    summary         text,
    source_name     text,
    source_url      text,
    impact_score    numeric(5,2) DEFAULT 0.00,
    topics          text[] DEFAULT ARRAY[]::text[],
    geography       jsonb DEFAULT '{}'::jsonb,
    published_at    timestamptz,
    ingested_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.art_movements (
    id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_label        text,
    asset_type         text,
    movement_class     text,
    origin_region      text,
    destination_region text,
    channel            text,
    attention_score    numeric(5,2) DEFAULT 0.00,
    metadata           jsonb DEFAULT '{}'::jsonb,
    observed_at        timestamptz,
    ingested_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_collector_leads_likelihood ON public.collector_leads (likelihood DESC);
CREATE INDEX IF NOT EXISTS idx_art_market_events_published_at ON public.art_market_events (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_art_movements_observed_at ON public.art_movements (observed_at DESC);

COMMENT ON TABLE public.collector_leads IS 'Lead candidates produced by the n8n "Lead Scout" workflow.';
COMMENT ON TABLE public.art_market_events IS 'News and intelligence captured by the "Market Pulse" workflow.';
COMMENT ON TABLE public.art_movements IS 'Movement alerts from the "Movement Monitor" workflow.';
