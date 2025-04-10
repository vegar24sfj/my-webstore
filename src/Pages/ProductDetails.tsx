import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { Product } from '../types/types';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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

        {/* Stars */}
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <AiFillStar
                key={star}
                className="text-yellow-400 cursor-pointer text-2xl"
                onClick={() => setRating(star)}
              />
            ) : (
              <AiOutlineStar
                key={star}
                className="text-gray-300 cursor-pointer text-2xl"
                onClick={() => setRating(star)}
              />
            )
          )}
        </div>

        {/* Review Text Area */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          placeholder="Write your review..."
          className="w-full border border-gray-300 p-3 rounded mb-4"
        />

        {/* Submit Button */}
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
