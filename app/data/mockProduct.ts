export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  thumbnail: string;
  category: string;
  subcategory: string;
  tags: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  discount?: number;
  warranty: string;
  shipping: ShippingInfo;
  seo: SEOInfo;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material' | 'style';
  values: VariantValue[];
  required: boolean;
}

export interface VariantValue {
  id: string;
  value: string;
  label: string;
  image?: string;
  priceAdjustment?: number;
  stock: number;
  available: boolean;
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface ShippingInfo {
  freeShipping: boolean;
  minFreeShippingAmount?: number;
  estimatedDelivery: string;
  returnPolicy: string;
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  isNew?: boolean;
}