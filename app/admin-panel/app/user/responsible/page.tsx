"use client";

import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface Exclusion {
  id: number;
  username: string;
  nickname: string;
  type: "cooldown" | "exclusion";
  duration_days: number;
  end_date: string;
  reason: string;
  created_at: string;
}

interface Limit {
  id: number;
  username: string;
  nickname: string;
  daily_loss_limit: number | null;
  weekly_loss_limit: number | null;
  monthly_loss_limit: number | null;
  daily_deposit_limit: number | null;
  updated_at: string;
}

export default function ResponsiblePage() {
  const [exclusions, setExclusions] = useState<Exclusion[]>([]);
  const [limits, setLimits] = useState<Limit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"exclusions" | "limits">("exclusions");
  
  // Search states
  const [pageSize, setPageSize] = useState("20");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchExclusions = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        pageSize,
        searchType,
        searchText
      });
      const res = await fetch(`${BACKEND_URL}/api/admin/responsible/exclusions?${params.toString()}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setExclusions(data.data || []);
      }
    } catch (error) {
      console.error("Exclusions load failed", error);
    }
  }, [pageSize, searchType, searchText]);

  const fetchLimits = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        pageSize,
        searchType,
        searchText
      });
      const res = await fetch(`${BACKEND_URL}/api/admin/responsible/limits?${params.toString()}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setLimits(data.data || []);
      }
    } catch (error) {
      console.error("Limits load failed", error);
    }
  }, [pageSize, searchType, searchText]);

  const fetchData = useCallback(async (isMounted: boolean = true) => {
    if (isMounted) setLoading(true);
    try {
      if (activeTab === "exclusions") {
        await fetchExclusions();
      } else {
        await fetchLimits();
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }, [activeTab, fetchExclusions, fetchLimits]);

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    return () => { isMounted = false; };
  }, [fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleCancelExclusion = async (id: number) => {
    if (!confirm("이 제한 조치를 해제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/responsible/exclusions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchExclusions();
      }
    } catch (error) {
      console.error("Cancel failed", error);
    }
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const formatCurrency = (val: number | null) => {
    if (val === null) return "0";
    return val.toLocaleString();
  };

  return (
    <Layout>
      <style jsx>{`
        .flex-none { flex: none !important; }
        .sticky { position: sticky !important; }
        .dataTable > :not(caption) > * > td { background-color: #ffffff; }
        .dataTable > tbody > tr:nth-of-type(odd) > td { background-color: #f0f2f4; }
        .dataTable td, th { border-left: 0; border-bottom: 1px solid rgb(206, 212, 218) !important; }
      `}</style>

      <h1 className="page-header">
        <a href="/user/responsible">
          <i className="fa fa-hand-holding-heart me-2"></i>건전한 게임 관리 (Responsible Gambling)
        </a>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2 shadow-sm rounded">
            <form onSubmit={handleSearch} className="d-flex w-100 align-items-center">
              <select 
                className="form-select w-80px me-2" 
                value={pageSize} 
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              
              <select 
                className="form-select w-auto me-2" 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="">전체 검색</option>
                <option value="id">아이디</option>
                <option value="nick">닉네임</option>
                {activeTab === 'exclusions' && <option value="reason">사유</option>}
              </select>

              <input 
                type="text" 
                className="form-control w-200px me-2" 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                placeholder="검색어 입력" 
              />
              
              <button type="submit" className="btn btn-lime">
                <i className="fa-solid fa-magnifying-glass me-2"></i>검색
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-dark p-0">
          <ul className="nav nav-tabs nav-tabs-inverse">
            <li className="nav-item">
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'exclusions' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('exclusions'); }}
              >
                <i className="fa fa-user-lock me-2"></i>자가 격리 / 쿨다운 현황
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'limits' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('limits'); }}
              >
                <i className="fa fa-shield-alt me-2"></i>베팅 & 입금 한도 설정
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            {activeTab === 'exclusions' ? (
              <table className="table dataTable table-striped table-bordered align-middle text-center fw-bold m-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '150px' }}>신청일</th>
                    <th>회원 (아이디/닉네임)</th>
                    <th style={{ width: '120px' }}>유형</th>
                    <th style={{ width: '100px' }}>기간</th>
                    <th style={{ width: '180px' }}>만료 예정일</th>
                    <th>사유</th>
                    <th style={{ width: '100px' }}>상태</th>
                    <th style={{ width: '100px' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr key="loading"><td colSpan={8} className="p-4"><i className="fa fa-spinner fa-spin me-2"></i>로딩 중...</td></tr>
                  ) : exclusions.length === 0 ? (
                    <tr key="empty"><td colSpan={8} className="p-4 text-muted">제한 조치 내역이 없습니다.</td></tr>
                  ) : (
                    exclusions.map((e) => (
                      <tr key={e.id}>
                        <td className="small text-muted">{new Date(e.created_at).toLocaleString()}</td>
                        <td>
                          <span className="text-primary">{e.username}</span>
                          <span className="ms-1 text-muted">({e.nickname})</span>
                        </td>
                        <td>
                          <span className={`badge ${e.type === 'exclusion' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                            {e.type === 'exclusion' ? '자가 격리' : '쿨다운'}
                          </span>
                        </td>
                        <td>{e.duration_days}일</td>
                        <td className={isExpired(e.end_date) ? 'text-muted' : 'text-danger'}>
                          {new Date(e.end_date).toLocaleString()}
                        </td>
                        <td className="text-start text-truncate" style={{ maxWidth: '250px' }} title={e.reason}>
                          {e.reason || <span className="text-muted small">사유 없음</span>}
                        </td>
                        <td>
                          {isExpired(e.end_date) ? (
                            <span className="badge bg-secondary">만료됨</span>
                          ) : (
                            <span className="badge bg-success">진행중</span>
                          )}
                        </td>
                        <td>
                          {!isExpired(e.end_date) && (
                            <button className="btn btn-xs btn-outline-danger" onClick={() => handleCancelExclusion(e.id)}>
                              해제
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="table dataTable table-striped table-bordered align-middle text-center fw-bold m-0">
                <thead className="bg-light">
                  <tr>
                    <th>회원 (아이디/닉네임)</th>
                    <th>일일 손실 한도</th>
                    <th>주간 손실 한도</th>
                    <th>월간 손실 한도</th>
                    <th>일일 입금 한도</th>
                    <th style={{ width: '180px' }}>최근 업데이트</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr key="loading-limits"><td colSpan={6} className="p-4"><i className="fa fa-spinner fa-spin me-2"></i>로딩 중...</td></tr>
                  ) : limits.length === 0 ? (
                    <tr key="empty-limits"><td colSpan={6} className="p-4 text-muted">설정된 한도가 없습니다.</td></tr>
                  ) : (
                    limits.map((l) => (
                      <tr key={l.id}>
                        <td>
                          <span className="text-primary">{l.username}</span>
                          <span className="ms-1 text-muted">({l.nickname})</span>
                        </td>
                        <td className="text-danger">{formatCurrency(l.daily_loss_limit)}</td>
                        <td className="text-danger">{formatCurrency(l.weekly_loss_limit)}</td>
                        <td className="text-danger">{formatCurrency(l.monthly_loss_limit)}</td>
                        <td className="text-primary">{formatCurrency(l.daily_deposit_limit)}</td>
                        <td className="small text-muted">{new Date(l.updated_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
