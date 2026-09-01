import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
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
import { EventListItem } from '@/src/components/events/EventListItem';
import { useTabEarthquakes } from '@/src/hooks/useEarthquakes';
import { getErrorMessage } from '@/src/utils/getErrorMessage';

export default function EventsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { data, isLoading, isError, error, refetch } = useTabEarthquakes();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const headerBackground = useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: '#1e1e22' }, 'background');
  const headerText = useThemeColor({ light: '#7a0002', dark: '#ff9f9a' }, 'text');
  const tint = useThemeColor({}, 'tint');

  const showInitialLoader = isLoading && !data;

  const onRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

        <View style={[styles.header, { backgroundColor: headerBackground }]}>
          <ThemedText style={[styles.headerTitle, { color: headerText }]}>
            {t('events.title')}
          </ThemedText>
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
        ) : (
          <FlatList
            style={styles.list}
            data={data ?? []}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={isManualRefreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.centered}>
                <ThemedText style={styles.message}>{t('common.empty')}</ThemedText>
                <Pressable
                  style={[styles.button, { backgroundColor: tint }]}
                  onPress={() => refetch()}>
                  <ThemedText style={styles.buttonText}>{t('common.retry')}</ThemedText>
                </Pressable>
              </View>
            }
            renderItem={({ item }) => (
              <EventListItem
                event={item}
                onPress={() => router.push(`/event/${item.id}`)}
              />
            )}
          />
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
  list: {
    flex: 1,
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
