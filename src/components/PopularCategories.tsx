// src/components/PopularCategories.tsx
import { Link } from "react-router-dom";

const PopularCategories = () => {
  const categories = [
    { id: "electronics", name: "Electronics", imageUrl: "/images/electronics.jpg" },
    { id: "clothing", name: "Clothing", imageUrl: "/images/clothing.jpg" },
    { id: "home", name: "Home", imageUrl: "/images/home.jpg" },
    // Add more categories as needed
  ];

  return (
    <div className="bg-white p-8 sm:p-16 mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">
        Explore Popular Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Link to={`/shop/${category.id}`} className="block">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-xl text-center">{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
