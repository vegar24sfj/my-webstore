import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import PopularCategories from "../components/PopularCategories"; // Assuming you have this component

const Home = () => {
  // Redirect to a product page (example: product with id "1") immediately upon landing on the homepage
  useEffect(() => {
    // Uncomment the line below to enable redirect to a product
    // <Navigate to="/product/1" />;
  }, []);

  return (
    <div className="p-0">
      <HeroBanner />
      <div className="p-16">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg">
          Find the best products at amazing prices! Click the button below to start shopping.
        </p>
        {/* Link to the shop page */}
        <Link
          to="/shop"
          className="inline-block mt-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Start Shopping
        </Link>
      </div>
      <PopularCategories />
    </div>
  );
};

export default Home;
