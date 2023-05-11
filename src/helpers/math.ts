export function numberInRange(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

function normalizeBetweenTwoRanges(value: number, min: number, max: number, newMin: number, newMax: number) {
  return newMin + (value - min) * (newMax - newMin) / (max - min);
};

export function normalizeInRange(value: number, min: number, max: number, newMin: number, newMax: number): number {
  const valueInRange = numberInRange(value, min, max);

  return normalizeBetweenTwoRanges(valueInRange, min, max, newMin, newMax);
}
