import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useCartStore from "../stors/cart-store";

export const Paid = () => {
  const { clearCart } = useCartStore();
  return (
    <motion.section
      className="flex-grow py-10 origin-top bg-white dark:bg-main-dark px-10 min-h-screen flex justify-center items-center"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className=" p-10 border border-secondry-dark dark:border-white-muted bg-white dark:bg-secondry-dark font-bold capitalize rounded-lg">
        <h2 className="text-5xl text-black dark:text-white-muted">
          Congrats ! You Paid Successfully
        </h2>
        <div>
          <Link
            to={"/"}
            className="add_to_cart_btn mt-12 mx-auto block text-center text-3xl"
            onClick={clearCart}
          >
            Go Home
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
