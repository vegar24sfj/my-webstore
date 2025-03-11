// Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-xl">
          <Link to="/">Home</Link> {/* Link to Home page */}
        </div>
        <div className="flex space-x-4">
          <Link to="/shop" className="text-white">Shop</Link> {/* Link to Shop page */}
          <Link to="/cart" className="text-white">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
