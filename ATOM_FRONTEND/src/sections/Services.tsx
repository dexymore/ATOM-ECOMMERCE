import React from "react";
// import classes from "./sections.module.css"; // Import CSS module
// import NewsTeller from "./NewsTeller";
// import Lottie from "lottie-react";
// import animationData from '../assets/atom.json'
import { annotate } from "rough-notation";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHeadset, faTag,faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
const Services: React.FC = () => {
  // Add your component logic here

  useEffect(() => {
    const orderNums: HTMLElement | null = document.querySelector("#orderNums");
    const orderYears: HTMLElement | null =
      document.querySelector("#orderYears3");

    if (orderNums && orderYears) {
      const annotation1 = annotate(orderNums, { type: "underline" });
      const annotation2 = annotate(orderYears, { type: "highlight" });

      annotation1.show();
      annotation2.show();
    }
  }, []);
  return (
    <section className="mt-1 w-full overflow-hidden mb ">
      <div className="flex flex-col md:flex-row w-full px-8 py-20 ">
        {/* Text Section */}
        <div className="w-full md:w-1/2 px-8 mb-8 md:mb-0 flex items-center">
          <div className="w-full">
            <div className="mb-4">
              <h2 className="md:text-4xl text-3xl font-bold leading-[4rem]">
                We have sold over{" "}
                <span className="text-red-800 leading-[4rem]" id="orderNums">
                  +20000
                </span>{" "}
                orders for more than{" "}
                <span
                  className="text-yellow-400 leading-[4rem]"
                  id="orderYears3"
                >
                  +3 years
                </span>
              </h2>
            </div>
            <div>
              <p className="text-gray-500 md:text-2xl">
                At the heart of our success lies Atom, our beacon of innovation.
                Atom isn't just a platform; it's a symphony of efficiency and
                ingenuity. It streamlines processes, empowers users, and
                cultivates a seamless shopping experience. We continue to
                innovate and push boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full md:w-1/2 px-10 py-6 service-border service-cards-bg">
          <div className="grid md:grid-cols-2 gap-8  grid-cols-1">
            <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-gray-700 text-4xl mb-4"
                />
              </div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Globally recognized
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Reach AToM products wherever you are
              </p>
            </div>

            <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faTag}
                  className="text-gray-700 text-4xl mb-4"
                />
              </div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Hot Offers
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Discover new offers every season.
              </p>
            </div>

            <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="text-gray-700 text-4xl mb-4"
                />
              </div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Our Customer Support
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                We're here to help you 24/7 with any questions or issues.
              </p>
            </div>

            <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faArrowRightArrowLeft}
                  className="text-gray-700 text-4xl mb-4"
                />
              </div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                simple Return Policy
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Enjoy hassle-free returns with our flexible policy designed for
                your convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
