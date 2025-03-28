import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useStore } from "../store/store"; // Import store for products

const HeroBanner = () => {
  const { products, setProducts, originalProducts } = useStore(); // Get products from the store
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure products are loaded and initialized
  useEffect(() => {
    console.log('Products:', products); // Log products to see what's inside
    if (products.length === 0 && originalProducts.length > 0) {
      setProducts(originalProducts); // Set products if they are not already initialized
    }
  }, [products, originalProducts, setProducts]);

  // If products are empty, display a loading message
  if (products.length === 0) {
    return (
      <div className="bg-blue-500 text-white p-16 mb-6">
        <h2 className="text-3xl font-bold">Loading Products...</h2>
      </div>
    );
  }

  // Function to navigate to the next item
  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Function to navigate to the previous item
  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-blue-500 text-white p-6 mb-6 relative">
      {/* Hero Banner Text */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">All Products!</h2>
        <p className="text-lg mt-4">Shop now!</p>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <div className="overflow-hidden w-full">
          <div className="flex items-center justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-1/3 px-2 transition-all duration-300"
                  style={{
                    opacity: index === currentIndex ? 1 : 0.5,
                    transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  {/* Link wraps the image to make it clickable */}
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-64 rounded-md"
                    />
                  </Link>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-lg text-gray-200">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevProduct}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md"
        >
          &#60;
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md"
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
