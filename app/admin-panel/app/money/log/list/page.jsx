"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

const dropdownLinks = [
  { label: "????", href: (id) => `javascript:userDetail(${id}, 1);`, className: "bg-gray-700" },
  { label: "????", href: (id) => `javascript:userDetail(${id}, 17);`, className: "bg-gray-700" },
  { label: "????/??", href: (id) => `javascript:userDetail(${id}, 3);`, className: "bg-gray-700" },
  { label: "?????/??", href: (id) => `javascript:userDetail(${id}, 6);`, className: "bg-gray-700" },
  { label: "?????", href: (id) => `javascript:messageWrite(${id});`, className: "bg-gray-700" },
  { label: "????", href: (id) => `javascript:userDetail(${id}, 8);` },
  { label: "?????", href: (id) => `javascript:userDetail(${id}, 4);` },
  { label: "??????", href: (id) => `javascript:userDetail(${id}, 5);` },
  { label: "???????", href: (id) => `javascript:userDetail(${id}, 7);` },
  { label: "?? ??", href: (id) => `javascript:userDetail(${id}, 15);` },
];

function MoneyLogListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSearchRef = useRef(null);
  const logTypeGroupIdxRef = useRef(null);
  const moneyLogTypeIdxRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

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

  const fnChangeMoneylogTypeGroup = useCallback(() => {
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
  }, [logTypeGroupIdx]);

  useEffect(() => {
    fnChangeMoneylogTypeGroup();
  }, [fnChangeMoneylogTypeGroup]);

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

      const response = await fetch(`${API_BASE_URL}/api/admin/money-logs?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch money logs");
      }

      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching money logs:", error);
      alert("?? ??? ????? ??????.");
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.flatpickr && startDate && endDate) {
      const startPicker = window.flatpickr(startDateRef.current, {
        locale: "ko",
        dateFormat: "Y-m-d",
        disableMobile: true,
        defaultDate: startDate,
        onChange: (selectedDates, dateStr) => {
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
        onChange: (selectedDates, dateStr) => {
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
    router.push(`/money/log/list?${params.toString()}`);
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
        aria-label="Previous"
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
              router.push(`/money/log/list?${params.toString()}`);
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
                router.push(`/money/log/list?${params.toString()}`);
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
              router.push(`/money/log/list?${params.toString()}`);
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
        <a href="/money/log/list">
          <i className="fa fa-file-medical-alt me-2"></i>?? ?? ??
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
                      <option value="1">??</option>
                      <option value="2">??</option>
                      <option value="3">??</option>
                      <option value="4">??</option>
                      <option value="5">?? ??</option>
                      <option value="6">???</option>
                      <option value="7">??? ??</option>
                      <option value="8">???</option>
                      <option value="13">?? ??</option>
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
                      <option data-logtypegroupidx="1" value="1">
                        ??
                      </option>
                      <option data-logtypegroupidx="1" value="2">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="2" value="3">
                        ??
                      </option>
                      <option data-logtypegroupidx="2" value="4">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="3" value="5">
                        ??
                      </option>
                      <option data-logtypegroupidx="4" value="6">
                        ??
                      </option>
                      <option data-logtypegroupidx="4" value="7">
                        ?? ??
                      </option>
                      <option data-logtypegroupidx="5" value="8">
                        ???? ??
                      </option>
                      <option data-logtypegroupidx="5" value="9">
                        ???? ??
                      </option>
                      <option data-logtypegroupidx="6" value="10">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="6" value="11">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="7" value="12">
                        ??? ??? ??
                      </option>
                      <option data-logtypegroupidx="8" value="13">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="8" value="14">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="3" value="34">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="4" value="35">
                        ??? ??
                      </option>
                      <option data-logtypegroupidx="4" value="36">
                        ??? ?? ??
                      </option>
                      <option data-logtypegroupidx="7" value="37">
                        ???? ??? ??
                      </option>
                      <option data-logtypegroupidx="5" value="39">
                        ???? ??
                      </option>
                      <option data-logtypegroupidx="5" value="40">
                        ???? ??(??)
                      </option>
                      <option data-logtypegroupidx="13" value="41">
                        ?? ??
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
                          {dropdownLinks.map((link, idx) => (
                            <li key={idx} className={link.className || ""}>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (link.label === "????" && window.userDetail) window.userDetail(log.user.userIdx, 1);
                                  else if (link.label === "????" && window.userDetail) window.userDetail(log.user.userIdx, 17);
                                  else if (link.label === "????/??" && window.userDetail) window.userDetail(log.user.userIdx, 3);
                                  else if (link.label === "?????/??" && window.userDetail) window.userDetail(log.user.userIdx, 6);
                                  else if (link.label === "?????" && window.messageWrite) window.messageWrite(log.user.userIdx);
                                  else if (link.label === "????" && window.userDetail) window.userDetail(log.user.userIdx, 8);
                                  else if (link.label === "?????" && window.userDetail) window.userDetail(log.user.userIdx, 4);
                                  else if (link.label === "??????" && window.userDetail) window.userDetail(log.user.userIdx, 5);
                                  else if (link.label === "???????" && window.userDetail) window.userDetail(log.user.userIdx, 7);
                                  else if (link.label === "?? ??" && window.userDetail) window.userDetail(log.user.userIdx, 15);
                                }}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
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
export default function MoneyLogListPage() {
  return (
    <Suspense fallback={null}>
      <MoneyLogListPageInner />
    </Suspense>
  );
}
