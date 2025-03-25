import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { FaShoppingCart } from "react-icons/fa";

type NavbarProps = {
  cart: CartItem[];
  openCart: () => void; // Function to open the cart side panel
};

const Navbar = ({ cart, openCart }: NavbarProps) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0); // Sum quantities

  return (
    <nav className="bg-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center text-gray-950">
        {/* Left Section with Logo */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.jpeg" alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Navigation Links */}
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/shop" className="hover:text-gray-200">Shop</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/privacy-policy" className="hover:text-gray-200">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-gray-200">Terms & Conditions</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>

        {/* Right Section with Cart */}
        <div className="flex items-center space-x-2 relative">
          {/* Remove Link and use button or div to trigger openCart */}
          <button
            onClick={openCart} // Open cart side panel when clicked
            className="hover:text-gray-200 flex items-center"
          >
            <FaShoppingCart className="text-gray-950 text-3xl hover:text-blue-500" />
            {totalQuantity > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
