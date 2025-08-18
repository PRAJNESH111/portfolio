import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import { TypeAnimation } from "react-type-animation";
import About from "./About";

const textVariants = {
  hidden: { opacity: 1, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const contsinerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const imageVariants = {
  hidden: { clipPath: "inset(50% 0 50% 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

function Hero({ isOpen, setIsOpen }) {
  return (
    <section id="hero">
      <div className="relative z-10 min-h-screen  flex flex-wrap flex-col md:flex-row items-center justify-center mt-10 text-white ">
        <motion.div
          className="w-full md:w-1/2 p-9 "
          initial="hidden"
          variants={contsinerVariants}
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-3xl lg:text-5xl my-14 "
            variants={textVariants}
          >
            <TypeAnimation
              sequence={["Hey there! 🖐️", 1000, "", 1000]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: "40px",
                display: "inline-block",
                color: "white",
                fontWeight: "bold",
              }}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl "
            variants={textVariants}
          >
            {HERO_CONTENT.introduction.before}
            <span className="text-stone-550 font-bold text-4xl md:text-5xl lg:text-6xl ">
              {HERO_CONTENT.introduction.name}
            </span>
            <br />
            <br />
            {HERO_CONTENT.introduction.after}
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl lg:text-4xl "
            variants={textVariants}
          >
            {HERO_CONTENT.description}
          </motion.p>
          <div className="flex  justify-start items-center md:items-start mt-8 gap-4 ">
            <motion.a
              className="bg-stone-50 text-black p-3 lg:p-4 mt-8 inline-block rounded-2xl shadow-animate"
              href={HERO_CONTENT.resumeLink}
              download={HERO_CONTENT.resumeLink}
              rel="noopener noreferrer"
              target="_blank"
              variants={textVariants}
            >
              {HERO_CONTENT.resumeLinkText}
            </motion.a>
            <motion.a
              className="bg-stone-50 text-black  inline-block rounded-2xl  p-3 lg:p-4 mt-8 shadow-animate"
              href="#about"
              rel="noopener noreferrer"
              variants={textVariants}
            >
              <About isOpen={isOpen} setIsOpen={setIsOpen} />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 p-8 shadow-animate"
          initial="hidden"
          variants={imageVariants}
          animate="visible"
        >
          <img
            src="./logopraj.png"
            alt="Hero Image"
            className="rounded-3xl shadow-animate"
            draggable="false"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
