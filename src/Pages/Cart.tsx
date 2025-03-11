import { useNavigate } from 'react-router-dom';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartProps = {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
};

const Cart = ({ cart, removeFromCart }: CartProps) => {
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    navigate("/checkout");  // Navigate to the Checkout page
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-lg text-gray-500">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-bold text-red-500">
              ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              onClick={proceedToCheckout}  // Navigate to the Checkout page
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
