import type { AppLanguage } from '@/src/i18n';
import type { EarthquakeEvent } from '@/src/types/earthquake';

export function eventRegion(event: EarthquakeEvent, language: AppLanguage): string {
  const primary = language === 'en' ? event.regionEn : event.regionGe;
  const fallback = language === 'en' ? event.regionGe : event.regionEn;
  return primary || fallback || '';
}
