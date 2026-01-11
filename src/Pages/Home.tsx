import { Link } from "react-router-dom";
import PopularCategories from "../components/PopularCategories"; // Eksisterende komponent

const Home: React.FC = () => {
  return (
    <div className="p-0">
      {/* Forsideinnhold under HeroBanner */}
      <div className="max-w-7xl mx-auto text-center sm:text-left bg-gray-200 rounded-lg p-0 sm:p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto sm:mx-0">
          Find the best products at amazing prices! Explore our categories or
          start shopping now.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Start Shopping
        </Link>
      </div>

      {/* Seksjon for populære kategorier */}
      <div className="mt-16">
        <PopularCategories />
      </div>
    </div>
  );
};

export default Home;
