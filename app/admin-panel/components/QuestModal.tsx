"use client";

import { useState, useEffect } from "react";

export interface Quest {
  id?: number;
  type: string;
  title: string;
  description: string;
  reward_amount: number;
  reward_currency: string;
  goal_value: number;
  is_active: number;
}

interface QuestModalProps {
  isOpen: boolean;
  quest: Quest | null;
  onClose: () => void;
  onSave: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function QuestModal({ isOpen, quest, onClose, onSave }: QuestModalProps) {
  const [formData, setFormData] = useState<Quest>({
    type: "daily",
    title: "",
    description: "",
    reward_amount: 0,
    reward_currency: "KRW",
    goal_value: 0,
    is_active: 1,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (quest) {
      setFormData({ ...quest });
    } else {
      setFormData({
        type: "daily",
        title: "",
        description: "",
        reward_amount: 0,
        reward_currency: "KRW",
        goal_value: 0,
        is_active: 1,
      });
    }
  }, [quest, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "reward_amount" || name === "goal_value" || name === "is_active" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = quest?.id 
        ? `${BACKEND_URL}/api/admin/quests/${quest.id}` 
        : `${BACKEND_URL}/api/admin/quests`;
      const method = quest?.id ? "PUT" : "POST";

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
        alert(data.message || "Failed to save quest");
      }
    } catch (error) {
      console.error("Error saving quest:", error);
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
                {quest ? "퀘스트 수정" : "새 퀘스트 추가"}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">퀘스트 타입</label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="daily">일일 퀘스트</option>
                      <option value="weekly">주간 퀘스트</option>
                      <option value="achievement">업적</option>
                      <option value="special">특별 이벤트</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">상태</label>
                    <select
                      className="form-select"
                      name="is_active"
                      value={formData.is_active}
                      onChange={handleChange}
                    >
                      <option value={1}>활성</option>
                      <option value={0}>비활성</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">퀘스트 제목</label>
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
                      rows={2}
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">보상 금액</label>
                    <input
                      type="number"
                      className="form-control"
                      name="reward_amount"
                      value={formData.reward_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">보상 통화</label>
                    <input
                      type="text"
                      className="form-control"
                      name="reward_currency"
                      value={formData.reward_currency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">목표 값</label>
                    <input
                      type="number"
                      className="form-control"
                      name="goal_value"
                      value={formData.goal_value}
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
