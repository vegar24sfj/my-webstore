import React, { useEffect } from "react";
import { Product } from "../types/types"; // Assuming Product is defined in types.ts
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/store"; // Import Zustand store

interface ShopProps {
  products: Product[]; // Add products prop here
  addToCart: (product: Product, quantity: number) => void; // Update to expect two arguments
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    setProducts,
    originalProducts,
  } = useStore();

  // Initialize products with the full list of original products when the component is mounted
  useEffect(() => {
    setProducts(originalProducts);
  }, [originalProducts, setProducts]);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Category change handler
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Price filter change handler (just a placeholder for now)
  const handlePriceFilterChange = (minPrice: number, maxPrice: number) => {
    const filtered = originalProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setProducts(filtered);
  };

  // Sorting handler (based on price)
  const handleSortChange = (sortOrder: "price-asc" | "price-desc") => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      if (sortOrder === "price-asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sorted);
  };

  return (
    <div className="flex">
      {/* Sidebar Component with props */}
      <Sidebar
        onCategoryChange={handleCategoryChange}
        onPriceFilterChange={handlePriceFilterChange}
        onSortChange={handleSortChange}
      />
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl} // Use imageUrl property instead of image
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                </Link>

                <p className="text-gray-700 mb-2">${product.price}</p>

                <button
                  onClick={() => addToCart(product, 1)} // Add quantity of 1 by default
                  className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
