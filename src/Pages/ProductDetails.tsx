import { useParams } from 'react-router-dom';
import { useStore } from '../store/store'; // Zustand store to get product data
import { Product } from '../types/types'; // Assuming Product is your type definition for a product

// Define the type for props
interface ProductDetailsProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams(); // Get the id from the URL params
  const { products } = useStore(); // Get products from Zustand store

  const productId = id ? id : ''; // Ensure the ID is treated as a string

  // Find the product by ID
  const product = products.find((p) => p.id === productId);

  // If the product is not found, show a "not found" message
  if (!product) {
    return (
      <div>
        <h2>Product not found!</h2>
        <p>Sorry, we couldn't find the product you're looking for. <a href="/shop">Go back to shop</a>.</p>
      </div>
    );
  }

  return (
    <div className="product-details p-8">
      <div className="product-info">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="mb-4">{product.description}</p>
        <p className="font-semibold mb-4">Price: ${product.price}</p>
        <img 
          src={product.imageUrl || '/fallback-image.jpg'} 
          alt={product.name} 
          className="w-full h-96 object-cover rounded-md mb-4" 
        />
      </div>

      {/* Add to Cart button */}
      <div className="add-to-cart">
        <button
          onClick={() => addToCart(product, 1)} // Add product to cart
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
