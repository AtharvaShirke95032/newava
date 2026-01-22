import { Orbitron, Geist_Mono, VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Component } from "@/components/flickering-footer";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});



export const metadata = {
  title: "Avalon Techfest",
  description: "Terna Tech fest 2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${vt323.variable} font-sans antialiased dark`}
      >
        {/* <Navbar /> */}
        <Navbar/>
        {children}
        <Component/>
      </body>
    </html>
  );
}
