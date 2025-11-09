import React from 'react';
import { TimeFrameStats } from '../types/best-sellers';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

interface BestSellersStatsProps {
  stats: TimeFrameStats;
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
  totalProducts: number;
  averageRating: number;
}

const BestSellersStats: React.FC<BestSellersStatsProps> = ({
  stats,
  timeFrame,
  onTimeFrameChange,
  totalProducts,
  averageRating
}) => {
  const timeFrameOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'monthly', label: 'This Month' },
    { value: 'weekly', label: 'This Week' },
    { value: 'daily', label: 'Today' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">Best Sellers</h1>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl">
            Discover our most popular products loved by thousands of customers. 
            These top-performing items are consistently rated highest by our community.
          </p>
          
          {/* Time Frame Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timeFrameOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onTimeFrameChange(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  timeFrame === option.value
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-blue-500 bg-opacity-50 text-blue-100 hover:bg-opacity-70'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-80">
          <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-200" />
              <span className="text-blue-200 text-sm">Total Sales</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-green-300 text-sm">
              <TrendingUp className="w-3 h-3" />
              +{stats.growth}% growth
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-200" />
              <span className="text-blue-200 text-sm">Top Product</span>
            </div>
            <div className="text-sm font-medium truncate" title={stats.topProduct}>
              {stats.topProduct}
            </div>
            <div className="text-blue-200 text-xs mt-1">#1 Best Seller</div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-200" />
              <span className="text-blue-200 text-sm">Products</span>
            </div>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <div className="text-blue-200 text-xs">In best sellers</div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-200" />
              <span className="text-blue-200 text-sm">Avg Rating</span>
            </div>
            <div className="text-2xl font-bold">{averageRating}</div>
            <div className="text-blue-200 text-xs">Out of 5 stars</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellersStats;