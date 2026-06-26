"use client";

import { useState, useEffect } from "react";

export interface PaymentGateway {
  id?: number;
  provider_name: string;
  is_active: number;
  auto_process: number;
  api_key?: string;
  api_secret?: string;
  is_sandbox: number;
  min_limit: number;
  max_limit: number;
  fee_percentage: number;
  supported_currencies: string[];
}

interface PaymentGatewayModalProps {
  isOpen: boolean;
  gateway: PaymentGateway | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function PaymentGatewayModal({ isOpen, gateway, onClose, onSave }: PaymentGatewayModalProps) {
  const [formData, setFormData] = useState<PaymentGateway>({
    provider_name: "",
    is_active: 1,
    auto_process: 1,
    api_key: "",
    api_secret: "",
    is_sandbox: 0,
    min_limit: 10000,
    max_limit: 1000000,
    fee_percentage: 0,
    supported_currencies: ["KRW"],
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (gateway) {
      setFormData({ 
        ...gateway,
        api_key: "", // Clear for security
        api_secret: "",
        supported_currencies: typeof gateway.supported_currencies === 'string' 
          ? JSON.parse(gateway.supported_currencies) 
          : (gateway.supported_currencies || ["KRW"])
      });
    }
  }, [gateway, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: ["is_active", "auto_process", "is_sandbox", "min_limit", "max_limit", "fee_percentage"].includes(name) 
        ? Number(value) 
        : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = `${BACKEND_URL}/api/admin/platform/payment-gateways/${gateway?.id}`;
      const method = "PUT";

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
        alert(data.message || "Failed to save gateway");
      }
    } catch (error) {
      console.error("Error saving gateway:", error);
      alert("An error occurred while saving");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: "block", zIndex: 1060 }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">결제 게이트웨이 설정: {gateway?.provider_name}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">자동 승인 (Auto Process)</label>
                    <select className="form-select" name="auto_process" value={formData.auto_process} onChange={handleChange}>
                      <option value={1}>사용</option>
                      <option value={0}>미사용 (수동 승인)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">테스트 모드 (Sandbox)</label>
                    <select className="form-select" name="is_sandbox" value={formData.is_sandbox} onChange={handleChange}>
                      <option value={1}>On</option>
                      <option value={0}>Off (Production)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">API Key</label>
                    <input type="text" className="form-control" name="api_key" value={formData.api_key} onChange={handleChange} placeholder="변경 시에만 입력" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">API Secret</label>
                    <input type="text" className="form-control" name="api_secret" value={formData.api_secret} onChange={handleChange} placeholder="변경 시에만 입력" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">최소 금액</label>
                    <input type="number" className="form-control" name="min_limit" value={formData.min_limit} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">최대 금액</label>
                    <input type="number" className="form-control" name="max_limit" value={formData.max_limit} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">수수료 (%)</label>
                    <input type="number" step="0.1" className="form-control" name="fee_percentage" value={formData.fee_percentage} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">상태</label>
                    <select className="form-select" name="is_active" value={formData.is_active} onChange={handleChange}>
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
