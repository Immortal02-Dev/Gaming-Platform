"use client";

import { useState, useEffect } from "react";

interface Promotion {
  id?: number;
  title: string;
  slug?: string;
  description: string;
  image: string;
  href: string;
  category: string;
  status: string;
  type: string;
  ends_at: string;
}

interface PromotionModalProps {
  isOpen: boolean;
  promotion: Promotion | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function PromotionModal({ isOpen, promotion, onClose, onSave }: PromotionModalProps) {
  const [formData, setFormData] = useState<Promotion>({
    title: "",
    description: "",
    image: "",
    href: "",
    category: "",
    status: "active",
    type: "banner",
    ends_at: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (promotion) {
      setFormData({
        ...promotion,
        ends_at: promotion.ends_at ? new Date(promotion.ends_at).toISOString().split('T')[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        href: "",
        category: "",
        status: "active",
        type: "banner",
        ends_at: "",
      });
    }
  }, [promotion, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = promotion?.id 
        ? `${BACKEND_URL}/api/admin/promotions/${promotion.id}` 
        : `${BACKEND_URL}/api/admin/promotions`;
      const method = promotion?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save promotion");
      }
    } catch (error) {
      console.error("Error saving promotion:", error);
      alert("An error occurred while saving");
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
                {promotion ? "프로모션 수정" : "새 프로모션 등록"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-8">
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
                  <div className="col-md-4">
                    <label className="form-label fw-bold">카테고리</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
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
                      <option value="banner">배너</option>
                      <option value="popup">팝업</option>
                      <option value="event">이벤트</option>
                      <option value="notice">공지</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">상태</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">활성</option>
                      <option value="inactive">비활성</option>
                      <option value="draft">임시저장</option>
                      <option value="expired">만료</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">설명</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">이미지 URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">이동 경로 (Link)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="href"
                      value={formData.href}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">종료일</label>
                    <input
                      type="date"
                      className="form-control"
                      name="ends_at"
                      value={formData.ends_at}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? <i className="fa fa-spinner fa-spin me-1"></i> : null}
                  저장하기
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
