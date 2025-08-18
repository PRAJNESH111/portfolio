import { useState } from "react";
import About from "./components/About";
import BlurBackground from "./components/BlurBackground";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";
import Education from "./components/Education";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
