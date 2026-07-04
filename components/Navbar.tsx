/**
 * Navigation Bar component.
 * Handles header layout, links to core pages, and mobile responsive menus.
 */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/utils/cn";
import Container from "./ui/Container";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Documentation", href: "/docs" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-cyber-gray-950/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo size={180} className="transition-transform duration-500 group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-300 hover:text-cyan-400 font-mono",
                    isActive ? "text-cyan-400 text-glow-cyan" : "text-gray-400"
                  )}
                >
                  {isActive && <span className="text-cyan-500 mr-1.5">&gt;</span>}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex p-2 text-gray-400 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="border-b border-white/5 bg-cyber-gray-950/95 py-4 backdrop-blur-lg md:hidden">
          <Container className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-2 py-1.5 text-base font-medium font-mono tracking-wide rounded-md hover:bg-cyan-950/10 hover:text-cyan-400",
                    isActive ? "text-cyan-400 bg-cyan-950/10 border-l-2 border-cyan-400" : "text-gray-400"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
