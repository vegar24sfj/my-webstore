import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useStore } from "./store/store";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Contact from "./Pages/Contact";
import Breadcrumb from "./components/Breadcrumb";
import Cart from "./components/Cart"; // Import the Cart component here

function App() {
  const { cart, products, addToCart, removeFromCart } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to open the cart (side panel)
  const openCart = () => {
    setIsCartOpen(true); // Open the cart
  };

  // Function to close the cart (side panel)
  const closeCart = () => {
    setIsCartOpen(false); // Close the cart
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} openCart={openCart} /> {/* Pass openCart to Navbar */}
        <Breadcrumb />
        <div className="flex flex-1 flex-col items-center p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={<Shop products={products} addToCart={addToCart} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Cart side panel */}
      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          isCartOpen={isCartOpen}
          closeCart={closeCart} // Pass closeCart to Cart component
        />
      )}
    </Router>
  );
}

export default App;
