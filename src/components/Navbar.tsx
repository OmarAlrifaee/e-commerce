import { NavLink } from "react-router-dom";
import { FaMoon, FaRegMoon, FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import useDarkModeStore from "../stors/dark-mode-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export const Navbar = () => {
  const { darkMode, changeMode } = useDarkModeStore();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.nav
      className="nav_bar px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>logo</div>
      <ul className={`md:flex md:items-center md:h-full hidden`}>
        <li className="h-full">
          <NavLink
            to={"/"}
            className="text-center h-full w-16 flex justify-center items-center transition hover:bg-white-muted hover:dark:bg-secondry-dark"
          >
            Home
          </NavLink>
        </li>
        <li className="h-full">
          <NavLink
            to={"/shop"}
            className="text-center h-full w-16 flex justify-center items-center transition hover:bg-white-muted hover:dark:bg-secondry-dark"
          >
            Shop
          </NavLink>
        </li>
        <li className="h-full">
          <NavLink
            to={"/cart"}
            className="text-center h-full w-16 flex justify-center items-center transition hover:bg-white-muted hover:dark:bg-secondry-dark"
          >
            Cart
          </NavLink>
        </li>
      </ul>
      {/* Small Divices */}
      <AnimatePresence>
        {showMenu && (
          <motion.ul
            className={`absolute right-5 top-16 z-20 bg-white dark:bg-main-dark  border w-32 py-5 px-3 rounded-md md:hidden`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.3,
              ease: "backInOut",
            }}
          >
            <li className="h-full">
              <NavLink
                to={"/"}
                className={
                  "inline-block p-2 w-full transition hover:bg-white-muted hover:dark:bg-secondry-dark rounded-sm mt-2"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="h-full">
              <NavLink
                to={"/shop"}
                className={
                  "inline-block p-2 w-full transition hover:bg-white-muted hover:dark:bg-secondry-dark rounded-sm mt-2"
                }
              >
                Shop
              </NavLink>
            </li>
            <li className="h-full">
              <NavLink
                to={"/cart"}
                className={
                  "inline-block p-2 w-full transition hover:bg-white-muted hover:dark:bg-secondry-dark rounded-sm mt-2"
                }
              >
                Cart
              </NavLink>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2">
        <motion.div
          className="cursor-pointer"
          onClick={changeMode}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {darkMode ? <FaMoon size={30} /> : <FaRegMoon size={30} />}
        </motion.div>
        <motion.div
          className="md:hidden block cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showMenu ? <FaXmark size={30} /> : <FaBars size={30} />}
        </motion.div>
      </div>
    </motion.nav>
  );
};
