import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { BsCart3 } from "react-icons/bs";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

type NavbarProps = {
  cart: CartItem[];
  openCart: () => void;
};

const Navbar = ({ cart, openCart }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center text-gray-950">
        {/* Venstre: Logo + Desktop nav links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.jpeg" alt="Logo" className="h-20 w-auto" />
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/shop" className="hover:text-blue-500">Shop</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
            <Link to="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-blue-500">Terms & Conditions</Link>
            <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          </div>
        </div>

        {/* Mobil hamburger meny */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-950 focus:outline-none">
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Høyre: Cart + Innlogging/bruker */}
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={openCart}
            className="hover:text-blue-500 flex items-center relative focus:outline-none"
            aria-label="Open cart"
          >
            <BsCart3 className="text-gray-950 text-3xl hover:text-blue-500" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Clerk Authentication */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                Logg inn
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobil meny */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="flex flex-col space-y-4 text-center">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-blue-500">Terms & Conditions</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
