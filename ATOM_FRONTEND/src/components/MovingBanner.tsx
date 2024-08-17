import React, { useEffect } from "react";
import nike from "../assets/movingBanner/icons8-nike-150.png";
import adidas from "../assets/movingBanner/icons8-adidas-trefoil-150.png";
import gucci from "../assets/movingBanner/icons8-gucci-150.png";
import hm from "../assets/movingBanner/icons8-hm-150.png";
import zara from "../assets/movingBanner/zara.png";
import rolex from "../assets/movingBanner/rolex.png";
import vans from "../assets/movingBanner/vans.png";
import puma from "../assets/movingBanner/puma.png";
import { annotate } from "rough-notation";

const MovingBanner: React.FC = () => {
  const brands = [nike, adidas, gucci, hm, zara, rolex, vans, puma];

  useEffect(() => {
    const atomBanner: HTMLElement | null = document.querySelector("#atomBanner");
    if (atomBanner) {
      const annotation1 = annotate(atomBanner, { type: "underline" });
      annotation1.show();
    }
  }, []);

  return (
    <div className="md:w-[94.5%] w-[97%] mt-4 mb-8 rounded-md border-4 p-5 justify-center">
      <div className="flex flex-col justify-center items-center md:h-22 ">
        <h2 className="text-2xl font-bold leading-[3rem] text-slate-800 text-center">
          All your favorite brands in one place
        </h2>
        <h1
          id="atomBanner"
          className="text-center mt-2 mb-3 text-red-800 atom self-center text-4xl font-semibold whitespace-nowrap atom relative z-1 pt-[10px] bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900 font-sans hover:to-slate-800 hover:from-red-900"
        >
          AToM
        </h1>
      </div>

      <div
        className="w-full overflow-hidden relative"
        style={{
          borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
          borderRadius: "0.375rem",
        }}
      >
        <div className="flex items-center">
          <ul className="flex whitespace-nowrap animate-infinite-scroll inner-shadow">
            {/* List of images for popular clothing brands */}
            {brands.concat(brands).map((src, index) => (
              <li key={index} className="mx-8 w-24 h-auto">
                <img
                  src={src}
                  alt={`Brand ${index}`}
                  className="w-full h-auto"
                />
              </li>
            ))}
            {/* Duplicate the brand list */}
            {brands.concat(brands).map((src, index) => (
              <li key={index + brands.length} className="mx-8 w-24 h-auto">
                <img
                  src={src}
                  alt={`Brand duplicate ${index}`}
                  className="w-full h-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovingBanner;
