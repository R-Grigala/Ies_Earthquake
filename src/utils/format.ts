const pad = (value: number) => String(value).padStart(2, '0');

export function formatUtcDate(date: Date): string {
  return `${pad(date.getUTCDate())}-${pad(date.getUTCMonth() + 1)}-${date.getUTCFullYear()}`;
}

export function formatUtcTime(date: Date): string {
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

export function formatUtcDateTime(date: Date): string {
  return `${formatUtcDate(date)} ${formatUtcTime(date)}`;
}

export function formatMagnitude(magnitude: number | null): string {
  return magnitude === null ? '—' : magnitude.toFixed(1);
}

export function formatCoordinates(latitude: number, longitude: number): string {
  return `${latitude} / ${longitude}`;
}

export function formatDepth(depth: number | null): string {
  return depth === null ? '—' : `${Math.round(depth)}`;
}
