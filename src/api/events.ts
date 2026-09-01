import { apiGet } from '@/src/api/client';
import type { EarthquakeEvent, EarthquakeEventDto } from '@/src/types/earthquake';

type EventsResponse = EarthquakeEventDto[] | { results: EarthquakeEventDto[] };

const toNumber = (value: unknown): number | null => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
};

function parseOriginTime(value: string): Date {
  const hasTimezone = /[zZ]|[+-]\d{2}:\d{2}$/.test(value);
  return new Date(hasTimezone ? value : `${value}Z`);
}

function pickRegion(dto: EarthquakeEventDto): string {
  return dto.location_ge?.trim() || dto.location_en?.trim() || dto.description?.trim() || '';
}

function normalize(dto: EarthquakeEventDto): EarthquakeEvent | null {
  const latitude = toNumber(dto.latitude);
  const longitude = toNumber(dto.longitude);
  const originTime = parseOriginTime(dto.origin_time);

  if (latitude === null || longitude === null || Number.isNaN(originTime.getTime())) {
    return null;
  }

  return {
    id: String(dto.id),
    originTime,
    magnitude: toNumber(dto.ml),
    latitude,
    longitude,
    depth: toNumber(dto.depth),
    region: pickRegion(dto),
  };
}

export async function fetchEarthquakes(signal?: AbortSignal): Promise<EarthquakeEvent[]> {
  const payload = await apiGet<EventsResponse>('/events', signal);
  const items = Array.isArray(payload) ? payload : payload.results;

  if (!items?.length) {
    return [];
  }

  return items
    .map(normalize)
    .filter((event): event is EarthquakeEvent => event !== null)
    .sort((a, b) => b.originTime.getTime() - a.originTime.getTime());
}
