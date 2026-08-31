import { useQuery } from '@tanstack/react-query';
import { fetchEarthquakes } from '../api/events';
import type { EarthquakeEvent } from '../types/earthquake';

export const earthquakeKeys = {
  all: ['earthquakes'] as const,
};

const REFETCH_INTERVAL_MS = 60_000;

export function useEarthquakes() {
  return useQuery({
    queryKey: earthquakeKeys.all,
    queryFn: ({ signal }) => fetchEarthquakes(signal),
    staleTime: 30_000,
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

export function useEarthquake(id: string | undefined) {
  const query = useEarthquakes();
  const event: EarthquakeEvent | undefined = id
    ? query.data?.find((item) => item.id === id)
    : undefined;

  return { ...query, event };
}
