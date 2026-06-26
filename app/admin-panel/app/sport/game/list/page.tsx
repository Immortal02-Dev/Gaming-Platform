"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface SportGame {
  id: number;
  matchId: string;
  sportIdx: number;
  sportName: string;
  sportImage: string | null;
  regionIdx: number;
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
  adminStatus: string;
  waitLive: number;
  typeFlag: number;
  typeFlagDisplay: string;
  scoreHome: number | null;
  scoreAway: number | null;
  totalBetCount: number;
  totalBetMoney: number;
  updatedAt: string;
}

export default function SportGameListPage() {
  const [games, setGames] = useState<SportGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    pageSize: "50",
  // default to 30 days ago so recently-seeded games aren't filtered out by today's date
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    sportIdx: "",
    regionIdx: "",
    searchType: "",
    searchText: "",
    prematchliveType: "1",
    gameStatus: "1",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 50,
    total: 0,
    totalPages: 0,
  });

  const fetchGames = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        ...filters,
      });

      const url = `/api/admin/sport-games?${queryParams}`;
      console.info("[SportGameList] fetching games ->", url);

      const response = await fetch(url, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      console.info("[SportGameList] response status", response.status);

      if (!response.ok) {
        // try to parse JSON error body for better diagnostics
        let errText = `HTTP ${response.status}`;
        try {
          const errJson = await response.json();
          console.warn("[SportGameList] error body:", errJson);
          errText += ` - ${JSON.stringify(errJson)}`;
        } catch (e) {
          // ignore
        }
        throw new Error(errText);
      }

      const data = await response.json();
      console.debug("[SportGameList] response json", data);

      // backend may return either { data: { games, pagination } } or { games, pagination }
      const gamesData = data?.data?.games ?? data?.games ?? [];
      const paginationData =
        data?.data?.pagination ?? data?.pagination ?? {
          page: pagination.page,
          pageSize: Number(filters.pageSize) || pagination.pageSize,
          total: 0,
          totalPages: 0,
        };

      setGames(gamesData);
      setPagination((prev) => ({ ...prev, ...paginationData }));
    } catch (error) {
      console.error("[SportGameList] Error fetching games:", error);
      alert("게임 목록을 불러오는데 실패했습니다. 콘솔을 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [pagination.page, JSON.stringify(filters)]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  // set page to 1 and rely on the effect to trigger fetch (avoids using stale pagination state)
  setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (
    matchIdx: number,
    adminIsSuspended: number,
    statusName: string
  ) => {
    if (!confirm(`${statusName} 상태로 변경하시겠습니까?`)) return;

    fetch(`/api/admin/sport-games/${matchIdx}/admin-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ adminIsSuspended }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchGames();
        } else {
          alert(data.message || "상태 변경에 실패했습니다.");
        }
      })
      .catch(() => alert("상태 변경에 실패했습니다."));
  };

  const handleWaitLiveChange = (matchIdx: number, currentWaitLive: number) => {
    const newWaitLive = currentWaitLive ? 0 : 1;
    const confirmMessage = newWaitLive
      ? "라이브 대기 상태로 변경 하시겠습니까?"
      : "라이브 대기 상태를 해제 하시겠습니까?";

    if (!confirm(confirmMessage)) return;

    fetch(`/api/admin/sport-games/${matchIdx}/wait-live`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ waitLive: newWaitLive }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchGames();
        } else {
          alert(data.message || "상태 변경에 실패했습니다.");
        }
      })
      .catch(() => alert("상태 변경에 실패했습니다."));
  };

  const handleCancelGame = (matchIdx: number) => {
    if (!confirm("해당 경기를 취소 처리하시겠습니까?")) return;

    fetch(`/api/admin/sport-games/${matchIdx}/cancel`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchGames();
        } else {
          alert(data.message || "경기 취소에 실패했습니다.");
        }
      })
      .catch(() => alert("경기 취소에 실패했습니다."));
  };

  const handleGameDetail = (matchIdx: number) => {
    window.open(
      `/sport/game/list/market?matchIdx=${matchIdx}`,
      "_blank",
      "width=" + screen.width + ",height=" + screen.height
    );
  };

  return (
    <Layout>
      <style jsx>{`
        .sport_image {
          height: 20px;
          max-width: 30px;
          margin-right: 5px;
        }
        .member {
          text-wrap: nowrap;
          display: flex;
        }
        .home {
          text-align: left !important;
        }
        .home .txt,
        .away .txt {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .away .txt {
          margin-left: auto;
        }
        .away {
          text-align: right !important;
        }
        .home > .sport_image {
          margin-right: 5px;
        }
        .away > .sport_image {
          margin-left: 5px;
          margin-right: 0px;
        }
        .memberVS {
          width: 30px;
        }
      `}</style>

      <h1 className="page-header">
        <i className="fa fa-gamepad me-2"></i>스포츠게임 관리
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch} className="w-100">
              <div className="d-flex flex-wrap gap-2">
                <select
                  name="pageSize"
                  className="form-select w-80px"
                  value={filters.pageSize}
                  onChange={(e) =>
                    handleFilterChange("pageSize", e.target.value)
                  }
                >
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>

                <div className="input-group" style={{ width: "250px" }}>
                  <input
                    type="date"
                    className="form-control"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange("startDate", e.target.value)
                    }
                  />
                  <span className="input-group-text">~</span>
                  <input
                    type="date"
                    className="form-control"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange("endDate", e.target.value)
                    }
                  />
                </div>

                <select
                  className="form-select w-auto"
                  value={filters.sportIdx}
                  onChange={(e) =>
                    handleFilterChange("sportIdx", e.target.value)
                  }
                >
                  <option value="">종목</option>
                  <option value="1">축구</option>
                  <option value="2">아이스하키</option>
                  <option value="3">농구</option>
                  <option value="5">배구</option>
                  <option value="6">미식축구</option>
                  <option value="11">야구</option>
                  <option value="58">리그오브레전드</option>
                </select>

                <select
                  className="form-select w-auto"
                  value={filters.regionIdx}
                  onChange={(e) =>
                    handleFilterChange("regionIdx", e.target.value)
                  }
                >
                  <option value="">지역</option>
                  <option value="1">월드</option>
                  <option value="125">대한민국</option>
                  <option value="52">중국</option>
                  <option value="118">일본</option>
                  <option value="260">잉글랜드</option>
                  <option value="218">스페인</option>
                  <option value="89">독일</option>
                  <option value="116">이탈리아</option>
                  <option value="82">프랑스</option>
                  <option value="245">미국</option>
                </select>

                <select
                  className="form-select w-100px"
                  value={filters.searchType}
                  onChange={(e) =>
                    handleFilterChange("searchType", e.target.value)
                  }
                >
                  <option value="">항목</option>
                  <option value="matchId">게임번호</option>
                  <option value="league">리그</option>
                  <option value="team">팀</option>
                </select>

                <input
                  type="text"
                  className="form-control w-150px"
                  value={filters.searchText}
                  onChange={(e) =>
                    handleFilterChange("searchText", e.target.value)
                  }
                  placeholder="검색어"
                />

                <button type="submit" className="btn btn-lime">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>

                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${
                      filters.prematchliveType === "1"
                        ? "btn-info"
                        : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("prematchliveType", "1")}
                  >
                    프리매치
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filters.prematchliveType === "2"
                        ? "btn-warning"
                        : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("prematchliveType", "2")}
                  >
                    라이브
                  </button>
                </div>

                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${
                      filters.gameStatus === "1" ? "btn-green" : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("gameStatus", "1")}
                  >
                    진행중
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filters.gameStatus === "2" ? "btn-indigo" : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("gameStatus", "2")}
                  >
                    베팅마감
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filters.gameStatus === "3" ? "btn-danger" : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("gameStatus", "3")}
                  >
                    경기종료
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filters.gameStatus === "4" ? "btn-warning" : "btn-default"
                    }`}
                    onClick={() => handleFilterChange("gameStatus", "4")}
                  >
                    취소
                  </button>
                </div>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    filters.gameStatus === "0" ? "btn-primary" : "btn-default"
                  }`}
                  onClick={() => handleFilterChange("gameStatus", "0")}
                >
                  베팅 된 것만
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold">
                <thead
                  className="bg-dark bg-gradient text-white"
                  style={{ position: "sticky", top: "0px", zIndex: 1 }}
                >
                  <tr>
                    <th>라이브대기</th>
                    <th>게임번호</th>
                    <th>종목</th>
                    <th>국가</th>
                    <th>리그</th>
                    <th>매치</th>
                    <th>매치상태</th>
                    <th>베팅상태</th>
                    <th>총 베팅금</th>
                    <th>스코어</th>
                    <th className="w-150px">게임시간</th>
                    <th className="w-150px">업데이트시간</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {games.length === 0 ? (
                    <tr>
                      <td colSpan={13}>데이터가 없습니다.</td>
                    </tr>
                  ) : (
                    games.map((game) => (
                      <tr key={game.id}>
                        <td>
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              checked={game.waitLive === 1}
                              onChange={() =>
                                handleWaitLiveChange(game.id, game.waitLive)
                              }
                            />
                          </div>
                        </td>
                        <td>{game.matchId}</td>
                        <td className="text-start">
                          {game.sportImage && (
                            <img
                              src={game.sportImage}
                              className="sport_image"
                              alt=""
                            />
                          )}
                          {game.sportName}
                        </td>
                        <td className="text-start">
                          {game.regionImage && (
                            <img
                              src={game.regionImage}
                              className="sport_image"
                              alt=""
                            />
                          )}
                          {game.regionName}
                        </td>
                        <td className="text-start text-truncate">
                          {game.leagueName}
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleGameDetail(game.id);
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="member home">
                                {game.teamHomeImage && (
                                  <img
                                    src={game.teamHomeImage}
                                    className="sport_image"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                    alt=""
                                  />
                                )}
                                <div className="txt">{game.teamHome}</div>
                              </div>
                              <div className="memberVS">VS</div>
                              <div className="member away">
                                <div className="txt">{game.teamAway}</div>
                                {game.teamAwayImage && (
                                  <img
                                    src={game.teamAwayImage}
                                    className="sport_image"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                          </a>
                        </td>
                        <td>{game.matchStatusDisplay}</td>
                        <td>
                          <span
                            className={
                              game.bettingStatus === "available"
                                ? "text-blue"
                                : "text-danger"
                            }
                          >
                            {game.bettingStatusDisplay}
                          </span>
                        </td>
                        <td>{game.totalBetMoney.toLocaleString()}</td>
                        <td>
                          {game.scoreHome !== null && game.scoreAway !== null
                            ? `${game.scoreHome} : ${game.scoreAway}`
                            : "-"}
                        </td>
                        <td>
                          {new Date(game.gameStartTime).toLocaleString("ko-KR")}
                        </td>
                        <td>
                          {new Date(game.updatedAt).toLocaleString("ko-KR")}
                        </td>
                        <td className="p-1">
                          <div className="d-flex flex-column gap-1">
                            <a
                              href="#"
                              className="btn btn-success btn-sm text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                handleGameDetail(game.id);
                              }}
                            >
                              상세내역
                            </a>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-info"
                                onClick={() =>
                                  handleStatusChange(game.id, 0, "이용가능")
                                }
                                disabled={game.adminIsSuspended === 0}
                              >
                                이용가능
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={() =>
                                  handleStatusChange(game.id, 1, "이용중지")
                                }
                                disabled={game.adminIsSuspended === 1}
                              >
                                이용중지
                              </button>
                            </div>
                            <button
                              className="btn btn-sm btn-danger"
                              type="button"
                              onClick={() => handleCancelGame(game.id)}
                              disabled={game.matchStatus === "cancelled"}
                            >
                              경기취소
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    {pagination.page > 1 && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() =>
                            setPagination((prev) => ({
                              ...prev,
                              page: prev.page - 1,
                            }))
                          }
                        >
                          &lsaquo;
                        </button>
                      </li>
                    )}
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <li
                            key={page}
                            className={`page-item ${
                              pagination.page === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                setPagination((prev) => ({ ...prev, page }))
                              }
                            >
                              {page}
                            </button>
                          </li>
                        );
                      }
                    )}
                    {pagination.page < pagination.totalPages && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() =>
                            setPagination((prev) => ({
                              ...prev,
                              page: prev.page + 1,
                            }))
                          }
                        >
                          &rsaquo;
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
