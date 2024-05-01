// product
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};
// cart store
export type CartState = {
  cartProducts: (Product & { count: number })[];
};
export type CartActions = {
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  incrementCount: (id: number) => void;
  decrementCount: (id: number) => void;
  clearCart: () => void;
};
// dark mode store
export type DarkModeState = {
  darkMode: boolean;
};
export type DarkModeActions = {
  changeMode: () => void;
};
// products store
export type ProductsState = {
  products: Product[];
  loading: boolean;
};
export type ProductsActions = {
  setProducts: (products: Product[]) => void;
  setLoading: (value: boolean) => void;
};
export type Category = {
  id: number;
  name: string;
  image: string;
};
