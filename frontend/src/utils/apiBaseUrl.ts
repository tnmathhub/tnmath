// ============================================================
// Live backend base URL for the TN Maths Django API.
// Swap via VITE_API_BASE_URL in a .env file if the backend URL
// ever changes — no other file should hardcode this domain.
// ============================================================

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string) || 'https://tnmath.onrender.com';
