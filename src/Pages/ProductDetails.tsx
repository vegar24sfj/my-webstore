import { useParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
};

type ProductDetailsProps = {
  addToCart: (product: Product) => void;
};

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const products: Product[] = [
    {
      id: 1,
      name: "Product Title",
      price: 1.0,
      originalPrice: 11.0,
      description: "Sample description",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Sample Product",
      price: 1222.0,
      originalPrice: 21344.0,
      description: "Another description",
      image: "https://via.placeholder.com/300",
    },
  ];

  // Find the product by ID
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl text-gray-500 line-through mb-4">
            ${product.originalPrice.toFixed(2)}
          </p>
          <p className="text-2xl font-semibold text-red-500 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
