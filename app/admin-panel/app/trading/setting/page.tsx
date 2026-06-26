"use client";

import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

export default function TradingSettingPage() {
  const [settings, setSettings] = useState({
    trading_stats_win_ratio_24h: "49",
    trading_stats_live_players_24h: "358",
    trading_stats_wins_paid_24h: "23",
    trading_stats_all_time_wins_paid: "147633594.99",
  });
  const [loading, setLoading] = useState(false);



  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/platform/settings`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        const filtered = Object.keys(data.data)
          .filter(key => key.startsWith('trading_'))
          .reduce((obj, key) => {
            obj[key as keyof typeof settings] = data.data[key];
            return obj;
          }, {} as Partial<typeof settings>);
        
        setSettings(prev => ({ ...prev, ...filtered }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await fetch(`${BACKEND_URL}/api/admin/platform/settings/${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value }),
          credentials: 'include',
        });
      }
      alert('설정이 저장되었습니다.');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <i className="fa fa-cog me-2"></i>트레이딩 일반 설정
        <small className="ms-2">플랫폼 트레이딩 통계 및 환경 설정</small>
      </h1>

      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">트레이딩 통계 설정 (메인 페이지 표시용)</h4>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSave}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">24시간 승률 (%)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.trading_stats_win_ratio_24h} 
                  onChange={(e) => setSettings({...settings, trading_stats_win_ratio_24h: e.target.value})}
                />
                <div className="form-text">유저 화면에 표시될 최근 24시간 평균 승률입니다.</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">24시간 접속 유저수</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.trading_stats_live_players_24h} 
                  onChange={(e) => setSettings({...settings, trading_stats_live_players_24h: e.target.value})}
                />
                <div className="form-text">유저 화면에 표시될 실시간 트레이딩 참여자 수입니다.</div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">24시간 당첨금 지급수</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.trading_stats_wins_paid_24h} 
                  onChange={(e) => setSettings({...settings, trading_stats_wins_paid_24h: e.target.value})}
                />
                <div className="form-text">최근 24시간 동안 지급된 당첨 횟수입니다.</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">전체 누적 당첨금액</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-control" 
                  value={settings.trading_stats_all_time_wins_paid} 
                  onChange={(e) => setSettings({...settings, trading_stats_all_time_wins_paid: e.target.value})}
                />
                <div className="form-text">플랫폼 런칭 이후 총 누적 당첨 금액입니다.</div>
              </div>
            </div>

            <div className="hr-line"></div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? '저장 중...' : '설정 저장하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
