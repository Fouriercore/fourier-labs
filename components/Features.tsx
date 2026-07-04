/**
 * Features component mapping the capabilities of the threat shield ecosystem.
 */
import React from "react";
import { 
  ShieldCheck, 
  Terminal, 
  Eye, 
  Users, 
  Wallet, 
  Lock 
} from "lucide-react";
import Container from "./ui/Container";

export const Features: React.FC = () => {
  const items = [
    {
      icon: Eye,
      title: "Real-Time Telemetry Check",
      desc: "Instantly compare target smart contracts against compiled databases of reported exploits, backdoors, phishing attempts, and rug pulls.",
      badge: "Active",
    },
    {
      icon: Terminal,
      title: "Developer First APIs",
      desc: "Integrate contract verification directly into your CLI, testing scripts, or build processes using our lightweight REST API endpoints.",
      badge: "Active",
    },
    {
      icon: Users,
      title: "Community Reporting",
      desc: "Empower Soroban users to submit contracts, verify sources, and flags anomalies. Decentralized verification ensures accurate status records.",
      badge: "Phase 3",
    },
    {
      icon: Wallet,
      title: "Wallet Safety Layers",
      desc: "Future extensions will warn users within popular wallets BEFORE confirming sign operations, preventing accidental authorization.",
      badge: "Phase 4",
    },
    {
      icon: ShieldCheck,
      title: "Open Threat Database",
      desc: "Fully open-source, reproducible logic. Fourier believes security database infrastructure must remain transparent and public domain.",
      badge: "MIT Licensed",
    },
    {
      icon: Lock,
      title: "Reputation Engine",
      desc: "Automated analysis heuristics running bytecode verification, administrative permission evaluations, and transfer flow audits.",
      badge: "Phase 3",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-white/5 bg-black relative">
      <Container className="space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#06fec8] font-bold uppercase tracking-widest text-glow-cyan">
            Security Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Comprehensive Smart Contract Shield
          </h2>
          <p className="text-xs font-mono text-gray-500 leading-relaxed">
            Protecting users and developers from transaction-level exploits through automated threat telemetry and open validation networks.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="group relative glass-panel border-white/5 p-6 rounded-xl hover:border-[#06fec8]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,254,200,0.05)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-[#06fec8]/5 group-hover:bg-[#06fec8]/10 blur-xl transition-all duration-300" />
                
                <div className="space-y-4">
                  {/* Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black border border-[#06fec8]/15 text-[#06fec8] group-hover:border-[#06fec8]/40 group-hover:shadow-[0_0_10px_rgba(6,254,200,0.2)] transition-all duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#06fec8] bg-[#06fec8]/5 border border-[#06fec8]/20 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;
