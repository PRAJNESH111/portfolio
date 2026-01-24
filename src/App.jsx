import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurBackground from "./components/BlurBackground";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";
import Education from "./components/Education";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.h1
                className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Loading Portfolio...
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
        theme="dark"
        style={{
          width: "fit-content",
          maxWidth: "90vw",
          zIndex: 2147483647,
          top: "20px",
        }}
        toastStyle={{
          minHeight: "unset",
          padding: "8px 12px",
          fontSize: "0.875rem",
          borderRadius: "10px",
        }}
      />

      <BlurBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="antialiased overflow-x-hidden max-w-7xl mx-auto relative z-10">
          <Hero isOpen={isOpen} setIsOpen={setIsOpen} />
          <Education />
          <Project />
          <Experience />
          <Contact />
          <footer className="text-center py-8 text-sm text-gray-400 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Prajnesh Kumar. All rights reserved</p>
          </footer>
        </main>
      </motion.div>
    </>
  );
}

export default App;
