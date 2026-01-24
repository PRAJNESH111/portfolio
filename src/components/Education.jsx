import { motion } from "framer-motion";
import { EDUCATION } from "../constants";

function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="px-6 py-20" id="education">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={titleVariants}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Education
        </h2>
        <div className="h-1 w-20 mb-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {EDUCATION.map((education, index) => (
          <motion.div
            key={index}
            className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 smooth-transition"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 smooth-transition"></div>

            <div className="relative flex flex-col md:flex-row p-6 md:p-8">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold rounded-full">
                  {education.yearRange}
                </span>
              </div>

              <div className="md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-blue-400 smooth-transition">
                  {education.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {education.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Education;
