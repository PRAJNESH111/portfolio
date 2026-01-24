import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { useState } from "react";

function Project() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="px-6 py-20" id="work">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={titleVariants}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Project Works
        </h1>
        <div className="h-1 w-20 mb-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            className="group relative rounded-2xl overflow-hidden h-[450px] cursor-pointer"
            variants={projectVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </motion.div>

            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <motion.div
                initial={{ y: 0 }}
                animate={{
                  y: hoveredIndex === index ? -10 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  {project.name}
                </h2>

                <motion.p
                  className="text-base md:text-lg text-gray-300 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? "auto" : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl smooth-transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
              animate={{
                borderColor: hoveredIndex === index
                  ? "rgba(59, 130, 246, 0.5)"
                  : "transparent"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Project;
