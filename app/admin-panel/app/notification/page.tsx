"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import NotificationModal from "@/components/NotificationModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface NotificationItem {
  id: number;
  user_id: number | null;
  title: string;
  message: string;
  type: string;
  status: string;
  send_email: number;
  send_push: number;
  scheduled_for: string | null;
  created_at: string;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/notifications`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error("Notification load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setSelectedNotification(null);
    setIsModalOpen(true);
  };

  const handleEdit = (notification: NotificationItem) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const deleteNotification = async (id: number) => {
    if (!confirm("이 알림을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        loadNotifications();
      }
    } catch (error) {
      console.error("Notification delete failed", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/notification">
          <i className="fa fa-bell me-2"></i>알림 관리
        </a>
        <small></small>
      </h1>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">알림 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 알림 발송
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center p-4">
              <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>ID</th>
                    <th>회원 ID</th>
                    <th>타입</th>
                    <th>제목</th>
                    <th>발송</th>
                    <th>예약일</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center p-4">
                        알림이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    notifications.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.user_id ?? "전체"}</td>
                        <td>{item.type}</td>
                        <td className="text-start">{item.title}</td>
                        <td>
                          {item.send_email ? "이메일" : ""}
                          {item.send_email && item.send_push ? ", " : ""}
                          {item.send_push ? "푸시" : ""}
                        </td>
                        <td>
                          {item.scheduled_for
                            ? new Date(item.scheduled_for).toLocaleString("ko-KR")
                            : "즉시"}
                        </td>
                        <td>{item.status}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteNotification(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
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

      <NotificationModal 
        isOpen={isModalOpen}
        notification={selectedNotification}
        onClose={() => setIsModalOpen(false)}
        onSave={loadNotifications}
      />
    </Layout>
  );
}
