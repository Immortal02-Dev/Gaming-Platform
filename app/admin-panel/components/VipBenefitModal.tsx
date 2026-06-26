"use client";

import { useState, useEffect } from "react";

export interface VipBenefit {
  id?: number;
  level_id: number;
  title: string;
  image_url: string;
  description: string;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

interface VipBenefitModalProps {
  isOpen: boolean;
  benefit: VipBenefit | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function VipBenefitModal({ isOpen, benefit, onClose, onSave }: VipBenefitModalProps) {
  const [formData, setFormData] = useState<VipBenefit>({
    level_id: 1,
    title: "",
    image_url: "",
    description: "",
    is_active: 1,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (benefit) {
      setFormData({ ...benefit, is_active: benefit.is_active ? 1 : 0 });
    } else {
      setFormData({
        level_id: 1,
        title: "",
        image_url: "",
        description: "",
        is_active: 1,
      });
    }
  }, [benefit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "image_url" || name === "description" || name === "title" ? value : Number(value) 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = benefit?.id 
        ? `${BACKEND_URL}/api/admin/vip/benefits/${benefit.id}` 
        : `${BACKEND_URL}/api/admin/vip/benefits`;
      const method = benefit?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save VIP benefit");
      }
    } catch (error) {
      console.error("Error saving VIP benefit:", error);
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                {benefit ? "VIP 혜택 수정" : "새 혜택 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">적용 등급 (LV)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="level_id"
                      value={formData.level_id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                   <div className="col-md-6">
                    <label className="form-label fw-bold">혜택 명칭 (Title)</label>
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
                    <label className="form-label fw-bold">이미지 URL (Image URL)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      required
                      placeholder="예: https://..."
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">설명</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows={2}
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">상태</label>
                    <select
                      className="form-select"
                      name="is_active"
                      value={formData.is_active}
                      onChange={handleChange}
                    >
                      <option value={1}>활성</option>
                      <option value={0}>비활성</option>
                    </select>
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
