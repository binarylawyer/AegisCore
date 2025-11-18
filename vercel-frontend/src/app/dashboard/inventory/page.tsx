"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  year: string | null;
  price: number;
  currency: string;
  status: string;
  tokenized: boolean;
  custody_location: string | null;
  image_urls: string[] | null;
};

export default function InventoryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "listed" | "draft" | "tokenized">("all");

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching artworks:', error);
        return;
      }

      setArtworks(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtworks =
    filter === "all"
      ? artworks
      : filter === "tokenized"
        ? artworks.filter((a) => a.tokenized)
        : artworks.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Inventory
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your art collection and track tokenization status
          </p>
        </div>
        <Link
          href="/dashboard/upload"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Upload New Artwork
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {(["all", "listed", "draft", "tokenized"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === filterOption
                ? "bg-indigo-600 text-white"
                : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Artworks Grid */}
      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">Loading artworks...</p>
        </div>
      ) : filteredArtworks.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No artworks found.{" "}
            <Link href="/dashboard/upload" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Upload your first artwork
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/dashboard/inventory/${artwork.id}`}
              className="group rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-zinc-100 dark:bg-zinc-800">
                {artwork.image_urls && artwork.image_urls.length > 0 ? (
                  <img
                    src={artwork.image_urls[0]}
                    alt={artwork.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-400">
                    <svg
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {artwork.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {artwork.artist} • {artwork.year || 'N/A'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {artwork.currency} {artwork.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    {artwork.tokenized && (
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                        Tokenized
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        artwork.status === "listed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      }`}
                    >
                      {artwork.status}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {artwork.custody_location || 'No custody location'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

