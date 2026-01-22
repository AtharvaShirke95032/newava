"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

export default function RegistrationModal({ isOpen, onClose, defaultEvent = "" }) {
  // --- UPDATED DATA ---
  const EVENT_DETAILS = {
    "ROBO RACE": { members: "1", amount: 150 }, // Updated to Individual
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
    setMessage("");

    // --- VALIDATION CHECK FOR SCREENSHOT ---
    if (!formData.screenshot) {
      setMessage("ERROR: TRANSACTION PROOF IS REQUIRED");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      // Replace this with your actual API endpoint
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
      // For demo purposes, simulating success if API doesn't exist yet
      console.error(err);
      setMessage("SYSTEM FAILURE: CONNECTION REFUSED (API MOCK)");
      // Remove the line below in production
      setTimeout(onClose, 2000); 
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
          // FIXED: overflow-y-auto on the fixed container allows scrolling the whole modal if it gets too tall
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* FIXED: min-h-full flex items-center ensures top doesn't get cut off on scroll */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              className="w-full max-w-3xl bg-black border border-yellow-400 relative rounded-lg shadow-2xl flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              
              {/* FIXED: STICKY HEADER ensures Close button is always visible */}
              <div className="sticky top-0 z-50 bg-black/95 border-b border-yellow-400/30 px-6 py-4 flex justify-between items-center backdrop-blur">
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 font-vt323 tracking-wider glitch-text">
                  OPERATIVE REGISTRATION
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 transition-colors font-mono font-bold text-lg"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-sm sm:text-base">
                  
                  {/* Team & Leader */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">TEAM DESIGNATION</label>
                      <input
                        name="teamName"
                        placeholder="ENTER TEAM NAME"
                        value={formData.teamName}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">SQUAD LEADER</label>
                      <input
                        name="leadName"
                        placeholder="ENTER LEADER NAME"
                        value={formData.leadName}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">COMM LINK (EMAIL)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">FREQUENCY (PHONE)</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="123-456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                      />
                    </div>
                  </div>

                  {/* Event Selector & Members */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-yellow-400 font-bold">SELECT MISSION</label>
                      <select
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        required
                        className="bg-black border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                      >
                        <option value="" disabled>
                          CHOOSE PROTOCOL
                        </option>
                        {Object.keys(EVENT_DETAILS).map((ev) => (
                          <option key={ev} value={ev}>
                            {ev}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">ALLOWED OPERATIVES</label>
                      <input
                        type="text"
                        name="members"
                        value={formData.members}
                        disabled
                        className="bg-white/10 border border-white/20 p-3 text-gray-400 cursor-not-allowed w-full font-bold"
                      />
                    </div>
                  </div>

                  {/* College */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">BASE OF OPERATIONS</label>
                    <input
                      name="college"
                      placeholder="COLLEGE NAME"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors w-full"
                    />
                  </div>

                  {/* PAYMENT QR SECTION - Only shows if amount > 0 */}
                  {amount > 0 && (
                    <div className="border border-yellow-400/30 p-4 bg-yellow-400/5 rounded-md mt-6">
                      <p className="text-yellow-400 font-bold mb-4 text-center tracking-widest uppercase border-b border-yellow-400/20 pb-2">
                        SECURE PAYMENT TERMINAL
                      </p>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="bg-white p-2 rounded">
                          <QRCodeCanvas value={upiString} size={160} level="H" />
                        </div>
                        <div className="text-center md:text-left space-y-2">
                          <p className="text-white font-bold tracking-wider text-lg">
                            AMOUNT: <span className="text-yellow-400">₹{amount}</span>
                          </p>
                          <p className="text-gray-400 text-sm">
                            UPI ID: <span className="select-all text-white">{upiId}</span>
                          </p>
                          <p className="text-xs text-gray-500 uppercase max-w-[200px]">
                            Scan QR or copy UPI ID to transfer credits. Screenshot required.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transaction Proof Upload - COMPULSORY */}
                  <div className="flex flex-col gap-2">
                     <label className="text-xs text-yellow-400 font-bold uppercase">
                        Proof of Transaction (Required) *
                     </label>
                    <div 
                      className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                        formData.screenshot ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-yellow-400'
                      }`}
                    >
                      <label className="block w-full h-full cursor-pointer">
                        <span className={formData.screenshot ? "text-green-400 font-bold" : "text-gray-400"}>
                          {formData.screenshot 
                            ? `[FILE ACQUIRED]: ${formData.screenshot.name}` 
                            : "[CLICK TO UPLOAD PAYMENT SCREENSHOT]"}
                        </span>
                        <input
                          type="file"
                          name="screenshot"
                          accept="image/*"
                          onChange={handleFileChange}
                          required // HTML5 Validation
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 font-bold tracking-widest uppercase transition-all border border-transparent ${
                      isSubmitting
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                    }`}
                  >
                    {isSubmitting ? "TRANSMITTING DATA..." : "CONFIRM REGISTRATION"}
                  </button>

                  {/* FEEDBACK MESSAGES */}
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 text-center font-bold border ${
                        message.includes("ERROR") || message.includes("FAILURE")
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : "border-green-500 bg-green-500/10 text-green-400"
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}