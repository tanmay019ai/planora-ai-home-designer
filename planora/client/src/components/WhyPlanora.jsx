import React from "react";
import bgWhy from "../assets/why-bg.jpg";
import leftImg from "../assets/why-left.jpg";
import rightImg from "../assets/why-right.jpeg";
import { motion } from "framer-motion";
import "../styles/neon.css"; // still used for other animations (float, flicker)

const WhyPlanora = () => {
  return (
    <section
      id="why"
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative px-4 py-20 flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bgWhy})` }}
    >
      <div className="relative w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center">

        {/* Heading without glow */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[10vw] md:text-[8vw] mb-10 text-center leading-tight font-light"
          style={{
            fontFamily: "Syne Mono, monospace",
            color: "#4C6C3F",
            opacity: 0.89,
            letterSpacing: "0.40em",
            textShadow: "4px 4px 0px rgba(0, 0, 0, 0.6)",
          }}
        >
          WHY PLANORA
        </motion.h2>

        {/* Description Box (no glow) */}
   <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 0.3 }}
  viewport={{ once: true }}
  className="absolute translate-y-[100%] -bottom-40 right-6 bg-black/30 text-white p-5 rounded-xl max-w-sm text-base leading-relaxed z-10 shadow-lg neon-border"
  style={{
    fontFamily: 'Syne Mono',
    fontWeight: 300,
    color: "#FFEFEF",
    letterSpacing: "0.05em",
    border: "1px solid #FFCDCC",
  }}
>
  Because home design should be fast, smart, and effortless. Planora lets you create stunning 3D home models with just one line of prompt — no engineering skills, no complex tools, just pure AI magic.
</motion.div>


        {/* Floating Left Image */}
        <motion.div
          className="absolute -bottom-40 left-2 md:-left-2 w-[180px] md:w-[240px] rounded-xl shadow-xl overflow-hidden neon-float"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={leftImg}
            alt="Prompt based"
            className="w-full h-auto rounded-xl neon-img"
          />
        </motion.div>

        {/* Floating Right Image */}
        <motion.div
          className="absolute -top-40 right-4 md:right-8 w-[180px] md:w-[240px] rounded-xl shadow-xl overflow-hidden neon-float"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={rightImg}
            alt="AI powered"
            className="w-full h-auto rounded-xl neon-img"
          />
        </motion.div>

        {/* WORKFLOW Text with flicker */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute -top-36 right-[290px] text-[36px] md:text-[44px] tracking-wide z-20 flicker-text"
          style={{
            fontFamily: "'Rubik Doodle Triangles', cursive",
            color: "#4C6C3F",
            fontSize: "3.5rem",
            textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
          }}
        >
          WORKFLOW →
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPlanora;
