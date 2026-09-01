import { useQuery } from '@tanstack/react-query';
import { fetchEarthquakes } from '@/src/api/events';

export const earthquakeKeys = {
  all: ['earthquakes'] as const,
};

const REFETCH_INTERVAL_MS = 60_000;

export function useEarthquakes() {
  return useQuery({
    queryKey: earthquakeKeys.all,
    queryFn: ({ signal }) => fetchEarthquakes(signal),
    staleTime: 30_000,
    retry: 2,
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}
