"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

// Extend Window interface for jQuery
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

const BACKEND_URL = ""; // Use relative path for proxy

interface SlotBettingOrder {
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
  vendor: string;
  gameType: string;
  tableName: string;
  beforeBetMoney: number;
  betMoney: number;
  afterBetMoney: number;
  beforeWinMoney: number;
  winMoney: number;
  afterWinMoney: number;
  note: string;
  betTime: string;
  resultTime: string | null;
  createdAt: string;
}

interface BettingSummary {
  totalBetMoney: number;
  totalTieMoney: number;
  totalWinMoney: number;
  totalEmptyBetMoney: number;
  totalEmptyWinMoney: number;
  totalCancelledMoney: number;
}

export default function SlotBettingListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState("2024-04-01 14:32");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0] + " 23:59");
  const [vendorIdx, setVendorIdx] = useState("");
  const [betStatus, setBetStatus] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState<SlotBettingOrder[]>([]);
  const [summary, setSummary] = useState<BettingSummary>({
    totalBetMoney: 0,
    totalTieMoney: 0,
    totalWinMoney: 0,
    totalEmptyBetMoney: 0,
    totalEmptyWinMoney: 0,
    totalCancelledMoney: 0
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

  const fetchOrders = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(startDate && endDate && { startDate, endDate }),
        ...(vendorIdx && { vendorIdx }),
        ...(betStatus && { betStatus }),
        ...(searchType && { searchType }),
        ...(searchText && { searchText }),
      });

      const response = await fetch(`${BACKEND_URL}/api/admin/slot-betting?${params.toString()}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data.data || []);
      setSummary(data.summary || {
        totalBetMoney: 0,
        totalTieMoney: 0,
        totalWinMoney: 0,
        totalEmptyBetMoney: 0,
        totalEmptyWinMoney: 0,
        totalCancelledMoney: 0
      });
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, startDate, endDate, vendorIdx, betStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/slot/betting/list">
          <i className="fa fa-clipboard-list me-2"></i>슬롯 베팅 내역
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

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
                    className="form-control date_time flatpickr-input"
                    value={startDate}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    ref={endDateRef}
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date_time flatpickr-input"
                    value={endDate}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select
                  name="vendorIdx"
                  className="form-select w-auto me-2"
                  value={vendorIdx}
                  onChange={(e) => setVendorIdx(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="17">프라그마틱 슬롯</option>
                  <option value="18">넷엔트 슬롯</option>
                  <option value="19">레드타이거 슬롯</option>
                  <option value="20">BTG 슬롯</option>
                  <option value="21">블루프린트 슬롯</option>
                  <option value="22">드래곤소프트 슬롯</option>
                  <option value="24">마이크로게이밍 슬롯</option>
                  <option value="26">릴렉스 슬롯</option>
                  <option value="30">게임아트 슬롯</option>
                  <option value="35">플레이스타게이밍 슬롯</option>
                  <option value="36">플레이앤고 슬롯</option>
                  <option value="37">노리밋시티 슬롯</option>
                  <option value="40">부운고 슬롯</option>
                  <option value="41">플레이손 슬롯</option>
                  <option value="42">CQ9 슬롯</option>
                  <option value="43">PGSoft 슬롯</option>
                  <option value="44">하바네로 슬롯</option>
                  <option value="45">GMW 슬롯</option>
                  <option value="46">아시안게이밍 슬롯</option>
                  <option value="47">스카이윈드 슬롯</option>
                  <option value="49">에보플레이 슬롯</option>
                  <option value="57">플레이텍 슬롯</option>
                  <option value="59">1X2Gaming</option>
                  <option value="60">ELK</option>
                  <option value="69">Mobilots</option>
                  <option value="71">OneTouch</option>
                  <option value="72">PlayPearls</option>
                  <option value="79">Thunderkick</option>
                  <option value="80">TriplePG</option>
                  <option value="81">와즈단</option>
                  <option value="85">Platipus</option>
                  <option value="87">RedRake</option>
                  <option value="98">intouch-games</option>
                  <option value="99">bfgames</option>
                  <option value="100">popok</option>
                  <option value="101">dreamtech</option>
                  <option value="102">caletagaming</option>
                  <option value="103">7-mojos-slots</option>
                  <option value="104">mancala</option>
                  <option value="105">retrogames</option>
                  <option value="106">spinomenal</option>
                  <option value="107">fils</option>
                  <option value="108">smartsoft</option>
                  <option value="109">platingaming</option>
                  <option value="110">7777</option>
                  <option value="111">eagaming</option>
                  <option value="113">스페이드 게이밍</option>
                  <option value="114">월드 매치</option>
                  <option value="115">포켓 게임즈</option>
                  <option value="116">로얄 슬롯</option>
                  <option value="117">EVO노리미트</option>
                  <option value="118">cc88</option>
                  <option value="119">패스트 스핀</option>
                  <option value="126">펀키게임즈 슬롯</option>
                  <option value="127">비게이밍 슬롯</option>
                  <option value="128">조커 슬롯</option>
                  <option value="129">JILI 슬롯</option>
                  <option value="130">어드밴트 플레이</option>
                  <option value="131">빅팟</option>
                  <option value="132">Ambporker</option>
                  <option value="133">YGG</option>
                  <option value="134">월드슬롯</option>
                </select>

                <select
                  name="betStatus"
                  className="form-select w-auto me-2"
                  value={betStatus}
                  onChange={(e) => setBetStatus(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="0">전체(공베팅 포함)</option>
                  <option value="1">당첨</option>
                  <option value="2">낙첨</option>
                  <option value="3">취소</option>
                  <option value="4">타이</option>
                  <option value="5">공베팅</option>
                  <option value="6">당첨 알람</option>
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
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button type="submit" className="btn btn-lime">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <label className="col-form-label">
                베팅 금액 : <span className="text-primary">{formatNumber(summary.totalBetMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                타이 금액 : <span className="text-success">{formatNumber(summary.totalTieMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                당첨 금액 : <span className="text-danger">{formatNumber(summary.totalWinMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                공베팅금 : <span className="text-primary">{formatNumber(summary.totalEmptyBetMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                공당첨금 : <span className="text-danger">{formatNumber(summary.totalEmptyWinMoney)}</span>
              </label>
              /
              <label className="col-form-label">
                취소 금액 : <span>{formatNumber(summary.totalCancelledMoney)}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table
              className="table dataTable table-striped table-bordered align-middle bg-white text-center fw-bold"
              style={{ margin: "0 !important" }}
            >
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th>No.</th>
                  <th>트랜잭션ID</th>
                  <th>소속</th>
                  <th>아이디(닉네임)</th>
                  <th>API 제공사</th>
                  <th>벤더</th>
                  <th>게임타입</th>
                  <th>테이블명</th>
                  <th>이전 금액</th>
                  <th className="sorting" data-sort="betMoney">베팅액</th>
                  <th>이후 금액</th>
                  <th>당첨 이전 금액</th>
                  <th className="sorting" data-sort="winMoney">당첨금</th>
                  <th>당첨 이후 금액</th>
                  <th>비고</th>
                  <th>베팅시간</th>
                  <th>결과시간</th>
                  <th>입력시간</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={18} className="text-center p-4">
                      <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={18} className="text-center p-4">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.no}</td>
                      <td>{order.transactionID}</td>
                      <td className="p-1">
                        {order.affiliation && (
                          <div style={{ backgroundColor: order.affiliation.backgroundColor, padding: '2px 8px', borderRadius: '4px', color: '#fff', fontSize: '12px' }}>
                            {order.affiliation.role}
                          </div>
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
                            style={{ backgroundColor: order.affiliation?.backgroundColor || "#f4a29c" }}
                          >
                            {order.affiliation?.role || '회원'}
                          </div>
                          <label className="form-control p-1 cursor-pointer">
                            {order.user.userID} ({order.user.nickname})
                          </label>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-dark py-0">
                          <li className="fw-600 text-white" style={{ padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)" }}>
                            <i className="fa fa-user me-2"></i>{order.user.userID} ({order.user.nickname})
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
                            <a className="dropdown-item" href={`javascript:messageWrite(${order.user.userIdx});`}>쪽지보내기</a>
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
                      <td>{order.apiProvider}</td>
                      <td>{order.vendor}</td>
                      <td>{order.gameType}</td>
                      <td>{order.tableName}</td>
                      <td>{formatNumber(order.beforeBetMoney)}</td>
                      <td>{formatNumber(order.betMoney)}</td>
                      <td>{formatNumber(order.afterBetMoney)}</td>
                      <td>{formatNumber(order.beforeWinMoney)}</td>
                      <td>{formatNumber(order.winMoney)}</td>
                      <td>{formatNumber(order.afterWinMoney)}</td>
                      <td>{order.note}</td>
                      <td>{order.betTime}</td>
                      <td>{order.resultTime || ''}</td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col" style={{ display: "contents" }}></div>
      </div>
    </Layout>
  );
}

