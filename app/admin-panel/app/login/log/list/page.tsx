"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bootstrap?: any;
  }
}

interface LoginLog {
  id: number;
  user_id: number | null;
  admin_id: number | null;
  user_type: "user" | "admin";
  grade: string | null;
  user_id_display: string | null;
  nickname: string | null;
  user_agent: string | null;
  ip_address: string;
  domain: string | null;
  status: string;
  login_at: string;
}

interface LoginLogsResponse {
  success: boolean;
  data: LoginLog[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const API_BASE_URL = ""; // Use relative path for proxy

function LoginLogListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSearchRef = useRef<HTMLFormElement>(null);
  const modalBlackRef = useRef<HTMLDivElement>(null);
  const logIdxRef = useRef<HTMLInputElement>(null);
  const logMemoRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLogIdx, setSelectedLogIdx] = useState<number | null>(null);
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") || "50"
  );
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || ""
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || ""
  );

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: searchParams.get("page") || "1",
        pageSize,
      });

      if (searchType && searchText) {
        params.append("searchType", searchType);
        params.append("searchText", searchText);
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/login-logs?${params.toString()}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch login logs");
      }

      const data: LoginLogsResponse = await response.json();
      if (data.success) {
        setLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching login logs:", error);
      alert("로그인 로그를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pageSize, searchType, searchText]);

  useEffect(() => {
    // Handle Enter key on search text input
    const searchTextInput = document.getElementById("searchText");
    const btnSearch = document.getElementById("btnSearch");
    if (searchTextInput && btnSearch) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          btnSearch.click();
        }
      };
      searchTextInput.addEventListener("keydown", handleKeyDown);
      return () => {
        searchTextInput.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/login/log/list?${params.toString()}`);
  };

  const fnIPBlack = (logIdx: number) => {
    setSelectedLogIdx(logIdx);
    if (logIdxRef.current) {
      logIdxRef.current.value = logIdx.toString();
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedLogIdx(null);
    if (logIdxRef.current) {
      logIdxRef.current.value = "";
    }
    if (logMemoRef.current) {
      logMemoRef.current.value = "";
    }
  };

  const handleIPBlackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const logMemo = logMemoRef.current?.value;

    if (!logMemo) {
      alert("차단 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/blacklist/ips/block`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            logIdx: selectedLogIdx,
            logMemo,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message || "IP가 차단되었습니다.");
        handleModalClose();
        fetchLogs();
      } else {
        alert(data.error || "IP 차단에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error blocking IP:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\./g, "-")
      .replace(/,/g, "")
      .replace(/\s+/g, " ");
  };

  const renderPagination = () => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const maxPages = 10;

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
        aria-label="&laquo; Previous"
      >
        {currentPage === 1 ? (
          <span className="page-link" aria-hidden="true">
            &lsaquo;
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage - 1));
              router.push(`/login/log/list?${params.toString()}`);
            }}
          >
            &lsaquo;
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
              onClick={(e) => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(i));
                router.push(`/login/log/list?${params.toString()}`);
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
        aria-label="Next &raquo;"
      >
        {!pagination.hasMore ? (
          <span className="page-link" aria-hidden="true">
            &rsaquo;
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage + 1));
              router.push(`/login/log/list?${params.toString()}`);
            }}
            rel="next"
          >
            &rsaquo;
          </a>
        )}
      </li>
    );

    return pages;
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/login/log/list">
          <i className="fa fa-file-medical-alt me-2"></i>로그인 로그
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form
              id="moneyLogList"
              ref={formSearchRef}
              className="w-100"
              onSubmit={handleSearch}
            >
              <input type="hidden" name="userIdx" value="" />
              <div className="row">
                <div className="col">
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
                    <select
                      name="searchType"
                      className="form-select w-auto me-2"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">전체</option>
                      <option value="black">차단</option>
                      <option value="ip">IP</option>
                      <option value="id">ID</option>
                      <option value="nick">닉네임</option>
                      <option value="domain">도메인</option>
                      <option value="memo">상태</option>
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
                      id="btnSearch"
                      type="submit"
                    >
                      <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-80px">No.</th>
                <th className="w-80px">등급</th>
                <th>아이디(닉네임)</th>
                <th>구분</th>
                <th className="w-150px">IP</th>
                <th className="w-150px">도메인</th>
                <th className="w-150px">상태</th>
                <th className="w-150px">로그인 일시</th>
                <th className="w-80px">차단</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    로딩 중...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => {
                  const rowNumber =
                    pagination.total -
                    (pagination.page - 1) * pagination.pageSize -
                    index;
                  const displayName =
                    log.user_id_display && log.nickname
                      ? `${log.user_id_display} (${log.nickname})`
                      : log.user_id_display || log.nickname || "-";

                  return (
                    <tr key={log.id}>
                      <td>{rowNumber}</td>
                      <td>{log.grade || "-"}</td>
                      <td>
                        {log.user_type === "user" && log.user_id ? (
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="user-action"
                          >
                            {displayName}
                          </a>
                        ) : (
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="user-action"
                          >
                            {displayName}
                          </a>
                        )}
                      </td>
                      <td className="text-start">{log.user_agent || "-"}</td>
                      <td>{log.ip_address}</td>
                      <td>{log.domain || "-"}</td>
                      <td>{log.status || "정상"}</td>
                      <td>{formatDateTime(log.login_at)}</td>
                      <td>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-success btn-sm text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            fnIPBlack(log.id);
                          }}
                        >
                          IP 차단
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col" style={{ display: "contents" }}>
          <nav>
            <ul className="pagination d-inline-flex">{renderPagination()}</ul>
          </nav>
        </div>
      </div>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="modalBlack"
        ref={modalBlackRef}
        tabIndex={-1}
        aria-hidden={!showModal}
        data-bs-backdrop="static"
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: "700px" }}>
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-xmark me-1"></i>
                  </span>
                  <span id="modalTitle">차단 IP 등록</span>
                </h4>
                <div className="panel-heading-btn">
                  <a
                    href="javascript:;"
                    className="btn btn-xs btn-icon btn-default"
                    data-toggle="panel-expand"
                    data-tooltip-init="true"
                  >
                    <i className="fa fa-expand"></i>
                  </a>
                  <a
                    href="javascript:;"
                    className="btn btn-xs btn-icon btn-danger"
                    onClick={handleModalClose}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form id="IPBlack" onSubmit={handleIPBlackSubmit}>
                  <input
                    type="hidden"
                    id="logIdx"
                    ref={logIdxRef}
                    name="logIdx"
                    value=""
                  />
                  <label className="col-form-label w-auto ms-1 me-1">
                    차단 내용
                  </label>
                  <input
                    type="text"
                    name="logMemo"
                    id="logMemo"
                    ref={logMemoRef}
                    className="form-control"
                    required
                  />
                  <div className="row mt-2">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-secondary btn-sm text-white"
                        onClick={handleModalClose}
                      >
                        <i className="fa-solid fa-xmark me-2"></i>닫기
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="modal-spinner"
        className="modal"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-hidden={true}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: loading ? "block" : "none",
        }}
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
export default function LoginLogListPage() {
  return (
    <Suspense fallback={null}>
      <LoginLogListPageInner />
    </Suspense>
  );
}
