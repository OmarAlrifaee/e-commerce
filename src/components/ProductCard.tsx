import { motion } from "framer-motion";
import { Product } from "../Types";
import { Link } from "react-router-dom";
import useCartStore, { useGetTotalProductPrice } from "../stors/cart-store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
type ProductCardProps = {
  product: Product;
  row?: true;
  cart?: true;
};
export const ProductCard = ({ product, row, cart }: ProductCardProps) => {
  const {
    cartProducts,
    addToCart,
    incrementCount,
    decrementCount,
    removeFromCart,
  } = useCartStore();
  const currentProductCart = cartProducts.find((p) => product.id === p.id);
  const totalProductPrice = useGetTotalProductPrice(
    currentProductCart?.id || null
  );
  return (
    <motion.div
      className={`bg-white border dark:border-white-muted dark:bg-secondry-dark rounded-md overflow-hidden min-h-[550px] ${
        !row && "max-w-[300px]"
      } capitalize ${row && "flex items-center xl:flex-nowrap flex-wrap"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ scaleY: 0 }}
      layout
    >
      <Swiper
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        spaceBetween={0}
        className={`flex-1 max-h-[550px] ${
          row && "md:min-w-[550px] min-w-full"
        } ${!row && "w-[300px]"}`}
      >
        {product.images.map((url) => (
          <SwiperSlide key={url}>
            <div>
              <img
                src={url || "/assets/example.jpeg"}
                alt={product.title}
                className={`h-full w-full object-cover bg-center`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="px-8 flex flex-col py-5 flex-1">
        <h3 className="font-semibold text-xl text-black dark:text-[#C9C9C9]">
          {row ? product.title : product.title.slice(0, 20) + "..."}
        </h3>
        <p className="font-semibold text-black dark:text-white-muted">
          category: {product.category.name}
        </p>
        <p className="text-sm mt-2 text-black dark:text-white-muted">
          {row ? product.description : product.description.slice(0, 60) + "..."}
        </p>
        <div className="flex justify-between items-center gap-2 mt-5 md:flex-nowrap flex-wrap">
          <p className="font-bold text-xl text-black dark:text-[#C9C9C9]">
            {product.price}$
          </p>
          <div className="flex items-center gap-3 font-semibold">
            {!row && (
              <motion.div whileTap={{ scale: 1.2 }}>
                <Link
                  to={`/products/${product.id}`}
                  className="add_to_cart_btn"
                >
                  Show
                </Link>
              </motion.div>
            )}
            {currentProductCart ? (
              <div className="flex items-center">
                <motion.button
                  className="add_to_cart_btn"
                  onClick={() => incrementCount(product.id)}
                  whileTap={{ scale: 1.2 }}
                >
                  +
                </motion.button>
                <p className="bg-white dark:bg-secondry-dark text-black dark:text-white-muted px-2 text-lg">
                  {currentProductCart?.count}
                </p>
                <motion.button
                  className="remove_from_cart_btn"
                  onClick={() => decrementCount(product.id)}
                  whileTap={{ scale: 1.2 }}
                >
                  -
                </motion.button>
              </div>
            ) : (
              <motion.button
                className="add_to_cart_btn"
                onClick={() => addToCart(product)}
                whileTap={{ scale: 1.2 }}
              >
                Add
              </motion.button>
            )}
            {currentProductCart && row && (
              <motion.button
                className="remove_from_cart_btn"
                onClick={() => removeFromCart(product.id)}
                whileTap={{ scale: 1.2 }}
              >
                Remove
              </motion.button>
            )}
          </div>
        </div>
        {cart && (
          <p className="dark:text-white-muted text-black md:text-2xl text-xl mt-3 font-bold">
            Total For Product: {totalProductPrice}$
          </p>
        )}
      </div>
    </motion.div>
  );
};
