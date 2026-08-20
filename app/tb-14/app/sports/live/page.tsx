"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SportsLayout from "@/components/SportsLayout";
import Image from "next/image";
import { fetchLive, fetchEventMarkets } from "@/app/sports/sportsApi";
import type { Event, Market } from "@/lib/mockSports";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(v: number) {
  return v.toFixed(2);
}

function getSportIcon(sport: string): string {
  const norm = sport.toLowerCase();
  if (norm === "football" || norm === "soccer") return "/assets/svg/soccer.svg";
  if (norm === "baseball") return "/assets/svg/baseball.svg";
  if (norm === "basketball") return "/assets/svg/basketball.svg";
  if (norm === "volleyball") return "/assets/svg/volleyball.svg";
  if (norm === "tennis" || norm === "tennis table") return "/assets/svg/tabletennis.svg";
  if (norm === "boxing") return "/assets/svg/boxing.svg";
  if (norm === "lol" || norm === "league of legends") return "/assets/svg/lol.svg";
  return "/assets/svg/earth.svg";
}

function getCountryFlag(country: string): string {
  const norm = country.toLowerCase();
  if (norm === "korea" || norm === "대한민국") return "https://p.staticube.com/common/flags/circle/kr.svg";
  if (norm === "japan" || norm === "일본") return "/assets/svg/jp.svg";
  if (norm === "usa" || norm === "미국") return "/assets/svg/us.svg";
  if (norm === "spain" || norm === "스페인") return "/assets/svg/es.svg";
  if (norm === "england" || norm === "영국") return "https://p.staticube.com/common/flags/circle/gb.svg";
  if (norm === "vietnam" || norm === "베트남") return "/assets/svg/vn.svg";
  if (norm === "australia" || norm === "호주") return "/assets/svg/au.svg";
  return "https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg";
}

function groupByHour(matches: Event[]) {
  const map = new Map<string, Event[]>();
  for (const m of matches) {
    const label = m.league_time_label ?? "기타";
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(m);
  }
  return Array.from(map.entries()).map(([label, ms]) => ({ label, matches: ms }));
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024" className="match-leagueIcon">
    <path fill="currentColor" d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z" />
  </svg>
);

const IconDetailToggle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
    <path fill="currentColor" d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
  </svg>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="match-list">
    <div className="empty-listContainer">
      <div className="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 20 20">
          <path fill="currentColor" d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14c0 .63-.502 1.141-1.11 1.141Z" />
        </svg>
      </div>
      <p className="empty-description">베팅가능한 경기가 없습니다</p>
    </div>
  </div>
);

