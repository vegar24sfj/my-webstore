import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-white py-8">
      <div className="max-w-6xl mx-auto flex justify-between items-start">
        {/* Left Side with Logo and Paragraph */}
        <div className="flex flex-col items-start">
          {/* Updated image path */}
          <img
            src="/images/logo.jpeg"
            alt="Logo"
            className="h-20 w-auto mb-4"
          />

          <p className="text-gray-400 text-sm max-w-xs">
            {" "}
            {/* Apply max-w-xs to restrict width */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
            eros nec leo consectetur convallis. Integer et erat in dui
            sollicitudin mollis.
          </p>
        </div>

        {/* Right Side with Quick Links and Information */}
        <div className="flex space-x-20">
          {/* Quick Links Section */}
          <div>
            <h2 className="text-black text-xl font-semibold mb-4">
              Quicklinks
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-700 hover:text-white">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h2 className="text-black text-xl font-semibold mb-4">
              Information
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-700 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-700 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>&copy; 2025 VEGAR'S STORE</p>
      </div>
    </footer>
  );
}

export default Footer;
