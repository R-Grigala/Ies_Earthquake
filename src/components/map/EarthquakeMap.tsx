import { Image, Platform, StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { EventMapCallout } from '@/src/components/map/EventMapCallout';
import type { EarthquakeEvent } from '@/src/types/earthquake';
import { eventAge } from '@/src/utils/magnitude';
import { markerIconSize, markerIconSource } from '@/src/utils/markerIcon';

const INITIAL_REGION = {
  latitude: 42.0186,
  longitude: 43.9911,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

type EarthquakeMapProps = {
  events: EarthquakeEvent[];
  onEventPress?: (event: EarthquakeEvent) => void;
};

export function EarthquakeMap({ events, onEventPress }: EarthquakeMapProps) {
  return (
    <MapView style={styles.map} initialRegion={INITIAL_REGION} mapType="hybrid">
      {events.map((event) => {
        const age = eventAge(event.originTime);
        const size = markerIconSize();

        return (
          <Marker
            key={event.id}
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            tracksViewChanges={Platform.OS === 'android' && age === 'recent'}
            onCalloutPress={() => onEventPress?.(event)}>
            <Image
              source={markerIconSource(age)}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            <Callout tooltip={false}>
              <EventMapCallout event={event} />
            </Callout>
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
