"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SwapModal from "@/components/SwapModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface SwapRate {
  id: number;
  from_currency: string;
  to_currency: string;
  rate: number;
  fee_percent: number;
  min_amount: number;
  max_amount: number;
}

export default function SwapPage() {
  const [rates, setRates] = useState<SwapRate[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<SwapRate | null>(null);

  const fetchRates = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/swap-rates`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setRates(data.data || []);
      }
    } catch (error) {
      console.error("Swap rate load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleNew = () => {
    setSelectedRate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (rate: SwapRate) => {
    setSelectedRate(rate);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 스왑 환율을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/swap-rates/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchRates();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/swap">
          <i className="fa fa-exchange-alt me-2"></i>스왑 관리
        </a>
        <small></small>
      </h1>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">스왑 환율 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 환율 추가
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
                    <th>From</th>
                    <th>To</th>
                    <th>환율</th>
                    <th>수수료</th>
                    <th>최소</th>
                    <th>최대</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center p-4">
                        스왑 환율이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    rates.map((rate) => (
                      <tr key={rate.id}>
                        <td>{rate.id}</td>
                        <td>{rate.from_currency}</td>
                        <td>{rate.to_currency}</td>
                        <td>{rate.rate}</td>
                        <td>{rate.fee_percent}%</td>
                        <td>
                          {new Intl.NumberFormat("ko-KR").format(rate.min_amount)}
                        </td>
                        <td>
                          {new Intl.NumberFormat("ko-KR").format(rate.max_amount)}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => handleEdit(rate)}>
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => handleDelete(rate.id)}>
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
          )}
        </div>
      </div>

      <SwapModal 
        isOpen={isModalOpen}
        rate={selectedRate}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchRates}
      />
    </Layout>
  );
}
