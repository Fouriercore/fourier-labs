/**
 * ErrorState component displayed during scan or telemetry server failures.
 * Displays failure messages and offers retry actions.
 */
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/utils/cn";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "ANALYSIS_FAILURE",
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col items-center justify-center p-6 text-center border-red-500/20 rounded-xl bg-red-950/5",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 mb-4 animate-pulse">
        <AlertCircle className="h-6 w-6" />
      </div>
      
      <h3 className="font-mono text-sm font-bold tracking-wider text-red-400 mb-1">
        {title}
      </h3>
      
      <p className="text-xs text-gray-400 max-w-md mb-4 font-mono leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-950/20 px-3.5 py-1.5 font-mono text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:border-red-400 transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          Re-Analyze
        </button>
      )}
    </div>
  );
};

export default ErrorState;
