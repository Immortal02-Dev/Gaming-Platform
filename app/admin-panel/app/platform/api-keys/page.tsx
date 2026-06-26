"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ApiKeyModal, { ApiKey } from "@/components/ApiKeyModal";

const BACKEND_URL = ""; // Use relative path for proxy

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);

  const fetchApiKeys = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/platform/api-keys`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setApiKeys(data.data || []);
      }
    } catch (error) {
      console.error("API Keys load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleNew = () => {
    setSelectedKey(null);
    setIsModalOpen(true);
  };

  const handleEdit = (key: ApiKey) => {
    setSelectedKey(key);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 API 설정을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/platform/api-keys/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchApiKeys();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("ko-KR");
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/api-keys">
          <i className="fa fa-key me-2"></i>API 설정 관리 (API Keys)
        </a>
        <small>외부 공급자 및 서비스 연동 키 설정</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">API 키 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 API 추가
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
                    <th>제공자</th>
                    <th>타입</th>
                    <th>환경</th>
                    <th>상태</th>
                    <th>마지막 사용</th>
                    <th>생성일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-muted">등록된 API 키가 없습니다.</td>
                    </tr>
                  ) : (
                    apiKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="text-start">{key.provider_name}</td>
                        <td>
                          <span className="badge bg-light text-dark border">{key.provider_type}</span>
                        </td>
                        <td>
                          <span className={`badge ${key.environment === 'production' ? 'bg-danger' : 'bg-warning'}`}>
                            {key.environment.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${key.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {key.is_active ? '활성' : '비활성'}
                          </span>
                        </td>
                        <td className="text-muted small">{formatDate(key.last_used)}</td>
                        <td className="text-muted small">{formatDate(key.created_at as any)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => handleEdit(key)}>
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => key.id && handleDelete(key.id)}>
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

      <ApiKeyModal 
        isOpen={isModalOpen}
        apiKey={selectedKey}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchApiKeys}
      />
    </Layout>
  );
}
