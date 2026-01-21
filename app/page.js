"use client"
import MissionBriefing from "@/components/ImageCarousel";
import Navbar from "@/components/navbar";
import RegistrationModal from "@/components/RegistrationModal";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  // Intersection hooks
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) animation.start("visible");
  }, [inView, animation]);

  return (
    <div className="relative w-full overflow-x-hidden bg-black">

      {/* NAVBAR */}
      {/* <Navbar /> */}

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">

        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/backfix.mp4" type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-0 right-0 w-full h-[440px] z-20 bg-repeat-x pointer-events-none"
            style={{
              bottom: '-150px', backgroundImage: "url('/noise.png'), url('/noisepat.png')",
              backgroundPosition: "top, top 440px center", backgroundSize: "auto, auto"
            }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 gap-5 sm:gap-6 pt-24 sm:pt-32">

          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
          >
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
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            transition={{ delay: 0.3 }}
            className="text-white text-[11px] xs:text-xs sm:text-sm md:text-base tracking-widest opacity-90"
          >
            // NEXT GEN TECHFEST // TERNA ENGINEERING COLLEGE //
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
          >

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
              <span className="absolute inset-0 flex items-center justify-center font-bold uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap pointer-events-none">
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
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <Image src="/btn2.svg" alt="button" fill className="object-contain" />
              <span className="absolute inset-0 flex items-center justify-center font-bold uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap pointer-events-none">
                Register
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= WHAT IS AVALON ================= */}
      <section ref={ref} className="relative w-full flex justify-center px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <motion.div
          className="relative w-full max-w-[1100px] px-6 sm:px-10 lg:px-20 py-10 lg:py-14 text-white"
          initial="hidden"
          animate={animation}
          variants={fadeUpVariant}
        >

          {/* Border corners */}
          <span className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-yellow-400" />
          <span className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-yellow-400" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-yellow-400" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-yellow-400" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={animation}
            variants={fadeUpVariant}
            className="text-center text-yellow-400 font-extrabold uppercase text-4xl sm:text-5xl lg:text-7xl mb-6"
            style={{ fontFamily: '"VT323", monospace' }}
          >
            What is Avalon
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={animation}
            variants={fadeUpVariant}
            transition={{ delay: 0.2 }}
            className="max-w-[760px] mx-auto text-base sm:text-lg leading-8 sm:leading-9 text-center text-gray-200"
          >
            Welcome to Avalon 2026, where technology meets imagination. Our annual
            techfest brings together the brightest minds to explore the
            frontiers of innovation and creativity.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= MISSION BRIEFING ================= */}
      <section id="missions" className="relative mt-20 lg:mt-32">
        <MissionBriefing />
      </section>

      <section className="relative text-white text-center py-10">
      <Image src="/upp.svg" alt="button" fill className="absolute object-contain top-0" />
        <Newsletter/>
      </section>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
