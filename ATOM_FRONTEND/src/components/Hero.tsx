import React, { useState, useEffect } from "react";
import im1 from "../assets/heroAssets/im1.jpg";
import im3 from "../assets/heroAssets/im3.jpg";
import im4 from "../assets/heroAssets/im4.jpg";
import im5 from "../assets/heroAssets/im5.jpg";
import { motion } from "framer-motion";

import { splitStringUsingRegex } from "../utils/utils";
  const images = [im1, im3, im4, im5];
const Hero: React.FC = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const atomHeader = splitStringUsingRegex("ATOM");

  const slogan = splitStringUsingRegex("THE LIFE STYLE OF BEING EXCEPTIONAL");

  return (
    <>
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          transition: "background-image 1.4s ease", // Smooth transition between images\
       
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, staggerChildren: 0.5 }}
            className="text-6xl md:text-7xl lg:text-9xl text-white"
          >
            {atomHeader.map((char, index) => {
              return (
                <motion.span key={index} className="mb-6 font-light">
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
          <motion.h2
            initial={"hidden"}
            whileInView={"visible"}
            transition={{ duration: 1, staggerChildren: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-8xl 2xl:text-7xl text-white"
          >
            {slogan.map((char) => {
              return (
                <motion.span key={char} 
                variants={charVariants}


                
                className="mb-6 font-light">
                  {char}
                </motion.span>
              );
            })}
          </motion.h2>
        </div>

        <a href="#" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-black rounded-full shadow-lg text-sm sm:text-base">
    view our latest collection
</a>

        
      </div>
    </>
  );
};

export default Hero;
