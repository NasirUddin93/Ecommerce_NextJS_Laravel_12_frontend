import { NewArrivalProduct, SortOption } from '../types/new-arrivals';

export const mockNewArrivals: NewArrivalProduct[] = [
  {
    id: '1',
    name: 'Quantum Wireless Earbuds Pro',
    brand: 'AudioTech',
    price: 199.99,
    originalPrice: 249.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.8,
    reviewCount: 89,
    stock: 45,
    isNew: true,
    isBestseller: true,
    discount: 20,
    tags: ['wireless', 'noise-cancelling', 'premium'],
    arrivalDate: '2024-01-15',
    featured: true,
    description: 'Next-generation wireless earbuds with active noise cancellation and 30-hour battery life.',
    variants: [
      {
        id: 'color',
        type: 'color',
        values: [
          { id: 'black', value: '#000000', label: 'Matte Black', available: true },
          { id: 'white', value: '#FFFFFF', label: 'Pearl White', available: true }
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
    reviewCount: 156,
    stock: 28,
    isNew: true,
    isBestseller: false,
    discount: 13,
    tags: ['fitness', 'smartwatch', 'health'],
    arrivalDate: '2024-01-14',
    featured: true,
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
    rating: 4.3,
    reviewCount: 67,
    stock: 0,
    isNew: true,
    isBestseller: false,
    tags: ['organic', 'sustainable', 'casual'],
    arrivalDate: '2024-01-13',
    featured: false,
    description: 'Comfortable oversized hoodie made from 100% organic cotton.',
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
    reviewCount: 34,
    stock: 12,
    isNew: true,
    isBestseller: false,
    tags: ['professional', 'portrait', 'prime-lens'],
    arrivalDate: '2024-01-12',
    featured: true,
    description: 'Professional portrait lens with exceptional bokeh and sharpness.',
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
    reviewCount: 92,
    stock: 36,
    isNew: true,
    isBestseller: true,
    discount: 20,
    tags: ['minimalist', 'leather', 'laptop'],
    arrivalDate: '2024-01-11',
    featured: false,
    description: 'Sleek leather backpack with laptop compartment and multiple pockets.',
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
    name: 'Smart Home Hub Pro',
    brand: 'TechHome',
    price: 129.99,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Smart Home',
    rating: 4.2,
    reviewCount: 45,
    stock: 58,
    isNew: true,
    isBestseller: false,
    tags: ['smart-home', 'voice-control', 'automation'],
    arrivalDate: '2024-01-10',
    featured: false,
    description: 'Central hub for all your smart home devices with voice control.',
    variants: []
  },
  {
    id: '7',
    name: 'Yoga Mat Pro with Alignment',
    brand: 'FitLife',
    price: 89.99,
    originalPrice: 119.99,
    image: '/api/placeholder/400/400',
    category: 'Sports',
    subcategory: 'Fitness',
    rating: 4.7,
    reviewCount: 128,
    stock: 72,
    isNew: true,
    isBestseller: true,
    discount: 25,
    tags: ['yoga', 'fitness', 'non-slip'],
    arrivalDate: '2024-01-09',
    featured: true,
    description: 'Professional yoga mat with alignment system and superior grip.',
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
    id: '8',
    name: 'Artisan Ceramic Dinner Set',
    brand: 'HomeCraft',
    price: 249.99,
    image: '/api/placeholder/400/400',
    category: 'Home',
    subcategory: 'Kitchen',
    rating: 4.5,
    reviewCount: 56,
    stock: 24,
    isNew: true,
    isBestseller: false,
    tags: ['artisan', 'ceramic', 'dinnerware'],
    arrivalDate: '2024-01-08',
    featured: false,
    description: 'Handcrafted ceramic dinner set for 6 people with unique patterns.',
    variants: []
  }
];

export const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest First', field: 'arrivalDate', order: 'desc' },
  { value: 'oldest', label: 'Oldest First', field: 'arrivalDate', order: 'asc' },
  { value: 'price-low', label: 'Price: Low to High', field: 'price', order: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', field: 'price', order: 'desc' },
  { value: 'rating', label: 'Highest Rated', field: 'rating', order: 'desc' },
  { value: 'popular', label: 'Most Popular', field: 'reviewCount', order: 'desc' },
  { value: 'name', label: 'Name: A to Z', field: 'name', order: 'asc' }
];

export const filterOptions = {
  categories: ['Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'],
  brands: ['AudioTech', 'FitGear', 'EcoWear', 'PhotoPro', 'UrbanGear', 'TechHome', 'FitLife', 'HomeCraft'],
  priceRange: { min: 0, max: 1500 },
  ratings: [1, 2, 3, 4, 5],
  tags: ['wireless', 'noise-cancelling', 'premium', 'organic', 'sustainable', 'professional', 'minimalist', 'smart-home', 'fitness', 'artisan']
};