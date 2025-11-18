"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type MarketEvent = {
  id: string;
  headline: string;
  summary: string | null;
  source_name: string | null;
  source_url: string | null;
  impact_score: number | null;
  topics: string[] | null;
  published_at: string | null;
};

export default function MarketIntelligencePage() {
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "high-impact">("all");

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  async function fetchEvents() {
    setLoading(true);
    try {
      let query = supabase
        .from("art_market_events")
        .select("id, headline, summary, source_name, source_url, impact_score, topics, published_at")
        .order("published_at", { ascending: false })
        .limit(50);

      if (filter === "high-impact") {
        query = query.gte("impact_score", 0.7);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } else {
        setEvents((data as MarketEvent[]) || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleDateString(undefined, { dateStyle: "long" }) : "Unknown";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Market Intelligence
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Real-time insights from the global art market, powered by AI and vector search
          </p>
        </div>

        {/* How It Works */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-900/20">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            How Market Intelligence Works
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Our AI-powered pipeline continuously ingests and processes public art market documents—auction catalogs, art magazine articles, museum press releases, and news sources. Using Google AI (Vertex AI) for OCR and multimodal embeddings, we store these insights in our PostgreSQL database with pgvector for semantic search. This enables galleries, collectors, and legal professionals to discover relevant market events, trends, and opportunities.
          </p>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-8 flex space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("high-impact")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "high-impact"
                ? "bg-indigo-600 text-white"
                : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            High Impact Only
          </button>
        </div>

        {/* Events List */}
        <div className="mx-auto mt-8 max-w-4xl">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-500 dark:text-zinc-400">
                No market events available yet. Events will appear here as our ingestion pipeline processes public art market data.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {event.headline}
                      </h3>
                      {event.summary && (
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{event.summary}</p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        {event.source_name && (
                          <span className="flex items-center">
                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            {event.source_name}
                          </span>
                        )}
                        <span>{formatDate(event.published_at)}</span>
                        {event.impact_score !== null && (
                          <span className="flex items-center">
                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Impact: {(event.impact_score * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                      {event.topics && event.topics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {event.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {event.source_url && (
                      <a
                        href={event.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-4 flex-shrink-0 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Value Proposition */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            How This Helps You
          </h2>
          <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">For Galleries:</strong> Stay informed about market trends, auction results, and collector movements to identify opportunities and time your listings strategically.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">For Collectors:</strong> Track market dynamics, understand pricing trends, and discover emerging artists and movements before they become mainstream.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">For Legal Professionals:</strong> Monitor regulatory developments, compliance requirements, and market risks to better advise your clients.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">For Custodians & Insurers:</strong> Track art movements, understand market volatility, and assess risk factors for insured artworks.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

