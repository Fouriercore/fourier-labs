import { describe, it } from "node:test";
import assert from "node:assert";
import {
  calculateConfidenceScore,
  calculateConfidenceBreakdown,
  DEFAULT_SCORING_WEIGHTS,
} from "./scoring";

describe("Fraud Score & Confidence Metric Calculation", () => {
  it("strictly bounds output values between 0 and 100 across extreme ranges", () => {
    // Extreme positive telemetry
    const maxScore = calculateConfidenceScore({
      accountAgeDays: 10_000,
      historicalTransactions: 100_000_000,
      communityReports: 0,
      auditorSignatures: 100,
    });
    assert.ok(maxScore <= 100, `Expected score <= 100, got ${maxScore}`);
    assert.strictEqual(maxScore, 100);

    // Extreme negative telemetry (many reports)
    const minScore = calculateConfidenceScore({
      accountAgeDays: 0,
      historicalTransactions: 0,
      communityReports: 1_000,
      auditorSignatures: 0,
    });
    assert.ok(minScore >= 0, `Expected score >= 0, got ${minScore}`);
    assert.strictEqual(minScore, 0);

    // Bounded check across various permutations
    const permutations = [
      {
        accountAgeDays: -50,
        historicalTransactions: -100,
        communityReports: -10,
        auditorSignatures: -5,
      },
      {
        accountAgeDays: Number.NaN,
        historicalTransactions: Number.POSITIVE_INFINITY,
        communityReports: 0,
        auditorSignatures: 0,
      },
      {
        accountAgeDays: 180,
        historicalTransactions: 500,
        communityReports: 2,
        auditorSignatures: 1,
      },
      { accountAgeDays: 1, historicalTransactions: 0, communityReports: 10, auditorSignatures: 0 },
    ];

    for (const params of permutations) {
      const score = calculateConfidenceScore(params as any);
      assert.ok(
        score >= 0 && score <= 100,
        `Score ${score} out of bounds for input ${JSON.stringify(params)}`
      );
    }
  });

  it("calculates high confidence for veteran safe contracts", () => {
    // Veteran contract: > 1 year old, 25,000 txs, verified by 2 trusted auditors, 0 reports
    const veteranTelemetry = {
      accountAgeDays: 365,
      historicalTransactions: 25_000,
      communityReports: 0,
      auditorSignatures: 2,
    };

    const breakdown = calculateConfidenceBreakdown(veteranTelemetry);
    assert.strictEqual(breakdown.isVeteran, true);
    assert.strictEqual(breakdown.isNew, false);
    assert.strictEqual(breakdown.reportPenalty, 0);
    assert.ok(
      breakdown.confidence >= 95,
      `Veteran contract confidence should be >= 95, got ${breakdown.confidence}`
    );
    assert.strictEqual(breakdown.confidence, 100);
  });

  it("calculates low provisional confidence for brand new safe contracts", () => {
    // New contract: deployed 3 days ago, 12 transactions, 0 reports, 0 auditor signatures
    const newContractTelemetry = {
      accountAgeDays: 3,
      historicalTransactions: 12,
      communityReports: 0,
      auditorSignatures: 0,
    };

    const breakdown = calculateConfidenceBreakdown(newContractTelemetry);
    assert.strictEqual(breakdown.isNew, true);
    assert.strictEqual(breakdown.isVeteran, false);
    assert.strictEqual(breakdown.reportPenalty, 0);
    // Baseline is 15, age adds < 1, tx adds ~7 -> expected ~22
    assert.ok(
      breakdown.confidence >= 15 && breakdown.confidence <= 30,
      `Expected new contract confidence in [15, 30], got ${breakdown.confidence}`
    );
  });

  it("applies severe penalties when community reports exist", () => {
    // Even an older contract should have confidence crushed if multiple fraud reports exist
    const reportedContract = {
      accountAgeDays: 200,
      historicalTransactions: 5_000,
      communityReports: 5,
      auditorSignatures: 0,
    };

    const breakdown = calculateConfidenceBreakdown(reportedContract);
    assert.strictEqual(breakdown.reportPenalty, 5 * DEFAULT_SCORING_WEIGHTS.reportPenaltyPerUnit); // 100
    assert.strictEqual(breakdown.confidence, 0);
  });

  it("handles empty or missing telemetry gracefully with baseline defaults", () => {
    const emptyScore = calculateConfidenceScore({});
    assert.strictEqual(emptyScore, DEFAULT_SCORING_WEIGHTS.baseScore);
  });
});
