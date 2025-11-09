import React from 'react';
import { SaleBanner, CountdownTimer } from '../types/sale';
import { Clock, ArrowRight, Zap, Flame, AlertTriangle } from 'lucide-react';

interface SaleBannerProps {
  banner: SaleBanner;
  countdownTimer: CountdownTimer;
  onCtaClick: () => void;
}

const SaleBanner: React.FC<SaleBannerProps> = ({ banner, countdownTimer, onCtaClick }) => {
  const getBannerIcon = () => {
    if (banner.title.includes('Flash')) return <Zap className="w-8 h-8" />;
    if (banner.title.includes('Clearance')) return <AlertTriangle className="w-8 h-8" />;
    return <Flame className="w-8 h-8" />;
  };

  return (
    <div className={`${banner.backgroundColor} rounded-2xl overflow-hidden mb-8`}>
      <div className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {getBannerIcon()}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{banner.title}</h1>
                <p className="text-xl md:text-2xl opacity-90">{banner.subtitle}</p>
              </div>
            </div>
            
            <p className="text-lg mb-6 opacity-90 max-w-2xl">
              {banner.description}
            </p>

            {/* Discount Badge */}
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <span className="text-2xl font-bold">UP TO {banner.discount}% OFF</span>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-lg">LIMITED TIME</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              {banner.ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 min-w-80">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-semibold">Sale Ends In</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdownTimer.days}</div>
                    <div className="text-sm opacity-90">Days</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdownTimer.hours}</div>
                    <div className="text-sm opacity-90">Hours</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdownTimer.minutes}</div>
                    <div className="text-sm opacity-90">Minutes</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdownTimer.seconds}</div>
                    <div className="text-sm opacity-90">Seconds</div>
                  </div>
                </div>
              </div>

              {countdownTimer.isEndingSoon && (
                <div className="bg-red-500 bg-opacity-20 text-red-100 px-4 py-2 rounded-lg text-sm font-medium">
                  ⚠️ Ending soon! Don't miss out
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;