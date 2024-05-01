import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
export const RootLayout = () => {
  return (
    <section className="flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};
