"use client";

import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface TradingTrade {
  id: number;
  user_id: number;
  username: string;
  symbol: string;
  trading_type: string;
  order_type: string;
  amount: number;
  currency: string;
  direction: string;
  leverage: number;
  duration: number | null;
  entry_price: number;
  exit_price: number | null;
  tp_price: number | null;
  sl_price: number | null;
  liq_price: number | null;
  payout: number | null;
  profit: number | null;
  status: string;
  created_at: string;
  resolved_at: string | null;
}

export default function TradingBettingListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [status, setStatus] = useState("");
  const [symbol, setSymbol] = useState("");
  const [search, setSearch] = useState("");
  const [trades, setTrades] = useState<TradingTrade[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);



  const fetchTrades = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize,
        ...(status && { status }),
        ...(symbol && { symbol }),
        ...(search && { search }),
      });

      const response = await fetch(`${BACKEND_URL}/api/admin/trading/trades?${params.toString()}`, {
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to fetch trades');

      const data = await response.json();
      if (data.success) {
        setTrades(data.data.data);
        setTotal(data.data.meta.total);
        setCurrentPage(data.data.meta.page);
        setTotalPages(data.data.meta.totalPages);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  }, [pageSize, status, symbol, search]);

  useEffect(() => {
    fetchTrades(1);
  }, [fetchTrades]);

  const handleCancel = async (id: number) => {
    if (!window.confirm('정말 이 거래를 취소하고 금액을 환불하시겠습니까?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/trading/cancel/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('거래가 취소되고 환불되었습니다.');
        fetchTrades(currentPage);
      } else {
        const data = await response.json();
        alert(data.message || '취소 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error canceling trade:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrades(1);
  };

  const formatNumber = (num: number | null, decimals: number = 2) => {
    if (num === null) return '-';
    return new Intl.NumberFormat('ko-KR', { minimumFractionDigits: decimals }).format(num);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="badge bg-warning text-dark">대기</span>;
      case 'won': return <span className="badge bg-success">승리</span>;
      case 'lost': return <span className="badge bg-danger">패배</span>;
      case 'liquidated': return <span className="badge bg-dark">청산</span>;
      case 'canceled': return <span className="badge bg-secondary">취소</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getDirectionBadge = (dir: string) => {
    switch (dir) {
      case 'up':
      case 'buy': return <span className="text-danger"><i className="fa fa-arrow-up me-1"></i>BUY</span>;
      case 'down':
      case 'sell': return <span className="text-primary"><i className="fa fa-arrow-down me-1"></i>SELL</span>;
      default: return <span>{dir}</span>;
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-chart-line me-2"></i>트레이딩 베팅 내역
        <small className="ms-2">실시간 트레이딩 거래 현황</small>
      </h1>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">거래 필터</h4>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-2">
              <label className="form-label">표시 개수</label>
              <select className="form-select" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                <option value="50">50개씩</option>
                <option value="100">100개씩</option>
                <option value="200">200개씩</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">상태</label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">전체 상태</option>
                <option value="pending">진행중</option>
                <option value="won">승리</option>
                <option value="lost">패배</option>
                <option value="liquidated">청산</option>
                <option value="canceled">취소됨</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">심볼 (BTC, ETH...)</label>
              <input type="text" className="form-control" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="예: BTCUSDT" />
            </div>
            <div className="col-md-4">
              <label className="form-label">아이디 검색</label>
              <div className="input-group">
                <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="회원 아이디 입력" />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <i className="fa fa-search me-1"></i>검색
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">거래 내역 (총 {total}건)</h4>
        </div>
        <div className="panel-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center mb-0 fw-bold">
              <thead className="bg-dark text-white">
                <tr>
                  <th>No.</th>
                  <th>ID</th>
                  <th>심볼</th>
                  <th>유형</th>
                  <th>방향</th>
                  <th>레버리지</th>
                  <th>거래금액</th>
                  <th>진입가</th>
                  <th>종료가</th>
                  <th>수익</th>
                  <th>상태</th>
                  <th>거래시간</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={13} className="py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : trades.length === 0 ? (
                  <tr><td colSpan={13} className="py-5">거래 내역이 없습니다.</td></tr>
                ) : (
                  trades.map((trade) => (
                    <tr key={trade.id}>
                      <td>{trade.id}</td>
                      <td>{trade.username}</td>
                      <td>{trade.symbol}</td>
                      <td>
                        <span className="badge bg-secondary">{trade.trading_type.toUpperCase()}</span>
                      </td>
                      <td>{getDirectionBadge(trade.direction)}</td>
                      <td>{trade.leverage}x</td>
                      <td>{formatNumber(trade.amount, 2)} {trade.currency}</td>
                      <td>{formatNumber(trade.entry_price, 2)}</td>
                      <td>{formatNumber(trade.exit_price, 2)}</td>
                      <td className={trade.profit && trade.profit > 0 ? 'text-danger' : (trade.profit && trade.profit < 0 ? 'text-primary' : '')}>
                        {trade.profit ? (trade.profit > 0 ? '+' : '') + formatNumber(trade.profit, 2) : '-'}
                      </td>
                      <td>{getStatusBadge(trade.status)}</td>
                      <td>{new Date(trade.created_at).toLocaleString('ko-KR')}</td>
                      <td>
                        {trade.status === 'pending' && (
                          <button 
                            className="btn btn-xs btn-danger"
                            onClick={() => handleCancel(trade.id)}
                          >
                            취소/환불
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel-footer bg-white border-top">
          <nav>
            <ul className="pagination justify-content-center mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchTrades(currentPage - 1)}>이전</button>
              </li>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                const start = Math.max(1, Math.min(currentPage - 5, totalPages - 9));
                const pageNum = start + i;
                if (pageNum > totalPages) return null;
                return (
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => fetchTrades(pageNum)}>{pageNum}</button>
                  </li>
                );
              })}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchTrades(currentPage + 1)}>다음</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
