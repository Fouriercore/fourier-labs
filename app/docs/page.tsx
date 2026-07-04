import React from "react";
import type { Metadata } from "next";
import { BookOpen, Terminal, Code, Cpu, Eye } from "lucide-react";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Fourier Documentation | API & Architecture Guide",
  description: "Comprehensive guide to Fourier integration, contract telemetry endpoints, and the threat classification matrix for Soroban.",
};

/**
 * Renders technical guides, routing schemas, API documentation, and threat matrix lists.
 */
export default function DocsPage() {
  return (
    <div className="relative py-16 md:py-24 bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Quick Links Navigation */}
        <aside className="lg:col-span-1 space-y-6 hidden lg:block sticky top-24 self-start">
          <h3 className="font-mono text-xs font-bold tracking-widest text-[#06fec8] text-glow-cyan uppercase">
            Navigation
          </h3>
          <nav className="flex flex-col gap-3 font-mono text-xs">
            <a href="#overview" className="text-gray-400 hover:text-white transition-colors">&gt; Project Overview</a>
            <a href="#architecture" className="text-gray-400 hover:text-white transition-colors">&gt; Architecture</a>
            <a href="#classifications" className="text-gray-400 hover:text-white transition-colors">&gt; Threat Matrix</a>
            <a href="#api" className="text-gray-400 hover:text-white transition-colors">&gt; REST API Reference</a>
            <a href="#contributing" className="text-gray-400 hover:text-white transition-colors">&gt; Contributor Hub</a>
          </nav>
        </aside>

        {/* Documentation Content */}
        <main className="lg:col-span-3 space-y-16">
          
          {/* 1. Overview */}
          <section id="overview" className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#06fec8]" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                Project Overview
              </h1>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Fourier is an open contract reputation system tailored for the Soroban smart contract ecosystem on Stellar. It is designed to act as an intercept layer, helping signers determine contract safety attributes prior to signing transaction payloads.
            </p>
            <div className="p-4 glass-panel border-white/5 bg-white/[0.01] rounded-lg">
              <span className="font-mono text-xs font-bold text-white block mb-1">MVP Mechanics:</span>
              <p className="font-mono text-xs text-gray-500 leading-relaxed">
                The platform takes a contract address parameter, queries database states, validates checksums, and outputs three security levels: <span className="text-[#04ed16] text-glow-green">Safe</span>, <span className="text-[#d3f920] text-glow-lime">Unknown</span>, or <span className="text-red-400 text-glow-red">Scam Alert</span>.
              </p>
            </div>
          </section>

          {/* 2. Architecture */}
          <section id="architecture" className="space-y-4 border-t border-white/5 pt-10">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#06fec8]" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Architecture & Data Flow
              </h2>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Fourier's backend is designed to run statically using dynamic file reading during the MVP, decoupled cleanly to allow a PostgreSQL database or Supabase schema to swap in easily.
            </p>
            
            {/* Mermaid representation in text */}
            <div className="bg-black border border-white/5 rounded-lg p-5 font-mono text-xs text-gray-400 space-y-2.5">
              <div className="font-bold text-white">REPUTATION DATA PIPELINE:</div>
              <div className="flex flex-col gap-1 pl-4 text-[#06fec8] border-l border-white/10">
                <div>[User Interface / SDK Client]</div>
                <div className="text-gray-500 pl-4">└── Sends HTTP GET /api/check/[address]</div>
                <div>[Next.js Dynamic API Route Handler]</div>
                <div className="text-gray-500 pl-4">└── Invokes core checker helper checkContract()</div>
                <div>[Business Logic Layer (lib/checker.ts)]</div>
                <div className="text-gray-500 pl-4">└── Validates checksum format & queries JSON storage</div>
                <div>[JSON database file (data/contracts.json)]</div>
                <div className="text-gray-500 pl-4">└── Returns telemetry payload & status recommendation</div>
              </div>
            </div>
          </section>

          {/* 3. Threat Classification */}
          <section id="classifications" className="space-y-4 border-t border-white/5 pt-10">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#06fec8]" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Threat Matrix Classifications
              </h2>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              We monitor contract execution pathways and categorize anomalies into 5 risk groups:
            </p>

            <div className="space-y-3 font-mono text-xs">
              {[
                { cat: "Rug Pull", desc: "Developer keys preserve administrative overrides enabling minting backdoors or pool draining." },
                { cat: "Fake Token", desc: "Mimics authentic token names (e.g. USDC) but uses customized transfer rules that block withdrawals." },
                { cat: "Phishing", desc: "Web applications requesting signatures that compromise user keys or transfer account delegation." },
                { cat: "Exploit", desc: "A contract containing known code vulnerabilities (e.g. reentrancy) under active exploitation." },
                { cat: "Spam", desc: "Spammy claim processes distributing empty indicators that route high gas tolls to private pools." }
              ].map((matrix, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-white/[0.01] border border-white/5 rounded">
                  <span className="font-bold text-[#06fec8] min-w-[100px]">{matrix.cat}</span>
                  <span className="text-gray-400">{matrix.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. API Reference */}
          <section id="api" className="space-y-6 border-t border-white/5 pt-10">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-[#06fec8]" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                REST API Reference
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 bg-black border border-white/5 rounded-lg p-3">
                <span className="px-2 py-0.5 bg-[#06fec8]/5 border border-[#06fec8]/20 text-[#06fec8] text-xs font-mono font-bold rounded">
                  GET
                </span>
                <span className="font-mono text-xs text-gray-300">
                  /api/check/:address
                </span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-gray-300">URL Parameters</h4>
                <div className="font-mono text-xs text-gray-400 bg-white/[0.01] border border-white/5 p-3 rounded space-y-1">
                  <div><span className="text-[#06fec8]">address</span>: <span className="text-gray-500">string (Required)</span></div>
                  <div className="pl-4 text-gray-500">A 56-character Soroban contract address starting with 'C'.</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-gray-300">Response Payload Sample (Exploit Case)</h4>
                <pre className="bg-black border border-white/5 rounded-lg p-4 overflow-x-auto text-xs text-[#06fec8] font-mono">
{`{
  "success": true,
  "data": {
    "address": "CB3D5RW6ARYNMSND57NVHSTRW4CD6B4UQQE246TRPFR6CP6NJ2C7HACK",
    "status": "scam",
    "reason": "Vulnerable contract containing an unchecked reentrancy vulnerability. Active exploit payload detected in live transaction history draining user collateral.",
    "riskLevel": "critical",
    "confidence": 99,
    "category": "exploit",
    "lastUpdated": "2026-06-30T16:45:00Z"
  }
}`}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-gray-300">Error Payload Sample (Invalid Format)</h4>
                <pre className="bg-black border border-white/5 rounded-lg p-4 overflow-x-auto text-xs text-red-400 font-mono">
{`{
  "success": true,
  "data": {
    "address": "invalid-key-example",
    "status": "unknown",
    "reason": "Invalid Soroban contract address format. Contract addresses must start with 'C', be exactly 56 characters long, and use the Base32 uppercase alphabet (A-Z, 2-7).",
    "riskLevel": "medium",
    "confidence": 0,
    "category": "none",
    "lastUpdated": "2026-06-30T18:00:00.000Z"
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* 5. Contributing hub */}
          <section id="contributing" className="space-y-4 border-t border-white/5 pt-10 pb-12">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-[#06fec8]" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Contributing Framework
              </h2>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              We welcome code reviews, structural security analysis, and contract submissions. Fork our code directly, implement improvements, and submit a PR to our main branch. Check our repository root <span className="text-[#06fec8]">CONTRIBUTING.md</span> file for specific branch workflows.
            </p>
          </section>

        </main>
      </Container>
    </div>
  );
}
