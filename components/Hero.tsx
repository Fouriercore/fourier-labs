"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal } from "lucide-react";
import Container from "./ui/Container";

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-40 md:pt-36 md:pb-56 bg-black">
      {/* 1. Background Vertical Columns Grid */}
      <div className="vertical-columns opacity-30" />
      
      {/* 2. Cyber Mesh Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* 3. Central Lime-Green Blur Backdrop (#d3f920) */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[550px] blur-lime-glow opacity-40 pointer-events-none" />

      {/* 4. Secondary Cyan-Teal Glow Blur */}
      <div className="absolute top-[30%] left-1/3 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-[#06fec8]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center space-y-10">
        
        {/* Large Display Headline */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.2] font-display"
          >
            Smart contract <span className="text-white">reputation</span>
            <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#06fec8] via-[#04ed16] to-[#d3f920] text-glow-cyan">
              made simple for
            </div>
            <div className="mt-2 text-white">Soroban signers</div>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Scan transaction targets instantly. Identify exploits, fee backdoors, and rug pulls before committing key signatures to the Stellar network.
          </motion.p>
        </div>

        {/* CTA Buttons - Styled as Rounded Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06fec8] to-[#04ed16] text-black px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,254,200,0.5)] hover:scale-105 cursor-pointer"
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            Check Contract
          </button>
          
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] text-gray-300 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <Terminal className="h-4.5 w-4.5 text-[#06fec8]" />
            View API Docs
          </Link>
        </motion.div>

        {/* Dynamic Telemetry Metrics Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/5 relative z-10"
        >
          {[
            { label: "MONITOR FEED STATUS", val: "ONLINE", color: "text-[#04ed16] text-glow-green" },
            { label: "TELEMETRY CODES INDEXED", val: "1,248", color: "text-white" },
            { label: "VERIFIED SECURE TARGETS", val: "4,912", color: "text-[#06fec8] text-glow-cyan" },
            { label: "AVERAGE RESPONSE SPEED", val: "~4ms", color: "text-[#d3f920] text-glow-lime" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1 p-4 glass-panel border-white/5 rounded-xl">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-semibold">
                {item.label}
              </span>
              <span className={`font-mono text-lg font-bold ${item.color}`}>
                {item.val}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* 5. Glowing Crescent Arc globe at the bottom of the section */}
      <div className="crescent-globe" />
    </section>
  );
};

export default Hero;
