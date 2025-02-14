import { clsx, type ClassValue } from "clsx";
import { unstable_cache } from "next/cache";
import { twMerge } from "tailwind-merge";

// ========================================================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========================================================================================================

export { unstable_cache as cache };
