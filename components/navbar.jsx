"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", hasSub: true },
    { name: "missions", hasSub: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adjusted height: h-16 for mobile, h-20 for desktop */}
        <div className="flex items-center justify-between h-16 lg:h-20 transition-all duration-300">
          
          {/* LOGO */}
          {/* Added responsive sizing: w-32/h-8 on mobile -> w-48/h-12 on desktop */}
          <div className="flex-shrink-0 relative z-50">
            <Link 
              href="/" 
              className="block relative w-32 h-8 sm:w-40 sm:h-10 lg:w-48 lg:h-12 transition-all duration-300"
            >
              <Image
                src="logo2.png"
                alt="Cyberpunk Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center h-full">
            {/* Navigation Links */}
            <div className="flex items-center gap-5 bg-black/50 p-3 skew-x-[-15deg] border-1 border-yellow-400/90">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group px-4 h-full flex items-center skew-x-[15deg] cursor-pointer"
                >
                  <span className="text-gray-200 font-bold tracking-wider hover:text-[#FCEE0A] transition-colors duration-200 text-sm uppercase">
                    {link.name}
                  </span>
                </div>
              ))}
            </div>

            {/* REGISTER BUTTON (Desktop) */}
            <div className="h-full flex items-center ml-4">
              <Link
                href="/buy"
                className="relative group bg-[#FCEE0A] text-black font-extrabold text-sm p-3 skew-x-[-15deg] border-1 border-yellow-400/90 transition-all duration-300 hover:bg-white hover:scale-105"
              >
                <span className="relative z-10 block skew-x-[15deg]">Register now</span>
              </Link>
            </div>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FCEE0A] hover:text-white focus:outline-none transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="3"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULL SCREEN OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Background Glitch Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCEE0A] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="flex flex-col space-y-8 text-center w-full px-8">
          {navLinks.map((link, idx) => (
            <div
              key={link.name}
              className="group cursor-pointer"
              onClick={() => setIsOpen(false)} // Close menu on click
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <Link href={`/${link.name.toLowerCase()}`}>
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 group-hover:text-[#FCEE0A] group-hover:bg-none transition-all duration-300 uppercase tracking-tighter">
                  {link.name}
                </span>
              </Link>
              {/* Mobile Decorative Line */}
              <div className="h-[1px] w-0 group-hover:w-1/2 bg-[#FCEE0A] transition-all duration-500 mx-auto mt-2 shadow-[0_0_10px_#FCEE0A]" />
            </div>
          ))}

          <Link
            href="/buy"
            onClick={() => setIsOpen(false)}
            className="mt-8 inline-block bg-[#FCEE0A] text-black font-black text-xl sm:text-2xl py-3 px-10 uppercase tracking-widest hover:bg-white hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(252,238,10,0.4)]"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)",
            }}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;