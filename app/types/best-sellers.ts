export interface BestSellerProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isBestseller: boolean;
  isNew?: boolean;
  discount?: number;
  tags: string[];
  salesCount: number;
  revenue: number;
  rank: number;
  previousRank?: number;
  rankChange?: 'up' | 'down' | 'same' | 'new';
  description: string;
  variants: ProductVariant[];
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
  ratings: number[];
  tags: string[];
  timeFrame: 'all-time' | 'monthly' | 'weekly' | 'daily';
  availability: 'all' | 'in-stock' | 'out-of-stock';
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

export interface ViewMode {
  type: 'grid' | 'list' | 'ranked';
  columns: number;
}

export interface TimeFrameStats {
  label: string;
  totalSales: number;
  topProduct: string;
  growth: number;
}