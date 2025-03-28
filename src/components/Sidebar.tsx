import { useState } from "react";
import { FaMinus } from "react-icons/fa";

type SidebarProps = {
  onCategoryChange: (category: string | null) => void;
  onPriceFilterChange: (minPrice: number, maxPrice: number) => void;
  onSortChange: (sortOrder: "price-asc" | "price-desc") => void;
};

export function Sidebar({
  onCategoryChange,
  onPriceFilterChange,
  onSortChange,
}: SidebarProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["electronics", "clothing", "home"];

  // Handle category click
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryChange(category); // Pass category up to parent (Shop)
  };

  // Handle sort option selection
  const handleSortChange = (order: "price-asc" | "price-desc") => {
    onSortChange(order); // Pass sorting option up to parent
  };

  // Handle price filter application
  const handlePriceFilter = () => {
    onPriceFilterChange(minPrice, maxPrice); // Pass minPrice and maxPrice up to parent
  };

  return (
    <div className="w-full sm:w-64 bg-white p-4 sm:p-6 mt-4">
      {/* Categories */}
      <h2 className="text-xl font-semibold">Categories</h2>
      <FaMinus className="text-gray-300 flex-1 mb-4" /> {/* Horizontal line */}
      <ul className="space-y-2">
        <li
          className={`text-gray-700 hover:text-blue-500 cursor-pointer ${
            selectedCategory === null ? "text-blue-500 font-semibold" : ""
          }`}
          onClick={() => handleCategoryClick(null)} // Reset category to "All"
        >
          All Categories
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`text-gray-700 hover:text-blue-500 cursor-pointer ${
              selectedCategory === category ? "text-blue-500 font-semibold" : ""
            }`}
            onClick={() => handleCategoryClick(category)} // Update selected category
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Sort Products */}
      <h2 className="text-xl font-semibold mt-6">Sort Products</h2>
      <FaMinus className="text-gray-300 flex-1 mb-4" /> {/* Horizontal line */}
      <ul className="space-y-2">
        <li
          className="text-gray-700 hover:text-blue-500 cursor-pointer"
          onClick={() => handleSortChange("price-asc")}
        >
          Price (Low to High)
        </li>
        <li
          className="text-gray-700 hover:text-blue-500 cursor-pointer"
          onClick={() => handleSortChange("price-desc")}
        >
          Price (High to Low)
        </li>
      </ul>

      {/* Price Filter */}
      <h2 className="text-xl font-semibold mt-6">Price</h2>
      <FaMinus className="text-gray-300 flex-1 mb-4" /> {/* Horizontal line */}
      <div className="space-y-2">
        <div className="flex items-center">
          <label htmlFor="minPrice" className="mr-2">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="maxPrice" className="mr-2">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handlePriceFilter}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
