import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEventRegion } from '@/src/hooks/useEventRegion';
import type { EarthquakeEvent } from '@/src/types/earthquake';
import {
  formatCoordinates,
  formatDepth,
  formatUtcDate,
  formatUtcTime,
} from '@/src/utils/format';
import { magnitudeColor } from '@/src/utils/magnitude';

const LABEL_WIDTH = 88;

type EventDetailContentProps = {
  event: EarthquakeEvent;
};

export function EventDetailContent({ event }: EventDetailContentProps) {
  const { t } = useTranslation();
  const region = useEventRegion(event);
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text');

  return (
    <View style={styles.container}>
      <DetailRow
        label={t('eventDetail.timeUtc')}
        borderColor={borderColor}
        textColor={textColor}
        value={
          <>
            <ThemedText style={[styles.value, { color: textColor }]}>
              {formatUtcDate(event.originTime)}
            </ThemedText>
            <ThemedText style={[styles.value, { color: textColor }]}>
              {formatUtcTime(event.originTime)}
            </ThemedText>
          </>
        }
      />

      <DetailRow
        label={t('eventDetail.magnitude')}
        borderColor={borderColor}
        textColor={textColor}
        value={
          <ThemedText style={[styles.magnitude, { color: magnitudeColor(event.magnitude) }]}>
            {event.magnitude ?? '—'}
          </ThemedText>
        }
      />

      <DetailRow
        label={t('eventDetail.depthKm')}
        borderColor={borderColor}
        textColor={textColor}
        value={
          <ThemedText style={[styles.value, { color: textColor }]}>
            {formatDepth(event.depth)}
          </ThemedText>
        }
      />

      <DetailRow
        label={t('eventDetail.coordinates')}
        borderColor={borderColor}
        textColor={textColor}
        value={
          <ThemedText style={[styles.value, { color: textColor }]}>
            {formatCoordinates(event.latitude, event.longitude)}
          </ThemedText>
        }
      />

      <DetailRow
        label={t('eventDetail.location')}
        borderColor={borderColor}
        textColor={textColor}
        last
        value={
          <ThemedText style={[styles.region, { color: textColor }]} numberOfLines={3}>
            {region || '—'}
          </ThemedText>
        }
      />
    </View>
  );
}

type DetailRowProps = {
  label: string;
  value: ReactNode;
  borderColor: string;
  textColor: string;
  last?: boolean;
};

function DetailRow({ label, value, borderColor, textColor, last }: DetailRowProps) {
  return (
    <View style={[styles.row, !last && { borderBottomColor: borderColor, borderBottomWidth: 0.5 }]}>
      <View style={styles.labelCell}>
        <ThemedText style={[styles.label, { color: textColor }]}>{label}</ThemedText>
      </View>
      <View style={styles.valueCell}>{value}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingVertical: 4,
  },
  labelCell: {
    width: LABEL_WIDTH,
    justifyContent: 'center',
  },
  valueCell: {
    flex: 1,
    justifyContent: 'center',
    gap: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'left',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },
  magnitude: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  region: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
});
