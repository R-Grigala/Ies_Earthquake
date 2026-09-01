import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import type { EarthquakeEvent } from '@/src/types/earthquake';
import {
  formatCoordinates,
  formatDepth,
  formatMagnitude,
  formatUtcDateTime,
} from '@/src/utils/format';
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
};

export function EarthquakeMap({ events }: EarthquakeMapProps) {
  return (
    <MapView style={styles.map} initialRegion={INITIAL_REGION} mapType="hybrid">
      {events.map((event) => {
        const age = eventAge(event.originTime);
        const size = markerIconSize();

        return (
          <Marker
            key={event.id}
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            tracksViewChanges={Platform.OS === 'android' && age === 'recent'}>
            <Image
              source={markerIconSource(age)}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutLabel}>დრო (UTC):</Text>
                <Text style={styles.calloutValue}>{formatUtcDateTime(event.originTime)}</Text>
                <Text style={styles.calloutLabel}>გან. / გრძ.:</Text>
                <Text style={styles.calloutValue}>
                  {formatCoordinates(event.latitude, event.longitude)}
                </Text>
                <Text style={styles.calloutLabel}>მაგნიტუდა:</Text>
                <Text style={styles.calloutValue}>{formatMagnitude(event.magnitude)}</Text>
                <Text style={styles.calloutLabel}>სიღრმე (კმ):</Text>
                <Text style={styles.calloutValue}>{formatDepth(event.depth)}</Text>
                {event.region ? (
                  <>
                    <Text style={styles.calloutLabel}>რეგიონი:</Text>
                    <Text style={styles.calloutValue}>{event.region}</Text>
                  </>
                ) : null}
              </View>
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
  callout: {
    minWidth: 200,
    maxWidth: 260,
    padding: 8,
    gap: 2,
  },
  calloutLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  calloutValue: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1c1c1e',
  },
});
