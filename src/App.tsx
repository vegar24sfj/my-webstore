import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./Pages/Home"; // Import Home component

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home Route */}
              <Route path="/shop" element={<Shop addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
              <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
