import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import About from "./About";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay
    }
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

function Hero({ isOpen, setIsOpen }) {
  return (
    <section id="hero">
      <div className="relative z-10 min-h-screen flex flex-wrap flex-col md:flex-row items-center justify-center mt-10 text-white">
        <motion.div
          className="w-full md:w-1/2 p-9"
          initial="hidden"
          variants={containerVariants}
          animate="visible"
        >
          <motion.div
            variants={textVariants}
            custom={0}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-blue-400 font-light">
              Hello, I'm
            </h2>
          </motion.div>

          <motion.div
            variants={textVariants}
            custom={0.2}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 text-transparent bg-clip-text gradient-animate">
              {HERO_CONTENT.introduction.name}
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-300"
            variants={textVariants}
            custom={0.4}
          >
            {HERO_CONTENT.introduction.after}
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-400"
            variants={textVariants}
            custom={0.6}
          >
            {HERO_CONTENT.description}
          </motion.p>

          <div className="flex justify-start items-center gap-4 flex-wrap">
            <motion.a
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl smooth-transition cursor-pointer"
              href={HERO_CONTENT.resumeLink}
              download={HERO_CONTENT.resumeLink}
              rel="noopener noreferrer"
              target="_blank"
              variants={buttonVariants}
              custom={0.8}
              whileHover="hover"
              whileTap="tap"
            >
              {HERO_CONTENT.resumeLinkText}
            </motion.a>

            <motion.div
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              <About isOpen={isOpen} setIsOpen={setIsOpen} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-8 2xl:p-16 flex justify-center items-center"
          initial="hidden"
          variants={imageVariants}
          animate="visible"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-3xl blur-2xl opacity-30"></div>
            <img
              src="./PrajneshProfilePic.jpg"
              alt="Hero Image"
              className="relative rounded-3xl shadow-2xl xl:h-96 2xl:h-[35rem] mx-auto object-cover border-4 border-white/10 float-animation"
              draggable="false"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
