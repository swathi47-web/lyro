import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans text-purple-900 bg-gradient-to-br from-pink-100 via-pink-200 to-red-100">
      {/* 🐾 Main Block with Background */}
      <section className="relative w-full pt-4 pb-10 px-4 md:px-20">
        {/* Background image */}
        <div
          className="absolute inset-10 bg-cover bg-center z-0 rounded-3xl"
          style={{
            backgroundImage: "url('/valentine.bg.jpg')",
            opacity: 0.7,
          }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🐾 Welcome to <span className="text-purple-900">PetAdopt</span>
            </h1>
            <p className="text-purple-900 text-lg leading-relaxed">
              A place where every furry friend finds a forever home. Begin your journey to adopt love today!
            </p>
          </div>

          <div
          className="w-full max-w-lg ml-[-30px]"
          data-aos="zoom-in"
          >
        <img
         src="/bg1.jpg"
         alt="Adopted pet"
         className="h-100 object-cover rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
        />
          </div>


        </div>
      </section>

      {/* 🐶 Why Adopt Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-pink-800 mb-6">Why Adopt a Pet?</h2>
        <p className="text-center text-lg text-gray-800 mb-10 max-w-3xl mx-auto leading-relaxed">
          Adopting a pet isn’t just about getting a new animal – it's about giving a second chance, showing compassion,
          and building a bond that lasts forever. Our platform helps you find your perfect furry match with ease and love.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-pink-200 rounded-xl p-6 text-center shadow-md" data-aos="fade-up">
            <h3 className="text-xl font-semibold mb-2">Search Pet</h3>
            <p className="text-sm">Use filters to find pets that suit your lifestyle.</p>
          </div>
          <div className="bg-pink-300 rounded-xl p-6 text-center shadow-md" data-aos="fade-up" data-aos-delay="150">
            <h3 className="text-xl font-semibold mb-2">Connect with Parent</h3>
            <p className="text-sm">Get to know the pet’s needs from their current parent.</p>
          </div>
          <div className="bg-pink-400 rounded-xl p-6 text-center shadow-md" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-semibold mb-2">Adopt & Love</h3>
            <p className="text-sm">Start your journey of unconditional love and loyalty.</p>
          </div>
        </div>
      </section>

      {/* ❤️ Gallery Section */}
      <section className="bg-white/60 backdrop-blur-lg px-6 py-12 rounded-3xl max-w-6xl mx-auto mb-16 shadow-inner">
        <h2 className="text-3xl text-center font-bold text-fuchsia-700 mb-10">Every Picture Tells a Story 🐕‍🦺</h2>
        {[
          { src: "/img.jpg", line: "Adopt love, don't shop.", para: "When you adopt, you save a life and make room for another in need." },
          { src: "/img2.jpg", line: "You don’t just adopt a pet, you adopt happiness.", para: "Their wagging tails and gentle purrs will fill your home with joy." },
          { src: "/img3.jpg", line: "A paw can heal what words cannot.", para: "Animals offer healing and emotional support like no other." },
          { src: "/img4.jpg", line: "Start a journey of trust, loyalty, and care.", para: "Every pet you adopt is waiting to give you unconditional love." },
          { src: "/img.c.jpg", line: "Be the reason they believe in people again.", para: "Many rescued pets have faced trauma – your love changes everything." },
          { src: "/img.c1.jpg", line: "From lonely to loved – thanks to you.", para: "Bring a rescued soul home and experience the purest bond." },
        ].map((item, index) => (
          <div key={index} className="mb-10 flex flex-col sm:flex-row items-center gap-6" data-aos="fade-up">
            <img src={item.src} alt={`pet-${index}`} className="w-full sm:w-1/2 rounded-2xl shadow-md" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-pink-800 mb-2">{item.line}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.para}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Button */}
      <div className="text-center mb-20">
        <Link
          to="/pets"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-md text-lg transition"
        >
          🐶 Explore Available Pets
        </Link>
      </div>
    </div>
  );
};

export default Landing;











































