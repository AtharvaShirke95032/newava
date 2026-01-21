"use client";

import { useState } from "react";
import Image from "next/image";

const EVENTS = [
  {
    title: "Offline Hackathon",
    image: "/one.jpg",
    content: (
      <>
        <p>
          Qualified teams advance to an <span className="text-yellow-400">offline hackathon</span>
          where they solve real-world problems.
        </p>
        <ul className="mt-4 space-y-1 text-yellow-400">
          <li>• App / Web Development</li>
          <li>• AI / ML</li>
          <li>• Web3</li>
          <li>• AR / VR</li>
        </ul>
      </>
    ),
  },
  {
    title: "Robo Race",
    image: "/two.jpg",
    content: (
      <>
        <p className="text-yellow-400 font-semibold">Design. Drive. Conquer.</p>
        <p className="mt-3">
          High-speed robotics competition testing precision, control,
          and engineering excellence.
        </p>
      </>
    ),
  },
  {
    title: "Robo Soccer",
    image: "/three.jpg",
    content: (
      <>
        <p className="text-yellow-400 font-semibold">Build. Strategize. Score.</p>
        <p className="mt-3">
          Robots compete in fast-paced soccer matches requiring
          coordination and real-time strategy.
        </p>
      </>
    ),
  },
  {
    title: "Project Competition",
    image: "/one.jpg",
    content: (
      <>
        <p className="text-yellow-400 font-semibold">
          Where Ideas Turn Into Innovation
        </p>
        <p className="mt-3">
          Showcase innovative hardware or software projects
          before expert judges.
        </p>
      </>
    ),
  },
];

export default function MissionBriefing() {
  const [active, setActive] = useState(0);
  const event = EVENTS[active];

  return (
    <section className="w-full bg-black py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">

        {/* MOBILE TAB BAR */}
        <div className="flex gap-4 overflow-x-auto border-b border-white/10 pb-4 mb-10 lg:hidden">
          {EVENTS.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`uppercase text-sm tracking-widest whitespace-nowrap ${
                active === i ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              {e.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">

          {/* LEFT PANEL (DESKTOP ONLY) */}
          <div className="hidden lg:block text-white">
            <h2 className="text-5xl font-extrabold uppercase tracking-widest">
              Mission<br />Briefing
            </h2>
          </div>

          {/* RIGHT PANEL */}
          <div>
            {/* IMAGE */}
            <div className="relative h-[260px] sm:h-[360px] lg:h-[520px] border border-white/10 overflow-hidden">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* DESKTOP THUMBNAILS */}
            <div className="hidden lg:flex gap-4 mt-6">
              {EVENTS.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative h-[90px] w-[160px] border-2 overflow-hidden ${
                    active === i ? "border-yellow-400" : "border-white/20 opacity-60"
                  }`}
                >
                  <Image src={e.image} alt={e.title} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* TEXT */}
            <div className="mt-6 text-sm leading-6 text-gray-300 max-w-[720px]">
              {event.content}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
