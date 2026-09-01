import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { EventDetailContent } from '@/src/components/events/EventDetailContent';
import { EventDetailMap } from '@/src/components/events/EventDetailMap';
import { MapLegend } from '@/src/components/map/MapLegend';
import { useEarthquake } from '@/src/hooks/useEarthquake';
import { getErrorMessage } from '@/src/utils/getErrorMessage';

export default function EventDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { event, isLoading, isError, error, refetch, data } = useEarthquake(id ?? '');
  const headerBackground = useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: '#1e1e22' }, 'background');
  const headerText = useThemeColor({ light: '#7a0002', dark: '#ff9f9a' }, 'text');
  const tint = useThemeColor({}, 'tint');

  const showInitialLoader = isLoading && !data;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

        <View style={[styles.header, { backgroundColor: headerBackground }]}>
          <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
            <Image
              source={require('@/assets/icons/chevron-back-outline.png')}
              style={[styles.backIcon, { tintColor: headerText }]}
            />
          </Pressable>
          <ThemedText style={[styles.headerTitle, { color: headerText }]}>
            {t('eventDetail.title')}
          </ThemedText>
          <View style={styles.backButton} />
        </View>

        {showInitialLoader ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={tint} />
          </View>
        ) : isError ? (
          <View style={styles.centered}>
            <ThemedText style={styles.message}>{t('common.loadError')}</ThemedText>
            <ThemedText style={styles.errorDetail}>{getErrorMessage(error, t)}</ThemedText>
            <Pressable style={[styles.button, { backgroundColor: tint }]} onPress={() => refetch()}>
              <ThemedText style={styles.buttonText}>{t('common.retry')}</ThemedText>
            </Pressable>
          </View>
        ) : !event ? (
          <View style={styles.centered}>
            <ThemedText style={styles.message}>{t('common.eventNotFound')}</ThemedText>
            <Pressable style={[styles.button, { backgroundColor: tint }]} onPress={() => router.back()}>
              <ThemedText style={styles.buttonText}>{t('common.back')}</ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.mapSection}>
              <EventDetailMap events={data ?? []} selectedEvent={event} />
              <View style={styles.legendOverlay}>
                <MapLegend variant="detail" />
              </View>
            </View>
            <View style={styles.detailSection}>
              <EventDetailContent event={event} />
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
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  mapSection: {
    flex: 3,
  },
  legendOverlay: {
    position: 'absolute',
    left: 5,
    right: 5,
    top: 5,
  },
  detailSection: {
    flex: 2,
    borderTopWidth: 0.5,
    borderTopColor: '#000000',
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
