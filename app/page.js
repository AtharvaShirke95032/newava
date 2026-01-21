"use client"
import MissionBriefing from "@/components/ImageCarousel";
import Navbar from "@/components/navbar";

import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden bg-black">

      {/* NAVBAR */}
      {/* <Navbar /> */}

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center">

        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/lol.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-0 right-0 w-full h-[440px] z-20 bg-repeat-x pointer-events-none"
            style={{
              bottom: '-150px', backgroundImage: "url('/noise.png'), url('/noisepat.png')",
              backgroundPosition: "top, top 440px center", backgroundSize: "auto, auto"
            }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 gap-5 sm:gap-6">

  {/* Logo */}
  <Image
    src="/text2.png"
    alt="Avalon Logo"
    width={677}
    height={369}
    priority
    className="
      w-[220px]
      xs:w-[260px]
      sm:w-[360px]
      md:w-[480px]
      lg:w-[677px]
      h-auto
    "
  />

  {/* Subtitle */}
  <p className="
    text-white
    text-[11px]
    xs:text-xs
    sm:text-sm
    md:text-base
    tracking-widest
    opacity-90
  ">
    // NEXT GEN TECHFEST // TERNA ENGINEERING COLLEGE //
  </p>

  {/* Buttons */}
  <div className="
    mt-4
    flex
    flex-col
    sm:flex-row
    gap-3
    sm:gap-4
    items-center
  ">

    {/* View Missions */}
    <a
  onClick={(e) => {
    e.preventDefault();
    const el = document.getElementById("missions");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset + 40;
    window.scrollTo({ top: y, behavior: "smooth" });
  }}
  className="
    cyber-btn
    relative
    cursor-pointer
    w-[220px] sm:w-[252px]
    h-[44px] sm:h-[48px]
    flex-shrink-0
    overflow-hidden

    transition-all duration-300 ease-out
    hover:scale-[1.04]
    hover:-translate-y-[2px]
    hover:drop-shadow-[0_0_12px_rgba(255,214,0,0.45)]
    active:scale-[0.98]
  "
>
  <Image src="/btn.svg" alt="button" fill className="object-contain" />
  <span className="
    absolute inset-0
    flex items-center justify-center
    font-bold uppercase
    text-xs sm:text-sm
    tracking-widest
    whitespace-nowrap
    pointer-events-none
  ">
    view missions
  </span>
</a>


    {/* Register */}
    <a
  className="
    cyber-btn
    relative
    cursor-pointer
    w-[220px] sm:w-[252px]
    h-[44px] sm:h-[48px]
    flex-shrink-0
    overflow-hidden

    transition-all duration-300 ease-out
    hover:scale-[1.04]
    hover:-translate-y-[2px]
    hover:drop-shadow-[0_0_12px_rgba(255,214,0,0.45)]
    active:scale-[0.98]
  "
>
  <Image src="/btn2.svg" alt="button" fill className="object-contain" />
  <span className="
    absolute inset-0
    flex items-center justify-center
    font-bold uppercase
    text-xs sm:text-sm
    tracking-widest
    whitespace-nowrap
    pointer-events-none
  ">
    Register
  </span>
</a>



  </div>
</div>
      </section>

      {/* ================= WHAT IS AVALON ================= */}
      <section className="relative w-full flex justify-center px-4 sm:px-6 lg:px-10 py-16 lg:py-24">

        <div className="relative w-full max-w-[1100px] px-6 sm:px-10 lg:px-20 py-10 lg:py-14 text-white">


          {/* Border corners */}
          <span className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-yellow-400" />
          <span className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-yellow-400" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-yellow-400" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-yellow-400" />

          <h2
            className="text-center text-yellow-400 font-extrabold uppercase text-4xl sm:text-5xl lg:text-7xl mb-6"
            style={{ fontFamily: '"VT323", monospace' }}
          >
            What is Avalon
          </h2>

          <p className="max-w-[760px] mx-auto text-base sm:text-lg leading-8 sm:leading-9 text-center text-gray-200">
  Welcome to Avalon 2026, where technology meets imagination. Our annual
  techfest brings together the brightest minds to explore the
  frontiers of innovation and creativity.
</p>

        </div>

      </section>

      {/* ================= MISSION BRIEFING ================= */}
      <section id="missions" className="relative mt-20 lg:mt-32">
        <MissionBriefing />
      </section>
      <section>
        hi
      </section>

    </div>
  );
}
