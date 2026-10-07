/**
 * Automated Fraud Score & Confidence Metric Calculation
 * Part of the Fourier threat intelligence engine.
 */

export interface ContractTelemetryMetrics {
  /**
   * Age of the contract or account in days (>= 0).
   * Older contracts have an established on-chain history and are considered more reliable.
   */
  accountAgeDays: number;

  /**
   * Number of historical on-chain transactions processed by the contract (>= 0).
   */
  historicalTransactions: number;

  /**
   * Number of community fraud or abuse reports submitted against this contract (>= 0).
   * Community reports penalize confidence and elevate risk severity.
   */
  communityReports: number;

  /**
   * Number of cryptographic verification signatures from trusted third-party security auditors (>= 0).
   */
  auditorSignatures: number;
}

export interface ScoringWeights {
  /** Baseline confidence granted prior to telemetry scoring (default: 15) */
  baseScore: number;
  /** Maximum score allocated to contract age maturity (default: 25) */
  ageWeight: number;
  /** Maximum score allocated to historical transaction volume (default: 25) */
  txWeight: number;
  /** Maximum score allocated to verified auditor signatures (default: 35) */
  auditorWeight: number;
  /** Deduction penalty applied per community fraud report (default: 20) */
  reportPenaltyPerUnit: number;
  /** Transaction volume saturation ceiling (default: 10,000) */
  txVolumeCeiling: number;
  /** Contract age maturity saturation threshold in days (default: 365) */
  ageSaturationDays: number;
}

export interface ConfidenceScoreBreakdown {
  /** Final calculated confidence percentage strictly bounded within [0, 100] */
  confidence: number;
  /** Base starting score */
  baseScore: number;
  /** Contribution from contract age */
  ageScore: number;
  /** Contribution from transaction volume */
  txScore: number;
  /** Contribution from trusted auditor verifications */
  auditorScore: number;
  /** Deducted points from community reports */
  reportPenalty: number;
  /** Unbounded raw score prior to [0, 100] clamping */
  rawScore: number;
  /** Whether the contract qualifies as a veteran contract (>= 180 days with healthy volume) */
  isVeteran: boolean;
  /** Whether the contract is brand new (< 14 days) */
  isNew: boolean;
}

export const DEFAULT_SCORING_WEIGHTS: Readonly<ScoringWeights> = Object.freeze({
  baseScore: 15,
  ageWeight: 25,
  txWeight: 25,
  auditorWeight: 35,
  reportPenaltyPerUnit: 20,
  txVolumeCeiling: 10_000,
  ageSaturationDays: 365,
});

/**
 * Sanitizes and validates a numerical input metric.
 * Disallows NaN, infinite values, and clamps negative numbers to zero.
 */
function sanitizeMetric(value: unknown, fallback = 0): number {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(0, value);
}

/**
 * Calculates a detailed breakdown of the confidence score for given contract telemetry.
 *
 * Mathematical Formulation:
 * - Age Score: Linear scaling up to ageSaturationDays (365 days):
 *     ageRatio = min(1.0, ageDays / ageSaturationDays)
 * - Tx Score: Logarithmic saturation curve to model diminishing marginal utility:
 *     txRatio = min(1.0, log10(1 + tx) / log10(1 + txVolumeCeiling))
 * - Auditor Score: High weight per trusted signature (2+ signatures achieve max weight):
 *     auditorRatio = min(1.0, auditorSignatures * 0.5)
 * - Report Penalty: Direct deduction per incident:
 *     penalty = communityReports * reportPenaltyPerUnit
 * - Bounding: Strictly bounded to [0, 100].
 */
export function calculateConfidenceBreakdown(
  metrics: Partial<ContractTelemetryMetrics>,
  customWeights?: Partial<ScoringWeights>
): ConfidenceScoreBreakdown {
  const weights: ScoringWeights = {
    ...DEFAULT_SCORING_WEIGHTS,
    ...customWeights,
  };

  const ageDays = sanitizeMetric(metrics.accountAgeDays);
  const txCount = sanitizeMetric(metrics.historicalTransactions);
  const reportCount = sanitizeMetric(metrics.communityReports);
  const auditorCount = sanitizeMetric(metrics.auditorSignatures);

  // 1. Account age component (0 - ageWeight)
  const ageRatio = Math.min(1.0, ageDays / weights.ageSaturationDays);
  const ageScore = Number((weights.ageWeight * ageRatio).toFixed(2));

  // 2. Transaction volume component (0 - txWeight) using logarithmic scaling
  const logTx = Math.log10(1 + txCount);
  const logCeiling = Math.log10(1 + weights.txVolumeCeiling);
  const txRatio = logCeiling > 0 ? Math.min(1.0, logTx / logCeiling) : 0;
  const txScore = Number((weights.txWeight * txRatio).toFixed(2));

  // 3. Auditor verification component (0 - auditorWeight)
  const auditorRatio = Math.min(1.0, auditorCount * 0.5);
  const auditorScore = Number((weights.auditorWeight * auditorRatio).toFixed(2));

  // 4. Community report penalty
  const reportPenalty = Number((reportCount * weights.reportPenaltyPerUnit).toFixed(2));

  // 5. Aggregate raw score
  const rawScore = Number(
    (weights.baseScore + ageScore + txScore + auditorScore - reportPenalty).toFixed(2)
  );

  // 6. Strictly clamp within [0, 100] bounds
  const clampedConfidence = Math.max(0, Math.min(100, Math.round(rawScore)));

  const isVeteran = ageDays >= 180 && txCount >= 1_000 && reportCount === 0;
  const isNew = ageDays < 14;

  return {
    confidence: clampedConfidence,
    baseScore: weights.baseScore,
    ageScore,
    txScore,
    auditorScore,
    reportPenalty,
    rawScore,
    isVeteran,
    isNew,
  };
}

/**
 * Calculates the integer confidence score percentage strictly bounded within [0, 100].
 *
 * @param metrics The contract activity and reputation metrics
 * @param customWeights Optional custom tuning weights
 * @returns An integer confidence percentage from 0 to 100
 */
export function calculateConfidenceScore(
  metrics: Partial<ContractTelemetryMetrics>,
  customWeights?: Partial<ScoringWeights>
): number {
  return calculateConfidenceBreakdown(metrics, customWeights).confidence;
}
