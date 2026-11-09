export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  shapeClass: string;
  productCount: string;
}

export interface ProductItem {
  id: string;
  name: string;
  englishName: string;
  category: string;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  originalPriceFormatted: string;
  discountPercent: string;
  rating: string;
  reviewsCount: string;
  image: string;
  badge?: 'جدید' | 'پرفروش';
  description: string;
  volume: string;
  highlights: string[];
  shades?: { name: string; hex: string }[];
}

export interface HeroSlide {
  id: number;
  indexLabel: string;
  tag: string;
  headlinePart1: string;
  headlinePart2Start: string;
  headlineHighlight: string;
  headlinePart2End: string;
  description: string;
  featuredProductTag: string;
  image: string;
  productId: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    indexLabel: '01 / 03',
    tag: 'کالکشن تخصصی مراقبت و درخشش پوست ۲۰۲۶',
    headlinePart1: 'زیبایی،',
    headlinePart2Start: 'از انتخاب ',
    headlineHighlight: 'تو',
    headlinePart2End: ' شروع میشه',
    description: 'محصولات آرایشی و مراقبت از پوست، برای درخشش زیبایی طبیعی تو با فرمولاسیون تخصصی و استانداردهای روز اروپا.',
    featuredProductTag: 'سرم درخشان‌کننده رز نورا — NORA Rose Elixir',
    image: '/images/hero/IMG_8004.png',
    productId: 'nora-rose-serum'
  },
  {
    id: 2,
    indexLabel: '02 / 03',
    tag: 'رایحه‌های ماندگار و مراقبت ابریشمی',
    headlinePart1: 'لطافت ابریشم،',
    headlinePart2Start: 'برای پوست ',
    headlineHighlight: 'تو',
    headlinePart2End: ' هر روز',
    description: 'ترکیبی از عصاره گل رز دمشقی، هیالورونیک اسید خالص و رایحه‌های فرانسوی برای طراوت و درخشش ماندگار.',
    featuredProductTag: 'ادوپرفیوم اختصاصی نورا رز — NORA Rose Élegance',
    image: '/images/hero/IMG_8004.png',
    productId: 'lumi-rose-perfume'
  },
  {
    id: 3,
    indexLabel: '03 / 03',
    tag: 'آبرسانی عمیق و بازسازی شبانه پوست',
    headlinePart1: 'درخشش خاص،',
    headlinePart2Start: 'به سبک ',
    headlineHighlight: 'تو',
    headlinePart2End: ' و ماندگار',
    description: 'مجموعه‌ای منتخب از سرم‌ها و کرم‌های آبرسان قوی برای داشتن پوستی شفاف، نرم و یکدست.',
    featuredProductTag: 'کرم آبرسان قوی نورا — NORA Deep Hydra Silk',
    image: '/images/hero/IMG_8004.png',
    productId: 'lumi-hydrating-cream'
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'eye',
    title: 'آرایش چشم',
    subtitle: 'خط چشم، ریمل و سایه ابریشمی',
    image: '/images/categories/cat_eye_makeup.jpg',
    shapeClass: 'organic-cat-1',
    productCount: '۲۴ محصول'
  },
  {
    id: 'lip',
    title: 'آرایش لب',
    subtitle: 'رژ لب مات، ساتن و برق لب',
    image: '/images/categories/cat_lip_makeup.jpg',
    shapeClass: 'organic-cat-2',
    productCount: '۳۲ محصول'
  },
  {
    id: 'skincare',
    title: 'مراقبت از پوست',
    subtitle: 'سرم، کرم آبرسان و تونر تخصصی',
    image: '/images/categories/cat_skincare_cream.jpg',
    shapeClass: 'organic-cat-3',
    productCount: '۴۵ محصول'
  },
  {
    id: 'fragrance',
    title: 'عطر و خوشبوکننده',
    subtitle: 'ادوپرفیوم و بادی‌میست لوکس',
    image: '/images/categories/cat_perfume_bottle.jpg',
    shapeClass: 'organic-cat-4',
    productCount: '۱۸ محصول'
  },
  {
    id: 'face',
    title: 'آرایش صورت',
    subtitle: 'کرم پودر، رژگونه و براش حرفه‌ای',
    image: '/images/categories/cat_face_brushes.jpg',
    shapeClass: 'organic-cat-5',
    productCount: '۳۸ محصول'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'lumi-matte-lipstick',
    name: 'رژ لب مات نورا',
    englishName: 'NORA Velvet Matte Lipstick',
    category: 'lip',
    categoryLabel: 'آرایش لب',
    price: 1290000,
    priceFormatted: '۱,۲۹۰,۰۰۰',
    originalPriceFormatted: '۱,۵۲۰,۰۰۰',
    discountPercent: '۱۵٪',
    rating: '4.7',
    reviewsCount: '۱۲۰',
    image: '/images/products/prod_matte_lipstick.png',
    badge: 'پرفروش',
    description: 'رژ لب مخملی و مات نورا با رنگدانه‌های غنی، بافت فوق‌سبک و غنی‌شده با روغن جوجوبا و ویتامین E بدون ایجاد خشکی روی لب.',
    volume: '۳.۸ گرم',
    highlights: ['پوشش مخملی ۱۲ ساعته', 'حاوی ویتامین E و شی‌باتر', 'فاقد پارابن و تست حیوانی'],
    shades: [
      { name: 'رز مخملی ۰۱', hex: '#B85B6C' },
      { name: 'نود گرم ۰۲', hex: '#C67D73' },
      { name: 'یاقوتی ۰۳', hex: '#943548' }
    ]
  },
  {
    id: 'lumi-hydrating-cream',
    name: 'کرم آبرسان قوی نورا',
    englishName: 'NORA Deep Hydra Silk Cream',
    category: 'skincare',
    categoryLabel: 'مراقبت از پوست',
    price: 1890000,
    priceFormatted: '۱,۸۹۰,۰۰۰',
    originalPriceFormatted: '۲,۲۵۰,۰۰۰',
    discountPercent: '۱۶٪',
    rating: '4.8',
    reviewsCount: '۱۶۰',
    image: '/images/products/prod_hydrating_cream.png',
    description: 'کرم آبرسان عمیق نورا با کمپلکس هیالورونیک اسید چندمولکولی و عصاره گل رز، رطوبت پوست را تا ۷۲ ساعت حفظ کرده و سد دفاعی پوست را تقویت می‌کند.',
    volume: '۵۰ میلی‌لیتر',
    highlights: ['آبرسانی عمیق ۷۲ ساعته', 'بافت ابریشمی و جذب سریع', 'مناسب انواع پوست حتی حساس']
  },
  {
    id: 'lumi-matte-foundation',
    name: 'کرم پودر مات نورا',
    englishName: 'NORA Flawless Silk Foundation',
    category: 'face',
    categoryLabel: 'آرایش صورت',
    price: 1890000,
    priceFormatted: '۱,۸۹۰,۰۰۰',
    originalPriceFormatted: '۲,۱۸۰,۰۰۰',
    discountPercent: '۱۳٪',
    rating: '4.7',
    reviewsCount: '۹۸',
    image: '/images/products/prod_matte_foundation.png',
    description: 'کرم پودر مات و ابریشمی نورا با پوشش طبیعی تا کامل، کنترل‌کننده چربی پوست و مقاوم در برابر رطوبت با جلوه‌ای یکدست و مخملی.',
    volume: '۳۰ میلی‌لیتر',
    highlights: ['فینیش مات طبیعی بدون ماسیدگی', 'حاوی SPF 20 و نیاسینامید', 'ماندگاری ۱۶ ساعته'],
    shades: [
      { name: 'عاجی روشن N10', hex: '#F3DAC6' },
      { name: 'بژ طبیعی W20', hex: '#E6C2A8' },
      { name: 'کاراملی گرم W30', hex: '#D4A88C' }
    ]
  },
  {
    id: 'lumi-rose-perfume',
    name: 'عطر زنانه نورا رز',
    englishName: 'NORA Rose Élegance Eau de Parfum',
    category: 'fragrance',
    categoryLabel: 'عطر و خوشبوکننده',
    price: 1990000,
    priceFormatted: '۱,۹۹۰,۰۰۰',
    originalPriceFormatted: '۲,۴۹۰,۰۰۰',
    discountPercent: '۲۰٪',
    rating: '4.8',
    reviewsCount: '۱۲۵',
    image: '/images/products/prod_rose_perfume.png',
    badge: 'جدید',
    description: 'ادوپرفیوم اختصاصی نورا رز با نت‌های آغازین شکوفه گیلاس و ترنج، قلب گل رز دمشقی و یاسمن، و پایه گرم مشک سفید و وانیل.',
    volume: '۱۰۰ میلی‌لیتر',
    highlights: ['نت اصلی: رز دمشقی و شکوفه گیلاس', 'غلظت ادوپرفیوم با پخش بوی بالا', 'طراحی بطری کریستال رزگلد']
  },
  {
    id: 'lumi-eye-palette',
    name: 'پالت سایه رزگلد نورا',
    englishName: 'NORA Rose Quartz Eye Palette',
    category: 'eye',
    categoryLabel: 'آرایش چشم',
    price: 1540000,
    priceFormatted: '۱,۵۴۰,۰۰۰',
    originalPriceFormatted: '۱,۸۵۰,۰۰۰',
    discountPercent: '۱۷٪',
    rating: '4.9',
    reviewsCount: '۸۴',
    image: '/images/products/prod_eye_palette.png',
    badge: 'جدید',
    description: 'مجموعه تخصصی آرایش چشم با رنگدانه‌های رزگلد ابریشمی و خط چشم ضدآب با نوک مویی فوق‌ظریف برای طراحی دقیق.',
    volume: '۱۲ گرم',
    highlights: ['پیگمنت بالا بدون ریزش زیر چشم', 'مقاوم در برابر تعریق تا ۲۴ ساعت', 'مناسب چشم‌های حساس']
  },
  {
    id: 'nora-rose-serum',
    name: 'سرم درخشان‌کننده رز نورا',
    englishName: 'NORA Radiance Rose Elixir Serum',
    category: 'skincare',
    categoryLabel: 'مراقبت از پوست',
    price: 1750000,
    priceFormatted: '۱,۷۵۰,۰۰۰',
    originalPriceFormatted: '۲,۱۰۰,۰۰۰',
    discountPercent: '۱۷٪',
    rating: '4.9',
    reviewsCount: '۱۱۲',
    image: '/images/products/prod_rose_serum.png',
    badge: 'جدید',
    description: 'سرم تخصصی شفاف‌کننده و آبرسان با عصاره گل رز بلغاری، ویتامین C پایدار و پپتیدهای کلاژن‌ساز برای درخشش فوری پوست.',
    volume: '۳۰ میلی‌لیتر',
    highlights: ['درخشش طبیعی و شفافیت پوست', 'جذب فوق‌سریع بدون حس چربی', 'غنی‌شده با ویتامین C و هیالورونیک اسید']
  },
  {
    id: 'nora-silk-blush',
    name: 'رژگونه ابریشمی نورا',
    englishName: 'NORA Velvet Rose Compact Blush',
    category: 'face',
    categoryLabel: 'آرایش صورت',
    price: 1180000,
    priceFormatted: '۱,۱۸۰,۰۰۰',
    originalPriceFormatted: '۱,۴۲۰,۰۰۰',
    discountPercent: '۱۷٪',
    rating: '4.8',
    reviewsCount: '۷۶',
    image: '/images/products/prod_silk_blush.png',
    badge: 'جدید',
    description: 'رژگونه فشرده با بافت پودری-ابریشمی و تناژ رز طبیعی که به‌نرمی روی گونه فید شده و طراوت روزانه به چهره می‌بخشد.',
    volume: '۸ گرم',
    highlights: ['بافت ابریشمی با فید آسان', 'دارای آینه داخلی و قاب رزگلد', 'ماندگاری ۱۲ ساعته']
  },
  {
    id: 'nora-lip-oil',
    name: 'روغن لب آبرسان نورا',
    englishName: 'NORA Crystal Rose Lip Oil',
    category: 'lip',
    categoryLabel: 'آرایش لب',
    price: 980000,
    priceFormatted: '۹۸۰,۰۰۰',
    originalPriceFormatted: '۱,۱۹۰,۰۰۰',
    discountPercent: '۱۸٪',
    rating: '4.9',
    reviewsCount: '۹۴',
    image: '/images/products/prod_lip_oil.png',
    badge: 'جدید',
    description: 'روغن لب مغذی و حجم‌دهنده با درخشش کریستالی، حاوی روغن بادام شیرین و عصاره گل رز بدون ایجاد حس چسبندگی.',
    volume: '۶ میلی‌لیتر',
    highlights: ['درخشش شیشه‌ای بدون چسبندگی', 'ترمیم‌کننده لب‌های خشک', 'اپلیکاتور نرم و حرفه‌ای']
  }
];

