// ProductDetails.tsx
import { useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { Product } from "../types/types"; 
import { useStore } from "../store/store"; 
import { FaStar, FaRegStar } from "react-icons/fa";

type ProductDetailsProps = {
  addToCart: (product: Product, quantity: number) => void; // Updated to match the store
};

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams();
  const { products } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  if (!id) return <div className="text-center text-red-500">Product not found!</div>;

  const product = products.find((product) => product.id === id);

  if (!product) return <div className="text-center text-red-500">Product not found!</div>;

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-6xl w-full p-8 gap-8">
        <div className="flex-1 max-w-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="flex-2 flex flex-col items-start space-y-6 w-full md:w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.category}</p>
          <p className="text-sm text-gray-500">Product Code: #{product.id}</p>
          <p className="text-xl font-medium text-teal-600">${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border rounded"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => addToCart(product, quantity)} // Pass both product and quantity
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Buy Now
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Description:</h3>
            <p className="text-gray-700">
              {product.description ? product.description : "No description available."}
            </p>
          </div>

          <div className="flex items-center">
            <span className="font-semibold mr-2">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)}>
                {i < rating ? (
                  <FaStar className="text-yellow-500 h-6 w-6" />
                ) : (
                  <FaRegStar className="text-gray-300 h-6 w-6" />
                )}
              </button>
            ))}
            <span className="ml-2 text-gray-600">{rating}/5</span>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border rounded resize-none"
              rows={3}
            ></textarea>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
