const BASE_URL = "https://cricket-live-line-advance.p.rapidapi.com";

const buildQuery = (
  params: Record<string, string | number | boolean | undefined>
) => {
  const usp = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.append(k, String(v));
  });
  return usp.toString();
};

const apiGet = async (path: string, params: Record<string, any> = {}) => {
  const url = `${BASE_URL}${path}${
    Object.keys(params).length ? `?${buildQuery(params)}` : ""
  }`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "cricket-live-line-advance.p.rapidapi.com",
      "x-rapidapi-key": "cd4321ee07msh80ee48ca59e8bb7p1f655fjsn5ee141198b22",
      Accept: "application/json",
    },
    next: { revalidate: 15 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API-Sports error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data?.response) ? data.response : [];
};

export const getLiveFixtures = async (sport: string = "cricket") => {
  try {
    const items = await apiGet(`/liveMatches`, {});
    return items;
  } catch {
    return [];
  }
};

export const getUpcomingFixtures = async (sport: string = "cricket") => {
  try {
    const items = await apiGet(`/upcomingMatches`, {});
    return items;
  } catch {
    return [];
  }
};
