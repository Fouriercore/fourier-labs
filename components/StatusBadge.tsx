/**
 * StatusBadge component rendering reputation verdicts (Safe, Unknown, Scam Alert).
 */
import React from "react";
import { ShieldCheck, AlertCircle, ShieldAlert } from "lucide-react";
import { RiskStatus } from "@/types";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
  status: RiskStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const configs = {
    safe: {
      text: "SAFE",
      icon: ShieldCheck,
      classes: "bg-[#04ed16]/5 border-[#04ed16]/20 text-[#04ed16] text-glow-green",
    },
    unknown: {
      text: "UNKNOWN",
      icon: AlertCircle,
      classes: "bg-[#d3f920]/5 border-[#d3f920]/20 text-[#d3f920] text-glow-lime",
    },
    scam: {
      text: "SCAM ALERT",
      icon: ShieldAlert,
      classes: "bg-red-950/10 border-red-500/20 text-red-400 text-glow-red animate-pulse",
    },
  };

  const current = configs[status];
  const IconComponent = current.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest",
        current.classes,
        className
      )}
    >
      <IconComponent className="h-3.5 w-3.5" />
      {current.text}
    </span>
  );
};

export default StatusBadge;
