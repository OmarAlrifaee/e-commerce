import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useProductsStore from "../stors/products-store";
import axios from "axios";
import { Category } from "../Types";
import { useLocation } from "react-router-dom";
import { CategoryOption, Loader, ProductCard } from "../components";
export const Shop = () => {
  const categoryState = useLocation().state?.category;
  const { loading, setLoading, products, setProducts } = useProductsStore();
  const [categories, setCategories] = useState<Category[]>();
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(categoryState || 0);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("50");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.escuelajs.co/api/v1${
            categoryId ? `/categories/${categoryId}` : ""
          }/products`
        );
        if (data.length) setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
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
    getProducts();
    getCategories();
  }, [setLoading, categoryId, setProducts]);

  const hundleFilter = async () => {
    setLoading(true);
    setSearch("");
    setMaxPrice("50");
    try {
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${search}&price_max=${maxPrice}`
      );
      if (data.length) setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.section
      className="flex-grow py-10 px-10 origin-top min-h-screen bg-white dark:bg-main-dark"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="search"
            className="text-black dark:text-white-muted font-bold"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between  mt-3">
          <div className="flex items-center gap-3">
            <input
              type="range"
              id="range"
              min={50}
              max={50_000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <label
              htmlFor="range"
              className="text-black dark:text-white-muted font-bold"
            >
              {maxPrice}
            </label>
          </div>
          <motion.button
            className="add_to_cart_btn"
            onClick={hundleFilter}
            whileTap={{ scale: 1.2 }}
          >
            Filter
          </motion.button>
        </div>
      </div>
      <div className="flex gap-10 justify-center mt-10 px-12 md:flex-row flex-col">
        {/* categories */}
        {categoriesLoading ? (
          <Loader />
        ) : (
          <ul className="flex md:flex-col flex-row gap-5 md:flex-nowrap flex-wrap md:justify-normal justify-center">
            <li
              className={` md:border-l-2 border-b-2 p-3 font-bold cursor-pointer ${
                categoryId === 0
                  ? "text-primary md:border-l-primary border-b-primary"
                  : "text-black dark:text-white-muted md:border-l-secondry-dark md:dark:border-l-white-muted border-b-secondry-dark dark:border-b-white-muted"
              }`}
              onClick={() => setCategoryId(0)}
            >
              All
            </li>
            {categories?.map((category) => (
              <CategoryOption
                key={category.id}
                category={category}
                setCategoryId={setCategoryId}
                categoryId={categoryId}
              />
            ))}
          </ul>
        )}
        {/* products */}
        {loading ? (
          <Loader />
        ) : (
          <ul className="flex flex-wrap gap-8 justify-center">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
};
