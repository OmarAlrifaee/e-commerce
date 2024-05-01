import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../Types";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader, ProductCard } from "../components";
export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (data) setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  return (
    <motion.section
      className="flex-grow py-20 origin-top bg-white dark:bg-main-dark px-10"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    >
      {loading ? (
        <Loader />
      ) : (
        product && (
          <div className="flex justify-center items-center">
            <ProductCard product={product as Product} row />
          </div>
        )
      )}
    </motion.section>
  );
};
