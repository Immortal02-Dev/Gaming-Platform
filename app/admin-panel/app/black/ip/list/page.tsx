"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

interface BlackIPEntry {
  id: number;
  rowNumber: number;
  grade?: string | null;
  userId?: string | null;
  nickname?: string | null;
  ip: string;
  domain?: string | null;
  memo?: string | null;
  blockedAt: string;
}

interface BlacklistResponse {
  success: boolean;
  data?: BlackIPEntry[];
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
  error?: string;
}

const pageSizeOptions = [50, 100, 200, 300, 500, 1000];
const API_BASE_URL = ""; // Use relative path for proxy

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

export default function BlackIPListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    pageSize: "50",
    searchType: "",
    searchText: "",
  });

  const [entries, setEntries] = useState<BlackIPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    hasMore: false,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          pageSize: appliedFilters.pageSize,
        });

        if (appliedFilters.searchType) {
          params.append("searchType", appliedFilters.searchType);
        }
        if (appliedFilters.searchText) {
          params.append("searchText", appliedFilters.searchText);
        }

        const response = await fetch(
          `${API_BASE_URL}/api/admin/blacklist/ips?${params.toString()}`,
          {
            credentials: "include",
            signal: controller.signal,
          }
        );

        const payload: BlacklistResponse = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(
            payload.error || "차단 IP 목록을 불러오지 못했습니다."
          );
        }

        setEntries(payload.data ?? []);
        if (payload.pagination) {
          setPagination(payload.pagination);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "차단 IP 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
    return () => controller.abort();
  }, [appliedFilters, refreshIndex]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedFilters({
      pageSize,
      searchType,
      searchText,
    });
  };

  const handleUnblock = async (id: number) => {
    if (!confirm("해당 IP 차단을 해제하시겠습니까?")) {
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/blacklist/ips/${id}/unblock`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "차단 해제에 실패했습니다.");
      }

      setRefreshIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "차단 해제에 실패했습니다.");
    }
  };

  const rowsToRender = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-4">
            차단 IP 정보를 불러오는 중입니다...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={8} className="text-center text-danger py-4">
            {error}
          </td>
        </tr>
      );
    }

    if (!entries.length) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-4">
            등록된 차단 IP가 없습니다.
          </td>
        </tr>
      );
    }

    return entries.map((entry) => (
      <tr key={entry.id}>
        <td>{entry.rowNumber ?? entry.id}</td>
        <td>{entry.grade ?? ""}</td>
        <td>
          {entry.userId
            ? `${entry.userId}${entry.nickname ? ` (${entry.nickname})` : ""}`
            : ""}
        </td>
        <td>
          <Link
            href={`/login/log/list?pageSize=50&searchType=ip&searchText=${encodeURIComponent(
              entry.ip
            )}`}
            target="_blank"
            className="text-decoration-none"
          >
            {entry.ip}
          </Link>
        </td>
        <td>{entry.domain ?? ""}</td>
        <td className="text-start">{entry.memo ?? ""}</td>
        <td>{formatDateTime(entry.blockedAt)}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm text-white"
            onClick={() => handleUnblock(entry.id)}
          >
            차단 해제
          </button>
        </td>
      </tr>
    ));
  }, [entries, error, loading]);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/blackIPList.html">
          <i className="fa fa-file-medical-alt me-2"></i>
          차단 IP
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form id="blackIPList" className="w-100" onSubmit={handleSearch}>
              <div className="row">
                <div className="col">
                  <div className="d-flex align-items-center">
                    <select
                      name="pageSize"
                      className="form-select w-80px me-2"
                      value={pageSize}
                      onChange={(event) => setPageSize(event.target.value)}
                    >
                      {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size.toLocaleString()}
                        </option>
                      ))}
                    </select>

                    <select
                      name="searchType"
                      className="form-select w-auto me-2"
                      value={searchType}
                      onChange={(event) => setSearchType(event.target.value)}
                    >
                      <option value="">전체</option>
                      <option value="ip">IP</option>
                      <option value="id">ID</option>
                      <option value="nick">닉네임</option>
                      <option value="domain">도메인</option>
                    </select>

                    <input
                      type="text"
                      name="searchText"
                      id="searchText"
                      className="form-control w-150px me-2"
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                      placeholder="검색어"
                    />

                    <button
                      type="submit"
                      className="btn btn-lime"
                      id="btnSearch"
                    >
                      <i className="fa-solid fa-magnifying-glass me-2"></i>
                      검색
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
                <th className="w-150px">아이디(닉네임)</th>
                <th className="w-150px">IP</th>
                <th className="w-150px">도메인</th>
                <th>차단 메모</th>
                <th className="w-150px">차단 일시</th>
                <th className="w-100px">해제</th>
              </tr>
            </thead>
            <tbody>{rowsToRender}</tbody>
          </table>
        </div>
      </div>

      <div className="alert alert-info mt-3" role="alert">
        <strong>안내</strong> 기존 HTML은 `fnIPUnBlack`, `loading()`, Socket.IO
        알림 등 jQuery 플러그인과 전역 스크립트에 의존합니다. Next.js에서는 해당
        기능을 React 이벤트 핸들러와 API 라우트(예: `POST
        /api/blacklist/unblock`)로 대체하거나 SWR/React Query를 사용해 비동기
        처리를 수행해야 합니다.
      </div>
    </Layout>
  );
}
