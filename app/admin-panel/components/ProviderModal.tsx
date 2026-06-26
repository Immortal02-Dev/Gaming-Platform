"use client";

import { useState, useEffect } from "react";

export interface Provider {
  id?: number;
  name: string;
  logo: string | null;
  is_maintenance: number;
}

interface ProviderModalProps {
  isOpen: boolean;
  provider: Provider | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function ProviderModal({ isOpen, provider, onClose, onSave }: ProviderModalProps) {
  const [formData, setFormData] = useState<Provider>({
    name: "",
    logo: "",
    is_maintenance: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (provider) {
      setFormData({ 
        ...provider,
        logo: provider.logo || "" 
      });
    } else {
      setFormData({
        name: "",
        logo: "",
        is_maintenance: 0,
      });
    }
  }, [provider, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "is_maintenance" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = provider?.id 
        ? `${BACKEND_URL}/api/admin/providers/${provider.id}` 
        : `${BACKEND_URL}/api/admin/providers`;
      const method = provider?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save provider");
      }
    } catch (error) {
      console.error("Error saving provider:", error);
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
                {provider ? "공급자 수정" : "새 공급자 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">공급자 이름</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">로고 URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="logo"
                      value={formData.logo || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">상태 (점검 모드)</label>
                    <select
                      className="form-select"
                      name="is_maintenance"
                      value={formData.is_maintenance}
                      onChange={handleChange}
                    >
                      <option value={0}>정상 (활성)</option>
                      <option value={1}>점검 중 (비활성)</option>
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
