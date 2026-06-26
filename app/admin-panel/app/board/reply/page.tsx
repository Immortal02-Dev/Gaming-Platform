"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface ReplyTemplate {
  id: number;
  boardType: string;
  boardTypeDisplay: string;
  userId: number;
  parentUserId: number | null;
  requestType: string;
  subject: string;
  content: string | null;
  isPinned: string;
  displayOrder: number;
  isPopup: string;
  isDisabled: string;
  displayDate: string | null;
  viewCount: number;
  createdAt: string;
  user: {
    username: string;
    nickname: string;
    display: string;
  };
  parent: {
    userId: number;
    username: string;
    nickname: string;
    role: string;
    color: string;
    display: string;
  } | null;
}

export default function BoardReplyPage() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState("20");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [templates, setTemplates] = useState<ReplyTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTemplates = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        boardType: "reply",
        ...(searchType && { searchType }),
        ...(searchText && { searchText }),
      });

      const response = await fetch(
        `${BACKEND_URL}/api/admin/boards?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reply templates: ${response.status}`);
      }

      const data = await response.json();
      setTemplates(data.data || []);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reply templates:", error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates(1);
  }, [pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTemplates(1);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    return dateString.replace("T", " ").slice(0, 19);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-comment me-2"></i>
        <a href="/board/reply">답변 템플릿</a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <div className="d-flex">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-100px me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="subject">제목</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                />

                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <button
                onClick={() => router.push("/board/write?boardType=reply")}
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-edit me-2"></i>글쓰기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table
              className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold"
              id="listTable"
            >
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th className="w-80px">No.</th>
                  <th className="w-80px">게시판</th>
                  <th>소속</th>
                  <th>작성자</th>
                  <th>요청 구분</th>
                  <th style={{ width: "40%" }}>제목</th>
                  <th className="w-80px">상단고정</th>
                  <th className="w-80px">순서</th>
                  <th className="w-80px">공지팝업</th>
                  <th className="w-80px">사용안함</th>
                  <th className="w-150px">표시일자</th>
                  <th className="w-150px">작성일자</th>
                </tr>
              </thead>
              <tbody>
                {templates.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center p-4">
                      등록된 템플릿이 없습니다.
                    </td>
                  </tr>
                ) : (
                  templates.map((template) => (
                    <tr key={template.id} data-idx={template.id}>
                      <td>{template.id}</td>
                      <td>{template.boardTypeDisplay}</td>
                      <td className="p-1"></td>
                      <td className="p-1">
                        <a
                          href="javascript:void(0)"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="user-action"
                        >
                          {template.user.display}
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
                            {template.user.display}
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=1`}
                            >
                              정보수정
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=17`}
                            >
                              수수료율
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=3`}
                            >
                              머니지급/차감
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=6`}
                            >
                              포인트지급/차감
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href={`/message/write?userId=${template.userId}`}
                            >
                              쪽지보내기
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=8`}
                            >
                              베팅내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=4`}
                            >
                              충환전내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=5`}
                            >
                              머니거래내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=7`}
                            >
                              포인트거래내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/user/detail?userId=${template.userId}&tab=15`}
                            >
                              쿠폰 현황
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td>{template.requestType}</td>
                      <td>
                        <a
                          href={`/board/edit?boardType=reply&boardIdx=${template.id}`}
                          className="text-decoration-none"
                          dangerouslySetInnerHTML={{ __html: template.subject }}
                        />
                      </td>
                      <td className="">{template.isPinned}</td>
                      <td>{template.displayOrder || ""}</td>
                      <td className="">{template.isPopup}</td>
                      <td className="">{template.isDisabled}</td>
                      <td>{formatDate(template.displayDate)}</td>
                      <td>{formatDate(template.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="row mt-3">
          <div className="col text-center">
            <nav>
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchTemplates(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    이전
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                  )
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                      <li
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => fetchTemplates(page)}
                        >
                          {page}
                        </button>
                      </li>
                    </React.Fragment>
                  ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchTemplates(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </Layout>
  );
}
