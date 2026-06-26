"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PromotionModal from "@/components/PromotionModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface Promotion {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  category: string;
  status: string;
  type: string;
  ends_at: string;
  created_at: string;
}

export default function PromotionPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const fetchPromotions = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/promotions`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setPromotions(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { text: string; class: string } } = {
      'active': { text: '활성', class: 'badge bg-success' },
      'inactive': { text: '비활성', class: 'badge bg-secondary' },
      'draft': { text: '임시저장', class: 'badge bg-warning' },
      'expired': { text: '만료', class: 'badge bg-danger' }
    };
    return statusMap[status] || { text: status, class: 'badge bg-secondary' };
  };

  const getTypeBadge = (type: string) => {
    const typeMap: { [key: string]: { text: string; class: string } } = {
      'banner': { text: '배너', class: 'badge bg-primary' },
      'popup': { text: '팝업', class: 'badge bg-info' },
      'event': { text: '이벤트', class: 'badge bg-success' },
      'notice': { text: '공지', class: 'badge bg-warning' }
    };
    return typeMap[type] || { text: type, class: 'badge bg-secondary' };
  };

  const handleNew = () => {
    setSelectedPromotion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (promo: Promotion) => {
    setSelectedPromotion(promo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말로 이 프로모션을 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/promotions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchPromotions();
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting promotion:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/promotion">
          <i className="fa fa-bullhorn me-2"></i>프로모션 관리
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">프로모션 목록</h5>
              <button className="btn btn-primary btn-sm" onClick={handleNew}>
                <i className="fa fa-plus me-1"></i>새 프로모션
              </button>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center p-4">
                  <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th>ID</th>
                        <th>제목</th>
                        <th>카테고리</th>
                        <th>타입</th>
                        <th>상태</th>
                        <th>종료일</th>
                        <th>생성일</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promotions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center p-4">
                            프로모션이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        promotions.map((promo) => {
                          const statusBadge = getStatusBadge(promo.status);
                          const typeBadge = getTypeBadge(promo.type);
                          return (
                            <tr key={promo.id}>
                              <td>{promo.id}</td>
                              <td className="text-start">
                                <div>
                                  <strong>{promo.title}</strong>
                                  {promo.description && (
                                    <div className="text-muted small mt-1">
                                      {promo.description.length > 50
                                        ? `${promo.description.substring(0, 50)}...`
                                        : promo.description}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>{promo.category}</td>
                              <td>
                                <span className={typeBadge.class}>
                                  {typeBadge.text}
                                </span>
                              </td>
                              <td>
                                <span className={statusBadge.class}>
                                  {statusBadge.text}
                                </span>
                              </td>
                              <td>{promo.ends_at ? formatDate(promo.ends_at) : '-'}</td>
                              <td>{formatDate(promo.created_at)}</td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => handleEdit(promo)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  <button 
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(promo.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PromotionModal 
        isOpen={isModalOpen}
        promotion={selectedPromotion}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchPromotions}
      />
    </Layout>
  );
}
