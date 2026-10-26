export type MagnitudeDto = {
  value: number | string | null;
  magnitude?: { code?: string | null } | null;
};

export type EarthquakeEventDto = {
  id: number | string;
  iesdata_id?: number | string | null;
  origin_time: string;
  latitude: number | string;
  longitude: number | string;
  depth: number | string | null;
  location_ge?: string | null;
  location_en?: string | null;
  magnitudes?: MagnitudeDto[] | null;
  is_published?: boolean;
};

export type PublishedEventDto = {
  id: number | string;
  event_id: number | string;
  published_at?: string | null;
  event: EarthquakeEventDto | null;
};

export type PublishedEventsResponse = {
  items: PublishedEventDto[];
  total?: number;
  limit?: number;
};

export type EarthquakeEvent = {
  id: string;
  originTime: Date;
  magnitude: number | null;
  latitude: number;
  longitude: number;
  depth: number | null;
  regionGe: string;
  regionEn: string;
};
