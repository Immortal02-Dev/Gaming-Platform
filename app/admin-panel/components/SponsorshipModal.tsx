"use client";

import { useState, useEffect } from "react";

export interface Sponsorship {
  id?: number;
  partner_name: string;
  title: string;
  logo_url: string | null;
  banner_url: string | null;
  description: string;
}

interface SponsorshipModalProps {
  isOpen: boolean;
  sponsorship: Sponsorship | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function SponsorshipModal({ isOpen, sponsorship, onClose, onSave }: SponsorshipModalProps) {
  const [formData, setFormData] = useState<Sponsorship>({
    partner_name: "",
    title: "",
    logo_url: "",
    banner_url: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sponsorship) {
      setFormData({ 
        ...sponsorship,
        logo_url: sponsorship.logo_url || "",
        banner_url: sponsorship.banner_url || ""
      });
    } else {
      setFormData({
        partner_name: "",
        title: "",
        logo_url: "",
        banner_url: "",
        description: "",
      });
    }
  }, [sponsorship, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = sponsorship?.id 
        ? `${BACKEND_URL}/api/admin/sponsorships/${sponsorship.id}` 
        : `${BACKEND_URL}/api/admin/sponsorships`;
      const method = sponsorship?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save sponsorship");
      }
    } catch (error) {
      console.error("Error saving sponsorship:", error);
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
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                {sponsorship ? "스폰서십 수정" : "새 스폰서십 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">파트너 이름</label>
                    <input
                      type="text"
                      className="form-control"
                      name="partner_name"
                      value={formData.partner_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">제목</label>
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
                    <label className="form-label fw-bold">설명</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">로고 URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="logo_url"
                      value={formData.logo_url || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">배너 URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="banner_url"
                      value={formData.banner_url || ""}
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
