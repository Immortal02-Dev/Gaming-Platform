"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface QnaPost {
  id: number;
  boardType: string;
  boardTypeDisplay: string;
  userId: number;
  parentUserId: number | null;
  requestType: string;
  subject: string;
  content: string | null;
  replyContent?: string | null;
  repliedAt?: string | null;
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

export default function BoardQnaPage() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState("20");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [qnaPosts, setQnaPosts] = useState<QnaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const fetchQnaPosts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        boardType: "qna",
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
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch QnA posts: ${response.status}`);
      }

      const data = await response.json();
      setQnaPosts(data.data || []);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching QnA posts:", error);
      setQnaPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQnaPosts(1);
  }, [pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchQnaPosts(1);
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPosts(qnaPosts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleCheckItem = (id: number) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }

    if (
      !confirm(`선택한 ${selectedPosts.length}개의 게시글을 삭제하시겠습니까?`)
    ) {
      return;
    }

    // TODO: Implement delete API call
    console.log("Delete posts:", selectedPosts);
  };

  const handleDeleteOne = async (id: number) => {
    if (!confirm("이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    // TODO: Implement delete API call
    console.log("Delete post:", id);
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "-";
    return dateString.replace("T", " ").slice(0, 19);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-question-circle me-2"></i>
        <a href="/board/qna">1:1문의</a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <div className="d-flex align-items-center">
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
                  className="form-select w-120px me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">전체</option>
                  <option value="subject">제목</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                  <option value="replywait">답변대기</option>
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

                <button
                  className="btn btn-lime d-flex align-items-center text-nowrap"
                  id="btnSearch"
                  type="submit"
                >
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleDeleteSelected}
              >
                <i className="fa-solid fa-check me-2"></i>선택삭제
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
                  <th className="w-40px">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkAll"
                      checked={
                        qnaPosts.length > 0 &&
                        selectedPosts.length === qnaPosts.length
                      }
                      onChange={handleCheckAll}
                    />
                  </th>
                  <th className="w-80px">No.</th>
                  <th className="w-80px">게시판</th>
                  <th>소속</th>
                  <th>작성자</th>
                  <th>요청 구분</th>
                  <th style={{ width: "40%" }}>제목</th>
                  <th className="w-100px">답변여부</th>
                  <th className="w-100px">확인</th>
                  <th className="w-100px">삭제위치</th>
                  <th className="w-100px">삭제유저</th>
                  <th className="w-150px">확인일자</th>
                  <th className="w-150px">작성일자</th>
                  <th className="w-150px">삭제일자</th>
                  <th className="w-80px">삭제</th>
                </tr>
              </thead>
              <tbody>
                {qnaPosts.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="text-center p-4">
                      문의 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  qnaPosts.map((post) => (
                    <tr key={post.id} data-idx={post.id}>
                      <td>
                        <input
                          type="checkbox"
                          name="qnaIdx[]"
                          value={post.id}
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => handleCheckItem(post.id)}
                        />
                      </td>
                      <td>{post.id}</td>
                      <td>
                        <span className="badge bg-info">
                          {post.boardTypeDisplay}
                        </span>
                      </td>
                      <td className="p-1"></td>
                      <td className="p-1">
                        <div className="dropdown">
                          <div
                            className="input-group w-auto d-flex user-action"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            role="button"
                          >
                            <div
                              className="input-group-text p-1 cursor-pointer d-inline"
                              style={{
                                backgroundColor:
                                  post.parent?.color || "#f4a29c",
                              }}
                            >
                              {post.parent?.role || "부본사"}
                            </div>
                            <label className="form-control p-1 cursor-pointer">
                              {post.user.display}
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
                              {post.user.display}
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=1`}
                              >
                                정보수정
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=17`}
                              >
                                수수료율
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=3`}
                              >
                                머니지급/차감
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=6`}
                              >
                                포인트지급/차감
                              </a>
                            </li>
                            <li className="bg-gray-700">
                              <a
                                className="dropdown-item"
                                href={`/message/write?userId=${post.userId}`}
                              >
                                쪽지보내기
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=8`}
                              >
                                베팅내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=4`}
                              >
                                충환전내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=5`}
                              >
                                머니거래내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=7`}
                              >
                                포인트거래내역
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href={`/user/detail?userId=${post.userId}&tab=15`}
                              >
                                쿠폰 현황
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {post.requestType || "일반"}
                        </span>
                      </td>
                      <td className="text-start">
                        <a
                          href={`/board/edit?boardType=qna&boardIdx=${post.id}`}
                          className="text-decoration-none"
                          dangerouslySetInnerHTML={{ __html: post.subject }}
                        />
                      </td>
                      <td>
                        {post.replyContent ? (
                          <span className="badge bg-success">답변완료</span>
                        ) : (
                          <span className="badge bg-danger">답변대기</span>
                        )}
                      </td>
                      <td>
                        {post.repliedAt ? (
                          <span className="badge bg-primary">확인완료</span>
                        ) : (
                          <span className="badge bg-secondary">미확인</span>
                        )}
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>{formatDate(post.repliedAt)}</td>
                      <td>{formatDate(post.createdAt)}</td>
                      <td>-</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteOne(post.id)}
                        >
                          삭제
                        </button>
                      </td>
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
                    onClick={() => fetchQnaPosts(currentPage - 1)}
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
                      (page >= currentPage - 2 && page <= currentPage + 2),
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
                          onClick={() => fetchQnaPosts(page)}
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
                    onClick={() => fetchQnaPosts(currentPage + 1)}
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
