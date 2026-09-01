export type EarthquakeEventDto = {
  id: number | string;
  event_id?: number | string;
  origin_time: string;
  ml: number | string | null;
  latitude: number | string;
  longitude: number | string;
  depth: number | string | null;
  description?: string | null;
  location_ge?: string | null;
  location_en?: string | null;
  is_published?: boolean;
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
