import { useLocation, useNavigate } from "react-router-dom"; // useLocation for receiving state from ProductDetails
import { CartItem } from "../types/types"; // Import CartItem type

type CheckoutProps = {
  cart: CartItem[]; // The cart prop will be an array of CartItem
  removeFromCart: (id: string) => void; // Function to remove an item from the cart
};

const Checkout = ({ cart, removeFromCart }: CheckoutProps) => {
  const navigate = useNavigate();

  // Get the state passed from ProductDetails (if any)
  const location = useLocation();
  const { product, quantity } = location.state || {}; // Destructure product and quantity if they exist

  // Determine whether we are checking out a single product or the entire cart
  const isSingleProductCheckout = Boolean(product);

  // If it's a single product checkout, we create a single-item cart
  const checkoutItems = isSingleProductCheckout
    ? [{ ...product, quantity }]
    : cart;

  // Handle placing the order (navigate to the order confirmation page)
  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };

  // Handle removing an item from the cart in the checkout page
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  // Calculate total price for all items in the cart
  const totalAmount = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>
      
      {/* Show either cart items or a single product item */}
      <div className="mb-6">
        {checkoutItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty
          </p>
        ) : (
          <ul className="space-y-4">
            {checkoutItems.map((item) => (
              <li key={item.id} className="flex justify-between text-lg text-gray-800">
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
                {/* Add a remove button for each item */}
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

      {/* Display total amount */}
      <div className="flex justify-between text-xl font-semibold mt-4">
        <span>Total:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>

      {/* Only show the Place Order button if there are items in the cart */}
      {checkoutItems.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
