// Fishing Zone heuristics for computing coral health, fish availability, and weather hazards

/**
 * Compute Coral Health Index from environmental metrics
 * Returns a numeric score (0-100) and condition label
 */
export function computeCoralHealthIndex(
  temperature: number,
  pH: number,
  turbidity: number,
  oxygenLevel: number
): { index: number; condition: 'Good' | 'Normal' | 'Highly Polluted' } {
  let score = 100;

  // Temperature impact (ideal: 23-29°C)
  if (temperature < 20 || temperature > 32) {
    score -= 30;
  } else if (temperature < 23 || temperature > 29) {
    score -= 15;
  }

  // pH impact (ideal: 7.9-8.4)
  if (pH < 7.5 || pH > 8.6) {
    score -= 25;
  } else if (pH < 7.9 || pH > 8.4) {
    score -= 10;
  }

  // Turbidity impact (ideal: < 5 NTU)
  if (turbidity > 15) {
    score -= 25;
  } else if (turbidity > 10) {
    score -= 15;
  } else if (turbidity > 5) {
    score -= 5;
  }

  // Oxygen level impact (ideal: > 6 mg/L)
  if (oxygenLevel < 4) {
    score -= 20;
  } else if (oxygenLevel < 6) {
    score -= 10;
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine condition
  let condition: 'Good' | 'Normal' | 'Highly Polluted';
  if (score >= 70) {
    condition = 'Good';
  } else if (score >= 40) {
    condition = 'Normal';
  } else {
    condition = 'Highly Polluted';
  }

  return { index: score, condition };
}

/**
 * Get fish availability text based on coral health condition
 */
export function getFishAvailability(condition: 'Good' | 'Normal' | 'Highly Polluted'): string {
  switch (condition) {
    case 'Good':
      return 'More fish available - Healthy coral reefs support abundant marine life and diverse fish populations.';
    case 'Normal':
      return 'Moderate fish availability - Coral reefs are in fair condition with moderate fish populations.';
    case 'Highly Polluted':
      return 'Less fish available - Degraded coral reefs result in reduced fish populations and biodiversity.';
  }
}

/**
 * Get cyclone possibility based on temperature
 * Warmer waters increase cyclone risk
 */
export function getCyclonePossibility(temperature: number): string {
  if (temperature >= 28) {
    return 'High - Warm waters increase cyclone formation risk';
  } else if (temperature >= 24) {
    return 'Moderate - Conditions may support cyclone development';
  } else {
    return 'Low - Cooler waters reduce cyclone risk';
  }
}

/**
 * Get flood possibility based on temperature
 * Higher temperatures correlate with increased precipitation and flood risk
 */
export function getFloodPossibility(temperature: number): string {
  if (temperature >= 28) {
    return 'High - Warm conditions increase precipitation and flood risk';
  } else if (temperature >= 24) {
    return 'Moderate - Average flood risk for the region';
  } else {
    return 'Low - Cooler conditions reduce flood risk';
  }
}
