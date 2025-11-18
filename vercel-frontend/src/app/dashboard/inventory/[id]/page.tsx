"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - in production, this would come from Supabase
const mockArtwork = {
  id: "1",
  title: "Untitled Composition",
  artist: "Jane Doe",
  year: "2024",
  medium: "Oil on canvas",
  dimensions: "120 x 80 cm",
  description:
    "A striking contemporary composition that explores the boundaries between abstraction and representation. The work demonstrates the artist's mastery of color and form, creating a dynamic visual dialogue.",
  provenance:
    "Directly from the artist's studio. Exhibited at Gallery XYZ, New York (2024). Published in Art Magazine, Issue 45.",
  price: "125000",
  currency: "USD",
  domicile: "US",
  custodyType: "freeport",
  custodyLocation: "Geneva Freeport, Vault 42, Sector B",
  insuranceProvider: "AXA Art",
  insurancePolicyNumber: "POL-2024-12345",
  insuranceValue: "125000",
  royaltyPercentage: "10",
  royaltyRecipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  tags: ["contemporary", "abstract", "painting"],
  status: "listed",
  tokenized: false,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
};

export default function ArtworkDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "custody" | "provenance" | "tokenization">("overview");

  // In production, fetch artwork by ID from Supabase
  const artwork = mockArtwork;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/inventory"
            className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
          >
            ← Back to Inventory
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {artwork.title}
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {artwork.artist} • {artwork.year}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Edit
          </button>
          {!artwork.tokenized && (
            <Link
              href={`/dashboard/tokenization?artwork=${artwork.id}`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Tokenize
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8">
          {(["overview", "custody", "provenance", "tokenization"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <div className="flex h-full items-center justify-center text-zinc-400">
              <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Description
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{artwork.description}</p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Details
                </h2>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Medium</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{artwork.medium}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Dimensions</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{artwork.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Year</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{artwork.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Domicile</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                      {artwork.domicile === "US" ? "United States (Delaware Series LLC)" : "EU (Luxembourg SV)"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === "custody" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Physical Custody
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Custody Type</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100 capitalize">
                      {artwork.custodyType.replace("_", " ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Location</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{artwork.custodyLocation}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                        In Custody
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Insurance Information
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Provider</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{artwork.insuranceProvider}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Policy Number</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                      {artwork.insurancePolicyNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Insured Value</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                      {artwork.currency} {parseInt(artwork.insuranceValue).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Custodial Agent Access
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Custodial agents and insurance companies can examine this artwork, review provenance documentation, and verify custody arrangements through the secure portal.
                </p>
                <div className="mt-4">
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                    Generate Access Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "provenance" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Provenance
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                {artwork.provenance}
              </p>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Supporting Documents
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  No documents uploaded yet.
                </p>
              </div>
            </div>
          )}

          {activeTab === "tokenization" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Tokenization Status
              </h2>
              {artwork.tokenized ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                      Tokenized
                    </span>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ERC-721 Master NFT</dt>
                    <dd className="mt-1 text-sm font-mono text-zinc-900 dark:text-zinc-100">
                      0x1234...5678
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ERC-3643 Token Symbol</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">$ARTWORK1</dd>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    This artwork has not been tokenized yet.
                  </p>
                  <Link
                    href={`/dashboard/tokenization?artwork=${artwork.id}`}
                    className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Start Tokenization
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Pricing</h2>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {artwork.currency} {parseInt(artwork.price).toLocaleString()}
            </p>
            {artwork.royaltyPercentage && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Royalty: {artwork.royaltyPercentage}% to {artwork.royaltyRecipient.slice(0, 10)}...
              </p>
            )}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Status</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Listing Status</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {artwork.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Tokenization</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    artwork.tokenized
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {artwork.tokenized ? "Tokenized" : "Not Tokenized"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Buyer Interest</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Track inquiries and manage potential buyers
            </p>
            <Link
              href="/dashboard/collectors"
              className="mt-4 inline-block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              View Collectors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

