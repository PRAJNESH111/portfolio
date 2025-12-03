import { motion, scale } from "framer-motion";
import { CONTACT_CONTENT } from "../constants";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

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
      duration: 0.8,
      ease: "easeOut",
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
          alert("Mail sent to Prajnesh Kumar");
          console.log(result.text);
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send Mail.");
          console.error(error.text);
        }
      );
  };
  return (
    <section
      className="min-h-screen flex flex-col justify-center px-4 md:px-10 py-10 text-white"
      id="contact"
    >
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-10">
        {" "}
        Contact
      </h2>
      <div className="h-1 w-20 mb-8 bg-white"></div>
      <motion.h3
        className="text-4xl md:text-6xl leading-none "
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
      >
        {CONTACT_CONTENT.headline}
      </motion.h3>
      <div className="relative flex flex-col md:flex-row items-start justify-center text-white ">
        <div className="w-full md:w-1/2 p-6 md:p-10  lg:p-2 ">
          <motion.p
            className="text-lg md:text-2xl mt-6 max-w-3xl "
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
          >
            {CONTACT_CONTENT.description}
          </motion.p>
          <motion.a
            href={`https://mail.google.com/mail/?view=cm&to=${CONTACT_CONTENT.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl font-medium mt-8"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true }}
          >
            {CONTACT_CONTENT.email}
          </motion.a>
          <div className="flex space-x-6 mt-8 ">
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
                  initial="hidden"
                  whileInView="visible"
                  custom={1.0 + index * 0.2}
                  variants={iconVariants}
                >
                  <Icon size={36}></Icon>
                </motion.a>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10  lg:p-2 ">
          <form ref={formRef} onSubmit={sendEmail}>
            {/* <motion.label
              htmlFor="name"
              className="block text-xl md:text-2xl leading-none text-bold"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
            >
              Name :
            </motion.label>
            <motion.input
              id="name"
              type="text"
              name="name"
              className="mt-2 p-2 w-full md:w-96 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your name"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
            /> */}
            <motion.label
              htmlFor="email"
              className="block text-xl md:text-2xl mt-5"
            >
              Email :
            </motion.label>
            <motion.input
              id="email"
              type="email"
              name="email"
              className="mt-2 p-2 w-full md:w-96 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
            />

            <motion.label
              htmlFor="query"
              className="block text-xl md:text-2xl leading-none mt-10"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
            >
              Query :
            </motion.label>
            <motion.textarea
              id="query"
              name="query"
              className="mt-2 p-2 w-full md:w-96 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your query"
              rows={4}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
            />
            <br />
            <motion.button
              className="bg-stone-50 text-black p-3 lg:p-4 mt-8 inline-block rounded-2xl shadow-animate *:w-full md:w-auto text-center hover:cursor-pointer"
              rel="noopener noreferrer"
              target="_blank"
              variants={textVariants}
              type="submit"
            >
              Send
            </motion.button>
          </form>
        </div>
      </div>
      <div className="flex justify-end items-center mt-8">
        <motion.a
          className="fixed bottom-6 right-6 bg-stone-50 text-black p-3 lg:p-4 rounded-full shadow-animate hover:cursor-pointer z-100"
          rel="noopener noreferrer"
          variants={textVariants}
          type="submit"
          href="#hero"
        >
          ↑
        </motion.a>
      </div>
    </section>
  );
}

export default Contact;
