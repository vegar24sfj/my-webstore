import { Link } from "react-router-dom";

// Define the Product type directly in this file
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
};

type ShopProps = {
  addToCart: (product: Product) => void;
};

const Shop = ({ addToCart }: ShopProps) => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product Title",
      price: 1.0,
      originalPrice: 11.0,
      description: "Sample description",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Sample Product",
      price: 1222.0,
      originalPrice: 21344.0,
      description: "Another description",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex bg-gray-100"> {/* Add background color to container for debugging */}
      <div className="flex-1 p-6 bg-white"> {/* Add background to the main content area */}
        <h1 className="text-2xl font-bold mb-4">Shop Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-200"> {/* Add background to grid for debugging */}
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md bg-yellow-200"> {/* Add background to each product box */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
              <p className="text-red-500 font-bold">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 text-white bg-blue-500 px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              {/* Link to product details page */}
              <Link
                to={`/product/${product.id}`}
                className="mt-2 block text-blue-500"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
