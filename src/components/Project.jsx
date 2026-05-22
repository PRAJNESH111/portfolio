import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "../constants";
import { useReducedMotionPreference } from "../hooks/useUserPreferences";
import Magnet from "./Magnet";

const MotionArticle = motion.article;

function getCardMotion(prefersReducedMotion, delay = 0) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 28, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

function Project({ enableInteractiveEffects }) {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section id="work" className="section-space" aria-label="Projects section">
      <div className="section-wrap space-y-8">
        <header className="space-y-4">
          <p className="section-kicker">Builds</p>
          <h2 className="section-title">Project Works</h2>
          <div className="muted-divider" />
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <MotionArticle
              key={project.name}
              className="card-shell-strong group overflow-hidden"
              {...getCardMotion(prefersReducedMotion, index * 0.04)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.name} project preview`}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/65 via-transparent to-transparent" />
              </div>

              <div className="space-y-4 p-5">
                <h3 className="font-display text-xl font-semibold text-text">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>

                <Magnet
                  disabled={!enableInteractiveEffects}
                  wrapperClassName="inline-flex"
                  innerClassName="inline-flex"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary gap-2"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </Magnet>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;

