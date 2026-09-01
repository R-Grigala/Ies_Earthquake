import type { TFunction } from 'i18next';

import { ApiError } from '@/src/api/client';

export function getErrorMessage(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    const base = error.status ? `${error.message} (${error.status})` : error.message;
    if (base.toLowerCase().includes('network') || base.toLowerCase().includes('fetch')) {
      return `${base}\n\n${t('errors.networkHint')}`;
    }
    return base;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return t('common.unknownError');
}
