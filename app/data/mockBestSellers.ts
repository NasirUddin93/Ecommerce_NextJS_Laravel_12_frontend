import { BestSellerProduct, SortOption, TimeFrameStats } from '../types/best-sellers';

export const mockBestSellers: BestSellerProduct[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    brand: 'AudioTech',
    price: 299.99,
    originalPrice: 399.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.8,
    reviewCount: 1289,
    stock: 45,
    isBestseller: true,
    isNew: false,
    discount: 25,
    tags: ['wireless', 'noise-cancelling', 'premium', 'bestseller'],
    salesCount: 2547,
    revenue: 763953,
    rank: 1,
    previousRank: 1,
    rankChange: 'same',
    description: 'Industry-leading noise cancellation with exceptional sound quality and 30-hour battery life.',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'black', value: '#000000', label: 'Matte Black', available: true },
          { id: 'silver', value: '#C0C0C0', label: 'Silver', available: true }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Series X',
    brand: 'FitGear',
    price: 349.99,
    originalPrice: 399.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Wearables',
    rating: 4.6,
    reviewCount: 2156,
    stock: 28,
    isBestseller: true,
    isNew: true,
    discount: 13,
    tags: ['fitness', 'smartwatch', 'health', 'bestseller'],
    salesCount: 1893,
    revenue: 662127,
    rank: 2,
    previousRank: 3,
    rankChange: 'up',
    description: 'Advanced fitness tracking with ECG monitor, always-on display, and comprehensive health metrics.',
    variants: [
      {
        id: 'size',
        type: 'size',
        values: [
          { id: '44mm', value: '44mm', label: '44mm', available: true },
          { id: '42mm', value: '42mm', label: '42mm', available: true }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Organic Cotton Oversized Hoodie',
    brand: 'EcoWear',
    price: 79.99,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Clothing',
    rating: 4.7,
    reviewCount: 867,
    stock: 0,
    isBestseller: true,
    isNew: false,
    tags: ['organic', 'sustainable', 'casual', 'bestseller'],
    salesCount: 1567,
    revenue: 125293,
    rank: 3,
    previousRank: 2,
    rankChange: 'down',
    description: 'Comfortable oversized hoodie made from 100% organic cotton with premium stitching.',
    variants: [
      {
        id: 'size',
        type: 'size',
        values: [
          { id: 's', value: 'S', label: 'Small', available: true },
          { id: 'm', value: 'M', label: 'Medium', available: true },
          { id: 'l', value: 'L', label: 'Large', available: false }
        ]
      },
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'gray', value: '#808080', label: 'Heather Gray', available: true },
          { id: 'green', value: '#556B2F', label: 'Sage Green', available: true }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Professional Camera Lens 85mm f/1.4',
    brand: 'PhotoPro',
    price: 1299.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Photography',
    rating: 4.9,
    reviewCount: 334,
    stock: 12,
    isBestseller: true,
    isNew: false,
    tags: ['professional', 'portrait', 'prime-lens', 'bestseller'],
    salesCount: 892,
    revenue: 1159191,
    rank: 4,
    previousRank: 5,
    rankChange: 'up',
    description: 'Professional portrait lens with exceptional bokeh and razor-sharp image quality.',
    variants: []
  },
  {
    id: '5',
    name: 'Minimalist Leather Backpack',
    brand: 'UrbanGear',
    price: 159.99,
    originalPrice: 199.99,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Accessories',
    rating: 4.4,
    reviewCount: 1092,
    stock: 36,
    isBestseller: true,
    isNew: false,
    discount: 20,
    tags: ['minimalist', 'leather', 'laptop', 'bestseller'],
    salesCount: 1345,
    revenue: 215185,
    rank: 5,
    previousRank: 4,
    rankChange: 'down',
    description: 'Sleek leather backpack with laptop compartment, multiple pockets, and water-resistant design.',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'brown', value: '#8B4513', label: 'Chestnut Brown', available: true },
          { id: 'black', value: '#000000', label: 'Jet Black', available: true }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Yoga Mat Pro with Alignment',
    brand: 'FitLife',
    price: 89.99,
    originalPrice: 119.99,
    image: '/api/placeholder/400/400',
    category: 'Sports',
    subcategory: 'Fitness',
    rating: 4.7,
    reviewCount: 1567,
    stock: 72,
    isBestseller: true,
    isNew: true,
    discount: 25,
    tags: ['yoga', 'fitness', 'non-slip', 'bestseller'],
    salesCount: 2234,
    revenue: 201026,
    rank: 6,
    previousRank: 8,
    rankChange: 'up',
    description: 'Professional yoga mat with alignment system, superior grip, and eco-friendly materials.',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'purple', value: '#800080', label: 'Deep Purple', available: true },
          { id: 'teal', value: '#008080', label: 'Ocean Teal', available: true }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Wireless Earbuds Pro',
    brand: 'AudioTech',
    price: 199.99,
    originalPrice: 249.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.5,
    reviewCount: 892,
    stock: 89,
    isBestseller: true,
    isNew: true,
    discount: 20,
    tags: ['wireless', 'earbuds', 'noise-cancelling', 'bestseller'],
    salesCount: 1789,
    revenue: 357811,
    rank: 7,
    previousRank: null,
    rankChange: 'new',
    description: 'True wireless earbuds with active noise cancellation and immersive sound quality.',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'white', value: '#FFFFFF', label: 'Pearl White', available: true },
          { id: 'black', value: '#000000', label: 'Matte Black', available: true }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Smart Home Hub Pro',
    brand: 'TechHome',
    price: 129.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Smart Home',
    rating: 4.3,
    reviewCount: 645,
    stock: 156,
    isBestseller: true,
    isNew: false,
    tags: ['smart-home', 'voice-control', 'automation', 'bestseller'],
    salesCount: 987,
    revenue: 128313,
    rank: 8,
    previousRank: 7,
    rankChange: 'down',
    description: 'Central hub for all your smart home devices with voice control and advanced automation.',
    variants: []
  }
];

