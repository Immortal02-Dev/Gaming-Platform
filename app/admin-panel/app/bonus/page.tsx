"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PromoCodeModal from "@/components/PromoCodeModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface BonusStats {
  total_claimed: number;
  total_vip_bonus: number;
  total_locked_bonus: number;
  users_with_bonus: number;
}

interface PromoCode {
  id: number;
  code: string;
  reward_type: string;
  reward_amount: number;
  max_uses: number;
  used_count: number;
  expires_at: string;
  created_at: string;
}

export default function BonusPage() {
  const [bonusStats, setBonusStats] = useState<BonusStats | null>(null);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "promo">("stats");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<PromoCode | null>(null);

  const fetchBonusStats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/bonuses/stats`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBonusStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bonus stats:", error);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/bonuses/promo-codes`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setPromoCodes(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch promo codes:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchBonusStats(), fetchPromoCodes()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleNew = () => {
    setSelectedCode(null);
    setIsModalOpen(true);
  };

  const handleEdit = (code: PromoCode) => {
    setSelectedCode(code);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 프로모션 코드를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/bonuses/promo-codes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchPromoCodes();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/bonus">
          <i className="fa fa-gift me-2"></i>보너스 관리
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "stats" ? "active" : ""}`}
                onClick={() => setActiveTab("stats")}
              >
                보너스 통계
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "promo" ? "active" : ""}`}
                onClick={() => setActiveTab("promo")}
              >
                프로모션 코드
              </button>
            </li>
          </ul>

          {loading ? (
            <div className="text-center p-4">
              <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
            </div>
          ) : (
            <>
              {activeTab === "stats" && (
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="fa fa-coins me-2"></i>총 지급 보너스
                        </h5>
                        <h3>{formatNumber(bonusStats?.total_claimed || 0)}원</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="fa fa-crown me-2"></i>VIP 보너스
                        </h5>
                        <h3>{formatNumber(bonusStats?.total_vip_bonus || 0)}원</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-warning text-white">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="fa fa-lock me-2"></i>잠금 보너스
                        </h5>
                        <h3>{formatNumber(bonusStats?.total_locked_bonus || 0)}원</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-info text-white">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="fa fa-users me-2"></i>보너스 사용자
                        </h5>
                        <h3>{formatNumber(bonusStats?.users_with_bonus || 0)}명</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "promo" && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">프로모션 코드 관리</h5>
                    <button className="btn btn-primary btn-sm" onClick={handleNew}>
                      <i className="fa fa-plus me-1"></i>새 코드 생성
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                          <tr>
                            <th>ID</th>
                            <th>코드</th>
                            <th>보상 타입</th>
                            <th>보상 금액</th>
                            <th>최대 사용</th>
                            <th>사용 횟수</th>
                            <th>만료일</th>
                            <th>생성일</th>
                            <th>관리</th>
                          </tr>
                        </thead>
                        <tbody>
                          {promoCodes.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="text-center p-4">
                                프로모션 코드가 없습니다.
                              </td>
                            </tr>
                          ) : (
                            promoCodes.map((code) => (
                              <tr key={code.id}>
                                <td>{code.id}</td>
                                <td>
                                  <code className="bg-light px-2 py-1 rounded">
                                    {code.code}
                                  </code>
                                </td>
                                <td>{code.reward_type}</td>
                                <td>{formatNumber(code.reward_amount)}</td>
                                <td>{code.max_uses || "무제한"}</td>
                                <td>{code.used_count || 0}</td>
                                <td>{code.expires_at ? formatDate(code.expires_at) : "무제한"}</td>
                                <td>{formatDate(code.created_at)}</td>
                                <td>
                                  <div className="btn-group btn-group-sm">
                                    <button className="btn btn-outline-primary" onClick={() => handleEdit(code)}>
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(code.id)}>
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
            </>
          )}
        </div>
      </div>

      <PromoCodeModal 
        isOpen={isModalOpen}
        promoCode={selectedCode}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchPromoCodes}
      />
    </Layout>
  );
}
