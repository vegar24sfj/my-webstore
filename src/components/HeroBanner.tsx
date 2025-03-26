import { useStore } from "../store/store"; // Import Zustand store to get products
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const { originalProducts } = useStore(); // Get originalProducts from Zustand store

  // Limit to the first 3 products
  const featuredProducts = originalProducts.slice(0, 3);

  return (
    <div className="bg-blue-500 text-white p-8 sm:p-16 mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Explore Our Latest Collection!
      </h2>
      <p className="text-sm sm:text-lg mt-2 text-center sm:text-left">
        Find high-quality products at great prices. Start shopping today!
      </p>

      {/* Featured Products */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-8 mt-8">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-72 sm:w-80 hover:shadow-2xl transition-shadow duration-300"
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
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
