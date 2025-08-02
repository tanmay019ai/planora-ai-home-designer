import React from 'react';
import bg from '../assets/bg.jpg';

const Landing = () => {
  return (
    <div
      className="w-full min-h-screen text-white px-4 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* HEADER — fixed-like appearance */}
      <header className="absolute top-0 left-0 w-full bg-black/70 text-white flex items-center px-10 py-4 z-10">
        <div className="text-3xl font-quint tracking-wide">PLANORA</div>
        <nav className="ml-auto pl-32 flex gap-14 text-lg font-quint tracking-wide">
          <a href="#home" className="hover:text-[#B5FFF9] transition duration-200">HOME</a>
          <a href="#flow" className="hover:text-[#B5FFF9] transition duration-200">FLOW</a>
          <a href="#why" className="hover:text-[#B5FFF9] transition duration-200">WHY PLANORA?</a>
          <a href="#contact" className="hover:text-[#B5FFF9] transition duration-200">CONTACT</a>
        </nav>
      </header>

      {/* LANDING CONTENT */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center pt-28"> {/* pt-28 = add space under header */}
        <h1 className="text-4xl md:text-6xl font-bold stroke-text text-center font-orbitron">
          IMAGINE DESCRIBE BUILD
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-outline font-semibold drop-shadow-md tracking-wide">
          Where AI builds and you design
        </p>

        <div className="mt-8 w-full max-w-xl flex items-center justify-between border border-[#1D3D33] rounded-full bg-white/80 shadow-md px-4 py-2">
        <input
          type="text"
          placeholder="Write your dream home here..."
          className="flex-1 text-[17px] tracking-[0.05em] font-serif text-[#45514B] bg-transparent placeholder-[#45514B] placeholder-opacity-80 outline-none pr-4"
        />
        <button className="w-10 h-10 flex items-center justify-center rounded-full  text-2xl text-black">
          →
        </button>
      </div>
      </div>
    </div>
  );
};

export default Landing;
