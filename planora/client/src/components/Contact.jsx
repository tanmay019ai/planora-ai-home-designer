import React from "react";
import aiBot from "../assets/ai-bot.png"; // Replace with your image path

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full min-h-screen text-white px-6 py-16 flex items-center justify-center"
      style={{
                  backgroundImage: `url(${aiBot})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Contact Form */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#73FBD3] mb-4 leading-tight">
            Let’s Build Together
          </h2>
          <p className="text-[#B2FCE4] text-lg mb-8">
            Drop us your details and our AI architects will reach you.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent border border-[#3EF2C6] rounded-lg px-4 py-3 text-white placeholder-[#94FDEE] focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border border-[#3EF2C6] rounded-lg px-4 py-3 text-white placeholder-[#94FDEE] focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="w-full bg-transparent border border-[#3EF2C6] rounded-lg px-4 py-3 text-white placeholder-[#94FDEE] focus:outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-black font-semibold rounded-lg shadow-md transition hover:opacity-90"
            >
              Start Designing
            </button>
          </form>
        </div>

        {/* Right - Contact Info with Background Image */}
        <div className="relative flex flex-col items-center justify-start text-center w-full h-full">
  {/* Moved to top with justify-start instead of center */}
  <h3 className="text-5xl font-semibold text-[#A6FFE8] mb-4 z-10">
    Contact Info
  </h3>
  <p className="text-[#D4FFF3] text-2xl mb-2 z-10">+91-8471048881</p>
  <p className="text-[#D4FFF3] text-2xl mb-2 z-10">tanmaysr019@gmail.com</p>
  <p className="text-[#D4FFF3] text-2xl mb-6 z-10">Greater Noida, India</p>
</div>

      </div>
    </section>
  );
};

export default Contact;
