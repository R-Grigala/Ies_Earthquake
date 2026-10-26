import { apiGet } from '@/src/api/client';
import type {
  EarthquakeEvent,
  EarthquakeEventDto,
  MagnitudeDto,
  PublishedEventsResponse,
} from '@/src/types/earthquake';

const PREFERRED_MAGNITUDE_CODE = 'ML';

const toNumber = (value: unknown): number | null => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
};

function parseOriginTime(value: string): Date {
  const hasTimezone = /[zZ]|[+-]\d{2}:\d{2}$/.test(value);
  return new Date(hasTimezone ? value : `${value}Z`);
}

function pickMagnitude(magnitudes: MagnitudeDto[] | null | undefined): number | null {
  if (!magnitudes?.length) {
    return null;
  }
  const preferred = magnitudes.find(
    (item) => item.magnitude?.code?.toUpperCase() === PREFERRED_MAGNITUDE_CODE
  );
  for (const item of preferred ? [preferred, ...magnitudes] : magnitudes) {
    const value = toNumber(item.value);
    if (value !== null) {
      return value;
    }
  }
  return null;
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
    magnitude: pickMagnitude(dto.magnitudes),
    latitude,
    longitude,
    depth: toNumber(dto.depth),
    regionGe: dto.location_ge?.trim() || '',
    regionEn: dto.location_en?.trim() || '',
  };
}

export async function fetchEarthquakes(signal?: AbortSignal): Promise<EarthquakeEvent[]> {
  const payload = await apiGet<PublishedEventsResponse>('/publish_events/', signal);

  if (!payload?.items?.length) {
    return [];
  }

  return payload.items
    .map((item) => (item.event ? normalize(item.event) : null))
    .filter((event): event is EarthquakeEvent => event !== null)
    .sort((a, b) => b.originTime.getTime() - a.originTime.getTime());
}
