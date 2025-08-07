import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useStore } from "./store/store";

// Komponenter
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import Cart from "./components/Cart";

// Sider
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
    setCart,
    setProducts,
  } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Last inn produkter
  useEffect(() => {
    if (originalProducts.length > 0) {
      setProducts(originalProducts);
      setLoading(false);
    }
  }, [originalProducts, setProducts]);

  // 🔄 Hent cart fra MongoDB ved innlogging
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/cart/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setCart(data.items);
            console.log("✅ Cart hentet fra MongoDB");
          }
        })
        .catch((err) => console.error("❌ Feil ved henting av cart:", err));
    }
  }, [user?.id, setCart]);

  // ☁️ Lagre cart til MongoDB når den endres
  useEffect(() => {
    if (user?.id && cart.length > 0) {
      fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          items: cart,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("🛒 Cart synkronisert:", data.message);
        })
        .catch((err) => {
          console.error("❌ Cart sync error:", err);
        });
    }
  }, [cart, user?.id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} openCart={openCart} />
        <Breadcrumb />

        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />
            <Route
              path="/shop/:category"
              element={<Shop products={originalProducts} addToCart={addToCart} />}
            />
            <Route path="/product" element={<Navigate to="/shop" replace />} />
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
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* 🛒 Cart Sidebar */}
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
