"use client";

import { Suspense, FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
  }
}

type DropdownAction = "userDetail" | "messageWrite";

interface DropdownLink {
  label: string;
  action: DropdownAction;
  tab?: number;
  className?: string;
}

const dropdownLinks: DropdownLink[] = [
  { label: "정보수정", action: "userDetail", tab: 1, className: "bg-gray-700" },
  {
    label: "수수료율",
    action: "userDetail",
    tab: 17,
    className: "bg-gray-700",
  },
  {
    label: "머니지급/차감",
    action: "userDetail",
    tab: 3,
    className: "bg-gray-700",
  },
  {
    label: "포인트지급/차감",
    action: "userDetail",
    tab: 6,
    className: "bg-gray-700",
  },
  { label: "쪽지보내기", action: "messageWrite", className: "bg-gray-700" },
  { label: "베팅내역", action: "userDetail", tab: 8 },
  { label: "충환전내역", action: "userDetail", tab: 4 },
  { label: "머니거래내역", action: "userDetail", tab: 5 },
  { label: "포인트거래내역", action: "userDetail", tab: 7 },
  { label: "쿠폰 현황", action: "userDetail", tab: 15 },
];

interface MoneyLogUser {
  userIdx: number;
  userID: string;
  nickname: string;
  backgroundColor: string;
  role: string;
}

interface MoneyLogAffiliation {
  role: string;
  backgroundColor: string;
}

