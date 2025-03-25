export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string; // Add description field
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  products: Product[];
  originalProducts: Product[];
  selectedCategory: string | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  setCart: (cart: CartItem[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setProducts: (products: Product[]) => void;
  resetFilters: () => void;
}
