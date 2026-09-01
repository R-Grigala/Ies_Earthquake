import { env } from '@/src/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const url = `${env.apiBaseUrl}${path}`;
  if (__DEV__) {
    console.log('[API]', url);
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(env.apiToken ? { Authorization: `Token ${env.apiToken}` } : {}),
      },
      signal,
    });

    if (!response.ok) {
      throw new ApiError(`Request to ${path} failed`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(`Request to ${path} was cancelled`);
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network request failed');
  }
}
