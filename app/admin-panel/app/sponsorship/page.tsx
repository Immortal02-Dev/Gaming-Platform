"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import SponsorshipModal from "@/components/SponsorshipModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface SponsorshipItem {
  id: number;
  partner_name: string;
  title: string;
  logo_url: string | null;
  banner_url: string | null;
  description: string;
  created_at: string;
}

export default function SponsorshipPage() {
  const [items, setItems] = useState<SponsorshipItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SponsorshipItem | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/sponsorships`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.data || []);
      }
    } catch (error) {
      console.error("Sponsorship load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleNew = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: SponsorshipItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 스폰서십 항목을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/sponsorships/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchItems();
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
        <a href="/sponsorship">
          <i className="fa fa-handshake me-2"></i>스폰서십 관리
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
          <h5 className="card-title mb-0">스폰서십 목록</h5>
          <button className="btn btn-primary btn-sm" onClick={handleNew}>
            <i className="fa fa-plus me-1"></i>새 스폰서십 추가
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>ID</th>
                <th>파트너</th>
                <th>제목</th>
                <th>로고</th>
                <th>배너</th>
                <th>설명</th>
                <th>생성일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    스폰서십 콘텐츠가 없습니다.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.partner_name}</td>
                    <td className="text-start">{item.title}</td>
                    <td>
                      {item.logo_url ? (
                        <Image
                          src={item.logo_url}
                          alt="logo"
                          width={100}
                          height={40}
                          style={{ objectFit: 'contain', maxHeight: 40 }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {item.banner_url ? (
                        <Image
                          src={item.banner_url}
                          alt="banner"
                          width={100}
                          height={40}
                          style={{ objectFit: 'contain', maxHeight: 40 }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="text-start" style={{ maxWidth: 220 }}>
                      {item.description?.length > 80
                        ? `${item.description.slice(0, 80)}...`
                        : item.description}
                    </td>
                    <td>{new Date(item.created_at).toLocaleString("ko-KR")}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" onClick={() => handleEdit(item)}>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>
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

      <SponsorshipModal 
        isOpen={isModalOpen}
        sponsorship={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchItems}
      />
    </Layout>
  );
}
