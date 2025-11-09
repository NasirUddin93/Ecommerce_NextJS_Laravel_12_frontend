"use client";
import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import { Category, CategoryGridConfig } from '../../types/category';
import { mockCategories, categoryBanner } from '../../data/mockCategories';
import CategoryCard from '../../components/CategoryCard';
import CategoryBanner from '../../components/CategoryBanner';
import LayoutControls from '../../components/LayoutControls';
import { Search, Filter, Grid, Layout, Star } from 'lucide-react';

const CategoriesPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  const [gridConfig, setGridConfig] = useState<CategoryGridConfig>({
    columns: 4,
    gap: 6,
    aspectRatio: '4/3',
    showProductCount: true,
    showDescription: true,
    layout: 'grid'
  });

  // Filter categories based on search and filters
  const filteredCategories = useMemo(() => {
    return mockCategories.filter(category => {
      // Search filter
      if (searchQuery && !category.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !category.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Featured filter
      if (showFeaturedOnly && !category.featured) {
        return false;
      }

      return true;
    }).sort((a, b) => a.displayOrder - b.displayOrder);
  }, [searchQuery, showFeaturedOnly]);

  // Get unique parent categories for filter
  const parentCategories = useMemo(() => {
    const parents = mockCategories
      .filter(cat => !cat.parentCategory)
      .map(cat => ({ value: cat.slug, label: cat.name }));
    return [{ value: 'all', label: 'All Categories' }, ...parents];
  }, []);

  const handleCategoryClick = (category: Category) => {
    console.log('Category clicked:', category);
    // Navigate to category page or products page with category filter
    // router.push(`/products?category=${category.slug}`);
  };

  const handleQuickView = (category: Category) => {
    console.log('Quick view:', category);
    // Show quick view modal with category details and subcategories
  };

  const handleViewAllProducts = () => {
    console.log('View all products');
    // router.push('/products');
  };

  // Grid layout classes
  const gridClasses = useMemo(() => {
    const baseClasses = `grid gap-${gridConfig.gap}`;
    
    switch (gridConfig.layout) {
      case 'masonry':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max`;
      case 'featured':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridConfig.columns}`;
    }
  }, [gridConfig.layout, gridConfig.columns, gridConfig.gap]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Categories</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Banner */}
        <CategoryBanner
          banner={categoryBanner}
          onCtaClick={handleViewAllProducts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Layout Controls */}
        <LayoutControls
          config={gridConfig}
          onConfigChange={setGridConfig}
          totalCategories={mockCategories.length}
          filteredCount={filteredCategories.length}
        />

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filter by:</span>
            <select
              value={selectedParent}
              onChange={(e) => setSelectedParent(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {parentCategories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFeaturedOnly
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
            Featured Only
          </button>

          {/* Active Filters Display */}
          {(searchQuery || showFeaturedOnly) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-blue-900">
                    ×
                  </button>
                </span>
              )}
              {showFeaturedOnly && (
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  Featured Only
                  <button onClick={() => setShowFeaturedOnly(false)} className="hover:text-orange-900">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className={gridClasses}>
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                layout={gridConfig.layout}
                showDescription={gridConfig.showDescription}
                showProductCount={gridConfig.showProductCount}
                onCategoryClick={handleCategoryClick}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowFeaturedOnly(false);
                setSelectedParent('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* View All Button */}
        {filteredCategories.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewAllProducts}
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;