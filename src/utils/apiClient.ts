import { API } from './apiUrls';
import { readTokens, saveTokens, clearTokens, isAccessTokenExpired, createTokenPair } from './tokenStorage';
import type { AuthTokens } from '@/types';

// ============================================================
// Fetch wrapper for the real backend integration.
// - Attaches `Authorization: Bearer <accessToken>` to every call.
// - If the access token is expired, refreshes it first using the
//   refresh token (single in-flight refresh, shared by all callers).
// - If a call still comes back 401 (token revoked server-side),
//   clears tokens and lets the caller redirect to /login.
//
// NOTE: until a real backend exists, `refreshWithBackend` below is
// a mock that just mints a new local token pair. Replace its body
// with the real POST to API.auth.refresh once the backend is live.
// ============================================================

let refreshPromise: Promise<AuthTokens | null> | null = null;

async function refreshWithBackend(refreshToken: string): Promise<AuthTokens | null> {
  try {
    // Real backend call would look like:
    // const res = await fetch(API.auth.refresh, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ refreshToken }),
    // });
    // if (!res.ok) return null;
    // const data = await res.json();
    // return { accessToken: data.accessToken, refreshToken: data.refreshToken, accessTokenExpiresAt: Date.now() + data.expiresIn * 1000 };

    // Mock behaviour (no backend yet): mint a fresh token pair locally.
    void refreshToken;
    void API.auth.refresh;
    return createTokenPair();
  } catch {
    return null;
  }
}

export async function ensureFreshAccessToken(): Promise<string | null> {
  const tokens = readTokens();
  if (!tokens) return null;

  if (!isAccessTokenExpired(tokens, 30_000)) {
    return tokens.accessToken;
  }

  if (!refreshPromise) {
    refreshPromise = refreshWithBackend(tokens.refreshToken).finally(() => {
      refreshPromise = null;
    });
  }

  const refreshed = await refreshPromise;
  if (!refreshed) {
    clearTokens();
    return null;
  }

  saveTokens(refreshed);
  return refreshed.accessToken;
}

interface ApiFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch(url: string, options: ApiFetchOptions = {}): Promise<Response> {
  const { skipAuth = false, headers, ...rest } = options;
  const accessToken = skipAuth ? null : await ensureFreshAccessToken();

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  if (response.status === 401 && !skipAuth) {
    clearTokens();
  }

  return response;
}
