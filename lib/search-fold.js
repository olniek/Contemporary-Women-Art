/**
 * Fold Latin-script text for case- and accent-insensitive comparison.
 * Used by collection search (same approach as Words Sky latinFold).
 */
export function latinFoldForSearch(input) {
  const trimmed = String(input).trim().normalize("NFC");
  const stripped = trimmed.normalize("NFD").replace(/\p{M}/gu, "");
  return stripped.toLowerCase().replace(/\u00df/g, "ss");
}
