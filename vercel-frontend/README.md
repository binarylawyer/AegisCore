# Aegis Core Frontend

The sell-side frontend for the Aegis Core art marketplace platform, built with Next.js 16 and TypeScript.

## Overview

This frontend application provides a comprehensive portal for artists, galleries, and curators to:

- **Upload Artworks**: Add new artworks with complete metadata, descriptions, pricing, domicile information, and royalty configurations
- **Manage Inventory**: View and manage your art collection with detailed information
- **Tokenize Assets**: Convert artworks into tokenized assets using ERC-721/ERC-3643 standards
- **Manage Collectors**: Invite and track verified collectors using the Double-Blind compliance system
- **Custodial & Insurance**: Provide detailed views for custodial agents and insurance companies to examine artworks, provenance, and management details

## Features

### Art Upload
- Comprehensive form with all required fields:
  - Basic information (title, artist, year, medium, dimensions, description, provenance)
  - Pricing & financial information (price, currency, domicile, royalties)
  - Custody & insurance details
  - Media upload (images and documents)
  - Additional metadata and tags

### Inventory Management
- Grid view of all artworks
- Filter by status (all, listed, draft, tokenized)
- Detailed artwork pages with tabs for:
  - Overview
  - Custody information
  - Provenance
  - Tokenization status

### Collector Management (CRM)
- View all invited collectors
- See verification status (Pending, Tier 1, Tier 2, Tier 3)
- Track buyer interest
- Invite new collectors (triggers Opus compliance workflow)

### Tokenization Workflow
- Multi-step wizard for tokenizing artworks:
  1. Select artwork
  2. Configure tokenization (price, fractional shares, jurisdiction)
  3. Setup Co-op multi-sig (optional)
  4. Review and confirm
- Creates Delaware Series LLC (US) or Luxembourg SV (EU)
- Mints ERC-721 Master NFT and ERC-3643 fractional tokens

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (via `@supabase/supabase-js`)
- **Deployment**: Vercel (optimized)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd vercel-frontend
npm install
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout wrapper
│   │   ├── page.tsx            # Dashboard home
│   │   ├── upload/
│   │   │   └── page.tsx        # Art upload form
│   │   ├── inventory/
│   │   │   ├── page.tsx         # Inventory list
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Artwork detail view
│   │   ├── collectors/
│   │   │   └── page.tsx         # Collector CRM
│   │   └── tokenization/
│   │       └── page.tsx         # Tokenization workflow
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home (redirects to dashboard)
│   └── globals.css              # Global styles
├── components/
│   └── DashboardLayout.tsx      # Dashboard navigation layout
└── lib/
    └── supabaseClient.ts         # Supabase client configuration
```

## Key Concepts

### Double-Blind Compliance

The platform implements a "Double-Blind" system where:
- Collectors remain anonymous to sellers
- Sellers see only verification status, not identities
- Galleries cannot see each other's client lists
- The platform never stores PII

### Tokenization Architecture

- **ERC-721 Master NFT**: Represents 100% membership interest in the legal entity (Delaware Series LLC or Luxembourg SV)
- **ERC-3643 Tokens**: Fractional shares that can be bought and sold
- **Vault Contract**: Holds the Master NFT and mints ERC-3643 tokens
- **Compliance**: ERC-3643 enforces on-chain compliance checks

### Legal Wrappers

- **US Assets**: Delaware Series LLC (one Series per artwork)
- **EU/RoW Assets**: Luxembourg Securitization Vehicle (one Compartment per artwork)

## Integration Points

### Google File API

Artwork images and documents are uploaded via the `file-storage-service` microservice, which handles authentication and abstraction for Google Cloud Storage.

### Opus Compliance Engine

Collector invitations trigger workflows in the Opus B2B compliance portal, where law firms perform KYC/AML verification and issue on-chain attestations.

### Supabase Database

The frontend queries Supabase for:
- Artwork inventory
- Collector leads and status
- Market events
- Art movements

## Future Enhancements

- [ ] File upload integration with Google File API
- [ ] Real-time updates via Supabase subscriptions
- [ ] Web3 wallet integration for tokenization
- [ ] Payment splitter configuration UI
- [ ] Co-op multi-sig management interface
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Export functionality for reports

## License

Proprietary - Aegis Core Platform
