import React, { useState, useEffect, useCallback } from "react";

interface TabInquiryProps {
  userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface InquiryLog {
  id: number;
  subject: string;
  isDisabled: string;
  createdAt: string;
}

interface PaginationData {
  totalPages: number;
}

export default function TabInquiry({ userIdx }: TabInquiryProps) {
  const [logs, setLogs] = useState<InquiryLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("50");
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const openInquiryEditPopup = (boardIdx: number) => {
    const width = 1200;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      `/board/qna/edit?boardIdx=${boardIdx}`,
      "InquiryEdit",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  };

  const fetchLogs = useCallback(async () => {
    if (!userIdx) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        userIdx,
        boardType: "qna",
        page: page.toString(),
        pageSize,
        searchText,
        searchType,
      }).toString();

      const response = await fetch(`${BACKEND_URL}/api/admin/boards?${query}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setLogs(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [userIdx, page, pageSize, searchText, searchType]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2 border rounded">
            <form className="w-100" onSubmit={handleSearch}>
              <div className="row">
                <div className="col">
                  <div className="d-flex align-items-center">
                    <select
                      name="pageSize"
                      className="form-select w-80px me-2"
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                    <select
                      name="searchType"
                      className="form-select w-100px me-2"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">전체</option>
                      <option value="subject">제목</option>
                    </select>
                    <input
                      type="text"
                      name="searchText"
                      className="form-control w-150px me-2"
                      placeholder="검색어 입력"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-lime">
                      <i className="fa-solid fa-magnifying-glass me-2" />
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
          <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>No.</th>
                <th>제목</th>
                <th>답변여부</th>
                <th>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4}>데이터가 없습니다.</td>
                </tr>
              ) : (
                logs.map((log: InquiryLog, index: number) => (
                  <tr key={log.id}>
                    <td>{(page - 1) * parseInt(pageSize) + index + 1}</td>
                    <td className="text-start ps-3">
                      <a
                        href="#"
                        className="text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          openInquiryEditPopup(log.id);
                        }}
                      >
                        {log.subject}
                      </a>
                    </td>
                    <td>
                      {log.isDisabled === "Y" ? (
                        <span className="text-success">완료</span>
                      ) : (
                        <span className="text-danger">대기 중</span>
                      )}
                    </td>
                    <td>{log.createdAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {pagination && pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-sm btn-outline-secondary me-1"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
              <span className="p-2">
                {page} / {pagination.totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary ms-1"
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
