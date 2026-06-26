"use client";

import { useState, useEffect } from "react";

export interface ApiKey {
  id?: number;
  provider_name: string;
  provider_type: string;
  api_key?: string;
  api_secret?: string;
  environment: string;
  is_active: number;
  last_used?: string;
  created_at?: string;
}

interface ApiKeyModalProps {
  isOpen: boolean;
  apiKey: ApiKey | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function ApiKeyModal({ isOpen, apiKey, onClose, onSave }: ApiKeyModalProps) {
  const [formData, setFormData] = useState<ApiKey>({
    provider_name: "",
    provider_type: "game_provider",
    api_key: "",
    api_secret: "",
    environment: "production",
    is_active: 1,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setFormData({ 
        ...apiKey,
        api_key: "", // Clear sensitive fields for security
        api_secret: ""
      });
    } else {
      setFormData({
        provider_name: "",
        provider_type: "game_provider",
        api_key: "",
        api_secret: "",
        environment: "production",
        is_active: 1,
      });
    }
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "is_active" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = `${BACKEND_URL}/api/admin/platform/api-keys`;
      const method = "POST"; // Backend uses POST for update based on provider_name

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
        alert(data.message || "Failed to save API key");
      }
    } catch (error) {
      console.error("Error saving API key:", error);
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
              <h5 className="modal-title">{apiKey ? "API 설정 수정" : "새 API 설정 추가"}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">제공자 이름 (Provider Name)</label>
                    <input type="text" className="form-control" name="provider_name" value={formData.provider_name} onChange={handleChange} required placeholder="예: Evolution, Pragmatic, Telegram" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">제공자 타입</label>
                    <select className="form-select" name="provider_type" value={formData.provider_type} onChange={handleChange}>
                      <option value="game_provider">게임 공급자</option>
                      <option value="payment_gateway">결제 게이트웨이</option>
                      <option value="social_login">소셜 로그인</option>
                      <option value="bot">봇/자동화</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">환경</label>
                    <select className="form-select" name="environment" value={formData.environment} onChange={handleChange}>
                      <option value="production">운영 (Production)</option>
                      <option value="sandbox">테스트 (Sandbox)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">API Key</label>
                    <input type="text" className="form-control" name="api_key" value={formData.api_key} onChange={handleChange} placeholder={apiKey ? "변경 시에만 입력" : "API Key 입력"} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">API Secret / Hash</label>
                    <input type="text" className="form-control" name="api_secret" value={formData.api_secret} onChange={handleChange} placeholder={apiKey ? "변경 시에만 입력" : "Secret 입력"} />
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
