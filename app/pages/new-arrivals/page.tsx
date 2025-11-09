"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // ← Change this import
import { NewArrivalProduct, FilterState, ViewMode } from '../../types/new-arrivals';
import { mockNewArrivals, sortOptions, filterOptions } from '../../data/mockNewArrivals';
import NewArrivalCard from '../../components/NewArrivalCard';
import NewArrivalsFilter from '../../components/NewArrivalsFilter';
import { Search, Filter, Grid, List, Layout, Zap, Clock, TrendingUp } from 'lucide-react';

const NewArrivalsPage = () => { // ← Remove NextPage type
  const router = useRouter(); // ← Now this will work with App Router
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 1500],
    ratings: [],
    tags: [],
    availability: 'all',
    featured: false
  });
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>({ type: 'grid', columns: 4 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockNewArrivals.filter(product => {
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

      // Featured filter
      if (filters.featured && !product.featured) {
        return false;
      }

      return true;
    });

    // Sort products
    const sortOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0];
    filtered.sort((a, b) => {
      const aValue = a[sortOption.field as keyof NewArrivalProduct];
      const bValue = b[sortOption.field as keyof NewArrivalProduct];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOption.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [filters, sortBy, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const totalProducts = mockNewArrivals.length;
    const featuredProducts = mockNewArrivals.filter(p => p.featured).length;
    const bestsellers = mockNewArrivals.filter(p => p.isBestseller).length;
    const justAdded = mockNewArrivals.filter(p => {
      const arrival = new Date(p.arrivalDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - arrival.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) <= 3;
    }).length;

    return { totalProducts, featuredProducts, bestsellers, justAdded };
  }, []);

  const handleAddToCart = (product: NewArrivalProduct) => {
    console.log('Adding to cart:', product);
    // Implement cart logic
  };

  const handleQuickView = (product: NewArrivalProduct) => {
    console.log('Quick view:', product);
    // Implement quick view modal
  };

  const handleAddToWishlist = (product: NewArrivalProduct) => {
    console.log('Add to wishlist:', product);
    // Implement wishlist logic
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1500],
      ratings: [],
      tags: [],
      availability: 'all',
      featured: false
    });
    setSearchQuery('');
  };

  const gridClasses = useMemo(() => {
    const baseClasses = 'grid gap-6';
    
    switch (viewMode.type) {
      case 'list':
        return `${baseClasses} grid-cols-1`;
      case 'masonry':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max`;
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
      filters.availability !== 'all' ||
      filters.featured ||
      searchQuery
    );
  }, [filters, searchQuery]);

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
            <span className="text-gray-900 font-medium">New Arrivals</span>
          </nav>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover the latest products just added to our collection. Fresh styles, innovative technology, and exclusive new items.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-blue-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-2xl font-bold">{stats.justAdded}</span>
                </div>
                <div className="text-sm text-gray-600">Just Added</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-purple-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-2xl font-bold">{stats.bestsellers}</span>
                </div>
                <div className="text-sm text-gray-600">Bestsellers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-green-600 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-2xl font-bold">{stats.featuredProducts}</span>
                </div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <NewArrivalsFilter
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
                    Showing {filteredAndSortedProducts.length} of {stats.totalProducts} products
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
                      placeholder="Search new arrivals..."
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
                      onClick={() => setViewMode(prev => ({ ...prev, type: 'masonry' }))}
                      className={`p-2 ${viewMode.type === 'masonry' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
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
                  {filters.featured && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Featured Only
                      <button onClick={() => setFilters(prev => ({ ...prev, featured: false }))}>
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
                  <NewArrivalCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode.type}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No new arrivals found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters. New products are added regularly, so check back soon!
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More (for pagination) */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Load More New Arrivals
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;