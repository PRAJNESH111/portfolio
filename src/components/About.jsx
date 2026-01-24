// import { motion } from "framer-motion";
// import { ABOUT_CONTENT } from "../constants";

// function About() {
//   const textVariant = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };
//   return (
//     <section className="px-6 py-10" id="about">
//       <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-10">
//         About Me
//       </h1>
//       <div className="h-1 w-20 mb-8 bg-white"></div>
//       <div className="max-w-4xl mx-auto">
//         {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
//           <motion.p
//             key={index}
//             className="text-xl md:text-2xl lg:text=4xl mb-10 leading-relaxed"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//             variants={textVariant}
//           >
//             {paragraph}
//           </motion.p>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default About;

import { useEffect } from "react";
import Mongo from "/mongo.svg";
import Express from "/icons8-express-js-480.svg";
import ReactLogo from "/react.svg";
import Node from "/node.svg";
import { X } from "lucide-react";
import { ABOUT_CONTENT } from "../constants";

export default function About({ isOpen, setIsOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl smooth-transition cursor-pointer hover:scale-105 active:scale-95"
      >
        About Me →
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className="popup-box relative bg-gradient-to-r from-[#b04489] to-[#0f0f10] text-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto z-10 shadow-animate"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition-transform duration-300 hover:rotate-180 hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="Close about popup"
            >
              <X size={26} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">ABOUT ME</h2>
                <p className="mb-6">{ABOUT_CONTENT.paragraphs}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {ABOUT_CONTENT.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-black/40 border border-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">MERN STACK</h3>

                <div className="flex items-center gap-6">
                  <img src={Mongo} alt="MongoDB" className="h-12 w-12" />
                  <img
                    src={Express}
                    alt="Express"
                    className="h-12 w-12 "
                    style={{ fill: "white" }}
                  />
                  <img src={ReactLogo} alt="React" className="h-12 w-12" />
                  <img src={Node} alt="Node.js" className="h-12 w-12" />
                </div>

                <div className="flex items-center gap-6 ml-4 mt-3 hidden sm:flex">
                  <h1 className="h-12 w-12 text-green-600">M</h1>
                  <h1 className="h-12 w-12 text-white">E</h1>
                  <h1 className="h-12 w-12 text-blue-300">R</h1>
                  <h1 className="h-12 w-12 text-green-600">N</h1>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src="./coder.svg"
                  alt="coding illustration"
                  className="max-w-full h-auto select-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
