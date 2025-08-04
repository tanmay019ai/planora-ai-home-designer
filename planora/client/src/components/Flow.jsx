import React from "react";
import bgflow from "../assets/bgflow.jpg";
import first from "../assets/first.jpg";
import second from "../assets/second.jpg";
import third1 from "../assets/third1.jpg";
import fourth from "../assets/fourth.jpg";
import { motion } from "framer-motion";

const steps = [
  {
    number: "STEP-1",
    title: "Describe Your Dream",
    desc: "Start by describing your ideal home – size, layout, number of floors, rooms, and even style. No technical terms needed.",
    image: first,
  },
  {
    number: "STEP-2",
    title: "AI Builds The Layout",
    desc: "Based on your prompt, Planora’s AI generates detailed 3D layout options instantly. Save time, get precision.",
    image: second,
  },
  {
    number: "STEP-3",
    title: "Customize It Your Way",
    desc: "Want more light? Add a skylight. Want 2 balconies? Just say it. Adjust rooms, doors, and finishes easily.",
    image: third1,
  },
  {
    number: "STEP-4",
    title: "Download & Build",
    desc: "Get a downloadable 3D .glTF model file and give it to architects or builders. Simple. Professional. Powerful.",
    image: fourth,
  },
];

export default function Flow() {
  return (
    <section
      id="flow"
      className="w-full overflow-x-hidden px-4 sm:px-6 md:px-10 py-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgflow})` }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-12"
      >
      
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:grid lg:grid-cols-[130px_1fr_200px] items-center gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            {/* STEP BADGE */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <div
                className="w-36 h-20 flex items-center justify-center rounded-3xl shadow border-2 border-black bg-[#D0ECE6] opacity-70"
                style={{
                  fontFamily: "Silkscreen, monospace",
                  color: "#2C1616",
                  fontSize: "20px",
                  letterSpacing: "2px",
                }}
              >
                {step.number}
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-[#022B23]/70 p-5 rounded-2xl shadow-lg text-white w-full"
              style={{
                boxShadow: "10px 10px 4px rgba(109, 93, 93, 0.94)",
              }}
            >
              <motion.h3
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl font-semibold mb-2"
                style={{ fontFamily: "Urbanist, sans-serif" }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: "Reem Kufi Fun, sans-serif",
                  color: "#C5F9AC",
                }}
              >
                {step.desc}
              </motion.p>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              className="w-full flex justify-center lg:justify-end"
              initial={{ scale: 0.8, opacity: 0, x: 30 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <img
                src={step.image}
                alt={step.title}
                className="rounded-xl w-70 h-40 sm:w-72 sm:h-44  object-cover border border-gray-300 shadow-md"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
