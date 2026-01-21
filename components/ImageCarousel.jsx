"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import RegistrationModal from "@/components/RegistrationModal";

// --- DATA ---
const EVENTS = [
  {
    id: "innov8",
    title: "INNOV8 4.0",
    image: "/innov8.png",
    date: "24-Hour Hackathon",
    prize: "₹60,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Flagship 24-hour hackathon
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Bring your coding skills, ideas, and adrenaline for an epic journey into the world of tech.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: Free
        </p>
      </>
    ),
  },
  {
    id: "robosoccer",
    title: "ROBO SOCCER",
    image: "/robosoccer.png",
    date: "9 FEB 2026",
    prize: "₹16,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Fast-paced robotics challenge
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Robots must dribble, pass, and shoot goals in a dynamic arena where engineering meets intelligent gameplay.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: ₹300 per team
        </p>
      </>
    ),
  },
  {
    id: "reversecoding",
    title: "REVERSE CODING",
    image: "/reversecoding.png",
    date: "9 FEB 2026",
    prize: "₹8,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Think backwards. Code smarter.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Reverse-engineer program outputs to deduce the underlying algorithm and write the correct code.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: ₹250 per team
        </p>
      </>
    ),
  },
  {
    id: "roborace",
    title: "ROBO RACE",
    image: "/roborace.png",
    date: "9 FEB 2026",
    prize: "₹16,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Design. Drive. Conquer.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          A thrilling robotics competition testing speed, precision, and control on a challenging track.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: ₹150 per individual
        </p>
      </>
    ),
  },
  {
    id: "cadcomp",
    title: "CAD COMP",
    image: "/cadcomp.png",
    date: "10 FEB 2026",
    prize: "₹4,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Technical design challenge
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Create accurate and innovative digital models using computer-aided design tools.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: ₹150 per individual
        </p>
      </>
    ),
  },
  {
    id: "paperweight",
    title: "PAPERWEIGHT",
    image: "/paperweight.png",
    date: "10 FEB 2026",
    prize: "₹4,000",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Imagine. Design. Impress.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Transform simple everyday objects into innovative, visually appealing, and practical products.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Registration: ₹200 per team
        </p>
      </>
    ),
  },
];

export default function MissionBriefing() {
  const [currentView, setCurrentView] = useState("events");
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0].title);

  const event = EVENTS[activeEventIndex];

  return (
    <section className="w-full bg-black py-20 text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* --- MOBILE NAVIGATION --- */}
        <div className="flex flex-col lg:hidden mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setCurrentView("objective")}
              className={`uppercase text-sm tracking-widest transition ${
                currentView === "objective" ? "text-yellow-400 font-bold" : "text-gray-400"
              }`}
            >
              Objective
            </button>
            <button
              onClick={() => setCurrentView("location")}
              className={`uppercase text-sm tracking-widest transition ${
                currentView === "location" ? "text-yellow-400 font-bold" : "text-gray-400"
              }`}
            >
              Location
            </button>
            <button
              onClick={() => setCurrentView("events")}
              className={`uppercase text-sm tracking-widest transition ${
                currentView === "events" ? "text-yellow-400 font-bold" : "text-gray-400"
              }`}
            >
              Events
            </button>
          </div>

          {currentView === "events" && (
            <div className="flex flex-wrap gap-3">
              {EVENTS.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setActiveEventIndex(i)}
                  className={`uppercase text-xs sm:text-sm tracking-wider px-2 py-1 border transition ${
                    activeEventIndex === i
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

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">

          {/* LEFT PANEL (Desktop) */}
          <div className="hidden lg:flex flex-col">
            <h2 className="text-[72px] font-extrabold leading-tight uppercase tracking-widest">
              Mission<br />Briefing
            </h2>
            <div className="mt-10 flex flex-col gap-6 text-lg uppercase tracking-wider">
              <button
                onClick={() => setCurrentView("objective")}
                className={`w-full text-left border-b pb-2 transition-colors ${
                  currentView === "objective"
                    ? "border-yellow-400 text-yellow-400"
                    : "border-white/20 text-gray-400 hover:text-white"
                }`}
              >
                Objective
              </button>
              <button
                onClick={() => setCurrentView("location")}
                className={`w-full text-left border-b pb-2 transition-colors ${
                  currentView === "location"
                    ? "border-yellow-400 text-yellow-400"
                    : "border-white/20 text-gray-400 hover:text-white"
                }`}
              >
                Location
              </button>
              <button
                onClick={() => setCurrentView("events")}
                className={`w-full text-left border-b pb-2 transition-colors ${
                  currentView === "events"
                    ? "border-yellow-400 text-yellow-400"
                    : "border-white/20 text-gray-400 hover:text-white"
                }`}
              >
                Event Details
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative min-h-[600px] md:min-h-[740px] lg:min-h-[860px]">
            <AnimatePresence mode="wait">

              {/* OBJECTIVE */}
              {currentView === "objective" && (
                <motion.div
                  key="objective"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 max-w-[720px] text-base sm:text-lg leading-7 text-gray-300 min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]"
                >
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 mb-6 tracking-tight">
                    MISSION OBJECTIVE
                  </h3>
                  <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                    Gather the brightest minds in engineering and technology, challenge them to innovate, solve complex problems, and push the boundaries of robotics and software development.
                  </p>
                </motion.div>
              )}

              {/* LOCATION */}
              {currentView === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="relative h-[520px] w-full border border-yellow-400/50 overflow-hidden">
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
                  <div className="mt-6 p-4 border border-white/10 bg-white/5">
                    <p className="text-yellow-400 font-bold uppercase tracking-wider mb-1 text-lg sm:text-xl">
                      Target Coordinates Acquired
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg">
                      📍 Terna Engineering College, Nerul, Navi Mumbai, Maharashtra
                    </p>
                  </div>
                </motion.div>
              )}

              {/* EVENTS */}
              {currentView === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {/* MAIN IMAGE */}
                  <div className="relative w-full h-[520px] border border-white/10 overflow-hidden bg-zinc-900">
                    <button
                      onClick={() => {
                        setSelectedEvent(event.title);
                        setIsModalOpen(true);
                      }}
                      className="absolute z-20 bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-yellow-300 transition shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                    >
                      Register
                    </button>

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
                        <div className="absolute inset-0 bg-black/40" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* THUMBNAILS */}
                  <div className="hidden lg:flex gap-4 mt-6 justify-start">
                    {EVENTS.map((e, index) => (
                      <button
                        key={e.id}
                        onClick={() => setActiveEventIndex(index)}
                        className={`relative h-[90px] w-[160px] overflow-hidden border-2 transition-all ${
                          activeEventIndex === index
                            ? "border-yellow-400"
                            : "border-white/20 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={e.image} alt={e.title} fill className="object-cover" />
                        {activeEventIndex !== index && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* EVENT CONTENT */}
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 max-w-[720px] text-base sm:text-lg leading-7 text-gray-300"
                  >
                    <h3 className="text-3xl text-yellow-400 font-bold mb-2 lg:hidden">
                      {event.title} - {event.date} | PRIZE: {event.prize}
                    </h3>
                    {event.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultEvent={selectedEvent}
      />
    </section>
  );
}
