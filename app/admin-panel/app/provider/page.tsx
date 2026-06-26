"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import ProviderModal from "@/components/ProviderModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface ProviderItem {
  id: number;
  name: string;
  logo: string | null;
  is_maintenance: number;
  created_at: string;
}

export default function ProviderPage() {
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderItem | null>(null);

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/providers`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProviders(data.data || []);
      }
    } catch (error) {
      console.error("Provider load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleNew = () => {
    setSelectedProvider(null);
    setIsModalOpen(true);
  };

  const handleEdit = (provider: ProviderItem) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 공급자를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/providers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchProviders();
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
        <a href="/provider">
          <i className="fa fa-network-wired me-2"></i>공급자 관리
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
          <h5 className="card-title mb-0">공급자 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 공급자 추가
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>ID</th>
                <th>공급자명</th>
                <th>로고</th>
                <th>점검 모드</th>
                <th>생성일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {providers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    공급자가 없습니다.
                  </td>
                </tr>
              ) : (
                providers.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.id}</td>
                    <td>{provider.name}</td>
                    <td>
                      {provider.logo ? (
                        <Image
                          src={provider.logo}
                          alt={provider.name}
                          width={100}
                          height={40}
                          style={{ objectFit: 'contain', maxHeight: 40 }}
                        />
                      ) : (
                        <span className="text-muted">없음</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${provider.is_maintenance ? "bg-warning" : "bg-success"}`}
                      >
                        {provider.is_maintenance ? "점검" : "정상"}
                      </span>
                    </td>
                    <td>
                      {new Date(provider.created_at).toLocaleString("ko-KR")}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" onClick={() => handleEdit(provider)}>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(provider.id)}>
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

      <ProviderModal 
        isOpen={isModalOpen}
        provider={selectedProvider}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchProviders}
      />
    </Layout>
  );
}
