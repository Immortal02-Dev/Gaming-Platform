"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import LotteryDrawModal from "@/components/LotteryDrawModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface LotteryDraw {
  id: number;
  draw_number: string;
  status: string;
  draw_date: string;
  winning_numbers: string;
  prize_amount: number;
  total_tickets: number;
  created_at: string;
}

export default function LotteryPage() {
  const [lotteryDraws, setLotteryDraws] = useState<LotteryDraw[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDraw, setSelectedDraw] = useState<LotteryDraw | null>(null);

  const fetchLotteryDraws = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/lottery/draws`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setLotteryDraws(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch lottery draws:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotteryDraws();
  }, []);

  const handleNew = () => {
    setSelectedDraw(null);
    setIsModalOpen(true);
  };

  const handleEdit = (draw: LotteryDraw) => {
    setSelectedDraw(draw);
    setIsModalOpen(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { text: string; class: string } } = {
      'pending': { text: '대기중', class: 'badge bg-warning' },
      'active': { text: '진행중', class: 'badge bg-success' },
      'completed': { text: '완료', class: 'badge bg-primary' },
      'cancelled': { text: '취소', class: 'badge bg-danger' }
    };
    return statusMap[status] || { text: status, class: 'badge bg-secondary' };
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/lottery">
          <i className="fa fa-ticket-alt me-2"></i>로또 관리
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">로또 회차 관리</h5>
              <button className="btn btn-primary btn-sm" onClick={handleNew}>
                <i className="fa fa-plus me-1"></i>새 회차 생성
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
                        <th>회차</th>
                        <th>상태</th>
                        <th>추첨일</th>
                        <th>당첨번호</th>
                        <th>총 판매량</th>
                        <th>당첨금</th>
                        <th>생성일</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lotteryDraws.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center p-4">
                            로또 회차가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        lotteryDraws.map((draw) => {
                          const statusBadge = getStatusBadge(draw.status);
                          return (
                            <tr key={draw.id}>
                              <td>{draw.draw_number}</td>
                              <td>
                                <span className={statusBadge.class}>
                                  {statusBadge.text}
                                </span>
                              </td>
                              <td>{draw.draw_date ? formatDate(draw.draw_date) : '-'}</td>
                              <td>
                                {draw.winning_numbers ? (
                                  <code className="bg-light px-2 py-1 rounded">
                                    {draw.winning_numbers}
                                  </code>
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>{formatNumber(draw.total_tickets || 0)}</td>
                              <td>{formatNumber(draw.prize_amount || 0)}원</td>
                              <td>{formatDate(draw.created_at)}</td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button className="btn btn-outline-primary" onClick={() => handleEdit(draw)}>
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  {draw.status === 'pending' && (
                                    <button className="btn btn-outline-success">
                                      <i className="fa fa-play"></i>
                                    </button>
                                  )}
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

      <LotteryDrawModal 
        isOpen={isModalOpen}
        draw={selectedDraw}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchLotteryDraws}
      />
    </Layout>
  );
}
