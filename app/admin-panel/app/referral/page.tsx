"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ReferralCodeModal from "@/components/ReferralCodeModal";

const BACKEND_URL = ""; // Use relative path for proxy

interface ReferralStats {
  active_referrers: number;
  total_referrals: number;
  total_commission_paid: number;
}

interface ReferralCode {
  id: number;
  code: string;
  user_id: number;
  username: string;
  created_at: string;
}

interface ReferralFriend {
  id: number;
  referrer_username: string;
  friend_username: string;
  registered_at: string;
}

export default function ReferralPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "codes" | "friends">(
    "stats",
  );
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [friends, setFriends] = useState<ReferralFriend[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<ReferralCode | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/referral/stats`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setStats(data.data);
      }
    } catch (e) { console.error(e); }
  };

  const fetchCodes = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/referral/codes`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCodes(data.data || []);
      }
    } catch (e) { console.error(e); }
  };

  const fetchFriends = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/referral/friends`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setFriends(data.data || []);
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchCodes(), fetchFriends()]);
      setLoading(false);
    };
    load();
  }, []);

  const handleNew = () => {
    setSelectedCode(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 추천 코드를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/referral/codes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) fetchCodes();
    } catch (error) {
      console.error("Delete code failed", error);
    }
  };

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("ko-KR").format(value);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/referral">
          <i className="fa fa-user-friends me-2"></i>추천인 관리
        </a>
        <small></small>
      </h1>

      <div className="row mb-4">
        <div className="col">
          <ul className="nav nav-pills">
            {[
              { id: "stats", label: "통계" },
              { id: "codes", label: "추천 코드" },
              { id: "friends", label: "추천 친구" },
            ].map((tab) => (
              <li key={tab.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id as "stats" | "codes" | "friends")}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-4">
          <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
        </div>
      ) : (
        <>
          {activeTab === "stats" && (
            <div className="row gx-3 gy-3">
              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h5 className="card-title">활성 추천인</h5>
                    <h3>{formatNumber(stats?.active_referrers || 0)}명</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h5 className="card-title">추천 수</h5>
                    <h3>{formatNumber(stats?.total_referrals || 0)}건</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <h5 className="card-title">총 커미션</h5>
                    <h3>{formatNumber(stats?.total_commission_paid || 0)}원</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "codes" && (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">추천 코드 목록</h5>
                <button className="btn btn-primary btn-sm" onClick={handleNew}>
                  <i className="fa fa-plus me-1"></i>새 코드 생성
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th>ID</th>
                        <th>코드</th>
                        <th>회원</th>
                        <th>회원 ID</th>
                        <th>생성일</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {codes.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center p-4">
                            추천 코드가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        codes.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.code}</td>
                            <td>{item.username}</td>
                            <td>{item.user_id}</td>
                            <td>
                              {new Date(item.created_at).toLocaleString("ko-KR")}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
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

          {activeTab === "friends" && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">추천 친구 목록</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th>ID</th>
                        <th>추천인</th>
                        <th>친구</th>
                        <th>등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {friends.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center p-4">
                            추천 친구 정보가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        friends.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.referrer_username}</td>
                            <td>{item.friend_username}</td>
                            <td>
                              {new Date(item.registered_at).toLocaleString("ko-KR")}
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
        </>
      )}

      <ReferralCodeModal 
        isOpen={isModalOpen}
        referralCode={selectedCode}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchCodes}
      />
    </Layout>
  );
}
