// Example types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;  // This is likely the correct property
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  selectedCategory: string | null;
  originalProducts: Product[];
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  setCart: (cart: CartItem[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setProducts: (products: Product[]) => void;
  resetFilters: () => void;
}
