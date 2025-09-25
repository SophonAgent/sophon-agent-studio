export function getSidFromHashUrl() {
  const { hash, origin, pathname } = location;
  if (!hash) return null;

  const url = new URL(origin + pathname + hash.slice(1));
  return url.searchParams.get('sid');
}
