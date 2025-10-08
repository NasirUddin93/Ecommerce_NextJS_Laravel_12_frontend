export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  category_id: string;
  brand_id: string;
  name: string;
  sku: string;
  description: string;
  base_price: number;
  stock_quantity: number;
  weight: number;
  is_seasonal: boolean;
  seasonal_start_date: string;
  seasonal_end_date: string;
  status: "active" | "inactive";
  category?: Category;
  brand?: Brand;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}