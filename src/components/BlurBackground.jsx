// import { motion, scale } from "framer-motion";

// const circleVariants = {
//   animatel: {
//     scale: [1, 1.2, 1],
//     x: [0, 100, 0],
//     y: [0, 50, 0],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeOut",
//     },
//   },
//   animate2: {
//     scale: [1, 1.1, 1],
//     x: [0, 120, 0],
//     y: [0, -60, 0],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
//   animate3: {
//     scale: [1, 1.3, 1],
//     x: [0, 140, 0],
//     y: [0, 70, 0],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
//   animate4: {
//     scale: [1, 1.4, 1],
//     x: [0, 160, 0],
//     y: [0, -80, 0],
//     transition: {
//       duration: 4,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
//   animate5: {
//     scale: [1, 1.5, 1],
//     x: [0, 180, 0],
//     y: [0, 90, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
//   animate6: {
//     scale: [1, 1.6, 1],
//     x: [0, 200, 0],
//     y: [0, -100, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// function BlurBackground() {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none flex justify-center items-center filter blur-[100px] opacity-70">
//       <motion.div
//         className="bg-yellow-500 w-[350px] h-[250px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animatel"
//       ></motion.div>
//       <motion.div
//         className="bg-orange-500 w-[370px] h-[270px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animate2"
//       ></motion.div>
//       <motion.div
//         className="bg-green-500 w-[360px] h-[260px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animate3"
//       ></motion.div>
//       <motion.div
//         className="bg-purple-500 w-[380px] h-[280px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animate4"
//       ></motion.div>
//       <motion.div
//         className="bg-blue-500 w-[390px] h-[290px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animate5"
//       ></motion.div>
//       <motion.div
//         className="bg-pink-500 w-[400px] h-[300px] rounded-full absolute"
//         variants={circleVariants}
//         animate="animate6"
//       ></motion.div>
//     </div>
//   );
// }

// export default BlurBackground;

// import React, { useEffect, useRef } from "react";

// export default function BlurBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     let w = (canvas.width = window.innerWidth);
//     let h = (canvas.height = window.innerHeight);

//     const NUM_CONFETTI = 350;
//     const COLORS = [
//       [85, 71, 106],
//       [174, 61, 99],
//       [219, 56, 83],
//       [244, 92, 68],
//       [248, 182, 70],
//     ];

//     const PI_2 = 2 * Math.PI;

//     const resizeWindow = () => {
//       w = canvas.width = window.innerWidth;
//       h = canvas.height = window.innerHeight;
//     };

//     window.addEventListener("resize", resizeWindow);

//     function range(a, b) {
//       return (b - a) * Math.random() + a;
//     }

//     function drawCircle(x, y, r, style) {
//       context.beginPath();
//       context.arc(x, y, r, 0, PI_2);
//       context.fillStyle = style;
//       context.fill();
//     }

//     let xpos = 0.5;
//     document.onmousemove = (e) => (xpos = e.pageX / w);

//     class Confetti {
//       constructor() {
//         this.replace();
//       }

//       replace() {
//         this.style = COLORS[~~range(0, COLORS.length)];
//         this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
//         this.r = ~~range(2, 6);
//         this.r2 = 2 * this.r;
//         this.opacity = 0;
//         this.dop = 0.03 * range(1, 4);
//         this.x = range(-this.r2, w - this.r2);
//         this.y = range(-20, h - this.r2);
//         this.xmax = w - this.r;
//         this.ymax = h - this.r;
//         this.vx = range(0, 2) + 8 * xpos - 5;
//         this.vy = 0.7 * this.r + range(-1, 1);
//       }

//       draw() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.opacity += this.dop;

//         if (this.opacity > 1) {
//           this.opacity = 1;
//           this.dop *= -1;
//         }

//         if (this.opacity < 0 || this.y > this.ymax) {
//           this.replace();
//         }

//         if (!(0 < this.x && this.x < this.xmax)) {
//           this.x = (this.x + this.xmax) % this.xmax;
//         }

//         drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
//       }
//     }

//     const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

//     function step() {
//       requestAnimationFrame(step);
//       context.clearRect(0, 0, w, h);
//       confetti.forEach((c) => c.draw());
//     }

//     step();

//     return () => {
//       window.removeEventListener("resize", resizeWindow);
//     };
//   }, []);

//   return (
//     <canvas
//       id="world"
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: -1,
//         background: "#111",
//       }}
//     ></canvas>
//   );
// }

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

