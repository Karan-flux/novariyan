const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

function getApiBaseUrl(): string {
  if (!configuredApiUrl) {
    return import.meta.env.DEV ? 'http://localhost:4000' : '';
  }

  try {
    const url = new URL(configuredApiUrl);
    const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);

    if (import.meta.env.PROD && (isLocalhost || url.protocol !== 'https:')) {
      return '';
    }

    return url.origin;
  } catch {
    return import.meta.env.DEV ? 'http://localhost:4000' : '';
  }
}

export const API_BASE_URL = getApiBaseUrl();