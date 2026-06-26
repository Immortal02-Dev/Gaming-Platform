"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    couponAdd?: (userIdx?: number) => void;
    flatpickr?: any;
    resizeContent?: (tableId: string, height: number) => void;
  }
}

interface Coupon {
  id: number;
  receiver_id: number;
  receiver_id_display: string | null;
  subject: string;
  amount: number;
  status: "0" | "1" | "2" | "3";
  register_id: number | null;
  register_id_display: string | null;
  register_date: string;
  use_date: string | null;
  expire_date: string;
}

interface CouponsResponse {
  success: boolean;
  data: Coupon[];
  summary: {
    waitAmount: number;
    useAmount: number;
    cancelAmount: number;
    expireAmount: number;
  };
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const API_BASE_URL = ""; // Use relative path for proxy

const formatNumber = (num: number) => {
  return num.toLocaleString("ko-KR");
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR").replace(/\./g, "-").replace(/\s/g, "");
};

const formatDateTime = (dateString: string | null) => {
  if (!dateString) return "-";
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

const getStatusLabel = (status: string) => {
  const statusMap: { [key: string]: string } = {
    "0": "??",
    "1": "??",
    "2": "??",
    "3": "??",
  };
  return statusMap[status] || status;
};

function CouponListPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const formSearchRef = useRef<HTMLFormElement>(null);
  const checkAllRef = useRef<HTMLInputElement>(null);
  const [checkAllChecked, setCheckAllChecked] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    waitAmount: 0,
    useAmount: 0,
    cancelAmount: 0,
    expireAmount: 0,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 1,
    hasMore: false,
  });
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "50");
  const [searchDateType, setSearchDateType] = useState(searchParams.get("searchDateType") || "register");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [searchStatus, setSearchStatus] = useState(searchParams.get("searchStatus") || "");
  const [searchType, setSearchType] = useState(searchParams.get("searchType") || "");
  const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: searchParams.get("page") || "1",
        pageSize,
        searchDateType,
      });

      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (searchStatus) params.append("searchStatus", searchStatus);
      if (searchType) params.append("searchType", searchType);
      if (searchText) params.append("searchText", searchText);

      const response = await fetch(`${API_BASE_URL}/api/admin/coupons?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }

      const data: CouponsResponse = await response.json();
      if (data.success) {
        setCoupons(data.data);
        setSummary(data.summary);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      alert("?? ??? ????? ??????.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [searchParams, pageSize, searchDateType, startDate, endDate, searchStatus, searchType, searchText]);

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

    // Handle window resize for table
    const handleResize = () => {
      if (typeof window !== "undefined" && (window as any).resizeContent) {
        (window as any).resizeContent("couponTable", 306);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial call
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const fnReset = () => {
    setPageSize("50");
    setSearchDateType("register");
    setStartDate("");
    setEndDate("");
    setSearchStatus("");
    setSearchType("");
    setSearchText("");
    if (startDateRef.current) startDateRef.current.value = "";
    if (endDateRef.current) endDateRef.current.value = "";
    router.push("/coupon/list?page=1&pageSize=50&searchDateType=register");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);
    params.set("searchDateType", searchDateType);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (searchStatus) params.set("searchStatus", searchStatus);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/coupon/list?${params.toString()}`);
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckAllChecked(checked);
    const checkboxes = document.querySelectorAll(
      "#couponTable tbody input[type='checkbox']"
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  const couponCancel = async (type: string, couponIdx: number | null) => {
    let msg = "?? ";
    const data: any = {};

    if (type === "all") {
      msg = "??? ??? ? ?? ??? ?? ";
      data.type = "all";
      data.searchDateType = searchDateType;
      if (startDate) data.startDate = startDate;
      if (endDate) data.endDate = endDate;
      if (searchStatus) data.searchStatus = searchStatus;
      if (searchType) data.searchType = searchType;
      if (searchText) data.searchText = searchText;
    } else if (type === "sel") {
      msg = "???? ";
      const checkedBoxes = document.querySelectorAll(
        "#couponTable tbody input[type='checkbox']:checked"
      ) as NodeListOf<HTMLInputElement>;

      if (checkedBoxes.length < 1) {
        alert("? ? ??? ??? ???? ????.");
        return;
      }

      const list: number[] = [];
      let isValid = true;

      checkedBoxes.forEach((checkbox) => {
        const row = checkbox.closest("tr") as HTMLTableRowElement;
        if (row) {
          const status = row.getAttribute("data-status");
          const num = row.getAttribute("data-num");
          const idx = row.getAttribute("data-idx");

          if (status !== "0") {
            alert(num + "? ??? ????? ????.");
            checkbox.checked = false;
            isValid = false;
            return;
          }

          if (idx) {
            list.push(parseInt(idx));
          }
        }
      });

      if (!isValid) return;

      data.type = "sel";
      data.couponIdx = list.join(",");
    } else {
      data.type = "single";
      if (couponIdx !== null) {
        data.couponIdx = couponIdx;
      }
    }

    if (confirm(msg + "??? ?????????")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/coupons/cancel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const ret = await response.json();
        if (ret.success) {
          alert(ret.message || "??? ???????.");
          fetchCoupons();
        } else {
          alert(ret.error || "?? ??? ??????.");
        }
      } catch (error) {
        console.error("Error canceling coupons:", error);
        alert("??? ??????.");
      }
    }
  };

  const handleCouponAdd = () => {
    if (typeof window !== "undefined" && window.couponAdd) {
      window.couponAdd();
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/coupon/list">
          <i className="fa fa-credit-card me-2"></i>?? ??
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <div className="input-group">
              <div className="input-group-text bg-success text-white">
                ????
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.waitAmount)}
                readOnly
              />
              <div className="input-group-text bg-info text-white">????</div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.useAmount)}
                readOnly
              />
              <div className="input-group-text bg-danger text-white">
                ????
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.cancelAmount)}
                readOnly
              />
              <div className="input-group-text bg-warning text-white">
                ????
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.expireAmount)}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-12">
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
                <div className="input-group me-2" style={{ width: "360px" }}>
                  <select
                    name="searchDateType"
                    id="searchDateType"
                    className="form-select"
                    value={searchDateType}
                    onChange={(e) => setSearchDateType(e.target.value)}
                  >
                    <option value="register">???</option>
                    <option value="use">???</option>
                    <option value="expire">???</option>
                  </select>
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
                  name="searchStatus"
                  id="searchStatus"
                  className="form-select me-2"
                  style={{ width: "80px" }}
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">??</option>
                  <option value="0">??</option>
                  <option value="1">??</option>
                  <option value="2">??</option>
                  <option value="3">??</option>
                </select>
                <select
                  name="searchType"
                  id="searchType"
                  className="form-select me-2"
                  style={{ width: "100px" }}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">??</option>
                  <option value="receiver_id">?? ??</option>
                  <option value="subject">?? ??</option>
                  <option value="register_id">???</option>
                </select>
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="??"
                />
                <button className="btn btn-lime me-2" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>??
                </button>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={fnReset}
                >
                  <i className="fa-solid fa-eraser me-2"></i>???
                </button>
                <a
                  className="btn btn-primary me-2"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCouponAdd();
                  }}
                >
                  <i className="fa-solid fa-credit-card me-2"></i>????
                </a>
              </div>
            </form>
            <div className="ms-auto">
              <a
                className="btn btn-danger"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  couponCancel("sel", null);
                }}
              >
                <i className="fa-solid fa-check me-2"></i>????
              </a>
              <a
                className="btn btn-danger"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  couponCancel("all", null);
                }}
              >
                <i className="fa-solid fa-check-all me-2"></i>????
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table
            className="table dataTable table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold"
            id="couponTable"
            style={{ margin: 0 }}
          >
            <thead
              className="bg-dark bg-gradient text-white"
              style={{ position: "sticky", top: "0px", zIndex: 1 }}
            >
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkAll"
                    ref={checkAllRef}
                    checked={checkAllChecked}
                    onChange={handleCheckAll}
                  />
                </th>
                <th>No.</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>?? ??</th>
                <th>??? ??</th>
                <th>????</th>
                <th>????</th>
                <th>???</th>
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
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    ???? ????.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon, index) => {
                  const rowNumber = pagination.total - (pagination.page - 1) * pagination.pageSize - index;
                  return (
                    <tr
                      key={coupon.id}
                      data-idx={coupon.id}
                      data-status={coupon.status}
                      data-num={rowNumber}
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          disabled={coupon.status !== "0"}
                        />
                      </td>
                      <td>{rowNumber}</td>
                      <td>{coupon.receiver_id_display || "-"}</td>
                      <td>{coupon.subject}</td>
                      <td>{formatNumber(coupon.amount)}</td>
                      <td>{getStatusLabel(coupon.status)}</td>
                      <td>{coupon.register_id_display || "-"}</td>
                      <td>{formatDateTime(coupon.register_date)}</td>
                      <td>{formatDateTime(coupon.use_date)}</td>
                      <td>{formatDate(coupon.expire_date)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col" style={{ display: "contents" }}></div>
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
export default function CouponListPage() {
  return (
    <Suspense fallback={null}>
      <CouponListPageInner />
    </Suspense>
  );
}
