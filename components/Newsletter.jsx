"use client";

import Image from "next/image";
import { useState } from "react";

export default function AvalonNewsletter() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="w-full bg-[#fcee0a] flex flex-col items-center px-6 py-16 text-black">
      
      {/* ICON */}
      <div className="mb-8">
        <img
          src="/war.svg"
          alt="Avalon Tech Fest"
          className="w-20 h-20"
        />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl font-bold uppercase text-center tracking-wide mb-4">
        Sign up for the official Avalon Tech Fest newsletter!
      </h2>

      {/* DESCRIPTION */}
      <p className="max-w-2xl text-center text-sm sm:text-base mb-10">
        Stay updated with the latest announcements, events, workshops, and
        competitions from Avalon Tech Fest. From innovation to imagination —
        don’t miss a thing!
      </p>

      {/* FORM */}
      <form
        className="w-full max-w-xl flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* EMAIL INPUT */}
        <div className="relative">
          <label className="block text-xs font-semibold mb-2 uppercase">
            Enter your email address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-black outline-none py-2 text-lg placeholder-black/60 focus:border-black"
            placeholder="you@example.com"
          />
        </div>

        {/* CHECKBOX */}
        <div className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            required
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 accent-black"
          />
          <p className="leading-relaxed">
            I would like to receive updates, event details, special announcements,
            and other information related to Avalon Tech Fest. I confirm that I am
            16 years old or older.
            <br /><br />
            <span className="text-xs">
              Avalon Tech Fest will be responsible for your personal data. For more
              information, please check our{" "}
              <a
                href="#"
                className="underline font-semibold"
                target="_blank"
              >
                Privacy Policy
              </a>
              .
            </span>
            <br /><br />
            <span className="text-xs">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </span>
          </p>
        </div>

        {/* SUBMIT */}
        <button
          disabled={!email || !accepted}
          className="mt-4 bg-black text-[#fcee0a] py-3 font-bold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-900 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
