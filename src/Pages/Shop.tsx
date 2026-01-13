// Shop.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { Link, useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/store";

interface ShopProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

// Type for location.state
interface ShopState {
  selectedCategory?: string | null;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const { selectedCategory, setSelectedCategory, setProducts, originalProducts } =
    useStore();

  const { category } = useParams();
  const location = useLocation();
  const state = location.state as ShopState | null;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">(
    "price-asc"
  );

  // Sett kategori ved URL eller state
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(state?.selectedCategory ?? null); // null = All Categories
    }
  }, [category, state?.selectedCategory, setSelectedCategory]);

  // Filtrering og sortering
  useEffect(() => {
    let newFilteredProducts = [...originalProducts];

    // Kategori
    if (selectedCategory) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Prisfilter
    newFilteredProducts = newFilteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Sortering
    newFilteredProducts.sort((a, b) =>
      sortOrder === "price-asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(newFilteredProducts);
    setProducts(newFilteredProducts);
  }, [selectedCategory, minPrice, maxPrice, sortOrder, originalProducts, setProducts]);

  // Handlere til Sidebar
  const handleCategoryChange = (category: string | null) => setSelectedCategory(category);
  const handlePriceFilterChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleSortChange = (order: "price-asc" | "price-desc") => setSortOrder(order);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <Sidebar
        onCategoryChange={handleCategoryChange}
        onPriceFilterChange={handlePriceFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Produkter */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-left">
          Shop
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-white rounded shadow hover:shadow-lg transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl || "/fallback.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg text-gray-700 mb-2">${product.price}</p>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">
              No products available
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
