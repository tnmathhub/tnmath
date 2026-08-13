import type { AuthTokens } from '@/types';

// ============================================================
// Centralized access/refresh-token persistence.
// Access tokens are short-lived and kept in memory + localStorage
// (swap for an httpOnly cookie on a real backend for better
// security); refresh tokens are long-lived and used only to mint
// a new access token when the current one expires.
// ============================================================

const ACCESS_TOKEN_KEY = 'tn-maths-edu:access-token';
const REFRESH_TOKEN_KEY = 'tn-maths-edu:refresh-token';
const ACCESS_TOKEN_EXPIRY_KEY = 'tn-maths-edu:access-token-expires-at';

// How long a mock access token stays valid before it needs refreshing.
export const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

function randomToken(prefix: string): string {
  const random = crypto.randomUUID().replace(/-/g, '');
  return `${prefix}_${random}`;
}

export function createTokenPair(): AuthTokens {
  return {
    accessToken: randomToken('at'),
    refreshToken: randomToken('rt'),
    accessTokenExpiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
  };
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, String(tokens.accessTokenExpiresAt));
}

export function readTokens(): AuthTokens | null {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const expiresAtRaw = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  if (!accessToken || !refreshToken || !expiresAtRaw) return null;
  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt: Number(expiresAtRaw),
  };
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
}

export function isAccessTokenExpired(tokens: AuthTokens, skewMs = 0): boolean {
  return Date.now() + skewMs >= tokens.accessTokenExpiresAt;
}
