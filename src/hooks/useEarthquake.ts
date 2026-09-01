import { useEarthquakes } from '@/src/hooks/useEarthquakes';

export function useEarthquake(id: string) {
  const query = useEarthquakes();
  const event = query.data?.find((item) => item.id === id);

  return {
    ...query,
    event,
  };
}
