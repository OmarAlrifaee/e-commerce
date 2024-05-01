import { AnimatePresence, motion } from "framer-motion";
import useCartStore, { useTotalPrice } from "../stors/cart-store";
import { ProductCard } from "../components";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartProducts, clearCart } = useCartStore();
  const total = useTotalPrice();
  return (
    <motion.section
      className="flex-grow py-10 origin-top bg-white dark:bg-main-dark px-10 min-h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    >
      {cartProducts?.length ? (
        <div className="flex flex-col gap-5">
          <AnimatePresence>
            {cartProducts?.map((product) => (
              <ProductCard product={product} row cart key={product.id} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="font-bold text-3xl text-black dark:text-white-muted">
            You Don't Have Any Products yet
          </div>
          <Link
            to={"/shop"}
            className="px-4 py-2 bg-white border dark:border-white-muted text-black font-bold rounded-md"
          >
            Shop Now!
          </Link>
        </div>
      )}
      {cartProducts.length ? (
        <div className="mt-5 mx-auto flex items-center justify-center gap-5">
          <button className="remove_from_cart_btn" onClick={clearCart}>
            Delete All
          </button>
          <Link to={"/paid"} className="add_to_cart_btn">
            Buy Total: {total}$
          </Link>
        </div>
      ) : (
        ""
      )}
    </motion.section>
  );
};
