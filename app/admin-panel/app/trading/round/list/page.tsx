"use client";

import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface TradingRound {
  id: number;
  market_symbol: string;
  round_number: string;
  start_time: string;
  end_time: string;
  start_price: number | null;
  end_price: number | null;
  status: string;
}

export default function TradingRoundListPage() {
  const [rounds, setRounds] = useState<TradingRound[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [status, setStatus] = useState("");



  const fetchRounds = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
        ...(symbol && { symbol }),
        ...(status && { status }),
      });

      const response = await fetch(`${BACKEND_URL}/api/admin/trading/rounds?${params.toString()}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setRounds(data.data.data);
        setTotal(data.data.meta.total);
        setCurrentPage(data.data.meta.page);
        setTotalPages(data.data.meta.totalPages);
      }
    } catch (error) {
      console.error('Error fetching rounds:', error);
    } finally {
      setLoading(false);
    }
  }, [symbol, status]);

  useEffect(() => {
    fetchRounds(1);
  }, [fetchRounds]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRounds(1);
  };

  const formatNumber = (num: number | null, decimals: number = 2) => {
    if (num === null) return '-';
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals }).format(num);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-history me-2"></i>트레이딩 회차 관리
        <small className="ms-2">Up-Down 트레이딩 회차 및 결과 조회</small>
      </h1>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">회차 필터</h4>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-3">
              <label className="form-label">심볼</label>
              <input type="text" className="form-control" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="예: BTCUSDT" />
            </div>
            <div className="col-md-3">
              <label className="form-label">상태</label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">전체</option>
                <option value="active">진행중</option>
                <option value="completed">종료</option>
                <option value="canceled">취소</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                <i className="fa fa-search me-1"></i>조회
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">회차 목록 (총 {total}건)</h4>
        </div>
        <div className="panel-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center mb-0 fw-bold">
              <thead className="bg-dark text-white">
                <tr>
                  <th>No.</th>
                  <th>심볼</th>
                  <th>회차번호</th>
                  <th>시작시간</th>
                  <th>종료시간</th>
                  <th>시작가</th>
                  <th>종료가</th>
                  <th>결과</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} className="py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : rounds.length === 0 ? (
                  <tr><td colSpan={9} className="py-5">회차 내역이 없습니다.</td></tr>
                ) : (
                  rounds.map((round) => {
                    const result = round.end_price && round.start_price 
                      ? (round.end_price > round.start_price ? 'UP' : (round.end_price < round.start_price ? 'DOWN' : 'SAME'))
                      : '-';
                    return (
                      <tr key={round.id}>
                        <td>{round.id}</td>
                        <td>{round.market_symbol}</td>
                        <td>{round.round_number}</td>
                        <td>{new Date(round.start_time).toLocaleString('ko-KR')}</td>
                        <td>{new Date(round.end_time).toLocaleString('ko-KR')}</td>
                        <td>${formatNumber(round.start_price, 2)}</td>
                        <td>${formatNumber(round.end_price, 2)}</td>
                        <td>
                          {result === 'UP' ? <span className="badge bg-danger">UP</span> : 
                           result === 'DOWN' ? <span className="badge bg-primary">DOWN</span> : 
                           <span className="badge bg-secondary">{result}</span>}
                        </td>
                        <td>
                          {round.status === 'active' ? <span className="badge bg-warning text-dark">진행중</span> : 
                           round.status === 'completed' ? <span className="badge bg-success">종료</span> : 
                           <span className="badge bg-dark">{round.status}</span>}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel-footer bg-white">
          <nav>
            <ul className="pagination justify-content-center mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchRounds(currentPage - 1)}>이전</button>
              </li>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                const start = Math.max(1, Math.min(currentPage - 5, totalPages - 9));
                const pageNum = start + i;
                if (pageNum > totalPages) return null;
                return (
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => fetchRounds(pageNum)}>{pageNum}</button>
                  </li>
                );
              })}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchRounds(currentPage + 1)}>다음</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
