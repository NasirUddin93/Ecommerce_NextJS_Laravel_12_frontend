import React from 'react';
import { CategoryBanner } from '../types/category';
import { ArrowRight, Search, Filter } from 'lucide-react';

interface CategoryBannerProps {
  banner: CategoryBanner;
  onCtaClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  banner,
  onCtaClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <section className="relative rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
          <span className="text-white text-lg">Category Banner Image</span>
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 py-16 px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
          <p className="text-xl mb-2 opacity-90">{banner.subtitle}</p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed">
            {banner.description}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white bg-opacity-95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            {banner.ctaText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;