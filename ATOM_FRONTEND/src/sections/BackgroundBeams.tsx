import React from "react";
import { BackgroundBeams } from "../components/Beams";
 
export function BackgroundBeamsDemo() {
  return (
    <div className=" h-[100%]  w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto ">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          ATOM
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
         An extraordinary collection of the most unique and beautiful sets.
        </p>
       
      </div>
      <BackgroundBeams />
    </div>
  );
}