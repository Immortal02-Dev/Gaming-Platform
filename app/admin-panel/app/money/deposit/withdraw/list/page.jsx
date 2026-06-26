"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Layout from "@/components/Layout";

// Global window functions will be available at runtime

const dropdownLinks = [
  { label: "정보수정", tab: 1, className: "bg-gray-700" },
  { label: "수수료율", tab: 17, className: "bg-gray-700" },
  { label: "머니지급/차감", tab: 3, className: "bg-gray-700" },
  { label: "포인트지급/차감", tab: 6, className: "bg-gray-700" },
  { label: "쪽지보내기", action: "message", className: "bg-gray-700" },
  { label: "베팅내역", tab: 8 },
  { label: "충환전내역", tab: 4 },
  { label: "머니거래내역", tab: 5 },
  { label: "포인트거래내역", tab: 7 },
  { label: "쿠폰 현황", tab: 15 },
];

export default function MoneyDepositWithdrawListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logType, setLogType] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [summary, setSummary] = useState({
    totalDeposit: "0",
    totalWithdraw: "0",
    userDeposit: "0",
    userWithdraw: "0",
    partnerDeposit: "0",
    partnerWithdraw: "0",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const API_BASE_URL = ""; // Use relative path for proxy

  useEffect(() => {
    // Set default dates if not set
    if (!startDate || !endDate) {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      setStartDate(oneYearAgo.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.flatpickr &&
      startDate &&
      endDate
    ) {
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

  const fetchData = useCallback(async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("pageSize", pageSize);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (logType) params.set("logType", logType);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/money-deposit-withdraw?${params.toString()}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          errorBody?.message || "파트너 지급/회수 내역을 불러오지 못했습니다.",
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "파트너 지급/회수 내역을 불러오지 못했습니다.",
        );
      }

      setData(result.data || []);

      if (result.summary) {
        setSummary({
          totalDeposit: result.summary.totalDeposit || "0",
          totalWithdraw: result.summary.totalWithdraw || "0",
          userDeposit: result.summary.userDeposit || "0",
          userWithdraw: result.summary.userWithdraw || "0",
          partnerDeposit: result.summary.partnerDeposit || "0",
          partnerWithdraw: result.summary.partnerWithdraw || "0",
        });
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert(
        error instanceof Error
          ? error.message
          : "파트너 지급/회수 내역을 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, [
    pageSize,
    startDate,
    endDate,
    logType,
    searchType,
    searchText,
    API_BASE_URL,
  ]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [fetchData, startDate, endDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/moneyDepositWithdraw">
          <i className="fa fa-file-medical-alt me-2"></i>파트너 지급/회수 내역
        </a>
        <small></small>
      </h1>

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

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form id="moneyDepositWithdraw" onSubmit={handleSearch}>
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
                      name="logType"
                      id="logType"
                      className="form-select w-auto me-2"
                      value={logType}
                      onChange={(e) => setLogType(e.target.value)}
                    >
                      <option value="">구분</option>
                      <option value="userDeposit">회원 지급</option>
                      <option value="userWithdraw">회원 회수</option>
                      <option value="partnerDeposit">파트너 지급</option>
                      <option value="partnerWithdraw">파트너 회수</option>
                    </select>

                    <select
                      name="searchType"
                      className="form-select w-auto me-2"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">전체</option>
                      <option value="userID">신청자 ID</option>
                      <option value="userNickName">신청자 닉네임</option>
                      <option value="ownerID">처리자 ID</option>
                      <option value="ownerNickName">처리자 닉네임</option>
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
                      type="submit"
                      className="btn btn-lime"
                      id="btnSearch"
                    >
                      <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="ms-auto">
              <label className="col-form-label">
                총 지급금액 :{" "}
                <span className="text-primary">{summary.totalDeposit}</span>원
              </label>
              /
              <label className="col-form-label">
                총 회수금액 :{" "}
                <span className="text-danger">{summary.totalWithdraw}</span>원
              </label>
              /
              <label className="col-form-label">
                회원 지급금액 :{" "}
                <span className="text-info">{summary.userDeposit}</span>원
              </label>
              /
              <label className="col-form-label">
                회원 회수금액 :{" "}
                <span className="text-danger">{summary.userWithdraw}</span>원
              </label>
              /
              <label className="col-form-label">
                파트너 지급금액 :{" "}
                <span className="text-info">{summary.partnerDeposit}</span>원
              </label>
              /
              <label className="col-form-label">
                파트너 회수금액 :{" "}
                <span className="text-danger">{summary.partnerWithdraw}</span>원
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>No.</th>
                <th>구분</th>
                <th>신청자</th>
                <th>신청 전 금액</th>
                <th>신청 금액</th>
                <th>신청 후 금액</th>
                <th>처리자</th>
                <th>처리전 금액</th>
                <th>처리금액</th>
                <th>처리후 금액</th>
                <th>신청시간</th>
                <th>처리시간</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.no}</td>
                    <td>{row.logType}</td>
                    <td className="p-1">
                      {row.applicant && (
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
                              style={{
                                backgroundColor: row.applicant.backgroundColor,
                              }}
                            >
                              {row.applicant.role}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {row.applicant.display}
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
                              {row.applicant.display}
                            </li>
                            {dropdownLinks.map((link, idx) => (
                              <li key={idx} className={link.className || ""}>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={() => {
                                    if (link.action === "message") {
                                      window.messageWrite(
                                        row.applicant.userIdx,
                                      );
                                    } else {
                                      window.userDetail(
                                        row.applicant.userIdx,
                                        link.tab,
                                      );
                                    }
                                  }}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                    <td>{row.applicantBeforeAmount}</td>
                    <td className="text-blue">{row.applicantAmount}</td>
                    <td>{row.applicantAfterAmount}</td>
                    <td className="p-1">
                      {row.processor && (
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
                              style={{
                                backgroundColor: row.processor.backgroundColor,
                              }}
                            >
                              {row.processor.role}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {row.processor.display}
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
                              {row.processor.display}
                            </li>
                            {dropdownLinks.map((link, idx) => (
                              <li key={idx} className={link.className || ""}>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={() => {
                                    if (link.action === "message") {
                                      window.messageWrite(
                                        row.processor.userIdx,
                                      );
                                    } else {
                                      window.userDetail(
                                        row.processor.userIdx,
                                        link.tab,
                                      );
                                    }
                                  }}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                    <td>{row.processorBeforeAmount}</td>
                    <td
                      className={
                        parseFloat(row.processorAmount.replace(/,/g, "")) < 0
                          ? "text-red"
                          : ""
                      }
                    >
                      {row.processorAmount}
                    </td>
                    <td>{row.processorAfterAmount}</td>
                    <td>{row.requestedAt}</td>
                    <td>{row.processedAt || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col" style={{ display: "contents" }}></div>
      </div>
    </Layout>
  );
}
