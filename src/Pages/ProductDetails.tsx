import { useParams } from 'react-router-dom';
import { Product } from '../types/types'; // Make sure Product is imported from types
import { useStore } from '../store/store';

type ProductDetailsProps = {
  addToCart: (product: Product) => void;
};

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams();  // Get id from the URL
  const { products } = useStore(); // Get the products from Zustand store

  if (!id) {
    return <div>Product not found!</div>;
  }

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-6xl w-full p-8 gap-8">
        {/* Product Image */}
        <div className="flex-1 max-w-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
            style={{ maxHeight: '400px', objectFit: 'contain' }} // Ensure image isn't too large
          />
        </div>

        {/* Product Information */}
        <div className="flex-2 flex flex-col items-start justify-start space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-medium text-teal-600">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProductDetails;
