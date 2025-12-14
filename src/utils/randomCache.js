export function getCachedRandomItems(key, items, limit = 6, ttlHours = 6) {
  const now = Date.now();
  const ttl = ttlHours * 60 * 60 * 1000;

  const cached = localStorage.getItem(key);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (now - parsed.timestamp < ttl) {
      return parsed.items;
    }
  }

  // Shuffle
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, limit);

  localStorage.setItem(
    key,
    JSON.stringify({ timestamp: now, items: selected })
  );

  return selected;
}
