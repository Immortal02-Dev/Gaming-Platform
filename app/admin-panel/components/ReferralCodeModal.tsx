"use client";

import { useState, useEffect } from "react";

interface ReferralCode {
  id?: number;
  code: string;
  user_id: number;
}

interface ReferralCodeModalProps {
  isOpen: boolean;
  referralCode: ReferralCode | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function ReferralCodeModal({ isOpen, referralCode, onClose, onSave }: ReferralCodeModalProps) {
  const [formData, setFormData] = useState<ReferralCode>({
    code: "",
    user_id: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (referralCode) {
      setFormData({ ...referralCode });
    } else {
      setFormData({
        code: "",
        user_id: 0,
      });
    }
  }, [referralCode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "user_id" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = referralCode?.id 
        ? `${BACKEND_URL}/api/admin/referral/codes/${referralCode.id}` 
        : `${BACKEND_URL}/api/admin/referral/codes`;
      const method = referralCode?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save referral code");
      }
    } catch (error) {
      console.error("Error saving referral code:", error);
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
                {referralCode ? "추천 코드 수정" : "새 추천 코드 생성"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">회원 ID</label>
                    <input
                      type="number"
                      className="form-control"
                      name="user_id"
                      value={formData.user_id || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">코드</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                      placeholder="예: FRIEND2024"
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
