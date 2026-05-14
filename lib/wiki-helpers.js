export function wikiSearchUrl(name) {
  return "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(name);
}
