import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TargetCursor from "../public/TargetCursor";
import BlurBackground from "./components/BlurBackground";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";
import {
  useReducedMotionPreference,
  useVisualEffectsEnabled,
} from "./hooks/useUserPreferences";

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const enableInteractiveEffects = useVisualEffectsEnabled();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <div className="app-shell">
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
        />

        <BlurBackground enabled={!prefersReducedMotion} />

        {enableInteractiveEffects ? <TargetCursor /> : null}

        <Navbar
          isAboutOpen={isAboutOpen}
          enableInteractiveEffects={enableInteractiveEffects}
        />

        <main className="relative z-10" aria-label="Portfolio content">
          <Hero
            isOpen={isAboutOpen}
            setIsOpen={setIsAboutOpen}
            enableInteractiveEffects={enableInteractiveEffects}
          />
          <Education />
          <Project enableInteractiveEffects={enableInteractiveEffects} />
          <Experience />
          <Contact />
        </main>

        <footer className="section-wrap pb-10 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Prajnesh Kumar. All rights reserved.</p>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
