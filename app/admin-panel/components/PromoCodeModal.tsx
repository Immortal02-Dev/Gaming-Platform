"use client";

import { useState, useEffect } from "react";

interface PromoCode {
  id?: number;
  code: string;
  reward_type: string;
  reward_amount: number;
  max_uses: number | null;
  expires_at: string | null;
}

interface PromoCodeModalProps {
  isOpen: boolean;
  promoCode: PromoCode | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function PromoCodeModal({ isOpen, promoCode, onClose, onSave }: PromoCodeModalProps) {
  const [formData, setFormData] = useState<PromoCode>({
    code: "",
    reward_type: "cash",
    reward_amount: 0,
    max_uses: null,
    expires_at: null,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (promoCode) {
      setFormData({
        ...promoCode,
        expires_at: promoCode.expires_at ? new Date(promoCode.expires_at).toISOString().split('T')[0] : null,
      });
    } else {
      setFormData({
        code: "",
        reward_type: "cash",
        reward_amount: 0,
        max_uses: null,
        expires_at: null,
      });
    }
  }, [promoCode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "reward_amount" || name === "max_uses" ? (value ? Number(value) : null) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = promoCode?.id 
        ? `${BACKEND_URL}/api/admin/bonuses/promo-codes/${promoCode.id}` 
        : `${BACKEND_URL}/api/admin/bonuses/promo-codes`;
      const method = promoCode?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save promo code");
      }
    } catch (error) {
      console.error("Error saving promo code:", error);
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
                {promoCode ? "프로모션 코드 수정" : "새 프로모션 코드 생성"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">코드</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                      placeholder="예: WELCOME2024"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">보상 타입</label>
                    <select
                      className="form-select"
                      name="reward_type"
                      value={formData.reward_type}
                      onChange={handleChange}
                    >
                      <option value="cash">현금 (원)</option>
                      <option value="percentage">비율 (%)</option>
                      <option value="locked_bonus">잠금 보너스</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">보상 금액/비율</label>
                    <input
                      type="number"
                      className="form-control"
                      name="reward_amount"
                      value={formData.reward_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">최대 사용 횟수</label>
                    <input
                      type="number"
                      className="form-control"
                      name="max_uses"
                      value={formData.max_uses || ""}
                      onChange={handleChange}
                      placeholder="무제한 시 비움"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">만료일</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expires_at"
                      value={formData.expires_at || ""}
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
