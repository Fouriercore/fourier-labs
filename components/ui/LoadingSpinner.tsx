/**
 * LoadingSpinner component displayed during background telemetry analysis.
 * Features a smooth CSS rotation animation.
 */
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className, 
  size = 24, 
  label = "Decrypting reputation records..." 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-8 text-center", className)}>
      <Loader2 
        className="animate-spin text-cyan-400" 
        style={{ width: size, height: size }} 
      />
      {label && (
        <span className="font-mono text-xs text-gray-500 tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
