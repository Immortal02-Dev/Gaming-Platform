"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import LanguageModal, { Language } from "@/components/LanguageModal";

const BACKEND_URL = ""; // Use relative path for proxy

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const fetchLanguages = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/languages`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setLanguages(data.data || []);
      }
    } catch (error) {
      console.error("Languages load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleNew = () => {
    setSelectedLanguage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lang: Language) => {
    setSelectedLanguage(lang);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("이 언어를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/languages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchLanguages();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/languages">
          <i className="fa fa-language me-2"></i>언어 관리 (Languages)
        </a>
        <small>플랫폼 다국어 지원 설정</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">언어 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 언어 추가
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
                    <th>코드</th>
                    <th>언어 명칭</th>
                    <th>기본값</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-muted">등록된 언어가 없습니다.</td>
                    </tr>
                  ) : (
                    languages.map((lang) => (
                      <tr key={lang.id}>
                        <td>{lang.sort_order}</td>
                        <td><span className="badge bg-light text-dark border">{lang.code}</span></td>
                        <td>{lang.name}</td>
                        <td>
                          {lang.is_default ? (
                            <span className="badge bg-primary">기본 언어</span>
                          ) : '-'}
                        </td>
                        <td>
                          <span className={`badge ${lang.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {lang.is_active ? '활성' : '비활성'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => handleEdit(lang)}>
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => lang.id && handleDelete(lang.id)}>
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

      <LanguageModal 
        isOpen={isModalOpen}
        language={selectedLanguage}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchLanguages}
      />
    </Layout>
  );
}
