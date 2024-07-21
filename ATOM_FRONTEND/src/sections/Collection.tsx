import React from "react";
import ImageCard from "../components/ImageCard";
import image1 from "../assets/collectionAssets/1.jpg"; // Rename the imported variable
import image2 from "../assets/collectionAssets/2.jpg"; // Rename the imported variable
import image3 from "../assets/collectionAssets/3.jpg"; // Rename the imported variable

const Collection: React.FC = () => {
  // Implement your component logic here

  return (
    <section className="flex flex-col items-center justify-center my-8 ">
      <div className="mx-auto text-center mb-20">
        <span className="block mb-2 text-lg md:text-xl lg:text-2xl xl:text-3xl text-indigo-300">
          Collection
        </span>
        <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800">
          Our Recent arrivals
        </h2>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-400">
          There are many ways to express yourself one of them is using ATOM
          recent collection
        </p>
      </div>
      <div className=" flex flex-col items-center justify-center w-full md:flex-row md:justify-center md:space-x-2">
        {/* Display images in a column on phones */}
        <div className="w-[]">
        <ImageCard
          image={image1}
          title={"for her"}
          desc={"unique set that express your Dynamism"}
        /></div>
        <div>
        <ImageCard
          image={image2}
          title={"for both"}
          desc={"prefectly blanced set that suitable for everyone"}
        />
        </div>
        <div>
        <ImageCard
          image={image3}
          title={"for him"}
          desc={"diferent types of sets for asserting dominance"}
        />
        </div>
      </div>
    </section>
  );
};

export default Collection;
