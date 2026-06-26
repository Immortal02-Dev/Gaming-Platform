"use client";

import { useState, useEffect } from "react";

export interface VipLevel {
  id?: number;
  level: number;
  name: string;
  min_wager: number;
  bonus_percentage: number;
  monthly_bonus: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

interface VipLevelModalProps {
  isOpen: boolean;
  vipLevel: VipLevel | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function VipLevelModal({ isOpen, vipLevel, onClose, onSave }: VipLevelModalProps) {
  const [formData, setFormData] = useState<VipLevel>({
    level: 1,
    name: "",
    min_wager: 0,
    bonus_percentage: 0,
    monthly_bonus: 0,
    is_active: 1,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (vipLevel) {
      setFormData({ ...vipLevel, is_active: vipLevel.is_active ? 1 : 0 });
    } else {
      setFormData({
        level: 1,
        name: "",
        min_wager: 0,
        bonus_percentage: 0,
        monthly_bonus: 0,
        is_active: 1,
      });
    }
  }, [vipLevel, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "name" ? value : Number(value) 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = vipLevel?.id 
        ? `${BACKEND_URL}/api/admin/vip/levels/${vipLevel.id}` 
        : `${BACKEND_URL}/api/admin/vip/levels`;
      const method = vipLevel?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save VIP level");
      }
    } catch (error) {
      console.error("Error saving VIP level:", error);
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
                {vipLevel ? "VIP 등급 수정" : "새 VIP 등급 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">레벨 (숫자)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">등급명</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">최소 배팅액</label>
                    <input
                      type="number"
                      className="form-control"
                      name="min_wager"
                      value={formData.min_wager}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">보너스 %</label>
                    <input
                      type="number"
                      className="form-control"
                      name="bonus_percentage"
                      value={formData.bonus_percentage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">월간 보너스</label>
                    <input
                      type="number"
                      className="form-control"
                      name="monthly_bonus"
                      value={formData.monthly_bonus}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
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
