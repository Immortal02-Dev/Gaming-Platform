"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface VaultStats {
  total_users: number;
  total_tvl: number;
  total_return_paid: number;
  vault_apr: string;
  recent_transfers: any[];
}

export default function VaultPage() {
  const [stats, setStats] = useState<VaultStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/vault/overview`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Vault stats load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("ko-KR");
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/vault">
          <i className="fa fa-safe me-2"></i>금고(Vault) Oversight
        </a>
        <small>사용자 금고 현황 및 트랜잭션</small>
      </h1>

      {loading ? (
        <div className="text-center p-5">
          <i className="fa fa-spinner fa-spin fa-3x text-primary"></i>
          <p className="mt-3">데이터를 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-indigo text-white mb-4 shadow-sm border-0 overflow-hidden">
                <div className="card-body position-relative">
                  <div className="position-absolute end-0 top-0 p-3 opacity-25">
                    <i className="fa fa-users fa-4x"></i>
                  </div>
                  <p className="text-white-50 mb-1 fw-bold text-uppercase">금고 이용자</p>
                  <h2 className="mb-0">{formatNumber(stats?.total_users || 0)}명</h2>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-blue text-white mb-4 shadow-sm border-0 overflow-hidden">
                <div className="card-body position-relative">
                  <div className="position-absolute end-0 top-0 p-3 opacity-25">
                    <i className="fa fa-piggy-bank fa-4x"></i>
                  </div>
                  <p className="text-white-50 mb-1 fw-bold text-uppercase">총 예치금 (TVL)</p>
                  <h2 className="mb-0">{formatNumber(stats?.total_tvl || 0)}원</h2>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-teal text-white mb-4 shadow-sm border-0 overflow-hidden">
                <div className="card-body position-relative">
                  <div className="position-absolute end-0 top-0 p-3 opacity-25">
                    <i className="fa fa-chart-line fa-4x"></i>
                  </div>
                  <p className="text-white-50 mb-1 fw-bold text-uppercase">지급된 총 수익</p>
                  <h2 className="mb-0">{formatNumber(stats?.total_return_paid || 0)}원</h2>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-orange text-white mb-4 shadow-sm border-0 overflow-hidden">
                <div className="card-body position-relative">
                  <div className="position-absolute end-0 top-0 p-3 opacity-25">
                    <i className="fa fa-percent fa-4x"></i>
                  </div>
                  <p className="text-white-50 mb-1 fw-bold text-uppercase">현재 APR</p>
                  <h2 className="mb-0">{stats?.vault_apr}%</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="fa fa-list me-2"></i>최근 금고 입출금 내역</h5>
              <button className="btn btn-sm btn-outline-light" onClick={fetchStats}>
                <i className="fa fa-sync me-1"></i>새로고침
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-center fw-bold">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>회원</th>
                      <th>유형</th>
                      <th>금액</th>
                      <th>설명</th>
                      <th>날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recent_transfers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-muted">최근 내역이 없습니다.</td>
                      </tr>
                    ) : (
                      stats?.recent_transfers.map((tx) => (
                        <tr key={tx.id}>
                          <td>{tx.id}</td>
                          <td>{tx.username}</td>
                          <td>
                            <span className={`badge ${tx.type === 'vault_in' ? 'bg-success' : 'bg-danger'}`}>
                              {tx.type === 'vault_in' ? '입금' : '출금'}
                            </span>
                          </td>
                          <td className={tx.type === 'vault_in' ? 'text-success' : 'text-danger'}>
                            {tx.type === 'vault_in' ? '+' : '-'}{formatNumber(tx.amount)}원
                          </td>
                          <td className="text-start">{tx.description}</td>
                          <td className="text-muted small">{formatDate(tx.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
