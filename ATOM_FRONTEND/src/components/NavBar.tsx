import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
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

      // Hide banner when scrolling down
      setBannerVisible(latest <= 150);
    }
  });

  return (
    <>
      {bannerVisible && <Banner />}
      <motion.nav
        className={`w-full fixed ${
          bannerVisible ? "top-[35px] bg-transparent" : "top-0 border-white  border-b  shadow-lg t bg-slate-50"
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
          <span className={`self-center text-2xl font-semibold whitespace-nowrap ${bannerVisible? "text-white":"text-black"}`}>
            ATOM
          </span>
          
         
         
          <div className={`${bannerVisible? "text-white":"text-black"} flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}>
          <button className="p-2 flex items-center justify-center m-1">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </button>
            <button className="p-2 flex items-center justify-center m-1">
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
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
              <FontAwesomeIcon icon={faBars}  className={`text-xl ${bannerVisible? "text-white":"text-black"}`}  />
            </button>

          </div>

          <div
            className={`${
              mobileNavBar ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${bannerVisible? "text-white":"text-black"}` }>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  rounded  md:p-0 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  rounded  md:p-0 ">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  rounded  md:p-0 ">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3  rounded  md:p-0 ">
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
