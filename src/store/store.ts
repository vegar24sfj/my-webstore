import { create } from "zustand";
import { Product, CartItem, Store } from "../types/types";

// Load cart data from localStorage on initial load
const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Save cart data to localStorage whenever it changes
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useStore = create<Store>((set) => ({
  cart: loadCartFromLocalStorage(), // Initialize cart with data from localStorage
  selectedCategory: null,
  originalProducts: [
    {
      id: "1", // id as string
      name: "Laptop",
      category: "electronics",
      price: 999,
      imageUrl: "/images/1.png", // Image URL for the product
      description:
        "A high-performance laptop with a powerful processor, perfect for gaming and productivity.",
    },
    {
      id: "2", // id as string
      name: "T-Shirt",
      category: "clothing",
      price: 29,
      imageUrl: "/images/2.jpg", // Image URL for the product
      description:
        "A comfortable and stylish t-shirt made of soft cotton, ideal for casual wear.",
    },
    {
      id: "3", // id as string
      name: "Sofa",
      category: "home",
      price: 499,
      imageUrl: "/images/3.jpg", // Image URL for the product
      description:
        "A luxurious and spacious sofa that will elevate the look of your living room.",
    },
    // More products can be added here
  ],
  products: [], // Initially empty, will be set to originalProducts

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        // If item already in cart, update quantity
        newCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If item not in cart, add it
        newCart = [...state.cart, { ...product, quantity }];
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(newCart);
      return { cart: newCart };
    }),

  removeFromCart: (id: string) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      // Save updated cart to localStorage
      saveCartToLocalStorage(newCart);
      return { cart: newCart };
    }),

  setCart: (cart: CartItem[]) => {
    // Save updated cart to localStorage
    saveCartToLocalStorage(cart);
    set({ cart });
  },

  setSelectedCategory: (category: string | null) =>
    set((state) => {
      const filteredProducts = category
        ? state.originalProducts.filter(
            (product) => product.category === category
          )
        : state.originalProducts;
      return { selectedCategory: category, products: filteredProducts };
    }),

  setProducts: (products: Product[]) => set({ products }),

  resetFilters: () =>
    set((state) => ({
      selectedCategory: null,
      products: state.originalProducts,
    })),
}));
