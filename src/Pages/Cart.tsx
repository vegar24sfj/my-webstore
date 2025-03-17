import { CartItem } from "../types/types";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

type CartProps = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
};

const Cart = ({ cart, removeFromCart }: CartProps) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {/* If the cart is empty */}
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center p-4 border-b">
                {/* Product Image */}
                <div className="flex items-center space-x-4">
                  {/* Check if item.image exists and render it */}
                  {item.image && (
                    <img
                      src={item.image}  // Use the image URL stored in the `image` field
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <span className="font-semibold">{item.name}</span> - ${item.price} x {item.quantity}
                  </div>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <span className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
          </div>

          {/* Proceed to checkout button */}
          <div className="mt-6">
            <Link to="/checkout">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
