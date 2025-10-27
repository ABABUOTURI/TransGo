// src/app/(customer)/book-delivery/utils/pricing.ts

export interface PricingInput {
    distanceKm: number;
    multiplier: number;
  }
  
  const BASE_RATE_PER_KM = 150; // Base rate in KES per km
  
  export function calculatePrice({ distanceKm, multiplier }: PricingInput): number {
    const price = distanceKm * BASE_RATE_PER_KM * multiplier;
    return Math.round(price);
  }
  