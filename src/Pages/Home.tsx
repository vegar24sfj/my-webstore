import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
      <p className="text-lg">
        Find the best products at amazing prices! Click the button below to start shopping.
      </p>
      <div className="mt-4">
        {/* Use Link here instead of <a> */}
        <Link to="/shop" className="text-blue-500 text-lg font-semibold">
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default Home;
