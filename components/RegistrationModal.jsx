"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

export default function RegistrationModal({ isOpen, onClose, defaultEvent = "" }) {
  const EVENT_DETAILS = {
    "ROBO RACE": { members: "2-4", amount: 400 },
    "ROBO SOCCER": { members: "2-4", amount: 300 },
    "PROJECT COMPETITION": { members: "2-4", amount: 400 },
    "REVERSE CODING": { members: "2", amount: 250 },
    "CAD COMP": { members: "1", amount: 150 },
    "PAPERWEIGHT": { members: "2-4", amount: 200 },
  };

  const [formData, setFormData] = useState({
    teamName: "",
    leadName: "",
    email: "",
    phone: "",
    members: "",
    college: "",
    event: defaultEvent || "",
    screenshot: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Update members whenever the modal opens or event changes
  useEffect(() => {
    if (isOpen && formData.event) {
      setFormData((prev) => ({
        ...prev,
        members: EVENT_DETAILS[formData.event]?.members || "",
      }));
    }
  }, [isOpen, formData.event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, screenshot: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      const res = await fetch("/api/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setMessage("TRANSMISSION SUCCESSFUL. DATA UPLOADED.");
        setTimeout(onClose, 2000);
      } else {
        setMessage(`ERROR: ${result.error}`);
      }
    } catch (err) {
      setMessage("SYSTEM FAILURE: CONNECTION REFUSED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiId = "payalandhale2005@okicici";
  const amount = EVENT_DETAILS[formData.event]?.amount || 0;
  const upiString =
    amount > 0
      ? `upi://pay?pa=${upiId}&pn=TechFest+Avalon&am=${amount}&cu=INR`
      : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl bg-black border border-yellow-400 p-4 sm:p-6 md:p-8 relative overflow-hidden rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors font-mono z-10"
            >
              [CLOSE]
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 font-vt323 tracking-wider text-center glitch-text">
              OPERATIVE REGISTRATION
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm sm:text-base">
              {/* Team & Leader */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="teamName"
                  placeholder="TEAM DESIGNATION"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                />
                <input
                  name="leadName"
                  placeholder="SQUAD LEADER"
                  value={formData.leadName}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="COMM LINK (EMAIL)"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="FREQUENCY (PHONE)"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                />
              </div>

              {/* Event Selector & Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                >
                  <option value="" disabled>
                    SELECT MISSION
                  </option>
                  {Object.keys(EVENT_DETAILS).map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="members"
                  value={formData.members}
                  disabled
                  className="bg-white/10 border border-white/20 p-3 text-gray-400 cursor-not-allowed w-full"
                />
              </div>

              {/* College */}
              <input
                name="college"
                placeholder="BASE OF OPERATIONS (COLLEGE)"
                value={formData.college}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
              />

              {/* Transaction Proof Upload */}
              <div className="border border-white/20 border-dashed p-4 text-center cursor-pointer hover:border-yellow-400 transition-colors">
                <label className="block w-full h-full cursor-pointer">
                  <span className="text-gray-400">
                    {formData.screenshot ? formData.screenshot.name : "UPLOAD TRANSACTION PROOF"}
                  </span>
                  <input
                    type="file"
                    name="screenshot"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* PAYMENT QR */}
              {amount > 0 && (
                <div className="border border-yellow-400/30 p-4 bg-yellow-400/5 text-center rounded-md">
                  <p className="text-yellow-400 font-bold mb-2 text-center tracking-widest uppercase">
                    PAYMENT TERMINAL
                  </p>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <QRCodeCanvas value={upiString} size={200} level="H" />
                    <p className="text-white font-bold tracking-wider">
                      UPI ID: {upiId} | ₹{amount}
                    </p>
                    <p className="text-xs text-gray-400 uppercase">
                      Scan to transfer credits
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 font-bold tracking-widest uppercase transition-all ${
                  isSubmitting
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                }`}
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIATE REGISTRATION"}
              </button>

              {message && (
                <p
                  className={`text-center mt-4 ${
                    message.includes("ERROR") || message.includes("FAILURE")
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
