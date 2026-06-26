"use client";

import { Suspense } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flatpickr?: any;
    userDetail?: (userIdx: string | number, tab: number) => void;
    messageWrite?: (userIdx: string | number) => void;
  }
}

interface PaybackRow {
  paybackIdx: number;
  no: number;
  affiliation?: {
    userIdx: number;
    userID: string;
    nickname: string;
    role: string;
    backgroundColor: string;
  };
  applicant?: {
    userIdx: number;
    userID: string;
    nickname: string;
    role: string;
    backgroundColor: string;
  };
  paybackType: string;
  applyDate: string;
  requestAvailableDate: string;
  requestAmount: string;
  paybackPercent: string;
  status: number;
  statusBadges: Array<{ label: string; className: string }>;
  totalBettingAmount: string;
  totalWinAmount: string;
  chargeAmount: string;
  exchangeAmount: string;
  balanceAmount: string;
  requestDate: string;
  processDate: string;
}

function PaybackListPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") || "50",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") ||
      new Date(new Date().setMonth(new Date().getMonth() - 1))
        .toISOString()
        .split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") || new Date().toISOString().split("T")[0],
  );
  const [paybackType, setPaybackType] = useState(
    searchParams.get("paybackType") || "",
  );
  const [paybackStatus, setPaybackStatus] = useState(
    searchParams.get("paybackStatus") || "",
  );
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "",
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || "",
  );

  const [totalRequestAmount, setTotalRequestAmount] = useState("0");
  const [totalApprovedAmount, setTotalApprovedAmount] = useState("0");
  const [waitingAmount, setWaitingAmount] = useState("0");
  const [cancelledAmount, setCancelledAmount] = useState("0");

  const [rows, setRows] = useState<PaybackRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = ""; // Use relative path for proxy

  useEffect(() => {
    // Initialize flatpickr for date inputs if available
    if (typeof window !== "undefined" && window.flatpickr) {
      if (startDateRef.current) {
        window.flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: startDate || undefined,
          onChange: (_dates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        window.flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: endDate || undefined,
          onChange: (_dates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }
  }, [startDate, endDate]);

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

  const fetchPaybacks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("pageSize", pageSize);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (paybackType) params.set("paybackType", paybackType);
      if (paybackStatus) params.set("paybackStatus", paybackStatus);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/paybacks?${params.toString()}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          errorBody?.message || "??? ?? ??? ???? ?????.",
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "??? ?? ??? ???? ?????.",
        );
      }

      setRows(result.data || []);

      if (result.summary) {
        const totalReq =
          typeof result.summary.totalRequestAmount === "number"
            ? result.summary.totalRequestAmount
            : parseFloat(result.summary.totalRequestAmount || "0");
        const totalApp =
          typeof result.summary.totalApprovedAmount === "number"
            ? result.summary.totalApprovedAmount
            : parseFloat(result.summary.totalApprovedAmount || "0");
        const waiting =
          typeof result.summary.waitingAmount === "number"
            ? result.summary.waitingAmount
            : parseFloat(result.summary.waitingAmount || "0");
        const cancelled =
          typeof result.summary.cancelledAmount === "number"
            ? result.summary.cancelledAmount
            : parseFloat(result.summary.cancelledAmount || "0");

        setTotalRequestAmount(totalReq.toLocaleString("ko-KR"));
        setTotalApprovedAmount(totalApp.toLocaleString("ko-KR"));
        setWaitingAmount(waiting.toLocaleString("ko-KR"));
        setCancelledAmount(cancelled.toLocaleString("ko-KR"));
      }
    } catch (error) {
      console.error("Failed to fetch paybacks:", error);
      alert(
        error instanceof Error
          ? error.message
          : "??? ?? ??? ???? ?????.",
      );
    } finally {
      setLoading(false);
    }
  }, [
    pageSize,
    startDate,
    endDate,
    paybackType,
    paybackStatus,
    searchType,
    searchText,
    API_BASE_URL,
  ]);

  useEffect(() => {
    fetchPaybacks();
  }, [fetchPaybacks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("pageSize", pageSize);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (paybackType) params.set("paybackType", paybackType);
    if (paybackStatus) params.set("paybackStatus", paybackStatus);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);

    router.push(`/payback/list?${params.toString()}`);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckAll(checked);

    if (checked) {
      const selectableIds = rows
        .filter((row) => row.status < 3)
        .map((row) => row.paybackIdx);
      setSelectedIds(selectableIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowCheckboxChange = (
    paybackIdx: number,
    status: number,
    checked: boolean,
  ) => {
    if (status >= 3) return; // Can't select rows with status >= 3

    setSelectedIds((prev) => {
      if (checked) {
        return prev.includes(paybackIdx) ? prev : [...prev, paybackIdx];
      }
      return prev.filter((id) => id !== paybackIdx);
    });
  };

  const handleStatusChange = async (status: number, statusName: string) => {
    if (selectedIds.length < 1) {
      alert("?? ?? ????????.");
      return;
    }

    let targetIdx = 0;
    let errmsg = "";

    switch (status) {
      case 2:
        targetIdx = 1;
        errmsg = "?? ??? ?? ??? ?? ???????.";
        break;
      case 3:
        targetIdx = 2;
        errmsg = "??·?? ??? ?? ??? ?? ???????.";
        break;
      case 4:
        targetIdx = 2;
        errmsg = "??·?? ??? ?? ??? ?? ???????.";
        break;
    }

    // Filter out invalid selections
    const validIds = selectedIds.filter((id) => {
      const row = rows.find((r) => r.paybackIdx === id);
      return row && row.status <= targetIdx;
    });

    if (validIds.length !== selectedIds.length) {
      setSelectedIds(validIds);
      if (validIds.length === 0) {
        alert(errmsg);
        return;
      }
    }

    if (validIds.length === 0) {
      alert("?? ?? ????????.");
      return;
    }

    if (!confirm(`???? ??? ${statusName} ?????????`)) {
      return;
    }

    try {
      const paybackIdxObj: Record<number, number> = {};
      validIds.forEach((id, index) => {
        paybackIdxObj[index] = id;
      });

      const response = await fetch(
        `${API_BASE_URL}/api/admin/paybacks/changeStatusList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            paybackIdx: paybackIdxObj,
            paybackStatus: status.toString(),
          }),
        },
      );

      const ret = await response.json();

      if (ret.ReturnCode !== 0) {
        alert(ret.ReturnMessage || ret.message || "??? ??????.");
      } else {
        window.location.reload();
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "??? ??????.");
    }
  };

  // individual changeStatus is unused, keeping handleStatusChange for bulk actions


  // Update checkAll state when selectedIds changes
  useEffect(() => {
    const selectableRows = rows.filter((row) => row.status < 3);
    if (selectableRows.length > 0) {
      const allSelected = selectableRows.every((row) =>
        selectedIds.includes(row.paybackIdx),
      );
      setCheckAll(allSelected);
    } else {
      setCheckAll(false);
    }
  }, [selectedIds, rows]);

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
        #listTable .badge {
          font-size: 1em !important;
        }
      `}</style>

      <h1 className="page-header">
        <a href="/payback/list">
          <i className="fa fa-won-sign me-2"></i>??? ?? ??
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <div className="input-group">
              <div className="input-group-text bg-primary text-white">
                ?????
              </div>
              <input
                type="text"
                className="form-control"
                value={totalRequestAmount}
                readOnly
              />
              <div className="input-group-text bg-success text-white">
                ?????
              </div>
              <input
                type="text"
                className="form-control"
                value={totalApprovedAmount}
                readOnly
              />
              <div className="input-group-text bg-info text-white">
                ????
              </div>
              <input
                type="text"
                className="form-control"
                value={waitingAmount}
                readOnly
              />
              <div className="input-group-text bg-danger text-white">
                ????
              </div>
              <input
                type="text"
                className="form-control"
                value={cancelledAmount}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form action="/payback/list" method="get" onSubmit={handleSearch}>
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
                    ref={startDateRef}
                    className="form-control date"
                    value={startDate || ""}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    ref={endDateRef}
                    className="form-control date"
                    value={endDate || ""}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select
                  name="paybackType"
                  className="form-select w-auto me-2"
                  value={paybackType}
                  onChange={(e) => setPaybackType(e.target.value)}
                >
                  <option value="">??? ??</option>
                  <option value="1">????-???? (????)</option>
                  <option value="2">??-??</option>
                  <option value="3">??-??-????</option>
                </select>

                <select
                  name="paybackType"
                  className="form-select w-auto me-2"
                  value={paybackStatus}
                  onChange={(e) => setPaybackStatus(e.target.value)}
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
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="???"
                />

                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>??
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-2 btnSelect"
                  data-status="2"
                  onClick={() => handleStatusChange(2, "??")}
                >
                  ????
                </button>
                <button
                  type="button"
                  className="btn btn-info ms-1 btnSelect"
                  data-status="3"
                  onClick={() => handleStatusChange(3, "??")}
                >
                  ????
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-1 btnSelect"
                  data-status="4"
                  onClick={() => handleStatusChange(4, "??")}
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
          <table
            className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center fw-bold"
            id="listTable"
          >
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkAll"
                    checked={checkAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="w-80px">No.</th>
                <th>??</th>
                <th>????</th>
                <th>??? ??</th>
                <th>????</th>
                <th>?????</th>
                <th>????</th>
                <th>???%</th>
                <th style={{ width: "220px" }}>????</th>
                <th>?????</th>
                <th>?????</th>
                <th>????</th>
                <th>????</th>
                <th>????</th>
                <th className="w-150px">????</th>
                <th className="w-150px">????</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={17} className="text-center">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    ?? ?...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center">
                    ???? ????.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.paybackIdx} data-status={row.status}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={row.paybackIdx}
                        checked={selectedIds.includes(row.paybackIdx)}
                        disabled={row.status >= 3}
                        onChange={(e) =>
                          handleRowCheckboxChange(
                            row.paybackIdx,
                            row.status,
                            e.target.checked,
                          )
                        }
                      />
                    </td>
                    <td>{row.no}</td>
                    <td className="p-1">
                      {row.affiliation ? (
                        <>
                          <div
                            className="input-group w-auto d-flex user-action"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div
                              className="input-group-text p-1 cursor-pointer d-inline"
                              style={{
                                backgroundColor:
                                  row.affiliation.backgroundColor,
                              }}
                            >
                              {row.affiliation.role}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {row.affiliation.userID} (
                              {row.affiliation.nickname})
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
                              {row.affiliation.userID} (
                              {row.affiliation.nickname})
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      1,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      17,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      3,
                                    );
                                  }
                                }}
                              >
                                ????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      6,
                                    );
                                  }
                                }}
                              >
                                ?????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.messageWrite) {
                                    window.messageWrite(
                                      row.affiliation!.userIdx,
                                    );
                                  }
                                }}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      8,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      4,
                                    );
                                  }
                                }}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      5,
                                    );
                                  }
                                }}
                              >
                                ??????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      7,
                                    );
                                  }
                                }}
                              >
                                ???????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.affiliation!.userIdx,
                                      15,
                                    );
                                  }
                                }}
                              >
                                ?? ??
                              </a>
                            </li>
                          </ul>
                        </>
                      ) : null}
                    </td>
                    <td className="p-1">
                      {row.applicant ? (
                        <>
                          <div
                            className="input-group w-auto d-flex user-action"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div
                              className="input-group-text p-1 cursor-pointer d-inline"
                              style={{
                                backgroundColor: row.applicant.backgroundColor,
                              }}
                            >
                              {row.applicant.role}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {row.applicant.userID} ({row.applicant.nickname})
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
                              {row.applicant.userID} ({row.applicant.nickname})
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      1,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      17,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      3,
                                    );
                                  }
                                }}
                              >
                                ????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      6,
                                    );
                                  }
                                }}
                              >
                                ?????/??
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.messageWrite) {
                                    window.messageWrite(row.applicant!.userIdx);
                                  }
                                }}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      8,
                                    );
                                  }
                                }}
                              >
                                ????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      4,
                                    );
                                  }
                                }}
                              >
                                ?????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      5,
                                    );
                                  }
                                }}
                              >
                                ??????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      7,
                                    );
                                  }
                                }}
                              >
                                ???????
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (window.userDetail) {
                                    window.userDetail(
                                      row.applicant!.userIdx,
                                      15,
                                    );
                                  }
                                }}
                              >
                                ?? ??
                              </a>
                            </li>
                          </ul>
                        </>
                      ) : null}
                    </td>
                    <td>{row.paybackType}</td>
                    <td>{row.applyDate}</td>
                    <td>{row.requestAvailableDate}</td>
                    <td>{row.requestAmount}</td>
                    <td>{row.paybackPercent}</td>
                    <td>
                      {row.statusBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`badge ${badge.className} ${idx > 0 ? "ms-2" : ""}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </td>
                    <td>{row.totalBettingAmount}</td>
                    <td>{row.totalWinAmount}</td>
                    <td>{row.chargeAmount}</td>
                    <td>{row.exchangeAmount}</td>
                    <td>{row.balanceAmount}</td>
                    <td>{row.requestDate}</td>
                    <td>{row.processDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col text-center"></div>
      </div>
    </Layout>
  );
}
export default function PaybackListPage() {
  return (
    <Suspense fallback={null}>
      <PaybackListPageInner />
    </Suspense>
  );
}
