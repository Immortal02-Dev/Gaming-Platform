"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import VipLevelModal, { VipLevel } from "@/components/VipLevelModal";
import VipBenefitModal, { VipBenefit } from "@/components/VipBenefitModal";

const BACKEND_URL = ""; // Use relative path for proxy

export default function VipPage() {
  const [vipLevels, setVipLevels] = useState<VipLevel[]>([]);
  const [vipBenefits, setVipBenefits] = useState<VipBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"levels" | "benefits">("levels");

  // Modal states
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<VipLevel | null>(null);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<VipBenefit | null>(null);

  const fetchVipLevels = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/vip/levels`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setVipLevels(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch VIP levels:", error);
    }
  };

  const fetchVipBenefits = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/vip/benefits`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setVipBenefits(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch VIP benefits:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchVipLevels(), fetchVipBenefits()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLevelNew = () => {
    setSelectedLevel(null);
    setIsLevelModalOpen(true);
  };

  const handleLevelEdit = (level: VipLevel) => {
    setSelectedLevel(level);
    setIsLevelModalOpen(true);
  };

  const handleLevelDelete = async (id: number) => {
    if (!confirm("이 VIP 등급을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/vip/levels/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) fetchVipLevels();
    } catch (error) {
      console.error("Delete level failed", error);
    }
  };

  const handleBenefitNew = () => {
    setSelectedBenefit(null);
    setIsBenefitModalOpen(true);
  };

  const handleBenefitEdit = (benefit: VipBenefit) => {
    setSelectedBenefit(benefit);
    setIsBenefitModalOpen(true);
  };

  const handleBenefitDelete = async (id: number) => {
    if (!confirm("이 VIP 혜택을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/vip/benefits/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) fetchVipBenefits();
    } catch (error) {
      console.error("Delete benefit failed", error);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ko-KR");
  };

  const getLevelBadge = (level: number) => {
    const colors = [
      "bg-secondary",
      "bg-primary",
      "bg-info",
      "bg-success",
      "bg-warning",
      "bg-danger",
      "bg-dark",
    ];
    return colors[level % colors.length] || "bg-secondary";
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/vip">
          <i className="fa fa-crown me-2"></i>VIP 관리
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "levels" ? "active" : ""}`}
                onClick={() => setActiveTab("levels")}
              >
                VIP 등급
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "benefits" ? "active" : ""}`}
                onClick={() => setActiveTab("benefits")}
              >
                VIP 혜택
              </button>
            </li>
          </ul>

          {loading ? (
            <div className="text-center p-4">
              <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
            </div>
          ) : (
            <>
              {activeTab === "levels" && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">VIP 등급 관리</h5>
                    <button className="btn btn-primary btn-sm" onClick={handleLevelNew}>
                      <i className="fa fa-plus me-1"></i>새 등급 추가
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                          <tr>
                            <th>등급</th>
                            <th>등급명</th>
                            <th>최소 배팅액</th>
                            <th>보너스 %</th>
                            <th>월간 보너스</th>
                            <th>상태</th>
                            <th>생성일</th>
                            <th>관리</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vipLevels.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="text-center p-4">
                                VIP 등급이 없습니다.
                              </td>
                            </tr>
                          ) : (
                            vipLevels.map((level) => (
                              <tr key={level.id}>
                                <td>
                                  <span
                                    className={`badge ${getLevelBadge(level.level)}`}
                                  >
                                    LV.{level.level}
                                  </span>
                                </td>
                                <td>{level.name}</td>
                                <td>{formatNumber(level.min_wager)}원</td>
                                <td>{level.bonus_percentage}%</td>
                                <td>{formatNumber(level.monthly_bonus)}원</td>
                                <td>
                                  <span
                                    className={`badge ${level.is_active ? "bg-success" : "bg-secondary"}`}
                                  >
                                    {level.is_active ? "활성" : "비활성"}
                                  </span>
                                </td>
                                <td>{level.created_at ? formatDate(level.created_at) : "-"}</td>
                                <td>
                                  <div className="btn-group btn-group-sm">
                                    <button className="btn btn-outline-primary" onClick={() => handleLevelEdit(level)}>
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => level.id && handleLevelDelete(level.id)}>
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

              {activeTab === "benefits" && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">VIP 혜택 관리</h5>
                    <button className="btn btn-primary btn-sm" onClick={handleBenefitNew}>
                      <i className="fa fa-plus me-1"></i>새 혜택 추가
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                          <tr>
                            <th>ID</th>
                            <th>등급 ID</th>
                            <th>혜택 명칭</th>
                            <th>이미지 URL</th>
                            <th>설명</th>
                            <th>상태</th>
                            <th>관리</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vipBenefits.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center p-4">
                                VIP 혜택이 없습니다.
                              </td>
                            </tr>
                          ) : (
                            vipBenefits.map((benefit) => (
                              <tr key={benefit.id}>
                                <td>{benefit.id}</td>
                                <td>
                                  <span
                                    className={`badge ${getLevelBadge(benefit.level_id)}`}
                                  >
                                    LV.{benefit.level_id}
                                  </span>
                                </td>
                                <td>{benefit.title}</td>
                                <td className="text-truncate" style={{maxWidth: '150px'}} title={benefit.image_url}>{benefit.image_url}</td>
                                <td className="text-start">
                                  {benefit.description}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${benefit.is_active ? "bg-success" : "bg-secondary"}`}
                                  >
                                    {benefit.is_active ? "활성" : "비활성"}
                                  </span>
                                </td>
                                <td>
                                  <div className="btn-group btn-group-sm">
                                    <button className="btn btn-outline-primary" onClick={() => handleBenefitEdit(benefit)}>
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => benefit.id && handleBenefitDelete(benefit.id)}>
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

      <VipLevelModal 
        isOpen={isLevelModalOpen}
        vipLevel={selectedLevel}
        onClose={() => setIsLevelModalOpen(false)}
        onSave={fetchVipLevels}
      />

      <VipBenefitModal 
        isOpen={isBenefitModalOpen}
        benefit={selectedBenefit}
        onClose={() => setIsBenefitModalOpen(false)}
        onSave={fetchVipBenefits}
      />
    </Layout>
  );
}
