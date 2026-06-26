"use client";

import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";



const BACKEND_URL = ""; // Use relative path for proxy

interface Message {
  id: number;
  senderId: number | null;
  senderType: string;
  receiverId: number;
  subject: string;
  content: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  sender: {
    username: string;
    nickname: string;
    display: string;
  };
  receiver: {
    username: string;
    nickname: string;
    display: string;
  };
  parent: {
    username: string;
    nickname: string;
    role: string;
    color: string;
    display: string;
  } | null;
}

export default function MessagePage() {
  const [pageSize, setPageSize] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  

  const fetchMessages = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(searchType && { searchType }),
        ...(searchText && { searchText }),
      });

      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.data || []);
      setCurrentPage(data.pagination.page);
    } finally {
      setLoading(false);
    }
  }, [pageSize, searchType, searchText]);

  useEffect(() => {
    fetchMessages(1);
  }, [pageSize, fetchMessages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMessages(1);
  };
  const messageWriteNew = () => {
    const nWidth = 750;
    const nHeight = 690;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      "/message/write",
      "messageWrite",
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const messageEdit = (messageIdx: number) => {
    const nWidth = 750;
    const nHeight = 690;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      `/message/edit?messageIdx=${messageIdx}`,
      `messageEdit${messageIdx}`,
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const fnMessageSelectDelete = async () => {
    if (selectedMessages.length === 0) {
      alert("삭제할 쪽지를 선택해주세요.");
      return;
    }

    if (!confirm("선택 항목을 삭제 하시겠습니까?")) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/delete-selected`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageIds: selectedMessages }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        setSelectedMessages([]);
        fetchMessages(currentPage);
      } else {
        alert(result.message || "삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const fnMessageDelete = async (messageIdx: number) => {
    if (!confirm("쪽지를 삭제 하시겠습니까?")) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/${messageIdx}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        fetchMessages(currentPage);
      } else {
        alert(result.message || "삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const fnMessageDeleteAll = async () => {
    if (!confirm("전체 쪽지를 삭제 하시겠습니까?")) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/delete-all`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        setSelectedMessages([]);
        fetchMessages(currentPage);
      } else {
        alert(result.message || "삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting all messages:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMessages(messages.map((m) => m.id));
    } else {
      setSelectedMessages([]);
    }
  };

  const handleCheckMessage = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedMessages([...selectedMessages, id]);
    } else {
      setSelectedMessages(selectedMessages.filter((mid) => mid !== id));
    }
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/message">
          <i className="fas fa-envelope me-2"></i>쪽지 관리
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      {/* begin row */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <div className="d-flex">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
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
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <a onClick={messageWriteNew} className="btn btn-primary">
                <i className="fas fa-edit me-1"></i>쪽지 발송
              </a>
              <button
                className="btn bg-red-300 text-white"
                onClick={fnMessageSelectDelete}
              >
                <i className="fas fa-trash-alt me-1"></i>선택 삭제
              </button>
              <button className="btn btn-danger" onClick={fnMessageDeleteAll}>
                <i className="fas fa-trash-alt me-1"></i>전체 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-50px">
                  <input
                    type="checkbox"
                    id="checkAll"
                    checked={
                      messages.length > 0 &&
                      selectedMessages.length === messages.length
                    }
                    onChange={handleCheckAll}
                  />
                </th>
                <th className="w-80px">No.</th>
                <th>소속</th>
                <th>받는 사람</th>
                <th style={{ width: "30%" }}>제목</th>
                <th className="w-150px">작성자</th>
                <th className="w-80px">확인</th>
                <th className="w-150px">확인일자</th>
                <th className="w-150px">작성일자</th>
                <th className="w-80px">관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10}>로딩 중...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={10}>쪽지가 없습니다.</td>
                </tr>
              ) : (
                messages.map((message, index) => (
                  <tr key={message.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMessages.includes(message.id)}
                        onChange={(e) =>
                          handleCheckMessage(message.id, e.target.checked)
                        }
                      />
                    </td>
                    <td>
                      {(currentPage - 1) * parseInt(pageSize) + index + 1}
                    </td>
                    <td className="p-1">
                      {message.parent ? message.parent.display : ""}
                    </td>
                    <td>
                      <div
                        className="input-group w-auto d-flex user-action"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div
                          className="input-group-text p-1 cursor-pointer d-inline"
                          style={{
                            backgroundColor: message.parent?.color || "#b6d7a8",
                          }}
                        >
                          {message.parent?.role || "회원"}
                        </div>
                        <label className="form-control p-1 cursor-pointer">
                          {message.receiver.display}
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
                          {message.receiver.display}
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=1`}
                          >
                            정보수정
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=17`}
                          >
                            수수료율
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=3`}
                          >
                            머니지급/차감
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=6`}
                          >
                            포인트지급/차감
                          </a>
                        </li>
                        <li className="bg-gray-700">
                          <a
                            className="dropdown-item"
                            href={`javascript:messageWrite(${message.receiverId});`}
                          >
                            쪽지보내기
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=8`}
                          >
                            베팅내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=4`}
                          >
                            충환전내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=5`}
                          >
                            머니거래내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=7`}
                          >
                            포인트거래내역
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/user/user/detail?userIdx=${message.receiverId}&tabType=15`}
                          >
                            쿠폰 현황
                          </a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <a
                        href="javascript:void(0)"
                        onClick={() => messageEdit(message.id)}
                        dangerouslySetInnerHTML={{ __html: message.subject }}
                      />
                    </td>
                    <td>{message.sender.display}</td>
                    <td>{message.isRead ? "읽음" : "안읽음"}</td>
                    <td>{message.readAt || "-"}</td>
                    <td>{message.createdAt}</td>
                    <td className="p-1">
                      <a
                        className="btn btn-danger btn-sm"
                        onClick={() => fnMessageDelete(message.id)}
                      >
                        <i className="fas fa-trash-alt me-1"></i>삭제
                      </a>
                    </td>
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
