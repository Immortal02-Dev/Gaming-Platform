"use client";

import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";


interface KycSubmission {
  id: number;
  user_id: number;
  username: string;
  email: string;
  id_type: string;
  id_number: string;
  full_name: string;
  status: "pending" | "approved" | "rejected";
  id_front_url: string;
  id_back_url: string;
  selfie_url: string;
  rejection_reason?: string;
  submitted_at: string;
}

export default function KycPage() {
  const [submissions, setSubmissions] = useState<KycSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setStatusFilter] = useState("");

  const fetchSubmissions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter) params.append("status", filter);
      const query = params.toString() ? `?${params.toString()}` : "";

      const res = await fetch(`/api/admin/kyc/submissions${query}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.data || []);
      }
    } catch (error) {
      console.error("KYC load failed", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleProcess = async (id: number, status: "approved" | "rejected") => {
    let reason = "";
    if (status === "rejected") {
      reason = prompt("거절 사유를 입력하세요:") || "";
      if (!reason) return;
    } else {
      if (!confirm("승인하시겠습니까?")) return;
    }

    try {
      const res = await fetch(`/api/admin/kyc/submissions/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rejection_reason: reason }),
        credentials: "include",
      });
      if (res.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error("Process failed", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/user/kyc">
          <i className="fa fa-id-card me-2"></i>KYC 본인인증 심사
        </a>
        <small>사용자 제출 서류 검토 및 승인/거절</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">제출 목록</h5>
          <select className="form-select form-select-sm w-auto" value={filter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="approved">승인됨</option>
            <option value="rejected">거절됨</option>
          </select>
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
                    <th>제출일</th>
                    <th>회원</th>
                    <th>유형</th>
                    <th>성명 / 번호</th>
                    <th>서류 확인</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-muted">심사 대기중인 내역이 없습니다.</td>
                    </tr>
                  ) : (
                    submissions.map((s) => (
                      <tr key={s.id}>
                        <td className="small text-muted">{new Date(s.submitted_at).toLocaleString()}</td>
                        <td className="text-start">
                          <div>{s.username}</div>
                          <div className="small text-muted fw-normal">{s.email}</div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{s.id_type}</span></td>
                        <td className="text-start">
                          <div>{s.full_name}</div>
                          <div className="small text-muted fw-normal">{s.id_number}</div>
                        </td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center">
                            <a href={s.id_front_url} target="_blank" className="btn btn-xs btn-outline-info">앞면</a>
                            <a href={s.id_back_url} target="_blank" className="btn btn-xs btn-outline-info">뒷면</a>
                            <a href={s.selfie_url} target="_blank" className="btn btn-xs btn-outline-info">셀카</a>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${s.status === 'pending' ? 'bg-warning' : s.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
                            {s.status === 'pending' ? '심사중' : s.status === 'approved' ? '승인' : '거절'}
                          </span>
                        </td>
                        <td>
                          {s.status === 'pending' && (
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-success" onClick={() => handleProcess(s.id, 'approved')}>승인</button>
                              <button className="btn btn-danger" onClick={() => handleProcess(s.id, 'rejected')}>거절</button>
                            </div>
                          )}
                          {s.status !== 'pending' && s.rejection_reason && (
                            <div className="small text-danger text-truncate" style={{ maxWidth: '100px' }} title={s.rejection_reason}>
                              {s.rejection_reason}
                            </div>
                          )}
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
    </Layout>
  );
}
