import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants";
import { useReducedMotionPreference } from "../hooks/useUserPreferences";

const MotionLi = motion.li;

function getRevealMotion(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  };
}

function Experience() {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section id="experience" className="section-space" aria-label="Experience section">
      <div className="section-wrap space-y-8">
        <header className="space-y-4">
          <p className="section-kicker">Work</p>
          <h2 className="section-title">Experience</h2>
          <div className="muted-divider" />
        </header>

        <ul className="space-y-4 sm:space-y-5" aria-label="Professional experience timeline">
          {EXPERIENCES.map((experience) => (
            <MotionLi
              key={`${experience.yearRange}-${experience.title}`}
              className="card-shell-strong elevate-hover p-5 sm:p-6"
              {...getRevealMotion(prefersReducedMotion)}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:items-start">
                <p className="text-sm font-semibold tracking-wide text-primary">
                  {experience.yearRange}
                </p>

                <div className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-text sm:text-xl">
                    {experience.title}
                  </h3>
                  <p className="text-sm font-medium italic text-muted">{experience.location}</p>

                  <ul className="space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                    {experience.description.map((point) => (
                      <li key={point} className="list-disc pl-1 marker:text-primary">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Experience;

