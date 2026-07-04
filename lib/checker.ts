import fs from "fs";
import path from "path";
import { Contract, RiskResponse } from "@/types";
import { isValidSorobanAddress } from "@/utils/validation";

/**
 * Checks the reputation status of a Soroban contract address.
 * Reads from the local JSON database and returns structured risk response.
 */
export function checkContract(address: string): RiskResponse {
  const cleanAddress = address.toUpperCase().trim();

  // 1. Check if the address format is correct
  if (!isValidSorobanAddress(cleanAddress)) {
    return {
      address: cleanAddress,
      status: "unknown",
      reason: "Invalid Soroban contract address format. Contract addresses must start with 'C', be exactly 56 characters long, and use the Base32 uppercase alphabet (A-Z, 2-7).",
      riskLevel: "medium",
      confidence: 0,
      category: "none",
      lastUpdated: new Date().toISOString(),
    };
  }

  // 2. Query from the JSON database
  try {
    const filePath = path.join(process.cwd(), "data", "contracts.json");
    
    // Safety check in case the file doesn't exist yet
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const contracts: Contract[] = JSON.parse(fileData);

      // Perform a case-insensitive check
      const foundContract = contracts.find(
        (c) => c.address.toUpperCase() === cleanAddress.toUpperCase()
      );

      if (foundContract) {
        return {
          address: foundContract.address,
          status: foundContract.status,
          reason: foundContract.reason,
          riskLevel: foundContract.riskLevel,
          confidence: foundContract.confidence,
          category: foundContract.category,
          lastUpdated: foundContract.lastUpdated,
        };
      }
    }
  } catch (error) {
    console.error("Error reading or parsing contracts JSON database:", error);
    // Continue execution to fallback state in case of file issues
  }

  // 3. Fallback for valid but unlisted contract addresses
  return {
    address: cleanAddress,
    status: "unknown",
    reason: "This address has not been registered in the Fourier threat intelligence database. No active security issues or safety verifications reported.",
    riskLevel: "medium",
    confidence: 50,
    category: "none",
    lastUpdated: new Date().toISOString(),
  };
}
