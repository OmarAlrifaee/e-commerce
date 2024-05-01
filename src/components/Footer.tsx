import { FaSquareGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
export const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>@ Copy Right For Omar Alrifai</p>
      <a href="https://github.com/OmarAlrifaee" target="_blank">
        <FaSquareGithub size={50} />
      </a>
    </motion.footer>
  );
};
