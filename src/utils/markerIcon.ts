import { Dimensions, type ImageSourcePropType } from 'react-native';

import type { EventAge } from '@/src/utils/magnitude';

export const MARKER_ICONS = {
  recent: require('@/assets/icons/Earthquake_gif.gif'),
  month: require('@/assets/icons/Earthquake_red.png'),
  older: require('@/assets/icons/Earthquake_yellow.png'),
} as const satisfies Record<EventAge, ImageSourcePropType>;

export function markerIconSource(age: EventAge): ImageSourcePropType {
  return MARKER_ICONS[age];
}

export function markerIconSize(): number {
  return Dimensions.get('window').width * 0.07;
}
