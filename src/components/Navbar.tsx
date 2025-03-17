import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

type NavbarProps = {
  cart: CartItem[];
};

const Navbar = ({ cart }: NavbarProps) => {
  return (
    <nav className="bg-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center text-gray-950">
        {/* Left Section with Logo */}
        <div className="flex items-center space-x-10">
          {/* Logo - Replace with the path to your logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.jpeg" alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Navigation Links */}
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/shop" className="hover:text-gray-200">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link to="/privacy-policy" className="hover:text-gray-200">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-gray-200">
            Terms & Conditions
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </div>

        {/* Right Section with Cart */}
        <div className="flex items-center space-x-2">
          <Link to="/cart" className="hover:text-gray-200 flex items-center">
            <FaShoppingCart className="text-gray-950 text-xl" />{" "}
            {/* Cart Icon */}
            {cart.length > 0 && (
              <span className="ml-2">{cart.length}</span>
            )}{" "}
            {/* Cart Count */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
