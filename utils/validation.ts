/**
 * Validates whether the given string is a valid Soroban smart contract address format.
 * Soroban contract addresses are 56 characters, starting with 'C', in Base32 alphabet (A-Z, 2-7).
 */
/**
 * Validates whether the given string is a valid Soroban smart contract address format.
 * Soroban contract addresses are 56 characters, starting with 'C', in Base32 alphabet (A-Z, 2-7).
 * 
 * @param address - The target contract address to check.
 * @returns True if the format matches Soroban address rules, false otherwise.
 */
export function isValidSorobanAddress(address: string): boolean {
  if (!address) return false;
  const normalized = address.toUpperCase().trim();
  const sorobanRegex = /^C[A-Z2-7]{55}$/;
  return sorobanRegex.test(normalized);
}
