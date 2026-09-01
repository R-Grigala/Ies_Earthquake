import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ApiError } from '@/src/api/client';
import { EarthquakeMap } from '@/src/components/map/EarthquakeMap';
import { MapLegend } from '@/src/components/map/MapLegend';
import { useEarthquakes } from '@/src/hooks/useEarthquakes';

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const base = error.status ? `${error.message} (${error.status})` : error.message;
    if (base.toLowerCase().includes('network') || base.toLowerCase().includes('fetch')) {
      return `${base}\n\nშეამოწმეთ: ინტერნეტი, dev server (npx expo start -c), ტელეფონი და კომპიუტერი ერთ Wi‑Fi-ზე.`;
    }
    return base;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'უცნობი შეცდომა';
}

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const { data, isLoading, isError, error, refetch } = useEarthquakes();
  const headerBackground = useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: '#1e1e22' }, 'background');
  const headerText = useThemeColor({ light: '#7a0002', dark: '#ff9f9a' }, 'text');
  const tint = useThemeColor({}, 'tint');

  const showInitialLoader = isLoading && !data;
  const events = data ?? [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

        <View style={[styles.header, { backgroundColor: headerBackground }]}>
          <ThemedText style={[styles.headerTitle, { color: headerText }]}>სეისმური რუკა</ThemedText>
        </View>

        {showInitialLoader ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={tint} />
          </View>
        ) : isError ? (
          <View style={styles.centered}>
            <ThemedText style={styles.message}>მონაცემების ჩატვირთვა ვერ მოხერხდა</ThemedText>
            <ThemedText style={styles.errorDetail}>{getErrorMessage(error)}</ThemedText>
            <Pressable style={[styles.button, { backgroundColor: tint }]} onPress={() => refetch()}>
              <ThemedText style={styles.buttonText}>სცადეთ ხელახლა</ThemedText>
            </Pressable>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.centered}>
            <ThemedText style={styles.message}>მონაცემები არ მოიძებნა</ThemedText>
            <Pressable style={[styles.button, { backgroundColor: tint }]} onPress={() => refetch()}>
              <ThemedText style={styles.buttonText}>სცადეთ ხელახლა</ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <EarthquakeMap events={events} />
            <View style={styles.legendOverlay}>
              <MapLegend />
            </View>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  mapContainer: {
    flex: 1,
  },
  legendOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  message: {
    textAlign: 'center',
  },
  errorDetail: {
    textAlign: 'center',
    fontSize: 13,
    opacity: 0.7,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
