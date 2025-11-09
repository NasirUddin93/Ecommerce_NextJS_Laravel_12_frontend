import React from 'react';
import { Category } from '../types/category';
import { ChevronRight, Star, Eye } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  layout: 'grid' | 'masonry' | 'featured';
  showDescription: boolean;
  showProductCount: boolean;
  onCategoryClick: (category: Category) => void;
  onQuickView: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  layout,
  showDescription,
  showProductCount,
  onCategoryClick,
  onQuickView
}) => {
  const isFeatured = layout === 'featured' && category.featured;
  const isMasonry = layout === 'masonry';

  const cardClasses = `
    group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500
    ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
    ${isMasonry ? 'break-inside-avoid mb-6' : ''}
    bg-white hover:scale-105 transform transition-transform duration-300
  `;

  const imageClasses = `
    w-full bg-gradient-to-br from-gray-200 to-gray-300 transition-all duration-500 group-hover:scale-110
    ${isFeatured ? 'h-80' : 'h-48'}
    ${isMasonry ? 'h-48' : ''}
  `;

  return (
    <div className={cardClasses}>
      {/* Category Image */}
      <div className="relative overflow-hidden">
        <div className={imageClasses}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500 font-medium">{category.name}</span>
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Featured Badge */}
        {category.featured && (
          <div className="absolute top-3 left-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(category)}
          className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Count Badge */}
        {showProductCount && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {category.productCount} products
            </div>
          </div>
        )}
      </div>

      {/* Category Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
              {category.name}
            </h3>
            
            {showDescription && category.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                {category.description}
              </p>
            )}
            
            {/* Subcategories Preview */}
            {category.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {category.subcategories.slice(0, 3).map(subcategory => (
                  <span
                    key={subcategory.id}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {subcategory.name}
                  </span>
                ))}
                {category.subcategories.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                    +{category.subcategories.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* View Button */}
          <button
            onClick={() => onCategoryClick(category)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm group/btn whitespace-nowrap"
          >
            View
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;