interface MoneyLog {
  id: number;
  no: number;
  user: MoneyLogUser;
  affiliation: MoneyLogAffiliation | null;
  logTypeGroup: string;
  logType: string;
  beforeAmount: number;
  amountClass: string;
  amountDisplay: string | number;
  amount?: number | string;
  afterAmount: number;
  memo: string;
  transactionDate: string;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface MoneyLogApiResponse {
  success: boolean;
  data: Partial<MoneyLog>[];
  pagination: Pagination;
}

function MoneyLogListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSearchRef = useRef<HTMLFormElement | null>(null);
  const logTypeGroupIdxRef = useRef<HTMLSelectElement | null>(null);
  const moneyLogTypeIdxRef = useRef<HTMLSelectElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") || "50",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [logTypeGroupIdx, setLogTypeGroupIdx] = useState(
    searchParams.get("logTypeGroupIdx") || "",
  );
  const [logTypeIdx, setLogTypeIdx] = useState(
    searchParams.get("logTypeIdx") || "",
  );
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "",
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || "",
  );

  const [logs, setLogs] = useState<MoneyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });

  const API_BASE_URL = "";

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
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
      const selectedGroupIdx = selectedOption.getAttribute(
        "data-logtypegroupidx",
      );
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

      const response = await fetch(
        `${API_BASE_URL}/api/admin/money-logs?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        const bodyText = await response.text().catch(() => "");
        const message = `Failed to fetch money logs: ${response.status} ${response.statusText} ${bodyText}`;
        console.error(message);
        throw new Error(message);
      }

      const responseText = await response.text();
      let data: MoneyLogApiResponse;
      try {
        data = JSON.parse(responseText) as MoneyLogApiResponse;
      } catch (parseError) {
        const message = `Failed to parse money logs response: ${parseError instanceof Error ? parseError.message : parseError} ${responseText}`;
        console.error(message);
        throw new Error(message);
      }
      if (data.success) {
        const processedData = data.data.map(
          (log: Partial<MoneyLog>, index: number) => ({
            ...log,
            id: log.id || index,
            no: log.no || index + 1,
            user: {
              userID: log.user?.userID || "unknown",
              nickname: log.user?.nickname || "",
              backgroundColor: log.user?.backgroundColor || "#6aa84f",
              role: log.user?.role || "User",
              userIdx: log.user?.userIdx || 0,
            },
            affiliation: {
              role: log.affiliation?.role || "",
              backgroundColor: log.affiliation?.backgroundColor || "#6aa84f",
            },
            logTypeGroup: log.logTypeGroup || "",
            logType: log.logType || "",
            beforeAmount: log.beforeAmount || 0,
            amountClass: log.amountClass || "",
            amountDisplay: log.amountDisplay || log.amount || 0,
            afterAmount: log.afterAmount || 0,
            memo: log.memo || "",
            transactionDate: log.transactionDate || "",
          }),
        );

        setLogs(processedData);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching money logs:", error);
      alert("머니 로그를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [
    searchParams,
    pageSize,
    startDate,
    endDate,
    logTypeGroupIdx,
    logTypeIdx,
    searchType,
    searchText,
    API_BASE_URL,
  ]);

  useEffect(() => {
    const loadLogs = async () => {
      await fetchLogs();
    };

    void loadLogs();
  }, [fetchLogs]);

  useEffect(() => {
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

  useEffect(() => {
    // Native date inputs are used instead of flatpickr for this page.
  }, []);

  const renderDropdownLinks = (userIdx: number) => {
    return dropdownLinks.map((link, idx) => (
      <li key={idx} className={link.className || ""}>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (
              link.action === "userDetail" &&
              window.userDetail &&
              link.tab !== undefined
            ) {
              window.userDetail(userIdx, link.tab);
            } else if (link.action === "messageWrite" && window.messageWrite) {
              window.messageWrite(userIdx);
            }
          }}
        >
          {link.label}
        </a>
      </li>
    ));
  };

  const renderPagination = () => {
    const pages: ReactNode[] = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const maxPages = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

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
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage - 1));
              router.push(`/money/log/list?${params.toString()}`);
            }}
          >
            ‹
          </a>
        )}
      </li>,
    );

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
        </li>,
      );
    }

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
            onClick={(e) => {
              e.preventDefault();
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage + 1));
              router.push(`/money/log/list?${params.toString()}`);
            }}
            rel="next"
          >
            ›
          </a>
        )}
      </li>,
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
          <i className="fa fa-file-medical-alt me-2"></i>머니 로그 리스트
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
                    <div
                      className="input-group me-2"
                      style={{ width: "250px" }}
                    >
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        ref={startDateRef}
                      />
                      <div className="input-group-text">~</div>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
                      <option value="">전체</option>
                      <option value="1">충전</option>
                      <option value="2">환전</option>
                      <option value="3">포인트</option>
                      <option value="4">머니</option>
                      <option value="5">포인트</option>
                      <option value="6">포인트 환산</option>
                      <option value="7">포인트 환산</option>
                      <option value="8">포인트 환산</option>
                      <option value="13">포인트 환산</option>
                    </select>

                    <select
                      name="logTypeIdx"
                      id="moneyLogTypeIdx"
                      ref={moneyLogTypeIdxRef}
                      className="form-select w-auto me-2"
                      value={logTypeIdx}
                      onChange={(e) => setLogTypeIdx(e.target.value)}
                    >
                      <option value="">전체 선택</option>
                      <option data-logtypegroupidx="1" value="1">
                        충전
                      </option>
                      <option data-logtypegroupidx="1" value="2">
                        충전 요청
                      </option>
                      <option data-logtypegroupidx="2" value="3">
                        환전
                      </option>
                      <option data-logtypegroupidx="2" value="4">
                        환전 요청
                      </option>
                      <option data-logtypegroupidx="3" value="5">
                        포인트
                      </option>
                      <option data-logtypegroupidx="4" value="6">
                        머니
                      </option>
                      <option data-logtypegroupidx="4" value="7">
                        머니 요청
                      </option>
                      <option data-logtypegroupidx="5" value="8">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="5" value="9">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="6" value="10">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="6" value="11">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="7" value="12">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="8" value="13">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="8" value="14">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="3" value="34">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="4" value="35">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="4" value="36">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="7" value="37">
                        포인트 충전 요청
                      </option>
                      <option data-logtypegroupidx="5" value="39">
                        포인트 충전
                      </option>
                      <option data-logtypegroupidx="5" value="40">
                        포인트 충전 요청(첫충)
                      </option>
                      <option data-logtypegroupidx="13" value="41">
                        포인트 충전 요청
                      </option>
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
                      <option value="logmemo">메모 내용</option>
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
                <th>No.</th>
                <th>소속</th>
                <th>회원(ID)</th>
                <th>구분</th>
                <th>전 금액</th>
                <th>입금 액</th>
                <th>출금 액</th>
                <th>잔액</th>
                <th>내용</th>
                <th>일시</th>
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
                            className="input-group-text p-1 d-inline text-white"
                            style={{
                              backgroundColor: log.affiliation.backgroundColor,
                            }}
                          >
                            {log.affiliation.role}
                          </div>
                        )}
                      </td>
                      <td className="">
                        <div
                          className="input-group w-auto text-white d-flex user-action"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div
                            className="input-group-text p-1 cursor-pointer d-inline text-white"
                            style={{
                              backgroundColor: log.user.backgroundColor,
                            }}
                          >
                            {log.user.role}
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
                          {renderDropdownLinks(log.user.userIdx)}
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
              <ul className="pagination d-inline-flex">{renderPagination()}</ul>
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
export default function MoneyLogListPage() {
  return (
    <Suspense fallback={null}>
      <MoneyLogListPageInner />
    </Suspense>
  );
}
