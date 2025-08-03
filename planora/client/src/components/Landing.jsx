import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/bg.jpg';
import Flow from './Flow.jsx';
import { motion } from 'framer-motion';
import WhyPlanora from './WhyPlanora.jsx'; // Import the WhyPlanora component
import Contact from './Contact.jsx';

const phrases = [
  'Write your dream home here...',
  'e.g. A 3BHK villa with pool and garden',
  'Write your dream home here...',
];

const Landing = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Typing placeholder animation
  useEffect(() => {
    const currentText = phrases[loopIndex % phrases.length];
    let typingSpeed = isDeleting ? 40 : 100;

    const timeout = setTimeout(() => {
      setPlaceholder(currentText.substring(0, charIndex));

      if (!isDeleting && charIndex < currentText.length) {
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, loopIndex]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      console.log('🚀 Submitting prompt:', prompt);
      const res = await axios.post('http://localhost:5000/generate', { prompt });
      const modelUrl = res.data.modelUrl;
      navigate('/result', { state: { modelUrl } });
    } catch (err) {
      console.error('Error generating model:', err);
      alert('Failed to generate model. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id='home'>
        <div
          className="w-full min-h-screen text-white px-4 relative"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* HEADER */}
          <header className="fixed top-0 left-0 w-full bg-black/70 text-white flex items-center px-10 py-4 z-50 backdrop-blur-md">
            <div className="text-3xl font-quint tracking-wide">PLANORA</div>

            {/* Animated Nav */}
            <motion.nav
              className="ml-auto pl-32 flex gap-14 text-xl font-quint tracking-wide"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {[
                { text: 'HOME', href: '#home' },
                { text: 'FLOW', href: '#flow' },
                { text: 'WHY PLANORA?', href: '#why' },
                { text: 'CONTACT', href: '#contact' },
              ].map(({ text, href }) => (
                <motion.a
                  key={text}
                  href={href}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.08, color: '#B5FFF9' }}
                  whileTap={{ scale: 0.95 }}
                  className="transition duration-200 cursor-pointer"
                >
                  {text}
                </motion.a>
              ))}
            </motion.nav>
          </header>

          {/* CONTENT */}
          <div className="w-full min-h-screen flex flex-col items-center justify-center pt-28">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold stroke-text text-center font-orbitron"
            >
              IMAGINE DESCRIBE BUILD
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-2xl mt-4 text-outline font-semibold drop-shadow-md tracking-wide"
            >
              Where AI builds and you design
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 w-full max-w-xl flex items-center justify-between border border-[#1D3D33] rounded-full bg-white/80 shadow-md px-4 py-2"
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-[17px] tracking-[0.05em] font-serif text-[#45514B] bg-transparent placeholder-[#45514B] placeholder-opacity-80 outline-none pr-4"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={loading}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl text-black transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? '⏳' : '→'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FLOW Section Below */}
      <Flow />
      {/* Why Planora Section Below */}
      <WhyPlanora />
      <Contact/>
      
    </>
  );
};

export default Landing;
