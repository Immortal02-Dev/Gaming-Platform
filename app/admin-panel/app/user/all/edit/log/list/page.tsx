"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
    flatpickr?: any;
  }
}

interface UserEditLog {
  id: number;
  user_id: number;
  user_id_display: string | null;
  nickname: string | null;
  change_item: string;
  change_column: string | null;
  before_value: string | null;
  after_value: string | null;
  ip_address: string | null;
  processor_id: number | null;
  processor_name: string | null;
  updated_at: string;
  roleType: string | null;
  roleLevel: number | null;
}

interface UserEditLogsResponse {
  success: boolean;
  data: UserEditLog[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const API_BASE_URL = ""; // Use relative path for proxy

function UserAllEditLogListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const formSearchRef = useRef<HTMLFormElement>(null);
  const [logs, setLogs] = useState<UserEditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "50");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [searchType, setSearchType] = useState(searchParams.get("searchType") || "");
  const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");

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

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: searchParams.get("page") || "1",
        pageSize,
      });

      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (searchType) params.append("searchType", searchType);
      if (searchText) params.append("searchText", searchText);

      const response = await fetch(`${API_BASE_URL}/api/admin/user-edit-logs?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user edit logs");
      }

      const data: UserEditLogsResponse = await response.json();
      if (data.success) {
        setLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching user edit logs:", error);
      alert("???? ??? ????? ??????.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [searchParams, pageSize, startDate, endDate, searchType, searchText]);

  const fnReset = () => {
    setPageSize("50");
    setStartDate("");
    setEndDate("");
    setSearchType("");
    setSearchText("");
    if (startDateRef.current) startDateRef.current.value = "";
    if (endDateRef.current) endDateRef.current.value = "";
    router.push("/user/all/edit/log/list?page=1&pageSize=50");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/user/all/edit/log/list?${params.toString()}`);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(/\./g, "-").replace(/,/g, "").replace(/\s+/g, " ");
  };

  const renderPagination = () => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const maxPages = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    // Previous button
    pages.push(
      <li
        key="prev"
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        aria-disabled={currentPage === 1}
        aria-label="&laquo; Previous"
      >
        {currentPage === 1 ? (
          <span className="page-link" aria-hidden={true}>
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
              router.push(`/user/all/edit/log/list?${params.toString()}`);
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
                router.push(`/user/all/edit/log/list?${params.toString()}`);
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
        aria-disabled={!pagination.hasMore}
        aria-label="Next &raquo;"
      >
        {!pagination.hasMore ? (
          <span className="page-link" aria-hidden={true}>
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
              router.push(`/user/all/edit/log/list?${params.toString()}`);
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

  // Helper function to get user role color
  const getUserRoleColor = (log: UserEditLog): string => {
    if (log.roleType === 'partner') {
      return log.roleLevel === 1 ? '#f4a29c' : '#f4dc95';
    }
    return '#ffffff';
  };

  // Helper function to get user role label
  const getUserRoleLabel = (log: UserEditLog): string => {
    if (log.roleType === 'partner') {
      return log.roleLevel === 1 ? '???' : '??';
    }
    return '??';
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/user/all/edit/log/list">
          <i className="fa fa-users me-2"></i>???? ??
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form
              id="formSearch"
              ref={formSearchRef}
              onSubmit={handleSearch}
            >
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
                    ref={startDateRef}
                    name="startDate"
                    className="form-control date"
                    defaultValue={startDate}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    ref={endDateRef}
                    name="endDate"
                    className="form-control date"
                    defaultValue={endDate}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select
                  name="searchType"
                  className="form-select w-auto me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">??</option>
                  <option value="id">ID</option>
                  <option value="col">?? ??</option>
                  <option value="nick">???</option>
                  <option value="ip">IP</option>
                  <option value="register">???</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>??
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  type="button"
                  onClick={fnReset}
                >
                  <i className="fa-solid fa-eraser me-2"></i>???
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table
            className="table dataTable table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold"
            style={{ margin: 0 }}
          >
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>No.</th>
                <th>???(???)</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>???</th>
                <th>???</th>
                <th>????</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    ?? ?...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    ???? ????.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => {
                  const rowNumber = pagination.total - (pagination.page - 1) * pagination.pageSize - index;
                  const displayName = log.user_id_display && log.nickname
                    ? `${log.user_id_display} (${log.nickname})`
                    : log.user_id_display || log.nickname || "-";

                  return (
                    <tr key={log.id}>
                      <td>{rowNumber}</td>
                      <td>
                        <div className="dropdown">
                          <div
                            className="input-group w-auto d-flex user-action dropdown-toggle"
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            aria-expanded="false"
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="input-group-text p-1 cursor-pointer d-inline"
                              style={{ backgroundColor: getUserRoleColor(log) }}
                            >
                              {getUserRoleLabel(log)}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {displayName}
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
                              {displayName}
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 1)}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 17)}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 3)}
                              >
                                ????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 6)}
                              >
                                ?????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`javascript:messageWrite(${log.user_id});`}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 8)}
                              >
                                ????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 4)}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 5)}
                              >
                                ??????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 7)}
                              >
                                ???????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() => (window as any).userDetail(log.user_id, 15)}
                              >
                                ?? ??
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>{log.change_item}</td>
                      <td className="text-start">{log.before_value || "-"}</td>
                      <td className="text-start">{log.after_value || "-"}</td>
                      <td>{log.ip_address || "-"}</td>
                      <td>{log.processor_name || "-"}</td>
                      <td>{formatDateTime(log.updated_at)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col" style={{ display: "contents" }}>
          <nav>
            <ul className="pagination d-inline-flex">
              {renderPagination()}
            </ul>
          </nav>
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
            ??????. ?? ???????.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function UserAllEditLogListPage() {
  return (
    <Suspense fallback={null}>
      <UserAllEditLogListPageInner />
    </Suspense>
  );
}
