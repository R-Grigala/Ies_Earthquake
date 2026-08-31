const pad = (value: number) => String(value).padStart(2, '0');

export function formatUtcDateTime(date: Date): string {
  return (
    `${pad(date.getUTCDate())}-${pad(date.getUTCMonth() + 1)}-${date.getUTCFullYear()} ` +
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`
  );
}

export function formatLocalDateTime(date: Date): string {
  return (
    `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

export function formatMagnitude(magnitude: number | null): string {
  return magnitude === null ? '—' : magnitude.toFixed(1);
}

export function formatDepth(depth: number | null): string {
  return depth === null ? '—' : `${Math.round(depth)}`;
}

export function formatCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(3)} / ${longitude.toFixed(3)}`;
}
