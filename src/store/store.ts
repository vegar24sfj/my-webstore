import { create } from "zustand";
import { CartItem, Product, Store } from "../types/types";

export const useStore = create<Store>((set) => ({
  cart: [],
  selectedCategory: null,
  products: [
    {
      id: '1',
      name: 'Product 1',
      category: 'electronics',
      price: 99.99,
      image: '/public/images/1.png', // Replace with actual image paths
    },
    {
      id: '2',
      name: 'Product 2',
      category: 'clothing',
      price: 49.99,
      image: '/public/images/2.jpg',
    },
    {
      id: '3',
      name: 'Product 3',
      category: 'home',
      price: 19.99,
      image: '/public/images/3.jpg',
    },
    // Add more products here
  ],
  addToCart: (product: Product) =>
    set((state: Store) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),
  removeFromCart: (id: string) =>
    set((state: Store) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  setSelectedCategory: (category: string | null) =>
    set({ selectedCategory: category }),
  setCart: (cart: CartItem[]) => set({ cart }),
  setProducts: (products: Product[]) => set({ products }),
}));
