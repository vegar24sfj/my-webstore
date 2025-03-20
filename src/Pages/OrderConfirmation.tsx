import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export function OrderConfirmation() {
  const { setCart } = useStore(); // Get the setCart action from Zustand store
  const navigate = useNavigate(); // This hook will help navigate the user to other pages

  const handleContinueShopping = () => {
    setCart([]); // Clear the cart after order confirmation
    navigate("/"); // Redirect to the homepage or you could navigate to another page if you prefer
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-semibold text-green-600 mb-4">
        Order Confirmed!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order has been successfully placed. We
        appreciate your business!
      </p>
      <div>
        <button
          onClick={handleContinueShopping}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
