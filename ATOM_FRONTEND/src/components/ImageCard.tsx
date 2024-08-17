import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./components.module.css";
import { Link } from "react-router-dom";
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function ImageCard({ image, title ,desc,video }: {video:string, image: string; title?: string ,desc?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    return (
        <motion.div
        initial={false}
        className={`relative bg-center bg-cover h-[40rem] mt-1 mb-1 ml-[.15rem] w-[99.5%] rounded-xl overflow-hidden ${classes.collectionImageContianer}`}
    >
        <video 
            src={video}
            autoPlay
            loop
            muted
            onLoad={() => setIsLoaded(true)} 
            className="object-cover w-[1450px] h-[800px]"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 h-[100%] bg-black bg-opacity-50 flex flex-col items-center">
            {title && (
               <Link
               to={`/items/${title}`}
               className={`atom mb-2 px-4 py-2 md:mt-[35%] mt-[110%] bg-transparent border border-white text-white rounded ${classes.collectionImageTitle} hover:border-transparent hover:border-gray-200 hover:text-gray-400`}
           >
               {title}
           </Link>
           
            )}
            {desc && (
                <h3 className={`text-sm sm:text-base text-neutral-400 ${classes.collectionImageTitle}`}>
                    {desc}
                </h3>
            )}
        </div>
    </motion.div>
    );
}
