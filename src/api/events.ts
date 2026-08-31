import { apiGet } from './client';
import type { EarthquakeEvent, EarthquakeEventDto } from '../types/earthquake';

type EventsResponse = EarthquakeEventDto[] | { results: EarthquakeEventDto[] };

const toNumber = (value: unknown): number | null => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
};

function normalize(dto: EarthquakeEventDto): EarthquakeEvent | null {
  const latitude = toNumber(dto.latitude);
  const longitude = toNumber(dto.longitude);
  const originTime = new Date(dto.origin_time);

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
    region: dto.description?.trim() ?? '',
  };
}

export async function fetchEarthquakes(signal?: AbortSignal): Promise<EarthquakeEvent[]> {
  const payload = await apiGet<EventsResponse>('/events', signal);
  const items = Array.isArray(payload) ? payload : payload.results;

  return items
    .map(normalize)
    .filter((event): event is EarthquakeEvent => event !== null)
    .sort((a, b) => b.originTime.getTime() - a.originTime.getTime());
}
