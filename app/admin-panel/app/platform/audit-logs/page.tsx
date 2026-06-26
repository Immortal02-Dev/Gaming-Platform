"use client";

import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";

interface AuditLog {
  id: number;
  admin_username: string;
  action: string;
  target_type: string;
  target_id: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetFilter, setTargetFilter] = useState("");

  const fetchLogs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (targetFilter) params.append("target_type", targetFilter);
      const query = params.toString() ? `?${params.toString()}` : "";

      const res = await fetch(`/api/admin/platform/audit-logs${query}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.data || []);
      }
    } catch (error) {
      console.error("Audit logs load failed", error);
    } finally {
      setLoading(false);
    }
  }, [targetFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/platform/audit-logs">
          <i className="fa fa-history me-2"></i>어드민 활동 로그 (Admin Audit
          Logs)
        </a>
        <small>관리자 작업 내역 및 시스템 변경 사항 추적</small>
      </h1>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">활동 내역</h5>
          <select
            className="form-select form-select-sm w-auto"
            value={targetFilter}
            onChange={(e) => setTargetFilter(e.target.value)}
          >
            <option value="">모든 유형s</option>
            <option value="user">사용자</option>
            <option value="wallet">지갑/금융</option>
            <option value="platform">플랫폼 설정</option>
            <option value="chat">채팅</option>
            <option value="kyc">KYC 심사</option>
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
                    <th>시간</th>
                    <th>관리자</th>
                    <th>작업 내용</th>
                    <th>대상 유형</th>
                    <th>대상 ID</th>
                    <th>IP 주소</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-muted">
                        최근 활동 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id}>
                        <td className="small text-muted">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            {log.admin_username}
                          </span>
                        </td>
                        <td className="text-start">{log.action}</td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {log.target_type}
                          </span>
                        </td>
                        <td>{log.target_id}</td>
                        <td className="small">{log.ip_address}</td>
                        <td>
                          <button
                            className="btn btn-xs btn-outline-info"
                            onClick={() => alert(log.details)}
                          >
                            보기
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
    </Layout>
  );
}
