"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface BoardPost {
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

export default function BoardPage() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState("20");
  const [boardType, setBoardType] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [boards, setBoards] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBoards = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(boardType && { boardType }),
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
        throw new Error(`Failed to fetch boards: ${response.status}`);
      }

      const data = await response.json();
      setBoards(data.data || []);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setBoards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(1);
  }, [pageSize, boardType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBoards(1);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    return dateString.replace("T", " ").slice(0, 19);
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
        <i className="fa fa-tasks me-2"></i>
        <a href="/board">게시판 관리</a>
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
                  name="boardType"
                  id="boardType"
                  className="form-select w-150px me-2"
                  value={boardType}
                  onChange={(e) => {
                    setBoardType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">선택</option>
                  <option value="notice">공지사항</option>
                  <option value="event">이벤트게시판</option>
                  <option value="partnerNotice">파트너 공지</option>
                  <option value="free">자유게시판</option>
                  <option value="popup">팝업</option>
                  <option value="qna">1:1문의</option>
                  <option value="reply">답변 템플릿</option>
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
                  id="searchText"
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
                onClick={() => router.push("/board/write")}
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
                {boards.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center p-4">
                      게시글이 없습니다.
                    </td>
                  </tr>
                ) : (
                  boards.map((board) => (
                    <tr key={board.id} className="" data-idx={board.id}>
                      <td>{board.id}</td>
                      <td>{board.boardTypeDisplay}</td>
                      <td className="p-1">
                        {board.parent ? (
                          <div className="dropdown">
                            <div
                              className="input-group w-auto d-flex user-action"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              role="button"
                            >
                              <div
                                className="input-group-text p-1 cursor-pointer d-inline"
                                style={{ backgroundColor: board.parent.color }}
                              >
                                {board.parent.role}
                              </div>
                              <label className="form-control p-1 cursor-pointer">
                                {board.parent.display}
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
                                {board.parent.display}
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=1`}
                                >
                                  정보수정
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=17`}
                                >
                                  수수료율
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=3`}
                                >
                                  머니지급/차감
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=6`}
                                >
                                  포인트지급/차감
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href={`/message/write?userId=${board.parentUserId}`}
                                >
                                  쪽지보내기
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=8`}
                                >
                                  베팅내역
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=4`}
                                >
                                  충환전내역
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=5`}
                                >
                                  머니거래내역
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=7`}
                                >
                                  포인트거래내역
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/user/detail?userId=${board.parentUserId}&tab=15`}
                                >
                                  쿠폰 현황
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="register p-1">
                        <div className="dropdown">
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="user-action"
                            role="button"
                          >
                            {board.user.display}
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
                              {board.user.display}
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=1`}
                              >
                                정보수정
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=17`}
                              >
                                수수료율
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=3`}
                              >
                                머니지급/차감
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=6`}
                              >
                                포인트지급/차감
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/message/write?userId=${board.userId}`}
                              >
                                쪽지보내기
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=8`}
                              >
                                베팅내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=4`}
                              >
                                충환전내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=5`}
                              >
                                머니거래내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=7`}
                              >
                                포인트거래내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${board.userId}&tab=15`}
                              >
                                쿠폰 현황
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>{board.requestType}</td>
                      <td>
                        <a
                          href={`/board/edit?boardType=${board.boardType}&boardIdx=${board.id}`}
                          className="text-decoration-none"
                          dangerouslySetInnerHTML={{ __html: board.subject }}
                        />
                      </td>
                      <td className="">{board.isPinned}</td>
                      <td>{board.displayOrder || ""}</td>
                      <td className="">{board.isPopup}</td>
                      <td className="">{board.isDisabled}</td>
                      <td>{formatDate(board.displayDate)}</td>
                      <td>{formatDate(board.createdAt)}</td>
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
                    onClick={() => fetchBoards(currentPage - 1)}
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
                          onClick={() => fetchBoards(page)}
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
                    onClick={() => fetchBoards(currentPage + 1)}
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

      <div className="row">
        <div className="col text-center"></div>
      </div>

      <div className="memo-container"></div>
    </Layout>
  );
}
