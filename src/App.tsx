/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Star,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Send,
  Instagram,
  Phone,
  Calendar,
  MessageSquare
} from 'lucide-react';
import {
  RiShoppingCartLine,
  RiPokerHeartsLine,
  RiHeartAddLine,
  RiHeartFill,
  RiArrowDownSLine
} from '@remixicon/react';
import {
  CATEGORIES,
  PRODUCTS,
  HERO_SLIDES,
  POPULAR_BRANDS,
  BLOG_POSTS,
  ProductItem,
  BlogPostItem,
  toPersianDigits
} from './data/catalog';
import {
  CartDrawer,
  CartItem,
  WishlistDrawer,
  QuickViewModal,
  SearchModal
} from './components/StoreOverlays';
import { BrandLogoGraphic } from './components/BrandLogoGraphic';

export default function App() {
  // Navigation & Active Section State
  const [activeNav, setActiveNav] = useState<string>('home');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Inline Selected Shade State per Product Card
  const [cardSelectedShades, setCardSelectedShades] = useState<
    Record<string, string>
  >({
    'lumi-matte-lipstick': 'رز مخملی ۰۱',
    'lumi-matte-foundation': 'عاجی روشن N10'
  });

  // E-commerce Interactive State (initialized with 2 items)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[3], quantity: 1 },
    { product: PRODUCTS[0], quantity: 1, selectedShade: 'رز مخملی ۰۱' }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'lumi-hydrating-cream'
  ]);

  // Overlays State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(
    null
  );
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostItem | null>(
    null
  );
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Newsletter & Toast Feedback State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Countdown Timer for Discounted Collection
  const [timeLeft, setTimeLeft] = useState({
    days: 9,
    hours: 12,
    minutes: 20,
    seconds: 16
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59
          };
        return { days: 9, hours: 12, minutes: 20, seconds: 16 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product: ProductItem, shade?: string) => {
    const chosenShade =
      shade || cardSelectedShades[product.id] || product.shades?.[0]?.name;
    setOrderSuccess(false);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                selectedShade: chosenShade || i.selectedShade
              }
            : i
        );
      }
      return [
        ...prev,
        { product, quantity: 1, selectedShade: chosenShade }
      ];
    });
    showToast(
      chosenShade
        ? `«${product.name} (${chosenShade})» به سبد خرید اضافه شد`
        : `«${product.name}» به سبد خرید اضافه شد`
    );
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handleCheckout = () => {
    setOrderSuccess(true);
    setCartItems([]);
  };

  // Wishlist Handler
  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`«${product.name}» از علاقه‌مندی‌ها حذف شد`);
        return prev.filter((id) => id !== productId);
      } else {
        if (product) showToast(`«${product.name}» به علاقه‌مندی‌ها اضافه شد`);
        return [...prev, productId];
      }
    });
  };

  // Hero Slider Handlers
  const currentHeroSlide = HERO_SLIDES[activeSlideIndex];
  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };
  const handlePrevSlide = () => {
    setActiveSlideIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('لطفاً یک آدرس ایمیل معتبر وارد کنید');
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    showToast('عضویت شما در خبرنامه نورا بیوتی با موفقیت ثبت شد');
  };

  // Filtered Discounted Products & New Products & Bestsellers Page
  const [activeNewCategoryFilter, setActiveNewCategoryFilter] =
    useState<string>('all');
  const [bestsellerPage, setBestsellerPage] = useState<number>(0);

  const displayedProducts =
    activeCategoryFilter === 'all'
      ? PRODUCTS.slice(0, 4)
      : PRODUCTS.filter((p) => p.category === activeCategoryFilter);

  const displayedNewProducts =
    activeNewCategoryFilter === 'all'
      ? PRODUCTS.slice(4, 8)
      : PRODUCTS.filter((p) => p.category === activeNewCategoryFilter);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const scrollToSection = (id: string, navKey: string) => {
    setActiveNav(navKey);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-hidden bg-[#FFFBFC] text-[#231519] font-persian relative"
    >
      {/* Minimal Action Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full bg-[#231519] px-5 py-3 text-xs font-medium text-white shadow-lg transition-opacity duration-200">
          <span className="h-2 w-2 rounded-full bg-[#D96B87]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. FLOATING GLASSMORPHISM PILL NAVIGATION HEADER
      ====================================================================== */}
      <header className="sticky top-4 z-40 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between rounded-full bg-white/50 backdrop-blur-2xl backdrop-saturate-150 px-6 sm:px-10 py-3.5 border border-white/80 ring-1 ring-[#EFC8D5]/45 shadow-[0_10px_32px_-6px_rgba(35,21,25,0.065),inset_0_1px_1.5px_rgba(255,255,255,0.95)] transition-all duration-300">
          {/* Right Zone (RTL Start): Brand Logo NORA */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero', 'home');
            }}
            className="font-brand text-2xl sm:text-[28px] font-semibold tracking-[0.18em] text-[#231519] whitespace-nowrap shrink-0 cursor-pointer"
          >
            NORA
          </a>

          {/* Center Zone: Persian RTL Navigation with Clean Rose Underline */}
          <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[#231519]/80">
            {[
              { key: 'home', label: 'صفحه اصلی', target: 'hero' },
              {
                key: 'products',
                label: 'محصولات',
                target: 'products',
                hasChevron: true
              },
              { key: 'brands', label: 'برندها', target: 'brands' },
              { key: 'about', label: 'درباره ما', target: 'promo' },
              { key: 'contact', label: 'تماس با ما', target: 'footer' }
            ].map((item) => {
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.target, item.key)}
                  className={`relative flex items-center gap-1 py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'font-bold text-[#231519]'
                      : 'hover:text-[#D96B87]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasChevron && (
                    <RiArrowDownSLine className="h-4 w-4 text-[#231519]/50" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 right-0 left-0 mx-auto h-[2.5px] w-full rounded-full bg-[#D96B87]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Left Zone (RTL End): Wishlist/Heart and Shopping Cart Icons (Remix Icon: ri-poker-hearts-line & ri-shopping-cart-line) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="علاقه‌مندی‌ها"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#231519]/85 hover:bg-white/60 hover:text-[#231519] transition-colors duration-200 cursor-pointer"
            >
              <RiPokerHeartsLine className="h-[21px] w-[21px]" />
            </button>

            <button
              onClick={() => {
                setOrderSuccess(false);
                setIsCartOpen(true);
              }}
              aria-label="سبد خرید"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#231519]/85 hover:bg-white/60 hover:text-[#231519] transition-colors duration-200 cursor-pointer"
            >
              <RiShoppingCartLine className="h-[21px] w-[21px]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#D96B87] px-1 text-[10.5px] font-bold text-white ring-2 ring-white shadow-xs tabular-nums select-none">
                  {toPersianDigits(totalCartCount)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. EDITORIAL HERO SECTION (SEAMLESS REFERENCE BACKDROP + FLUSH WAVE)
      ====================================================================== */}
      <section
        id="hero"
        className="relative z-10 w-full bg-gradient-to-b from-[#FFFBFD] via-[#FDF2F6] to-[#F7E2EA] -mt-20 pt-24 sm:pt-28 mb-8 overflow-hidden"
      >
        {/* ===================================================================
            BACKGROUND LAYER: SOFT STUDIO GLOWS
        ==================================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Soft Luminous Studio Glows */}
          <div className="absolute -top-20 right-[10%] h-96 w-96 rounded-full bg-white/80 blur-3xl" />
          <div className="absolute top-1/4 left-[18%] h-[440px] w-[440px] rounded-full bg-[#FADCE4]/55 blur-3xl" />
        </div>

        {/* Main Hero Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-2">
            {/* Right Column (RTL Start): Headline, Supporting Copy & CTAs */}
            <div className="lg:col-span-5 flex flex-col items-start text-right order-1 z-20 pt-2 pb-10 lg:pb-24">
              {/* Subtle English Eyebrow matching image_0ca875c8.png */}
              <span
                dir="ltr"
                className="font-brand text-xs sm:text-sm font-semibold tracking-[0.15em] text-[#D96B87]/90 mb-2"
              >
                Beauty is in your nature
              </span>

              <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-[#231519] leading-[1.32] tracking-tight mb-5 text-balance">
                <span className="block mb-1.5">
                  {currentHeroSlide.headlinePart1}
                </span>
                <span className="block">
                  {currentHeroSlide.headlinePart2Start}
                  <span className="relative inline-block text-[#D96B87] px-1">
                    {currentHeroSlide.headlineHighlight}
                    {/* Clean Curved Rose Underline */}
                    <svg
                      viewBox="0 0 220 22"
                      fill="none"
                      className="absolute -bottom-2.5 -left-20 w-40 sm:w-48 h-4 text-[#D96B87] pointer-events-none"
                    >
                      <path
                        d="M4 16C58 4 152 3 216 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {currentHeroSlide.headlinePart2End}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#231519]/75 leading-[1.9] max-w-md mt-2 mb-8 font-normal">
                {currentHeroSlide.description}
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => scrollToSection('products', 'products')}
                  className="flex items-center gap-2 rounded-full bg-[#231519] hover:bg-[#D96B87] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>مشاهده محصولات</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setQuickViewProduct(PRODUCTS[3])}
                  className="flex items-center gap-2 rounded-full bg-white/90 border border-[#231519]/20 px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#231519] hover:border-[#D96B87] hover:bg-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>کشف کالکشن جدید</span>
                </button>
              </div>
            </div>

            {/* Left Column (RTL End): Large Static Beauty Portrait Seated Flush on the Bottom Wave */}
            <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end self-end order-2 pt-2">
              {/* Soft Architectural Arch Halo Positioned Exactly Behind the Subject */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 top-2 flex items-end justify-center lg:justify-end"
              >
                {/* Arch Wrapper aligned to the visible subject center */}
                <div className="relative w-full max-w-[680px] h-full flex items-end justify-center lg:ml-6">
                  {/* Soft Luminous Arch Window behind the Model */}
                  <div className="relative w-[72%] sm:w-[68%] h-[92%] rounded-t-full bg-gradient-to-b from-[#EAC2CE]/55 via-[#F5DCE4]/65 to-transparent border-t border-x border-white/80 shadow-[0_-10px_40px_rgba(217,107,135,0.08)]" />

                  {/* Delicate Offset Outer Arch Line */}
                  <div className="absolute bottom-0 w-[75%] sm:w-[71%] h-[95%] rounded-t-full border-t border-x border-[#DDAEC0]/50 -translate-x-2" />
                </div>
              </div>

              {/* Hero Image Wrapper: Compensates for the 33% transparent right margin inside IMG_8004 and sits flush on the bottom wave */}
              <div className="relative z-10 w-[134%] sm:w-[128%] lg:w-[138%] -mr-[30%] sm:-mr-[24%] lg:-mr-[34%] -mb-2 sm:-mb-4">
                <img
                  src={currentHeroSlide.image}
                  alt="مدل زیبایی نورا بیوتی به همراه سرم تخصصی مراقبت از پوست"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_14px_28px_rgba(180,95,120,0.12)] transition-opacity duration-300"
                />

                {/* Editorial Slide Indicator & Controls on Bottom-Left */}
                <div
                  dir="ltr"
                  className="absolute bottom-8 sm:bottom-12 left-3 sm:left-8 z-30 flex items-center gap-3 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 border border-[#F3E2E7] shadow-xs"
                >
                  <span className="text-xs font-bold tracking-wider text-[#231519] tabular-nums">
                    {currentHeroSlide.indexLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevSlide}
                      aria-label="اسلاید قبلی"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#231519]/75 hover:bg-[#D96B87] hover:text-white border border-[#F3E2E7] transition-colors duration-200 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      aria-label="اسلاید بعدی"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#231519]/75 hover:bg-[#D96B87] hover:text-white border border-[#F3E2E7] transition-colors duration-200 cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            SCULPTED DOUBLE-LAYERED ROSE WAVE BOTTOM DIVIDER (OVERLAPPING BASE)
        ==================================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-20 -mt-6 sm:-mt-10 lg:-mt-14 -mb-1 w-full overflow-hidden leading-none"
        >
          <svg
            viewBox="0 0 1600 120"
            fill="none"
            preserveAspectRatio="none"
            className="block h-12 sm:h-16 lg:h-22 w-full"
          >
            {/* Page Background Fill (#FFFBFC) below the Rose Ribbon Wave */}
            <path
              d="M0 62 C 315 118, 625 112, 925 58 C 1195 10, 1415 36, 1600 72 L 1600 130 L 0 130 Z"
              fill="#FFFBFC"
            />
            {/* Soft Dusty-Rose Ribbon Wave Band */}
            <path
              d="M0 42 C 310 108, 620 102, 920 42 C 1190 -10, 1410 16, 1600 56 L 1600 74 C 1415 36, 1195 10, 925 60 C 625 114, 315 120, 0 64 Z"
              fill="#EBC4D0"
            />
            {/* Delicate Thin Upper Wave Line */}
            <path
              d="M0 28 C 320 96, 630 90, 930 30 C 1200 -20, 1420 8, 1600 44"
              stroke="#DFB0BF"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================================
          3. CATEGORIES SECTION
      ====================================================================== */}
      <section
        id="categories"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-16 sm:pb-20"
      >
        {/* Centered دسته‌بندی محصولات Heading with Subtle Light Underline */}
        <div className="flex flex-col items-center justify-center text-center mb-9 sm:mb-11">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#231519]">
            دسته‌بندی محصولات
          </h2>
          <span
            aria-hidden="true"
            className="mt-2.5 h-[2px] w-24 rounded-full bg-[#E8B8C8]/80"
          />
        </div>

        {/* 5 Organic Curved Categories Row — Frame morphs & text expands on hover, image stays fixed */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-7 items-end">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategoryFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategoryFilter((prev) =>
                    prev === category.id ? 'all' : category.id
                  );
                  const prodEl = document.getElementById('products');
                  if (prodEl) prodEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative flex flex-col items-center text-center focus:outline-none cursor-pointer"
              >
                <div
                  className={`relative w-full aspect-[1/1.05] overflow-hidden bg-gradient-to-b from-[#FADCE4] to-[#FDF4F6] p-1.5 ${
                    category.shapeClass
                  } ${
                    isSelected
                      ? 'ring-2 ring-[#D96B87] lumi-card-shadow-hover'
                      : 'lumi-card-shadow group-hover:lumi-card-shadow-hover'
                  }`}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden ${category.shapeClass}`}
                  >
                    {/* Image is completely static and unobstructed (no white fade overlay) */}
                    <img
                      src={category.image}
                      alt={category.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover select-none"
                    />
                  </div>
                </div>

                {/* Clean Category Title Underneath the Shape */}
                <div className="mt-3.5 text-center">
                  <span className="block text-sm sm:text-base font-bold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200">
                    {category.title}
                  </span>
                  <span className="block text-xs font-medium text-[#231519]/55 mt-1">
                    {category.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. DISCOUNTED PRODUCTS SECTION (محصولات تخفیف‌دار — RICH ROSE ANCHOR CARD)
      ====================================================================== */}
      <section
        id="products"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20"
      >
        {/* Main 5-Column Showcase Row: 1 Soft Pastel Blush Anchor Card (Right) + 4 White Product Cards (Left) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.22fr_1fr_1fr_1fr_1fr] xl:grid-cols-[1.15fr_1fr_1fr_1fr_1fr] gap-4 xl:gap-5 items-stretch">
          {/* Right Anchor Card (RTL First Column): Scooped Top-Right Cutout & Cart Icon matching IMG_8035.PNG */}
          <div className="sm:col-span-2 lg:col-span-1 relative flex flex-col justify-between rounded-tl-[34px] rounded-b-[34px] rounded-tr-none p-5 sm:p-6 lg:p-4 xl:p-5 2xl:p-6 text-white min-h-[340px] lg:min-h-[380px]">
            {/* Inner Clipped Pink Gradient Background & Topographic Waves */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-tl-[34px] rounded-b-[34px] rounded-tr-none bg-gradient-to-b from-[#D96B87] via-[#CF5D7A] to-[#D96B87]">
              {/* Organic Topographic Contour Wave Pattern in Top-Right */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                fill="none"
                className="pointer-events-none absolute -top-4 -right-4 h-56 w-56 text-white/55"
              >
                <path
                  d="M220 68C178 72 156 52 132 28C114 10 98 0 76 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M220 96C168 100 142 74 114 44C94 22 76 8 48 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M220 126C158 128 126 98 96 62C74 36 54 16 20 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M220 156C146 158 110 122 76 80C54 52 32 26 0 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Top-Right Scooped Corner Cutout Notch & Fillets (Single Unified Unclipped Seamless SVG) */}
            <div className="pointer-events-none absolute -top-[2px] -right-[2px] z-20 h-[90px] w-[90px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 88 88"
                fill="none"
                preserveAspectRatio="none"
                className="block h-full w-full"
              >
                <path
                  d="M 0 0 H 88 V 88 A 24 24 0 0 0 64 64 H 52 A 28 28 0 0 1 24 36 V 24 A 24 24 0 0 0 0 0 Z"
                  fill="#FFFBFC"
                />
              </svg>
              <div className="absolute top-[2px] right-[2px] flex h-[64px] w-[64px] items-center justify-center">
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  className="h-9 w-9 text-[#D96B87]"
                >
                  {/* Cart Handle & Basket Body matching IMG_8035_5dd38be4.PNG */}
                  <path
                    d="M31 7H27.5C26.4 7 25.5 7.7 25.2 8.8L21.8 21.2C21.5 22.3 20.5 23 19.4 23H9.8C8.6 23 7.6 22.1 7.4 20.9L6 11.4C5.8 10.1 6.8 9 8.1 9H24.5"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Inner Vertical Line inside Cart Basket */}
                  <path
                    d="M11.5 13V19"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                  />
                  {/* Two Cart Wheels */}
                  <circle cx="11.5" cy="27.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="19.5" cy="27.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </div>
            </div>

            {/* Center Large Two-Line White Kashida Title (Matching IMG_8035.PNG) */}
            <div className="relative z-10 flex-1 flex items-center justify-center text-center pt-12 pb-3">
              <h2 className="text-[31px] sm:text-[35px] lg:text-[29px] xl:text-[34px] font-extrabold leading-[1.38] text-white tracking-normal select-none">
                <span className="block whitespace-nowrap">محصـــــولات</span>
                <span className="block whitespace-nowrap">تخفیــــف‌دار</span>
              </h2>
            </div>

            {/* Bottom White Inner Box with 4 Live Timer Cells & Subtle Bottom-Center Step (Matching IMG_8035.PNG) */}
            <div className="relative z-10 overflow-hidden rounded-[24px] bg-white px-3 pt-3.5 pb-3.5 lg:px-2.5 xl:px-3.5 text-[#231519]">
              <div className="mx-auto max-w-[260px] lg:max-w-none grid grid-cols-4 gap-2 lg:gap-1.5 xl:gap-2.5 justify-items-center text-center" dir="ltr">
                {[
                  { val: toPersianDigits(timeLeft.days), label: 'روز' },
                  { val: toPersianDigits(timeLeft.hours), label: 'ساعت' },
                  { val: toPersianDigits(timeLeft.minutes), label: 'دقیقه' },
                  { val: toPersianDigits(timeLeft.seconds), label: 'ثانیه' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#FDF5F8] border border-[#EFC8D5] text-xs xl:text-sm font-extrabold text-[#D96B87] tabular-nums">
                      {item.val}
                    </div>
                    <span className="text-[10px] xl:text-[11px] font-bold text-[#231519]/75 mt-1.5 whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Product Cards in the Row (Matching IMG_8035__2__4b3af849.PNG) */}
          {displayedProducts.slice(0, 4).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const activeShade =
              cardSelectedShades[product.id] || product.shades?.[0]?.name;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-[34px] bg-white p-5 sm:p-6 border border-[#F3E2E7]/85 hover:border-[#D96B87]/55 lumi-card-shadow hover:lumi-card-shadow-hover transition-all duration-200"
              >
                {/* Top Area: Top-Right Discount Pill + Product Image */}
                <div>
                  <div className="flex items-center justify-start mb-1">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#D96B87]/85 px-2.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
                      {product.discountPercent}
                    </span>
                  </div>

                  {/* Seamless Studio Product Image on Pure White Background */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="relative mx-auto my-2 flex h-48 w-full items-center justify-center bg-white p-2 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain select-none transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                {/* Bottom Area: Title -> Two Centered Rose Outline Icons -> Strikethrough & Bold Price Row */}
                <div className="flex flex-col items-center text-center pt-1">
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-[15px] sm:text-base font-bold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200 line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Two Centered Minimal Soft Rose Icons: Heart-Add (Right) & Cart (Left) */}
                  <div className="my-3 flex items-center justify-center gap-3.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product.id);
                      }}
                      aria-label="افزودن به علاقه‌مندی‌ها"
                      className="text-[#E8A3B5] hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      {isWishlisted ? (
                        <RiHeartFill className="h-[19px] w-[19px] text-[#D96B87]" />
                      ) : (
                        <RiHeartAddLine className="h-[19px] w-[19px]" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product, activeShade);
                      }}
                      aria-label={`افزودن ${product.name} به سبد خرید`}
                      className="text-[#E8A3B5] hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      <RiShoppingCartLine className="h-[19px] w-[19px]" />
                    </button>
                  </div>

                  {/* Single-Line Price Row: Strikethrough Old Price (Right in RTL) + Bold Current Price (Left in RTL) */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="flex flex-wrap items-baseline justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-xs text-[#231519]/40 line-through tabular-nums">
                      {product.originalPriceFormatted} تومان
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-[#231519] tabular-nums">
                      {product.priceFormatted} تومان
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Centered Flanked Chevron Controls (Matching IMG_8036_709676a7.PNG) */}
        <div className="mt-8 flex items-center justify-center">
          {/* Right Tapered Line */}
          <span
            aria-hidden="true"
            className="h-[1.5px] w-24 sm:w-36 bg-gradient-to-l from-transparent to-[#E3BCC8]"
          />

          {/* Two Circular Chevron Buttons (Filled Rose & Crisp White) */}
          <div className="flex items-center gap-2 px-2">
            <button
              onClick={() => {
                const categoriesOrder = ['all', ...CATEGORIES.map((c) => c.id)];
                const currentIdx = categoriesOrder.indexOf(activeCategoryFilter);
                const nextIdx = (currentIdx + 1) % categoriesOrder.length;
                setActiveCategoryFilter(categoriesOrder[nextIdx]);
              }}
              aria-label="دسته بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D96B87] border border-[#D96B87] text-white hover:bg-[#c25975] hover:border-[#c25975] transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.2]" />
            </button>
            <button
              onClick={() => {
                const categoriesOrder = ['all', ...CATEGORIES.map((c) => c.id)];
                const currentIdx = categoriesOrder.indexOf(activeCategoryFilter);
                const prevIdx =
                  (currentIdx - 1 + categoriesOrder.length) %
                  categoriesOrder.length;
                setActiveCategoryFilter(categoriesOrder[prevIdx]);
              }}
              aria-label="دسته قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E3BCC8] text-[#231519]/70 hover:bg-[#D96B87] hover:border-[#D96B87] hover:text-white transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Left Tapered Line */}
          <span
            aria-hidden="true"
            className="h-[1.5px] w-24 sm:w-36 bg-gradient-to-r from-transparent to-[#E3BCC8]"
          />
        </div>
      </section>

      {/* =====================================================================
          5. PROMOTIONAL BEAUTY BANNER (PORTRAIT ON RIGHT, TEXT ON LEFT — EXACT IMG_8005 COMPOSITION)
      ====================================================================== */}
      <section
        id="promo"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pb-12 sm:pb-14"
      >
        <div className="relative overflow-hidden rounded-[48px] sm:rounded-[60px] bg-gradient-to-r from-[#F8DCE3] via-[#FDF4F6] to-[#FADCE4] border-2 border-white lumi-capsule-shadow min-h-[310px] sm:min-h-[375px] flex items-center">
          {/* Panoramic Portrait & Silk Ribbon anchored to Bottom-Right, flowing to Left */}
          <img
            src="/images/hero/IMG_8007.png"
            alt="درخشش طبیعی و زیبایی ماندگار با محصولات لوکس نورا بیوتی"
            referrerPolicy="no-referrer"
            className="hidden lg:block pointer-events-none absolute bottom-0 right-0 h-[104%] w-[92%] object-contain object-right-bottom select-none z-0"
          />

          {/* Left Content (Visual Left Side via mr-auto in RTL): Persian Headline, Supporting Copy & CTA */}
          <div className="relative z-10 w-full lg:w-[48%] mr-auto p-7 sm:p-10 lg:pl-12 lg:pr-4 text-right">
            <h2 className="text-2xl sm:text-3xl xl:text-[36px] font-extrabold text-[#231519] leading-snug mb-3">
              درخشش طبیعی، زیبایی ماندگار
            </h2>
            <p className="text-xs sm:text-sm text-[#231519]/75 leading-relaxed mb-6 max-w-sm">
              با محصولات لوکس نورا، زیبایی رو به سبک خودت تجربه کن.
            </p>
            <button
              onClick={() => scrollToSection('products', 'products')}
              className="inline-flex items-center gap-2 rounded-full bg-[#231519] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#382228] transition-colors duration-200 cursor-pointer"
            >
              <span>مشاهده کالکشن</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile/Tablet Portrait below text */}
          <div className="lg:hidden w-full flex justify-end">
            <img
              src="/images/hero/IMG_8007.png"
              alt="درخشش طبیعی و زیبایی ماندگار با محصولات لوکس نورا بیوتی"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain object-bottom select-none"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          5B. NEW PRODUCTS SECTION (محصولات جدید — MATCHING 5-COLUMN DISCOUNTED LAYOUT)
      ====================================================================== */}
      <section
        id="new-products"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pt-4 pb-16 sm:pb-20"
      >
        {/* Main 5-Column Showcase Row: 1 Soft Pastel Blush Anchor Card (Right) + 4 White Product Cards (Left) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.22fr_1fr_1fr_1fr_1fr] xl:grid-cols-[1.15fr_1fr_1fr_1fr_1fr] gap-4 xl:gap-5 items-stretch">
          {/* Right Anchor Card (RTL First Column): Scooped Top-Right Cutout & Cart Icon matching محصولات تخفیف‌دار */}
          <div className="sm:col-span-2 lg:col-span-1 relative flex flex-col justify-between rounded-tl-[34px] rounded-b-[34px] rounded-tr-none p-5 sm:p-6 lg:p-4 xl:p-5 2xl:p-6 text-white min-h-[340px] lg:min-h-[380px]">
            {/* Inner Clipped Pink Gradient Background & Topographic Waves */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-tl-[34px] rounded-b-[34px] rounded-tr-none bg-gradient-to-b from-[#D96B87] via-[#CF5D7A] to-[#D96B87]">
              {/* Organic Topographic Contour Wave Pattern in Top-Right */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                fill="none"
                className="pointer-events-none absolute -top-4 -right-4 h-56 w-56 text-white/55"
              >
                <path
                  d="M220 68C178 72 156 52 132 28C114 10 98 0 76 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M220 96C168 100 142 74 114 44C94 22 76 8 48 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M220 126C158 128 126 98 96 62C74 36 54 16 20 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M220 156C146 158 110 122 76 80C54 52 32 26 0 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Top-Right Scooped Corner Cutout Notch & Fillets (Single Unified Unclipped Seamless SVG) */}
            <div className="pointer-events-none absolute -top-[2px] -right-[2px] z-20 h-[90px] w-[90px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 88 88"
                fill="none"
                preserveAspectRatio="none"
                className="block h-full w-full"
              >
                <path
                  d="M 0 0 H 88 V 88 A 24 24 0 0 0 64 64 H 52 A 28 28 0 0 1 24 36 V 24 A 24 24 0 0 0 0 0 Z"
                  fill="#FFFBFC"
                />
              </svg>
              <div className="absolute top-[2px] right-[2px] flex h-[64px] w-[64px] items-center justify-center">
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  className="h-9 w-9 text-[#D96B87]"
                >
                  <path
                    d="M31 7H27.5C26.4 7 25.5 7.7 25.2 8.8L21.8 21.2C21.5 22.3 20.5 23 19.4 23H9.8C8.6 23 7.6 22.1 7.4 20.9L6 11.4C5.8 10.1 6.8 9 8.1 9H24.5"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 13V19"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                  />
                  <circle cx="11.5" cy="27.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="19.5" cy="27.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </div>
            </div>

            {/* Center Large Two-Line White Kashida Title (Matching IMG_8035.PNG) */}
            <div className="relative z-10 flex-1 flex items-center justify-center text-center pt-12 pb-3">
              <h2 className="text-[31px] sm:text-[35px] lg:text-[29px] xl:text-[34px] font-extrabold leading-[1.38] text-white tracking-normal select-none">
                <span className="block whitespace-nowrap">محصـــــولات</span>
                <span className="block whitespace-nowrap">جـــــدیـــــد</span>
              </h2>
            </div>

            {/* Bottom White Inner Box with Category Quick-Filter Buttons */}
            <div className="relative z-10 overflow-hidden rounded-[24px] bg-white px-3.5 pt-3.5 pb-3.5 text-[#231519]">
              <div className="grid grid-cols-2 gap-1.5 text-center">
                {[
                  { id: 'all', label: 'همه جدیدها' },
                  { id: 'skincare', label: 'مراقبت پوست' },
                  { id: 'face', label: 'آرایش صورت' },
                  { id: 'lip', label: 'آرایش لب' }
                ].map((cat) => {
                  const isActive = activeNewCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveNewCategoryFilter(cat.id)}
                      className={`rounded-xl py-2 px-2 text-[11px] font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#D96B87] text-white'
                          : 'bg-[#FDF5F8] border border-[#EFC8D5] text-[#231519]/75 hover:bg-[#F3E2E7]/60 hover:text-[#231519]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4 New Product Cards in the Row (Matching IMG_8035__2__4b3af849.PNG) */}
          {displayedNewProducts.slice(0, 4).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const activeShade =
              cardSelectedShades[product.id] || product.shades?.[0]?.name;

            return (
              <div
                key={`new-${product.id}`}
                className="group relative flex flex-col justify-between rounded-[34px] bg-white p-5 sm:p-6 border border-[#F3E2E7]/85 hover:border-[#D96B87]/55 lumi-card-shadow hover:lumi-card-shadow-hover transition-all duration-200"
              >
                {/* Top Area: Top-Right Pill Badge + Product Image */}
                <div>
                  <div className="flex items-center justify-start mb-1">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#D96B87]/85 px-2.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
                      {product.discountPercent}
                    </span>
                  </div>

                  {/* Seamless Studio Product Image on Pure White Background */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="relative mx-auto my-2 flex h-48 w-full items-center justify-center bg-white p-2 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain select-none transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                {/* Bottom Area: Title -> Two Centered Rose Outline Icons -> Strikethrough & Bold Price Row */}
                <div className="flex flex-col items-center text-center pt-1">
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-[15px] sm:text-base font-bold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200 line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Two Centered Minimal Soft Rose Icons: Heart-Add (Right) & Cart (Left) */}
                  <div className="my-3 flex items-center justify-center gap-3.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product.id);
                      }}
                      aria-label="افزودن به علاقه‌مندی‌ها"
                      className="text-[#E8A3B5] hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      {isWishlisted ? (
                        <RiHeartFill className="h-[19px] w-[19px] text-[#D96B87]" />
                      ) : (
                        <RiHeartAddLine className="h-[19px] w-[19px]" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product, activeShade);
                      }}
                      aria-label={`افزودن ${product.name} به سبد خرید`}
                      className="text-[#E8A3B5] hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      <RiShoppingCartLine className="h-[19px] w-[19px]" />
                    </button>
                  </div>

                  {/* Single-Line Price Row: Strikethrough Old Price (Right in RTL) + Bold Current Price (Left in RTL) */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="flex flex-wrap items-baseline justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-xs text-[#231519]/40 line-through tabular-nums">
                      {product.originalPriceFormatted} تومان
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-[#231519] tabular-nums">
                      {product.priceFormatted} تومان
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Centered Flanked Chevron Controls (Matching IMG_8036_709676a7.PNG) */}
        <div className="mt-8 flex items-center justify-center">
          {/* Right Tapered Line */}
          <span
            aria-hidden="true"
            className="h-[1.5px] w-24 sm:w-36 bg-gradient-to-l from-transparent to-[#E3BCC8]"
          />

          {/* Two Circular Chevron Buttons (Filled Rose & Crisp White) */}
          <div className="flex items-center gap-2 px-2">
            <button
              onClick={() => {
                const categoriesOrder = ['all', 'skincare', 'face', 'lip', 'eye'];
                const currentIdx = categoriesOrder.indexOf(
                  activeNewCategoryFilter
                );
                const nextIdx = (currentIdx + 1) % categoriesOrder.length;
                setActiveNewCategoryFilter(categoriesOrder[nextIdx]);
              }}
              aria-label="دسته بعدی محصولات جدید"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D96B87] border border-[#D96B87] text-white hover:bg-[#c25975] hover:border-[#c25975] transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.2]" />
            </button>
            <button
              onClick={() => {
                const categoriesOrder = ['all', 'skincare', 'face', 'lip', 'eye'];
                const currentIdx = categoriesOrder.indexOf(
                  activeNewCategoryFilter
                );
                const prevIdx =
                  (currentIdx - 1 + categoriesOrder.length) %
                  categoriesOrder.length;
                setActiveNewCategoryFilter(categoriesOrder[prevIdx]);
              }}
              aria-label="دسته قبلی محصولات جدید"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E3BCC8] text-[#231519]/70 hover:bg-[#D96B87] hover:border-[#D96B87] hover:text-white transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Left Tapered Line */}
          <span
            aria-hidden="true"
            className="h-[1.5px] w-24 sm:w-36 bg-gradient-to-r from-transparent to-[#E3BCC8]"
          />
        </div>
      </section>

      {/* =====================================================================
          6. BESTSELLING PRODUCTS SECTION (محصولات پرفروش — SINGLE ROW SHOWCASE)
      ====================================================================== */}
      <section
        id="bestsellers"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pt-4 pb-16 sm:pb-20"
      >
        {/* Top Row: Title on Right + View More Button on Left */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Right Title */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#231519]">
            محصولات پرفروش
          </h2>

          {/* Left Pill CTA Button */}
          <button
            onClick={() => scrollToSection('products', 'products')}
            className="inline-flex items-center gap-2 rounded-full bg-[#231519] hover:bg-[#382228] px-5 py-2 text-xs sm:text-sm font-bold text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>مشاهده بیشتر</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Single Horizontal Row of 4 Bestselling Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => {
            const productIdx = (bestsellerPage * 2 + idx) % PRODUCTS.length;
            const product = PRODUCTS[productIdx];
            const rankIndex = productIdx + 1;
            const isWishlisted = wishlistIds.includes(product.id);
            const activeShade =
              cardSelectedShades[product.id] || product.shades?.[0]?.name;

            return (
              <div
                key={`bestseller-${product.id}-${idx}`}
                className="group relative flex flex-col justify-between rounded-[32px] bg-white p-5 sm:p-6 border border-[#F3E2E7]/85 hover:border-[#D96B87]/55 lumi-card-shadow hover:lumi-card-shadow-hover transition-all duration-200"
              >
                {/* Top Row: Subtle Rating on Right + Wishlist Button on Left */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#231519]/55 tabular-nums">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#231519]">
                        {toPersianDigits(product.rating)}
                      </span>
                      <span aria-hidden="true" className="text-[#231519]/25">
                        ·
                      </span>
                      <span className="text-[11px] text-[#231519]/45">
                        {toPersianDigits(product.reviewsCount)} دیدگاه
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product.id);
                      }}
                      aria-label="افزودن به علاقه‌مندی‌ها"
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${
                        isWishlisted
                          ? 'bg-[#FADCE4]/50 text-[#D96B87]'
                          : 'bg-[#FAF4F6]/80 text-[#231519]/45 hover:text-[#D96B87]'
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          isWishlisted ? 'fill-[#D96B87]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Seamless Studio Product Image on Pure White Surface */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="relative mx-auto my-2 flex h-52 w-full items-center justify-center bg-white p-3 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain select-none transition-transform duration-200 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                {/* Product Metadata & Title */}
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="mt-1 mb-4 text-right cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#231519]/45 mb-1">
                    <span>{product.categoryLabel}</span>
                    <span className="font-brand tracking-wider text-[#231519]/40">
                      0{rankIndex}
                    </span>
                  </div>
                  <h3 className="text-[15px] sm:text-base font-bold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200 truncate">
                    {product.name}
                  </h3>
                </div>

                {/* Bottom Action & Price Row */}
                <div className="flex items-center justify-between pt-3.5 border-t border-[#F3E2E7]/70">
                  <div className="flex flex-col text-right">
                    <span className="text-sm sm:text-base font-extrabold text-[#231519] tabular-nums">
                      {product.priceFormatted}{' '}
                      <span className="text-[11px] font-semibold text-[#231519]/65">
                        تومان
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product, activeShade)}
                    aria-label={`افزودن ${product.name} به سبد خرید`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF4F6] hover:bg-[#231519] px-3.5 py-2 text-xs font-bold text-[#231519] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-[#D96B87] group-hover:text-current transition-colors" />
                    <span>افزودن</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Controls: Right/Left Arrow Buttons on the Right + 3 Black Dots on the Left */}
        <div className="mt-7 flex items-center justify-between">
          {/* Right & Left Arrow Buttons on the Right (Filled Rose & Crisp White) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setBestsellerPage((prev) => (prev - 1 + 3) % 3)
              }
              aria-label="محصولات پرفروش قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D96B87] border border-[#D96B87] text-white hover:bg-[#c25975] hover:border-[#c25975] transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.2]" />
            </button>
            <button
              onClick={() =>
                setBestsellerPage((prev) => (prev + 1) % 3)
              }
              aria-label="محصولات پرفروش بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E3BCC8] text-[#231519]/70 hover:bg-[#D96B87] hover:border-[#D96B87] hover:text-white transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
            </button>
          </div>

          {/* 3 Black Pagination Dots on the Left (RTL End) */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((dotIdx) => {
              const isActive = bestsellerPage === dotIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => setBestsellerPage(dotIdx)}
                  aria-label={`صفحه ${dotIdx + 1} پرفروش‌ها`}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'w-5 bg-[#231519]'
                      : 'w-2 bg-[#231519]/30 hover:bg-[#231519]/60'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. POPULAR BRANDS SECTION (EXACT DESIGN MATCHING IMAGE_D19934ED.PNG)
          - Header: "برند ها"
          - Soft rounded container with faint 'B R A N D S' watermark background
          - 8 White rounded rectangular cards in 4x2 grid with centered brand logos
      ====================================================================== */}
      <section
        id="brands"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20"
      >
        {/* Centered Section Header: برندهای محبوب with flanking lines */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-[1.5px] w-10 rounded-full bg-[#D96B87]/60" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#231519]">
            برندهای محبوب
          </h2>
          <span className="h-[1.5px] w-10 rounded-full bg-[#D96B87]/60" />
        </div>

        {/* Soft Neutral Rounded Container with 'B R A N D S' Watermark & 8 White Cards */}
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] sm:rounded-[36px] bg-[#E6E5E7]/75 px-5 sm:px-8 lg:px-12 py-6 sm:py-8 border border-[#D5D4D7]/60">
          {/* Faint Background Watermark Typography: B R A N D S */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          >
            <span className="font-brand text-[56px] sm:text-[92px] lg:text-[122px] font-black tracking-[0.28em] text-[#231519]/[0.055] uppercase whitespace-nowrap">
              B R A N D S
            </span>
          </div>

          {/* 4x2 Grid of 8 Compact White Rounded Rectangular Brand Cards */}
          <div className="relative z-10 mx-auto max-w-[940px] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4">
            {POPULAR_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="relative flex h-[64px] sm:h-[70px] lg:h-[74px] items-center justify-center rounded-[18px] sm:rounded-[20px] bg-white px-3 py-1.5 shadow-xs border border-[#E5E5E7]/60 overflow-hidden select-none"
              >
                <BrandLogoGraphic brandId={brand.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. BEAUTY MAGAZINE SECTION (مقالات نورا بیوتی — EXACT 3-COL ASYMMETRICAL LAYOUT)
      ====================================================================== */}
      <section
        id="magazine"
        className="relative z-10 mx-auto w-full max-w-[1620px] px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20"
      >
        {/* Top Header Row: Title on Right (with subtle rose accent underline) + Dark Pill Button on Left */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#231519]">
            مقالات نورا بیوتی
          </h2>

          <button
            onClick={() => setSelectedBlogPost(BLOG_POSTS[0])}
            className="inline-flex items-center gap-2 rounded-full bg-[#231519] hover:bg-[#382228] px-5 py-2 text-xs sm:text-sm font-bold text-white transition-colors duration-200 cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 3-Column Asymmetrical Grid: 2 Large Vertical Cards (Right & Center) + 2 Stacked Horizontal Cards (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Right & Middle Columns: 2 Large Vertical Cards */}
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlogPost(post)}
              className="group lg:col-span-4 flex flex-col justify-between rounded-[28px] bg-white p-4 sm:p-5 border border-[#F3E2E7] hover:border-[#D96B87]/65 lumi-card-shadow transition-colors duration-200 cursor-pointer"
            >
              {/* Top Rounded Image */}
              <div className="relative mb-4 h-52 sm:h-60 w-full overflow-hidden rounded-[20px] bg-[#FAF4F6]">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover select-none"
                />
              </div>

              {/* Centered Title & Clean Editorial Metadata */}
              <div className="flex flex-col items-center text-center px-2 pt-1 pb-1">
                <h3 className="text-sm sm:text-[16px] font-extrabold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200 leading-[1.8] line-clamp-1 mb-2.5">
                  {post.title}
                </h3>

                <div className="flex items-center justify-center gap-2 text-[11.5px] font-medium text-[#231519]/50 tabular-nums">
                  <span>{post.numericDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.commentsLabel}</span>
                </div>
              </div>
            </article>
          ))}

          {/* Left Column: 2 Stacked Horizontal Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 sm:gap-6">
            {BLOG_POSTS.slice(2, 4).map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedBlogPost(post)}
                className="group flex-1 flex items-center gap-4 rounded-[28px] bg-white p-3.5 sm:p-4 border border-[#F3E2E7] hover:border-[#D96B87]/65 lumi-card-shadow transition-colors duration-200 cursor-pointer"
              >
                {/* Right Side Thumbnail (First in RTL) */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-36 shrink-0 overflow-hidden rounded-[18px] bg-[#FAF4F6]">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover select-none"
                  />
                </div>

                {/* Left Side Centered Title & Clean Editorial Metadata */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                  <h3 className="text-xs sm:text-[14.5px] font-extrabold text-[#231519] group-hover:text-[#D96B87] transition-colors duration-200 leading-[1.85] line-clamp-2 mb-2.5">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-[#231519]/50 tabular-nums">
                    <span>{post.numericDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.commentsLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. INTEGRATED FOOTER WITH SMOOTH CONCAVE CUTOUT NOTCH (MATCHING IMG_8062.PNG)
      ====================================================================== */}
      <footer
        id="footer"
        className="relative z-10 w-full mt-14"
      >
        {/* Full-Width Footer Band in Soft Neutral Grey (#E6E6E8) — No hard top border */}
        <div className="relative w-full bg-[#E6E6E8] px-6 sm:px-12 lg:px-20 pb-12 pt-4 md:pt-0">
          {/* Top-Center Recessed White Cutout Pocket with Smooth Concave Shoulder Fillets */}
          <div className="relative md:absolute md:-top-px md:left-1/2 md:-translate-x-1/2 z-20 mx-auto w-full max-w-[590px] bg-[#FFFBFC] px-3 sm:px-3.5 pb-3 sm:pb-3.5 pt-px rounded-b-[28px] sm:rounded-b-[32px]">
            {/* Left Smooth Concave Shoulder Fillet (Desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 25 24"
              fill="none"
              className="hidden md:block pointer-events-none absolute top-0 -left-[23px] h-6 w-[25px]"
            >
              <path d="M0 0H25V24H24A24 24 0 0 0 0 0Z" fill="#FFFBFC" />
            </svg>

            {/* Right Smooth Concave Shoulder Fillet (Desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 25 24"
              fill="none"
              className="hidden md:block pointer-events-none absolute top-0 -right-[23px] h-6 w-[25px]"
            >
              <path d="M0 0H25A24 24 0 0 0 1 24H0V0Z" fill="#FFFBFC" />
            </svg>

            {/* Newsletter Capsule in Vibrant Rose Pink */}
            <div className="md:-mt-2 rounded-[20px] sm:rounded-[22px] bg-[#D96B87] px-4 sm:px-6 py-2.5 sm:py-3 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                {/* Right Text: از تخفیفامون باخبر شید!! in White */}
                <h2 className="text-sm sm:text-[16px] font-extrabold text-white whitespace-nowrap">
                  از تخفیفامون باخبر شید!!
                </h2>

                {/* Left White Squircle Input + Accent Submit Button */}
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="w-full sm:w-[290px] flex items-center rounded-[14px] bg-white p-1 focus-within:ring-2 focus-within:ring-[#231519]/15 transition-all"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="آدرس ایمیل ..."
                    className="w-full bg-transparent px-3 py-1 text-xs text-[#231519] placeholder-[#231519]/45 focus:outline-none text-right"
                  />
                  <button
                    type="submit"
                    className="rounded-[10px] bg-[#231519] hover:bg-[#382228] px-4 py-1.5 text-xs font-bold text-white transition-colors duration-200 shrink-0 cursor-pointer"
                  >
                    {newsletterSubscribed ? 'ثبت شد' : 'ارسال'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 3-Column Symmetrical Footer Body (Side columns elevated into shoulders, Center column below notch) */}
          <div className="relative z-10 mx-auto max-w-[1120px] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-6 pt-6 md:pt-0 pb-4">
            {/* Right Column (RTL Start): دسته بندی محصولات — Elevated into right grey wing (6 items) */}
            <div className="flex flex-col items-center md:items-start text-right md:pt-10">
              <h3 className="text-base sm:text-[17px] font-extrabold mb-4 text-[#231519]">
                <span>دسته بندی </span>
                <span className="text-[#D96B87]">محصولات</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-[13.5px] font-medium text-[#231519]/80">
                {[
                  { label: 'آرایش صورت', catId: 'face' },
                  { label: 'آرایش لب و رژ', catId: 'lip' },
                  { label: 'آرایش چشم و ابرو', catId: 'eye' },
                  { label: 'مراقبت از پوست', catId: 'skincare' },
                  { label: 'سرم و آبرسان‌ها', catId: 'skincare' },
                  { label: 'عطر و خوشبوکننده', catId: 'fragrance' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D96B87] shrink-0" />
                    <button
                      onClick={() => {
                        setActiveCategoryFilter(item.catId);
                        scrollToSection('products', 'products');
                      }}
                      className="text-[#231519]/85 hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Column: Brand Logo + Emblem, Quoted Tagline & 4 Solid Rose Circular Social Buttons */}
            <div className="flex flex-col items-center justify-center text-center md:pt-26">
              {/* Brand Mark & Wordmark */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero', 'home');
                }}
                className="inline-flex items-center gap-2.5 mb-3 cursor-pointer"
                dir="ltr"
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  className="h-6 w-6 text-[#D96B87] shrink-0"
                >
                  <path
                    d="M14 3L24 23H19.5L14 12L8.5 23H4L14 3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 15.5L17.5 23H10.5L14 15.5Z"
                    fill="currentColor"
                    fillOpacity="0.45"
                  />
                </svg>
                <span className="font-sans text-xl sm:text-[23px] font-black tracking-[0.12em] text-[#231519]">
                  NORA
                </span>
              </a>

              {/* Quoted Tagline */}
              <p className="text-xs sm:text-[13.5px] font-medium text-[#231519]/80 mb-5">
                "محصولات لوکس آرایشی، زیبایی‌های فراموش‌نشدنی!"
              </p>

              {/* 4 Solid Filled Circular Social Buttons with White Icons (Matching IMG_8062.PNG) */}
              <div className="flex items-center justify-center gap-2.5">
                {/* Telegram */}
                <a
                  href="#telegram"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('کانال تلگرام نورا بیوتی');
                  }}
                  aria-label="Telegram"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#D96B87] text-white hover:bg-[#C25470] transition-colors duration-200 shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                </a>

                {/* Instagram */}
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('صفحه اینستاگرام نورا بیوتی');
                  }}
                  aria-label="Instagram"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#D96B87] text-white hover:bg-[#C25470] transition-colors duration-200 shadow-xs"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="#whatsapp"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('پشتیبانی واتساپ نورا بیوتی');
                  }}
                  aria-label="WhatsApp"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#D96B87] text-white hover:bg-[#C25470] transition-colors duration-200 shadow-xs"
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>

                {/* X (Twitter) */}
                <a
                  href="#x"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('صفحه X نورا بیوتی');
                  }}
                  aria-label="X"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#D96B87] text-white hover:bg-[#C25470] transition-colors duration-200 shadow-xs"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Left Column (RTL End): لینک های مهم — Elevated into left grey wing (6 items) */}
            <div className="flex flex-col items-center md:items-start text-right md:pt-10">
              <h3 className="text-base sm:text-[17px] font-extrabold mb-4 text-[#231519]">
                <span>لینک های </span>
                <span className="text-[#D96B87]">مهم</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-[13.5px] font-medium text-[#231519]/80">
                {[
                  {
                    label: 'بلاگ',
                    action: () => scrollToSection('magazine', 'about')
                  },
                  {
                    label: 'محصولات تخفیف‌دار',
                    action: () => scrollToSection('products', 'products')
                  },
                  {
                    label: 'محصولات جدید',
                    action: () => scrollToSection('new-products', 'products')
                  },
                  {
                    label: 'پرفروش‌ترین‌ها',
                    action: () => scrollToSection('bestsellers', 'bestsellers')
                  },
                  {
                    label: 'درباره ما',
                    action: () => scrollToSection('promo', 'about')
                  },
                  {
                    label: 'تماس با ما',
                    action: () => showToast('تلفن بوتیک نورا: ۰۲۱-۸۸۹۴۲۱۰۰')
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D96B87] shrink-0" />
                    <button
                      onClick={item.action}
                      className="text-[#231519]/85 hover:text-[#D96B87] transition-colors duration-200 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE E-COMMERCE DRAWERS & MODALS
      ====================================================================== */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        orderSuccess={orderSuccess}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Magazine Article Reader Modal */}
      {selectedBlogPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#231519]/40 backdrop-blur-sm p-4"
          onClick={() => setSelectedBlogPost(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[36px] bg-white p-6 sm:p-9 shadow-2xl border border-[#F3E2E7] max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 w-full overflow-hidden rounded-[24px] bg-[#FAF3F5] mb-6">
              <img
                src={selectedBlogPost.image}
                alt={selectedBlogPost.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-[#231519]/60 mb-2">
              <span className="font-bold text-[#D96B87]">
                {selectedBlogPost.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedBlogPost.date}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedBlogPost.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedBlogPost.author}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#231519] leading-snug mb-4">
              {selectedBlogPost.title}
            </h3>

            <div className="space-y-4 text-sm text-[#231519]/80 leading-[2]">
              <p className="font-medium text-[#231519]">
                {selectedBlogPost.excerpt}
              </p>
              {selectedBlogPost.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#F3E2E7] flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedBlogPost(null);
                  scrollToSection('products', 'products');
                }}
                className="rounded-full bg-[#231519] hover:bg-[#382228] px-6 py-2.5 text-xs font-bold text-white transition-colors duration-200 cursor-pointer"
              >
                مشاهده محصولات مرتبط
              </button>
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="rounded-full bg-[#FAF3F5] hover:bg-[#FADCE4]/60 px-6 py-2.5 text-xs font-bold text-[#231519] transition-colors duration-200 cursor-pointer"
              >
                بستن مقاله
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
