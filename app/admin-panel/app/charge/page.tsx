"use client";

import { Suspense } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";

declare global {
  interface Window {
    flatpickr?: any;
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
  }
}

type ChargeStatus = "requested" | "pending" | "approved" | "cancelled";

interface ChargeRequestRow {
  id: number;
  rowNumber: number;
  requestType: "user" | "partner";
  chargeApi: string | null;
  parent: {
    role: string | null;
    color: string | null;
    display: string | null;
    userIdx: number | null;
  } | null;
  user: {
    display: string | null;
    userIdx: number | null;
    warningLevel?: number | null;
  } | null;
  depositor: string | null;
  requestAmount: number;
  afterAmount: number | null;
  bonusAmount: number | null;
  bonusFirstRate: number | null;
  bonusEveryRate: number | null;
  status: ChargeStatus;
  statusLabel: string;
  processor: string | null;
  requestIp: string | null;
  requestedAt: string;
  confirmedAt: string | null;
  processedAt: string | null;
}

interface ChargeResponse {
  success: boolean;
  data: ChargeRequestRow[];
  summary: {
    totalAmount: number;
    approvedAmount: number;
    pendingAmount: number;
    cancelledAmount: number;
  };
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
  message?: string;
  error?: string;
}

const API_BASE_URL = ""; // Use relative path for proxy

const dropdownLinks = [
  { label: "????", tabType: 1, className: "bg-gray-700" },
  { label: "????", tabType: 17, className: "bg-gray-700" },
  { label: "????/??", tabType: 3, className: "bg-gray-700" },
  { label: "?????/??", tabType: 6, className: "bg-gray-700" },
  { label: "?????", isMessage: true, className: "bg-gray-700" },
  { label: "????", tabType: 8 },
  { label: "?????", tabType: 4 },
  { label: "??????", tabType: 5 },
  { label: "???????", tabType: 7 },
  { label: "?? ??", tabType: 15 },
];

const statusSequence: { key: ChargeStatus; label: string }[] = [
  { key: "requested", label: "??" },
  { key: "pending", label: "??" },
  { key: "approved", label: "??" },
  { key: "cancelled", label: "??" },
];

const statusValueMap: Record<ChargeStatus, number> = {
  requested: 1,
  pending: 2,
  approved: 3,
  cancelled: 4,
};

const badgeVariantMap: Record<ChargeStatus, string> = {
  requested: "bg-secondary",
  pending: "bg-secondary",
  approved: "bg-info",
  cancelled: "bg-danger",
};

const selectConfig: Record<
  2 | 3 | 4,
  { label: string; status: ChargeStatus; allowedStatuses: ChargeStatus[]; error: string }
> = {
  2: {
    label: "??",
    status: "pending",
    allowedStatuses: ["requested"],
    error: "?? ??? ?? ??? ?? ???????.",
  },
  3: {
    label: "??",
    status: "approved",
    allowedStatuses: ["requested", "pending"],
    error: "??·?? ??? ?? ??? ?? ???????.",
  },
  4: {
    label: "??",
    status: "cancelled",
    allowedStatuses: ["requested", "pending"],
    error: "??·?? ??? ?? ??? ?? ???????.",
  },
};

const defaultSummary = {
  totalAmount: 0,
  approvedAmount: 0,
  pendingAmount: 0,
  cancelledAmount: 0,
};

const defaultPagination = {
  total: 0,
  page: 1,
  pageSize: 50,
  totalPages: 1,
  hasMore: false,
};

const requestTypeLabelMap: Record<ChargeRequestRow["requestType"], string> = {
  user: "??",
  partner: "???",
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) {
    return "";
  }
  return value.toLocaleString("ko-KR");
};

const formatDateTime = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
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

const formatRate = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") return "0.00%";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) {
    return `${value}%`;
  }
  return `${numericValue.toFixed(2)}%`;
};

const getWarningClass = (level?: number | null) => {
  if (!level) return "";
  if (level >= 2) return "warningUser2";
  if (level >= 1) return "warningUser";
  return "";
};

function ChargePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "50");
  const [moneyRequestType, setMoneyRequestType] = useState(searchParams.get("moneyRequestType") || "");
  const [moneyStatusIdx, setMoneyStatusIdx] = useState(searchParams.get("moneyStatusIdx") || "");
  const [searchType, setSearchType] = useState(searchParams.get("searchType") || "");
  const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<ChargeRequestRow[]>([]);
  const [summary, setSummary] = useState(defaultSummary);
  const [pagination, setPagination] = useState(defaultPagination);

  const currentPage = searchParams.get("page") || "1";

  const fetchCharges = useCallback(
    async ({ showSpinner = true }: { showSpinner?: boolean } = {}) => {
      if (showSpinner) {
        setLoading(true);
      }
      try {
        const params = new URLSearchParams({
          page: currentPage,
          pageSize,
        });
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (moneyRequestType) params.append("moneyRequestType", moneyRequestType);
        if (moneyStatusIdx) params.append("moneyStatusIdx", moneyStatusIdx);
        if (searchType) params.append("searchType", searchType);
        if (searchText) params.append("searchText", searchText.trim());

        const response = await fetch(`${API_BASE_URL}/api/admin/charges?${params.toString()}`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody?.message || "?? ?? ??? ???? ?????.");
        }

        const data: ChargeResponse = await response.json();
        if (!data.success) {
          throw new Error(data.error || "?? ?? ??? ???? ?????.");
        }

        setRows(data.data);
        setSummary(data.summary || defaultSummary);
        setPagination(data.pagination || defaultPagination);
      } catch (error) {
        console.error("Failed to fetch charge requests:", error);
        alert(error instanceof Error ? error.message : "?? ?? ??? ???? ?????.");
      } finally {
        if (showSpinner) {
          setLoading(false);
        }
      }
    },
    [currentPage, endDate, moneyRequestType, moneyStatusIdx, pageSize, searchText, searchType, startDate]
  );

  useEffect(() => {
    fetchCharges();
  }, [fetchCharges]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.flatpickr) {
      return;
    }

    const startPicker = window.flatpickr(startDateRef.current, {
      locale: "ko",
      dateFormat: "Y-m-d",
      defaultDate: startDate || undefined,
      disableMobile: true,
      onChange: (_dates: Date[], dateStr: string) => setStartDate(dateStr),
    });

    const endPicker = window.flatpickr(endDateRef.current, {
      locale: "ko",
      dateFormat: "Y-m-d",
      defaultDate: endDate || undefined,
      disableMobile: true,
      onChange: (_dates: Date[], dateStr: string) => setEndDate(dateStr),
    });

    return () => {
      startPicker?.destroy();
      endPicker?.destroy();
    };
  }, [startDate, endDate]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => rows.some((row) => row.id === id && statusValueMap[row.status] < statusValueMap.approved))
    );
  }, [rows]);

  const selectableRows = useMemo(
    () => rows.filter((row) => statusValueMap[row.status] < statusValueMap.approved),
    [rows]
  );

  const isAllChecked =
    selectableRows.length > 0 && selectableRows.every((row) => selectedIds.includes(row.id));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!checked) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(selectableRows.map((row) => row.id));
  };

  const handleRowCheckboxChange = (row: ChargeRequestRow, checked: boolean) => {
    if (statusValueMap[row.status] >= statusValueMap.approved) return;

    setSelectedIds((prev) => {
      if (checked) {
        if (prev.includes(row.id)) return prev;
        return [...prev, row.id];
      }
      return prev.filter((id) => id !== row.id);
    });
  };

  const buildQueryParams = useCallback(
    (pageValue: string) => {
      const params = new URLSearchParams();
      params.set("page", pageValue);
      params.set("pageSize", pageSize);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (moneyRequestType) params.set("moneyRequestType", moneyRequestType);
      if (moneyStatusIdx) params.set("moneyStatusIdx", moneyStatusIdx);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText.trim());
      return params;
    },
    [endDate, moneyRequestType, moneyStatusIdx, pageSize, searchText, searchType, startDate]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildQueryParams("1");
    router.push(`/charge?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > (pagination.totalPages || 1)) return;
    const params = buildQueryParams(String(newPage));
    router.push(`/charge?${params.toString()}`);
  };

  const handleSelectAction = async (statusIdx: 2 | 3 | 4) => {
    if (selectedIds.length === 0) {
      alert("?? ?? ????????.");
      return;
    }

    const config = selectConfig[statusIdx];
    const invalidRows = rows.filter(
      (row) => selectedIds.includes(row.id) && !config.allowedStatuses.includes(row.status)
    );

    if (invalidRows.length > 0) {
      const invalidIds = new Set(invalidRows.map((row) => row.id));
      setSelectedIds((prev) => prev.filter((id) => !invalidIds.has(id)));
      alert(config.error);
      return;
    }

    if (!window.confirm(`???? ??? ${config.label} ?????????`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/charges/status/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ids: selectedIds,
          moneyStatusIdx: String(statusIdx),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result?.message || result?.error || "?? ??? ??????.");
      }

      alert(result.message || `${selectedIds.length}?? ${config.label} ???????.`);
      setSelectedIds([]);
      await fetchCharges({ showSpinner: false });
    } catch (error) {
      console.error("Failed to update charge statuses:", error);
      alert(error instanceof Error ? error.message : "?? ??? ??????.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #listTable .badge {
              font-size: 1em !important;
            }

            .table-responsive {
              scrollbar-width: thin;
            }

            .warningUser,
            .warningColor1 {
              color: #6aa84f !important;
            }

            .warningUser .user-action,
            .warningColor1 .user-action {
              color: #6aa84f !important;
            }

            .warningUser .user-action label,
            .warningColor1 .user-action label {
              color: #6aa84f !important;
            }

            .warningUser2,
            .warningColor2 {
              color: #744700 !important;
            }

            .warningUser2 .user-action,
            .warningColor2 .user-action {
              color: #744700 !important;
            }

            .warningUser2 .user-action label,
            .warningColor2 .user-action label {
              color: #744700 !important;
            }
          `,
        }}
      />

      <h1 className="page-header">
        <a href="/charge">
          <i className="fa fa-won-sign me-2"></i>?? ????
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <div className="input-group">
              <div className="input-group-text bg-primary text-white">?????</div>
              <input type="text" className="form-control" value={formatNumber(summary.totalAmount)} readOnly />
              <div className="input-group-text bg-success text-white">?????</div>
              <input type="text" className="form-control" value={formatNumber(summary.approvedAmount)} readOnly />
              <div className="input-group-text bg-info text-white">????</div>
              <input type="text" className="form-control" value={formatNumber(summary.pendingAmount)} readOnly />
              <div className="input-group-text bg-danger text-white">????</div>
              <input type="text" className="form-control" value={formatNumber(summary.cancelledAmount)} readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form action="charge" method="get" className="w-100" onSubmit={handleSearch}>
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
                    className="form-control date"
                    value={startDate}
                    readOnly
                    ref={startDateRef}
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date"
                    value={endDate}
                    readOnly
                    ref={endDateRef}
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar" />
                  </div>
                </div>

                <select
                  name="moneyRequestType"
                  className="form-select w-auto me-2"
                  value={moneyRequestType}
                  onChange={(e) => setMoneyRequestType(e.target.value)}
                >
                  <option value="">????</option>
                  <option value="user">??</option>
                  <option value="partner">???</option>
                </select>

                <select
                  name="moneyStatusIdx"
                  className="form-select w-80px me-2"
                  value={moneyStatusIdx}
                  onChange={(e) => setMoneyStatusIdx(e.target.value)}
                >
                  <option value="">????</option>
                  <option value="1">??</option>
                  <option value="2">??</option>
                  <option value="3">??</option>
                  <option value="4">??</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-100px me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">??</option>
                  <option value="id">ID</option>
                  <option value="nick">???</option>
                  <option value="parent">??ID</option>
                  <option value="bankerName">????</option>
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
                  type="button"
                  className="btn btn-success ms-2 btnSelect"
                  data-status="2"
                  onClick={() => handleSelectAction(2)}
                >
                  ????
                </button>
                <button
                  type="button"
                  className="btn btn-info ms-1 btnSelect"
                  data-status="3"
                  onClick={() => handleSelectAction(3)}
                >
                  ????
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-1 btnSelect"
                  data-status="4"
                  onClick={() => handleSelectAction(4)}
                >
                  ????
                </button>
              </div>
            </form>
            <div className="ms-auto"></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table
              className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold"
              id="listTable"
              style={{ whiteSpace: "nowrap" }}
            >
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkAll"
                      onChange={handleSelectAll}
                      checked={isAllChecked}
                    />
                  </th>
                  <th className="w-80px">No.</th>
                  <th>????</th>
                  <th>?? API</th>
                  <th>??</th>
                  <th>????</th>
                  <th>????</th>
                  <th>????</th>
                  <th>????</th>
                  <th>?? ???</th>
                  <th className="w-200px">??? ??(??/??)</th>
                  <th style={{ width: "220px" }}>????</th>
                  <th className="w-150px">???</th>
                  <th className="w-150px">??IP</th>
                  <th className="w-150px">????</th>
                  <th className="w-150px">????</th>
                  <th className="w-150px">????</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={17}>??? ?? ?? ??? ????.</td>
                  </tr>
                ) : (
                  rows.map((row, index) => {
                    const statusValue = statusValueMap[row.status];
                    const isSelectable = statusValue < statusValueMap.approved;
                    const isChecked = selectedIds.includes(row.id);
                    const parentColor = row.parent?.color || "#6c757d";
                    const userDisplay = row.user?.display || "";
                    const warningClass = getWarningClass(row.user?.warningLevel);
                    const bonusDetail =
                      row.bonusFirstRate || row.bonusEveryRate ? (
                        <>
                          <span className="text-red">{formatRate(row.bonusFirstRate)}</span> /{" "}
                          <span>{formatRate(row.bonusEveryRate)}</span>
                        </>
                      ) : (
                        <>?? ??</>
                      );

                    return (
                      <tr key={row.id} data-status={statusValue}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={row.id}
                            disabled={!isSelectable}
                            checked={isChecked}
                            onChange={(e) => handleRowCheckboxChange(row, e.target.checked)}
                          />
                        </td>
                        <td>{row.rowNumber ?? pagination.total - index}</td>
                        <td>{requestTypeLabelMap[row.requestType]}</td>
                        <td>{row.chargeApi || <>&nbsp;</>}</td>
                        <td className="p-1">
                          {row.parent && row.parent.display ? (
                            <>
                              <div
                                className="input-group w-auto d-flex user-action"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <div
                                  className="input-group-text p-1 cursor-pointer d-inline"
                                  style={{ backgroundColor: parentColor }}
                                >
                                  {row.parent.role}
                                </div>
                                <label className="form-control p-1 cursor-pointer">
                                  {row.parent.display}
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
                                  {row.parent.display}
                                </li>
                                {dropdownLinks.map((link, linkIndex) => (
                                  <li key={`${row.id}-parent-${linkIndex}`} className={link.className}>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                      onClick={() => {
                                        const userIdx = row.parent?.userIdx || 0;
                                        if ((link as any).isMessage) {
                                          (window as any).messageWrite?.(userIdx);
                                        } else {
                                          (window as any).userDetail?.(userIdx, (link as any).tabType);
                                        }
                                      }}
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <>&nbsp;</>
                          )}
                        </td>
                        <td className={`p-1 ${warningClass}`}>
                          {userDisplay ? (
                            <>
                              <a
                                href="javascript:void(0)"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className="user-action"
                              >
                                {userDisplay}
                              </a>
                              <ul className="dropdown-menu dropdown-menu-dark py-0">
                                <li
                                  className="fw-600 text-white"
                                  style={{
                                    padding:
                                      "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                                  }}
                                >
                                  <i className="fa fa-user me-2"></i>
                                  {userDisplay}
                                </li>
                                {dropdownLinks.map((link, linkIndex) => (
                                  <li key={`${row.id}-user-${linkIndex}`} className={link.className}>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                      onClick={() => {
                                        const userIdx = row.user?.userIdx || 0;
                                        if ((link as any).isMessage) {
                                          (window as any).messageWrite?.(userIdx);
                                        } else {
                                          (window as any).userDetail?.(userIdx, (link as any).tabType);
                                        }
                                      }}
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <>&nbsp;</>
                          )}
                        </td>
                        <td>{row.depositor || <>&nbsp;</>}</td>
                        <td>{formatNumber(row.requestAmount)}</td>
                        <td>{row.afterAmount !== null ? formatNumber(row.afterAmount) : <>&nbsp;</>}</td>
                        <td>{row.bonusAmount !== null ? formatNumber(row.bonusAmount) : <>&nbsp;</>}</td>
                        <td>{bonusDetail}</td>
                        <td>
                          {statusSequence.map(({ key, label }, badgeIndex) => {
                            const active = row.status === key;
                            const badgeClass = active ? badgeVariantMap[key] : "bg-secondary";
                            return (
                              <span
                                key={`${row.id}-${key}`}
                                className={`badge ${badgeClass}${badgeIndex > 0 ? " ms-2" : ""}`}
                              >
                                {label}
                              </span>
                            );
                          })}
                        </td>
                        <td>{row.processor || <>&nbsp;</>}</td>
                        <td>{row.requestIp || <>&nbsp;</>}</td>
                        <td>{formatDateTime(row.requestedAt) || <>&nbsp;</>}</td>
                        <td>{formatDateTime(row.confirmedAt)}</td>
                        <td>{formatDateTime(row.processedAt)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col d-flex justify-content-between align-items-center">
          <div>
            ? {pagination.total.toLocaleString("ko-KR")}? / {pagination.page}???
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              ??
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              ??
            </button>
          </div>
        </div>
      </div>

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
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ??????. ?? ???????.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function ChargePage() {
  return (
    <Suspense fallback={null}>
      <ChargePageInner />
    </Suspense>
  );
}
