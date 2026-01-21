"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ onOpenRegister }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleNavClick = (target) => {
    setIsOpen(false); // close mobile menu
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 transition-all duration-300">
          {/* Logo */}
          <div className="flex-shrink-0 relative z-50">
            <Link href="/" onClick={() => handleNavClick("home")} className="block relative w-32 h-8 sm:w-40 sm:h-10 lg:w-48 lg:h-12 transition-all duration-300">
              <img src="logo2.png" alt="Cyberpunk Logo" className="object-contain w-full h-full" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center h-full">
            <div className="flex items-center gap-5 bg-black/50 p-3 skew-x-[-15deg] border-1 border-yellow-400/90">
              <span
                onClick={() => handleNavClick("home")}
                className="cursor-pointer text-gray-200 font-bold tracking-wider hover:text-[#FCEE0A] transition-colors duration-200 text-sm uppercase"
              >
                Home
              </span>
              <span
                onClick={() => handleNavClick("missions")}
                className="cursor-pointer text-gray-200 font-bold tracking-wider hover:text-[#FCEE0A] transition-colors duration-200 text-sm uppercase"
              >
                Missions
              </span>
            </div>

            {/* Register Button */}
            <div className="h-full flex items-center ml-4">
              <button
                onClick={() => onOpenRegister()}
                className="relative group bg-[#FCEE0A] text-black font-extrabold text-sm p-3 skew-x-[-15deg] border-1 border-yellow-400/90 transition-all duration-300 hover:bg-white hover:scale-105"
              >
                <span className="relative z-10 block skew-x-[15deg]">Register now</span>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FCEE0A] hover:text-white focus:outline-none transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-8 text-center w-full px-8">
          <span
            onClick={() => handleNavClick("home")}
            className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:text-[#FCEE0A] transition-all duration-300 uppercase tracking-tighter cursor-pointer"
          >
            Home
          </span>
          <span
            onClick={() => handleNavClick("missions")}
            className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:text-[#FCEE0A] transition-all duration-300 uppercase tracking-tighter cursor-pointer"
          >
            Missions
          </span>

          <button
            onClick={() => { setIsOpen(false); onOpenRegister(); }}
            className="mt-8 inline-block bg-[#FCEE0A] text-black font-black text-xl sm:text-2xl py-3 px-10 uppercase tracking-widest hover:bg-white hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(252,238,10,0.4)]"
            style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Register now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
