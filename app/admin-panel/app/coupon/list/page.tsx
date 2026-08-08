"use client";

import { Suspense } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useSearchParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    couponAdd?: (userIdx?: number) => void;
    // flatpickr and resizeContent are defined as any in the original
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
  return date
    .toLocaleDateString("ko-KR")
    .replace(/\./g, "-")
    .replace(/\s/g, "");
};

const formatDateTime = (dateString: string | null) => {
  if (!dateString) return "-";
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

const getStatusLabel = (status: string) => {
  const statusMap: { [key: string]: string } = {
    "0": "대기",
    "1": "사용",
    "2": "취소",
    "3": "만료",
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
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") || "50",
  );
  const [searchDateType, setSearchDateType] = useState(
    searchParams.get("searchDateType") || "register",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [searchStatus, setSearchStatus] = useState(
    searchParams.get("searchStatus") || "",
  );
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "",
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || "",
  );

  const isMountedRef = useRef(true);

  const fetchCoupons = useCallback(async () => {
    if (!isMountedRef.current) return;
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

      const response = await fetch(
        `${API_BASE_URL}/api/admin/coupons?${params.toString()}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }

      const data: CouponsResponse = await response.json();
      if (data.success && isMountedRef.current) {
        setCoupons(data.data);
        setSummary(data.summary);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      alert("쿠폰 목록을 불러오는데 실패했습니다.");
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [
    searchParams,
    pageSize,
    searchDateType,
    startDate,
    endDate,
    searchStatus,
    searchType,
    searchText,
  ]);

  useEffect(() => {
    isMountedRef.current = true;

    // Use setTimeout to ensure setState is called asynchronously
    const timer = setTimeout(() => {
      fetchCoupons();
    }, 0);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [
    searchParams,
    pageSize,
    searchDateType,
    startDate,
    endDate,
    searchStatus,
    searchType,
    searchText,
  ]);

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
      "#couponTable tbody input[type='checkbox']",
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  const couponCancel = async (type: string, couponIdx: number | null) => {
    let msg = "쿠폰을 ";
    const data: any = {};

    if (type === "all") {
      msg = "검색된 조건의 쿠폰을 ";
      data.type = "all";
      data.searchDateType = searchDateType;
      if (startDate) data.startDate = startDate;
      if (endDate) data.endDate = endDate;
      if (searchStatus) data.searchStatus = searchStatus;
      if (searchType) data.searchType = searchType;
      if (searchText) data.searchText = searchText;
    } else if (type === "sel") {
      msg = "선택된 쿠폰을 ";
      const checkedBoxes = document.querySelectorAll(
        "#couponTable tbody input[type='checkbox']:checked",
      ) as NodeListOf<HTMLInputElement>;

      if (checkedBoxes.length < 1) {
        alert("하나 이상 선택해 주세요.");
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
            alert(num + "번 쿠폰은 취소할 수 없습니다.");
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

    if (confirm(msg + "취소하시겠습니까?")) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/admin/coupons/cancel`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          },
        );

        const ret = await response.json();
        if (ret.success) {
          alert(ret.message || "취소되었습니다.");
          fetchCoupons();
        } else {
          alert(ret.error || "쿠폰 취소에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error canceling coupons:", error);
        alert("오류가 발생했습니다.");
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
          <i className="fa fa-credit-card me-2"></i>쿠폰 목록
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <div className="input-group">
              <div className="input-group-text bg-success text-white">
                대기금액
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.waitAmount)}
                readOnly
              />
              <div className="input-group-text bg-info text-white">
                사용금액
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.useAmount)}
                readOnly
              />
              <div className="input-group-text bg-danger text-white">
                취소금액
              </div>
              <input
                type="text"
                className="form-control"
                value={formatNumber(summary.cancelAmount)}
                readOnly
              />
              <div className="input-group-text bg-warning text-white">
                만료금액
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
          <div className="d-flex bg-white p-2 flex-wrap gap-2">
            <form id="formSearch" ref={formSearchRef} onSubmit={handleSearch}>
              <div className="d-flex flex-wrap gap-1">
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
                    <option value="register">등록일</option>
                    <option value="use">사용일</option>
                    <option value="expire">만료일</option>
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
                  <option value="">전체</option>
                  <option value="0">대기</option>
                  <option value="1">사용</option>
                  <option value="2">취소</option>
                  <option value="3">만료</option>
                </select>
                <select
                  name="searchType"
                  id="searchType"
                  className="form-select me-2"
                  style={{ width: "100px" }}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="receiver_id">받는사람</option>
                  <option value="subject">쿠폰제목</option>
                  <option value="register_id">등록자</option>
                </select>
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="검색어"
                />
                <button
                  className="btn btn-lime me-2"
                  id="btnSearch"
                  type="submit"
                >
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={fnReset}
                >
                  <i className="fa-solid fa-eraser me-2"></i>초기화
                </button>
                <a
                  className="btn btn-primary me-2"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCouponAdd();
                  }}
                >
                  <i className="fa-solid fa-credit-card me-2"></i>쿠폰등록
                </a>
              </div>
            </form>
            <div className="ms-auto d-flex gap-1">
              <a
                className="btn btn-danger"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  couponCancel("sel", null);
                }}
              >
                <i className="fa-solid fa-check me-2"></i>선택취소
              </a>
              <a
                className="btn btn-danger"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  couponCancel("all", null);
                }}
              >
                <i className="fa-solid fa-check-all me-2"></i>전체취소
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div style={{ overflow: "auto" }}>
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
                  <th>받는사람</th>
                  <th>쿠폰제목</th>
                  <th>쿠폰금액</th>
                  <th>상태</th>
                  <th>등록자</th>
                  <th>등록일시</th>
                  <th>사용일시</th>
                  <th>만료일</th>
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
                ) : coupons.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-4">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon, index) => {
                    const rowNumber =
                      pagination.total -
                      (pagination.page - 1) * pagination.pageSize -
                      index;
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
            처리중입니다. 잠시만 기다려주세요.
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
