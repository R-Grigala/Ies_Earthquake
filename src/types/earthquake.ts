export type EarthquakeEventDto = {
  id: number | string;
  origin_time: string;
  ml: number | string | null;
  latitude: number | string;
  longitude: number | string;
  depth: number | string | null;
  description?: string | null;
};

export type EarthquakeEvent = {
  id: string;
  originTime: Date;
  magnitude: number | null;
  latitude: number;
  longitude: number;
  depth: number | null;
  region: string;
};
