export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string; // Ensuring consistency in ID type (string in your code)
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional image property in the cart
}

export interface Store {
  cart: CartItem[];
  selectedCategory: string | null;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setCart: (cart: CartItem[]) => void;
  setProducts: (products: Product[]) => void;
}
