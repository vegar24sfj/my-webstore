import { CartItem } from "../types/types";

type CartProps = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  closeCart: () => void;
};

const Cart = ({ cart, removeFromCart, isCartOpen, closeCart }: CartProps) => {
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isCartOpen) return null;  // Only render if cart is open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={closeCart} // Close the cart when clicked
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times; {/* Close button */}
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {/* Cart Items */}
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl || "/images/default.png"} // Fallback image
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Cart Total */}
            <div className="mt-4 flex justify-between items-center font-semibold">
              <p>Total:</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => alert("Proceed to checkout")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
