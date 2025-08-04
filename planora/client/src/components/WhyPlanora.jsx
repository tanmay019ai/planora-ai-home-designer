import React from "react";
import bgWhy from "../assets/why-bg.jpg";
import leftImg from "../assets/why-left.jpg";
import rightImg from "../assets/why-right.jpeg";
import { motion } from "framer-motion";
import "../styles/neon.css";

const WhyPlanora = () => {
  return (
    <section
      id="why"
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative px-4 py-20 flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bgWhy})` }}
    >
      <div className="relative w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center">

        {/* 📱 MOBILE VIEW: WORKFLOW + Right Image in a row */}
        <div className="md:hidden w-full px-4 flex justify-between items-center mb-8">
          {/* WORKFLOW */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-[5vw] font-bold tracking-wide flicker-text"
            style={{
              fontFamily: "'Rubik Doodle Triangles', cursive",
              color: "#4C6C3F",
              textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
            }}
          >
            WORKFLOW →
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="w-[120px] rounded-xl shadow-xl overflow-hidden neon-float"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={rightImg}
              alt="AI powered"
              className="w-full h-auto rounded-xl neon-img"
            />
          </motion.div>
        </div>

        {/* 🔤 HEADING (Shared) */}
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

        {/* 📦 DESCRIPTION BOX (responsive positions) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-black/30 text-white p-5 rounded-xl max-w-sm w-[90%] text-base leading-relaxed z-10 shadow-lg neon-border 
            md:absolute md:right-6 md:-bottom-40
            lg:translate-y-[100%] lg:-bottom-40"
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

        {/* 📱 LEFT IMAGE (Mobile only) */}
        <motion.div
          className="block md:hidden mt-10 w-[150px] sm:w-[180px] rounded-xl shadow-xl overflow-hidden neon-float"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={leftImg}
            alt="Prompt based"
            className="w-full h-auto rounded-xl neon-img"
          />
        </motion.div>

        {/* 💻 DESKTOP/TABLET: Floating Images + Workflow */}
        {/* RIGHT IMAGE */}
        <motion.div
          className="hidden md:block absolute -top-40 right-4 md:right-8 w-[180px] md:w-[240px] rounded-xl shadow-xl overflow-hidden neon-float"
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

        {/* LEFT IMAGE */}
        <motion.div
          className="hidden md:block absolute -bottom-40 left-2 md:-left-2 w-[180px] md:w-[240px] rounded-xl shadow-xl overflow-hidden neon-float"
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

        {/* WORKFLOW TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
          className="hidden md:block absolute -top-36 right-[290px] text-[36px] md:text-[44px] tracking-wide z-20 flicker-text"
          style={{
            fontFamily: "'Rubik Doodle Triangles', cursive",
            color: "#4C6C3F",
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
