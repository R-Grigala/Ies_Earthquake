import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { EarthquakeEvent } from '@/src/types/earthquake';
import { formatUtcDate, formatUtcTime } from '@/src/utils/format';
import { magnitudeColor } from '@/src/utils/magnitude';

const LABEL_WIDTH = 76;

type EventListItemProps = {
  event: EarthquakeEvent;
};

export function EventListItem({ event }: EventListItemProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text');

  return (
    <Pressable style={[styles.card, { backgroundColor, borderColor }]}>
      <View style={styles.topRow}>
        <View style={styles.leftColumn}>
          <View style={[styles.fieldRow, { borderColor: textColor }]}>
            <View style={styles.labelCell}>
              <ThemedText style={[styles.label, { color: textColor }]}>დრო (UTC):</ThemedText>
            </View>
            <View style={styles.valueCell}>
              <ThemedText style={[styles.value, { color: textColor }]}>
                {formatUtcDate(event.originTime)}
              </ThemedText>
              <ThemedText style={[styles.value, { color: textColor }]}>
                {formatUtcTime(event.originTime)}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.magnitudeColumn}>
          <ThemedText style={[styles.label, styles.magnitudeLabel, { color: textColor }]}>
            მაგნიტუდა:
          </ThemedText>
          <ThemedText style={[styles.magnitude, { color: magnitudeColor(event.magnitude) }]}>
            {event.magnitude ?? '—'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.regionRow}>
        <View style={styles.labelCell}>
          <ThemedText style={[styles.label, { color: textColor }]}>რეგიონი:</ThemedText>
        </View>
        <View style={styles.regionValueCell}>
          <ThemedText style={[styles.region, { color: textColor }]} numberOfLines={2}>
            {event.region || '—'}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.2,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  leftColumn: {
    flex: 1,
    minWidth: 0,
  },
  fieldRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    minHeight: 40,
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
  magnitudeColumn: {
    width: '30%',
    minWidth: 88,
    maxWidth: 104,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'left',
  },
  magnitudeLabel: {
    textAlign: 'center',
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
  regionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 28,
    paddingTop: 6,
  },
  regionValueCell: {
    flex: 1,
    paddingRight: 4,
  },
  region: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
});
