"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import QuestModal from "@/components/QuestModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface QuestItem {
  id: number;
  type: string;
  title: string;
  description: string;
  reward_amount: number;
  reward_currency: string;
  goal_value: number;
  is_active: number;
  created_at: string;
}

export default function QuestPage() {
  const [quests, setQuests] = useState<QuestItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestItem | null>(null);

  const fetchQuests = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/quests`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setQuests(data.data || []);
      }
    } catch (error) {
      console.error("Quest load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleNew = () => {
    setSelectedQuest(null);
    setIsModalOpen(true);
  };

  const handleEdit = (quest: QuestItem) => {
    setSelectedQuest(quest);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 퀘스트를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/quests/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchQuests();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("ko-KR").format(value);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/quest">
          <i className="fa fa-map-signs me-2"></i>퀘스트 관리
        </a>
        <small></small>
      </h1>

      {loading ? (
        <div className="text-center p-4">
          <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
        </div>
      ) : (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">퀘스트 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 퀘스트 추가
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>ID</th>
                <th>타입</th>
                <th>제목</th>
                <th>보상</th>
                <th>목표 값</th>
                <th>상태</th>
                <th>생성일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {quests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    퀘스트가 없습니다.
                  </td>
                </tr>
              ) : (
                quests.map((quest) => (
                  <tr key={quest.id}>
                    <td>{quest.id}</td>
                    <td>{quest.type}</td>
                    <td className="text-start">{quest.title}</td>
                    <td>
                      {formatNumber(quest.reward_amount)}{" "}
                      {quest.reward_currency}
                    </td>
                    <td>{formatNumber(quest.goal_value)}</td>
                    <td>
                      <span
                        className={`badge ${quest.is_active ? "bg-success" : "bg-secondary"}`}
                      >
                        {quest.is_active ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td>
                      {new Date(quest.created_at).toLocaleString("ko-KR")}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" onClick={() => handleEdit(quest)}>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(quest.id)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      )}

      <QuestModal 
        isOpen={isModalOpen}
        quest={selectedQuest}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchQuests}
      />
    </Layout>
  );
}
