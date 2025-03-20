import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate and useLocation
import { CartItem } from "../types/types";

type CheckoutProps = {
  cart: CartItem[]; // Ensure that the prop is typed correctly
};

const Checkout = ({ cart }: CheckoutProps) => {
  const location = useLocation();
  const navigate = useNavigate(); // Declare the navigate function from useNavigate
  const { product, quantity } = location.state || {}; // Destructure state passed from ProductDetails

  const handlePlaceOrder = () => {
    // Redirect the user to the order confirmation page
    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>
      <div className="mb-6">
        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty
          </p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-lg text-gray-800"
              >
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
            {product && (
              <li className="flex justify-between text-lg text-gray-800">
                <span>{product.name}</span>
                <span>
                  ${product.price} x {quantity}
                </span>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
