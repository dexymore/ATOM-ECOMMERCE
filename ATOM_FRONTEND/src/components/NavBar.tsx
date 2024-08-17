import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cartThunks";

const NavBar: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());

    fetchCart();
  }, [dispatch]);
  const [hidden, setHidden] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const { scrollY } = useScroll();

  const [mobileNavBar, setMobileNavBar] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous: number | undefined = scrollY.getPrevious();

    if (previous !== undefined) {
      if (latest > previous && latest > 150) {
        setHidden(true);
        setMobileNavBar(false);
      } else {
        setHidden(false);
        setMobileNavBar(false);
      }

      setBannerVisible(latest <= 150);
    }
  });

  return (
    <>
      {bannerVisible && <Banner />}
      <motion.nav
        className={`w-full fixed ${
          bannerVisible
            ? "hidden"
            : "top-0 border-white  border-b  shadow-lg t bg-slate-50"
        } left-0 right-0 z-[200] `}
        initial={{ y: 0 }}
        animate={{ y: hidden ? "" : 0 }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        style={{
          zIndex: 4,
        }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span
            className={` atom relative z-1 p-[10px]  text-2xl md:text-3xl  bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900  text-center font-sans font-bold hover:to-slate-800 hover:from-red-900 ${
              bannerVisible ? "text-white" : "text-black"
            }`}
          >
            AToM
          </span>

          <div
            className={`${
              bannerVisible ? "text-white" : "text-black"
            } flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}
          >
            <button className="p-2 flex items-center justify-center m-1">
              <div className="dropdown">
                <div className="dropdown-content">
                  {cart.items.map((cartItem) => (
                    <div
                      key={cartItem.itemId._id}
                      className="flex items-center justify-between border border-gray-200 bg-white p-8 m-1 shadow-sm rounded-lg"
                    >
                      <a href="#" className="shrink-0">
                        <img
                          className="h-16 w-16 "
                          src={cartItem.itemId.images[0].url}
                          alt={cartItem.itemId.name}
                        />
                      </a>
                      <div className="flex-1 mx-2">
                        <a
                          href="#"
                          className="text-sm font-medium text-gray-900 hover:underline block truncate"
                          style={{ maxWidth: "120px" }}
                        >
                          {cartItem.itemId.name}
                        </a>
                        <p
                          className="text-xs font-normal text-gray-500 truncate"
                          style={{ maxWidth: "120px" }}
                        >
                          {cartItem.itemId.description}
                        </p>
                      </div>
                      <div className="text-right w-20">
                        <p className="text-sm font-bold text-gray-900">
                          ${cartItem.itemId.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={"/cart"}>
                  <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                </Link>
              </div>
            </button>

            <button className="p-2 flex items-center justify-center m-1">
              <Link
              to={"/profile"}>
              <FontAwesomeIcon icon={faUser} className="text-xl" /></Link>
            </button>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-950 rounded-lg md:hidden "
              aria-controls="navbar-user"
              aria-expanded={mobileNavBar ? "true" : "false"}
              onClick={() => setMobileNavBar(!mobileNavBar)}
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon
                icon={faBars}
                className={`text-xl ${
                  bannerVisible ? "text-white" : "text-black"
                }`}
              />
            </button>
          </div>

          <div
            className={`${
              mobileNavBar ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul
              className={`flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
                bannerVisible ? "text-white" : "text-black"
              }`}
            >
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 rounded md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a href="/items" className="block py-2 px-3  rounded  md:p-0 ">
                  shop
                </a>
              </li>
              <li>
                <a href="/about" className="block py-2 px-3  rounded  md:p-0 ">
                  about
                </a>
              </li>
       
              <li>
                <a href="/contact" className="block py-2 px-3  rounded  md:p-0 ">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default NavBar;
