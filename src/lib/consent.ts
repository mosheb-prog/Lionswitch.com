// Minimal cookie-consent helper. Nothing analytics-related may run until the
// visitor explicitly accepts. "Decline" is a real choice, not a dark pattern:
// it fully blocks the analytics gate below.

export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "ls-cookie-consent";
export const CONSENT_EVENT = "ls-cookie-consent-change";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    // localStorage unavailable (private mode, blocked storage) — the banner
    // will simply reappear next visit, which is an acceptable fallback.
  }
}

// useSyncExternalStore helpers — the React-sanctioned way to read an
// external store (localStorage) without the setState-in-effect anti-pattern.
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentServerSnapshot(): ConsentValue | null {
  return null;
}
