import { Category, CategoryBanner } from '../types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smartphones, laptops, and cutting-edge technology for modern living.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 1250,
    featured: true,
    displayOrder: 1,
    subcategories: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones', productCount: 450, image: '/api/placeholder/200/200' },
      { id: '1-2', name: 'Laptops', slug: 'laptops', productCount: 320, image: '/api/placeholder/200/200' },
      { id: '1-3', name: 'Headphones', slug: 'headphones', productCount: 280, image: '/api/placeholder/200/200' },
      { id: '1-4', name: 'Smart Watches', slug: 'smart-watches', productCount: 200, image: '/api/placeholder/200/200' },
    ],
    seoTitle: 'Electronics Store - Latest Gadgets & Tech',
    seoDescription: 'Discover the latest electronics including smartphones, laptops, headphones and smart home devices.'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing, accessories, and footwear for every style and occasion.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 890,
    featured: true,
    displayOrder: 2,
    subcategories: [
      { id: '2-1', name: "Men's Clothing", slug: 'mens-clothing', productCount: 320, image: '/api/placeholder/200/200' },
      { id: '2-2', name: "Women's Clothing", slug: 'womens-clothing', productCount: 450, image: '/api/placeholder/200/200' },
      { id: '2-3', name: 'Shoes', slug: 'shoes', productCount: 220, image: '/api/placeholder/200/200' },
      { id: '2-4', name: 'Accessories', slug: 'accessories', productCount: 150, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything you need to create your perfect living space and beautiful garden.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 670,
    featured: false,
    displayOrder: 3,
    subcategories: [
      { id: '3-1', name: 'Furniture', slug: 'furniture', productCount: 280, image: '/api/placeholder/200/200' },
      { id: '3-2', name: 'Home Decor', slug: 'home-decor', productCount: 220, image: '/api/placeholder/200/200' },
      { id: '3-3', name: 'Kitchen & Dining', slug: 'kitchen-dining', productCount: 170, image: '/api/placeholder/200/200' },
      { id: '3-4', name: 'Garden Tools', slug: 'garden-tools', productCount: 120, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Equipment and gear for sports enthusiasts and outdoor adventurers.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 430,
    featured: false,
    displayOrder: 4,
    subcategories: [
      { id: '4-1', name: 'Fitness Equipment', slug: 'fitness-equipment', productCount: 180, image: '/api/placeholder/200/200' },
      { id: '4-2', name: 'Outdoor Gear', slug: 'outdoor-gear', productCount: 150, image: '/api/placeholder/200/200' },
      { id: '4-3', name: 'Team Sports', slug: 'team-sports', productCount: 100, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '5',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Premium beauty products and personal care items for your wellness routine.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 560,
    featured: false,
    displayOrder: 5,
    subcategories: [
      { id: '5-1', name: 'Skincare', slug: 'skincare', productCount: 240, image: '/api/placeholder/200/200' },
      { id: '5-2', name: 'Makeup', slug: 'makeup', productCount: 180, image: '/api/placeholder/200/200' },
      { id: '5-3', name: 'Hair Care', slug: 'hair-care', productCount: 140, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '6',
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Best-selling books, educational materials, and entertainment media.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 1200,
    featured: false,
    displayOrder: 6,
    subcategories: [
      { id: '6-1', name: 'Fiction', slug: 'fiction', productCount: 450, image: '/api/placeholder/200/200' },
      { id: '6-2', name: 'Non-Fiction', slug: 'non-fiction', productCount: 380, image: '/api/placeholder/200/200' },
      { id: '6-3', name: 'Educational', slug: 'educational', productCount: 370, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '7',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun and educational toys, games, and activities for all ages.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 340,
    featured: false,
    displayOrder: 7,
    subcategories: [
      { id: '7-1', name: 'Educational Toys', slug: 'educational-toys', productCount: 120, image: '/api/placeholder/200/200' },
      { id: '7-2', name: 'Board Games', slug: 'board-games', productCount: 100, image: '/api/placeholder/200/200' },
      { id: '7-3', name: 'Outdoor Toys', slug: 'outdoor-toys', productCount: 120, image: '/api/placeholder/200/200' },
    ]
  },
  {
    id: '8',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car accessories, tools, and maintenance products for automotive enthusiasts.',
    image: '/api/placeholder/400/400',
    bannerImage: '/api/placeholder/1200/400',
    productCount: 290,
    featured: false,
    displayOrder: 8,
    subcategories: [
      { id: '8-1', name: 'Car Accessories', slug: 'car-accessories', productCount: 150, image: '/api/placeholder/200/200' },
      { id: '8-2', name: 'Tools & Equipment', slug: 'tools-equipment', productCount: 90, image: '/api/placeholder/200/200' },
      { id: '8-3', name: 'Maintenance', slug: 'maintenance', productCount: 50, image: '/api/placeholder/200/200' },
    ]
  }
];

export const categoryBanner: CategoryBanner = {
  title: 'Shop by Category',
  subtitle: 'Discover Our Collections',
  description: 'Explore our wide range of products organized into carefully curated categories. Find exactly what you need with our intuitive category navigation.',
  image: '/api/placeholder/1200/400',
  ctaText: 'View All Products',
  ctaLink: '/products',
  overlayColor: 'rgba(0,0,0,0.4)',
  textColor: 'text-white'
};

export const layoutOptions = [
  { value: 'grid', label: 'Grid View', icon: 'Grid' },
  { value: 'masonry', label: 'Masonry View', icon: 'Layout' },
  { value: 'featured', label: 'Featured First', icon: 'Star' }
];