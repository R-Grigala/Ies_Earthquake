import { Image, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MARKER_ICONS } from '@/src/utils/markerIcon';

type MapLegendVariant = 'map' | 'detail';

const ICON_SIZE = 22;

type MapLegendProps = {
  variant?: MapLegendVariant;
};

export function MapLegend({ variant = 'map' }: MapLegendProps) {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({ light: '#ffffffee', dark: '#1e1e22ee' }, 'background');
  const borderColor = useThemeColor({ light: '#c6c6c8', dark: '#3a3a3c' }, 'icon');
  const textColor = useThemeColor({}, 'text');

  const items =
    variant === 'detail'
      ? [
          { key: 'selected', label: t('legend.selected_recent'), source: MARKER_ICONS.recent },
          { key: 'month', label: t('legend.month'), source: MARKER_ICONS.month },
          { key: 'older', label: t('legend.older'), source: MARKER_ICONS.older },
        ]
      : [
          { key: 'recent', label: t('legend.recent'), source: MARKER_ICONS.recent },
          { key: 'month', label: t('legend.month'), source: MARKER_ICONS.month },
          { key: 'older', label: t('legend.older'), source: MARKER_ICONS.older },
        ];

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      {items.map((item) => (
        <View key={item.key} style={styles.item}>
          <Image source={item.source} style={styles.icon} resizeMode="contain" />
          <ThemedText style={[styles.label, { color: textColor }]}>{item.label}</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
});
