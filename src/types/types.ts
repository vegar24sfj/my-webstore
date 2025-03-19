export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string; // Add this line to make description optional
}


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional image property in the cart
}

export interface Store {
  cart: CartItem[];
  selectedCategory: string | null;
  products: Product[];
  originalProducts: Product[];
  addToCart: (product: Product, quantity: number) => void; // Accepts both product and quantity
  removeFromCart: (id: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setCart: (cart: CartItem[]) => void;
  setProducts: (products: Product[]) => void;
  resetFilters: () => void;
}
