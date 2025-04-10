import { Link } from "react-router-dom";

const PopularCategories = () => {
  const categories = [
    { id: "electronics", name: "Electronics", imageUrl: "/images/1.png" },
    { id: "clothing", name: "Clothing", imageUrl: "/images/2.jpg" },
    { id: "home", name: "Home", imageUrl: "/images/3.jpg" },
  ];

  return (
    <div className="bg-white p-8 sm:p-16 mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">
        Explore Popular Categories
      </h2>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 gap-0 justify-items-center">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop/${category.id}`}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-40 h-40 object-cover rounded-full" // Circular images with set width and height
            />
            <h3 className="mt-4 font-semibold text-xl text-center">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
