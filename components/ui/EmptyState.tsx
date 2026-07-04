/**
 * EmptyState component displayed when no scan result is active.
 * Prompts the user to search for a contract address.
 */
import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Awaiting Address Verification",
  message = "Paste a Soroban contract address in the scanner above to query Fouriercore threat intelligence databases. Verified results will generate here.",
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-panel border-white/5 flex flex-col items-center justify-center p-8 text-center rounded-xl min-h-[220px]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-cyan-400/60 mb-4">
        <Search className="h-5 w-5" />
      </div>
      
      <h3 className="font-mono text-sm font-semibold tracking-wider text-gray-300 mb-1.5">
        {title}
      </h3>
      
      <p className="text-xs text-gray-500 max-w-sm font-mono leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
