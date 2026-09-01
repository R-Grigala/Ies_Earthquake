import { Image, Platform, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import type { EarthquakeEvent } from '@/src/types/earthquake';
import { eventAge } from '@/src/utils/magnitude';
import {
  MARKER_ICONS,
  markerIconSize,
  markerIconSource,
  markerTracksViewChanges,
} from '@/src/utils/markerIcon';

const DETAIL_MAP_DELTA = 0.45;

type EventDetailMapProps = {
  events: EarthquakeEvent[];
  selectedEvent: EarthquakeEvent;
};

function sortSelectedLast(events: EarthquakeEvent[], selectedId: string): EarthquakeEvent[] {
  return [...events].sort((a, b) => {
    if (a.id === selectedId) return 1;
    if (b.id === selectedId) return -1;
    return 0;
  });
}

export function EventDetailMap({ events, selectedEvent }: EventDetailMapProps) {
  const size = markerIconSize();
  const sortedEvents = sortSelectedLast(events, selectedEvent.id);

  return (
    <MapView
      style={styles.map}
      mapType="hybrid"
      initialRegion={{
        latitude: selectedEvent.latitude,
        longitude: selectedEvent.longitude,
        latitudeDelta: DETAIL_MAP_DELTA,
        longitudeDelta: DETAIL_MAP_DELTA,
      }}>
      {sortedEvents.map((item) => {
        const isSelected = item.id === selectedEvent.id;
        const age = eventAge(item.originTime);
        const icon = isSelected ? MARKER_ICONS.recent : markerIconSource(age);

        return (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            tracksViewChanges={Platform.OS === 'android' && markerTracksViewChanges(item, selectedEvent.id)}>
            <Image source={icon} style={{ width: size, height: size }} resizeMode="contain" />
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
