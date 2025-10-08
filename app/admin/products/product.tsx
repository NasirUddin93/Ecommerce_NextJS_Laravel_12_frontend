export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  base_price: number;
  stock_quantity: number;
  status: string;
  category?: { name: string };
  brand?: { name: string };
  images?: { image_url: string }[];
}
