"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UploadArtPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    medium: "",
    dimensions: "",
    description: "",
    provenance: "",
    price: "",
    currency: "USD",
    domicile: "",
    custodyLocation: "",
    custodyType: "freeport",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceValue: "",
    royaltyPercentage: "",
    royaltyRecipient: "",
    metadata: "",
    tags: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images to Supabase Storage
      const imageUrls: string[] = [];
      
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          // Only upload image files (skip PDFs for now)
          if (file.type.startsWith('image/')) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `artworks/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('artworks')
              .upload(filePath, file);

            if (uploadError) {
              console.error('Upload error:', uploadError);
              throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
              .from('artworks')
              .getPublicUrl(filePath);

            imageUrls.push(publicUrl);
          }
        }
      }

      // Store artwork metadata in Supabase
      const { data: artwork, error: dbError } = await supabase
        .from('artworks')
        .insert({
          title: formData.title,
          artist: formData.artist,
          year: formData.year || null,
          medium: formData.medium || null,
          dimensions: formData.dimensions || null,
          description: formData.description,
          provenance: formData.provenance || null,
          price: parseFloat(formData.price),
          currency: formData.currency,
          domicile: formData.domicile,
          custody_type: formData.custodyType,
          custody_location: formData.custodyLocation,
          insurance_provider: formData.insuranceProvider || null,
          insurance_policy_number: formData.insurancePolicyNumber || null,
          insurance_value: formData.insuranceValue ? parseFloat(formData.insuranceValue) : null,
          royalty_percentage: formData.royaltyPercentage ? parseFloat(formData.royaltyPercentage) : null,
          royalty_recipient: formData.royaltyRecipient || null,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
          image_urls: imageUrls,
          status: 'draft',
          tokenized: false,
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      router.push("/dashboard/inventory");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload artwork. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Upload Artwork
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Add a new piece to your inventory with complete metadata and documentation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Basic Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="artist"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Artist/Creator *
              </label>
              <input
                type="text"
                name="artist"
                id="artist"
                required
                value={formData.artist}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Year Created
              </label>
              <input
                type="text"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2024 or c. 2020"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="medium"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Medium
              </label>
              <input
                type="text"
                name="medium"
                id="medium"
                value={formData.medium}
                onChange={handleChange}
                placeholder="e.g., Oil on canvas, Bronze, Digital"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="dimensions"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Dimensions
              </label>
              <input
                type="text"
                name="dimensions"
                id="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="e.g., 120 x 80 cm or 48 x 32 inches"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Description *
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the artwork, including artistic significance, style, and notable features..."
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="provenance"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Provenance
              </label>
              <textarea
                name="provenance"
                id="provenance"
                rows={4}
                value={formData.provenance}
                onChange={handleChange}
                placeholder="Document the ownership history, exhibition history, and any relevant documentation..."
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Financial */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Pricing & Financial Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Price *
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                </select>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="block w-full flex-1 rounded-r-md border border-zinc-300 bg-white px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="domicile"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Domicile *
              </label>
              <select
                name="domicile"
                id="domicile"
                required
                value={formData.domicile}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="">Select domicile</option>
                <option value="US">United States (Delaware Series LLC)</option>
                <option value="EU">European Union (Luxembourg SV)</option>
                <option value="CH">Switzerland</option>
                <option value="UK">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="royaltyPercentage"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Royalty Percentage (EIP-2981)
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="number"
                  name="royaltyPercentage"
                  id="royaltyPercentage"
                  value={formData.royaltyPercentage}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  max="100"
                  className="block w-32 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">%</span>
                <input
                  type="text"
                  name="royaltyRecipient"
                  value={formData.royaltyRecipient}
                  onChange={handleChange}
                  placeholder="Royalty recipient wallet address or name"
                  className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                This royalty will be automatically enforced on all secondary market sales
              </p>
            </div>
          </div>
        </div>

        {/* Custody & Insurance */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Custody & Insurance
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="custodyType"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Custody Type *
              </label>
              <select
                name="custodyType"
                id="custodyType"
                required
                value={formData.custodyType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="freeport">Freeport (Geneva, Delaware, etc.)</option>
                <option value="museum">Museum</option>
                <option value="private_vault">Private Vault</option>
                <option value="gallery">Gallery Storage</option>
                <option value="artist_studio">Artist Studio</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="custodyLocation"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Custody Location *
              </label>
              <input
                type="text"
                name="custodyLocation"
                id="custodyLocation"
                required
                value={formData.custodyLocation}
                onChange={handleChange}
                placeholder="e.g., Geneva Freeport, Vault 42, Sector B"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="insuranceProvider"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Insurance Provider
              </label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                placeholder="e.g., AXA Art, Chubb"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="insurancePolicyNumber"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Insurance Policy Number
              </label>
              <input
                type="text"
                name="insurancePolicyNumber"
                value={formData.insurancePolicyNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="insuranceValue"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Insured Value
              </label>
              <input
                type="number"
                name="insuranceValue"
                id="insuranceValue"
                value={formData.insuranceValue}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Media & Documentation
          </h2>
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Upload Images & Documents *
            </label>
            <input
              type="file"
              name="files"
              id="files"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-300"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Upload high-resolution images of the artwork and any supporting documentation (provenance certificates, condition reports, etc.)
            </p>
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800"
                  >
                    <span className="text-zinc-700 dark:text-zinc-300">{file.name}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Metadata */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Additional Metadata
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., contemporary, abstract, sculpture, blue-chip"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="metadata"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Additional Metadata (JSON)
              </label>
              <textarea
                name="metadata"
                id="metadata"
                rows={4}
                value={formData.metadata}
                onChange={handleChange}
                placeholder='{"exhibition_history": [], "publications": [], "notes": ""}'
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Upload Artwork"}
          </button>
        </div>
      </form>
    </div>
  );
}

