import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store"; // Zustand store to get products

const HeroBanner = () => {
  const { originalProducts } = useStore();
  const [loading, setLoading] = useState(true);

  // Log the original products for debugging
  useEffect(() => {
    console.log("Original Products:", originalProducts);
  }, [originalProducts]);

  // Memoize the first 3 featured products to prevent unnecessary recalculations
  const featuredProducts = useMemo(() => {
    console.log("Featured Products:", originalProducts.slice(0, 3)); // Debug the sliced products
    return originalProducts.slice(0, 3);
  }, [originalProducts]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Check for loading status and update it based on product availability
  useEffect(() => {
    if (originalProducts && originalProducts.length > 0) {
      setLoading(false);
    }
  }, [originalProducts]);

  // Show loading state if products are not ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no products exist, show an error message
  if (featuredProducts.length === 0) {
    return <div>No products available!</div>;
  }

  return (
    <div className="bg-blue-500 text-white p-8 sm:p-16 mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Explore Our Latest Collection!
      </h2>
      <p className="text-sm sm:text-lg mt-2 text-center sm:text-left">
        Find high-quality products at great prices. Start shopping today!
      </p>

      {/* Carousel Section */}
      <div className="relative">
        <div className="flex overflow-hidden">
          {/* Current Product Display */}
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move to the correct slide
              display: 'flex',
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-full p-6 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={product.imageUrl || "/path/to/fallback-image.jpg"} // Fallback image
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                </Link>
                <p className="text-gray-700 mb-2">${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-label={`Slide ${index + 1}`} // Added accessibility label
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
