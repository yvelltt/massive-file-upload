import { useLoadingStore } from '../store/loadingStore';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions {
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function api<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { startLoading, stopLoading } = useLoadingStore.getState();

  const { method = 'GET', data, params, headers = {}, signal } = options;

  let url = API_BASE_URL + path;
  if (params && Object.keys(params).length > 0) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    url += (url.includes('?') ? '&' : '?') + query;
  }

  let body: BodyInit | undefined = undefined;
  const reqHeaders = { ...headers };

  if (['GET', 'HEAD'].includes(method)) {
    body = undefined;
  } else if (data instanceof FormData) {
    body = data;
    delete reqHeaders['Content-Type'];
  } else if (data !== undefined) {
    body = JSON.stringify(data);
    reqHeaders['Content-Type'] = 'application/json';
  }

  startLoading();

  try {
    const res = await fetch(url, {
      method,
      headers: reqHeaders,
      signal,
      body,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw { status: res.status, ...error };
    }

    return res.json() as Promise<T>;
  } finally {
    stopLoading();
  }
}
