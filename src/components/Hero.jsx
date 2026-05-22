import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HERO_CONTENT } from "../constants";
import { useReducedMotionPreference } from "../hooks/useUserPreferences";
import About from "./About";
import Magnet from "./Magnet";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

function getRevealMotion(prefersReducedMotion, delay = 0) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

function Hero({ enableInteractiveEffects, isOpen, setIsOpen }) {
  const prefersReducedMotion = useReducedMotionPreference();
  const profileImage = `${import.meta.env.BASE_URL}PrajneshProfilePic.jpg`;

  return (
    <section id="hero" className="section-space" aria-label="Hero section">
      <div className="section-wrap grid items-center gap-10 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="space-y-8">
          <MotionP
            className="section-kicker"
            {...getRevealMotion(prefersReducedMotion)}
          >
            {prefersReducedMotion ? (
              HERO_CONTENT.greeting
            ) : (
              <TypeAnimation
                sequence={[HERO_CONTENT.greeting, 1700, HERO_CONTENT.greeting]}
                speed={58}
                repeat={Infinity}
                wrapper="span"
              />
            )}
          </MotionP>

          <MotionH1
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            {...getRevealMotion(prefersReducedMotion, 0.1)}
          >
            {HERO_CONTENT.introduction.before}
            <span className="block text-primary">{HERO_CONTENT.introduction.name}</span>
          </MotionH1>

          <MotionP
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            {...getRevealMotion(prefersReducedMotion, 0.2)}
          >
            {HERO_CONTENT.introduction.after}
          </MotionP>

          <MotionP
            className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
            {...getRevealMotion(prefersReducedMotion, 0.25)}
          >
            {HERO_CONTENT.description}
          </MotionP>

          <MotionDiv
            className="flex flex-wrap items-center gap-3"
            {...getRevealMotion(prefersReducedMotion, 0.3)}
          >
            <Magnet
              disabled={!enableInteractiveEffects}
              wrapperClassName="inline-flex"
              innerClassName="inline-flex"
            >
              <a
                className="btn-primary glow-primary"
                href={HERO_CONTENT.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HERO_CONTENT.resumeLinkText}
              </a>
            </Magnet>

            <About
              enableInteractiveEffects={enableInteractiveEffects}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </MotionDiv>
        </div>

        <MotionDiv
          className="card-shell-strong elevate-hover overflow-hidden p-3 sm:p-4"
          {...getRevealMotion(prefersReducedMotion, 0.2)}
        >
          <img
            src={profileImage}
            alt="Prajnesh Kumar portrait"
            className="h-full max-h-[34rem] w-full rounded-lg object-cover"
            draggable="false"
          />
        </MotionDiv>
      </div>
    </section>
  );
}

export default Hero;

