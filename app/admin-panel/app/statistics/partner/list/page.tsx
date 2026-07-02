"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

// Types
interface PartnerStatistics {
  partner_id: number;
  username: string;
  nickname: string;
  partner_type: string;
  stat_date: string;
  game_type_id: number | null;
  game_type_code: string | null;
  game_type_name: string | null;
  site_balance: number;
  casino_balance: number;
  holdem_balance: number;
  mini_balance: number;
  total_points: number;
  user_deposit: number;
  user_withdrawal: number;
  user_profit: number;
  partner_deposit: number;
  partner_deposit_received: number;
  partner_withdrawal: number;
  partner_withdrawal_received: number;
  partner_profit: number;
  admin_deposit: number;
  admin_withdrawal: number;
  total_bet_amount: number;
  invalid_bet_amount: number;
  public_bet_amount: number;
  total_win_amount: number;
  betting_profit: number;
  rolling: number;
  member_comp: number;
  first_deposit_bonus: number;
  regular_deposit_bonus: number;
  final_profit: number;
  losing_amount: number;
  money_deposit: number;
  money_withdrawal: number;
  point_deposit: number;
  point_withdrawal: number;
}

interface GameType {
  id: number;
  code: string;
  name_ko: string;
  display_order: number;
}

interface PartnerStatisticsDateRange {
  minDate: string | null;
  maxDate: string | null;
}

const formatDateInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);

  return {
    startDate: formatDateInput(startDate),
    endDate: formatDateInput(endDate),
  };
};

// Helper function to format numbers
const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return Math.abs(num).toLocaleString("ko-KR");
};

interface CustomWindow extends Window {
  flatpickr?: (element: HTMLElement, options: Record<string, unknown>) => void;
  userDetail?: (userIdx: string | number, tab: number) => void;
  messageWrite?: (userIdx: string | number) => void;
}

