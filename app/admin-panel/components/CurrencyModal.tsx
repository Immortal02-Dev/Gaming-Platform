"use client";

import { useState, useEffect } from "react";

export interface Currency {
  id?: number;
  symbol: string;
  name: string;
  type: string;
  icon_url: string;
  network: string;
  is_enabled: number;
  sort_order: number;
}

interface CurrencyModalProps {
  isOpen: boolean;
  currency: Currency | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function CurrencyModal({ isOpen, currency, onClose, onSave }: CurrencyModalProps) {
  const [formData, setFormData] = useState<Currency>({
    symbol: "",
    name: "",
    type: "crypto",
    icon_url: "",
    network: "",
    is_enabled: 1,
    sort_order: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currency) {
      setFormData({ ...currency });
    } else {
      setFormData({
        symbol: "",
        name: "",
        type: "crypto",
        icon_url: "",
        network: "",
        is_enabled: 1,
        sort_order: 0,
      });
    }
  }, [currency, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "is_enabled" || name === "sort_order" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = currency?.id 
        ? `${BACKEND_URL}/api/admin/currencies/${currency.id}` 
        : `${BACKEND_URL}/api/admin/currencies`;
      const method = currency?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save currency");
      }
    } catch (error) {
      console.error("Error saving currency:", error);
      alert("An error occurred while saving");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: "block", zIndex: 1060 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">{currency ? "통화 수정" : "새 통화 추가"}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">심볼 (Symbol)</label>
                    <input type="text" className="form-control" name="symbol" value={formData.symbol} onChange={handleChange} required placeholder="예: BTC" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">이름 (Name)</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="예: Bitcoin" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">타입</label>
                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                      <option value="crypto">암호화폐</option>
                      <option value="fiat">법정화폐</option>
                      <option value="token">토큰</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">네트워크</label>
                    <input type="text" className="form-control" name="network" value={formData.network} onChange={handleChange} placeholder="예: ERC20, Mainnet" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">아이콘 URL</label>
                    <input type="text" className="form-control" name="icon_url" value={formData.icon_url} onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">정렬 순서</label>
                    <input type="number" className="form-control" name="sort_order" value={formData.sort_order} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">상태</label>
                    <select className="form-select" name="is_enabled" value={formData.is_enabled} onChange={handleChange}>
                      <option value={1}>활성</option>
                      <option value={0}>비활성</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>취소</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting && <i className="fa fa-spinner fa-spin me-1"></i>} 저장하기
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
