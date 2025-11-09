import React, { useState } from 'react';
import { Zoom, Move, Heart, Share2 } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        {/* Main Image Container */}
        <div
          className="w-full h-full cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-600">Product Image {selectedImage + 1}</span>
          </div>
          
          {/* Zoom Overlay */}
          {isZoomed && (
            <div
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '200%',
                transform: 'scale(1.1)'
              }}
            />
          )}
        </div>

        {/* Image Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Zoom className="w-4 h-4" />
          <span>Hover to zoom</span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Move className="w-5 h-5 rotate-90" />
            </button>
            <button
              onClick={() => setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Move className="w-5 h-5 -rotate-90" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;