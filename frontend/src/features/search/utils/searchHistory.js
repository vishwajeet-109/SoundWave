const STORAGE_KEY = "soundwave_recent_searches";

export function getRecentSearches() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveRecentSearch(query) {
  if (!query?.trim()) return;

  const history = getRecentSearches();

  const updated = [
    query.trim(),
    ...history.filter(
      (item) =>
        item.toLowerCase() !== query.trim().toLowerCase()
    ),
  ].slice(0, 10);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}