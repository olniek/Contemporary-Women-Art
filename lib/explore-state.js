/** Artist ids flipped at least once in the current topic (explore-before-quiz gate). */
export let exploredCardIds = new Set();

export function resetExploreTracking() {
  exploredCardIds = new Set();
}
