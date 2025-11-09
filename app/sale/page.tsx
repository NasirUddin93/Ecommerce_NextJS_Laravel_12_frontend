"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SaleProduct, FilterState, ViewMode, CountdownTimer } from '../types/sale';
import { mockSaleProducts, sortOptions, filterOptions, saleBanners } from '../data/mockSale';
import SaleProductCard from '../components/SaleProductCard';
import SaleBanner from '../components/SaleBanner';
import SaleFilter from '../components/SaleFilter';
import { Search, Filter, Grid, List, Layout, Tag, Zap, Flame, AlertTriangle } from 'lucide-react';

const SalePage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 1500],
    discountRange: [0, 80],
    ratings: [],
    tags: [],
    availability: 'all',
    discountType: ['percentage', 'fixed', 'clearance'],
    saleType: 'all'
  });
  const [sortBy, setSortBy] = useState<string>('discount-high');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>({ type: 'grid', columns: 4 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate countdown timer for a product
  const getCountdownTimer = (endDate: string): CountdownTimer => {
    const end = new Date(endDate).getTime();
    const now = currentTime.getTime();
    const difference = end - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEndingSoon: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const isEndingSoon = days === 0 && hours < 24;

    return { days, hours, minutes, seconds, isEndingSoon };
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockSaleProducts.filter(product => {
      // Search filter
      if (searchQuery && 
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Discount range filter
      if (product.discount < filters.discountRange[0] || product.discount > filters.discountRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.ratings.length > 0 && !filters.ratings.some(r => product.rating >= r)) {
        return false;
      }

      // Tag filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
        return false;
      }

      // Availability filter
      if (filters.availability === 'in-stock' && product.stock === 0) {
        return false;
      }
      if (filters.availability === 'out-of-stock' && product.stock > 0) {
        return false;
      }

      // Discount type filter
      if (filters.discountType.length > 0 && !filters.discountType.includes(product.discountType)) {
        return false;
      }

      // Sale type filter
      if (filters.saleType !== 'all') {
        if (filters.saleType === 'flash-sale' && !product.tags.includes('flash-sale')) {
          return false;
        }
        if (filters.saleType === 'clearance' && !product.tags.includes('clearance')) {
          return false;
        }
        if (filters.saleType === 'weekly-deals' && !product.tags.includes('weekly-deal')) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    const sortOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0];
    filtered.sort((a, b) => {
      const aValue = a[sortOption.field as keyof SaleProduct];
      const bValue = b[sortOption.field as keyof SaleProduct];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOption.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Special handling for saleEndDate
      if (sortOption.field === 'saleEndDate') {
        const aDate = new Date(a.saleEndDate).getTime();
        const bDate = new Date(b.saleEndDate).getTime();
        return sortOption.order === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      return 0;
    });

    return filtered;
  }, [filters, sortBy, searchQuery, currentTime]);

  // Calculate sale statistics
  const saleStats = useMemo(() => {
    const totalProducts = mockSaleProducts.length;
    const totalDiscount = mockSaleProducts.reduce((sum, product) => sum + product.discount, 0);
    const averageDiscount = (totalDiscount / totalProducts).toFixed(1);
    const endingSoon = mockSaleProducts.filter(product => {
      const timer = getCountdownTimer(product.saleEndDate);
      return timer.isEndingSoon;
    }).length;
    const totalSavings = mockSaleProducts.reduce((sum, product) => {
      return sum + (product.originalPrice - product.price) * product.unitsSold;
    }, 0);

    return {
      totalProducts,
      averageDiscount,
      endingSoon,
      totalSavings: Math.round(totalSavings)
    };
  }, [currentTime]);

  const handleAddToCart = (product: SaleProduct) => {
    console.log('Adding to cart:', product);
    // Implement cart logic
  };

  const handleQuickView = (product: SaleProduct) => {
    console.log('Quick view:', product);
    // Implement quick view modal
  };

  const handleAddToWishlist = (product: SaleProduct) => {
    console.log('Add to wishlist:', product);
    // Implement wishlist logic
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1500],
      discountRange: [0, 80],
      ratings: [],
      tags: [],
      availability: 'all',
      discountType: ['percentage', 'fixed', 'clearance'],
      saleType: 'all'
    });
    setSearchQuery('');
  };

  const handleBannerCtaClick = (bannerLink: string) => {
    // Scroll to section or handle navigation
    console.log('Banner CTA clicked:', bannerLink);
  };

  const gridClasses = useMemo(() => {
    const baseClasses = 'grid gap-6';
    
    switch (viewMode.type) {
      case 'list':
        return `${baseClasses} grid-cols-1`;
      case 'compact':
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-${viewMode.columns}`;
    }
  }, [viewMode]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.brands.length > 0 ||
      filters.ratings.length > 0 ||
      filters.tags.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1500 ||
      filters.discountRange[0] > 0 ||
      filters.discountRange[1] < 80 ||
      filters.availability !== 'all' ||
      filters.discountType.length < 3 ||
      filters.saleType !== 'all' ||
      searchQuery
    );
  }, [filters, searchQuery]);

  // Get main banner (first one)
  const mainBanner = saleBanners[0];
  const mainBannerCountdown = getCountdownTimer(mainBanner.endDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button onClick={() => router.push('/')} className="hover:text-gray-900 transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">Sale</span>
          </nav>
          
          {/* Main Sale Banner */}
          <SaleBanner
            banner={mainBanner}
            countdownTimer={mainBannerCountdown}
            onCtaClick={() => handleBannerCtaClick(mainBanner.ctaLink)}
          />

          {/* Sale Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-red-500" />
                <span className="text-2xl font-bold text-gray-900">{saleStats.totalProducts}</span>
              </div>
              <div className="text-sm text-gray-600">Products on Sale</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">{saleStats.averageDiscount}%</span>
              </div>
              <div className="text-sm text-gray-600">Average Discount</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold text-gray-900">{saleStats.endingSoon}</span>
              </div>
              <div className="text-sm text-gray-600">Ending Soon</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-gray-900">${saleStats.totalSavings.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SaleFilter
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  {/* Results Count */}
                  <div className="text-sm text-gray-600">
                    Showing {filteredAndSortedProducts.length} of {saleStats.totalProducts} sale items
                  </div>

                  {/* Active Filters Indicator */}
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search sale items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode(prev => ({ ...prev, type: 'grid' }))}
                      className={`p-2 ${viewMode.type === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode(prev => ({ ...prev, type: 'list' }))}
                      className={`p-2 ${viewMode.type === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode(prev => ({ ...prev, type: 'compact' }))}
                      className={`p-2 ${viewMode.type === 'compact' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <Layout className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Columns (for grid view) */}
                  {viewMode.type === 'grid' && (
                    <select
                      value={viewMode.columns}
                      onChange={(e) => setViewMode(prev => ({ ...prev, columns: parseInt(e.target.value) }))}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={2}>2 columns</option>
                      <option value={3}>3 columns</option>
                      <option value={4}>4 columns</option>
                    </select>
                  )}

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-40"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-blue-900">
                        ×
                      </button>
                    </span>
                  )}
                  {filters.categories.map(category => (
                    <span key={category} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {category}
                      <button onClick={() => setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }))}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {brand}
                      <button onClick={() => setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }))}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                      <button onClick={() => setFilters(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.saleType !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {filters.saleType === 'flash-sale' ? 'Flash Sale' : 
                       filters.saleType === 'clearance' ? 'Clearance' : 'Weekly Deals'}
                      <button onClick={() => setFilters(prev => ({ ...prev, saleType: 'all' }))}>
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={gridClasses}>
                {filteredAndSortedProducts.map(product => (
                  <SaleProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode.type}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    onAddToWishlist={handleAddToWishlist}
                    countdownTimer={getCountdownTimer(product.saleEndDate)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🏷️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sale items found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find amazing deals.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Additional Sale Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {saleBanners.slice(1).map((banner, index) => (
                <div
                  key={index}
                  className={`${banner.backgroundColor} rounded-2xl p-6 text-white`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {banner.title.includes('Clearance') ? (
                      <AlertTriangle className="w-8 h-8" />
                    ) : (
                      <Flame className="w-8 h-8" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">{banner.title}</h3>
                      <p className="opacity-90">{banner.subtitle}</p>
                    </div>
                  </div>
                  <p className="mb-4 opacity-90">{banner.description}</p>
                  <button
                    onClick={() => handleBannerCtaClick(banner.ctaLink)}
                    className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    {banner.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;