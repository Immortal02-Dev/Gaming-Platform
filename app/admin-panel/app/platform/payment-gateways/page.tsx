"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PaymentGatewayModal, { PaymentGateway } from "@/components/PaymentGatewayModal";

const BACKEND_URL = ""; // Use relative path for proxy

export default function PaymentGatewaysPage() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);

  const fetchGateways = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/platform/payment-gateways`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setGateways(data.data || []);
      }
    } catch (error) {
      console.error("Payment gateways load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  const handleEdit = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway);
    setIsModalOpen(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/payment-gateways">
          <i className="fa fa-credit-card me-2"></i>결제 게이트웨이 관리 (Gateways)
        </a>
        <small>충전/환전 연동 결제 대행사 설정</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">게이트웨이 목록</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center p-4">
              <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle text-center fw-bold">
                <thead className="table-light">
                  <tr>
                    <th>제공자</th>
                    <th>자동 승인</th>
                    <th>환경</th>
                    <th>한도 (최소~최대)</th>
                    <th>수수료</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {gateways.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-muted">등록된 게이트웨이가 없습니다.</td>
                    </tr>
                  ) : (
                    gateways.map((g) => (
                      <tr key={g.id}>
                        <td className="text-start">{g.provider_name}</td>
                        <td>
                          <span className={`badge ${g.auto_process ? 'bg-success' : 'bg-warning'}`}>
                            {g.auto_process ? '자동' : '수동'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${g.is_sandbox ? 'bg-warning' : 'bg-danger'}`}>
                            {g.is_sandbox ? 'SANDBOX' : 'PRODUCTION'}
                          </span>
                        </td>
                        <td>
                          {formatNumber(g.min_limit)} ~ {formatNumber(g.max_limit)}
                        </td>
                        <td>{g.fee_percentage}%</td>
                        <td>
                          <span className={`badge ${g.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {g.is_active ? '활성' : '비활성'}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(g)}>
                            <i className="fa fa-edit me-1"></i>설정
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PaymentGatewayModal 
        isOpen={isModalOpen}
        gateway={selectedGateway}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchGateways}
      />
    </Layout>
  );
}
