/**
 * Core type definitions for Fourier reputation registry and scanning telemetry schemas.
 */
export type RiskStatus = "safe" | "unknown" | "scam";

export type RiskSeverity = "none" | "low" | "medium" | "high" | "critical";

export type RiskCategory = 
  | "none"
  | "rug_pull" 
  | "fake_token" 
  | "phishing" 
  | "exploit" 
  | "spam";

export interface Contract {
  address: string;
  name?: string;
  status: RiskStatus;
  reason: string;
  riskLevel: RiskSeverity;
  confidence: number; // percentage value 0-100
  category: RiskCategory;
  lastUpdated: string; // ISO date string
}

export interface RiskResponse {
  address: string;
  status: RiskStatus;
  reason: string;
  riskLevel: RiskSeverity;
  confidence: number;
  category: RiskCategory;
  lastUpdated: string;
}

export interface APIResponse {
  success: boolean;
  data?: RiskResponse;
  error?: string;
}

export interface SearchResult {
  contract: Contract | null;
  searchedAddress: string;
  isValidAddress: boolean;
}
