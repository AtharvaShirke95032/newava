"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const sponsors = [
    { name: 'Sponsor 1', logo: '/logo2.png' }, // Placeholder logos
    { name: 'Sponsor 2', logo: '/logo2.png' },
    { name: 'Sponsor 3', logo: '/logo2.png' },
    { name: 'Sponsor 4', logo: '/logo2.png' },
];

export default function Sponsors() {
    return (
        <section className="relative w-full py-20 bg-black overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-6xl font-black text-yellow-400 uppercase tracking-tighter mb-4" style={{ fontFamily: '"VT323", monospace' }}>
                        Mission Partners
                    </h2>
                    <div className="h-1 w-24 bg-yellow-400 mx-auto" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-80">
                    {sponsors.map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative w-32 h-16 sm:w-40 sm:h-20 grayscale hover:grayscale-0 transition-all duration-300 filter"
                        >
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
