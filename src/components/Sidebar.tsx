import { useState } from "react";
import { FaMinus } from "react-icons/fa";

type SidebarProps = {
  onCategoryChange: (category: string | null) => void;
  onPriceFilterChange: (minPrice: number, maxPrice: number) => void;
  onSortChange: (sortOrder: "price-asc" | "price-desc") => void;
};

const Sidebar = ({
  onCategoryChange,
  onPriceFilterChange,
  onSortChange,
}: SidebarProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["electronics", "clothing", "home"];

  // Håndterer kategori-klikk
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  // Håndterer sortering
  const handleSortChange = (order: "price-asc" | "price-desc") => {
    onSortChange(order);
  };

  // Håndterer prisfilter
  const handlePriceFilter = () => {
    onPriceFilterChange(minPrice, maxPrice);
  };

  return (
    <aside className="w-full sm:w-64">
      {/* Padding internt */}
      <div className="p-4 sm:p-6">
        {/* Kategorier */}
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${
              selectedCategory === null
                ? "text-blue-500 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => handleCategoryClick(null)}
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
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Sortering */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Sort Products</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <ul className="space-y-2">
          <li
            className="cursor-pointer text-gray-700 hover:text-blue-500"
            onClick={() => handleSortChange("price-asc")}
          >
            Price (Low to High)
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-blue-500"
            onClick={() => handleSortChange("price-desc")}
          >
            Price (High to Low)
          </li>
        </ul>

        {/* Prisfilter */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Price</h2>
        <FaMinus className="text-gray-300 mb-4" />
        <div className="space-y-2">
          <div className="flex items-center">
            <label htmlFor="minPrice" className="mr-2">
              Min
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="p-1 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="maxPrice" className="mr-2">
              Max
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="p-1 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            onClick={handlePriceFilter}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
