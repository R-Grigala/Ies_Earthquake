export function magnitudeColor(magnitude: number | null): string {
  if (magnitude === null) return '#8e8e93';
  if (magnitude > 5) return '#ff0000';
  if (magnitude > 4) return '#ff7b00';
  if (magnitude > 3) return '#aa00ff';
  return '#1c1c1e';
}

export type EventAge = 'recent' | 'month' | 'older';

const DAY_MS = 24 * 60 * 60 * 1000;

export function eventAge(originTime: Date, now: Date = new Date()): EventAge {
  const elapsed = now.getTime() - originTime.getTime();
  if (elapsed <= 7 * DAY_MS) return 'recent';
  if (elapsed <= 90 * DAY_MS) return 'month';
  return 'older';
}

export function markerOpacity(age: EventAge): number {
  if (age === 'recent') return 1;
  if (age === 'month') return 0.75;
  return 0.5;
}

export function magnitudeMarkerSize(magnitude: number | null): number {
  if (magnitude === null) return 12;
  return Math.max(12, Math.min(36, 10 + magnitude * 4));
}
