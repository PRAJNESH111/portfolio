import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ABOUT_CONTENT } from "../constants";
import Magnet from "./Magnet";

const stackIcons = [
  { alt: "MongoDB", file: "mongo.svg" },
  { alt: "Express", file: "icons8-express-js-480.svg" },
  { alt: "React", file: "react.svg" },
  { alt: "Node.js", file: "node.svg" },
];

function About({ enableInteractiveEffects, isOpen, setIsOpen }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <Magnet
        disabled={!enableInteractiveEffects}
        wrapperClassName="inline-flex"
        innerClassName="inline-flex"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-secondary"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          About Me
        </button>
      </Magnet>

      {isOpen
        ? createPortal(
            <div className="fixed inset-0 z-[80] bg-canvas/80 backdrop-blur-sm">
              <div
                className="absolute inset-0"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              <div className="section-wrap relative flex min-h-screen items-center py-8 sm:py-12">
                <section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="about-title"
                  className="card-shell-strong relative w-full max-h-[88vh] overflow-y-auto p-5 sm:p-8"
                >
                  <button
                    type="button"
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-pill border border-subtle bg-surface text-muted transition-colors duration-200 hover:text-text"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close About dialog"
                  >
                    <X size={20} />
                  </button>

                  <div className="space-y-8 pr-9 sm:pr-12">
                    <header className="space-y-3">
                      <p className="section-kicker">Profile</p>
                      <h2 id="about-title" className="section-title">
                        About Me
                      </h2>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                      <div className="space-y-4">
                        {ABOUT_CONTENT.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm leading-relaxed text-muted sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}

                        <div className="flex flex-wrap gap-2 pt-2" aria-label="Skills list">
                          {ABOUT_CONTENT.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-pill border border-subtle bg-soft px-3 py-1 text-xs font-medium text-muted"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="card-shell space-y-5 p-4 sm:p-5">
                        <h3 className="font-display text-xl font-semibold text-text">MERN Stack</h3>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                          {stackIcons.map((icon) => (
                            <div
                              key={icon.alt}
                              className="flex items-center gap-2 rounded-md border border-subtle bg-surface-elevated px-3 py-2"
                            >
                              <img
                                src={`${import.meta.env.BASE_URL}${icon.file}`}
                                alt={icon.alt}
                                className="h-7 w-7 object-contain"
                                draggable="false"
                              />
                              <span className="text-xs font-medium text-muted">{icon.alt}</span>
                            </div>
                          ))}
                        </div>

                        <img
                          src={`${import.meta.env.BASE_URL}coder.svg`}
                          alt="Coding illustration"
                          className="mx-auto max-h-48 w-full object-contain"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

export default About;
