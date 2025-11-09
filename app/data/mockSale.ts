import { SaleProduct, SortOption, SaleBanner } from '../types/sale';

export const mockSaleProducts: SaleProduct[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    brand: 'AudioTech',
    price: 199.99,
    originalPrice: 399.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.8,
    reviewCount: 1289,
    stock: 45,
    discount: 50,
    discountType: 'percentage',
    saleEndDate: '2024-02-15T23:59:59',
    isBestseller: true,
    isNew: false,
    tags: ['wireless', 'noise-cancelling', 'premium', 'flash-sale'],
    description: 'Industry-leading noise cancellation with exceptional sound quality. Limited time offer!',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'black', value: '#000000', label: 'Matte Black', available: true },
          { id: 'silver', value: '#C0C0C0', label: 'Silver', available: true }
        ]
      }
    ],
    unitsSold: 2547,
    discountTier: 'hot'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Series X',
    brand: 'FitGear',
    price: 249.99,
    originalPrice: 349.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Wearables',
    rating: 4.6,
    reviewCount: 2156,
    stock: 28,
    discount: 29,
    discountType: 'percentage',
    saleEndDate: '2024-02-14T23:59:59',
    isBestseller: true,
    isNew: true,
    tags: ['fitness', 'smartwatch', 'health', 'weekly-deal'],
    description: 'Advanced fitness tracking with ECG monitor and always-on display.',
    variants: [
      {
        id: 'size',
        type: 'size',
        values: [
          { id: '44mm', value: '44mm', label: '44mm', available: true },
          { id: '42mm', value: '42mm', label: '42mm', available: true }
        ]
      }
    ],
    unitsSold: 1893,
    discountTier: 'popular'
  },
  {
    id: '3',
    name: 'Organic Cotton Oversized Hoodie',
    brand: 'EcoWear',
    price: 39.99,
    originalPrice: 79.99,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Clothing',
    rating: 4.7,
    reviewCount: 867,
    stock: 0,
    discount: 50,
    discountType: 'percentage',
    saleEndDate: '2024-02-20T23:59:59',
    isBestseller: true,
    isNew: false,
    tags: ['organic', 'sustainable', 'casual', 'clearance'],
    description: 'Comfortable oversized hoodie made from 100% organic cotton. Final clearance!',
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
    ],
    unitsSold: 1567,
    discountTier: 'ending-soon'
  },
  {
    id: '4',
    name: 'Professional Camera Lens 85mm f/1.4',
    brand: 'PhotoPro',
    price: 899.99,
    originalPrice: 1299.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Photography',
    rating: 4.9,
    reviewCount: 334,
    stock: 12,
    discount: 31,
    discountType: 'percentage',
    saleEndDate: '2024-02-16T23:59:59',
    isBestseller: false,
    isNew: false,
    tags: ['professional', 'portrait', 'prime-lens', 'flash-sale'],
    description: 'Professional portrait lens with exceptional bokeh. Limited stock!',
    variants: [],
    unitsSold: 892,
    discountTier: 'hot'
  },
  {
    id: '5',
    name: 'Minimalist Leather Backpack',
    brand: 'UrbanGear',
    price: 99.99,
    originalPrice: 159.99,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Accessories',
    rating: 4.4,
    reviewCount: 1092,
    stock: 36,
    discount: 38,
    discountType: 'percentage',
    saleEndDate: '2024-02-18T23:59:59',
    isBestseller: true,
    isNew: false,
    tags: ['minimalist', 'leather', 'laptop', 'weekly-deal'],
    description: 'Sleek leather backpack with laptop compartment. Special weekly deal!',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'brown', value: '#8B4513', label: 'Chestnut Brown', available: true },
          { id: 'black', value: '#000000', label: 'Jet Black', available: true }
        ]
      }
    ],
    unitsSold: 1345,
    discountTier: 'popular'
  },
  {
    id: '6',
    name: 'Yoga Mat Pro with Alignment',
    brand: 'FitLife',
    price: 59.99,
    originalPrice: 89.99,
    image: '/api/placeholder/400/400',
    category: 'Sports',
    subcategory: 'Fitness',
    rating: 4.7,
    reviewCount: 1567,
    stock: 72,
    discount: 33,
    discountType: 'percentage',
    saleEndDate: '2024-02-13T23:59:59',
    isBestseller: true,
    isNew: true,
    tags: ['yoga', 'fitness', 'non-slip', 'flash-sale'],
    description: 'Professional yoga mat with alignment system. Flash sale ending soon!',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'purple', value: '#800080', label: 'Deep Purple', available: true },
          { id: 'teal', value: '#008080', label: 'Ocean Teal', available: true }
        ]
      }
    ],
    unitsSold: 2234,
    discountTier: 'ending-soon'
  },
  {
    id: '7',
    name: 'Wireless Earbuds Pro',
    brand: 'AudioTech',
    price: 129.99,
    originalPrice: 199.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.5,
    reviewCount: 892,
    stock: 89,
    discount: 35,
    discountType: 'percentage',
    saleEndDate: '2024-02-22T23:59:59',
    isBestseller: true,
    isNew: true,
    tags: ['wireless', 'earbuds', 'noise-cancelling', 'clearance'],
    description: 'True wireless earbuds with active noise cancellation. Clearance pricing!',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'white', value: '#FFFFFF', label: 'Pearl White', available: true },
          { id: 'black', value: '#000000', label: 'Matte Black', available: true }
        ]
      }
    ],
    unitsSold: 1789,
    discountTier: 'hot'
  },
  {
    id: '8',
    name: 'Smart Home Hub Pro',
    brand: 'TechHome',
    price: 79.99,
    originalPrice: 129.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Smart Home',
    rating: 4.3,
    reviewCount: 645,
    stock: 156,
    discount: 38,
    discountType: 'percentage',
    saleEndDate: '2024-02-25T23:59:59',
    isBestseller: false,
    isNew: false,
    tags: ['smart-home', 'voice-control', 'automation', 'weekly-deal'],
    description: 'Central hub for all your smart home devices. Weekly special!',
    variants: [],
    unitsSold: 987,
    discountTier: 'popular'
  },
  {
    id: '9',
    name: 'Designer Sunglasses',
    brand: 'SunStyle',
    price: 49.99,
    originalPrice: 149.99,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Accessories',
    rating: 4.6,
    reviewCount: 432,
    stock: 24,
    discount: 67,
    discountType: 'percentage',
    saleEndDate: '2024-02-12T23:59:59',
    isBestseller: false,
    isNew: false,
    tags: ['designer', 'uv-protection', 'fashion', 'flash-sale'],
    description: 'Premium designer sunglasses with UV400 protection. Massive discount!',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'black', value: '#000000', label: 'Black', available: true },
          { id: 'brown', value: '#8B4513', label: 'Tortoise', available: true }
        ]
      }
    ],
    unitsSold: 567,
    discountTier: 'ending-soon'
  },
  {
    id: '10',
    name: 'Gaming Mechanical Keyboard',
    brand: 'GameMaster',
    price: 79.99,
    originalPrice: 129.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Gaming',
    rating: 4.8,
    reviewCount: 765,
    stock: 43,
    discount: 38,
    discountType: 'percentage',
    saleEndDate: '2024-02-19T23:59:59',
    isBestseller: true,
    isNew: true,
    tags: ['gaming', 'mechanical', 'rgb', 'weekly-deal'],
    description: 'Mechanical gaming keyboard with RGB lighting. Special gamer deal!',
    variants: [
      {
        id: 'switch',
        type: 'color',
        values: [
          { id: 'red', value: '#FF0000', label: 'Red Switch', available: true },
          { id: 'blue', value: '#0000FF', label: 'Blue Switch', available: true }
        ]
      }
    ],
    unitsSold: 1234,
    discountTier: 'hot'
  }
];

