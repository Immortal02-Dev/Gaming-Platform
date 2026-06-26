"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
const BACKEND_URL = ""; // Use relative path for proxy
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Stats {
  chargeAmount: number;
  chargeCount: number;
  exchangeAmount: number;
  exchangeCount: number;
  profit: number;
}

interface Transaction {
  id: number;
  username: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

interface DashboardData {
  totalUsers: number;
  totalBets: number;
  bettingVolume: number;
  today: Stats;
  month: Stats;
  history: { date: string; deposits: number; withdrawals: number }[];
  recent: Transaction[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [renderType, setRenderType] = useState<"1" | "2">("1"); // 1: Today, 2: Month
  const [adminName] = useState(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("adminUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.username || "관리자";
        } catch {
          return "관리자";
        }
      }
    }
    return "관리자";
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${BACKEND_URL}/api/admin/stats`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const currentStats = renderType === "1" ? data?.today : data?.month;

  const formatNumber = (num: number = 0) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  return (
    <Layout>
      <style jsx>{`
        @media (max-width: 690px) {
          .app-content {
            min-width: inherit;
          }
        }
        .chart-container {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }
        .recent-table-container {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-completed {
          background: #dcfce7;
          color: #15803d;
        }
        .status-pending {
          background: #fef9c3;
          color: #854d0e;
        }
        .type-deposit {
          color: #10b981;
        }
        .type-withdraw {
          color: #ef4444;
        }
      `}</style>

      <h1 className="page-header">
        <div className="mb-2">
          <span className="text-muted fs-14px">반갑습니다, </span>
          <span className="fw-bold text-dark fs-18px">{adminName}</span>
          <span className="text-muted fs-14px">님! 오늘의 현황입니다.</span>
        </div>
        <div className="d-inline-block fs-6 align-top">
          <ul className="nav nav-pills daymonth">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link render_type ${renderType === "1" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setRenderType("1");
                }}
              >
                당일
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link render_type ${renderType === "2" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setRenderType("2");
                }}
              >
                당월
              </a>
            </li>
          </ul>
        </div>
      </h1>

      <div className="dashbd mb-4">
        <div className="widget widget-stats bg-teal">
          <div className="stats-icon stats-icon-lg">
            <i className="fa fa-won"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">사이트 충전 금액 (건수)</div>
            <div className="stats-number">
              <span>{formatNumber(currentStats?.chargeAmount)}</span>원 (
              <span>{formatNumber(currentStats?.chargeCount)}</span>)
            </div>
          </div>
        </div>
        <div className="widget widget-stats bg-blue">
          <div className="stats-icon stats-icon-lg">
            <i className="fa fa-won"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">사이트 환전 금액 (건수)</div>
            <div className="stats-number">
              <span>{formatNumber(currentStats?.exchangeAmount)}</span>원 (
              <span>{formatNumber(currentStats?.exchangeCount)}</span>)
            </div>
          </div>
        </div>
        <div className="widget widget-stats bg-indigo">
          <div className="stats-icon stats-icon-lg">
            <i className="fa fa-won"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">사이트 충환 손익</div>
            <div className="stats-number">
              <span>{formatNumber(currentStats?.profit)}</span>원
            </div>
          </div>
        </div>
        <div className="widget widget-stats bg-dark">
          <div className="stats-icon stats-icon-lg">
            <i className="fa fa-users"></i>
          </div>
          <div className="stats-content">
            <div className="stats-title">플랫폼 총괄 요약</div>
            <div className="stats-number">
              회원: <span>{formatNumber(data?.totalUsers)}</span> / 베팅:{" "}
              <span>{formatNumber(data?.totalBets)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="chart-container">
            <h5 className="mb-4">최근 7일 거래 추이</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={data?.history}>
                  <defs>
                    <linearGradient
                      id="colorDeposit"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorWithdraw"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(
                      value:
                        | number
                        | string
                        | readonly (string | number)[]
                        | undefined,
                    ) => [formatNumber(Number(value)) + "원", ""]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="deposits"
                    name="충전"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorDeposit)"
                  />
                  <Area
                    type="monotone"
                    dataKey="withdrawals"
                    name="환전"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorWithdraw)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="recent-table-container">
            <h5 className="mb-4">최근 거래 내역</h5>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>사용자</th>
                    <th>구분</th>
                    <th className="text-end">금액</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recent.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.username}</td>
                      <td>
                        <span
                          className={`type-${tx.type === "deposit" ? "deposit" : "withdraw"}`}
                        >
                          {tx.type === "deposit" ? "충전" : "환전"}
                        </span>
                      </td>
                      <td className="text-end font-weight-600">
                        {formatNumber(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
