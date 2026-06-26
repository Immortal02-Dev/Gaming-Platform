// Client-side wrapper around the mock sports REST endpoints

export type ApiMatch = any;

export async function fetchSidebar() {
  const res = await fetch("/api/sidebar");
  if (!res.ok) throw new Error("sidebar fetch failed");
  return res.json();
}

export async function fetchPreMatch() {
  const res = await fetch("/api/pre-match");
  if (!res.ok) throw new Error("pre-match fetch failed");
  return res.json();
}

export async function fetchLive() {
  const res = await fetch("/api/live");
  if (!res.ok) throw new Error("live fetch failed");
  return res.json();
}

export async function fetchEventMarkets(eventId: string) {
  const res = await fetch(`/api/event/${eventId}/markets`);
  if (!res.ok) throw new Error("event markets fetch failed");
  return res.json();
}

export async function lockSelection(selectionId: string, lockMillis = 5000) {
  const res = await fetch("/api/lock", {
    method: "POST",
    body: JSON.stringify({ selectionId, lockMillis }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("lock failed");
  return res.json();
}

export async function calcMultiBet(
  selections: { event_id: string; selectionId: string; stake: number }[]
) {
  const res = await fetch("/api/bets/calc", {
    method: "POST",
    body: JSON.stringify({ selections }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "calc failed" }));
    throw new Error(err.message || "calc failed");
  }
  return res.json();
}
