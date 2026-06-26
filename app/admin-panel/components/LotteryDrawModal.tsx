"use client";

import { useState, useEffect } from "react";

interface LotteryDraw {
  id?: number;
  draw_number: string;
  status: string;
  draw_date: string;
  winning_numbers: string;
  prize_amount: number;
}

interface LotteryDrawModalProps {
  isOpen: boolean;
  draw: LotteryDraw | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function LotteryDrawModal({ isOpen, draw, onClose, onSave }: LotteryDrawModalProps) {
  const [formData, setFormData] = useState<LotteryDraw>({
    draw_number: "",
    status: "pending",
    draw_date: "",
    winning_numbers: "",
    prize_amount: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (draw) {
      setFormData({ 
        ...draw,
        draw_date: draw.draw_date ? new Date(draw.draw_date).toISOString().split('T')[0] : ""
      });
    } else {
      setFormData({
        draw_number: "",
        status: "pending",
        draw_date: "",
        winning_numbers: "",
        prize_amount: 0,
      });
    }
  }, [draw, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "prize_amount" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = draw?.id 
        ? `${BACKEND_URL}/api/admin/lottery/draws/${draw.id}` 
        : `${BACKEND_URL}/api/admin/lottery/draws`;
      const method = draw?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save lottery draw");
      }
    } catch (error) {
      console.error("Error saving lottery draw:", error);
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
                {draw ? "로또 회차 수정" : "새 회차 생성"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">회차 번호</label>
                    <input
                      type="text"
                      className="form-control"
                      name="draw_number"
                      value={formData.draw_number}
                      onChange={handleChange}
                      required
                      placeholder="예: 1024"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">상태</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="pending">대기중</option>
                      <option value="active">진행중</option>
                      <option value="completed">완료</option>
                      <option value="cancelled">취소</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">추첨일</label>
                    <input
                      type="date"
                      className="form-control"
                      name="draw_date"
                      value={formData.draw_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">당첨금</label>
                    <input
                      type="number"
                      className="form-control"
                      name="prize_amount"
                      value={formData.prize_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">당첨 번호 (콤마 구분)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="winning_numbers"
                      value={formData.winning_numbers}
                      onChange={handleChange}
                      placeholder="예: 1, 5, 12, 24, 33, 45"
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
