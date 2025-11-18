"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function TokenizationContent() {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("artwork");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    artworkId: artworkId || "",
    price: "",
    fractionalShareCount: "1000000",
    jurisdiction: "",
    coOpName: "",
    coOpSigners: [] as string[],
    paymentSplitter: {
      artist: { address: "", percentage: "" },
      gallery: { address: "", percentage: "" },
    },
    royaltyPercentage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoOpSignerAdd = () => {
    setFormData({
      ...formData,
      coOpSigners: [...formData.coOpSigners, ""],
    });
  };

  const handleCoOpSignerChange = (index: number, value: string) => {
    const newSigners = [...formData.coOpSigners];
    newSigners[index] = value;
    setFormData({
      ...formData,
      coOpSigners: newSigners,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tokenization workflow
    // This would trigger:
    // 1. Creation of Delaware Series LLC / Luxembourg SV
    // 2. Minting of ERC-721 Master NFT
    // 3. Deployment of Vault contract
    // 4. Minting of ERC-3643 fractional tokens
    // 5. Setup of PaymentSplitter and Gnosis Safe if needed
    console.log("Tokenizing artwork:", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Tokenize Artwork
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Convert your artwork into a tokenized asset with fractional ownership capabilities
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= stepNumber
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-zinc-300 text-zinc-400 dark:border-zinc-700"
                }`}
              >
                {step > stepNumber ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                {stepNumber === 1 && "Select Art"}
                {stepNumber === 2 && "Configure"}
                {stepNumber === 3 && "Co-op Setup"}
                {stepNumber === 4 && "Review"}
              </span>
            </div>
            {stepNumber < 4 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  step > stepNumber ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Artwork */}
        {step === 1 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Select Artwork
            </h2>
            <div className="mt-4">
              <label
                htmlFor="artworkId"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Artwork
              </label>
              <select
                name="artworkId"
                id="artworkId"
                required
                value={formData.artworkId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="">Select an artwork...</option>
                <option value="1">Untitled Composition - Jane Doe</option>
                <option value="2">Abstract No. 7 - John Smith</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.artworkId}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tokenization Configuration
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Total Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1000000"
                  className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div>
                <label
                  htmlFor="fractionalShareCount"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Fractional Share Count
                </label>
                <input
                  type="number"
                  name="fractionalShareCount"
                  id="fractionalShareCount"
                  required
                  value={formData.fractionalShareCount}
                  onChange={handleChange}
                  placeholder="1000000"
                  className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Number of ERC-3643 tokens to mint (e.g., 1,000,000 tokens)
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="jurisdiction"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Jurisdiction *
                </label>
                <select
                  name="jurisdiction"
                  id="jurisdiction"
                  required
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <option value="">Select jurisdiction...</option>
                  <option value="US">United States (Delaware Series LLC)</option>
                  <option value="EU">European Union (Luxembourg SV)</option>
                </select>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  This determines the legal wrapper structure (Delaware Series LLC for US, Luxembourg SV for EU)
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="royaltyPercentage"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  EIP-2981 Royalty Percentage
                </label>
                <input
                  type="number"
                  name="royaltyPercentage"
                  id="royaltyPercentage"
                  value={formData.royaltyPercentage}
                  onChange={handleChange}
                  placeholder="10"
                  step="0.1"
                  min="0"
                  max="100"
                  className="mt-1 block w-32 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Percentage of secondary sales that will be automatically paid to the artist
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Co-op Setup */}
        {step === 3 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Co-op Multi-Sig Setup (Optional)
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Create a Gnosis Safe multi-sig wallet for collective governance. If skipped, you'll use a single wallet.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="coOpName"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Co-op Name
                </label>
                <input
                  type="text"
                  name="coOpName"
                  id="coOpName"
                  value={formData.coOpName}
                  onChange={handleChange}
                  placeholder="e.g., Artist X Studio"
                  className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Signer Wallet Addresses
                </label>
                {formData.coOpSigners.map((signer, index) => (
                  <input
                    key={index}
                    type="text"
                    value={signer}
                    onChange={(e) => handleCoOpSignerChange(index, e.target.value)}
                    placeholder="0x..."
                    className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                ))}
                <button
                  type="button"
                  onClick={handleCoOpSignerAdd}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  + Add Signer
                </button>
              </div>

              <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Payment Splitter Setup:</strong> Configure how proceeds from sales will be split between artist and gallery.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Artist Wallet & Percentage
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="text"
                        placeholder="0x..."
                        className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-xs shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      />
                      <input
                        type="number"
                        placeholder="50"
                        className="w-20 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      />
                      <span className="flex items-center text-sm text-zinc-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Gallery Wallet & Percentage
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="text"
                        placeholder="0x..."
                        className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-xs shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      />
                      <input
                        type="number"
                        placeholder="50"
                        className="w-20 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      />
                      <span className="flex items-center text-sm text-zinc-500">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Review & Confirm
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-800">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Configuration Summary</h3>
                <dl className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-zinc-600 dark:text-zinc-400">Price:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                      ${parseInt(formData.price || "0").toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-600 dark:text-zinc-400">Token Count:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                      {parseInt(formData.fractionalShareCount || "0").toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-600 dark:text-zinc-400">Jurisdiction:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formData.jurisdiction === "US" ? "Delaware Series LLC" : "Luxembourg SV"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Important:</strong> This action will create the legal entity (Delaware Series LLC or Luxembourg SV), mint the ERC-721 Master NFT, deploy the Vault contract, and mint ERC-3643 tokens. This process cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Confirm & Tokenize
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function TokenizationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    }>
      <TokenizationContent />
    </Suspense>
  );
}

