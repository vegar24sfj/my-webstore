import { useState } from "react";
import { FaMinus } from "react-icons/fa";

type SidebarProps = {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceFilterChange: (minPrice: number, maxPrice: number) => void;
  onSortChange: (sortOrder: "price-asc" | "price-desc") => void;
};

const Sidebar = ({
  selectedCategory,
  onCategoryChange,
  onPriceFilterChange,
  onSortChange,
}: SidebarProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = ["electronics", "clothing", "home"];

  return (
    <aside className="w-full sm:w-64">
      <div className="p-4 sm:p-6">
        {/* Categories */}
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${
              selectedCategory === null
                ? "text-blue-500 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => onCategoryChange(null)}
          >
            All Categories
          </li>

          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${
                selectedCategory === category
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Sort */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Sort Products</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <ul className="space-y-2">
          <li
            className="cursor-pointer text-gray-700 hover:text-blue-500"
            onClick={() => onSortChange("price-asc")}
          >
            Price (Low to High)
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-blue-500"
            onClick={() => onSortChange("price-desc")}
          >
            Price (High to Low)
          </li>
        </ul>

        {/* Price */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Price</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="mr-2">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="p-1 border rounded w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="p-1 border rounded w-full"
            />
          </div>

          <button
            onClick={() => onPriceFilterChange(minPrice, maxPrice)}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
