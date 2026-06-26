"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface SportGameDetail {
  id: number;
  matchId: string;
  sportName: string;
  sportImage: string | null;
  regionName: string;
  regionImage: string | null;
  leagueName: string;
  teamHome: string;
  teamHomeImage: string | null;
  teamAway: string;
  teamAwayImage: string | null;
  gameStartTime: string;
  matchStatus: string;
  matchStatusDisplay: string;
  bettingStatus: string;
  bettingStatusDisplay: string;
  adminIsSuspended: number;
  scoreHome: number | null;
  scoreAway: number | null;
  totalBetCount: number;
  totalBetMoney: number;
}

interface Market {
  id: number;
  marketType: string;
  marketName: string;
  selection: string;
  odds: number;
  isActive: number;
}

function SportGameMarketPageInner() {
  const searchParams = useSearchParams();
  const matchIdx = searchParams.get("matchIdx");

  const [game, setGame] = useState<SportGameDetail | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [viewType, setViewType] = useState<"all" | "bet">("all");
  const [marketSearch, setMarketSearch] = useState("");

  const fetchGameDetail = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/sport-games/${matchIdx}`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch game details");

      const data = await response.json();
      setGame(data.data.game);
      setMarkets(data.data.markets);
    } catch (error) {
      console.error("Error fetching game details:", error);
      alert("게임 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [matchIdx]);

  useEffect(() => {
    if (matchIdx) {
      fetchGameDetail();
    }
  }, [matchIdx, fetchGameDetail]);

  useEffect(() => {
    document.title = "Master Admin | 배당 관리";
  }, []);

  const handleStatusChange = async (
    adminIsSuspended: number,
    statusName: string
  ) => {
    if (!confirm(`${statusName} 상태로 변경하시겠습니까?`)) return;

    try {
      const response = await fetch(
        `/api/admin/sport-games/${matchIdx}/admin-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ adminIsSuspended }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchGameDetail();
      } else {
        alert(data.message || "상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="alert alert-warning m-5">
        게임 정보를 찾을 수 없습니다.
      </div>
    );
  }

  // Group markets by market type
  const groupedMarkets = markets.reduce(
    (
      acc: Record<string, { type: string; name: string; markets: Market[] }>,
      market: Market
    ) => {
      const key = `${market.marketType}_${market.marketName}`;
      if (!acc[key]) {
        acc[key] = {
          type: market.marketType,
          name: market.marketName,
          markets: [],
        };
      }
      acc[key].markets.push(market);
      return acc;
    },
    {} as Record<string, { type: string; name: string; markets: Market[] }>
  );

  // Filter markets based on search
  const filteredMarketKeys = marketSearch
    ? Object.keys(groupedMarkets).filter((key) =>
        groupedMarkets[key].name
          .toLowerCase()
          .includes(marketSearch.toLowerCase())
      )
    : Object.keys(groupedMarkets);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        href="/assets/plugins/jstree/dist/themes/default/style.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-thin-rounded/css/uicons-thin-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-thin-straight/css/uicons-thin-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-solid-straight/css/uicons-solid-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-straight/css/uicons-regular-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-bold-straight/css/uicons-bold-straight.css"
      />

      <div id="app" className="app" style={{ height: "inherit" }}>
        <div className="panel panel-inverse" style={{ height: "inherit" }}>
          <div className="panel-body bg-gray-200 spobg">
            <div className="game_screen_top">
              <div className="game_screen dflecC" id="matchDateInfo">
                <div className="gameinfo">
                  <div className="team-wrap">
                    {game.teamHomeImage && (
                      <Image
                        src={game.teamHomeImage}
                        className="teamlogo"
                        unoptimized
                        width={40}
                        height={40}
                        alt="Home Team"
                      />
                    )}
                    <span>{game.teamHome}</span>
                  </div>
                  <div className="date">
                    <div className="gilg">{game.leagueName}</div>
                    <div>
                      {new Date(game.gameStartTime).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "short",
                        }
                      )}{" "}
                      {new Date(game.gameStartTime).toLocaleTimeString(
                        "ko-KR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </div>
                    <div>경기 정보 - {game.matchId}</div>
                  </div>
                  <div className="team-wrap">
                    {game.teamAwayImage && (
                      <Image
                        src={game.teamAwayImage}
                        className="teamlogo"
                        unoptimized
                        width={40}
                        height={40}
                        alt="Away Team"
                      />
                    )}
                    <span>{game.teamAway}</span>
                  </div>
                </div>
              </div>

              <div className="game_screen dflecC" id="matchLiveInfo">
                <div className="inplayinfo">
                  <div className="lgwrap">
                    <span id="inning">{game.matchStatusDisplay}</span>
                  </div>
                  <div className="score-wrap">
                    <div className="left">
                      <div className="teaminfo">
                        {game.teamHomeImage && (
                          <Image
                            src={game.teamHomeImage}
                            className="teamlogo"
                            unoptimized
                            width={30}
                            height={30}
                            alt="Home Team"
                          />
                        )}
                        <span>{game.teamHome}</span>
                      </div>
                      <div className="teaminfo">
                        {game.teamAwayImage && (
                          <Image
                            src={game.teamAwayImage}
                            className="teamlogo"
                            unoptimized
                            width={30}
                            height={30}
                            alt="Away Team"
                          />
                        )}
                        <span>{game.teamAway}</span>
                      </div>
                    </div>
                    <div className="right">
                      <table className="scoreinfo">
                        <tbody>
                          <tr>
                            <th>
                              <i className="fi fi-tr-angle-90"></i>
                            </th>
                            <th>
                              <i className="fi fi-sr-square-y yel"></i>
                            </th>
                            <th>
                              <i className="fi fi-sr-square-r red"></i>
                            </th>
                            <th>
                              <i className="fi fi-rr-circle-half-stroke"></i>
                            </th>
                            <th>점수</th>
                          </tr>
                          <tr>
                            <td className="cornerScore_0">0</td>
                            <td className="yellowcardScore_0">0</td>
                            <td className="redcardScore_0">0</td>
                            <td className="set1Score_0">0</td>
                            <td>{game.scoreHome ?? 0}</td>
                          </tr>
                          <tr>
                            <td className="cornerScore_1">0</td>
                            <td className="yellowcardScore_1">0</td>
                            <td className="redcardScore_1">0</td>
                            <td className="set1Score_1">0</td>
                            <td>{game.scoreAway ?? 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="stat"></div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    game.adminIsSuspended === 0 ? "btn-info" : "btn-secondary"
                  }`}
                  onClick={() => handleStatusChange(0, "정상판매")}
                >
                  정상판매
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    game.adminIsSuspended === 1 ? "btn-info" : "btn-secondary"
                  }`}
                  onClick={() => handleStatusChange(1, "판매정지")}
                >
                  판매정지
                </button>
              </div>
              <div className="btn-group ms-2">
                <button
                  type="button"
                  className={`btn btn-sm view-type view-bet ${
                    viewType === "bet" ? "btn-info" : "btn-secondary"
                  }`}
                  onClick={() => setViewType("bet")}
                >
                  배팅 마켓
                </button>
                <button
                  type="button"
                  className={`btn btn-sm view-type view-all ${
                    viewType === "all" ? "btn-info" : "btn-secondary"
                  }`}
                  onClick={() => setViewType("all")}
                >
                  전체
                </button>
              </div>
              <button type="button" className="btn btn-warning ms-2">
                경기 정산
              </button>
              <div className="ms-auto">
                <div className="input-group">
                  <div className="input-group-text px-1">마켓 검색</div>
                  <input
                    type="text"
                    id="marketSearchText"
                    className="form-control"
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="game_tab nav nav-tabs" role="tablist">
              <button
                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target=".allMarket"
                type="button"
                onClick={() => setActiveTab("all")}
              >
                전체
              </button>
              <button
                className={`nav-link ${activeTab === "match" ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroup1"
                type="button"
                onClick={() => setActiveTab("match")}
              >
                매치
              </button>
              <button
                className={`nav-link ${
                  activeTab === "handicap" ? "active" : ""
                }`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroup2"
                type="button"
                onClick={() => setActiveTab("handicap")}
              >
                핸디캡
              </button>
              <button
                className={`nav-link ${
                  activeTab === "overunder" ? "active" : ""
                }`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroup3"
                type="button"
                onClick={() => setActiveTab("overunder")}
              >
                언오버
              </button>
              <button
                className={`nav-link ${activeTab === "half" ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroup4"
                type="button"
                onClick={() => setActiveTab("half")}
              >
                전/후반
              </button>
              <button
                className={`nav-link ${activeTab === "combo" ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroup5"
                type="button"
                onClick={() => setActiveTab("combo")}
              >
                조합
              </button>
              <button
                className={`nav-link ${activeTab === "etc" ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target=".marketGroupEtc"
                type="button"
                onClick={() => setActiveTab("etc")}
              >
                기타
              </button>
            </div>

            <div
              className="tab-content"
              id="matchMarket"
              style={{ userSelect: "auto" }}
            >
              {filteredMarketKeys.length === 0 ? (
                <div className="alert alert-info mt-3">
                  검색된 마켓이 없습니다.
                </div>
              ) : (
                filteredMarketKeys.map((key) => {
                  const marketGroup = groupedMarkets[key];
                  const rowClass =
                    marketGroup.markets.length === 2 ? "row-2" : "row-3";

                  return (
                    <div
                      key={key}
                      className="tab-pane spolist allMarket marketGroup1 active show"
                      role="tabpanel"
                    >
                      <div className="tit">
                        {marketGroup.name}
                        <div className="dflexR control btn-group">
                          <button type="button" className="btn btn-info">
                            활성
                          </button>
                          <button type="button" className="btn btn-secondary">
                            비활성
                          </button>
                        </div>
                      </div>
                      <div className="dflexL gap3">
                        <ul
                          className={`dflexL ${rowClass} inplayex`}
                          data-marketidx={key}
                          data-handicap="0"
                          data-betcount="0"
                        >
                          {marketGroup.markets.map((market: Market) => (
                            <li
                              key={market.id}
                              className={`home ${
                                market.isActive ? "" : "locked"
                              }`}
                              data-marketselectionidx={market.id}
                            >
                              <span className="teamname">
                                {market.selection}
                              </span>
                              <span className="bet-item">
                                <span className="bet-amount">0</span>(
                                <span className="bet-count">0</span>)
                              </span>
                              <span className="odd">{market.odds}</span>
                              {!market.isActive && (
                                <div className="lock">
                                  <i className="fi fi-rr-lock"></i>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                        <div className="dflexR control btn-group">
                          <button
                            type="button"
                            className="text-nowrap btn btn-info"
                          >
                            활성
                          </button>
                          <button
                            type="button"
                            className="text-nowrap btn btn-secondary"
                          >
                            비활성
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function SportGameMarketPage() {
  return (
    <Suspense fallback={null}>
      <SportGameMarketPageInner />
    </Suspense>
  );
}
