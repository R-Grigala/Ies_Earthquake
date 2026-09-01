import { useTranslation } from 'react-i18next';

import { getAppLanguage } from '@/src/i18n';
import type { EarthquakeEvent } from '@/src/types/earthquake';
import { eventRegion } from '@/src/utils/eventRegion';

export function useEventRegion(event: EarthquakeEvent): string {
  const { i18n } = useTranslation();
  const language = i18n.language === 'en' ? 'en' : 'ka';
  return eventRegion(event, language);
}

export function useAppLanguage() {
  const { i18n } = useTranslation();
  return i18n.language === 'en' ? 'en' : 'ka';
}

export function useCurrentLanguage() {
  return getAppLanguage();
}
