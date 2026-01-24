import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LINKS } from "../constants";
import { RiCloseFill, RiMenu3Fill } from "@remixicon/react";

function Navbar({ isOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = LINKS.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        pointerEvents: isOpen ? "none" : "auto",
        opacity: isOpen ? 0.3 : 1,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={`flex justify-between items-center max-w-6xl mx-4 lg:mx-auto my-4 px-6 py-4 rounded-full backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "bg-black/80 shadow-2xl border border-white/10"
            : "bg-stone-950/30"
        }`}
        animate={{
          scale: scrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-white font-semibold text-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/portfolio/" draggable="false">
            <motion.img
              src="./logopraj.png"
              draggable="false"
              className="w-[50px] h-[50px] rounded-full border-2 border-transparent hover:border-blue-500 transition-all duration-300"
              alt="Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
          </a>
        </motion.div>

        <div className="hidden md:flex space-x-2">
          {LINKS.map((link, index) => {
            const section = link.href.substring(1);
            const isActive = activeSection === section;

            return (
              <motion.a
                href={link.href}
                key={index}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="md:hidden">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiCloseFill className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiMenu3Fill className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mx-4 mt-2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {LINKS.map((link, index) => (
              <motion.a
                href={link.href}
                key={index}
                className="block text-white hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-300"
                onClick={handleLinkClick}
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
