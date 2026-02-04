"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistration } from "@/components/RegistrationContext";

// --- DATA ---
const EVENTS = [
  {
    id: "innov8",
    title: "INNOV8 4.0",
    image: "/first.png",
    date: "24-Hour Hackathon",
    prize: "₹60,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Flagship 24-hour hackathon
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          Bring your coding skills, ideas, and adrenaline for an epic journey into the world of tech.
        </p>
        <p className="mt-4 text-sm font-bold text-yellow-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 animate-pulse rounded-full" />
          Apply via Devfolio for Sponsorship eligibility
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: Free
        </p>
      </>
    ),
  },
  {
    id: "robosoccer",
    title: "ROBO SOCCER",
    image: "/second.png",
    date: "9 FEB 2026",
    prize: "₹16,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Fast-paced robotics challenge
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          Robots must dribble, pass, and shoot goals in a dynamic arena where engineering meets intelligent gameplay.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: ₹300 per team
        </p>
      </>
    ),
  },
  {
    id: "reversecoding",
    title: "REVERSE CODING",
    image: "/third.png",
    date: "9 FEB 2026",
    prize: "₹8,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Think backwards. Code smarter.
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          Reverse-engineer program outputs to deduce the underlying algorithm and write the correct code.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: ₹250 per team
        </p>
      </>
    ),
  },
  {
    id: "roborace",
    title: "ROBO RACE",
    image: "/brum.png",
    date: "9 FEB 2026",
    prize: "₹16,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Design. Drive. Conquer.
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          A thrilling robotics competition testing speed, precision, and control on a challenging track.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: ₹400 per team (2-4 members)
        </p>
      </>
    ),
  },
  {
    id: "cadcomp",
    title: "CAD COMP",
    image: "/five.png",
    date: "10 FEB 2026",
    prize: "₹4,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Technical design challenge
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          Create accurate and innovative digital models using computer-aided design tools.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: ₹150 per individual
        </p>
      </>
    ),
  },
  {
    id: "paperweight",
    title: "PAPERWEIGHT",
    image: "/six.png",
    date: "10 FEB 2026",
    prize: "₹4,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg">
          Imagine. Design. Impress.
        </p>
        <p className="mt-2 text-base lg:text-lg text-gray-300">
          Transform simple everyday objects into innovative, visually appealing, and practical products.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Registration: ₹200 per team
        </p>
      </>
    ),
  },
];

