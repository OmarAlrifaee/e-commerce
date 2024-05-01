import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product, ProductsActions, ProductsState } from "../Types";
type Store = ProductsState & ProductsActions;
// store
const useProductsStore = create<Store>()(
  immer((set) => ({
    products: [],
    loading: false,
    setLoading: (value: boolean) =>
      set((state) => {
        state.loading = value;
      }),
    setProducts: (products: Product[]) =>
      set((state) => {
        state.products = products;
      }),
  }))
);
export default useProductsStore;
