/**
 * Fallback 404 page styled with a dark terminal terminal-theme.
 */
import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center py-16 md:py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Red accent warning glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-red-950/15 blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-xl text-center space-y-8">
        
        {/* Terminal Header */}
        <div className="glass-panel border-red-500/20 bg-red-950/5 rounded-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950/30 border border-red-500/20 text-red-400 animate-pulse">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-mono text-base font-extrabold text-red-400 tracking-widest uppercase">
              [ERROR: CODE_404]
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-white font-display">
              Resource Not Located
            </h2>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              The endpoint, route parameters, or database record you requested does not exist or has been relocated to prevent vulnerability loops.
            </p>
          </div>

          {/* Console Shell Simulation */}
          <div className="bg-black border border-white/5 rounded-lg p-4 font-mono text-left text-xs space-y-1 text-gray-500 select-none">
            <div><span className="text-[#06fec8]">$</span> fourier check --path /unknown</div>
            <div className="text-red-400">Error: Path is not defined in route tables.</div>
            <div><span className="text-[#06fec8]">$</span> fourier diag status</div>
            <div>Status: System online. Threat monitor feed active.</div>
            <div className="text-white animate-[pulse_1s_infinite]">
              _ <span className="text-[10px] text-gray-600">(awaiting console feedback)</span>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] text-gray-300 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/[0.06] hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Terminal
          </Link>
        </div>

      </Container>
    </div>
  );
}
