import React from "react";
import classes from "./sections.module.css"; // Import CSS module
import NewsTeller from "./NewsTeller";
import Lottie from "lottie-react";
import animationData from '../assets/atom.json'
import { annotate } from 'rough-notation';

import { useEffect } from 'react';
const Services: React.FC = () => {
  // Add your component logic here

useEffect(() => {
  const orderNums: HTMLElement | null = document.querySelector('#orderNums');
  const orderYears: HTMLElement | null = document.querySelector('#orderYears');
  if (orderNums&&orderYears) {
    const annotation1 = annotate(orderNums, { type: 'underline' });
    const annotation2 = annotate(orderYears, { type: 'highlight' });
    annotation1.show();
    annotation2.show(); 
  }
  
},[]);
return (
<section className="mt-1 w-full overflow-hidden mb">
  <div className="flex flex-col md:flex-row w-full px-8 py-20">
    {/* Text Section */}
    <div className="w-full md:w-1/2 px-8 mb-8 md:mb-0 flex items-center">
      <div className="w-full">
        <div className="mb-4">
          <h2 className="md:text-4xl text-3xl font-bold leading-[3rem]">
            We have sold over <span className="text-red-800" id="orderNums">+20000</span>{" "}
            orders for more than <span className="text-yellow-500" id="orderYears">3 years</span>
          </h2>
        </div>
        <div>
          <p className="text-gray-500 md:text-2xl">
            At the heart of our success lies Atom, our beacon of innovation.
            Atom isn't just a platform; it's a symphony of efficiency and
            ingenuity. It streamlines processes, empowers users, and cultivates
            a seamless shopping experience. We continue to innovate and push boundaries.
          </p>
        </div>
      </div>
    </div>

    {/* Cards Section */}
    <div className="w-full md:w-1/2 px-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </div>
        <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </div>
        <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </div>
        <div className="max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </div>
      </div>
    </div>
  </div>
</section>

);
};

export default Services;
