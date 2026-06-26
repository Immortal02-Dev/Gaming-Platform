"use client";

import { useState, useEffect } from "react";

interface Notification {
  id?: number;
  user_id: number | null;
  title: string;
  message: string;
  type: string;
  status: string;
  send_email: number;
  send_push: number;
  scheduled_for: string | null;
}

interface NotificationModalProps {
  isOpen: boolean;
  notification: Notification | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function NotificationModal({ isOpen, notification, onClose, onSave }: NotificationModalProps) {
  const [formData, setFormData] = useState<Notification>({
    user_id: null,
    title: "",
    message: "",
    type: "system",
    status: "pending",
    send_email: 0,
    send_push: 1,
    scheduled_for: null,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (notification) {
      setFormData({ 
        ...notification,
        scheduled_for: notification.scheduled_for ? new Date(notification.scheduled_for).toISOString().slice(0, 16) : null 
      });
    } else {
      setFormData({
        user_id: null,
        title: "",
        message: "",
        type: "system",
        status: "pending",
        send_email: 0,
        send_push: 1,
        scheduled_for: null,
      });
    }
  }, [notification, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: name === "user_id" ? (value ? Number(value) : null) : value 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = notification?.id 
        ? `${BACKEND_URL}/api/admin/notifications/${notification.id}` 
        : `${BACKEND_URL}/api/admin/notifications`;
      const method = notification?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        onSave();
        onClose();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("An error occurred while sending");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        data-bs-backdrop="static"
        aria-modal="true"
        role="dialog"
        style={{ display: "block", zIndex: 1060 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                {notification ? "알림 수정" : "새 알림 발송"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">회원 ID</label>
                    <input
                      type="number"
                      className="form-control"
                      name="user_id"
                      value={formData.user_id || ""}
                      onChange={handleChange}
                      placeholder="전체 발송 시 비움"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">타입</label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="system">시스템 알림</option>
                      <option value="promotion">프로모션</option>
                      <option value="notice">공지사항</option>
                      <option value="personal">개인 메시지</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">제목</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">메시지 내용</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">예약 발송일</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="scheduled_for"
                      value={formData.scheduled_for || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="send_push"
                        id="send_push"
                        checked={formData.send_push === 1}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="send_push">
                        푸시 알림
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="send_email"
                        id="send_email"
                        checked={formData.send_email === 1}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="send_email">
                        이메일 발송
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? <i className="fa fa-spinner fa-spin me-1"></i> : null}
                  발송하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
    </>
  );
}
