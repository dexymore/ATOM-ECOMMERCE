import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./components.module.css";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function ImageCard({ image, title ,desc }: { image: string; title?: string ,desc?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    return (
        <section className="">
            <motion.div
                initial={false}
                animate={
                    isLoaded && isInView
                        ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                        : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                }
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                onViewportEnter={() => setIsInView(true)}
                className={`relative bg-center bg-cover h-[40rem] w-[28rem] rounded-xl overflow-hidden ${classes.collectionImageContianer}`} // Apply collectionImageContianer class here
            >
                <img src={image} alt="" onLoad={() => setIsLoaded(true)} className="  object-cover" /> 
                {/* Maintain aspect ratio using object-cover */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {title && (
                    <h3 className={`absolute inset-0 flex items-center justify-center text-white ${classes.collectionImageTitle}`}>{title}</h3>
                )}

            {desc && (
                    <h3 className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 flex items-center  text-sm sm:text-base text-neutral-400 ${classes.collectionImageTitle}`}>{desc}</h3>
                )}
            </motion.div>
        </section>
    );
}
