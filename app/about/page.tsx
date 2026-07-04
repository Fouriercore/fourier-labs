import React from "react";
import type { Metadata } from "next";
import { Shield, Eye, Users, Cpu, ShieldAlert } from "lucide-react";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About Fourier | Fouriercore Security Ecosystem",
  description: "Learn about the mission behind Fourier, our open source philosophy, and the security architecture defending users in the Soroban smart contract network.",
};

/**
 * Renders the mission statement, problem space, and future development vectors.
 */
export default function AboutPage() {
  return (
    <div className="relative py-16 md:py-24 bg-black">
      {/* Visual cyber background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <Container className="space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs text-[#06fec8] text-glow-cyan font-bold uppercase tracking-widest block">
            Our Mission
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-display">
            Securing the Trust Layer of Stellar Soroban
          </h1>
          <p className="text-sm sm:text-base font-mono text-gray-400 leading-relaxed max-w-2xl">
            Fourier is built on the principle that decentralized networks require public, transparent, and auditable reputation tools to defend against dynamic threat signatures.
          </p>
        </div>

        {/* The Problem & The Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
          <div className="space-y-4 p-6 glass-panel border-red-500/10 bg-red-950/5 rounded-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/20 border border-red-500/20 text-red-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              The Security Gap
            </h2>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              Modern smart contract environments allow rapid deployment of trustless protocols. However, users are forced to "blindly sign" hex hashes of contract targets without understanding underlying security architectures. This gap exposes users to backdoors, sudden administrative rule shifts, and drain-vulnerabilities.
            </p>
          </div>

          <div className="space-y-4 p-6 glass-panel border-[#04ed16]/10 bg-[#04ed16]/5 rounded-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#04ed16]/5 border border-[#04ed16]/20 text-[#04ed16]">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              The Fourier Defense
            </h2>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              Fourier bridges the visibility gap. By querying transparent contract reputation logs directly from our client, SDKs, or wallet checks, transaction signers receive prompt alerts flagging scam profiles, code changes, or active security exploit states. Security telemetry is publicly auditable.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8 pt-8 border-t border-white/5">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
              Our Core Design Principles
            </h2>
            <p className="text-xs font-mono text-gray-500">
              How Fouriercore ensures reliability, privacy, and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Absolute Transparency",
                desc: "Every database entry, check heuristic, and severity indicator code remains publicly verifiable on GitHub. No closed doors."
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Vulnerability findings and contract reputations benefit from community reporting, peer reviews, and validator checks."
              },
              {
                icon: Cpu,
                title: "Soroban Native Integration",
                desc: "Engineered specifically for the Stellar WASM smart contract architecture. We adapt heuristics to match Soroban patterns."
              }
            ].map((principle, idx) => {
              const IconComponent = principle.icon;
              return (
                <div key={idx} className="space-y-3 p-5 glass-panel border-white/5 rounded-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black border border-[#06fec8]/15 text-[#06fec8]">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-400 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Scaling Block */}
        <div className="glass-panel border-[#06fec8]/15 rounded-2xl p-8 relative overflow-hidden bg-[#06fec8]/5">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-lg font-bold font-display tracking-wide text-white">
              Ecosystem Roadmap Graduation
            </h2>
            <p className="font-mono text-xs text-gray-300 leading-relaxed">
              Fourier is currently incubated as an open laboratory project inside the **Fouriercore** repository. As our reputation engine scales, we are designing community voting dashboards, wallet browser widgets, and automated security scanning pipelines.
            </p>
          </div>
        </div>

      </Container>
    </div>
  );
}
