import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "./store/store"; // Zustand store to manage state
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
import Cart from "./components/Cart";

function App() {
  const { cart, products, addToCart, removeFromCart, setProducts } = useStore(); // Zustand store
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Log the products to ensure they're loaded correctly
  useEffect(() => {
    console.log(products); // Check the products in the store
  }, [products]);

  // Use useCallback to memoize fetchProducts function
  const fetchProducts = useCallback(async () => {
    const response = await fetch("/api/products"); // Replace with your actual API endpoint
    const data = await response.json();
    setProducts(data); // Save the fetched products to the Zustand store
  }, [setProducts]);

  useEffect(() => {
    // If the products are not loaded, we might need to fetch them
    if (products.length === 0) {
      // Fetch products (or set them directly if you already have data)
      fetchProducts();
    }
  }, [products, fetchProducts]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} openCart={openCart} />
        <Breadcrumb />
        <div className="flex flex-1 flex-col items-center overflow-auto">
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
            <Route
              path="/checkout"
              element={<Checkout cart={cart} removeFromCart={removeFromCart} />}
            />
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
