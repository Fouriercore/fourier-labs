/**
 * SearchBar component containing contract input console validation and form submission.
 */
"use client";

import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle, AlertTriangle } from "lucide-react";
import { isValidSorobanAddress } from "@/utils/validation";
import { SearchButton } from "./SearchButton";

interface SearchBarProps {
  onSearch: (address: string) => void;
  isLoading: boolean;
  initialAddress?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  initialAddress = "",
}) => {
  const [address, setAddress] = useState(initialAddress);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(isValidSorobanAddress(address));
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid && !isLoading) {
      onSearch(address.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (!touched) {
      setTouched(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-3">
      <div className="relative flex flex-col md:flex-row items-stretch gap-2.5 rounded-lg bg-cyber-gray-900 border border-white/10 p-2 focus-within:border-[#06fec8]/50 focus-within:shadow-[0_0_20px_rgba(6,254,200,0.15)] transition-all duration-300">
        
        {/* Input Field Container */}
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3 text-gray-500">
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <input
            type="text"
            value={address}
            onChange={handleInputChange}
            placeholder="Paste Soroban contract address (e.g. CA3D5RW6ARYN...)"
            className="w-full bg-transparent pl-10 pr-4 py-3 font-mono text-sm text-white placeholder-gray-500 border-none outline-none focus:ring-0"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Action Button */}
        <SearchButton isLoading={isLoading} isValid={isValid} />
      </div>

      {/* Real-time Validation Feedback */}
      {touched && address.length > 0 && (
        <div className="flex items-center justify-between px-2 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            {isValid ? (
              <span className="flex items-center gap-1 text-[#04ed16] text-glow-green font-semibold">
                <CheckCircle className="h-3.5 w-3.5" />
                Valid address format
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#d3f920] text-glow-lime">
                <AlertTriangle className="h-3.5 w-3.5" />
                Format mismatch: Check character set (A-Z, 2-7) and prefix 'C'
              </span>
            )}
          </div>
          
          <div className="text-gray-500">
            <span className={address.length === 56 ? "text-[#06fec8] text-glow-cyan" : "text-gray-500"}>
              {address.length}
            </span>
            /56 characters
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
