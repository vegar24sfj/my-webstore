// Home.tsx
import { Link } from "react-router-dom";
import PopularCategories from "../components/PopularCategories";

const Home: React.FC = () => {
  return (
    <>
      {/* Forsideinnhold under HeroBanner */}
      <section className="max-w-7xl mx-auto text-center sm:text-left bg-gray-200 rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
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
      </section>

      {/* Seksjon for populære kategorier */}
      <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-0">
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;
