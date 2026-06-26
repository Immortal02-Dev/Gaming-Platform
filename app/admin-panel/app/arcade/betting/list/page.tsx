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

interface ArcadeBettingOrder {
  id: number;
  no: number;
  affiliation: {
    role: string;
    backgroundColor: string;
  } | null;
  user: {
    userIdx: number;
    userID: string;
    nickname: string;
  };
  gameInning: string;
  gameType: string;
  betItem: string;
  odds: number;
  beforeMoney: number;
  betMoney: number;
  afterMoney: number;
  winBeforeMoney: number;
  winMoney: number;
  winAfterMoney: number;
  betStatus: number;
  betStatusDisplay: string;
  gameTime: string;
  betTime: string;
  resultTime: string;
  note: string;
}

interface BettingSummary {
  totalBetMoney: number;
  totalWinMoney: number;
  totalCancelMoney: number;
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

export default function ArcadeBettingListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gameTypeIdx, setGameTypeIdx] = useState("4");
  const [betStatus, setBetStatus] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState<ArcadeBettingOrder[]>([]);
  const [summary, setSummary] = useState<BettingSummary>({
    totalBetMoney: 0,
    totalWinMoney: 0,
    totalCancelMoney: 0,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize flatpickr for datetime inputs if available
    if (typeof window !== "undefined" && (window as any).flatpickr) {
      if (startDateRef.current) {
        (window as any).flatpickr(startDateRef.current, {
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
        (window as any).flatpickr(endDateRef.current, {
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
  }, []);

  const fetchOrders = async (
    page: number = 1,
    overrideGameTypeIdx?: string
  ) => {
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
        `${BACKEND_URL}/api/admin/arcade-betting?${params.toString()}`,
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
          totalCancelMoney: 0,
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
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const handleGameTypeChange = (idx: number) => {
    const newGameType = idx.toString();
    setGameTypeIdx(newGameType);
    // Fetch data with new game type (pass directly to avoid stale state)
    fetchOrders(1, newGameType);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const handleDelete = async (orderIdx: number) => {
    if (!confirm("베팅을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-betting/${orderIdx}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.status}`);
      }

      alert("삭제되었습니다.");
      fetchOrders(currentPage);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

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
        <a href="/arcade/betting/list">
          <i className="fa fa-clipboard-list me-2"></i>미니게임 베팅 내역
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
                <div className="input-group me-2" style={{ width: "310px" }}>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    ref={startDateRef}
                    className="form-control date_time"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="시작일시"
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
                    placeholder="종료일시"
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
                  <option value="3">취소</option>
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
                  <option value="gameInning">회차</option>
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
            <div className="ms-auto">
              <label className="col-form-label">
                베팅 금액 :{" "}
                <span className="text-primary">
                  {formatNumber(summary.totalBetMoney)}
                </span>
              </label>
              /
              <label className="col-form-label">
                당첨 금액 :{" "}
                <span className="text-danger">
                  {formatNumber(summary.totalWinMoney)}
                </span>
              </label>
              /
              <label className="col-form-label">
                취소 금액 :{" "}
                <span>{formatNumber(summary.totalCancelMoney)}</span>
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
                <th>소속</th>
                <th>아이디(닉네임)</th>
                <th>회차</th>
                <th>게임 종류</th>
                <th>베팅 항목</th>
                <th>배당</th>
                <th>이전 금액</th>
                <th className="sorting" data-sort="betMoney">
                  베팅액
                </th>
                <th>이후 금액</th>
                <th>당첨 이전 금액</th>
                <th className="sorting" data-sort="winMoney">
                  당첨금
                </th>
                <th>당첨 이후 금액</th>
                <th>상태</th>
                <th>게임시간</th>
                <th>베팅시간</th>
                <th>결과시간</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={18} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">로딩 중...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={18} className="text-center py-5">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} data-gametype={gameTypeIdx}>
                    <td>{order.no}</td>
                    <td>
                      {order.affiliation ? (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: order.affiliation.backgroundColor,
                          }}
                        >
                          {order.affiliation.role}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {order.user.userID}({order.user.nickname})
                    </td>
                    <td>{order.gameInning}</td>
                    <td>{order.gameType}</td>
                    <td>{order.betItem}</td>
                    <td>{order.odds}</td>
                    <td>{formatNumber(order.beforeMoney)}</td>
                    <td>{formatNumber(order.betMoney)}</td>
                    <td>{formatNumber(order.afterMoney)}</td>
                    <td>{formatNumber(order.winBeforeMoney)}</td>
                    <td className={order.winMoney > 0 ? "text-success" : ""}>
                      {formatNumber(order.winMoney)}
                    </td>
                    <td>{formatNumber(order.winAfterMoney)}</td>
                    <td>{order.betStatusDisplay}</td>
                    <td>{order.gameTime}</td>
                    <td>{order.betTime}</td>
                    <td>{order.resultTime}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => handleDelete(order.id)}
                      >
                        <i className="fas fa-trash-alt me-1"></i>
                        삭제
                      </button>
                    </td>
                  </tr>
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
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
                      className={`page-item ${
                        currentPage === pageNum ? "active" : ""
                      }`}
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
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
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
