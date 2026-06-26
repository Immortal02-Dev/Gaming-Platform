"use client";

import { useEffect, useState } from "react";

interface Transaction {
  type: string;
  time: string;
  amount: number;
  currency: string;
  balance: number;
}

const typeLabels: Record<string, string> = {
  deposit: "입금",
  withdraw: "출금",
  transfer: "이체",
  swap: "스왑",
  bet: "베팅",
  bonus: "보너스",
};

export default function MoneyHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/wallet/transactions");
        const data = await response.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="user-main">
      <div className="deposit-section">
        <div className="deposit-history">
          <div className="history-header">
            <div className="history-title">
              <p>입금내역</p>
            </div>
            <button type="button" className="history-delete-btn">
              <div className="history-delete-text">전체삭제</div>
            </button>
          </div>

          <div className="history-list">
            <div className="history-filter">
              <div className="filter-wrapper">
                <div className="filter-inner" style={{ width: "140px" }}>
                  <div className="filter-select">
                    <div className="filter-value">
                      <div className="filter-value-text">전체</div>
                    </div>
                  </div>
                </div>
                <div className="filter-inner" style={{ width: "140px" }}>
                  <div className="filter-select">
                    <div className="filter-value">
                      <div className="filter-value-text">최근 1주일</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table className="history-table">
              <thead>
                <tr>
                  <th>일시</th>
                  <th>내용</th>
                  <th>변동 머니</th>
                  <th>누적</th>
                  <th style={{ width: "100px" }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      로딩 중...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      거래내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, index) => (
                    <tr
                      key={index}
                      className="modal-trigger"
                      data-target="customer-modal"
                    >
                      <td>{new Date(tx.time).toLocaleString("ko-KR")}</td>
                      <td>{typeLabels[tx.type] || tx.type}</td>
                      <td>
                        {tx.amount >= 0
                          ? `+${tx.amount.toLocaleString()}`
                          : tx.amount.toLocaleString()}
                      </td>
                      <td>{tx.balance.toLocaleString()}</td>
                      <td>
                        <button className="history-btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="currentColor"
                              d="m9.129 0l1.974.005c.778.094 1.46.46 2.022 1.078c.459.504.7 1.09.714 1.728h5.475a.69.69 0 0 1 .686.693a.689.689 0 0 1-.686.692l-1.836-.001v11.627c0 2.543-.949 4.178-3.041 4.178H5.419c-2.092 0-3.026-1.626-3.026-4.178V4.195H.686A.689.689 0 0 1 0 3.505c0-.383.307-.692.686-.692h5.47c.014-.514.205-1.035.554-1.55C7.23.495 8.042.074 9.129 0Zm6.977 4.195H3.764v11.627c0 1.888.52 2.794 1.655 2.794h9.018c1.139 0 1.67-.914 1.67-2.794l-.001-11.627ZM6.716 6.34c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692Zm2.726 0c.38 0 .686.31.686.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692Zm2.728 0c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.685.692a.689.689 0 0 1-.686-.692v-8.05a.69.69 0 0 1 .686-.692ZM9.176 1.382c-.642.045-1.065.264-1.334.662c-.198.291-.297.543-.313.768l4.938-.001c-.014-.291-.129-.547-.352-.792c-.346-.38-.73-.586-1.093-.635l-1.846-.002Z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
