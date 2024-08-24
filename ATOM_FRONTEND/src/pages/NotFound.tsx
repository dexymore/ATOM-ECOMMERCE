import { motion } from "framer-motion";

export function NotFound() {
    return (
        <section className="flex items-center justify-center w-full h-[800px] service-cards-bg">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center flex flex-col items-center"
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, staggerChildren: 0.5 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-white"
                >
                    <motion.span
                        className="atom relative z-1 px-[20px] sm:px-[40px] md:px-[60px] text-5xl sm:text-6xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900 text-center font-sans font-bold"
                    >
                        AToM
                    </motion.span>
                </motion.h1>
                <div className="flex bg-stone-100 items-center space-x-2 mt-4">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-3xl sm:text-4xl md:text-6xl"
                    >
                        404
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mx-1 sm:mx-2 text-3xl sm:text-4xl md:text-6xl"
                    >
                        |
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="text-2xl sm:text-3xl md:text-5xl"
                    >
                        Page Not Found
                    </motion.span>
                </div>
            </motion.div>
        </section>
    );
}
