"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function RegistrationModal({ isOpen, onClose, defaultEvent = 'Offline Hackathon' }) {
    const EVENT_MEMBERS = {
        'Offline Hackathon': '2-4',
        'Robo Race': '2',
        'Robo Soccer': '3',
        'Project Competition': '3'
    };

    const [formData, setFormData] = useState({
        teamName: '',
        leadName: '',
        email: '',
        phone: '',
        members: EVENT_MEMBERS[defaultEvent], // default based on event
        college: '',
        event: defaultEvent,
        screenshot: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // Whenever event changes, update the members field
    const handleEventChange = (e) => {
        const selectedEvent = e.target.value;
        setFormData(prev => ({
            ...prev,
            event: selectedEvent,
            members: EVENT_MEMBERS[selectedEvent]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, screenshot: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();

            if (result.success) {
                setMessage('TRANSMISSION SUCCESSFUL. DATA UPLOADED.');
                setTimeout(onClose, 2000);
            } else {
                setMessage(`ERROR: ${result.error}`);
            }
        } catch (error) {
            setMessage('SYSTEM FAILURE: CONNECTION REFUSED');
        } finally {
            setIsSubmitting(false);
        }
    };

    // When defaultEvent changes from parent, update members
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            event: defaultEvent,
            members: EVENT_MEMBERS[defaultEvent]
        }));
    }, [defaultEvent]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-2xl bg-black border border-yellow-400 p-6 sm:p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors font-mono">[CLOSE]</button>

                        <h2 className="text-3xl font-bold text-yellow-400 mb-6 font-vt323 tracking-wider text-center glitch-text">OPERATIVE REGISTRATION</h2>

                        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="teamName" placeholder="TEAM DESIGNATION" onChange={handleChange} required className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors" />
                                <input name="leadName" placeholder="SQUAD LEADER" onChange={handleChange} required className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="email" name="email" placeholder="COMM LINK (EMAIL)" onChange={handleChange} required className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors" />
                                <input type="tel" name="phone" placeholder="FREQUENCY (PHONE)" onChange={handleChange} required className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="members" placeholder="SQUAD SIZE" value={formData.members} readOnly className="bg-white/5 border border-white/20 p-3 text-white cursor-not-allowed" />
                                <input name="college" placeholder="BASE OF OPERATIONS (COLLEGE)" onChange={handleChange} required className="bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors" />
                            </div>

                            <select name="event" value={formData.event} onChange={handleEventChange} className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors">
                                <option value="Offline Hackathon" className="bg-black">Offline Hackathon</option>
                                <option value="Robo Race" className="bg-black">Robo Race</option>
                                <option value="Robo Soccer" className="bg-black">Robo Soccer</option>
                                <option value="Project Competition" className="bg-black">Project Competition</option>
                            </select>

                            {/* PAYMENT & FILE UPLOAD */}
                            <div className="border border-yellow-400/30 p-4 bg-yellow-400/5">
                                <p className="text-yellow-400 font-bold mb-2 text-center tracking-widest uppercase">PAYMENT TERMINAL</p>
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                    <div className="relative w-32 h-32 border-2 border-white/20 p-1 bg-white">
                                        <Image
                                            src="/payment-qr.png"
                                            alt="Payment QR"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center sm:text-left space-y-1">
                                        <p className="text-xs text-gray-400 uppercase">SCAN TO TRANSFER CREDITS</p>
                                        <p className="text-sm font-bold text-white tracking-wider break-all">rajsalunke541@okhdfcbank</p>
                                        <p className="text-[10px] text-cyber-cyan uppercase mt-1">Indian Overseas Bank</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-white/20 border-dashed p-4 text-center cursor-pointer hover:border-yellow-400 transition-colors">
                                <label className="block w-full h-full cursor-pointer">
                                    <span className="text-gray-400">{formData.screenshot ? formData.screenshot.name : "UPLOAD TRANSACTION PROOF"}</span>
                                    <input type="file" name="screenshot" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 font-bold tracking-widest uppercase transition-all ${isSubmitting ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                                    }`}
                            >
                                {isSubmitting ? 'TRANSMITTING...' : 'INITIATE REGISTRATION'}
                            </button>

                            {message && (
                                <p className={`text-center mt-4 ${message.includes('ERROR') || message.includes('FAILURE') ? 'text-red-500' : 'text-green-400'}`}>
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
