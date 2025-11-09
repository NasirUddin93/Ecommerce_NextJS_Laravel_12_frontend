export interface SaleProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  stock: number;
  discount: number;
  discountType: 'percentage' | 'fixed' | 'clearance';
  saleEndDate: string;
  isBestseller: boolean;
  isNew: boolean;
  tags: string[];
  description: string;
  variants: ProductVariant[];
  unitsSold: number;
  discountTier?: 'hot' | 'popular' | 'ending-soon';
}

export interface ProductVariant {
  id: string;
  type: 'color' | 'size' | 'material';
  values: VariantValue[];
}

export interface VariantValue {
  id: string;
  value: string;
  label: string;
  available: boolean;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  discountRange: [number, number];
  ratings: number[];
  tags: string[];
  availability: 'all' | 'in-stock' | 'out-of-stock';
  discountType: ('percentage' | 'fixed' | 'clearance')[];
  saleType: 'all' | 'flash-sale' | 'clearance' | 'weekly-deals';
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

export interface ViewMode {
  type: 'grid' | 'list' | 'compact';
  columns: number;
}

export interface SaleBanner {
  title: string;
  subtitle: string;
  description: string;
  discount: number;
  endDate: string;
  backgroundColor: string;
  textColor: string;
  ctaText: string;
  ctaLink: string;
}

export interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEndingSoon: boolean;
}