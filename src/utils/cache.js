const CACHE_KEY = "f1-standings:last-good-data";

/**
 * Reads the last successfully fetched + computed standings data, if any.
 * Returns null if nothing's cached yet, or if localStorage isn't available
 * (private browsing, disabled storage, etc) — caching is a nice-to-have,
 * never something the app depends on to function.
 */
export function loadCachedStandings() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Stores the fully computed standings data (season, round, drivers with
 * their progress numbers already calculated, etc) plus a timestamp, so a
 * later failed fetch can fall back to "last known good" instead of
 * showing nothing.
 */
export function saveCachedStandings(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...data, fetchedAt: Date.now() })
    );
  } catch {
    // Storage full, disabled, or unavailable — fail silently.
  }
}
