import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Category, Product } from "../Types";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CategoryCard, Loader, ProductCard } from "../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
export const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [limtedProducts, setLimtedProducts] = useState<Product[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [limtedLoading, setLimtedLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setCategoriesLoading(true);
      try {
        const { data } = await axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (data.length) setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    const getLimtedProducts = async () => {
      setLimtedLoading(true);
      try {
        const { data } = await axios.get(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
        );
        if (data.length) setLimtedProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLimtedLoading(false);
      }
    };
    getLimtedProducts();
    getCategories();
  }, []);
  return (
    <motion.section
      className="flex-grow py-10 origin-top bg-white dark:bg-main-dark px-10 min-h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="my-10">
        {limtedLoading || categoriesLoading ? (
          <Loader />
        ) : (
          <Swiper
            breakpoints={{
              0: {
                spaceBetween: 1,
                slidesPerView: 1,
              },
              767: {
                spaceBetween: 1,
                slidesPerView: 2,
              },
              1000: {
                spaceBetween: 2,
                slidesPerView: 3,
              },
              1280: {
                spaceBetween: 2,
                slidesPerView: 4,
              },
            }}
            navigation
            modules={[Navigation]}
            loop
          >
            {limtedProducts?.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="py-5 mt-5">
        {limtedLoading || categoriesLoading ? (
          <Loader />
        ) : (
          <Swiper
            breakpoints={{
              0: {
                spaceBetween: 1,
                slidesPerView: 1,
              },
              767: {
                spaceBetween: 1,
                slidesPerView: 2,
              },
              1000: {
                spaceBetween: 2,
                slidesPerView: 3,
              },
              1280: {
                spaceBetween: 2,
                slidesPerView: 4,
              },
            }}
            navigation
            modules={[Navigation]}
            loop
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </motion.section>
  );
};
