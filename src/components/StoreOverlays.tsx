/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Heart,
  Star,
  CheckCircle2,
  ArrowLeft,
  Search
} from 'lucide-react';
import { ProductItem, formatToman, toPersianDigits } from '../data/catalog';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedShade?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  orderSuccess: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  orderSuccess
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#231519]/30 backdrop-blur-xs transition-opacity">
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-[#FFFBFC] shadow-2xl border-r border-[#F3E2E7]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F3E2E7] px-6 py-5 bg-[#FAF3F5]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FADCE4] text-[#D96B87]">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231519]">سبد خرید شما</h3>
              <p className="text-xs text-[#231519]/60">
                {toPersianDigits(
                  items.reduce((acc, item) => acc + item.quantity, 0)
                )}{' '}
                محصول انتخاب شده
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#231519]/70 hover:bg-[#FADCE4] hover:text-[#231519] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FADCE4] text-[#D96B87] mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-[#231519] mb-2">
                سفارش شما با موفقیت ثبت شد!
              </h4>
              <p className="text-sm text-[#231519]/70 max-w-xs leading-relaxed mb-6">
                از خرید شما در نورا بیوتی سپاسگزاریم. کد رهگیری سفارش به شماره همراه شما پیامک شد.
              </p>
              <button
                onClick={onClose}
                className="rounded-full bg-[#231519] px-7 py-3 text-sm font-medium text-white hover:bg-[#382228] transition-colors cursor-pointer"
              >
                بازگشت به فروشگاه
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF3F5] text-[#D96B87] mb-4">
                <ShoppingBag className="h-7 w-7 opacity-70" />
              </div>
              <h4 className="text-base font-bold text-[#231519] mb-1">
                سبد خرید شما خالی است
              </h4>
              <p className="text-xs text-[#231519]/60 max-w-xs leading-relaxed">
                محصولات محبوب خود را از کالکشن نورا بیوتی انتخاب کنید و به سبد خرید اضافه نمایید.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedShade || 'default'}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-3.5 border border-[#F3E2E7]"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-xl object-contain bg-white border border-[#F3E2E7] p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#231519] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-[#231519]/55 mt-0.5">
                    {item.selectedShade
                      ? `رنگ / شید: ${item.selectedShade}`
                      : item.product.volume}
                  </p>
                  <p className="text-xs font-bold text-[#D96B87] mt-1.5 tabular-nums">
                    {formatToman(item.product.price * item.quantity)}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2 rounded-full bg-[#FAF3F5] px-2 py-0.5 border border-[#F3E2E7]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 text-[#231519]/70 hover:text-[#231519] cursor-pointer"
                        aria-label="افزایش تعداد"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold text-[#231519] px-1 tabular-nums">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 text-[#231519]/70 hover:text-[#231519] cursor-pointer"
                        aria-label="کاهش تعداد"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-[#231519]/40 hover:text-rose-500 transition-colors cursor-pointer"
                      aria-label="حذف از سبد"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!orderSuccess && items.length > 0 && (
          <div className="border-t border-[#F3E2E7] bg-[#FAF3F5] p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#231519]/70">
              <span>هزینه ارسال (بسته‌بندی ویژه نورا)</span>
              <span className="font-medium text-emerald-700">رایگان</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-[#231519]">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-[#D96B87] tabular-nums">
                {formatToman(totalAmount)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#231519] py-3.5 text-sm font-semibold text-white hover:bg-[#382228] transition-all cursor-pointer"
            >
              <span>تکمیل خرید و پرداخت امن</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ProductItem[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onToggleWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#231519]/30 backdrop-blur-xs">
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-[#FFFBFC] shadow-2xl border-r border-[#F3E2E7]"
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-[#F3E2E7] px-6 py-5 bg-[#FAF3F5]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FADCE4] text-[#D96B87]">
              <Heart className="h-4 w-4 fill-[#D96B87]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231519]">
                لیست علاقه‌مندی‌ها
              </h3>
              <p className="text-xs text-[#231519]/60">
                {toPersianDigits(wishlistProducts.length)} محصول محبوب شما
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن لیست علاقه‌مندی"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#231519]/70 hover:bg-[#FADCE4] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF3F5] text-[#D96B87] mb-4">
                <Heart className="h-7 w-7 opacity-70" />
              </div>
              <h4 className="text-base font-bold text-[#231519] mb-1">
                لیست علاقه‌مندی شما خالی است
              </h4>
              <p className="text-xs text-[#231519]/60 max-w-xs leading-relaxed">
                با کلیک بر روی آیکون قلب در کنار هر محصول، آن را به لیست محبوب‌ترین‌های خود اضافه کنید.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-3.5 border border-[#F3E2E7]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-xl object-contain bg-white border border-[#F3E2E7] p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#231519] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#231519]/60 mt-0.5">
                    {product.categoryLabel}
                  </p>
                  <p className="text-xs font-bold text-[#231519] mt-1.5 tabular-nums">
                    {product.priceFormatted} تومان
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="rounded-full bg-[#231519] px-3.5 py-1.5 text-[11px] font-medium text-white hover:bg-[#382228] transition-colors cursor-pointer"
                    >
                      افزودن به سبد خرید
                    </button>
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="rounded-full bg-[#FAF3F5] px-3 py-1.5 text-[11px] text-[#231519]/70 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, shade?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    product?.shades?.[0]?.name
  );

  React.useEffect(() => {
    setSelectedShade(product?.shades?.[0]?.name);
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#231519]/35 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-[36px] bg-[#FFFBFC] border border-[#F3E2E7] shadow-2xl p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="بستن پنجره محصول"
          className="absolute top-5 left-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF3F5] text-[#231519]/70 hover:bg-[#FADCE4] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Product Image */}
          <div className="relative aspect-square rounded-[28px] bg-white p-6 flex items-center justify-center overflow-hidden border border-[#F3E2E7]">
            {product.badge && (
              <span className="absolute top-4 right-5 text-xs font-bold text-[#D96B87] tracking-wide">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-[#D96B87] mb-1">
              {product.englishName}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#231519]">
              {product.name}
            </h3>
            <p className="text-xs text-[#231519]/60 mt-1">
              {product.categoryLabel} · {product.volume}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-3">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-[#231519] tabular-nums">
                {toPersianDigits(product.rating)}
              </span>
              <span className="text-xs text-[#231519]/50 tabular-nums">
                ({toPersianDigits(product.reviewsCount)} دیدگاه خریداران)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#231519]/75 leading-relaxed mt-4">
              {product.description}
            </p>

            {/* Editorial Highlights List (Unboxed) */}
            <ul className="mt-4 pt-3 border-t border-[#F3E2E7]/80 space-y-1.5 text-xs font-medium text-[#231519]/75">
              {product.highlights.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-[#D96B87]">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Shade Selector if available */}
            {product.shades && product.shades.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-[#231519] mb-2">
                  انتخاب رنگ / شید:{' '}
                  <span className="text-[#D96B87] font-bold">
                    {selectedShade}
                  </span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      type="button"
                      onClick={() => setSelectedShade(shade.name)}
                      title={shade.name}
                      className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer ${
                        selectedShade === shade.name
                          ? 'border-[#231519] scale-110 shadow-sm'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Price & CTA */}
            <div className="mt-6 pt-4 border-t border-[#F3E2E7] flex items-center justify-between gap-3">
              <div>
                <span className="block text-[11px] text-[#231519]/50">
                  قیمت مصرف‌کننده
                </span>
                <span className="text-lg font-extrabold text-[#231519] tabular-nums">
                  {product.priceFormatted}{' '}
                  <span className="text-xs font-medium">تومان</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="افزودن به علاقه‌مندی"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#D96B87] bg-[#FADCE4]/50 text-[#D96B87]'
                      : 'border-[#F3E2E7] bg-[#FAF3F5] text-[#231519]/70 hover:border-[#D96B87]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? 'fill-[#D96B87]' : ''}`}
                  />
                </button>
                <button
                  onClick={() => {
                    onAddToCart(product, selectedShade);
                    onClose();
                  }}
                  className="flex items-center gap-2 rounded-full bg-[#231519] px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#382228] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.includes(query.trim()) ||
      p.categoryLabel.includes(query.trim()) ||
      p.englishName.toLowerCase().includes(query.trim().toLowerCase()) ||
      p.description.includes(query.trim())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#231519]/30 backdrop-blur-xs pt-20 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-[32px] bg-[#FFFBFC] border border-[#F3E2E7] shadow-2xl p-6"
      >
        <div className="relative flex items-center">
          <Search className="absolute right-4 h-5 w-5 text-[#231519]/45" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام محصول، کرم، رژ لب یا عطر نورا..."
            className="w-full rounded-full bg-[#FAF3F5] border border-[#F3E2E7] py-3.5 pr-12 pl-10 text-sm text-[#231519] placeholder-[#231519]/45 focus:outline-none focus:border-[#D96B87]"
          />
          <button
            onClick={onClose}
            className="absolute left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#231519]/60 hover:text-[#231519] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 max-h-80 overflow-y-auto space-y-2.5">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-[#231519]/60">
              محصولی با این عبارت یافت نشد.
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-2xl bg-white hover:bg-[#FAF3F5] p-3 border border-[#F3E2E7] transition-colors text-right cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-contain bg-white border border-[#F3E2E7] p-1"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#231519]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#231519]/55 mt-0.5">
                      {item.categoryLabel}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D96B87] tabular-nums">
                  {item.priceFormatted} تومان
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
