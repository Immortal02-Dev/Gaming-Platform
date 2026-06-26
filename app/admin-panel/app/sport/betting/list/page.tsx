"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

// Extend Window interface for jQuery and user helper functions
declare global {
  interface Window {
    $: any;
    jQuery: any;
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
    fnSelectUser?: (userIdx: string | number, text: string, child: string) => void;
    depthControl?: (obj: HTMLElement, depth: string, level: number, userIdx: string | number) => void;
  }
}

const BACKEND_URL = ""; // Use relative path for proxy

interface BettingOrder {
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
  betStatus: string;
  betStatusDisplay: string;
  typeFlag: number;
  typeFlagDisplay: string;
  typeCrossSpecial: number;
  typeCrossSpecialDisplay: string;
  folderCount: number;
  totalOdds: number;
  betMoney: number;
  expectWinMoney: number;
  winMoney: number;
  betTime: string;
  resultTime: string | null;
}

interface BettingSummary {
  totalBetMoney: number;
  totalWinMoney: number;
  totalLoseMoney: number;
  totalCancelledMoney: number;
}

export default function SportBettingListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [typeFlag, setTypeFlag] = useState("");
  const [typeCrossSpecial, setTypeCrossSpecial] = useState("");
  const [betStatus, setBetStatus] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState<BettingOrder[]>([]);
  const [summary, setSummary] = useState<BettingSummary>({
    totalBetMoney: 0,
    totalWinMoney: 0,
    totalLoseMoney: 0,
    totalCancelledMoney: 0,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize flatpickr for date inputs if available
    if (typeof window !== "undefined" && (window as any).flatpickr) {
      if (startDateRef.current) {
        (window as any).flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
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
          onChange: (selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }

    // Fetch data on initial load
    fetchOrders(1);
  }, []);

  const fetchOrders = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(startDate && endDate && { startDate, endDate }),
        ...(typeFlag && { typeFlag }),
        ...(typeCrossSpecial && { typeCrossSpecial }),
        ...(betStatus && { betStatus }),
        ...(searchType && { searchType }),
        ...(searchText && { searchText }),
      });

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-betting?${params.toString()}`,
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
          totalLoseMoney: 0,
          totalCancelledMoney: 0,
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

  useEffect(() => {
    fetchOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, startDate, endDate, typeFlag, typeCrossSpecial, betStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "win":
        return "badge bg-success";
      case "lose":
        return "badge bg-warning";
      case "pending":
        return "badge bg-info";
      case "cancelled":
      case "cancelled_by_user":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  useEffect(() => {
    // jQuery initialization for detail view
    if (typeof window !== "undefined" && window.$) {
      const $ = window.$;

      // Show detail functionality
      $(document)
        .off("click", ".showDetail")
        .on("click", ".showDetail", function (this: any) {
          const orderId = $(this).data("orderid");
          const self = $(this);

          if ($(this).parents("tr").next().hasClass("detail")) {
            $(this).parents("tr").next().remove();
            return false;
          }

          $.ajax({
            type: "GET",
            url: `${BACKEND_URL}/api/admin/sport-betting/detail/${orderId}`,
            xhrFields: {
              withCredentials: true,
            },
            success: function (ret: any) {
              if (ret.success && ret.data) {
                const { order, games } = ret.data;
                let detailHtml = `
                <table class="table dataTable table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold" style="margin:0!important;">
                  <thead class="bg-dark bg-gradient text-white">
                    <tr>
                      <th>경기 시작일자</th>
                      <th>종목</th>
                      <th>리그</th>
                      <th>매치</th>
                      <th>마켓</th>
                      <th>선택</th>
                      <th>배당</th>
                      <th>베팅 결과</th>
                      <th>폴더 취소</th>
                      <th>결과 시간</th>
                    </tr>
                  </thead>
                  <tbody>`;

                games.forEach((game: any) => {
                  detailHtml += `
                  <tr>
                    <td>${game.gameStartDate}</td>
                    <td><img src="${game.sportImage || ""
                    }" class="sport_image" onerror="this.style.display='none';">${game.sportName
                    }</td>
                    <td>${game.leagueName}</td>
                    <td>
                      <div class="d-flex justify-content-between row-cols-3">
                        <div class="member home">
                          <img src="${game.teamHomeImage || ""
                    }" class="sport_image" onerror="this.style.display='none';">
                          <div class="txt">${game.teamHome}</div>
                        </div>
                        <div class="memberVS">VS</div>
                        <div class="member away">
                          <div class="txt">${game.teamAway}</div>
                          <img src="${game.teamAwayImage || ""
                    }" class="sport_image" onerror="this.style.display='none';">
                        </div>
                      </div>
                    </td>
                    <td>${game.marketName}</td>
                    <td>${game.selection}</td>
                    <td>${game.odds}</td>
                    <td><span class="${getBadgeClassForStatus(
                      game.gameResult
                    )}">${game.gameResultDisplay}</span></td>
                    <td>${game.folderCancelled ? "Yes" : ""}</td>
                    <td>${game.resultTime || ""}</td>
                  </tr>`;
                });

                detailHtml += `
                  </tbody>
                  <tfoot class="bg-dark bg-gradient text-white">
                    <tr>
                      <td colspan="2">베팅금액</td>
                      <td>${formatNumber(order.betMoney)}</td>
                      <td>예상당첨금</td>
                      <td>${formatNumber(order.expectWinMoney)}</td>
                      <td>배당률</td>
                      <td>${order.totalOdds}</td>
                      <td><span class="${getBadgeClassForStatus(
                  order.betStatus
                )}">${order.betStatusDisplay}</span></td>
                      <td>베팅 시간</td>
                      <td>${order.betTime}</td>
                    </tr>
                  </tfoot>
                </table>`;

                $(self)
                  .parents("tr")
                  .after(
                    '<tr class="detail"><td colspan="99">' +
                    detailHtml +
                    "</td></tr>"
                  );
              }
            },
            error: function (e: any) {
              alert("상세내역을 불러오는데 실패했습니다.");
            },
          });
        });
    }
  }, [orders]);

  const getBadgeClassForStatus = (status: string) => {
    switch (status) {
      case "win":
        return "badge bg-success";
      case "lose":
        return "badge bg-warning";
      case "pending":
        return "badge bg-info";
      case "cancelled":
      case "cancelled_by_user":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/sport/betting/list">
          <i className="fa fa-clipboard-list me-2"></i>스포츠 베팅 내역
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

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

        .warningColor1 {
          color: #6aa84f !important;
        }

        .warningColor1 .user-action {
          color: #6aa84f !important;
        }

        .warningColor1 .user-action label {
          color: #6aa84f !important;
        }

        .warningColor2 {
          color: #744700 !important;
        }

        .warningColor2 .user-action {
          color: #744700 !important;
        }

        .warningColor2 .user-action label {
          color: #744700 !important;
        }
      `}</style>

      {/* begin row */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
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
                    ref={startDateRef}
                    type="text"
                    id="startDate"
                    name="startDate"
                    className="form-control date flatpickr-input"
                    value={startDate}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    ref={endDateRef}
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date flatpickr-input"
                    value={endDate}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>
                <select
                  name="typeFlag"
                  className="form-select w-auto me-2"
                  value={typeFlag}
                  onChange={(e) => setTypeFlag(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="1">프리매치</option>
                  <option value="2">라이브</option>
                </select>

                <select
                  name="typeCrossSpecial"
                  className="form-select w-auto me-2"
                  value={typeCrossSpecial}
                  onChange={(e) => setTypeCrossSpecial(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="1">크로스</option>
                  <option value="2">스페셜</option>
                  <option value="3">통합</option>
                </select>

                <select
                  name="betStatus"
                  className="form-select w-auto me-2"
                  value={betStatus}
                  onChange={(e) => setBetStatus(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="pending">진행중</option>
                  <option value="win">당첨</option>
                  <option value="lose">낙첨</option>
                  <option value="cancelled">취소</option>
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
                  <option value="gameID">게임ID</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button type="submit" className="btn btn-lime ms-2">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      (window as any).bettingDelete
                    ) {
                      (window as any).bettingDelete("sel", null);
                    }
                  }}
                >
                  <i className="fa-solid fa-check me-2"></i>선택삭제
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
                낙첨 금액 :{" "}
                <span className="text-blue">
                  {formatNumber(summary.totalLoseMoney)}
                </span>
              </label>
              /
              <label className="col-form-label">
                취소 금액 :{" "}
                <span className="text-black">
                  {formatNumber(summary.totalCancelledMoney)}
                </span>
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
                <th>베팅 상태</th>
                <th>라이브 구분</th>
                <th>스페셜 구분</th>
                <th>조합 갯수</th>
                <th>배당률</th>
                <th className="sorting" data-sort="betMoney">
                  베팅액
                </th>
                <th className="sorting" data-sort="expectWinMoney">
                  예상당첨금
                </th>
                <th className="sorting" data-sort="winMoney">
                  당첨금
                </th>
                <th>베팅시간</th>
                <th>결과시간</th>
                <th>상세</th>
                <th>취소</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={15} className="text-center p-4">
                    <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={15} className="text-center p-4">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.no}</td>
                    <td className="p-1">
                      {order.affiliation ? (
                        <div
                          style={{
                            backgroundColor: order.affiliation.backgroundColor,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        >
                          {order.affiliation.role}
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="p-1">
                      <div
                        className="input-group w-auto d-flex user-action"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div
                          className="input-group-text p-1 cursor-pointer d-inline"
                          style={{
                            backgroundColor:
                              order.affiliation?.backgroundColor || "#f4a29c",
                          }}
                        >
                          {order.affiliation?.role || "회원"}
                        </div>
                        <label className="form-control p-1 cursor-pointer">
                          {order.user.userID} ({order.user.nickname})
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
                          {order.user.userID} ({order.user.nickname})
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 1)}
                          >
                            정보수정
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 17)}
                          >
                            수수료율
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 3)}
                          >
                            머니지급/차감
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 6)}
                          >
                            포인트지급/차감
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`javascript:messageWrite(${order.user.userIdx});`}
                          >
                            쪽지보내기
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 8)}
                          >
                            베팅내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 4)}
                          >
                            충환전내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 5)}
                          >
                            머니거래내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 7)}
                          >
                            포인트거래내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => (window as any).userDetail(order.user.userIdx, 15)}
                          >
                            쿠폰 현황
                          </a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span className={getBadgeClass(order.betStatus)}>
                        {order.betStatusDisplay}
                      </span>
                    </td>
                    <td>{order.typeFlagDisplay}</td>
                    <td>{order.typeCrossSpecialDisplay}</td>
                    <td>{order.folderCount}</td>
                    <td>{order.totalOdds}</td>
                    <td>{formatNumber(order.betMoney)}</td>
                    <td>{formatNumber(order.expectWinMoney)}</td>
                    <td>{formatNumber(order.winMoney)}</td>
                    <td>{order.betTime}</td>
                    <td>{order.resultTime || ""}</td>
                    <td className="p-1">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-success btn-sm text-white showDetail"
                        data-orderid={order.id}
                      >
                        상세내역
                      </a>
                    </td>
                    <td className="p-1"></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col" style={{ display: "contents" }}></div>
      </div>
    </Layout>
  );
}
