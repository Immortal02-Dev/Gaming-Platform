"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import CurrencyModal, { Currency } from "@/components/CurrencyModal";

const BACKEND_URL = ""; // Use relative path for proxy

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/currencies`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setCurrencies(data.data || []);
      }
    } catch (error) {
      console.error("Currencies load failed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const handleNew = () => {
    setSelectedCurrency(null);
    setIsModalOpen(true);
  };

  const handleEdit = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 통화를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/currencies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchCurrencies();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/currencies">
          <i className="fa fa-coins me-2"></i>통화 관리 (Currencies)
        </a>
        <small>플랫폼 지원 통화 및 암호화폐 설정</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">통화 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 통화 추가
          </button>
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
                    <th>순서</th>
                    <th>아이콘</th>
                    <th>심볼</th>
                    <th>이름</th>
                    <th>타입</th>
                    <th>네트워크</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-muted">등록된 통화가 없습니다.</td>
                    </tr>
                  ) : (
                    currencies.map((c) => (
                      <tr key={c.id}>
                        <td>{c.sort_order}</td>
                        <td>
                          {c.icon_url ? (
                            <Image src={c.icon_url} alt={c.symbol} width={24} height={24} style={{ objectFit: 'contain' }} unoptimized />
                          ) : '-'}
                        </td>
                        <td><span className="badge bg-light text-dark border">{c.symbol}</span></td>
                        <td>{c.name}</td>
                        <td>
                          <span className={`badge ${c.type === 'fiat' ? 'bg-info' : 'bg-primary'}`}>
                            {c.type === 'fiat' ? '법정화폐' : '암호화폐'}
                          </span>
                        </td>
                        <td>{c.network || '-'}</td>
                        <td>
                          <span className={`badge ${c.is_enabled ? 'bg-success' : 'bg-secondary'}`}>
                            {c.is_enabled ? '활성' : '비활성'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => handleEdit(c)}>
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => c.id && handleDelete(c.id)}>
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

      <CurrencyModal 
        isOpen={isModalOpen}
        currency={selectedCurrency}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchCurrencies}
      />
    </Layout>
  );
}
