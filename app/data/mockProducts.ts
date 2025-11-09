import { Product, FilterOptions, SortOption } from '../types/shop';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    discount: 20,
    stock: 25,
    tags: ['wireless', 'noise-cancelling', 'bluetooth']
  },
  {
    id: '2',
    name: 'Classic White Sneakers',
    price: 59.99,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    brand: 'UrbanSteps',
    rating: 4.2,
    reviewCount: 89,
    stock: 42,
    tags: ['casual', 'comfort', 'fashion']
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    brand: 'FitGear',
    rating: 4.7,
    reviewCount: 256,
    isBestseller: true,
    discount: 20,
    stock: 15,
    tags: ['fitness', 'smartwatch', 'health']
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    brand: 'EcoWear',
    rating: 4.0,
    reviewCount: 67,
    isNew: true,
    stock: 100,
    tags: ['organic', 'sustainable', 'casual']
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    brand: 'GameMaster',
    rating: 4.8,
    reviewCount: 312,
    isBestseller: true,
    discount: 19,
    stock: 30,
    tags: ['gaming', 'mechanical', 'rgb']
  },
  {
    id: '6',
    name: 'Professional Camera Lens',
    price: 899.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    brand: 'PhotoPro',
    rating: 4.9,
    reviewCount: 45,
    stock: 8,
    tags: ['photography', 'professional', 'lens']
  },
  {
    id: '7',
    name: 'Designer Handbag',
    price: 299.99,
    originalPrice: 399.99,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    brand: 'StyleIcon',
    rating: 4.3,
    reviewCount: 156,
    discount: 25,
    stock: 12,
    tags: ['luxury', 'designer', 'fashion']
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    brand: 'PowerUp',
    rating: 4.1,
    reviewCount: 203,
    stock: 50,
    tags: ['charging', 'wireless', 'accessories']
  }
];

export const filterOptions: FilterOptions = {
  categories: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'],
  brands: ['AudioTech', 'UrbanSteps', 'FitGear', 'EcoWear', 'GameMaster', 'PhotoPro', 'StyleIcon', 'PowerUp'],
  priceRange: {
    min: 0,
    max: 1000
  },
  ratings: [1, 2, 3, 4, 5]
};

export const sortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'bestseller', label: 'Bestsellers' }
];