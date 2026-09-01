import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchEarthquakes } from '@/src/api/events';

export const earthquakeKeys = {
  all: ['earthquakes'] as const,
};

export function useEarthquakes() {
  return useQuery({
    queryKey: earthquakeKeys.all,
    queryFn: ({ signal }) => fetchEarthquakes(signal),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });
}

/** ტაბის focus-ზე ფონური refetch (ქეში რჩება ხილული, სპინერი არა). */
export function useTabEarthquakes() {
  const query = useEarthquakes();

  useFocusEffect(
    useCallback(() => {
      void query.refetch();
    }, [query.refetch])
  );

  return query;
}
