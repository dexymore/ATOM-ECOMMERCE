import React from "react";
import ImageCard from "../components/ImageCard";
import image1 from "../assets/collectionAssets/1.jpg";
import image2 from "../assets/collectionAssets/2.jpg";
import image3 from "../assets/collectionAssets/3.jpg";
import man from "../assets/collectionAssets/man.mp4";
import woman from "../assets/collectionAssets/woman.mp4";
import unisex from "../assets/collectionAssets/unisex.mp4";
import { annotate } from 'rough-notation';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import MovingBanner from "../components/MovingBanner";
const Collection: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const atom: HTMLElement | null = document.querySelector('#atom');
    if (atom) {
      const annotation1 = annotate(atom, { type: 'underline' });
      annotation1.show();
    }
  },[]);

  return (
    <section className="flex flex-col items-center justify-center my-8 ">
      <div className="mx-auto text-center mb-20">

        <h2 className="mb-4 atom text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800">
          our Recent arrivals
        </h2>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-400">
          There are many ways to express yourself one of them is using ATOM
          recent collection
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:justify-center">
        {/* Display images in a column on phones */}
        <div className="mb-4">
          <ImageCard
            image={image1}
            title={"Female"}
            desc={"unique set that express your Dynamism"}
            video={woman}
          />
        </div>
        <div 
  className="flex md:w-[94.5%] w-[97%] mt-4 mb-8 rounded-md border-4 p-5 justify-center"
  style={{
    borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
    borderRadius: '0.375rem', // Matches Tailwind's rounded-md
  }}
>
  <div className="flex md:flex-row flex-col items-center justify-center w-full">
    <p className="text-2xl font-bold leading-[3rem] w-[90%] md:w-[60%] text-slate-800 mb-4 text-center md:text-left">
      <span id="atom" className="atom relative z-1   text-2xl md:text-2xl  bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900  text-center font-sans font-bold hover:to-slate-800 hover:from-red-900">AToM</span> empowers you to express yourself in a unique way, with our
      recent collection you can be sure to find the perfect set that suits your style, no matter your preferences we have you covered.
    </p>
    <div className="md:ml-16 mt-4 md:mt-0 md:self-center md:w-[20%] w-[90%] flex items-center p-5 justify-center">
      <button
      onClick={() => navigate('/items')}
      className="atom bg-slate-900 text-white py-2 w-full rounded-full hover:bg-black">
        Shop Now
      </button>
    </div>
  </div>
</div>



        <div className="mb-4">
          <ImageCard
            image={image2}
            title={"Unisex"}
            desc={"perfectly balanced set that’s suitable for everyone"}
            video={unisex}
          />
        </div>

        <MovingBanner></MovingBanner>
        <div>
          <ImageCard
            image={image3}
            title={"Male"}
            desc={"different types of sets for asserting dominance"}
            video={man}
          />
        </div>
      </div>
    </section>
  );
};

export default Collection;
