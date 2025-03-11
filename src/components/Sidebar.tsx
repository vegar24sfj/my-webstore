import { useState } from "react";

export function Sidebar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <div className="w-64 bg-gray-100 p-4 fixed top-0 left-0 h-full z-10"> {/* Add z-10 for stacking order */}
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Decoration</li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Furniture</li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Test</li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">AA</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">Sort Products</h2>
      <ul className="space-y-2">
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Price (Lower to High)</li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Price (High to Low)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">Price</h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <label htmlFor="minPrice" className="mr-2">Min Price</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="maxPrice" className="mr-2">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          />
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Apply Filter</button>
      </div>
    </div>
  );
}

export default Sidebar;