export const sortOptions: SortOption[] = [
  { value: 'discount-high', label: 'Highest Discount', field: 'discount', order: 'desc' },
  { value: 'price-low', label: 'Price: Low to High', field: 'price', order: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', field: 'price', order: 'desc' },
  { value: 'ending-soon', label: 'Ending Soon', field: 'saleEndDate', order: 'asc' },
  { value: 'rating', label: 'Highest Rated', field: 'rating', order: 'desc' },
  { value: 'popular', label: 'Most Popular', field: 'unitsSold', order: 'desc' },
  { value: 'newest', label: 'Newest', field: 'saleEndDate', order: 'desc' },
  { value: 'name', label: 'Product Name', field: 'name', order: 'asc' }
];

export const saleBanners: SaleBanner[] = [
  {
    title: 'Flash Sale',
    subtitle: 'Limited Time Offers',
    description: 'Huge discounts on premium products. Prices slashed for a limited time only!',
    discount: 70,
    endDate: '2024-02-15T23:59:59',
    backgroundColor: 'bg-gradient-to-r from-red-500 to-orange-500',
    textColor: 'text-white',
    ctaText: 'Shop Flash Sale',
    ctaLink: '#flash-sale'
  },
  {
    title: 'Clearance Event',
    subtitle: 'Final Reductions',
    description: 'Last chance to grab these amazing products at unbelievable prices!',
    discount: 60,
    endDate: '2024-02-20T23:59:59',
    backgroundColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    textColor: 'text-white',
    ctaText: 'View Clearance',
    ctaLink: '#clearance'
  },
  {
    title: 'Weekly Deals',
    subtitle: 'Fresh Discounts',
    description: 'New deals every week. Always something on sale!',
    discount: 50,
    endDate: '2024-02-25T23:59:59',
    backgroundColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    textColor: 'text-white',
    ctaText: 'Browse Deals',
    ctaLink: '#weekly-deals'
  }
];

export const filterOptions = {
  categories: ['Electronics', 'Fashion', 'Sports', 'Home', 'Beauty', 'Gaming'],
  brands: ['AudioTech', 'FitGear', 'EcoWear', 'PhotoPro', 'UrbanGear', 'FitLife', 'TechHome', 'SunStyle', 'GameMaster'],
  priceRange: { min: 0, max: 1500 },
  discountRange: { min: 0, max: 80 },
  ratings: [1, 2, 3, 4, 5],
  tags: ['flash-sale', 'clearance', 'weekly-deal', 'limited-time', 'hot-deal']
};