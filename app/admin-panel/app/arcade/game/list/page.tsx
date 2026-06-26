"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

// Extend Window interface for jQuery
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

const BACKEND_URL = ""; // Use relative path for proxy

interface ArcadeGame {
  gameArcadeListIdx: number;
  gameTypeIdx: number;
  gameTypeName: string;
  gameInning: string;
  gameTodayInning: string;
  gameArcadeStatus: number;
  gameArcadeStatusName: string;
  betMoney: number;
  winMoney: number;
  gameTime: string;
  betCloseTime: string;
  resultTime: string | null;
}

interface BettingStat {
  betItem: string;
  betCount: number;
  totalBetMoney: number;
  totalWinMoney: number;
  avgOdds: number;
}

interface RecentBet {
  id: number;
  userId: string;
  nickname: string;
  betItem: string;
  odds: number;
  betMoney: number;
  winMoney: number;
  betStatus: number;
  betTime: string;
}

interface GameDetail {
  gameArcadeListIdx: number;
  gameTypeIdx: number;
  gameTypeName: string;
  gameInning: string;
  gameTodayInning: number;
  gameArcadeStatus: number;
  gameArcadeStatusName: string;
  betMoney: number;
  winMoney: number;
  gameTime: string;
  betCloseTime: string;
  resultTime: string | null;
  resultData: any;
  bettingStatsByItem: BettingStat[];
  recentBets: RecentBet[];
}

const gameTypes = [
  { idx: 4, name: "파워볼(PBG)" },
  { idx: 10, name: "EOS파워볼5분" },
  { idx: 11, name: "EOS파워볼3분" },
  { idx: 12, name: "코인파워볼5분" },
  { idx: 13, name: "코인파워볼3분" },
  { idx: 14, name: "코인사다리5분" },
  { idx: 15, name: "코인사다리3분" },
];

const BET_CATEGORIES = {
  powerball: {
    title: "파워볼",
    items: ["파워 홀", "파워 짝", "파워 언더", "파워 오버"],
    defaultOdds: "1.95",
  },
  normalball: {
    title: "일반볼",
    items: ["일반 홀", "일반 짝", "일반 언더", "일반 오버"],
    defaultOdds: "1.95",
  },
  powerballCombo: {
    title: "파워볼 조합",
    items: ["홀+언더", "홀+오버", "짝+언더", "짝+오버"],
    defaultOdds: "4.10",
  },
  normalballCombo: {
    title: "일반볼 조합",
    items: ["홀+언더", "홀+오버", "짝+언더", "짝+오버"],
    defaultOdds: "3.70",
  },
  normalballSize: {
    title: "일반볼 대중소",
    items: ["일반볼 대", "일반볼 중", "일반볼 소"],
    defaultOdds: "2.90",
  },
  powerballNormalballCombo: {
    title: "파워볼+일반볼 조합",
    items: [
      "파홀+일홀",
      "파홀+일짝",
      "파짝+일홀",
      "파짝+일짝",
      "파언+일언",
      "파언+일옵",
      "파옵+일언",
      "파옵+일옵",
    ],
    defaultOdds: "3.50",
  },
};

