"use client";

import React, { useState, useRef } from "react";
import { 
  Terminal, 
  GitBranch, 
  ArrowRight,
  ShieldCheck,
  FileCode
} from "lucide-react";
import Container from "@/components/ui/Container";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { RiskResponse } from "@/types";

/**
 * Homepage rendering the search portal workspace, telemetry console, and guide pillars.
 */
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchedAddress, setSearchedAddress] = useState("");
  
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = async (address: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSearchedAddress(address);

    try {
      const response = await fetch(`/api/check/${address}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to resolve contract safety data.");
      }

      setResult(data.data);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred while communicating with the telemetry server.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black">
      {/* 1. Hero Banner with Crescent Globe Horizon */}
      <Hero onCtaClick={scrollToSearch} />

      {/* 2. Core Search Console Workspace */}
      <div 
        ref={searchSectionRef}
        id="scanner-section"
        className="py-16 md:py-24 border-t border-white/5 relative bg-black"
      >
        <Container className="space-y-10">
          {/* Section Titles */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="font-mono text-xs text-[#06fec8] text-glow-cyan font-bold uppercase tracking-widest">
              Reputation Scanner
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              Analyze Soroban Contract
            </h2>
            <p className="text-xs font-mono text-gray-500">
              Query threat intelligence reports by pasting the contract address below.
            </p>
          </div>

          {/* SearchBar Input */}
          <SearchBar onSearch={handleSearch} isLoading={loading} initialAddress={searchedAddress} />

          {/* Search Results Display Area */}
          <div className="mt-8">
            {loading && (
              <div className="glass-panel border-white/5 max-w-3xl mx-auto rounded-xl p-8">
                <LoadingSpinner label="Querying threat indicators & scanning Base32 structures..." />
              </div>
            )}

            {!loading && error && (
              <ErrorState 
                message={error} 
                onRetry={() => handleSearch(searchedAddress)} 
              />
            )}

            {!loading && !error && result && (
              <ResultCard result={result} />
            )}

            {!loading && !error && !result && (
              <EmptyState />
            )}
          </div>
        </Container>
      </div>

      {/* 3. Features Pillars */}
      <Features />

      {/* 4. How Fourier Works */}
      <section className="py-16 md:py-24 border-t border-white/5 bg-black relative">
        <Container className="space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="font-mono text-xs text-[#06fec8] text-glow-cyan font-bold uppercase tracking-widest">
              Workflow Guide
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              How Fourier Secures Transactions
            </h2>
            <p className="text-xs font-mono text-gray-500">
              Three simple steps protect users from transaction vulnerability signatures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: FileCode,
                title: "Lookup Verification",
                desc: "Paste the compiled Stellar Soroban contract hex key into the query engine. The lookup is completely private."
              },
              {
                step: "02",
                icon: Terminal,
                title: "Threat Audits",
                desc: "Fourier inspects compiled databases, checks verified code repositories, checks admin fee hooks, and assesses risk signatures."
              },
              {
                step: "03",
                icon: ShieldCheck,
                title: "Signing Verdict",
                desc: "Receive clear telemetry indicators. Safe contracts proceed, warnings signal caution, scams block transaction confirmation."
              }
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="relative glass-panel border-white/5 p-6 rounded-xl space-y-4">
                  <div className="absolute top-4 right-4 font-mono text-3xl font-bold text-white/5">
                    {step.step}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black border border-[#06fec8]/15 text-[#06fec8]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Open Source Collaboration Section */}
      <section className="py-16 md:py-24 border-t border-white/5 bg-black relative">
        <Container>
          <div className="glass-panel border-[#06fec8]/15 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-black">
            
            {/* Visual accent background block */}
            <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-cyan-950/10 blur-2xl pointer-events-none" />

            <div className="space-y-4 max-w-xl relative z-10">
              <span className="font-mono text-xs text-[#06fec8] text-glow-cyan font-bold uppercase tracking-widest flex items-center gap-1.5">
                <GitBranch className="h-4 w-4" />
                Collaborative Defense
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
                Designed for Open Source Contributions
              </h2>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">
                Reputation metadata and security telemetry belong to the community. Contribute contract signatures, submit reports, or review the scanning engine.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full sm:w-auto">
              <a
                href="https://github.com/Fouriercore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gray-200"
              >
                Join Organization
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/docs#contributing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] text-gray-300 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/[0.06] transition-all duration-300"
              >
                Contribution Guide
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
