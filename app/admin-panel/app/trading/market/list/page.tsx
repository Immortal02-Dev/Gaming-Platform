"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface TradingMarket {
  symbol: string;
  name: string;
  icon: string | null;
  price: number;
  change_24h: number;
  type: string;
  payout_multiplier: number;
  max_leverage: number;
  spread: number;
  buy_volume: number;
  sell_volume: number;
  is_active: boolean;
}

export default function TradingMarketListPage() {
  const [markets, setMarkets] = useState<TradingMarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMarket, setEditingMarket] = useState<TradingMarket | null>(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/trading/markets`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setMarkets(data.data);
      }
    } catch (error) {
      console.error('Error fetching markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (market: TradingMarket) => {
    setEditingMarket({ ...market });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarket) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/trading/markets/${editingMarket.symbol}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMarket),
        credentials: 'include',
      });

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (window as any).gritter !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gritter.add({
            title: '성공',
            text: `${editingMarket.symbol} 마켓 설정이 업데이트되었습니다.`,
            class_name: 'gritter-success'
          });
        }
        setEditingMarket(null);
        fetchMarkets();
      }
    } catch (error) {
      console.error('Error updating market:', error);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-chart-line me-2"></i>트레이딩 마켓 관리
        <small className="ms-2">거래 가능한 코인 심볼 및 배당률 설정</small>
      </h1>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">마켓 목록</h4>
          <div className="panel-heading-btn">
             <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={fetchMarkets}><i className="fa fa-redo"></i></button>
          </div>
        </div>
        <div className="panel-body p-0">
          <table className="table table-striped table-bordered align-middle text-center mb-0 fw-bold">
            <thead className="bg-dark text-white">
              <tr>
                <th>아이콘</th>
                <th>심볼</th>
                <th>이름</th>
                <th>현재가</th>
                <th>24h 변동</th>
                <th>최대 레버리지</th>
                <th>스프레드</th>
                <th>배당배율</th>
                <th>매수/매도 볼륨</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={11} className="py-5"><div className="spinner-border text-primary"></div></td></tr>
              ) : markets.map((market) => (
                <tr key={market.symbol}>
                  <td>
                     {market.icon ? (
                        <Image 
                          src={market.icon} 
                          alt={market.symbol} 
                          width={24} 
                          height={24} 
                          unoptimized 
                        />
                     ) : (
                       <i className="fab fa-bitcoin text-warning fs-4"></i>
                    )}
                  </td>
                  <td>{market.symbol}</td>
                  <td>{market.name}</td>
                  <td>${new Intl.NumberFormat().format(market.price)}</td>
                  <td className={market.change_24h >= 0 ? 'text-danger' : 'text-primary'}>
                    {market.change_24h > 0 ? '+' : ''}{market.change_24h}%
                  </td>
                  <td>{market.max_leverage}x</td>
                  <td>{market.spread}%</td>
                  <td>{market.payout_multiplier}x</td>
                  <td>
                    <span className="text-danger">{new Intl.NumberFormat().format(market.buy_volume)}</span> / <span className="text-primary">{new Intl.NumberFormat().format(market.sell_volume)}</span>
                  </td>
                  <td>
                    {market.is_active ? (
                      <span className="badge bg-success">활성</span>
                    ) : (
                      <span className="badge bg-danger">중지</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(market)}>
                      <i className="fa fa-edit me-1"></i>수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMarket && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">{editingMarket.symbol} 마켓 수정</h5>
                  <button type="button" className="btn-close" onClick={() => setEditingMarket(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">마켓 이름</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingMarket.name} 
                      onChange={(e) => setEditingMarket({...editingMarket, name: e.target.value})}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">최대 레버리지</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={editingMarket.max_leverage} 
                        onChange={(e) => setEditingMarket({...editingMarket, max_leverage: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">스프레드 (%)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        className="form-control" 
                        value={editingMarket.spread} 
                        onChange={(e) => setEditingMarket({...editingMarket, spread: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">배당 배율 (Payout Multiplier)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control" 
                      value={editingMarket.payout_multiplier} 
                      onChange={(e) => setEditingMarket({...editingMarket, payout_multiplier: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">매수 볼륨 (Buy Volume)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={editingMarket.buy_volume} 
                        onChange={(e) => setEditingMarket({...editingMarket, buy_volume: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">매도 볼륨 (Sell Volume)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={editingMarket.sell_volume} 
                        onChange={(e) => setEditingMarket({...editingMarket, sell_volume: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={editingMarket.is_active} 
                      onChange={(e) => setEditingMarket({...editingMarket, is_active: e.target.checked})}
                    />
                    <label className="form-check-label">마켓 활성화 상태</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingMarket(null)}>취소</button>
                  <button type="submit" className="btn btn-primary">저장</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
