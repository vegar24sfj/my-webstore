import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore } from "./store/store"; // Zustand store
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Shop from "./Pages/Shop";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Contact from "./Pages/Contact";
import Breadcrumb from "./components/Breadcrumb";
import Cart from "./components/Cart";

function App() {
  const {
    cart,
    originalProducts,
    addToCart,
    removeFromCart,
    setProducts
  } = useStore(); // Zustand store

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (originalProducts.length > 0) {
      setProducts(originalProducts);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [originalProducts, setProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} openCart={openCart} />
        <Breadcrumb />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Shop Routes */}
            <Route
              path="/shop"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />
            <Route
              path="/shop/:category"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />

            {/* Product Detail */}
            <Route path="/product" element={<Navigate to="/shop" replace />} />
            <Route
              path="/product/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          isCartOpen={isCartOpen}
          closeCart={closeCart}
        />
      )}
    </Router>
  );
}

export default App;
