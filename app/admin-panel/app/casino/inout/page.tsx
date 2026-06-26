"use client";

import React, { useEffect, useRef, useState, useCallback, Suspense } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flatpickr?: any;
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
    App?: {
      init?: () => void;
      restartGlobalFunction?: () => void;
    };
  }
}

interface DropdownLink {
  label: string;
  href: (id: number) => string;
  className?: string;
}

interface CasinoInoutLog {
  id?: number;
  no?: number;
  user?: {
    userIdx?: number;
    userID?: string;
    nickname?: string;
  };
  handler?: {
    userIdx?: number;
    userID?: string;
    nickname?: string;
  };
  affiliation?: {
    role: string;
    backgroundColor: string;
  };
  apiProvider?: string;
  exchangeType?: string;
  exchangeTypeDisplay?: string;
  amount?: number;
  afterAmount?: number;
  exchangeStatusIdx?: number;
  status?: string;
  requestDate?: string;
  createdAt?: string;
}

interface Summary {
  deposit: number;
  withdraw: number;
  depositHoldem: number;
  withdrawHoldem: number;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface CasinoInoutResponse {
  success: boolean;
  data?: CasinoInoutLog[];
  summary?: Summary;
  pagination?: Pagination;
  message?: string;
  error?: string;
}

const dropdownLinks: DropdownLink[] = [
  { label: "정보수정", href: (id: number) => `javascript:userDetail(${id}, 1);`, className: "bg-gray-700" },
  { label: "수수료율", href: (id: number) => `javascript:userDetail(${id}, 17);`, className: "bg-gray-700" },
  { label: "머니지급/차감", href: (id: number) => `javascript:userDetail(${id}, 3);`, className: "bg-gray-700" },
  { label: "포인트지급/차감", href: (id: number) => `javascript:userDetail(${id}, 6);`, className: "bg-gray-700" },
  { label: "쪽지보내기", href: (id: number) => `javascript:messageWrite(${id});`, className: "bg-gray-700" },
  { label: "베팅내역", href: (id: number) => `javascript:userDetail(${id}, 8);` },
  { label: "충환전내역", href: (id: number) => `javascript:userDetail(${id}, 4);` },
  { label: "머니거래내역", href: (id: number) => `javascript:userDetail(${id}, 5);` },
  { label: "포인트거래내역", href: (id: number) => `javascript:userDetail(${id}, 7);` },
  { label: "쿠폰 현황", href: (id: number) => `javascript:userDetail(${id}, 15);` },
];

function CasinoInoutPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSearchRef = useRef<HTMLFormElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [pageSize, setPageSize] = useState<string>(searchParams.get("pageSize") || "50");
  // Default to last 90 days to ensure we see recent data
  const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    return date.toISOString().split('T')[0];
  };
  const getDefaultEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Include today
    return date.toISOString().split('T')[0];
  };
  
  const [startDate, setStartDate] = useState<string>(searchParams.get("startDate") || getDefaultStartDate());
  const [endDate, setEndDate] = useState<string>(searchParams.get("endDate") || getDefaultEndDate());
  const [exchangeType, setExchangeType] = useState<string>(searchParams.get("exchangeType") || "");
  const [exchangeStatusIdx, setExchangeStatusIdx] = useState<string>(searchParams.get("exchangeStatusIdx") || "");
  const [searchType, setSearchType] = useState<string>(searchParams.get("searchType") || "");
  const [searchText, setSearchText] = useState<string>(searchParams.get("searchText") || "");
  
  const [logs, setLogs] = useState<CasinoInoutLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<Summary>({
    deposit: 0,
    withdraw: 0,
    depositHoldem: 0,
    withdrawHoldem: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });

  const API_BASE_URL = ""; // Use relative path for proxy

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", searchParams.get("page") || "1");
      params.set("pageSize", pageSize);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (exchangeType) params.set("exchangeType", exchangeType);
      if (exchangeStatusIdx) params.set("exchangeStatusIdx", exchangeStatusIdx);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText);

      const response = await fetch(`${API_BASE_URL}/api/admin/casino-inout?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch casino inout logs");
      }

      const data: CasinoInoutResponse = await response.json();
      console.log("Casino inout API response:", data);
      
      if (data.success) {
        setLogs(data.data || []);
        setPagination(data.pagination || {
          total: 0,
          page: 1,
          pageSize: 50,
          totalPages: 1,
          hasMore: false,
        });
        if (data.summary) {
          setSummary(data.summary);
        }
      } else {
        console.error("API returned success=false:", data.error || data.message);
        setLogs([]);
        setPagination({
          total: 0,
          page: 1,
          pageSize: 50,
          totalPages: 1,
          hasMore: false,
        });
      }
    } catch (error) {
      console.error("Error fetching casino inout logs:", error);
      alert("게임 머니전환내역을 불러오는데 실패했습니다.");
      setLogs([]);
      setPagination({
        total: 0,
        page: 1,
        pageSize: 50,
        totalPages: 1,
        hasMore: false,
      });
    } finally {
      setLoading(false);
    }
  }, [searchParams, pageSize, startDate, endDate, exchangeType, exchangeStatusIdx, searchType, searchText, API_BASE_URL]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    // Handle Enter key on search text input
    let cleanup: (() => void) | undefined;
    const timer = setTimeout(() => {
      const searchTextInput = document.getElementById("searchText") as HTMLInputElement | null;
      const btnSearch = document.getElementById("btnSearch") as HTMLButtonElement | null;
      if (searchTextInput && btnSearch) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            btnSearch.click();
          }
        };
        searchTextInput.addEventListener("keydown", handleKeyDown);
        cleanup = () => {
          searchTextInput.removeEventListener("keydown", handleKeyDown);
        };
      }
    }, 100);
    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.flatpickr && startDateRef.current && endDateRef.current && startDate && endDate) {
      const startPicker = window.flatpickr(startDateRef.current, {
        locale: "ko",
        dateFormat: "Y-m-d",
        disableMobile: true,
        defaultDate: startDate,
        onChange: (selectedDates: Date[], dateStr: string) => {
          if (dateStr) {
            setStartDate(dateStr);
          }
        },
      });

      const endPicker = window.flatpickr(endDateRef.current, {
        locale: "ko",
        dateFormat: "Y-m-d",
        disableMobile: true,
        defaultDate: endDate,
        onChange: (selectedDates: Date[], dateStr: string) => {
          if (dateStr) {
            setEndDate(dateStr);
          }
        },
      });

      return () => {
        if (startPicker) startPicker.destroy();
        if (endPicker) endPicker.destroy();
      };
    }
  }, [startDate, endDate]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (exchangeType) params.set("exchangeType", exchangeType);
    if (exchangeStatusIdx) params.set("exchangeStatusIdx", exchangeStatusIdx);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/casino/inout?${params.toString()}`);
  };

  const renderPagination = (): React.JSX.Element[] => {
    const pages: React.JSX.Element[] = [];
    const currentPage = pagination.page || 1;
    const totalPages = pagination.totalPages || 1;
    const maxPages = 10;

    if (totalPages <= 0) {
      return pages;
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    // Previous button
    pages.push(
      <li
        key="prev"
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        aria-label="Previous"
      >
        {currentPage === 1 ? (
          <span className="page-link" aria-hidden="true">
            ‹
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage - 1));
              router.push(`/casino/inout?${params.toString()}`);
            }}
          >
            ‹
          </a>
        )}
      </li>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i === currentPage ? (
            <span className="page-link">{i}</span>
          ) : (
            <a
              className="page-link"
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(i));
                router.push(`/casino/inout?${params.toString()}`);
              }}
            >
              {i}
            </a>
          )}
        </li>
      );
    }

    // Next button
    pages.push(
      <li
        key="next"
        className={`page-item ${!pagination.hasMore ? "disabled" : ""}`}
        aria-label="Next"
      >
        {!pagination.hasMore ? (
          <span className="page-link" aria-hidden="true">
            ›
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage + 1));
              router.push(`/casino/inout?${params.toString()}`);
            }}
            rel="next"
          >
            ›
          </a>
        )}
      </li>
    );

    return pages;
  };

  const formatAmount = (amount: number | undefined): string => {
    return new Intl.NumberFormat("ko-KR").format(amount || 0);
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

      <h1 className="page-header">
        <a href="/casino/inout">
          <i className="fa fa-won-sign me-2"></i>게임 머니전환내역
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form ref={formSearchRef} onSubmit={handleSearch}>
              <div className="d-flex">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(e.target.value)}
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
                    className="form-control date flatpickr-input"
                    value={startDate}
                    readOnly
                    ref={startDateRef}
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date flatpickr-input"
                    value={endDate}
                    readOnly
                    ref={endDateRef}
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select
                  name="exchangeType"
                  className="form-select w-auto me-2"
                  value={exchangeType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExchangeType(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="deposit">사이트 &gt; 카지노</option>
                  <option value="withdraw">카지노 &gt; 사이트</option>
                  <option value="depositHoldem">사이트 &gt; 홀덤</option>
                  <option value="withdrawHoldem">홀덤 &gt; 사이트</option>
                </select>

                <select
                  name="exchangeStatusIdx"
                  className="form-select w-auto me-2"
                  value={exchangeStatusIdx}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExchangeStatusIdx(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="3">승인</option>
                  <option value="4">취소</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-auto me-2"
                  value={searchType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                  <option value="registerId">처리자ID</option>
                  <option value="registerNick">처리자닉네임</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <label className="col-form-label">
                사이트 &gt; 카지노 : <span className="text-primary">{formatAmount(summary.deposit)}</span>원
              </label>
              /
              <label className="col-form-label">
                카지노 &gt; 사이트 : <span className="text-danger">{formatAmount(summary.withdraw)}</span>원
              </label>
              /
              <label className="col-form-label">
                사이트 &gt; 홀덤 : <span className="text-primary">{formatAmount(summary.depositHoldem)}</span>원
              </label>
              /
              <label className="col-form-label">
                홀덤 &gt; 사이트 : <span className="text-danger">{formatAmount(summary.withdrawHoldem)}</span>원
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-80px">No.</th>
                <th>소속</th>
                <th>신청회원</th>
                <th>API 제공사</th>
                <th>타입</th>
                <th>신청금액</th>
                <th>이후금액</th>
                <th>상태</th>
                <th>처리자</th>
                <th className="w-150px">신청일자</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    로딩 중...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => {
                  const userDisplayName = log.user?.nickname
                    ? `${log.user.userID} (${log.user.nickname})`
                    : log.user?.userID || "";
                  const handlerDisplayName = log.handler?.nickname
                    ? `${log.handler.userID} (${log.handler.nickname})`
                    : log.handler?.userID || "";
                  return (
                    <tr key={log.id || index}>
                      <td>{log.no || index + 1}</td>
                      <td className="p-1">
                        {log.affiliation && (
                          <div
                            className="input-group-text p-1 d-inline"
                            style={{ backgroundColor: log.affiliation.backgroundColor }}
                          >
                            {log.affiliation.role}
                          </div>
                        )}
                      </td>
                      <td className="p-1">
                        <a
                          href="javascript:void(0)"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="user-action"
                        >
                          {userDisplayName}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark py-0">
                          <li
                            className="fw-600 text-white"
                            style={{
                              padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                            }}
                          >
                            <i className="fa fa-user me-2"></i>{userDisplayName}
                          </li>
                          {dropdownLinks.map((link, idx) => (
                            <li key={idx} className={link.className || ""}>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                  e.preventDefault();
                                  if (link.label === "정보수정" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 1);
                                  else if (link.label === "수수료율" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 17);
                                  else if (link.label === "머니지급/차감" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 3);
                                  else if (link.label === "포인트지급/차감" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 6);
                                  else if (link.label === "쪽지보내기" && window.messageWrite) window.messageWrite(log.user?.userIdx || 0);
                                  else if (link.label === "베팅내역" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 8);
                                  else if (link.label === "충환전내역" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 4);
                                  else if (link.label === "머니거래내역" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 5);
                                  else if (link.label === "포인트거래내역" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 7);
                                  else if (link.label === "쿠폰 현황" && window.userDetail) window.userDetail(log.user?.userIdx || 0, 15);
                                }}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{log.apiProvider || "알"}</td>
                      <td>{log.exchangeTypeDisplay || log.exchangeType}</td>
                      <td>{formatAmount(log.amount)}</td>
                      <td>{formatAmount(log.afterAmount)}</td>
                      <td>
                        {log.exchangeStatusIdx === 3 ? (
                          <span className="badge bg-info">승인</span>
                        ) : log.exchangeStatusIdx === 4 ? (
                          <span className="badge bg-danger">취소</span>
                        ) : (
                          <span className="badge bg-secondary">{log.status || ""}</span>
                        )}
                      </td>
                      <td>
                        {handlerDisplayName ? (
                          <>
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              className="user-action"
                            >
                              {handlerDisplayName}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark py-0">
                              <li
                                className="fw-600 text-white"
                                style={{
                                  padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                                }}
                              >
                                <i className="fa fa-user me-2"></i>{handlerDisplayName}
                              </li>
                              {dropdownLinks.map((link, idx) => (
                                <li key={idx} className={link.className || ""}>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                      e.preventDefault();
                                      if (link.label === "정보수정" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 1);
                                      else if (link.label === "수수료율" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 17);
                                      else if (link.label === "머니지급/차감" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 3);
                                      else if (link.label === "포인트지급/차감" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 6);
                                      else if (link.label === "쪽지보내기" && window.messageWrite) window.messageWrite(log.handler?.userIdx || 0);
                                      else if (link.label === "베팅내역" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 8);
                                      else if (link.label === "충환전내역" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 4);
                                      else if (link.label === "머니거래내역" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 5);
                                      else if (link.label === "포인트거래내역" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 7);
                                      else if (link.label === "쿠폰 현황" && window.userDetail) window.userDetail(log.handler?.userIdx || 0, 15);
                                    }}
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{log.requestDate || log.createdAt}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 0 && (
        <div className="row">
          <div className="col text-center">
            <nav>
              <ul className="pagination d-inline-flex">
                {renderPagination()}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div
        id="modal-spinner"
        className="modal"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-hidden={!loading}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", display: loading ? "block" : "none" }}
      >
        <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            처리중입니다. 잠시 기다려주십시오.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function CasinoInoutPage() {
  return (
    <Suspense fallback={null}>
      <CasinoInoutPageInner />
    </Suspense>
  );
}
