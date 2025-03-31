import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/store"; // Import Zustand store to get products
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const { originalProducts } = useStore(); // Get originalProducts from Zustand store

  // Limit to the first 3 products for the carousel
  const featuredProducts = originalProducts.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index

  // Function to move to the next product in the carousel
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  }, [featuredProducts.length]); // Recreate the function only if the featuredProducts length changes

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [nextSlide]); // Only depend on nextSlide which is stable due to useCallback

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
              display: "flex",
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-full p-6 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={product.imageUrl} // Assuming imageUrl is the correct property
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
              className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
