import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CheckoutProps = {
  cart: CartItem[]; // Cart items passed to Checkout
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; // Function to reset cart after checkout
};

export function Checkout({ cart, setCart }: CheckoutProps) {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCart([]); // Clear cart after checkout
    navigate("/order-confirmation"); // Navigate to order confirmation page
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/shop" className="text-blue-500">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              required
              placeholder="Enter your full name"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              required
              placeholder="Enter your address"
            />
          </div>

          {/* Credit Card Number Input */}
          <div>
            <label className="block text-sm font-medium">Credit Card Number</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              required
              pattern="(?:\d{4}[- ]){3}\d{4}|\d{16}"
              placeholder="Enter your credit card number"
            />
            <small className="text-gray-500">
              Enter a valid credit card number (16 digits).
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
