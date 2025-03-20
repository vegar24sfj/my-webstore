import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

type CartProps = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
};

const Cart = ({ cart, removeFromCart }: CartProps) => {
  // Calculate total price safely
  const totalPrice =
    Math.round(
      cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100
    ) / 100;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div className="flex items-center space-x-4">
                  {/* Display product image if available */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <span className="font-semibold">{item.name}</span> - $
                    {item.price} x {item.quantity}
                  </div>
                </div>

                {/* Remove from Cart Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total Price Display */}
          <div className="mt-4 text-right">
            <span className="text-xl font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Proceed to Checkout */}
          <div className="mt-6 text-center">
            <Link to="/checkout">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
