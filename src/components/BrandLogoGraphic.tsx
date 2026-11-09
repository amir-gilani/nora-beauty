import React from 'react';

interface BrandLogoGraphicProps {
  brandId: string;
}

const BRAND_LOGO_IMAGES: Record<
  string,
  { src: string; alt: string; className: string }
> = {
  nora: {
    src: '/images/brands/brand_nora.jpg',
    alt: 'NORA Paris',
    className:
      'h-11 sm:h-12.5 lg:h-13.5 w-auto max-w-[142px] sm:max-w-[162px] scale-[1.04]'
  },
  dior: {
    src: '/images/brands/brand_dior.jpg',
    alt: 'Dior Beauty',
    className:
      'h-11 sm:h-12.5 lg:h-13.5 w-auto max-w-[142px] sm:max-w-[162px] scale-[1.04]'
  },
  chanel: {
    src: '/images/brands/brand_chanel.jpg',
    alt: 'Chanel Paris',
    className:
      'h-13 sm:h-14.5 lg:h-16 w-auto max-w-[168px] sm:max-w-[192px] scale-[1.2]'
  },
  lancome: {
    src: '/images/brands/brand_lancome.jpg',
    alt: 'Lancôme Paris',
    className:
      'h-11 sm:h-12.5 lg:h-13.5 w-auto max-w-[142px] sm:max-w-[162px] scale-[1.04]'
  },
  estee: {
    src: '/images/brands/brand_estee.jpg',
    alt: 'Estée Lauder',
    className:
      'h-13 sm:h-14.5 lg:h-16 w-auto max-w-[172px] sm:max-w-[198px] scale-[1.22]'
  },
  ysl: {
    src: '/images/brands/brand_ysl.jpg',
    alt: 'Saint Laurent Beauté',
    className:
      'h-13 sm:h-14.5 lg:h-16 w-auto max-w-[172px] sm:max-w-[198px] scale-[1.22]'
  },
  armani: {
    src: '/images/brands/brand_armani.jpg',
    alt: 'Giorgio Armani Beauty',
    className:
      'h-13 sm:h-14.5 lg:h-16 w-auto max-w-[168px] sm:max-w-[192px] scale-[1.2]'
  },
  rare: {
    src: '/images/brands/brand_rare.jpg',
    alt: 'Rare Beauty',
    className:
      'h-11 sm:h-12.5 lg:h-13.5 w-auto max-w-[142px] sm:max-w-[162px] scale-[1.04]'
  }
};

export const BrandLogoGraphic: React.FC<BrandLogoGraphicProps> = ({ brandId }) => {
  const logo = BRAND_LOGO_IMAGES[brandId];
  if (!logo) return null;

  return (
    <img
      src={logo.src}
      alt={logo.alt}
      referrerPolicy="no-referrer"
      className={`${logo.className} object-contain mix-blend-multiply select-none pointer-events-none`}
    />
  );
};
