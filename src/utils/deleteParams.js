export function deleteParams(keys) {
  const url = new URL(window.location.href);
  keys.forEach((key) => url.searchParams.delete(key));
  window.history.pushState({}, "", url);
}
