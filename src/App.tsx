import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Clerk-auth
import { useStore } from "./store/store"; // Zustand store

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import Cart from "./components/Cart";

// Pages
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Contact from "./Pages/Contact";

function App() {
  const {
    cart,
    originalProducts,
    addToCart,
    removeFromCart,
    setProducts,
    setCart, // brukes til å sette cart fra backend
  } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const userId = user?.id;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // 🔄 Hent produkter ved førstegangsinnlasting
  useEffect(() => {
    if (originalProducts.length > 0) {
      setProducts(originalProducts);
      setLoading(false);
    }
  }, [originalProducts, setProducts]);

  // 🔄 Hent cart fra backend etter innlogging
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data.items || []);
        })
        .catch((err) => console.error("Feil ved henting av cart:", err));
    }
  }, [userId, setCart]);

  // 💾 Automatisk lagring av cart til backend når den endres
  useEffect(() => {
    if (userId && cart.length >= 0) {
      fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, items: cart }),
      }).catch((err) => console.error("Feil ved lagring av cart:", err));
    }
  }, [cart, userId]);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Laster produkter...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} openCart={openCart} />
        <Breadcrumb />
        <div className="flex-1 overflow-auto">
          <Routes>
            {/* Hovedside */}
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route
              path="/shop"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />
            <Route
              path="/shop/:category"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />

            {/* Produktdetaljer */}
            <Route path="/product" element={<Navigate to="/shop" replace />} />
            <Route
              path="/product/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />

            {/* Checkout og bestilling */}
            <Route
              path="/checkout"
              element={<Checkout cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Informasjonssider */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Handlekurv Sidebar */}
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
