"use client";

import { useState, useEffect } from "react";

interface SwapRate {
  id?: number;
  from_currency: string;
  to_currency: string;
  rate: number;
  fee_percent: number;
  min_amount: number;
  max_amount: number;
}

interface SwapModalProps {
  isOpen: boolean;
  rate: SwapRate | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function SwapModal({ isOpen, rate, onClose, onSave }: SwapModalProps) {
  const [formData, setFormData] = useState<SwapRate>({
    from_currency: "",
    to_currency: "",
    rate: 1,
    fee_percent: 0,
    min_amount: 0,
    max_amount: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (rate) {
      setFormData({ ...rate });
    } else {
      setFormData({
        from_currency: "",
        to_currency: "",
        rate: 1,
        fee_percent: 0,
        min_amount: 0,
        max_amount: 0,
      });
    }
  }, [rate, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "from_currency" || name === "to_currency" ? value : Number(value) 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = rate?.id 
        ? `${BACKEND_URL}/api/admin/swap-rates/${rate.id}` 
        : `${BACKEND_URL}/api/admin/swap-rates`;
      const method = rate?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save swap rate");
      }
    } catch (error) {
      console.error("Error saving swap rate:", error);
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
                {rate ? "스왑 환율 수정" : "새 환율 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">From (통화)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="from_currency"
                      value={formData.from_currency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">To (통화)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="to_currency"
                      value={formData.to_currency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">환율</label>
                    <input
                      type="number"
                      step="0.000001"
                      className="form-control"
                      name="rate"
                      value={formData.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">수수료 (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="fee_percent"
                      value={formData.fee_percent}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">최소 금액</label>
                    <input
                      type="number"
                      className="form-control"
                      name="min_amount"
                      value={formData.min_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">최대 금액</label>
                    <input
                      type="number"
                      className="form-control"
                      name="max_amount"
                      value={formData.max_amount}
                      onChange={handleChange}
                      required
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
