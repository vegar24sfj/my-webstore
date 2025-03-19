import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStore } from "./store/store";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy"; // Import PrivacyPolicy
import TermsAndConditions from "./Pages/TermsAndConditions"; // Import TermsAndConditions
import Contact from "./Pages/Contact"; // Import Contact
import Breadcrumb from "./components/Breadcrumb"; // Import Breadcrumb

function App() {
  const { cart, products, addToCart, removeFromCart } = useStore();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} />
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        <div className="flex flex-1 flex-col items-center p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
