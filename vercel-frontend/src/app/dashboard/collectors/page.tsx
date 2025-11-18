"use client";

import { useState } from "react";

// Mock data - in production, this would come from Supabase
const mockCollectors = [
  {
    id: "1",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    status: "vetted_tier3",
    invitedBy: "You",
    invitedAt: "2024-01-15",
    interestedIn: ["1", "2"],
    lastActivity: "2024-01-20",
  },
  {
    id: "2",
    walletAddress: "0x8ba1f109551bD432803012645Hac136c22C177",
    status: "pending",
    invitedBy: "You",
    invitedAt: "2024-01-18",
    interestedIn: [],
    lastActivity: "2024-01-18",
  },
  {
    id: "3",
    walletAddress: "0x3Cd533973b3F8F8b07b5bFbC4F5C8b5C5b5b5b5b",
    status: "vetted_tier2",
    invitedBy: "You",
    invitedAt: "2024-01-10",
    interestedIn: ["1"],
    lastActivity: "2024-01-19",
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending Verification", color: "amber" },
  vetted_tier1: { label: "Vetted - Tier 1 (<$250k)", color: "blue" },
  vetted_tier2: { label: "Vetted - Tier 2 (<$2M)", color: "indigo" },
  vetted_tier3: { label: "Vetted - Tier 3 (>$2M)", color: "emerald" },
  rejected: { label: "Rejected", color: "red" },
};

export default function CollectorsPage() {
  const [collectors] = useState(mockCollectors);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement invite logic that triggers Opus workflow
    console.log("Inviting collector:", inviteEmail);
    setShowInviteModal(false);
    setInviteEmail("");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Collectors
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage buyer interest and invite verified collectors to your artworks
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Invite Collector
        </button>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900/20">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              The Double-Blind system protects privacy: collectors see only anonymized status, and galleries cannot see each other's client lists. When you invite a collector, they'll be routed to their legal advisor for verification through the Opus compliance engine.
            </p>
          </div>
        </div>
      </div>

      {/* Collectors List */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Wallet Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Interested In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
              {collectors.map((collector) => {
                const status = statusLabels[collector.status] || statusLabels.pending;
                return (
                  <tr key={collector.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                            {collector.walletAddress.slice(2, 4).toUpperCase()}
                          </span>
                        </div>
                        <span className="ml-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                          {formatAddress(collector.walletAddress)}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          status.color === "amber"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                            : status.color === "blue"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                              : status.color === "indigo"
                                ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300"
                                : status.color === "emerald"
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                        }`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
                      {collector.interestedIn.length > 0 ? (
                        <span>{collector.interestedIn.length} artwork(s)</span>
                      ) : (
                        <span className="text-zinc-400">None</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(collector.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Invite Collector
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Send an invitation to a potential collector. They will be routed to the Opus compliance portal for verification.
            </p>
            <form onSubmit={handleInvite} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  placeholder="collector@example.com"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

