// src/pages/Home.tsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import PopularCategories from "../components/PopularCategories"; // Assuming you have this component

const Home = () => {
  // Redirect to a product page (example: product with id "1") immediately upon landing on the homepage
  useEffect(() => {
    // Use Navigate to redirect to a product details page
    <Navigate to="/product/1" />;
  }, []);

  return (
    <div className="p-0">
      <HeroBanner />
      <PopularCategories />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg">
          Find the best products at amazing prices! Click the button below to start shopping.
        </p>
      </div>
    </div>
  );
};

export default Home;
