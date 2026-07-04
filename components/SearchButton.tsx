/**
 * Interactive button containing search status transitions and loading indicators.
 */
import React from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";

interface SearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isValid: boolean;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  isLoading,
  isValid,
  className,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || !isValid}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm font-bold uppercase tracking-wider px-5 py-3 transition-all duration-300 select-none",
        isValid && !isLoading
          ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer"
          : "bg-gray-800 text-gray-500 border border-white/5 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Analyzing...
        </>
      ) : (
        <>
          <ShieldCheck className="h-4 w-4" />
          Check Contract
        </>
      )}
    </button>
  );
};

export default SearchButton;
