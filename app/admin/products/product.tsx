export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  sku: string;
  description?: string;
  base_price: number;
  stock_quantity: number;
  weight?: number;
  is_seasonal: boolean;
  seasonal_start_date?: string | null;
  seasonal_end_date?: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  product_images: ProductImage[];
}
