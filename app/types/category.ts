export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  bannerImage: string;
  productCount: number;
  subcategories: Subcategory[];
  featured: boolean;
  parentCategory?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
}

export interface CategoryBanner {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  overlayColor: string;
  textColor: string;
}

export interface CategoryGridConfig {
  columns: number;
  gap: number;
  aspectRatio: string;
  showProductCount: boolean;
  showDescription: boolean;
  layout: 'grid' | 'masonry' | 'featured';
}