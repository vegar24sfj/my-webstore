import React, { useEffect, useState } from "react";
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
    setProducts, // Use setProducts if you want to update the store
    originalProducts,
  } = useStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">("price-asc");

  useEffect(() => {
    // Filter by category and price on every change
    let newFilteredProducts = [...originalProducts];

    // Filter by selected category
    if (selectedCategory) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    newFilteredProducts = newFilteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Apply sorting
    if (sortOrder === "price-asc") {
      newFilteredProducts = newFilteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      newFilteredProducts = newFilteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(newFilteredProducts);

    // Update Zustand store with filtered products
    setProducts(newFilteredProducts);
  }, [selectedCategory, minPrice, maxPrice, sortOrder, originalProducts, setProducts]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handlePriceFilterChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSortChange = (order: "price-asc" | "price-desc") => {
    setSortOrder(order);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar Component with props */}
      <Sidebar
        onCategoryChange={handleCategoryChange}
        onPriceFilterChange={handlePriceFilterChange}
        onSortChange={handleSortChange}
      />
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-4 bg-white">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-48 h-48 object-cover mb-4 hover:scale-105 duration-300 ease-in-out"
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
