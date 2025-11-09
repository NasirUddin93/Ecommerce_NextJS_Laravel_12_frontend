export interface NewArrivalProduct {
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
  isNew: boolean;
  isBestseller: boolean;
  discount?: number;
  tags: string[];
  arrivalDate: string;
  featured: boolean;
  variants: ProductVariant[];
  description: string;
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
  availability: 'all' | 'in-stock' | 'out-of-stock';
  featured: boolean;
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

export interface ViewMode {
  type: 'grid' | 'list' | 'masonry';
  columns: number;
}