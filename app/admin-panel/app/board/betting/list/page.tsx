"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";

// Extend Window interface for jQuery
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jQuery: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flatpickr?: any;
  }
}

const BACKEND_URL = ""; // Use relative path for proxy

interface BoardBettingOrder {
  id: number;
  no: number;
  transactionID: string;
  affiliation: {
    role: string;
    backgroundColor: string;
  } | null;
  user: {
    userIdx: number;
    userID: string;
    nickname: string;
  };
  apiProvider: string;
  gameTypeIdx: number;
  gameName: string;
  roundID: string;
  gameHoldemGroupKey: string;
  betMoney: number;
  winMoney: number;
  jackpot: number;
  betStatus: number;
  betStatusDisplay: string;
  betDetails: {
    categories: Array<{
      name: string;
      items: Array<{
        label: string;
        value: number;
      }>;
    }>;
  } | null;
  note: string;
  gameTime: string;
  createdAt: string;
}

interface BettingSummary {
  totalBetMoney: number;
  totalWinMoney: number;
}

const gameTypes = [
  { idx: 5, name: '플레이홀덤' },
  { idx: 8, name: '파파홀덤' },
  { idx: 18, name: '와일드홀덤' },
  { idx: 19, name: '웹맞고' },
  { idx: 20, name: '웹바둑이' },
  { idx: 22, name: '로얄홀덤' }
];

