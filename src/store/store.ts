import { create } from 'zustand';
import { Product, CartItem, Store } from '../types/types';

export const useStore = create<Store>((set) => ({
  cart: [],
  selectedCategory: null,
  originalProducts: [
    { id: '1', name: 'Laptop', category: 'electronics', price: 999, image: '/images/laptop.png' },
    { id: '2', name: 'T-Shirt', category: 'clothing', price: 29, image: '/images/tshirt.png' },
    { id: '3', name: 'Sofa', category: 'home', price: 499, image: '/images/sofa.png' },
  ],
  products: [], // Initially empty, will be set to originalProducts

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        // If item already in cart, update quantity
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // If item not in cart, add it
        return {
          cart: [...state.cart, { ...product, quantity }],
        };
      }
    }),

  removeFromCart: (id: string) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

  setCart: (cart: CartItem[]) => set({ cart }),

  setSelectedCategory: (category: string | null) =>
    set((state) => {
      const filteredProducts = category
        ? state.originalProducts.filter((product) => product.category === category)
        : state.originalProducts;
      return { selectedCategory: category, products: filteredProducts };
    }),

  setProducts: (products: Product[]) => set({ products }),

  resetFilters: () =>
    set((state) => ({ selectedCategory: null, products: state.originalProducts })),
}));
