import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
} from "@remixicon/react";
import { toast } from "react-toastify";
import { CONTACT_CONTENT } from "../constants";
import { useReducedMotionPreference } from "../hooks/useUserPreferences";

const MotionA = motion.a;
const MotionArticle = motion.article;

const iconMap = {
  RiWhatsappFill,
  RiGithubFill,
  RiLinkedinBoxFill,
};

function getRevealMotion(prefersReducedMotion, delay = 0) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

function Contact() {
  const formRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_oy7gjdg",
        "template_covyt3y",
        formRef.current,
        "akk4OSDMcsSkF9Ge6",
      )
      .then(
        () => {
          toast.success("Mail sent to Prajnesh Kumar", {
            toastId: "contact-mail-sent",
          });
          formRef.current?.reset();
        },
        () => {
          toast.error("Failed to send mail.", {
            toastId: "contact-mail-failed",
          });
        },
      );
  };

  return (
    <section id="contact" className="section-space" aria-label="Contact section">
      <div className="section-wrap space-y-8">
        <header className="space-y-4">
          <p className="section-kicker">Connect</p>
          <h2 className="section-title">{CONTACT_CONTENT.headline}</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {CONTACT_CONTENT.description}
          </p>
          <div className="muted-divider" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <MotionArticle
            className="card-shell p-5 sm:p-6"
            {...getRevealMotion(prefersReducedMotion)}
          >
            <h3 className="font-display text-2xl font-semibold text-text">Contact</h3>

            <a
              href={`https://mail.google.com/mail/?view=cm&to=${CONTACT_CONTENT.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-base font-medium text-primary transition-colors duration-200 hover:text-primary-strong sm:text-lg"
            >
              {CONTACT_CONTENT.email}
            </a>

            <div className="mt-6 flex flex-wrap gap-3" aria-label="Social links">
              {CONTACT_CONTENT.socialLinks.map((link, index) => {
                const Icon = iconMap[link.icon] ?? RiLinkedinBoxFill;

                return (
                  <MotionA
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-pill border border-subtle bg-surface text-muted transition-colors duration-200 hover:text-text"
                    {...getRevealMotion(prefersReducedMotion, index * 0.07)}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </MotionA>
                );
              })}
            </div>
          </MotionArticle>

          <MotionArticle
            className="card-shell-strong p-5 sm:p-6"
            {...getRevealMotion(prefersReducedMotion, 0.1)}
          >
            <h3 className="font-display text-2xl font-semibold text-text">Send a message</h3>

            <form ref={formRef} onSubmit={sendEmail} className="mt-5 space-y-4">
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-subtle bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
              </div>

              <div>
                <label htmlFor="contact-query" className="mb-2 block text-sm font-medium text-muted">
                  Query
                </label>
                <textarea
                  id="contact-query"
                  name="query"
                  required
                  rows={4}
                  placeholder="Enter your query"
                  className="w-full rounded-md border border-subtle bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
              </div>

              <button type="submit" className="btn-primary glow-primary">
                Send
              </button>
            </form>
          </MotionArticle>
        </div>

        <div className="flex justify-end">
          <a href="#hero" className="btn-secondary" aria-label="Back to top">
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;

