export function askApiUrl() {
  const base =
    typeof window !== "undefined" &&
    typeof window.WIA_ASK_API_URL === "string" &&
    window.WIA_ASK_API_URL.trim()
      ? window.WIA_ASK_API_URL.trim().replace(/\/$/, "")
      : "";
  return `${base}/api/ask`;
}

/**
 * OPTIONS to /api/ask (no POST side effects).
 * @returns {"ok" | "missing_key" | "unavailable" | "network"}
 */
export async function probeAskEndpointStatus() {
  try {
    const res = await fetch(askApiUrl(), { method: "OPTIONS" });
    if (res.status === 204 || res.status === 200) return "ok";
    if (res.status === 503) return "missing_key";
    return "unavailable";
  } catch {
    return "network";
  }
}