function BlurBackground() {
  // Track mouse movement
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Create 3D tilt effect
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [20, -20]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-25, 25]);

  // Global layer parallax
  const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-300, 300]);
  const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-200, 200]);

  useEffect(() => {
    const handle = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        perspective: "2000px",
        background: "black",
      }}
    >
      {/* Galaxy universe container */}
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
        className="absolute"
      >
        {/* === GALAXY NEBULA BLOBS === */}

        {/* Purple Nebula */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(142,85,255,0.6), transparent 70%)",
            top: "20%",
            left: "15%",
            z: -150,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Blue Nebula */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(0,119,255,0.5), transparent 70%)",
            top: "50%",
            left: "60%",
            z: -200,
          }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Pink Nebula */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(255,70,130,0.5), transparent 70%)",
            top: "70%",
            left: "25%",
            z: -250,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === FLOATING 3D STARS === */}

        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              z: Math.random() * 400 - 200, // deep 3D distribution
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* === STARS ORBITING AROUND CENTER === */}

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: 4,
              height: 4,
              top: "50%",
              left: "50%",
              z: -50,
            }}
            animate={{
              x: [
                Math.cos(i * 20) * 200,
                Math.cos(i * 20) * -200,
                Math.cos(i * 20) * 200,
              ],
              y: [
                Math.sin(i * 20) * 200,
                Math.sin(i * 20) * -200,
                Math.sin(i * 20) * 200,
              ],
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default BlurBackground;

// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { useEffect } from "react";

// function BlurBackground() {
//   // Mouse tracking
//   const mouseX = useMotionValue(window.innerWidth / 2);
//   const mouseY = useMotionValue(window.innerHeight / 2);

//   // 3D tilt & parallax
//   const rotateX = useTransform(mouseY, [0, window.innerHeight], [20, -20]);
//   const rotateY = useTransform(mouseX, [0, window.innerWidth], [-25, 25]);

//   const offsetX = useTransform(mouseX, [0, window.innerWidth], [-250, 250]);
//   const offsetY = useTransform(mouseY, [0, window.innerHeight], [-150, 150]);

//   // Track mouse movement
//   useEffect(() => {
//     const move = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   return (
//     <motion.div
//       className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none"
//       style={{ perspective: "2000px" }}
//     >
//       <motion.div
//         className="absolute w-full h-full"
//         style={{
//           x: offsetX,
//           y: offsetY,
//           rotateX,
//           rotateY,
//           transformStyle: "preserve-3d",
//         }}
//       >
//         {/* ----------------------------------------
//             NEBULA CLOUDS (Soft Galaxy Glow)
//         ---------------------------------------- */}

//         {/* Purple Nebula */}
//         <motion.div
//           className="absolute blur-[120px] rounded-full"
//           style={{
//             width: 900,
//             height: 900,
//             top: "10%",
//             left: "5%",
//             z: -200,
//             background:
//               "radial-gradient(circle, rgba(165,70,255,0.45), transparent 70%)",
//           }}
//           animate={{ scale: [1, 1.15, 1] }}
//           transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//         />

//         {/* Blue Nebula */}
//         <motion.div
//           className="absolute blur-[150px] rounded-full"
//           style={{
//             width: 800,
//             height: 800,
//             top: "40%",
//             left: "55%",
//             z: -250,
//             background:
//               "radial-gradient(circle, rgba(60,140,255,0.45), transparent 70%)",
//           }}
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
//         />

//         {/* Pink Nebula */}
//         <motion.div
//           className="absolute blur-[180px] rounded-full"
//           style={{
//             width: 1000,
//             height: 1000,
//             top: "65%",
//             left: "20%",
//             z: -300,
//             background:
//               "radial-gradient(circle, rgba(255,80,150,0.35), transparent 70%)",
//           }}
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         />

//         {/* ----------------------------------------
//             FLOATING GALAXY STARS
//         ---------------------------------------- */}
//         {[...Array(120)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bg-white rounded-full"
//             style={{
//               width: Math.random() * 3 + 1,
//               height: Math.random() * 3 + 1,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.9 + 0.1,
//               z: Math.random() * 400 - 200,
//             }}
//             animate={{
//               y: [0, Math.random() * 30 - 15, 0],
//               x: [0, Math.random() * 30 - 15, 0],
//             }}
//             transition={{
//               duration: Math.random() * 6 + 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}

//         {/* ----------------------------------------
//             ORBITING STARS (Spiral Galaxy Effect)
//         ---------------------------------------- */}
//         {[...Array(25)].map((_, i) => (
//           <motion.div
//             key={`orbit-${i}`}
//             className="absolute bg-white rounded-full"
//             style={{
//               width: 4,
//               height: 4,
//               top: "50%",
//               left: "50%",
//               z: -50,
//             }}
//             animate={{
//               x: [
//                 Math.cos(i * 15) * 250,
//                 Math.cos(i * 15) * -250,
//                 Math.cos(i * 15) * 250,
//               ],
//               y: [
//                 Math.sin(i * 15) * 250,
//                 Math.sin(i * 15) * -250,
//                 Math.sin(i * 15) * 250,
//               ],
//             }}
//             transition={{
//               duration: 14 + i * 0.5,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}

//         {/* ----------------------------------------
//             FLOATING SPACE PARTICLES
//         ---------------------------------------- */}
//         {[...Array(40)].map((_, i) => (
//           <motion.div
//             key={`part-${i}`}
//             className="absolute bg-purple-300 rounded-full blur-[3px] opacity-40"
//             style={{
//               width: Math.random() * 8 + 3,
//               height: Math.random() * 8 + 3,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               z: Math.random() * 300 - 100,
//             }}
//             animate={{
//               y: ["0%", "20%", "0%"],
//               x: ["0%", "-10%", "0%"],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 8,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }

// export default BlurBackground;