export const sortOptions: SortOption[] = [
  { value: 'rank', label: 'Best Seller Rank', field: 'rank', order: 'asc' },
  { value: 'sales', label: 'Sales Count', field: 'salesCount', order: 'desc' },
  { value: 'revenue', label: 'Revenue', field: 'revenue', order: 'desc' },
  { value: 'rating', label: 'Customer Rating', field: 'rating', order: 'desc' },
  { value: 'reviews', label: 'Review Count', field: 'reviewCount', order: 'desc' },
  { value: 'price-low', label: 'Price: Low to High', field: 'price', order: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', field: 'price', order: 'desc' },
  { value: 'name', label: 'Product Name', field: 'name', order: 'asc' }
];

export const timeFrameOptions = [
  { value: 'all-time', label: 'All Time' },
  { value: 'monthly', label: 'This Month' },
  { value: 'weekly', label: 'This Week' },
  { value: 'daily', label: 'Today' }
];

export const timeFrameStats: Record<string, TimeFrameStats> = {
  'all-time': {
    label: 'All Time',
    totalSales: 13254,
    topProduct: 'Wireless Noise Cancelling Headphones',
    growth: 12.5
  },
  'monthly': {
    label: 'This Month',
    totalSales: 2347,
    topProduct: 'Smart Fitness Watch Series X',
    growth: 8.3
  },
  'weekly': {
    label: 'This Week',
    totalSales: 567,
    topProduct: 'Yoga Mat Pro with Alignment',
    growth: 15.2
  },
  'daily': {
    label: 'Today',
    totalSales: 89,
    topProduct: 'Wireless Earbuds Pro',
    growth: 5.7
  }
};

export const filterOptions = {
  categories: ['Electronics', 'Fashion', 'Sports', 'Home', 'Beauty'],
  brands: ['AudioTech', 'FitGear', 'EcoWear', 'PhotoPro', 'UrbanGear', 'FitLife', 'TechHome'],
  priceRange: { min: 0, max: 1500 },
  ratings: [1, 2, 3, 4, 5],
  tags: ['wireless', 'noise-cancelling', 'premium', 'organic', 'sustainable', 'professional', 'fitness', 'smart-home']
};