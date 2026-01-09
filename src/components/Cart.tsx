// Cart.tsx
import { CartItem } from "../types/types";
import { useNavigate } from "react-router-dom";

type CartProps = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  closeCart: () => void;
};

const Cart = ({ cart, removeFromCart, isCartOpen, closeCart }: CartProps) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-white shadow-lg w-96 max-h-full overflow-y-auto p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-4 flex-1">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl || "/images/default.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.price}
                      </p>
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
            <div className="mt-6">
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
