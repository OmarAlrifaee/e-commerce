import { Routes, Route } from "react-router-dom";
import {
  Cart,
  Home,
  Paid,
  ProductDetails,
  RootLayout,
  Shop,
} from "./pages/index";
import useDarkModeStore from "./stors/dark-mode-store";
import useCartStore from "./stors/cart-store";
import { useEffect } from "react";

export default function App() {
  const { darkMode } = useDarkModeStore();
  const { cartProducts } = useCartStore();
  // set the cartProducts in the localstorage when ever the cartProduct state updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);
  return (
    <main className={`App ${darkMode && "dark"}`}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/paid" element={<Paid />} />
      </Routes>
    </main>
  );
}
