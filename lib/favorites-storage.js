/** Fired when saving favorites to localStorage fails (private mode, quota, etc.). */
export const WIA_FAVORITES_STORAGE_FAILED = "wia_favorites_storage_failed";

/** Fired after a successful save once storage was marked broken. */
export const WIA_FAVORITES_STORAGE_RECOVERED = "wia_favorites_storage_recovered";

let storageBroken = false;

export function isFavoritesStorageBroken() {
  return storageBroken;
}

export function reportFavoritesSaveOk() {
  if (!storageBroken) return;
  storageBroken = false;
  window.dispatchEvent(new CustomEvent(WIA_FAVORITES_STORAGE_RECOVERED));
}

export function reportFavoritesSaveFailed() {
  if (storageBroken) return;
  storageBroken = true;
  window.dispatchEvent(new CustomEvent(WIA_FAVORITES_STORAGE_FAILED));
}
