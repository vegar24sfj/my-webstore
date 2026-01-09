import { useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "../types/types";

type CheckoutProps = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
};

const Checkout = ({ cart, removeFromCart }: CheckoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity } = location.state || {};
  const isSingleProductCheckout = Boolean(product);

  const checkoutItems = isSingleProductCheckout
    ? [{ ...product, quantity }]
    : cart;

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const totalAmount = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
        Checkout
      </h1>

      <div className="mb-6">
        {checkoutItems.length === 0 ? (
          <p className="text-gray-700 text-lg text-center">
            Your cart is empty
          </p>
        ) : (
          <ul className="space-y-4 text-gray-800">
            {checkoutItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-lg"
              >
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
                {!isSingleProductCheckout && (
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between text-xl font-bold mt-4 text-gray-800">
        <span>Total:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>

      {checkoutItems.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
