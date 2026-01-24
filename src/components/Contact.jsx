import { motion } from "framer-motion";
import { CONTACT_CONTENT } from "../constants";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
} from "@remixicon/react";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay,
    },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  }),
};

function Contact() {
  const formRef = useRef();
  const [focusedField, setFocusedField] = useState(null);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_oy7gjdg",
        "template_covyt3y",

        formRef.current,
        "akk4OSDMcsSkF9Ge6"
      )
      .then(
        (result) => {
          toast.success("Mail sent to Prajnesh Kumar", {
            toastId: "contact-mail-sent",
          });
          console.log(result.text);
          formRef.current.reset();
        },
        (error) => {
          toast.error("Failed to send mail.", {
            toastId: "contact-mail-failed",
          });
          console.error(error.text);
        }
      );
  };
  return (
    <section
      className="min-h-screen flex flex-col justify-center px-4 md:px-10 py-20 text-white"
      id="contact"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Contact
        </h2>
        <div className="h-1 w-20 mb-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
      </motion.div>

      <motion.h3
        className="text-3xl md:text-5xl leading-tight mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
        custom={0.2}
      >
        {CONTACT_CONTENT.headline}
      </motion.h3>

      <div className="relative flex flex-col lg:flex-row items-start justify-between gap-12 text-white">
        <div className="w-full lg:w-1/2">
          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            custom={0.4}
          >
            {CONTACT_CONTENT.description}
          </motion.p>

          <motion.a
            href={`https://mail.google.com/mail/?view=cm&to=${CONTACT_CONTENT.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xl md:text-2xl font-medium mb-8 text-blue-400 hover:text-blue-300 smooth-transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            custom={0.6}
            whileHover={{ scale: 1.05 }}
          >
            {CONTACT_CONTENT.email}
          </motion.a>

          <div className="flex space-x-6">
            {CONTACT_CONTENT.socialLinks.map((link, index) => {
              const Icon =
                link.icon === "RiWhatsappFill"
                  ? RiWhatsappFill
                  : link.icon === "RiGithubFill"
                  ? RiGithubFill
                  : RiLinkedinBoxFill;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 smooth-transition"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.8 + index * 0.1}
                  variants={iconVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={28} />
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          custom={0.6}
        >
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="relative">
              <motion.input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-white/5 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none smooth-transition"
                style={{
                  borderColor: focusedField === "email" ? "#3b82f6" : "rgba(255, 255, 255, 0.1)"
                }}
                placeholder="Your email"
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="relative">
              <motion.textarea
                id="query"
                name="query"
                className="w-full px-4 py-3 bg-white/5 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none smooth-transition resize-none"
                style={{
                  borderColor: focusedField === "query" ? "#3b82f6" : "rgba(255, 255, 255, 0.1)"
                }}
                placeholder="Your message"
                rows={6}
                required
                onFocus={() => setFocusedField("query")}
                onBlur={() => setFocusedField(null)}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl smooth-transition cursor-pointer"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.a
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl cursor-pointer z-50"
        href="#hero"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.a>
    </section>
  );
}

export default Contact;
