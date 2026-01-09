import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

const HeroBanner: React.FC = () => {
  const { originalProducts } = useStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const featuredProducts = useMemo(
    () => originalProducts.slice(0, 3),
    [originalProducts]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!featuredProducts.length)
    return <div className="p-10 text-center">No products available!</div>;

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col items-center justify-center min-h-[60vh] rounded-b-2xl px-4 sm:px-8 lg:px-16 py-12 shadow-lg">
      <div className="w-full max-w-6xl overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredProducts.map((product: Product) => (
            <div key={product.id} className="flex-none w-full relative">
              <img
                src={product.imageUrl || "/fallback.jpg"}
                alt={product.name}
                className="w-full h-80 sm:h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-md">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-lg">${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel dots */}
      <div className="flex mt-6 space-x-2">
        {featuredProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-8 text-center max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Explore Our Latest Collection!
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Find high-quality products at great prices. Start shopping today!
        </p>
        <Link
          to="/shop"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
