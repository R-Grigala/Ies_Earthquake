import { Dimensions, type ImageSourcePropType } from 'react-native';

import { eventAge, type EventAge } from '@/src/utils/magnitude';

export const MARKER_ICONS = {
  recent: require('@/assets/icons/Earthquake_gif.gif'),
  month: require('@/assets/icons/Earthquake_red.png'),
  older: require('@/assets/icons/Earthquake_yellow.png'),
} as const satisfies Record<EventAge, ImageSourcePropType>;

export function markerIconSource(age: EventAge): ImageSourcePropType {
  return MARKER_ICONS[age];
}

export function markerIconSourceForEvent(
  event: { id: string; originTime: Date },
  selectedId: string
): ImageSourcePropType {
  if (event.id === selectedId) {
    return MARKER_ICONS.recent;
  }
  return markerIconSource(eventAge(event.originTime));
}

export function markerTracksViewChanges(
  event: { id: string; originTime: Date },
  selectedId: string
): boolean {
  return event.id === selectedId || eventAge(event.originTime) === 'recent';
}

export function markerIconSize(): number {
  return Dimensions.get('window').width * 0.07;
}
