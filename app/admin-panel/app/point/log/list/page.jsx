"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";


function PointLogListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSearchRef = useRef(null);
  const logTypeGroupIdxRef = useRef(null);
  const moneyLogTypeIdxRef = useRef(null);

  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "50");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || new Date().toISOString().split("T")[0]);
  const [logTypeGroupIdx, setLogTypeGroupIdx] = useState(searchParams.get("logTypeGroupIdx") || "");
  const [logTypeIdx, setLogTypeIdx] = useState(searchParams.get("logTypeIdx") || "");
  const [searchType, setSearchType] = useState(searchParams.get("searchType") || "");
  const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });

  const API_BASE_URL = ""; // Use relative path for proxy

  const fnChangeMoneylogTypeGroup = () => {
    if (!moneyLogTypeIdxRef.current) return;
    
    const options = moneyLogTypeIdxRef.current.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const optionGroupIdx = option.getAttribute("data-logtypegroupidx");
      
      if (logTypeGroupIdx === "") {
        option.style.display = "";
      } else {
        if (optionGroupIdx !== null && optionGroupIdx !== undefined) {
          if (optionGroupIdx === logTypeGroupIdx) {
            option.style.display = "";
          } else {
            option.style.display = "none";
          }
        }
      }
    }

    if (moneyLogTypeIdxRef.current.selectedOptions.length > 0) {
      const selectedOption = moneyLogTypeIdxRef.current.selectedOptions[0];
      const selectedGroupIdx = selectedOption.getAttribute("data-logtypegroupidx");
      if (selectedGroupIdx !== logTypeGroupIdx) {
        setLogTypeIdx("");
      }
    }
  };

  useEffect(() => {
    fnChangeMoneylogTypeGroup();
  }, [logTypeGroupIdx]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", searchParams.get("page") || "1");
      params.set("pageSize", pageSize);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (logTypeGroupIdx) params.set("logTypeGroupIdx", logTypeGroupIdx);
      if (logTypeIdx) params.set("logTypeIdx", logTypeIdx);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText);

      const response = await fetch(`${API_BASE_URL}/api/admin/point-logs?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch point logs");
      }

      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching point logs:", error);
      alert("??? ??? ????? ??????.");
    } finally {
      setLoading(false);
    }
  }, [searchParams, pageSize, startDate, endDate, logTypeGroupIdx, logTypeIdx, searchType, searchText, API_BASE_URL]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    // Handle Enter key on search text input
    const searchTextInput = document.getElementById("searchText");
    const btnSearch = document.getElementById("btnSearch");
    if (searchTextInput && btnSearch) {
      const handleKeyDown = (e) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (logTypeGroupIdx) params.set("logTypeGroupIdx", logTypeGroupIdx);
    if (logTypeIdx) params.set("logTypeIdx", logTypeIdx);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/point/log/list?${params.toString()}`);
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
        aria-label="� Previous"
      >
        {currentPage === 1 ? (
          <span className="page-link" aria-hidden="true">
            �
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage - 1));
              router.push(`/point/log/list?${params.toString()}`);
            }}
          >
            �
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
                router.push(`/point/log/list?${params.toString()}`);
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
        aria-label="Next �"
      >
        {!pagination.hasMore ? (
          <span className="page-link" aria-hidden="true">
            �
          </span>
        ) : (
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage + 1));
              router.push(`/point/log/list?${params.toString()}`);
            }}
            rel="next"
          >
            �
          </a>
        )}
      </li>
    );

    return pages;
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
        <a href="/point/log/list">
          <i className="fa fa-file-medical-alt me-2"></i>??? ??
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form id="moneyLogList" ref={formSearchRef} className="w-100" onSubmit={handleSearch}>
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
                    <div className="input-group me-2" style={{ width: "310px" }}>
                      <input
                        type="text"
                        id="startDate"
                        name="startDate"
                        className="form-control date_time flatpickr-input"
                        value={startDate}
                        readOnly
                      />
                      <div className="input-group-text">~</div>
                      <input
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
                      name="logTypeGroupIdx"
                      id="logTypeGroupIdx"
                      ref={logTypeGroupIdxRef}
                      className="form-select w-auto me-2"
                      value={logTypeGroupIdx}
                      onChange={(e) => {
                        setLogTypeGroupIdx(e.target.value);
                        fnChangeMoneylogTypeGroup();
                      }}
                    >
                      <option value="">??</option>
                      <option value="9">???</option>
                      <option value="10">???</option>
                      <option value="11">???</option>
                      <option value="12">??? ??</option>
                    </select>

                    <select
                      name="logTypeIdx"
                      id="moneyLogTypeIdx"
                      ref={moneyLogTypeIdxRef}
                      className="form-select w-auto me-2"
                      value={logTypeIdx}
                      onChange={(e) => setLogTypeIdx(e.target.value)}
                    >
                      <option value="">?? ??</option>
                      <option data-logtypegroupidx="9" value="15">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="9" value="16">
                        ??
                      </option>
                      <option data-logtypegroupidx="9" value="17">
                        ??
                      </option>
                      <option data-logtypegroupidx="10" value="18">
                        ??
                      </option>
                      <option data-logtypegroupidx="10" value="19">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="11" value="20">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="11" value="21">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="12" value="22">
                        ??? ??? ??
                      </option>
                      <option data-logtypegroupidx="9" value="23">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="10" value="24">
                        ??
                      </option>
                      <option data-logtypegroupidx="9" value="25">
                        ?? ???
                      </option>
                      <option data-logtypegroupidx="9" value="26">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="10" value="27">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="10" value="28">
                        ?? ?? ??
                      </option>
                      <option data-logtypegroupidx="10" value="29">
                        ?? ?? ?? ??
                      </option>
                      <option data-logtypegroupidx="12" value="38">
                        ???? ??? ??
                      </option>
                      <option data-logtypegroupidx="10" value="42">
                        ?? ???
                      </option>
                      <option data-logtypegroupidx="10" value="43">
                        ?? ???
                      </option>
                      <option data-logtypegroupidx="10" value="44">
                        ?? ??? ??
                      </option>
                      <option data-logtypegroupidx="10" value="46">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="9" value="47">
                        ?? ?? ???
                      </option>
                    </select>

                    <select
                      name="searchType"
                      className="form-select w-auto me-2"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">??</option>
                      <option value="id">ID</option>
                      <option value="nick">???</option>
                      <option value="parent">??ID</option>
                      <option value="logmemo">?? ??</option>
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
                <th>No.</th>
                <th>??</th>
                <th>???(???)</th>
                <th>??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>??</th>
                <th>????</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    ?? ?...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    ???? ????.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const displayName = log.user.nickname
                    ? `${log.user.userID} (${log.user.nickname})`
                    : log.user.userID;
                  return (
                    <tr key={log.id}>
                      <td>{log.no}</td>
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
                      <td className="">
                        <div
                          className="input-group w-auto d-flex user-action"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div
                            className="input-group-text p-1 cursor-pointer d-inline"
                            style={{ backgroundColor: log.user.backgroundColor }}
                          >
                            {log.user.role}
                          </div>
                          <label className="form-control p-1 cursor-pointer">{displayName}</label>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-dark py-0">
                          <li
                            className="fw-600 text-white"
                            style={{
                              padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                            }}
                          >
                            <i className="fa fa-user me-2"></i>{displayName}
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 1);
                              }}
                            >
                              ????
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 17);
                              }}
                            >
                              ????
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 3);
                              }}
                            >
                              ????/??
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 6);
                              }}
                            >
                              ?????/??
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.messageWrite) window.messageWrite(log.user.userIdx);
                              }}
                            >
                              ?????
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 8);
                              }}
                            >
                              ????
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 4);
                              }}
                            >
                              ?????
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 5);
                              }}
                            >
                              ??????
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 7);
                              }}
                            >
                              ???????
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.userDetail) window.userDetail(log.user.userIdx, 15);
                              }}
                            >
                              ?? ??
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td>{log.logTypeGroup}</td>
                      <td>{log.logType}</td>
                      <td>{log.beforeAmount}</td>
                      <td className={log.amountClass}>{log.amountDisplay}</td>
                      <td>{log.afterAmount}</td>
                      <td>{log.memo}</td>
                      <td>{log.transactionDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 0 && (
        <div className="row justify-content-center">
          <div className="col" style={{ display: "contents" }}>
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
            ??????. ?? ???????.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function PointLogListPage() {
  return (
    <Suspense fallback={null}>
      <PointLogListPageInner />
    </Suspense>
  );
}
