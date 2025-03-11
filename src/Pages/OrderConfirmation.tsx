export function OrderConfirmation() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
      <p>
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <a
        href="/shop"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Continue Shopping
      </a>
    </div>
  );
}

export default OrderConfirmation;
