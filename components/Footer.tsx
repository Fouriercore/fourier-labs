/**
 * Global layout footer component.
 * Displays brand info, resources links, community links, and copyright signatures.
 */
import React from "react";
import Link from "next/link";
import { Github, Shield, Heart } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Container from "./ui/Container";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-cyber-gray-950 py-12 relative overflow-hidden">
      {/* Decorative background pulse */}
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-950/5 blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Logo size={140} />
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              The trust and reputation layer for the Soroban ecosystem. Open source threat intelligence protecting Stellar transaction signers.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-gray-500 tracking-wider">
                THREAT_FEED: ONLINE (v0.1.0)
              </span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-gray-300 uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs#api" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Public API
                </Link>
              </li>
              <li>
                <a 
                  href="https://soroban.stellar.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Soroban Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Developer / Social */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-gray-300 uppercase mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Fouriercore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Organization
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  About Mission
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Fouriercore/fourier-labs/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Shield className="h-4 w-4 text-emerald-500" />
                  Security Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 font-mono">
            <span>&copy; {currentYear} Fouriercore.</span>
            <span>Released under MIT License.</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for the Soroban Ecosystem</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
