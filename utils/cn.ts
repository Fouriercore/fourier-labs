import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names dynamically.
 * Combines clsx for conditional class resolution and tailwind-merge to clean up conflicting Tailwind classes.
 * 
 * @param inputs - Array of class values or conditional objects.
 * @returns A consolidated, optimized className string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
