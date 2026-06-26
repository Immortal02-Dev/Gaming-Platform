"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface WebhookLog {
  id: number;
  provider_name: string;
  event_type: string;
  transaction_id: string;
  status: string;
  raw_payload: string;
  created_at: string;
}

export default function WebhookPage() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/finance/webhook-logs`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setLogs(data.data || []);
      }
    } catch (error) {
      console.error("Webhook logs load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/webhook">
          <i className="fa fa-link me-2"></i>웹훅 관리
        </a>
        <small></small>
      </h1>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">웹훅 로그</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={fetchLogs}>
            <i className="fa fa-sync me-1"></i>새로고침
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
                    <th>공급자</th>
                    <th>이벤트</th>
                    <th>트랜잭션 ID</th>
                    <th>상태</th>
                    <th>생성일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-4">
                        웹훅 로그가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.provider_name}</td>
                        <td>{log.event_type}</td>
                        <td>{log.transaction_id}</td>
                        <td>
                           <span className={`badge ${log.status === 'success' ? 'bg-success' : 'bg-danger'}`}>
                             {log.status}
                           </span>
                        </td>
                        <td>{new Date(log.created_at).toLocaleString("ko-KR")}</td>
                        <td>
                          <button 
                            className="btn btn-xs btn-outline-primary"
                            onClick={() => setSelectedLog(log)}
                          >
                            <i className="fa fa-search me-1"></i>페이로드
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

      {/* Payload Modal */}
      {selectedLog && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">웹훅 페이로드 상세 (#{selectedLog.id})</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedLog(null)}></button>
              </div>
              <div className="modal-body">
                <pre className="bg-light p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {JSON.stringify(JSON.parse(selectedLog.raw_payload), null, 2)}
                </pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedLog(null)}>닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
