import { motion } from "framer-motion";
import { EDUCATION } from "../constants";
import { useReducedMotionPreference } from "../hooks/useUserPreferences";

const MotionLi = motion.li;

function getStaggerMotion(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };
}

function Education() {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section id="education" className="section-space" aria-label="Education section">
      <div className="section-wrap space-y-8">
        <header className="space-y-4">
          <p className="section-kicker">Learning Path</p>
          <h2 className="section-title">Education</h2>
          <div className="muted-divider" />
        </header>

        <ul className="space-y-4 sm:space-y-5" aria-label="Education timeline">
          {EDUCATION.map((item) => (
            <MotionLi
              key={`${item.yearRange}-${item.title}`}
              className="card-shell-strong elevate-hover p-5 sm:p-6"
              {...getStaggerMotion(prefersReducedMotion)}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:items-start">
                <p className="text-sm font-semibold tracking-wide text-primary">{item.yearRange}</p>

                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-text sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{item.location}</p>
                </div>
              </div>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Education;