export default function MissionBriefing() {
  const [currentView, setCurrentView] = useState("events");
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const { openModal } = useRegistration();

  const event = EVENTS[activeEventIndex];

  return (
    <section className="w-full bg-black py-12 lg:py-16 text-white overflow-hidden">

      {/* --- CUSTOM SCROLLBAR STYLES --- */}
      <style jsx global>{`
        /* The container for the scrollbar */
        .cyber-scrollbar::-webkit-scrollbar {
          height: 6px; /* Slim horizontal bar */
          background-color: #000;
        }

        /* The track (background) */
        .cyber-scrollbar::-webkit-scrollbar-track {
          background-color: #18181b; /* zinc-900 */
          border: 1px solid #333;
        }

        /* The draggable handle */
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background-color: #facc15; /* Yellow-400 */
          border-radius: 0px; /* Square edges for tech look */
        }

        /* Handle on hover */
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #eab308; /* Yellow-500 */
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- MOBILE NAVIGATION --- */}
        <div className="flex flex-col lg:hidden mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setCurrentView("objective")}
              className={`uppercase text-sm tracking-widest transition ${currentView === "objective" ? "text-yellow-400 font-bold" : "text-gray-400"
                }`}
            >
              Objective
            </button>
            <button
              onClick={() => setCurrentView("location")}
              className={`uppercase text-sm tracking-widest transition ${currentView === "location" ? "text-yellow-400 font-bold" : "text-gray-400"
                }`}
            >
              Location
            </button>
            <button
              onClick={() => setCurrentView("events")}
              className={`uppercase text-sm tracking-widest transition ${currentView === "events" ? "text-yellow-400 font-bold" : "text-gray-400"
                }`}
            >
              Events
            </button>
          </div>

          {currentView === "events" && (
            <div className="flex flex-wrap gap-2">
              {EVENTS.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setActiveEventIndex(i)}
                  className={`uppercase text-[10px] sm:text-xs tracking-wider px-2 py-1 border transition ${activeEventIndex === i
                    ? "border-yellow-400 text-yellow-400"
                    : "border-white/20 text-gray-500"
                    }`}
                >
                  {e.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-12">

          {/* LEFT PANEL (Desktop Sidebar) */}
          <div className="hidden lg:flex flex-col">
            <h2 className="text-5xl lg:text-5xl xl:text-7xl font-extrabold leading-tight uppercase tracking-widest">
              Mission<br />Briefing
            </h2>
            <div className="mt-8 flex flex-col gap-4 text-base xl:text-lg uppercase tracking-wider">
              <button
                onClick={() => setCurrentView("objective")}
                className={`w-full text-left border-b pb-2 transition-colors ${currentView === "objective"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-white/20 text-gray-400 hover:text-white"
                  }`}
              >
                Objective
              </button>
              <button
                onClick={() => setCurrentView("location")}
                className={`w-full text-left border-b pb-2 transition-colors ${currentView === "location"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-white/20 text-gray-400 hover:text-white"
                  }`}
              >
                Location
              </button>
              <button
                onClick={() => setCurrentView("events")}
                className={`w-full text-left border-b pb-2 transition-colors ${currentView === "events"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-white/20 text-gray-400 hover:text-white"
                  }`}
              >
                Event Details
              </button>
            </div>
          </div>

          {/* RIGHT PANEL (Content) */}
          <div className="relative w-full max-w-full overflow-hidden min-h-[500px] lg:min-h-[500px]">
            <AnimatePresence mode="wait">

              {/* OBJECTIVE VIEW */}
              {currentView === "objective" && (
                <motion.div
                  key="objective"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 lg:mt-6 max-w-[720px]"
                >
                  <h3 className="text-3xl lg:text-5xl font-bold text-yellow-400 mb-4 tracking-tight">
                    MISSION OBJECTIVE
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                    Gather the brightest minds in engineering and technology, challenge them to innovate, solve complex problems, and push the boundaries of robotics and software development.
                  </p>
                </motion.div>
              )}

              {/* LOCATION VIEW */}
              {currentView === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 lg:mt-6 w-full"
                >
                  <div className="relative h-[300px] lg:h-[380px] xl:h-[500px] w-full border border-yellow-400/50 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7753485018125!2d73.01406817580538!3d19.029618453425847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3eaaa53c4e3%3A0x9459161291e7ded5!2sTerna%20Engineering%20College!5e0!3m2!1sen!2sin!4v1769019592074!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Terna Engineering College Map"
                    />
                  </div>
                  <div className="mt-4 p-4 border border-white/10 bg-white/5">
                    <p className="text-yellow-400 font-bold uppercase tracking-wider mb-1 text-base lg:text-lg">
                      Target Coordinates Acquired
                    </p>
                    <p className="text-gray-300 text-sm lg:text-base">
                      📍 Terna Engineering College, Nerul, Navi Mumbai
                    </p>
                  </div>
                </motion.div>
              )}

              {/* EVENTS VIEW */}
              {currentView === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 lg:mt-6 w-full"
                >
                  {/* MAIN IMAGE CONTAINER */}
                  <div className="relative w-full h-[300px] lg:h-[360px] xl:h-[520px] border border-white/10 overflow-hidden bg-zinc-900 group">
                    <div className="absolute top-4 left-4 z-30">
                      <div className="bg-black/70 backdrop-blur px-3 py-1.5 border-l-4 border-yellow-400">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">
                          Event
                        </p>
                        <h3 className="text-base lg:text-lg font-bold text-yellow-400 uppercase tracking-wide">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {event.id === "innov8" ? (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm gap-4">
                        <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-center px-4">
                          Elite Hackathon Entry
                        </h4>
                        <a
                          href="https://innov-77.devfolio.co/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-yellow-400 text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-yellow-300 transition shadow-[0_0_20px_rgba(250,204,21,0.4)] cursor-pointer"
                        >
                          Register on Devfolio
                        </a>
                        <p className="text-[10px] text-gray-400 uppercase mt-2"></p>
                      </div>
                    ) : (
                      <button
                        onClick={() => openModal()}
                        className="absolute z-20 bottom-4 right-4 bg-yellow-400 text-black px-5 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-bold uppercase tracking-widest hover:bg-yellow-300 transition shadow-[0_0_20px_rgba(250,204,21,0.4)] cursor-pointer"
                      >
                        Register
                      </button>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={event.image}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                      >
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* THUMBNAILS - SCROLLABLE CONTAINER */}
                  {/* UPDATED: Removed scrollbar-hide, added cyber-scrollbar class */}
                  <div className="hidden lg:flex gap-3 mt-4 justify-start overflow-x-auto p-2 cyber-scrollbar w-full max-w-full">
                    {EVENTS.map((e, index) => (
                      <button
                        key={e.id}
                        onClick={() => setActiveEventIndex(index)}
                        className={`relative flex-shrink-0 h-[60px] w-[100px] xl:h-[90px] xl:w-[160px] overflow-hidden border-2 transition-all ${activeEventIndex === index
                          ? "border-yellow-400 scale-105 z-10 shadow-lg"
                          : "border-white/20 opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                      >
                        <Image src={e.image} alt={e.title} fill className="object-cover" />
                        {activeEventIndex !== index && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* EVENT CONTENT TEXT */}
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 max-w-[720px]"
                  >
                    <h3 className="text-xl text-yellow-400 font-bold mb-2 lg:hidden">
                      {event.title}
                    </h3>
                    {event.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
}