export default function ArcadeGameListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gameTypeIdx, setGameTypeIdx] = useState("4");
  const [betStatus, setBetStatus] = useState("");
  const [searchType, setSearchType] = useState("gameInning");
  const [searchText, setSearchText] = useState("");
  const [games, setGames] = useState<ArcadeGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [gameDetails, setGameDetails] = useState<{
    [key: number]: GameDetail;
  }>({});

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set default dates to today
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);

    // Initialize flatpickr for date inputs if available
    if (typeof window !== "undefined" && (window as any).flatpickr) {
      if (startDateRef.current) {
        (window as any).flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: today,
          onChange: (selectedDates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        (window as any).flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: today,
          onChange: (selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }

    // Fetch data on initial load after dates are set
    setTimeout(() => fetchGames(1), 100);
  }, []);

  const fetchGames = async (page: number = 1, overrideGameTypeIdx?: string) => {
    setLoading(true);
    try {
      const effectiveGameTypeIdx = overrideGameTypeIdx ?? gameTypeIdx;
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(startDate && endDate && { startDate, endDate }),
        ...(effectiveGameTypeIdx && { gameTypeIdx: effectiveGameTypeIdx }),
        ...(betStatus && { betStatus }),
        ...(searchType && { searchType }),
        ...(searchText && { searchText }),
      });

      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-games?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
      }

      const data = await response.json();
      setGames(data.data || []);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames(1);
  };

  const handleGameTypeChange = (idx: number) => {
    const newGameType = idx.toString();
    setGameTypeIdx(newGameType);
    // Fetch data with new game type (pass directly to avoid stale state)
    fetchGames(1, newGameType);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const formatDateTime = (dateString: string | Date | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleChangeStatus = async (
    gameArcadeListIdx: number,
    gameArcadeStatus: number,
    gameArcadeStatusName: string
  ) => {
    if (!confirm(`${gameArcadeStatusName} 상태로 변경하시겠습니까?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-games/${gameArcadeListIdx}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameArcadeStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      alert("상태가 변경되었습니다.");
      fetchGames(currentPage);
    } catch (error: any) {
      console.error("Error changing status:", error);
      alert(error.message || "상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleGameListDetail = async (gameArcadeListIdx: number) => {
    // Toggle expanded row
    if (expandedRow === gameArcadeListIdx) {
      setExpandedRow(null);
      return;
    }

    // If detail already fetched, just expand
    if (gameDetails[gameArcadeListIdx]) {
      setExpandedRow(gameArcadeListIdx);
      return;
    }

    // Fetch detail
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-games/${gameArcadeListIdx}/detail?gameTypeIdx=${gameTypeIdx}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch game detail: ${response.status}`);
      }

      const data = await response.json();
      setGameDetails((prev) => ({
        ...prev,
        [gameArcadeListIdx]: data.data,
      }));
      setExpandedRow(gameArcadeListIdx);
    } catch (error) {
      console.error("Error fetching game detail:", error);
      alert("상세내역을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleBettingListDetail = (gameArcadeListIdx: number, type: string) => {
    const nWidth = screen.width;
    const nHeight = screen.height;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      `/arcade/betting/list?gameTypeIdx=${gameTypeIdx}&gameArcadeListIdx=${gameArcadeListIdx}&type=${type}`,
      "",
      `top=${nTop}, left=${nLeft},width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const handleArcadeGameStatusBoard = () => {
    const nWidth = screen.width;
    const nHeight = screen.height;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      "/arcade/game/status-board",
      "",
      `top=${nTop}, left=${nLeft},width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const renderStatusBadge = (game: ArcadeGame) => {
    const statuses = [
      { value: 1, name: "베팅 가능", class: "primary" },
      { value: 2, name: "베팅 마감", class: "warning" },
      { value: 3, name: "결과 마감", class: "success" },
      { value: 4, name: "취소", class: "danger" },
    ];

    return statuses.map((status) => {
      const isActive = game.gameArcadeStatus === status.value;
      const isClickable = !isActive && status.value !== 3; // 결과 마감은 클릭 불가

      return (
        <span
          key={status.value}
          className={`cursor-pointer badge ${
            isActive ? `bg-${status.class}` : "bg-secondary"
          }`}
          onClick={() => {
            if (isClickable) {
              handleChangeStatus(
                game.gameArcadeListIdx,
                status.value,
                status.name
              );
            }
          }}
          style={{
            cursor: isClickable ? "pointer" : "default",
            opacity: isActive ? 1 : 0.6,
          }}
        >
          {status.name}
        </span>
      );
    });
  };

  const renderBettingCategory = (
    categoryKey: keyof typeof BET_CATEGORIES,
    gameDetail: GameDetail
  ) => {
    const category = BET_CATEGORIES[categoryKey];
    return (
      <div className="row m-2 rounded border">
        <div
          className="col rounded-top text-white p-2"
          style={{ backgroundColor: "#999" }}
        >
          {category.title}
        </div>
        <div className="row mx-1 my-2">
          {category.items.map((item) => {
            const stat = gameDetail?.bettingStatsByItem?.find(
              (s: BettingStat) => s.betItem === item
            );
            return (
              <div key={item} className="col rounded border mx-1">
                <div className="row">
                  <div className="bg-gray-300">
                    {item} ({stat?.avgOdds?.toFixed(2) || category.defaultOdds})
                  </div>
                  <div style={{ color: "#FF8000" }}>
                    {formatNumber(stat?.totalBetMoney || 0)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/arcade/game/list">
          <i className="fa fa-gamepad me-2"></i>미니게임 관리
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      <div className="d-inline-block fs-6 align-top mb-2">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
              href="javascript:void(0);"
              className="nav-link active bg-red me-2"
              onClick={handleArcadeGameStatusBoard}
            >
              현황판
            </a>
          </li>
          {gameTypes.map((game) => (
            <li key={game.idx} className="nav-item">
              <a
                href="#"
                className={`nav-link ${
                  gameTypeIdx === game.idx.toString() ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleGameTypeChange(game.idx);
                }}
              >
                {game.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* begin row */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <input type="hidden" name="gameTypeIdx" value={gameTypeIdx} />
              <div className="d-flex">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                >
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>
                <div className="input-group me-2" style={{ width: "250px" }}>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    ref={startDateRef}
                    className="form-control date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    ref={endDateRef}
                    className="form-control date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select
                  name="betStatus"
                  className="form-select w-auto me-2"
                  value={betStatus}
                  onChange={(e) => setBetStatus(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="1">베팅 가능</option>
                  <option value="2">베팅 마감</option>
                  <option value="3">결과 마감</option>
                  <option value="4">취소</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-100px me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="gameInning">회차</option>
                  <option value="gameTodayInning">일자회차</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button
                  className="btn btn-lime"
                  type="submit"
                  disabled={loading}
                >
                  <i className="fa-solid fa-magnifying-glass me-2"></i>
                  {loading ? "검색 중..." : "검색"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* end row */}

      <div className="row">
        <div className="col">
          <table
            className="table dataTable table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold"
            id="listTable"
            style={{ margin: "0 !important" }}
          >
            <thead
              className="bg-dark bg-gradient text-white"
              style={{ position: "sticky", top: "0px", zIndex: 1 }}
            >
              <tr>
                <th className="w-80px">No.</th>
                <th>게임타입</th>
                <th>회차</th>
                <th>상태</th>
                <th>베팅금</th>
                <th>당첨금</th>
                <th className="w-200px">게임시간</th>
                <th className="w-150px">베팅마감시간</th>
                <th className="w-150px">결과시간</th>
                <th>상세내역</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">로딩 중...</span>
                    </div>
                  </td>
                </tr>
              ) : games.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-5">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                <>
                  {games.map((game) => (
                    <React.Fragment key={game.gameArcadeListIdx}>
                      <tr>
                        <td>{game.gameArcadeListIdx}</td>
                        <td>{game.gameTypeName}</td>
                        <td>
                          {game.gameInning} ({game.gameTodayInning})
                        </td>
                        <td>{renderStatusBadge(game)}</td>
                        <td>{formatNumber(game.betMoney)}</td>
                        <td>{formatNumber(game.winMoney)}</td>
                        <td>{formatDateTime(game.gameTime)}</td>
                        <td>{formatDateTime(game.betCloseTime)}</td>
                        <td>{formatDateTime(game.resultTime)}</td>
                        <td className="p-1">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-success btn-sm text-white"
                            onClick={() =>
                              handleGameListDetail(game.gameArcadeListIdx)
                            }
                          >
                            상세내역
                          </a>
                        </td>
                      </tr>
                      {expandedRow === game.gameArcadeListIdx && (
                        <tr className="arcadeGameListDetail">
                          <td colSpan={10}>
                            {gameDetails[game.gameArcadeListIdx] ? (
                              <>
                                {renderBettingCategory(
                                  "powerball",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                                {renderBettingCategory(
                                  "normalball",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                                {renderBettingCategory(
                                  "powerballCombo",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                                {renderBettingCategory(
                                  "normalballCombo",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                                {renderBettingCategory(
                                  "normalballSize",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                                {renderBettingCategory(
                                  "powerballNormalballCombo",
                                  gameDetails[game.gameArcadeListIdx]
                                )}
                              </>
                            ) : (
                              <div className="p-3 text-center">
                                <div
                                  className="spinner-border text-primary"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    로딩 중...
                                  </span>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && games.length > 0 && (
        <div className="row mt-3">
          <div className="col">
            <nav>
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchGames(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    이전
                  </button>
                </li>
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const startPage = Math.floor((currentPage - 1) / 10) * 10;
                  const pageNum = startPage + i + 1;
                  if (pageNum > totalPages) return null;
                  return (
                    <li
                      key={pageNum}
                      className={`page-item ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => fetchGames(pageNum)}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchGames(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </Layout>
  );
}
