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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center"
            style={{ width: "200px", height: "250px" }} // Circle plus space for text
          >
            <Link to={`/shop/${category.id}`} className="w-full h-full rounded-full overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
              />
            </Link>
            <h3 className="mt-4 font-semibold text-xl text-center">{category.name}</h3> {/* Name under circle */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