export default function StatisticsPartnerListPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userID, setUserID] = useState("");
  const [userIdx] = useState("");
  const [gameGroupIdx, setGameGroupIdx] = useState("");
  const [isSortedByFinal, setIsSortedByFinal] = useState(false);

  // Data states
  const [statistics, setStatistics] = useState<PartnerStatistics[]>([]);
  const [gameTypes, setGameTypes] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = React.useCallback((): HeadersInit => {
    if (typeof window === "undefined") return {};

    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const redirectToLogin = React.useCallback(() => {
    window.location.href = "/login";
  }, []);

  const fetchStatisticsDateRange = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/statistics/partner/date-range`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();
      const range = data.data as PartnerStatisticsDateRange | undefined;

      if (data.success && range?.maxDate) {
        const maxDate = new Date(`${range.maxDate}T00:00:00`);
        const minDate = range.minDate ? new Date(`${range.minDate}T00:00:00`) : null;
        const start = new Date(maxDate);
        start.setMonth(start.getMonth() - 1);

        setStartDate(formatDateInput(minDate && start < minDate ? minDate : start));
        setEndDate(formatDateInput(maxDate));
        return;
      }
    } catch (err) {
      console.error("Failed to fetch partner statistics date range:", err);
    }

    const fallback = getDefaultDateRange();
    setStartDate(fallback.startDate);
    setEndDate(fallback.endDate);
  }, [getAuthHeaders, redirectToLogin]);

  const fetchGameTypes = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/statistics/game-types`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();
      if (data.success) {
        setGameTypes(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch game types:", err);
    }
  }, [getAuthHeaders, redirectToLogin]);

  const fetchStatistics = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
      });

      if (userIdx) {
        params.append("partnerId", userIdx);
      }

      if (gameGroupIdx) {
        params.append("gameTypeId", gameGroupIdx);
      }

      const response = await fetch(
        `${BACKEND_URL}/api/admin/statistics/partner?${params}`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (data.success) {
        console.log("Statistics Data Received:", data.data);
        setStatistics(data.data || []);
      } else {
        setError(data.error || data.message || "Failed to fetch statistics");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Failed to fetch statistics:", error);
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, userIdx, gameGroupIdx, getAuthHeaders, redirectToLogin]);

  // Fetch game types and initialize date range on mount
  useEffect(() => {
    void Promise.resolve().then(() => {
      fetchGameTypes();
      fetchStatisticsDateRange();
    });
  }, [fetchGameTypes, fetchStatisticsDateRange]);

  // Fetch statistics when dates change
  useEffect(() => {
    if (startDate && endDate) {
      void Promise.resolve().then(fetchStatistics);
    }
  }, [startDate, endDate, userIdx, gameGroupIdx, fetchStatistics]);

  useEffect(() => {
    // Initialize flatpickr for date inputs if available
    const customWindow = window as unknown as CustomWindow;
    if (typeof window !== "undefined" && customWindow.flatpickr) {
      if (startDateRef.current) {
        customWindow.flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          minDate: new Date("2024-02-01"),
          onChange: (selectedDates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        customWindow.flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          minDate: new Date("2024-02-01"),
          onChange: (selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }
  }, []);

  const handleUserSelectPopup = () => {
    // TODO: Implement user selection popup
    console.log("User select popup");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatistics();
  };

  const handleGameGroupFilter = (groupIdx: string) => {
    setGameGroupIdx(groupIdx);
  };

  const handleSortByFinal = () => {
    setIsSortedByFinal(!isSortedByFinal);
    // Sort statistics by final_profit
    const sorted = [...statistics].sort((a, b) => {
      if (isSortedByFinal) {
        return a.final_profit - b.final_profit;
      } else {
        return b.final_profit - a.final_profit;
      }
    });
    setStatistics(sorted);
  };

  const handleExcelDownload = () => {
    window.location.href = "/excel/PartnerSettlement.xlsx";
  };

  // Group statistics by partner
  const groupedByPartner = statistics.reduce(
    (acc, stat) => {
      const key = stat.partner_id;
      if (!acc[key]) {
        acc[key] = {
          partner: stat,
          gameTypes: [],
          total: null as PartnerStatistics | null,
        };
      }

      // If game_type_id is null or undefined, it's a total row
      if (stat.game_type_id === null || stat.game_type_id === undefined) {
        acc[key].total = stat;
      } else {
        acc[key].gameTypes.push(stat);
      }

      return acc;
    },
    {} as Record<
      number,
      {
        partner: PartnerStatistics;
        gameTypes: PartnerStatistics[];
        total: PartnerStatistics | null;
      }
    >,
  );

    // Ensure all partners have at least a total entry (calculate sum)
  Object.values(groupedByPartner).forEach((group) => {
    if (!group.total && group.gameTypes.length > 0) {
      const baseStat = group.gameTypes[0];
      const totalStat = { ...baseStat, game_type_id: null, game_type_code: null, game_type_name: null };
      
      const sumFields = [
        'site_balance', 'casino_balance', 'holdem_balance', 'mini_balance', 'total_points',
        'user_deposit', 'user_withdrawal', 'user_profit', 'partner_deposit', 'partner_deposit_received',
        'partner_withdrawal', 'partner_withdrawal_received', 'partner_profit', 'admin_deposit',
        'admin_withdrawal', 'total_bet_amount', 'invalid_bet_amount', 'public_bet_amount',
        'total_win_amount', 'betting_profit', 'rolling', 'member_comp', 'first_deposit_bonus',
        'regular_deposit_bonus', 'final_profit', 'losing_amount', 'money_deposit', 'money_withdrawal',
        'point_deposit', 'point_withdrawal'
      ];
      
      sumFields.forEach(field => {
        totalStat[field as keyof PartnerStatistics] = group.gameTypes.reduce((sum, stat) => sum + Number(stat[field as keyof PartnerStatistics] || 0), 0) as never;
      });
      group.total = totalStat;
    }
  });

  // Get partner list sorted
  const partnerList = Object.values(groupedByPartner).sort((a, b) => {
    if (isSortedByFinal) {
      const aProfit = a.total?.final_profit || 0;
      const bProfit = b.total?.final_profit || 0;
      return aProfit - bProfit;
    }
    return 0;
  });

  // Calculate totals across all partners
  const calculateTotals = () => {
    const totals = partnerList.reduce(
      (acc, group) => {
        const total = group.total;
        if (total) {
          acc.site_balance += total.site_balance || 0;
          acc.total_points += total.total_points || 0;
          acc.user_deposit += total.user_deposit || 0;
          acc.user_withdrawal += total.user_withdrawal || 0;
          acc.user_profit += total.user_profit || 0;
          acc.partner_deposit += total.partner_deposit || 0;
          acc.partner_deposit_received += total.partner_deposit_received || 0;
          acc.partner_withdrawal += total.partner_withdrawal || 0;
          acc.partner_withdrawal_received +=
            total.partner_withdrawal_received || 0;
          acc.partner_profit += total.partner_profit || 0;
          acc.admin_deposit += total.admin_deposit || 0;
          acc.admin_withdrawal += total.admin_withdrawal || 0;
          acc.total_bet_amount += total.total_bet_amount || 0;
          acc.total_win_amount += total.total_win_amount || 0;
          acc.betting_profit += total.betting_profit || 0;
          acc.rolling += total.rolling || 0;
          acc.member_comp += total.member_comp || 0;
          acc.first_deposit_bonus += total.first_deposit_bonus || 0;
          acc.regular_deposit_bonus += total.regular_deposit_bonus || 0;
          acc.final_profit += total.final_profit || 0;
          acc.money_deposit += total.money_deposit || 0;
          acc.money_withdrawal += total.money_withdrawal || 0;
        }
        return acc;
      },
      {
        site_balance: 0,
        total_points: 0,
        user_deposit: 0,
        user_withdrawal: 0,
        user_profit: 0,
        partner_deposit: 0,
        partner_deposit_received: 0,
        partner_withdrawal: 0,
        partner_withdrawal_received: 0,
        partner_profit: 0,
        admin_deposit: 0,
        admin_withdrawal: 0,
        total_bet_amount: 0,
        total_win_amount: 0,
        betting_profit: 0,
        rolling: 0,
        member_comp: 0,
        first_deposit_bonus: 0,
        regular_deposit_bonus: 0,
        final_profit: 0,
        money_deposit: 0,
        money_withdrawal: 0,
      },
    );
    return totals;
  };

  const totals = calculateTotals();
  const gameTypeOrder = ["casino", "slot", "board", "mini", "sports"];
  const sortedGameTypes = [...gameTypes].sort((a, b) => {
    const aIndex = gameTypeOrder.indexOf(a.code);
    const bIndex = gameTypeOrder.indexOf(b.code);
    if (aIndex === -1 && bIndex === -1)
      return a.display_order - b.display_order;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Map game types to display names
  const gameTypeMap: Record<string, string> = {
    casino: "카지노",
    slot: "슬롯",
    board: "보드게임",
    mini: "미니게임",
    sports: "스포츠",
  };

  return (
    <Layout>
      <style jsx>{`
        #partnerTable tbody .odd {
          background-color: rgba(
            var(--bs-gray-200-rgb),
            var(--bs-bg-opacity)
          ) !important;
          color: var(--bs-table-striped-color);
        }
      `}</style>

      <h1 className="page-header">
        <a href="/statistics/partner/list">
          <i className="fa fa-calculator me-2"></i>파트너 정산
        </a>
        <small></small>
      </h1>

      {/* Search Form */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2 flex-wrap gap-2">
            <form id="searchForm" onSubmit={handleSearch} method="get">
              <input
                type="hidden"
                name="gameGroupIdx"
                id="gameGroupIdx"
                value={gameGroupIdx}
              />
              <div className="d-flex flex-wrap gap-2">
                {/* Date Range Picker */}
                <div className="input-group me-2" style={{ width: "250px" }}>
                  <input
                    ref={startDateRef}
                    type="text"
                    id="startDate"
                    name="startDate"
                    className="form-control date"
                    value={startDate}
                    readOnly
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <div className="input-group-text">~</div>
                  <input
                    ref={endDateRef}
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date"
                    value={endDate}
                    readOnly
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                {/* User Selection */}
                <div className="input-group me-2" style={{ width: "200px" }}>
                  <input
                    type="text"
                    name="userID"
                    id="userID"
                    onClick={handleUserSelectPopup}
                    className="form-control"
                    readOnly
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                  />
                  <input
                    type="hidden"
                    name="userIdx"
                    id="userIdx"
                    value={userIdx}
                  />
                  <a
                    className="btn btn-primary"
                    onClick={handleUserSelectPopup}
                  >
                    <i className="fas fa-check me-2"></i>선택
                  </a>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="btn btn-lime"
                  id="btnSearch"
                  disabled={loading}
                >
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>

                {/* Game Group Filters */}
                <div className="input-group ms-2" style={{ width: "auto" }}>
                  <button
                    className={`btn btn-info ${
                      gameGroupIdx === "" ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => handleGameGroupFilter("")}
                  >
                    <i className="fa-solid fa-list me-2"></i>전체
                  </button>
                  <div className="input-group-text">자세히</div>
                  {sortedGameTypes.map((gt) => (
                    <button
                      key={gt.id}
                      className={`btn btn-info ${
                        gameGroupIdx === gt.id.toString() ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => handleGameGroupFilter(gt.id.toString())}
                    >
                      <i className="fa-solid fa-music me-2"></i>
                      {gt.name_ko}
                    </button>
                  ))}
                </div>

                {/* Sort by Final Profit Button */}
                <button
                  type="button"
                  className={`btn ms-2 ${
                    isSortedByFinal ? "btn-indigo active" : "btn-secondary"
                  }`}
                  id="btnSortFinal"
                  onClick={handleSortByFinal}
                >
                  최종손익순
                </button>
              </div>
            </form>

            {/* Excel Download */}
            <div className="ms-auto">
              <a
                href="javascript:void(0);"
                className="btn btn-primary text-white"
                onClick={handleExcelDownload}
              >
                <i className="fa-solid fa-file-csv me-1"></i>엑셀 다운로드
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="row mb-2">
          <div className="col text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="row mb-2">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}

      {/* Table with Complete Header Structure */}
      <div className="row">
        <div className="col">
          <table
            id="partnerTable"
            className="table table-bordered table-responsive align-middle bg-white text-center fw-bold"
          >
            
            {/* Table Header */}
            <thead
              className="bg-dark bg-gradient text-white"
              style={{ position: "sticky", top: "50px", zIndex: 1 }}
            >
              <tr>
                <th rowSpan={2} className="align-middle">
                  아이디 / 닉네임
                </th>
                <th rowSpan={2} colSpan={2} className="align-middle">
                  보유 금액
                </th>
                <th rowSpan={2} className="align-middle">
                  보유 포인트
                </th>
                <th colSpan={9}>충 / 환전</th>
                <th rowSpan={2} className="align-middle">
                  구분
                </th>
                <th colSpan={2}>관리자</th>
                <th rowSpan={2} className="align-middle">
                  구분
                </th>
                <th colSpan={5}>베팅</th>
                <th colSpan={4}>수수료</th>
                <th
                  rowSpan={2}
                  className="align-middle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="베팅손익 - 롤링"
                >
                  최종손익
                </th>
                <th rowSpan={2} className="align-middle">
                  루징
                </th>
              </tr>
              <tr>
                <th colSpan={2}>사이트 충전</th>
                <th>사이트 환전</th>
                <th>충환 손익</th>
                <th>파트너 지급</th>
                <th>파트너 지급받음</th>
                <th>파트너 회수</th>
                <th>파트너 회수됨</th>
                <th>파트너 손익</th>
                <th>지급</th>
                <th>회수</th>
                <th>총 베팅금</th>
                <th>무효 베팅</th>
                <th>공 베팅</th>
                <th>총 당첨금</th>
                <th>베팅 손익</th>
                <th>롤링</th>
                <th>회원콤프</th>
                <th>첫충</th>
                <th>매충</th>
              </tr>

              {/* Summary Rows - 합계 (Total) */}
              {(() => {
                const summaryRowDefs = [
                  {
                    balanceType: "사이트",
                    depositType: "유저",
                    adminType: "머니",
                    gameType: "카지노",
                  },
                  {
                    balanceType: "카지노",
                    depositType: "파트너",
                    adminType: "포인트",
                    gameType: "슬롯",
                  },
                  {
                    balanceType: "홀덤",
                    depositType: "합계",
                    adminType: "합계",
                    gameType: "보드게임",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "미니게임",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "스포츠",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "합계",
                  },
                ];

                return summaryRowDefs.map((rowDef, rowIndex) => {
                  const isFirstRow = rowIndex === 0;
                  const balance =
                    rowDef.balanceType === "사이트"
                      ? totals.site_balance
                      : rowDef.balanceType === "카지노"
                        ? 0
                        : rowDef.balanceType === "홀덤"
                          ? 0
                          : 0;

                  const getDepositData = () => {
                    if (rowDef.depositType === "유저") {
                      return {
                        deposit: totals.user_deposit,
                        withdrawal: totals.user_withdrawal,
                        profit: totals.user_profit,
                      };
                    } else if (rowDef.depositType === "파트너") {
                      return { deposit: 0, withdrawal: 0, profit: 0 };
                    } else if (rowDef.depositType === "합계") {
                      return {
                        deposit: totals.user_deposit,
                        withdrawal: totals.user_withdrawal,
                        profit: totals.user_profit,
                      };
                    }
                    return { deposit: 0, withdrawal: 0, profit: 0 };
                  };

                  const depositData = getDepositData();

                  const getAdminData = () => {
                    if (rowDef.adminType === "머니") {
                      return {
                        deposit: totals.money_deposit,
                        withdrawal: totals.money_withdrawal,
                      };
                    } else if (rowDef.adminType === "포인트") {
                      return { deposit: 0, withdrawal: 0 };
                    } else if (rowDef.adminType === "합계") {
                      return {
                        deposit: totals.money_deposit,
                        withdrawal: totals.money_withdrawal,
                      };
                    }
                    return { deposit: 0, withdrawal: 0 };
                  };

                  const adminData = getAdminData();
                  const isTotalGameRow = rowDef.gameType === "합계";

                  return (
                    <tr
                      key={`summary-${rowIndex}`}
                      className="bg-gray-200 text-black"
                    >
                      {isFirstRow && (
                        <td rowSpan={6} className="align-middle">
                          합계
                        </td>
                      )}
                      <td>{rowDef.balanceType}</td>
                      <td>
                        {rowDef.balanceType !== "-"
                          ? formatNumber(balance)
                          : "-"}
                      </td>
                      {isFirstRow && (
                        <td rowSpan={6} className="align-middle">
                          {formatNumber(totals.total_points)}
                        </td>
                      )}
                      <td>{rowDef.depositType}</td>
                      <td className="align-middle">
                        {rowDef.depositType !== "-"
                          ? formatNumber(depositData.deposit)
                          : "-"}
                      </td>
                      <td className="align-middle">
                        {rowDef.depositType !== "-"
                          ? formatNumber(depositData.withdrawal)
                          : "-"}
                      </td>
                      <td
                        className={`align-middle ${
                          rowDef.depositType !== "-" && depositData.profit < 0
                            ? "text-red"
                            : ""
                        }`}
                      >
                        {rowDef.depositType !== "-"
                          ? formatNumber(depositData.profit)
                          : "-"}
                      </td>
                      {isFirstRow && (
                        <>
                          <td rowSpan={6} className="align-middle">
                            {formatNumber(totals.partner_deposit)}
                          </td>
                          <td rowSpan={6} className="align-middle">
                            {formatNumber(totals.partner_deposit_received)}
                          </td>
                          <td rowSpan={6} className="align-middle">
                            {formatNumber(totals.partner_withdrawal)}
                          </td>
                          <td rowSpan={6} className="align-middle">
                            {formatNumber(totals.partner_withdrawal_received)}
                          </td>
                          <td
                            rowSpan={6}
                            className={`align-middle ${
                              totals.partner_profit < 0 ? "text-red" : ""
                            }`}
                          >
                            {formatNumber(totals.partner_profit)}
                          </td>
                        </>
                      )}
                      <td>{rowDef.adminType}</td>
                      <td>
                        {rowDef.adminType !== "-"
                          ? formatNumber(adminData.deposit)
                          : "-"}
                      </td>
                      <td>
                        {rowDef.adminType !== "-"
                          ? formatNumber(adminData.withdrawal)
                          : "-"}
                      </td>
                      <td>{rowDef.gameType}</td>
                      <td>
                        {isTotalGameRow
                          ? formatNumber(totals.total_bet_amount)
                          : "0"}
                      </td>
                      <td>
                        {isTotalGameRow
                          ? "0"
                          : rowDef.gameType === "보드게임" ||
                              rowDef.gameType === "미니게임" ||
                              rowDef.gameType === "스포츠"
                            ? "-"
                            : "0"}
                      </td>
                      <td>
                        {isTotalGameRow
                          ? "0"
                          : rowDef.gameType === "보드게임" ||
                              rowDef.gameType === "미니게임" ||
                              rowDef.gameType === "스포츠"
                            ? "-"
                            : "0"}
                      </td>
                      <td>
                        {isTotalGameRow
                          ? formatNumber(totals.total_win_amount)
                          : "0"}
                      </td>
                      <td
                        className={
                          isTotalGameRow && totals.betting_profit < 0
                            ? "text-red"
                            : ""
                        }
                      >
                        {isTotalGameRow
                          ? formatNumber(totals.betting_profit)
                          : "0"}
                      </td>
                      <td>
                        {isTotalGameRow ? formatNumber(totals.rolling) : "0"}
                      </td>
                      <td>
                        {isTotalGameRow
                          ? formatNumber(totals.member_comp)
                          : "0"}
                      </td>
                      <td className="align-middle" rowSpan={1}>
                        {isTotalGameRow
                          ? formatNumber(totals.first_deposit_bonus)
                          : "0"}
                      </td>
                      <td className="align-middle" rowSpan={1}>
                        {isTotalGameRow
                          ? formatNumber(totals.regular_deposit_bonus)
                          : "0"}
                      </td>
                      <td
                        className={
                          isTotalGameRow && totals.final_profit < 0
                            ? "text-red"
                            : ""
                        }
                      >
                        {isTotalGameRow
                          ? formatNumber(totals.final_profit)
                          : "0"}
                      </td>
                      {isFirstRow && (
                        <td rowSpan={6} className="align-middle">
                          -
                        </td>
                      )}
                    </tr>
                  );
                });
              })()}
            </thead>
            <tbody>
              {partnerList.map((group) => {
                const partner = group.partner;
                const total =
                  group.total ||
                  ({
                    ...partner,
                    game_type_id: null,
                    game_type_code: null,
                    game_type_name: null,
                    site_balance: 0,
                    casino_balance: 0,
                    holdem_balance: 0,
                    mini_balance: 0,
                    total_points: 0,
                    user_deposit: 0,
                    user_withdrawal: 0,
                    user_profit: 0,
                    partner_deposit: 0,
                    partner_deposit_received: 0,
                    partner_withdrawal: 0,
                    partner_withdrawal_received: 0,
                    partner_profit: 0,
                    admin_deposit: 0,
                    admin_withdrawal: 0,
                    total_bet_amount: 0,
                    invalid_bet_amount: 0,
                    public_bet_amount: 0,
                    total_win_amount: 0,
                    betting_profit: 0,
                    rolling: 0,
                    member_comp: 0,
                    first_deposit_bonus: 0,
                    regular_deposit_bonus: 0,
                    final_profit: 0,
                    losing_amount: 0,
                    money_deposit: 0,
                    money_withdrawal: 0,
                    point_deposit: 0,
                    point_withdrawal: 0,
                  } as PartnerStatistics);
                const gameTypeStats = group.gameTypes;
                const rowSpan = 6; // 사이트, 카지노, 홀덤, 미니, -, 합계

                // Create row definitions matching HTML structure exactly
                const rowDefinitions = [
                  {
                    balanceType: "사이트",
                    depositType: "유저",
                    adminType: "머니",
                    gameType: "casino",
                  },
                  {
                    balanceType: "카지노",
                    depositType: "파트너",
                    adminType: "포인트",
                    gameType: "slot",
                  },
                  {
                    balanceType: "홀덤",
                    depositType: "합계",
                    adminType: "합계",
                    gameType: "board",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "mini",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "sports",
                  },
                  {
                    balanceType: "-",
                    depositType: "-",
                    adminType: "-",
                    gameType: "total",
                  },
                ];

                return (
                  <React.Fragment key={partner.partner_id}>
                    {rowDefinitions.map((rowDef, rowIndex) => {
                      const isFirstRow = rowIndex === 0;

                      const getBalanceByType = (
                        stats: PartnerStatistics,
                        type: string,
                      ): number => {
                        switch (type) {
                          case "사이트":
                            return Number(stats.site_balance || 0);
                          case "카지노":
                            return Number(stats.casino_balance || 0);
                          case "홀덤":
                            return Number(stats.holdem_balance || 0);
                          case "미니":
                            return Number(stats.mini_balance || 0);
                          default:
                            return 0;
                        }
                      };

                      const balance =
                        rowDef.balanceType !== "-"
                          ? getBalanceByType(total, rowDef.balanceType)
                          : 0;
                      const gameTypeStat =
                        gameTypeStats.find(
                          (stat) => stat.game_type_code === rowDef.gameType,
                        ) || null;
                      const isTotalRow = rowDef.gameType === "total";

                      // Get deposit/withdrawal values based on type
                      const getDepositWithdrawal = () => {
                        if (rowDef.depositType === "유저") {
                          return {
                            deposit: Number(total.user_deposit || 0),
                            withdrawal: Number(total.user_withdrawal || 0),
                            profit: Number(total.user_profit || 0),
                          };
                        } else if (rowDef.depositType === "파트너") {
                          return {
                            deposit: Number(total.partner_deposit || 0),
                            withdrawal: Number(total.partner_withdrawal || 0),
                            profit: Number(total.partner_profit || 0),
                          };
                        } else if (rowDef.depositType === "합계") {
                          const userDep = Number(total.user_deposit || 0);
                          const partDep = Number(total.partner_deposit || 0);
                          const userWith = Number(total.user_withdrawal || 0);
                          const partWith = Number(
                            total.partner_withdrawal || 0,
                          );
                          const userProf = Number(total.user_profit || 0);
                          const partProf = Number(total.partner_profit || 0);
                          return {
                            deposit: userDep + partDep,
                            withdrawal: userWith + partWith,
                            profit: userProf + partProf,
                          };
                        }
                        return { deposit: 0, withdrawal: 0, profit: 0 };
                      };

                      const depositData = getDepositWithdrawal();

                      // Get admin values based on type
                      const getAdminData = () => {
                        if (rowDef.adminType === "머니") {
                          return {
                            deposit: Number(total.money_deposit || 0),
                            withdrawal: Number(total.money_withdrawal || 0),
                          };
                        } else if (rowDef.adminType === "포인트") {
                          return {
                            deposit: Number(total.point_deposit || 0),
                            withdrawal: Number(total.point_withdrawal || 0),
                          };
                        } else if (rowDef.adminType === "합계") {
                          const mDep = Number(total.money_deposit || 0);
                          const pDep = Number(total.point_deposit || 0);
                          const mWith = Number(total.money_withdrawal || 0);
                          const pWith = Number(total.point_withdrawal || 0);
                          return {
                            deposit: mDep + pDep,
                            withdrawal: mWith + pWith,
                          };
                        }
                        return { deposit: 0, withdrawal: 0 };
                      };

                      const adminData = getAdminData();

                      // Get game type display name
                      const getGameTypeName = () => {
                        if (isTotalRow) return "합계";
                        if (gameTypeStat)
                          return (
                            gameTypeStat.game_type_name ||
                            gameTypeMap[rowDef.gameType] ||
                            "-"
                          );
                        return gameTypeMap[rowDef.gameType] || "-";
                      };

                      // Get betting/commission data
                      const getBettingData = () => {
                        const target = gameTypeStat || total;
                        if (isTotalRow || gameTypeStat) {
                          return {
                            total_bet: Number(target.total_bet_amount || 0),
                            invalid_bet: Number(target.invalid_bet_amount || 0),
                            public_bet: Number(target.public_bet_amount || 0),
                            total_win: Number(target.total_win_amount || 0),
                            betting_profit: Number(target.betting_profit || 0),
                            rolling: Number(target.rolling || 0),
                            member_comp: Number(target.member_comp || 0),
                            first_deposit: Number(
                              target.first_deposit_bonus || 0,
                            ),
                            regular_deposit: Number(
                              target.regular_deposit_bonus || 0,
                            ),
                            final_profit: Number(target.final_profit || 0),
                          };
                        }
                        return {
                          total_bet: 0,
                          invalid_bet: 0,
                          public_bet: 0,
                          total_win: 0,
                          betting_profit: 0,
                          rolling: 0,
                          member_comp: 0,
                          first_deposit: 0,
                          regular_deposit: 0,
                          final_profit: 0,
                        };
                      };

                      const bettingData = getBettingData();

                      return (
                        <tr
                          key={`${partner.partner_id}-${rowIndex}`}
                          data-depth={partner.partner_id}
                          className="depthclose"
                        >
                          {/* Partner Info (only on first row) */}
                          {isFirstRow && (
                            <td
                              rowSpan={rowSpan}
                              className="text-start conetentID"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                              }}
                            >
                              <div
                                className="input-group w-auto d-inline-flex user-action"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <div
                                  className="input-group-text p-1 cursor-pointer"
                                  style={{ backgroundColor: "#f4a29c" }}
                                >
                                  {partner.partner_type}
                                </div>
                                <label className="form-control p-1 cursor-pointer">
                                  {partner.username} ({partner.nickname})
                                </label>
                              </div>
                              <ul className="dropdown-menu dropdown-menu-dark py-0">
                                <li
                                  className="fw-600 text-white"
                                  style={{
                                    padding:
                                      "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                                  }}
                                >
                                  <i className="fa fa-user me-2"></i>
                                  {partner.username} ({partner.nickname})
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 1)
                                    }
                                  >
                                    정보수정
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 17)
                                    }
                                  >
                                    수수료율
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 3)
                                    }
                                  >
                                    머니지급/차감
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 6)
                                    }
                                  >
                                    포인트지급/차감
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).messageWrite?.(partner.partner_id)
                                    }
                                  >
                                    쪽지보내기
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 8)
                                    }
                                  >
                                    베팅내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 4)
                                    }
                                  >
                                    충환전내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 5)
                                    }
                                  >
                                    머니거래내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 7)
                                    }
                                  >
                                    포인트거래내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      (
                                        window as unknown as CustomWindow
                                      ).userDetail?.(partner.partner_id, 15)
                                    }
                                  >
                                    쿠폰 현황
                                  </a>
                                </li>
                              </ul>
                            </td>
                          )}

                          {/* Balance Type */}
                          <td>{rowDef.balanceType}</td>
                          <td>
                            {rowDef.balanceType !== "-"
                              ? formatNumber(balance)
                              : "-"}
                          </td>

                          {/* Points (only on first row) */}
                          {isFirstRow && (
                            <td rowSpan={rowSpan} className="align-middle">
                              {formatNumber(Number(total.total_points || 0))}
                            </td>
                          )}

                          {/* Deposit/Withdrawal */}
                          <td>{rowDef.depositType}</td>
                          <td className="align-middle">
                            {rowDef.depositType !== "-"
                              ? formatNumber(depositData.deposit)
                              : "-"}
                          </td>
                          <td className="align-middle">
                            {rowDef.depositType !== "-"
                              ? formatNumber(depositData.withdrawal)
                              : "-"}
                          </td>
                          <td
                            className={`align-middle ${
                              rowDef.depositType !== "-" &&
                              depositData.profit < 0
                                ? "text-red"
                                : ""
                            }`}
                          >
                            {rowDef.depositType !== "-"
                              ? formatNumber(depositData.profit)
                              : "-"}
                          </td>

                          {/* Partner transactions (only on first row) */}
                          {isFirstRow && (
                            <>
                              <td rowSpan={rowSpan} className="align-middle">
                                {formatNumber(total.partner_deposit)}
                              </td>
                              <td rowSpan={rowSpan} className="align-middle">
                                {formatNumber(total.partner_deposit_received)}
                              </td>
                              <td rowSpan={rowSpan} className="align-middle">
                                {formatNumber(total.partner_withdrawal)}
                              </td>
                              <td rowSpan={rowSpan} className="align-middle">
                                {formatNumber(
                                  total.partner_withdrawal_received,
                                )}
                              </td>
                              <td
                                rowSpan={rowSpan}
                                className={`align-middle ${
                                  total.partner_profit < 0 ? "text-red" : ""
                                }`}
                              >
                                {formatNumber(total.partner_profit)}
                              </td>
                            </>
                          )}

                          {/* Admin Actions */}
                          <td>{rowDef.adminType}</td>
                          <td>
                            {rowDef.adminType !== "-"
                              ? formatNumber(adminData.deposit)
                              : "-"}
                          </td>
                          <td>
                            {rowDef.adminType !== "-"
                              ? formatNumber(adminData.withdrawal)
                              : "-"}
                          </td>

                          {/* Game Type */}
                          <td>{getGameTypeName()}</td>

                          {/* Betting Stats */}
                          <td>
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.total_bet)
                              : "0"}
                          </td>
                          <td>
                            {(isTotalRow || gameTypeStat) &&
                            bettingData.invalid_bet !== null
                              ? formatNumber(bettingData.invalid_bet)
                              : "-"}
                          </td>
                          <td>
                            {(isTotalRow || gameTypeStat) &&
                            bettingData.public_bet !== null
                              ? formatNumber(bettingData.public_bet)
                              : "-"}
                          </td>
                          <td>
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.total_win)
                              : "0"}
                          </td>
                          <td
                            className={
                              bettingData.betting_profit < 0 ? "text-red" : ""
                            }
                          >
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.betting_profit)
                              : "0"}
                          </td>

                          {/* Commission */}
                          <td>
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.rolling)
                              : "0"}
                          </td>
                          <td>
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.member_comp)
                              : "0"}
                          </td>
                          <td
                            className={rowIndex < 2 ? "9" : ""}
                            rowSpan={rowIndex < 2 ? 1 : undefined}
                          >
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.first_deposit)
                              : "0"}
                          </td>
                          <td
                            className={rowIndex < 2 ? "11" : ""}
                            rowSpan={rowIndex < 2 ? 1 : undefined}
                          >
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.regular_deposit)
                              : "0"}
                          </td>

                          {/* Final Profit */}
                          <td className="text-red finalSum">
                            {isTotalRow || gameTypeStat
                              ? formatNumber(bettingData.final_profit)
                              : "0"}
                          </td>

                          {/* Losing (only on first row) */}
                          {isFirstRow && (
                            <td rowSpan={rowSpan} className="align-middle">
                              {total.losing_amount
                                ? formatNumber(total.losing_amount)
                                : "-"}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>

            
          </table>
        </div>
      </div>
    </Layout>
  );
}
