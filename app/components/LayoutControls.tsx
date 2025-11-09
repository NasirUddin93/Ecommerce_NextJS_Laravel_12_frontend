import React from 'react';
import { CategoryGridConfig } from '../types/category';
import { Grid, Layout, Star, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';

interface LayoutControlsProps {
  config: CategoryGridConfig;
  onConfigChange: (config: CategoryGridConfig) => void;
  totalCategories: number;
  filteredCount: number;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({
  config,
  onConfigChange,
  totalCategories,
  filteredCount
}) => {
  const layoutOptions = [
    { value: 'grid', label: 'Grid', icon: Grid },
    { value: 'masonry', label: 'Masonry', icon: Layout },
    { value: 'featured', label: 'Featured', icon: Star }
  ];

  const columnOptions = [2, 3, 4, 5];
  const gapOptions = [4, 6, 8];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side - Results Count */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Categories
          </h2>
          <span className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCategories} categories
          </span>
        </div>

        {/* Right Side - Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Layout Type */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Layout:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {layoutOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => onConfigChange({ ...config, layout: option.value as any })}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      config.layout === option.value
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Columns */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Columns:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {columnOptions.map((columns) => (
                <button
                  key={columns}
                  onClick={() => onConfigChange({ ...config, columns })}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                    config.columns === columns
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {columns}
                </button>
              ))}
            </div>
          </div>

          {/* Gap Size */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Spacing:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {gapOptions.map((gap) => (
                <button
                  key={gap}
                  onClick={() => onConfigChange({ ...config, gap })}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                    config.gap === gap
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {gap}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onConfigChange({ 
                ...config, 
                showProductCount: !config.showProductCount 
              })}
              className={`p-2 rounded-lg transition-colors ${
                config.showProductCount 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {config.showProductCount ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onConfigChange({ 
                ...config, 
                showDescription: !config.showDescription 
              })}
              className={`p-2 rounded-lg transition-colors ${
                config.showDescription 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutControls;