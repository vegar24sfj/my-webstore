import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { Product } from '../types/types';
import { useState } from 'react';

// Define the type for props
interface ProductDetailsProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams();
  const { products } = useStore();
  const navigate = useNavigate();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const productId = id ?? '';
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div>
        <h2>Product not found!</h2>
        <p>
          Sorry, we couldn't find the product you're looking for.{' '}
          <a href="/shop">Go back to shop</a>.
        </p>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleReviewSubmit = () => {
    alert(`Review Submitted!\nRating: ${rating} stars\nComment: ${review}`);
    setReview('');
    setRating(0);
  };

  return (
    <div className="product-details p-8 max-w-5xl mx-auto">
      {/* Product Info */}
      <div className="product-info mb-6">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-sm text-gray-500 mb-1">
          Product Code: {product.code || 'N/A'}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          Main Category: {product.mainCategory || 'N/A'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Category: {product.category || 'N/A'}
        </p>
        <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
        <img
          src={product.imageUrl || '/fallback-image.jpg'}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md mb-6"
        />
        <p className="text-gray-700 mb-6">{product.description}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => addToCart(product, 1)}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Buy Now
        </button>
      </div>

      {/* Submit Review Section */}
      <div className="review-section mt-10">
        <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 cursor-pointer transition-all ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          placeholder="Write your review..."
          className="w-full border border-gray-300 p-3 rounded mb-4"
        />
        <button
          onClick={handleReviewSubmit}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
