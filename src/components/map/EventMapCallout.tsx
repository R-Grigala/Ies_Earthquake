import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { EarthquakeEvent } from '@/src/types/earthquake';
import { formatUtcDate, formatUtcTime } from '@/src/utils/format';
import { magnitudeColor } from '@/src/utils/magnitude';
import { useEventRegion } from '@/src/hooks/useEventRegion';

type EventMapCalloutProps = {
  event: EarthquakeEvent;
};

export function EventMapCallout({ event }: EventMapCalloutProps) {
  const { t } = useTranslation();
  const region = useEventRegion(event);

  return (
    <View style={styles.container}>
      <View style={styles.magnitudeBlock}>
        <Text style={[styles.magnitude, { color: magnitudeColor(event.magnitude) }]}>
          {event.magnitude ?? '—'}
        </Text>
        <Text style={styles.magnitudeLabel}>{t('callout.magnitude')}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoBlock}>
        <Text style={styles.fieldLabel}>{t('callout.timeUtc')}</Text>
        <Text style={styles.time}>{formatUtcDate(event.originTime)}</Text>
        <Text style={styles.time}>{formatUtcTime(event.originTime)}</Text>

        {region ? (
          <>
            <Text style={[styles.fieldLabel, styles.regionLabel]}>{t('callout.location')}</Text>
            <Text style={styles.region}>{region}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>{t('callout.details')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    maxWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  magnitudeBlock: {
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
    gap: 2,
  },
  magnitude: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  magnitudeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#687076',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d1d1d6',
    marginTop: 10,
    marginHorizontal: 12,
  },
  infoBlock: {
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#687076',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1c1c1e',
    textAlign: 'center',
    lineHeight: 18,
  },
  regionLabel: {
    marginTop: 8,
  },
  region: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1c1c1e',
    textAlign: 'center',
    lineHeight: 16,
    flexShrink: 1,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#7a0002',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
