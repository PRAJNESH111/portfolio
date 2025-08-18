import { motion, stagger } from "framer-motion";
import { EXPERIENCES } from "../constants";

function Experience() {
  const contsinerVarients = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };
  const childVarients = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section className="px-6 py-10" id="experience">
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-10">
        Experience
      </h2>
      <div className="h-1 w-20 mb-8 bg-white"></div>
      <motion.div
        className="space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contsinerVarients}
      >
        {EXPERIENCES.map((experience, index) => (
          <motion.div
            key={index}
            className="bg-stone-950/30 backdrop-blur-lg p-6 rounded-xl shadow-lg"
            variants={childVarients}
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="text-sm md:w-1/4 mb-2 md:mb-0 p-4">
                {experience.yearRange}
              </div>
              <div className="md:w-3/4 mb-10 ">
                <div className="max-w-3xl backdrop-blur-3xl p-4 bg-stone-600/10 rounded-lg ">
                  <h2 className="text-xl md-2 ">{experience.title}</h2>
                  <p className="mb-4 text-sm italic ">{experience.location}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {experience.description.map((desc, index) => (
                      <li key={index} className="text-sm">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Experience;
