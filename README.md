<div align="center">

# ✨ NORA — Luxury

<p>
  A high-end, editorial beauty e-commerce web application featuring a modern RTL layout, seamless shopping experience, live countdown timers, shade selectors, and responsive craftsmanship.
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" />
</p>

</div>

---

## 🌟 Key Features

- 🛍️ **Curated Luxury Catalog**: Comprehensive product categorization across Face, Lip, Eye, Skincare, Hydrating Serums, and Fragrances.
- 🎨 **Interactive Shade Selector**: Real-time shade switcher for lipsticks and foundations with live shade preview swatches directly on cards and modals.
- ⏳ **Live Countdown Flash Sales**: Multi-day synchronized live countdown timer (Days, Hours, Minutes, Seconds) for time-limited promotional campaigns.
- 🛒 **Advanced Slide-Over Cart**: Dynamic quantity controls, subtotal and free shipping threshold calculations, coupon code redemption, and streamlined checkout flow.
- 💖 **Wishlist Management**: Instant one-click wishlist toggling with dedicated drawer and quick transfer to cart.
- 🔍 **Live Search Modal**: Instant client-side search across Persian and English product names with category filtering and instant results.
- 👁️ **Editorial Quick View Modal**: Comprehensive product overview including high-resolution imagery, shade selection, formula highlights, volume specs, and customer rating reviews.
- 📰 **Beauty Magazine (Articles)**: Modern asymmetrical 3-column layout showcasing editorial beauty guides, skincare routines, and makeup tips.
- 📱 **Mobile-First & Fully Responsive**: Tailored fluid layouts optimized across mobile phones, tablets, and wide desktop displays.
- 🌍 **Native RTL Architecture**: Full Right-to-Left (RTL) layout support using the Vazirmatn Persian typeface paired with Cormorant Garamond for brand marks.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) (`@import "tailwindcss";`) |
| **Icons** | [Lucide React](https://lucide.dev/) & [Remix Icons (@remixicon/react)](https://remixicon.com/) |
| **Typography** | [Vazirmatn](https://github.com/rastikerdar/vazirmatn) (Persian UI) & [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Luxury Branding) |

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nora.git
cd nora
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
├── public/
│   └── images/
│       ├── articles/           # Beauty magazine editorial cover images
│       ├── brands/             # Luxury cosmetics brand logo assets
│       ├── categories/         # Category showcase thumbnails
│       ├── hero/               # Hero banner & slider visuals
│       └── products/           # High-resolution product photography
├── src/
│   ├── components/
│   │   ├── BrandLogoGraphic.tsx # Popular brands visual showcase component
│   │   └── StoreOverlays.tsx    # Cart drawer, wishlist drawer, quick view & search modals
│   ├── data/
│   │   └── catalog.ts           # Products database, categories, brands & blog posts
│   ├── App.tsx                  # Main application layout, hero slider & store sections
│   ├── index.css                # Global styles, Tailwind imports & custom elevation shadows
│   └── main.tsx                 # React root application entry point
├── package.json            # Project dependencies and build scripts
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Repository documentation
```

---

## 🎨 Color Palette

| Token | Hex Code | Preview | Usage |
| :--- | :--- | :--- | :--- |
| **Warm White** | `#FFFBFC` | ⬜ | Main page background |
| **Primary Rose** | `#D96B87` | 🌸 | Primary brand accents, CTAs, badges |
| **Dark Chocolate** | `#231519` | 🟫 | Primary typography & high-contrast buttons |
| **Warm Neutral Grey** | `#E5E5E7` | ◽ | Integrated footer background band |
| **Soft Blush** | `#FAF4F6` | 🪷 | Secondary backgrounds, cards & pill badges |