// ─── League Group (collapsible) ───────────────────────────────────────────────
function LeagueGroup({
  label,
  matches,
  selectedId,
  onSelect,
}: {
  label: string;
  matches: Event[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="match-list">
      <div className="match-leagueGroup">
        <button className="match-leagueBtn" onClick={() => setCollapsed((c) => !c)}>
          <div className="match-leagueInner">
            <div className="match-leagueTitle">
              <span className="match-leagueTime">{label}</span>
            </div>
            <div className="match-leagueToggle">
              <IconUp />
            </div>
          </div>
        </button>

        {!collapsed && (
          <div className="match-leagueBox">
            {matches.map((match) => {
              const primary = match.markets[0];
              const extraCount = Math.max(0, match.markets.length - 1);
              const isSelected = selectedId === match.event_id;

              return (
                <div className="match-leagueItem" key={match.event_id}>
                  {/* Live Score Display */}
                  <a
                    className="MatchScore__Container-sc-fa4b8bf5-0 ewIhww"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(match.event_id);
                    }}
                  >
                    <div className="djywlB">
                      <div className="csNbW">{match.teams.home}</div>
                      <div className="ewoWkH">{match.teams.homeScore ?? 0}</div>
                    </div>
                    :
                    <div className="djywlB">
                      <div className="ewoWkH">{match.teams.awayScore ?? 0}</div>
                      <div className="csNbW">{match.teams.away}</div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className={`match-leagueLink${isSelected ? " active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(match.event_id);
                    }}
                  >
                    <div className="match-linkContainer">
                      <div className="match-linkBox">
                        <div className="match-linkTime">
                          {match.period} {match.minute ? `${match.minute}'` : ""}
                        </div>
                        <div className="match-linkContent">
                          <div className="match-linkIcon">
                            <div className="match-linkImg">
                              <Image
                                src={getSportIcon(match.sport)}
                                alt="종목"
                                width={19}
                                height={19}
                                unoptimized
                              />
                            </div>
                            <div className="match-linkImg">
                              <Image
                                src={getCountryFlag(match.country)}
                                alt="국가"
                                width={19}
                                height={19}
                                unoptimized
                              />
                            </div>
                          </div>
                          <div className="match-linkTitle">
                            {match.country} • {match.league}
                          </div>
                        </div>
                      </div>
                      <div className="match-moreBtn">+{extraCount} 더보기 &gt;</div>
                    </div>
                  </a>

                  {primary && (
                    <div className="match-marketContainer">
                      <div className="match-market">
                        <div className="match-marketItem">
                          <div className="match-marketTitle">
                            {primary.label ?? primary.title}
                          </div>
                          {primary.selections.length === 3 ? (
                            <>
                              <button className="match-marketBtn" disabled={primary.selections[0].suspended}>
                                <strong className="match-marketName"><p>{primary.selections[0].name}</p></strong>
                                <span className="match-marketOdds" data-odds={primary.selections[0].odds}>
                                  {primary.selections[0].suspended ? "중단" : fmt(primary.selections[0].odds)}
                                </span>
                              </button>
                              <div className="match-marketVersus">{fmt(primary.selections[1].odds)}</div>
                              <button className="match-marketBtn" disabled={primary.selections[2].suspended}>
                                <strong className="match-marketName"><p>{primary.selections[2].name}</p></strong>
                                <span className="match-marketOdds" data-odds={primary.selections[2].odds}>
                                  {primary.selections[2].suspended ? "중단" : fmt(primary.selections[2].odds)}
                                </span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="match-marketBtn" disabled={primary.selections[0]?.suspended}>
                                <strong className="match-marketName"><p>{primary.selections[0]?.name}</p></strong>
                                <span className="match-marketOdds" data-odds={primary.selections[0]?.odds}>
                                  {primary.selections[0] ? fmt(primary.selections[0].odds) : "-"}
                                </span>
                              </button>
                              <div className="match-marketVersus">VS</div>
                              <button className="match-marketBtn" disabled={primary.selections[1]?.suspended}>
                                <strong className="match-marketName"><p>{primary.selections[1]?.name}</p></strong>
                                <span className="match-marketOdds" data-odds={primary.selections[1]?.odds}>
                                  {primary.selections[1] ? fmt(primary.selections[1].odds) : "-"}
                                </span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ eventId }: { eventId: string | null }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "other">("all");
  const [collapsedMarkets, setCollapsedMarkets] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!eventId) {
      setEvent(null);
      return;
    }
    setLoading(true);
    fetchEventMarkets(eventId)
      .then((data) => setEvent(data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [eventId]);

  const toggleMarket = (id: string) =>
    setCollapsedMarkets((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const visibleMarkets: Market[] = useMemo(() => {
    if (!event) return [];
    if (activeFilter === "other") return event.markets.filter((m) => m.title !== "Match Winner");
    return event.markets;
  }, [event, activeFilter]);

  return (
    <div className="sport-wrapper detail">
      <div className="sport-inner">
        <div className="sport-detail">
          <div className="detail-tabContainer">
            <div className="detail-tabHead">
              <div className="detail-tab">
                <div className="detail-tabInner">
                  <button
                    className={`detail-tabBtn${activeFilter === "all" ? " active" : ""}`}
                    onClick={() => setActiveFilter("all")}
                  >
                    <span className="detail-tabText">전체</span>
                  </button>
                  <button
                    className={`detail-tabBtn${activeFilter === "other" ? " active" : ""}`}
                    onClick={() => setActiveFilter("other")}
                  >
                    <span className="detail-tabText">기타</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-marketContainer">
            {!eventId && (
              <div className="empty-listContainer">
                <div className="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14c0 .63-.502 1.141-1.11 1.141Z" />
                  </svg>
                </div>
                <p className="empty-description">경기를 선택해주세요</p>
              </div>
            )}

            {eventId && loading && (
              <div className="empty-listContainer">
                <p className="empty-description">로딩중...</p>
              </div>
            )}

            {eventId && !loading && visibleMarkets.map((market) => {
              const isCollapsed = collapsedMarkets.has(market.id);
              return (
                <div className="detail-market" key={market.id}>
                  <button
                    className="detail-marketHeader"
                    onClick={() => toggleMarket(market.id)}
                  >
                    <div className="detail-marketTitle">
                      <span className="detail-marketTitleText">
                        {market.label ?? market.title}
                      </span>
                    </div>
                    <div className="detail-marketToggle">
                      <IconDetailToggle />
                    </div>
                  </button>

                  {!isCollapsed && (
                    <div className="detail-marketItem">
                      <div className="detail-marketInner">
                        {market.suspended ? (
                          <div style={{ padding: "8px", color: "#f55", fontSize: 12, textAlign: "center" }}>
                            일시 중단됨
                          </div>
                        ) : (
                          market.selections.map((sel) => (
                            <button
                              key={sel.id}
                              className="detail-marketBtn"
                              disabled={sel.suspended || !!(sel.lockedUntil && sel.lockedUntil > Date.now())}
                            >
                              <strong className="detail-marketName">
                                <p>{sel.name}</p>
                              </strong>
                              <span className="detail-marketOdds" data-odds={sel.odds}>
                                {sel.suspended ? "중단" : fmt(sel.odds)}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const SIDEBAR_COUNTRY_MAP: Record<string, string> = {
  "세계": "World",
  "대한민국": "Korea",
  "일본": "Japan",
  "미국": "USA",
  "스페인": "Spain",
  "영국": "England",
  "호주": "USA",
  "베트남": "Vietnam",
};

function matchesSport(matchSport: string, selectedSportId: string): boolean {
  const normMatch = matchSport.toLowerCase();
  const normSelected = selectedSportId.toLowerCase();
  
  if (normSelected === 'soccer') {
    return normMatch === 'football';
  }
  if (normSelected === 'tennis table') {
    return normMatch === 'tennis';
  }
  return normMatch === normSelected;
}

function matchesCountry(matchCountry: string, selectedCountryText: string): boolean {
  const englishName = SIDEBAR_COUNTRY_MAP[selectedCountryText];
  if (!englishName) return true;
  return matchCountry.toLowerCase() === englishName.toLowerCase();
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LiveSportsPage() {
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport') || 'all-sports';
  const countryParam = searchParams.get('country') || '';

  const [searchText, setSearchText] = useState("");
  const [sortMode, setSortMode] = useState<"time" | "popular">("time");
  const [allMatches, setAllMatches] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(() => {
    fetchLive()
      .then((data) => setAllMatches(data.matches ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 5000); // 5s poll for live score / odds update
    return () => clearInterval(timer);
  }, [load]);

  const filtered = useMemo(() => {
    let list = allMatches;

    // Filter by Sport
    if (sportParam && sportParam !== 'all-sports' && sportParam !== 'popular') {
      list = list.filter((m) => matchesSport(m.sport, sportParam));
    }

    // Filter by Country
    if (countryParam) {
      list = list.filter((m) => matchesCountry(m.country, countryParam));
    }

    // Filter by Search Text
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (m) =>
          m.teams.home.toLowerCase().includes(q) ||
          m.teams.away.toLowerCase().includes(q) ||
          m.league.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q),
      );
    }

    return sortMode === "popular"
      ? [...list].sort((a, b) => b.markets.length - a.markets.length)
      : [...list].sort((a, b) => (b.minute ?? 0) - (a.minute ?? 0));
  }, [allMatches, searchText, sortMode, sportParam, countryParam]);

  // Auto-select first match when filtered matches change (category change or load)
  useEffect(() => {
    if (filtered.length > 0) {
      if (selectedId === null || !filtered.some((m) => m.event_id === selectedId)) {
        setSelectedId(filtered[0].event_id);
      }
    } else {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  const groups = useMemo(() => groupByHour(filtered), [filtered]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SportsLayout isLive={true}>
      <div className="main-sport">
        <div className="sport-container" id="all-sports">

          {/* ── Left Panel: Match List ── */}
          <div className="sport-wrapper">
            <div className="sport-inner">
              <div className="sport-list">

                {/* Header */}
                <div className="sport-headContainer">
                  <div className="match-listHead">
                    <div className="match-headBox">
                      <div className="match-headTitle">전체</div>
                      <button
                        className="match-headBtn modal-trigger"
                        data-target="betting-rules-modal-container"
                      >
                        <div className="match-headBtntext">베팅규정</div>
                      </button>
                    </div>

                    <form className="match-searchForm" onSubmit={(e) => e.preventDefault()}>
                      <label className="match-searchLabel">
                        <label className="match-searchInner">
                          <div className="match-searchInputBox">
                            <input
                              autoComplete="off"
                              placeholder="검색어 입력해주세요"
                              spellCheck={false}
                              className="match-searchInput"
                              type="text"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                              name="searchText"
                            />
                          </div>
                          <button type="button" disabled={false} className="match-searchBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="match-searchIcon">
                              <path fill="currentColor" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                            </svg>
                          </button>
                        </label>
                      </label>
                    </form>

                    <div className="match-tabContainer">
                      <div className="match-tabItem active">
                        <div className="match-tabInner">
                          <button className="match-tabBtn active">
                            <span className="match-tabText"> 시간순 </span>
                          </button>
                        </div>
                      </div>
                      <div className="match-tabItem">
                        <div className="match-tabInner">
                          <button
                            className={`match-tabBtn${sortMode === "time" ? " active" : ""}`}
                            onClick={() => setSortMode("time")}
                          >
                            <span className="match-tabText"> 시간순 </span>
                          </button>
                          <button
                            className={`match-tabBtn${sortMode === "popular" ? " active" : ""}`}
                            onClick={() => setSortMode("popular")}
                          >
                            <span className="match-tabText"> 인기순 </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match groups */}
                {loading && (
                  <div className="match-list">
                    <div className="empty-listContainer">
                      <p className="empty-description">로딩중...</p>
                    </div>
                  </div>
                )}

                {!loading && filtered.length === 0 && <EmptyState />}

                {!loading && groups.map((group) => (
                  <LeagueGroup
                    key={group.label}
                    label={group.label}
                    matches={group.matches}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Panel: Detail ── */}
          <DetailPanel eventId={selectedId} />

        </div>
      </div>
    </SportsLayout>
  );
}