export default function BoardBettingListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0] + " 00:00"
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0] + " 23:59"
  );
  const [gameTypeIdx, setGameTypeIdx] = useState("5");
  const [betStatus, setBetStatus] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState<BoardBettingOrder[]>([]);
  const [summary, setSummary] = useState<BettingSummary>({
    totalBetMoney: 0,
    totalWinMoney: 0
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const fetchOrders = useCallback(
    async (page: number = 1, overrideGameTypeIdx?: string) => {
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
          `${BACKEND_URL}/api/admin/board-betting?${params.toString()}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data.data || []);
        setSummary(
          data.summary || {
            totalBetMoney: 0,
            totalWinMoney: 0,
          }
        );
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    },
    [
      gameTypeIdx,
      pageSize,
      startDate,
      endDate,
      betStatus,
      searchType,
      searchText,
    ]
  );

  useEffect(() => {
    // Initialize flatpickr for datetime inputs if available
    if (typeof window !== "undefined" && window.flatpickr) {
      if (startDateRef.current) {
        window.flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d H:i",
          enableTime: true,
          time_24hr: true,
          disableMobile: true,
          onChange: (selectedDates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        window.flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d H:i",
          enableTime: true,
          time_24hr: true,
          disableMobile: true,
          onChange: (selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }

    // Fetch data on initial load
    fetchOrders(1);
  }, [fetchOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const handleGameTypeChange = (idx: number) => {
    const newGameType = idx.toString();
    setGameTypeIdx(newGameType);
    setExpandedOrderId(null);
    // Fetch data with new game type (pass directly to avoid stale state)
    fetchOrders(1, newGameType);
  };

  const toggleDetail = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  // holdemDetail and holdemRoyalDetail are unused, keeping them as comments for future reference
  /*
  const holdemDetail = (
    siteNameEN: string,
    userID: string,
    roundID: string,
    gameHoldemGroupKey: string
  ) => {
    // This would make an AJAX call in production
    window.open("", "", "width=1800px,height=900px");
  };

  const holdemRoyalDetail = (
    gameDetailIdx: number,
    gameHoldemGroupKey: string
  ) => {
    window.open(
      `/boardBettingList.html/royalHoldemDetail?gameTypeIdx=${gameTypeIdx}&gameDetailIdx=${gameDetailIdx}&&gameHoldemGroupKey=${gameHoldemGroupKey}`,
      "",
      "width=1800px,height=900px"
    );
  };
  */

  return (
    <Layout>
      <style jsx>{`
        .warningUser {
          color: #6aa84f !important;
        }

        .warningUser .user-action {
          color: #6aa84f !important;
        }

        .warningUser .user-action label {
          color: #6aa84f !important;
        }

        .warningUser2 {
          color: #744700 !important;
        }

        .warningUser2 .user-action {
          color: #744700 !important;
        }

        .warningUser2 .user-action label {
          color: #744700 !important;
        }
      `}</style>

      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/board/betting/list">
          <i className="fa fa-clipboard-list me-2"></i>보드게임 베팅 내역
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      <div className="d-inline-block fs-6 align-top mb-2">
        <ul className="nav nav-pills">
          {gameTypes.map((game) => (
            <li key={game.idx} className="nav-item">
              <a
                href="#"
                className={`nav-link ${gameTypeIdx === game.idx.toString() ? 'active' : ''}`}
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
                <div className="input-group me-2" style={{ width: "310px" }}>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    ref={startDateRef}
                    className="form-control date_time"
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
                    className="form-control date_time"
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
                  <option value="1">당첨</option>
                  <option value="2">낙첨</option>
                  <option value="3">잭팟</option>
                </select>

                <select 
                  name="searchType" 
                  className="form-select w-auto me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                  <option value="transactionID">트랜잭션ID</option>
                  <option value="roundID">라운드</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime" type="submit" disabled={loading}>
                  <i className="fa-solid fa-magnifying-glass me-2"></i>
                  {loading ? '검색 중...' : '검색'}
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <label className="col-form-label">
                베팅 금액 : <span className="text-primary">{formatNumber(summary.totalBetMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                당첨 금액 : <span className="text-danger">{formatNumber(summary.totalWinMoney)}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      <div className="row">
        <div className="col">
          <table
            className="table dataTable table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold"
            style={{ margin: "0 !important" }}
          >
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>No.</th>
                <th>트랜잭션ID</th>
                <th>소속</th>
                <th>아이디(닉네임)</th>
                <th>API제공사</th>
                <th>라운드</th>
                <th className="sorting" data-sort="betMoney">
                  베팅액
                </th>
                <th className="sorting" data-sort="winMoney">
                  당첨금
                </th>
                <th className="sorting" data-sort="jackpot">
                  잭팟
                </th>
                <th>상세내역</th>
                <th>게임시간</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">로딩 중...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-5">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr data-gametype={order.gameTypeIdx}>
                      <td>{order.no}</td>
                      <td>{order.transactionID}</td>
                      <td>
                        {order.affiliation ? (
                          <span 
                            className="badge" 
                            style={{ backgroundColor: order.affiliation.backgroundColor }}
                          >
                            {order.affiliation.role}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{order.user.userID}({order.user.nickname})</td>
                      <td>{order.apiProvider}</td>
                      <td>{order.roundID}</td>
                      <td>{formatNumber(order.betMoney)}</td>
                      <td className={order.winMoney > 0 ? 'text-success' : ''}>
                        {formatNumber(order.winMoney)}
                      </td>
                      <td className={order.jackpot > 0 ? 'text-warning' : ''}>
                        {formatNumber(order.jackpot)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => toggleDetail(order.id)}
                        >
                          상세보기
                        </button>
                      </td>
                      <td>{order.gameTime}</td>
                    </tr>
                    {expandedOrderId === order.id && order.betDetails && (
                      <tr
                        className="arcadeGameListDetail"
                        data-userid={order.user.userIdx}
                        style={{ display: "table-row" }}
                      >
                        <td colSpan={11}>
                          {order.betDetails.categories.map((category, catIdx) => (
                            <div key={catIdx} className="row m-2 rounded border">
                              <div
                                className="col rounded-top text-white p-2"
                                style={{ backgroundColor: "#999" }}
                              >
                                {category.name}
                              </div>
                              <div className="row mx-1 my-2">
                                {category.items.map((item, itemIdx) => (
                                  <div key={itemIdx} className="col rounded border mx-1">
                                    <div className="row">
                                      <div className="bg-gray-300">{item.label}</div>
                                      <div style={{ color: "#ff8000" }}>{formatNumber(item.value)}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <div className="row mt-3">
          <div className="col">
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => fetchOrders(currentPage - 1)}
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
                      className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => fetchOrders(pageNum)}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => fetchOrders(currentPage + 1)}
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
