import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  return (
    <div className="p-0">
      {/* Add p-0 here to remove padding in Home */}
      <HeroBanner />
      <div className="p-4"> {/* Add margin top to separate HeroBanner from this section */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg">
          Find the best products at amazing prices! Click the button below to
          start shopping.
        </p>
        <div className="mt-4 mb-4">
          <Link to="/shop" className="text-blue-500 text-lg font-semibold">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
