import React from 'react';
import { FilterOptions, FilterState } from '../types/shop';
import { X, Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  isOpen,
  onClose
}) => {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    onFilterChange({ ...filters, category: newCategories });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    onFilterChange({ ...filters, brand: newBrands });
  };

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.rating.includes(rating)
      ? filters.rating.filter(r => r !== rating)
      : [...filters.rating, rating];
    
    onFilterChange({ ...filters, rating: newRatings });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-visible
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min={filterOptions.priceRange.min}
                max={filterOptions.priceRange.max}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {filterOptions.categories.map(category => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Brands</h3>
            <div className="space-y-2">
              {filterOptions.brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Customer Ratings</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.rating.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                    <span className="text-sm text-gray-600">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;