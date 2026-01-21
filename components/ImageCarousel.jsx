"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA ---
const EVENTS = [
  {
    id: "hackathon",
    title: "Offline Hackathon",
    image: "/hack.png",
    content: (
      <>
        <p className="text-lg sm:text-xl">
          Participants who qualify from the first round advance to an
          <span className="text-yellow-400"> offline hackathon</span> held at a
          designated location.
        </p>
        <p className="mt-4 text-lg sm:text-xl">
          Teams receive domain-specific problem statements and build real
          solutions under time pressure.
        </p>
        <ul className="mt-4 space-y-1 text-yellow-400 text-lg sm:text-xl">
          <li>• App / Web Development</li>
          <li>• AI / Machine Learning</li>
          <li>• Web3</li>
          <li>• AR / VR Development</li>
        </ul>
      </>
    ),
  },
  {
    id: "roborace",
    title: "Robo Race",
    image: "/car.png",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Design. Drive. Conquer.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Robo Race is a high-speed robotics competition where precision,
          control, and mechanical excellence decide victory.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Robots must navigate complex tracks packed with turns, obstacles, and
          surprises — racing against both time and opponents.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Tests mechanical design, electronics, motor control, sensors, teamwork,
          and real-time decision making.
        </p>
      </>
    ),
  },
  {
    id: "robosoccer",
    title: "Robo Soccer",
    image: "/sco.png",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Build. Strategize. Score.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Robo Soccer is a fast-paced robotics challenge combining engineering
          with intelligent gameplay.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Robots must dribble, pass, defend, and score in a dynamic arena where
          coordination and strategy define success.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Focuses on control systems, sensor integration, automation, and
          real-time team strategy.
        </p>
      </>
    ),
  },
  {
    id: "project",
    title: "Project Competition",
    image: "/pro.png",
    content: (
      <>
        <p className="font-semibold text-yellow-400 text-lg sm:text-xl">
          Where Ideas Turn Into Innovation
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          A flagship technical event for students to transform ideas into
          working models or software solutions.
        </p>
        <p className="mt-3 text-lg sm:text-xl">
          Participants present their projects before expert judges from
          academia and industry.
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Encourages innovation, teamwork, practical learning, and healthy
          competition.
        </p>
      </>
    ),
  },
];

export default function MissionBriefing() {
  // View state: 'events' | 'objective' | 'location'
  const [currentView, setCurrentView] = useState("events");
  // Which event is selected inside the 'events' view
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const event = EVENTS[activeEventIndex];

  return (
    <section className="relative w-full bg-black py-20 min-h-screen text-white">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* --- MOBILE NAVIGATION --- */}
        <div className="flex flex-col lg:hidden mb-8 space-y-4">
            {/* Top Level Nav (Objective | Location | Events) */}
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

            {/* Sub-nav for Events (Only visible if 'events' view is active) */}
            {currentView === "events" && (
                <div className="flex flex-wrap gap-3">
                    {EVENTS.map((e, i) => (
                    <button
                        key={e.id}
                        onClick={() => setActiveEventIndex(i)}
                        className={`
                        uppercase text-xs sm:text-sm tracking-wider px-2 py-1 border transition
                        ${
                            activeEventIndex === i
                            ? "border-yellow-400 text-yellow-400"
                            : "border-white/20 text-gray-500"
                        }
                        `}
                    >
                        {e.title}
                    </button>
                    ))}
                </div>
            )}
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">
          
          {/* LEFT PANEL (Navigation) */}
          <div className="hidden lg:block">
            <h2 className="text-[56px] sm:text-[64px] lg:text-[72px] font-extrabold leading-tight uppercase tracking-widest">
              Mission<br />Briefing
            </h2>

            <div className="mt-10 flex flex-col items-start gap-6 text-base sm:text-lg uppercase tracking-wider">
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
                Target Location
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

          {/* RIGHT PANEL (Dynamic Content Area) */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* --- VIEW 1: OBJECTIVE --- */}
              {currentView === "objective" && (
                <motion.div
                  key="objective"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="relative h-[260px] sm:h-[360px] lg:h-[520px] border border-white/10 bg-zinc-900 flex items-center justify-center overflow-hidden">
                     {/* Decorative BG */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black opacity-40" />
                     
                     <div className="z-10 text-center px-6 max-w-2xl">
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 mb-6 tracking-tight">MISSION OBJECTIVE</h3>
                        <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                            To gather the brightest minds in engineering and technology, challenging them to innovate, solve complex problems, and push the boundaries of robotics and software development.
                        </p>
                        <div className="mt-8 flex justify-center gap-2">
                           <span className="block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                           <span className="block w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-75"></span>
                           <span className="block w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></span>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {/* --- VIEW 2: LOCATION (MAP) --- */}
              {currentView === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <div className="relative h-[260px] sm:h-[360px] lg:h-[520px] w-full border border-yellow-400/50 overflow-hidden">
                 
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

              {/* --- VIEW 3: EVENTS LIST --- */}
              {currentView === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* MAIN EVENT IMAGE */}
                  <div className="relative h-[260px] sm:h-[360px] lg:h-[520px] border border-white/10 overflow-hidden bg-zinc-900">
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
                        <div className="absolute inset-0 bg-black/30" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* THUMBNAILS (Desktop Only) */}
                  <div className="hidden lg:flex gap-4 mt-6">
                    {EVENTS.map((e, index) => (
                      <button
                        key={e.id}
                        onClick={() => setActiveEventIndex(index)}
                        className={`
                          relative h-[90px] w-[160px] overflow-hidden border-2 transition-all
                          ${
                            activeEventIndex === index
                              ? "border-yellow-400"
                              : "border-white/20 opacity-60 hover:opacity-100"
                          }
                        `}
                      >
                        <Image
                          src={e.image}
                          alt={e.title}
                          fill
                          className="object-cover"
                        />
                        {activeEventIndex !== index && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* EVENT DESCRIPTION CONTENT */}
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 max-w-[720px] text-base sm:text-lg leading-7 text-gray-300"
                  >
                     {/* Mobile Title for context */}
                     <h3 className="text-2xl sm:text-3xl lg:text-4xl text-yellow-400 font-bold mb-3 lg:hidden">{event.title}</h3>
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
