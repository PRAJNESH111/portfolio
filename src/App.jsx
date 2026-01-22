import { useEffect, useState } from "react";
import About from "./components/About";
import BlurBackground from "./components/BlurBackground";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";
import Education from "./components/Education";
import Snowfall from "react-snowfall";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Set your mobile breakpoint (e.g., 768px)
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state and add listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
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
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none", // important
        }}
      >
        {/* {!isMobile && <Snowfall />} */}
      </div>
      <BlurBackground />

      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="antialiased overflow-x-hidden max-w-7xl mx-auto relative z-10">
        <Hero isOpen={isOpen} setIsOpen={setIsOpen} />
        <Education />
        <Project />

        <Experience />
        <Contact />
        <footer className="text-center py-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Prajnesh Kumar. All rights reserved
        </footer>
      </main>
    </>
  );
}

export default App;