export interface BlogPostItem {
  id: string;
  issueNumber: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  numericDate: string;
  commentsLabel: string;
  readTime: string;
  author: string;
  image: string;
  relatedProductId: string;
  keyTakeaway: string;
  content: string[];
}

export const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'skincare-routine-glow',
    issueNumber: '۰۱',
    title: 'راهنمای روتین پوستی شبانه برای درخشش طبیعی پوست شما!',
    excerpt: 'چگونه با لایه‌بندی اصولی سرم‌های آبرسان و کرم‌های بازسازی‌کننده، در ساعات طلایی خواب به پوستی شفاف، نرم و یکدست برسید.',
    category: 'مراقبت از پوست',
    date: '۱۵ آبان ۱۴۰۴',
    numericDate: '۱۴۰۴/۰۸/۱۵',
    commentsLabel: '۴ دیدگاه',
    readTime: '۴ دقیقه مطالعه',
    author: 'تحریریه زیبایی نورا',
    image: '/images/articles/mag_night_skincare.jpg',
    relatedProductId: 'lumi-hydrating-cream',
    keyTakeaway: 'استفاده از سرم روی پوست نیمه‌مرطوب جذب هیالورونیک اسید را تا ۴۰٪ افزایش می‌دهد.',
    content: [
      'پوست در ساعات شب بیشترین میزان بازسازی سلولی را انجام می‌دهد. پاکسازی ملایم و استفاده از تونر بدون الکل، اولین قدم برای آماده‌سازی پوست جهت جذب ترکیبات فعال است.',
      'استفاده از سرم هیالورونیک اسید روی پوست کمی مرطوب و سپس قفل کردن رطوبت با کرم آبرسان قوی نورا، باعث می‌شود صبح روز بعد پوستی نرم، یکدست و شفاف داشته باشید.'
    ]
  },
  {
    id: 'lip-shade-guide',
    issueNumber: '۰۲',
    title: 'راهنمای ترکیب و رنگ‌بندی رژ لب متناسب با استایل شما!',
    excerpt: 'روش تشخیص سریع تناژ زیرپوستی گرم و سرد برای انتخاب رنگی که چهره شما را شاداب‌تر و درخشان‌تر نشان می‌دهد.',
    category: 'آرایش لب',
    date: '۱۲ آبان ۱۴۰۴',
    numericDate: '۱۴۰۴/۰۸/۱۲',
    commentsLabel: '۲ دیدگاه',
    readTime: '۳ دقیقه مطالعه',
    author: 'سارا راد — میکاپ آرتیست',
    image: '/images/articles/mag_lip_editorial.jpg',
    relatedProductId: 'lumi-matte-lipstick',
    keyTakeaway: 'تناژهای رز مخملی با زیرساخت خنثی، با ۹۰٪ تناژهای پوستی هماهنگی کامل دارند.',
    content: [
      'برای انتخاب رژ لب ایده‌آل، ابتدا به تناژ رگ‌های مچ دست خود در نور طبیعی توجه کنید. پوست‌های با تناژ گرم با رنگ‌های نود هلویی، کاراملی و رز گرم درخشش فوق‌العاده‌ای پیدا می‌کنند.',
      'فرمولاسیون مخملی رژ لب‌های مات نورا به گونه‌ای طراحی شده که علاوه بر ماندگاری بالا، رطوبت لب‌ها را حفظ کرده و خطوط لب را پوشش می‌دهد.'
    ]
  },
  {
    id: 'perfume-longevity-tips',
    issueNumber: '۰۳',
    title: 'کدام عطر و رایحه برای فصل‌های خنک سال بهتر است؟',
    excerpt: 'بهترین نقاط نبض بدن و تکنیک ترکیب لوسیون مرطوب‌کننده با ادوپرفیوم‌های گلی و چوبی برای پخش بوی ماندگار.',
    category: 'عطر و رایحه',
    date: '۸ آبان ۱۴۰۴',
    numericDate: '۱۴۰۴/۰۸/۰۸',
    commentsLabel: '۰ دیدگاه',
    readTime: '۵ دقیقه مطالعه',
    author: 'تحریریه زیبایی نورا',
    image: '/images/articles/mag_autumn_fragrance.jpg',
    relatedProductId: 'lumi-rose-perfume',
    keyTakeaway: 'پوست مرطوب مولکول‌های معطر را تا ۳ برابر طولانی‌تر از پوست خشک حفظ می‌کند.',
    content: [
      'پوست مرطوب رایحه عطر را بسیار طولانی‌تر از پوست خشک نگه می‌دارد. پیش از اسپری کردن ادوپرفیوم نورا رز، از یک لوسیون بدن بدون بو روی نقاط نبض استفاده کنید.',
      'اسپری کردن عطر از فاصله ۱۵ سانتی‌متری روی مچ دست، پشت گوش و قفسه سینه بدون مالش دادن مچ‌ها به یکدیگر، ساختار نت‌های گلی و آغازین عطر را کاملاً حفظ می‌کند.'
    ]
  },
  {
    id: 'rose-gold-eye-glam',
    issueNumber: '۰۴',
    title: 'کدام پالت سایه و آرایش چشم برای چهره شما بهتر است؟',
    excerpt: 'آموزش گام‌به‌گام ترکیب سایه‌های مات و شاین رزگلد برای کشیده‌تر نشان دادن فرم چشم‌ها به سبک میکاپ‌های اروپایی.',
    category: 'آرایش چشم',
    date: '۳ آبان ۱۴۰۴',
    numericDate: '۱۴۰۴/۰۸/۰۳',
    commentsLabel: '۳ دیدگاه',
    readTime: '۴ دقیقه مطالعه',
    author: 'نیلوفر فرهمند — استایلیست زیبایی',
    image: '/images/articles/mag_eye_makeup_art.jpg',
    relatedProductId: 'lumi-eye-palette',
    keyTakeaway: 'زدن شاین شامپاینی در گوشه داخلی چشم، بلافاصله چهره را بیدار و شاداب نشان می‌دهد.',
    content: [
      'برای شروع آرایش چشم رزگلد، ابتدا یک سایه نود مات را در چین پلک فید کنید تا عمق طبیعی ایجاد شود. سپس پیگمنت درخشان رزگلد را با نوک انگشت روی مرکز پلک متحرک قرار دهید.',
      'در انتها، یک خط چشم ظریف در امتداد مژه‌ها بکشید تا فرم چشم‌ها بدون سنگین شدن میکاپ، کشیده و جذاب‌تر دیده شود.'
    ]
  }
];

