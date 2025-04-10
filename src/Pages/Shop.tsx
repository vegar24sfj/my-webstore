import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/store";

interface ShopProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    setProducts,
    originalProducts,
  } = useStore();

  const { category } = useParams(); // Get category from URL param
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">("price-asc");

  useEffect(() => {
    // If URL has category param, set it in the store
    if (category) {
      setSelectedCategory(category);
    }
  }, [category, setSelectedCategory]);

  useEffect(() => {
    let newFilteredProducts = [...originalProducts];

    if (selectedCategory) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    newFilteredProducts = newFilteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    if (sortOrder === "price-asc") {
      newFilteredProducts = newFilteredProducts.sort((a, b) => a.price - b.price);
    } else {
      newFilteredProducts = newFilteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(newFilteredProducts);
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
      <Sidebar
        onCategoryChange={handleCategoryChange}
        onPriceFilterChange={handlePriceFilterChange}
        onSortChange={handleSortChange}
      />
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
                  onClick={() => addToCart(product, 1)}
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
