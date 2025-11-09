export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
  stock: number;
  tags: string[];
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  ratings: number[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterState {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  rating: number[];
  searchQuery: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  productsPerPage: number;
}