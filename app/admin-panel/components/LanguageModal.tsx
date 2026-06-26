"use client";

import { useState, useEffect } from "react";

export interface Language {
  id?: number | string;
  code: string;
  name: string;
  is_active: number;
  is_default: number;
  sort_order: number;
}

interface LanguageModalProps {
  isOpen: boolean;
  language: Language | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function LanguageModal({ isOpen, language, onClose, onSave }: LanguageModalProps) {
  const [formData, setFormData] = useState<Language>({
    code: "",
    name: "",
    is_active: 1,
    is_default: 0,
    sort_order: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (language) {
      setFormData({ ...language });
    } else {
      setFormData({
        code: "",
        name: "",
        is_active: 1,
        is_default: 0,
        sort_order: 0,
      });
    }
  }, [language, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "is_active" || name === "is_default" || name === "sort_order" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const id = language?.id || 'new';
      const url = `${BACKEND_URL}/api/admin/languages/${id}`;
      const method = "PUT"; // Backend uses PUT for both new and update based on ID

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
        alert(data.message || "Failed to save language");
      }
    } catch (error) {
      console.error("Error saving language:", error);
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
              <h5 className="modal-title">{language ? "언어 수정" : "새 언어 추가"}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">언어 코드 (Code)</label>
                    <input type="text" className="form-control" name="code" value={formData.code} onChange={handleChange} required placeholder="예: ko, en, jp" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">언어 명칭 (Name)</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="예: 한국어, English" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">정렬 순서</label>
                    <input type="number" className="form-control" name="sort_order" value={formData.sort_order} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">기본 언어</label>
                    <select className="form-select" name="is_default" value={formData.is_default} onChange={handleChange}>
                      <option value={1}>예</option>
                      <option value={0}>아니오</option>
                    </select>
                  </div>
                  <div className="col-md-4">
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
