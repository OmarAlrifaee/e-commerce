import { motion } from "framer-motion";
import { Category } from "../Types";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  category: Category;
};
export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div
      className="bg-white border dark:border-white-muted dark:bg-secondry-dark rounded-md overflow-hidden min-h-[300px] max-w-[300px] capitalize"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[300px] relative min-h-[300px]">
        <img
          src={category.image}
          alt={category.name}
          className="min-h-full w-full object-cover"
        />
        <h3 className="absolute z-20 top-5 left-5 capitalize text-white text-3xl font-bold">
          {category.name}
        </h3>
        <Link
          to={"/shop"}
          state={{ category: category.id }}
          className="absolute z-20 bottom-5 left-5 font-bold bg-white px-4 py-2 rounded-md"
        >
          Show Store
        </Link>
      </div>
    </motion.div>
  );
};