export const POPULAR_BRANDS = [
  { id: 'nora', name: 'NORA PARIS', subtitle: 'مجموعه اختصاصی نورا', logoText: 'N O R A', logoSub: 'PARIS', image: '/images/brands/brand_nora.jpg' },
  { id: 'dior', name: 'DIOR BEAUTY', subtitle: 'آرایش و عطر لوکس', logoText: 'D i o r', logoSub: 'BEAUTY', image: '/images/brands/brand_dior.jpg' },
  { id: 'chanel', name: 'CHANEL', subtitle: 'مراقبت پوست و زیبایی', logoText: 'CHANEL', logoSub: 'PARIS', image: '/images/brands/brand_chanel.jpg' },
  { id: 'lancome', name: 'LANCÔME', subtitle: 'سرم و عطر فرانسوی', logoText: 'LANCÔME', logoSub: 'PARIS', image: '/images/brands/brand_lancome.jpg' },
  { id: 'estee', name: 'ESTÉE LAUDER', subtitle: 'تخصصی جوانسازی پوست', logoText: 'ESTÉE LAUDER', logoSub: 'NEW YORK', image: '/images/brands/brand_estee.jpg' },
  { id: 'ysl', name: 'YVES SAINT LAURENT', subtitle: 'آرایش و رژلب‌های نمادین', logoText: 'YVES SAINT LAURENT', logoSub: 'BEAUTÉ', image: '/images/brands/brand_ysl.jpg' },
  { id: 'armani', name: 'GIORGIO ARMANI', subtitle: 'کرم‌پودر و محصولات ابریشمی', logoText: 'GIORGIO ARMANI', logoSub: 'BEAUTY', image: '/images/brands/brand_armani.jpg' },
  { id: 'rare', name: 'RARE BEAUTY', subtitle: 'آرایش مینیمال و طبیعی', logoText: 'Rare Beauty', logoSub: 'BY SELENA GOMEZ', image: '/images/brands/brand_rare.jpg' }
];

export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

export function formatToman(amount: number): string {
  const withCommas = amount.toLocaleString('en-US');
  return toPersianDigits(withCommas);
}
