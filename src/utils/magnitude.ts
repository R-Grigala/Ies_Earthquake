export function magnitudeColor(magnitude: number | null): string {
  if (magnitude === null) return '#8e8e93';
  if (magnitude > 5) return '#ff0000';
  if (magnitude > 4) return '#ff7b00';
  if (magnitude > 3) return '#aa00ff';
  return '#1c1c1e';
}
