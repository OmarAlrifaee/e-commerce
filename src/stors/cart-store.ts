import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "../Types";
import { CartState, CartActions } from "../Types";
type Store = CartState & CartActions;
// store
const useCartStore = create<Store>()(
  immer((set) => ({
    cartProducts: JSON.parse(localStorage.getItem("cart")!) || [],
    addToCart: (product: Product) =>
      set((state) => {
        state.cartProducts.unshift({ ...product, count: 1 });
      }),
    removeFromCart: (id: number) =>
      set((state) => {
        const currentIndex = state.cartProducts.findIndex(
          (product) => product.id === id
        );
        state.cartProducts.splice(currentIndex, 1);
      }),
    incrementCount: (id: number) =>
      set((state) => {
        const currentIndex = state.cartProducts.findIndex(
          (product) => product.id === id
        );
        state.cartProducts[currentIndex].count++;
      }),
    decrementCount: (id: number) =>
      set((state) => {
        const currentIndex = state.cartProducts.findIndex(
          (product) => product.id === id
        );
        if (state.cartProducts[currentIndex].count > 1) {
          state.cartProducts[currentIndex].count--;
        } else {
          state.cartProducts.splice(currentIndex, 1);
        }
      }),
    clearCart: () =>
      set((state) => {
        state.cartProducts = [];
      }),
  }))
);
// get product total price
export const useGetTotalProductPrice = (id: number | null) => {
  if (id === null) return null;
  const cartProducts = useCartStore.getState().cartProducts;
  const currentProductIndex = cartProducts.findIndex(
    (product) => product.id === id
  );
  const total =
    cartProducts[currentProductIndex].count *
    cartProducts[currentProductIndex].price;
  return total;
};
// get total cart price
export const useTotalPrice = () => {
  const cartProducts = useCartStore.getState().cartProducts;
  const price = cartProducts.map((product) => product.price * product.count);
  const total = price.reduce((a, b) => a + b, 0);
  return total;
};
export default useCartStore;
