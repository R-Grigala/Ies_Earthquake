import { env } from '../config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const REQUEST_TIMEOUT_MS = 15_000;

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  signal?.addEventListener('abort', () => controller.abort());

  try {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      headers: {
        Accept: 'application/json',
        ...(env.apiToken ? { Authorization: `Token ${env.apiToken}` } : {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(`Request to ${path} failed`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(`Request to ${path} timed out`);
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network request failed');
  } finally {
    clearTimeout(timeout);
  }
}
