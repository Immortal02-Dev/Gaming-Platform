"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  created_at: string;
}

export default function ChatModerationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/chat/messages`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error("Chat load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("이 메시지를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/chat/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleClear = async () => {
    if (!confirm("전체 채팅 내역을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/chat/clear`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Clear failed", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/chat">
          <i className="fa fa-comments me-2"></i>채팅 모니터링 (Chat Moderation)
        </a>
        <small>실시간 공개 채팅 관리 및 부적절한 메시지 삭제</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">채팅 로그</h5>
          <div className="btn-group btn-group-sm">
            <button className="btn btn-outline-light" onClick={fetchMessages}>
              <i className="fa fa-sync me-1"></i>새로고침
            </button>
            <button className="btn btn-danger" onClick={handleClear}>
              <i className="fa fa-trash-alt me-1"></i>전체 삭제
            </button>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center p-4">
              <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle text-center fw-bold">
                <thead className="table-light">
                  <tr>
                    <th>시간</th>
                    <th>회원</th>
                    <th>메시지</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-muted">최근 채팅 내역이 없습니다.</td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m.id}>
                        <td className="text-muted small" style={{ width: "150px" }}>
                          {new Date(m.created_at).toLocaleString()}
                        </td>
                        <td style={{ width: "150px" }}>{m.username}</td>
                        <td className="text-start">{m.message}</td>
                        <td style={{ width: "100px" }}>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>
                            <i className="fa fa-times"></i> 삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
