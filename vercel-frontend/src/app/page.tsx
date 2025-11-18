import { supabase } from "@/lib/supabaseClient";

const MAX_ROWS = 12;

type Lead = {
  id: string;
  full_name: string | null;
  organization: string | null;
  region: string | null;
  likelihood: number | null;
  persona_tags: string[] | null;
  source_url: string | null;
  updated_at: string | null;
};

type MarketEvent = {
  id: string;
  headline: string;
  summary: string | null;
  source_name: string | null;
  source_url: string | null;
  impact_score: number | null;
  published_at: string | null;
};

type Movement = {
  id: string;
  asset_label: string | null;
  movement_class: string | null;
  origin_region: string | null;
  destination_region: string | null;
  attention_score: number | null;
  observed_at: string | null;
};

async function fetchLeads() {
  const { data, error } = await supabase
    .from("collector_leads")
    .select(
      "id, full_name, organization, region, likelihood, persona_tags, source_url, updated_at",
    )
    .order("updated_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) {
    return { data: [] as Lead[], error: error.message };
  }

  return { data: (data ?? []) as Lead[], error: null };
}

async function fetchMarketPulse() {
  const { data, error } = await supabase
    .from("art_market_events")
    .select("id, headline, summary, source_name, source_url, impact_score, published_at")
    .order("published_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) {
    return { data: [] as MarketEvent[], error: error.message };
  }

  return { data: (data ?? []) as MarketEvent[], error: null };
}

async function fetchMovements() {
  const { data, error } = await supabase
    .from("art_movements")
    .select(
      "id, asset_label, movement_class, origin_region, destination_region, attention_score, observed_at",
    )
    .order("observed_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) {
    return { data: [] as Movement[], error: error.message };
  }

  return { data: (data ?? []) as Movement[], error: null };
}

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Unknown";

export default async function Home() {
  const [leads, marketPulse, movements] = await Promise.all([
    fetchLeads(),
    fetchMarketPulse(),
    fetchMovements(),
  ]);

  const hasError = leads.error || marketPulse.error || movements.error;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 bg-white px-6 py-12 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <header className="space-y-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">Aegis Profiler</p>
        <h1 className="text-3xl font-semibold">Curator Command Console</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Live intelligence from the Supabase graph. This dashboard is optimized for Vercel edge deployments and feeds
          the Opus External Service nodes with a single, queryable surface.
        </p>
        {hasError ? (
          <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-100">
            {leads.error && <p>Leads: {leads.error}</p>}
            {marketPulse.error && <p>Market Pulse: {marketPulse.error}</p>}
            {movements.error && <p>Movement Monitor: {movements.error}</p>}
          </div>
        ) : null}
      </header>

      <section className="grid gap-8 lg:grid-cols-3">
        <article className="col-span-2 space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Lead Graph</p>
              <h2 className="text-2xl font-semibold">Active Collector Matches</h2>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200">
              {leads.data.length}
            </span>
          </div>
          <div className="grid gap-4">
            {leads.data.map((lead) => (
              <div key={lead.id} className="rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-medium">{lead.full_name ?? lead.organization ?? "Unnamed Contact"}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{lead.organization ?? "Independent"}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-300">{lead.likelihood?.toFixed(2) ?? "--"}</p>
                    <p className="text-xs text-zinc-500">Likelihood</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {lead.region && <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">{lead.region}</span>}
                  {(lead.persona_tags ?? []).map((tag) => (
                    <span key={`${lead.id}-${tag}`} className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-100">
                      {tag}
                    </span>
                  ))}
                  <span>Updated {formatDate(lead.updated_at)}</span>
                </div>
                {lead.source_url ? (
                  <a
                    href={lead.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    View source ↗
                  </a>
                ) : null}
              </div>
            ))}
            {!leads.data.length && <p className="text-sm text-zinc-500">No leads available yet. Trigger the workflows from Opus to populate this table.</p>}
          </div>
        </article>

        <div className="space-y-6">
          <article className="space-y-3 rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Market Pulse</h3>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100">
                {marketPulse.data.length}
              </span>
            </div>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {marketPulse.data.map((event) => (
                <div key={event.id} className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{event.headline}</p>
                  {event.summary && <p className="mt-1 text-xs">{event.summary}</p>}
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>{event.source_name ?? "Unknown source"}</span>
                    <span>{formatDate(event.published_at)}</span>
                  </div>
                  {event.source_url && (
                    <a href={event.source_url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-300">
                      Brief ↗
                    </a>
                  )}
                </div>
              ))}
              {!marketPulse.data.length && <p>No market events captured yet.</p>}
            </div>
          </article>

          <article className="space-y-3 rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Movement Monitor</h3>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-100">
                {movements.data.length}
              </span>
            </div>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {movements.data.map((movement) => (
                <div key={movement.id} className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{movement.asset_label ?? "Unknown asset"}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{movement.movement_class ?? "UNCLASSIFIED"}</p>
                  <div className="mt-2 text-xs">
                    <p>
                      {movement.origin_region ?? "Unknown"} → {movement.destination_region ?? "Unknown"}
                    </p>
                    <p>Observed {formatDate(movement.observed_at)}</p>
                  </div>
                  {typeof movement.attention_score === "number" && (
                    <p className="mt-2 text-right text-xs font-semibold text-amber-600 dark:text-amber-300">
                      Attention score: {movement.attention_score.toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
              {!movements.data.length && <p>No movement alerts logged.</p>}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
