"use client";

import { useState } from "react";
import Link from "next/link";

type SearchResult = {
  id: string;
  source_document: string;
  similarity_score: number;
  implied_keywords: string[];
  medium_focus: string | null;
  region: string | null;
};

export default function ProfilerPage() {
  const [searchType, setSearchType] = useState<"image" | "text">("text");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual Qdrant search via API
    // This would:
    // 1. If image: Upload to Google Cloud Storage, generate embedding via Google AI
    // 2. If text: Generate embedding via Google AI
    // 3. Search Qdrant vector database for similar documents
    // 4. Return source documents (NOT names or PII)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock results - in production, these would come from Qdrant
      const mockResults: SearchResult[] = [
        {
          id: "1",
          source_document: "Sotheby's Contemporary Art Catalog, May 2024, Page 45",
          similarity_score: 0.92,
          implied_keywords: ["minimalist", "sculpture", "contemporary"],
          medium_focus: "Sculpture",
          region: "New York",
        },
        {
          id: "2",
          source_document: "Christie's Post-War & Contemporary Art Evening Sale, March 2024, Lot 23",
          similarity_score: 0.87,
          implied_keywords: ["abstract", "painting", "1960s"],
          medium_focus: "Painting",
          region: "London",
        },
        {
          id: "3",
          source_document: "Artforum Magazine, April 2024 - 'Emerging Trends in Minimalist Sculpture'",
          similarity_score: 0.84,
          implied_keywords: ["minimalist", "emerging artists", "sculpture"],
          medium_focus: "Sculpture",
          region: "Global",
        },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <span className="text-sm font-bold">AC</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Aegis Core
              </span>
            </Link>
            <nav className="hidden md:flex md:space-x-8">
              <Link
                href="/about"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                About
              </Link>
              <Link
                href="/platform"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Platform
              </Link>
              <Link
                href="/market-intelligence"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Market Intelligence
              </Link>
              <Link
                href="/profiler"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                Profiler
              </Link>
            </nav>
            <Link
              href="/dashboard"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            The Profiler
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            AI-powered lead generation tool for galleries and artists. Find new collectors from public art market data.
          </p>
        </div>

        {/* How It Works */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-900/20">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            How The Profiler Works
          </h2>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">1. Data Ingestion:</strong> Our pipeline continuously ingests and processes publicly available art-world documents: auction catalogs, museum press releases, art magazine articles, and press releases.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">2. Vector Embeddings:</strong> Using Google AI (Vertex AI), we perform OCR and generate multimodal (text and image) vector embeddings from this content. These embeddings are stored in our Qdrant vector database.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">3. Semantic Search:</strong> Upload an image or describe an artwork. Our RAG (Retrieval-Augmented Generation) system searches Qdrant for semantically similar documents and artworks from public sources.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">4. Research Packet:</strong> You receive a list of source documents (e.g., "Sotheby's Catalog, May 2024, Page 45")—NOT names or PII. Your sales team then researches these public documents to identify potential collectors.
            </p>
          </div>
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Privacy First:</strong> The Profiler is completely separate from our private Exchange database. It only searches public data and never exposes verified user information. This is "Blind 4" of our Double-Blind framework.
            </p>
          </div>
        </div>

        {/* Search Interface */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex space-x-4">
              <button
                onClick={() => {
                  setSearchType("text");
                  setSelectedFile(null);
                }}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  searchType === "text"
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                Text Search
              </button>
              <button
                onClick={() => {
                  setSearchType("image");
                  setSearchQuery("");
                }}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  searchType === "image"
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                Image Search
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              {searchType === "text" ? (
                <div>
                  <label
                    htmlFor="query"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Describe the artwork or style you're looking for
                  </label>
                  <textarea
                    id="query"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    rows={4}
                    placeholder="e.g., Minimalist bronze sculpture, abstract expressionist painting, contemporary photography..."
                    className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Upload an image of the artwork
                  </label>
                  <input
                    type="file"
                    id="file"
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-300"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (searchType === "text" && !searchQuery) || (searchType === "image" && !selectedFile)}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Public Art Market Data"}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mx-auto mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Search Results
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              These are public source documents that contain artworks or information semantically similar to your query. Research these documents to identify potential collectors.
            </p>

            <div className="mt-6 space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {(result.similarity_score * 100).toFixed(0)}% Match
                        </span>
                        {result.medium_focus && (
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                            {result.medium_focus}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {result.source_document}
                      </h3>
                      {result.region && (
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          Region: {result.region}
                        </p>
                      )}
                      {result.implied_keywords && result.implied_keywords.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {result.implied_keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Next Steps
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Review these public source documents to identify collectors, institutions, or trends. Once you've identified potential leads, use the "Invite Collector" function in your dashboard to bring them into the Aegis Core ecosystem for verification.
              </p>
            </div>
          </div>
        )}

        {/* Value Proposition */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            How The Profiler Helps Galleries & Artists
          </h2>
          <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">Find New Collectors:</strong> Discover potential buyers by searching for artworks similar to yours in public auction catalogs, museum collections, and art publications.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">Protect Your Client List:</strong> The Profiler searches only public data. Your private client relationships remain completely protected—other galleries cannot see your verified collectors.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">Research Market Trends:</strong> Understand what types of artworks are being acquired, by which institutions, and in which regions—all from public sources.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">Privacy-First:</strong> The system never returns names or PII. You receive research packets (source documents) that your team can investigate using traditional methods.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

