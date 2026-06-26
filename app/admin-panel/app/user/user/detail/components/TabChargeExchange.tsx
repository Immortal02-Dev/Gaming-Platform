import React, { useState, useEffect, useCallback } from "react";

interface TabChargeExchangeProps {
    userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface MoneyLog {
    id: number;
    rowNumber: number;
    requestAmount: number;
    bonusAmount?: number;
    depositor?: string;
    bankerName?: string;
    bonusFirstRate?: boolean;
    status: string;
    statusLabel: string;
    requestedAt: string;
    processedAt: string;
}

interface MoneySummary {
    approvedAmount: number;
    totalAmount: number;
}

interface PaginationData {
    totalPages: number;
}

export default function TabChargeExchange({ userIdx }: TabChargeExchangeProps) {
    const [moneyType, setMoneyType] = useState("charge"); // Default to charge
    const [logs, setLogs] = useState<MoneyLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [summary, setSummary] = useState<MoneySummary | null>(null);
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const fetchLogs = useCallback(async () => {
        if (!userIdx) return;
        setLoading(true);
        try {
            const endpoint = moneyType === "exchange" ? "/api/admin/exchanges" : "/api/admin/charges";
            const query = new URLSearchParams({
                userIdx,
                page: page.toString(),
                pageSize,
                startDate,
                endDate,
                moneyStatusIdx: status
            }).toString();

            const response = await fetch(`${BACKEND_URL}${endpoint}?${query}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                setLogs(result.data);
                setSummary(result.summary);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, moneyType, page, pageSize, startDate, endDate, status]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return (
        <div>
            <style jsx>{`
                .btn-radio input[type=radio] {
                    display: none;
                }
                .btn-radio input[type=radio]+label {
                    display: inline-block;
                    cursor: pointer;
                    height: 34px;
                    width: 90px;
                    border-radius: 4px;
                    line-height: 34px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 13px;
                    margin-right: 2px;
                    background-color: #e9ecef;
                    color: #20252a;
                }
                .btn-radio input[type=radio]:checked+label {
                    background-color: #00acac;
                    color: #fff;
                }
            `}</style>

            <div className="row mb-2">
                <div className="col">
                    <div className="d-flex bg-white p-2 rounded border">
                        <form className="w-100" onSubmit={(e) => { e.preventDefault(); fetchLogs(); }}>
                            <div className="row align-items-center">
                                <div className="col mb-2">
                                    <div className="d-flex align-items-center">
                                        <div className="btn-radio">
                                            <input
                                                type="radio"
                                                name="moneyType"
                                                id="moneyType2"
                                                value="charge"
                                                checked={moneyType === "charge"}
                                                onChange={() => { setMoneyType("charge"); setPage(1); }}
                                            />
                                            <label htmlFor="moneyType2">충전</label>

                                            <input
                                                type="radio"
                                                name="moneyType"
                                                id="moneyType3"
                                                value="exchange"
                                                checked={moneyType === "exchange"}
                                                onChange={() => { setMoneyType("exchange"); setPage(1); }}
                                            />
                                            <label htmlFor="moneyType3">환전</label>
                                        </div>
                                        <div className="ms-auto d-flex gap-3">
                                            <div className="fw-bold">
                                                충전금액 : <span className="text-primary">{summary?.approvedAmount?.toLocaleString() || 0}</span>원
                                            </div>
                                            <div className="fw-bold">
                                                환전금액 : <span className="text-success">{summary?.totalAmount?.toLocaleString() || 0}</span>원
                                            </div>
                                            {/* Note: summary structure varies by endpoint, this is a simplified display */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex">
                                        <select
                                            name="pageSize"
                                            className="form-select w-80px me-2"
                                            value={pageSize}
                                            onChange={(e) => setPageSize(e.target.value)}
                                        >
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                        </select>
                                        <div className="input-group me-2" style={{ width: 300 }}>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <div className="input-group-text">~</div>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                        <select
                                            name="moneyStatusIdx"
                                            className="form-select w-100px me-2"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">상태</option>
                                            <option value="1">신청</option>
                                            <option value="2">대기</option>
                                            <option value="3">승인</option>
                                            <option value="4">취소</option>
                                        </select>
                                        <button type="submit" className="btn btn-lime">
                                            <i className="fa-solid fa-magnifying-glass me-2" />
                                            검색
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                            <tr>
                                <th>No.</th>
                                <th>구분</th>
                                <th>신청금액</th>
                                {moneyType === "charge" && <th>충전 보너스</th>}
                                <th>신청자명</th>
                                {moneyType === "charge" && <th>첫충/매충</th>}
                                <th>상태</th>
                                <th>신청일자</th>
                                <th>처리일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={9}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={9}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: MoneyLog) => (
                                <tr key={log.id}>
                                    <td>{log.rowNumber}</td>
                                    <td>{moneyType === "charge" ? "충전" : "환전"}</td>
                                    <td className={moneyType === "charge" ? "text-primary" : "text-success"}>
                                        {log.requestAmount?.toLocaleString()}
                                    </td>
                                    {moneyType === "charge" && <td>{log.bonusAmount?.toLocaleString() || 0}</td>}
                                    <td>{log.depositor || log.bankerName}</td>
                                    {moneyType === "charge" && <td>{log.bonusFirstRate ? "첫충" : "매충"}</td>}
                                    <td>
                                        <span className={`badge ${log.status === "approved" ? "bg-success" :
                                                log.status === "cancelled" ? "bg-danger" :
                                                    log.status === "pending" ? "bg-warning" : "bg-secondary"
                                            }`}>
                                            {log.statusLabel}
                                        </span>
                                    </td>
                                    <td>{log.requestedAt?.substring(0, 16).replace("T", " ")}</td>
                                    <td>{log.processedAt?.substring(0, 16).replace("T", " ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagination && pagination.totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-3">
                            <button
                                className="btn btn-sm btn-outline-secondary me-1"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >이전</button>
                            <span className="p-2">{page} / {pagination.totalPages}</span>
                            <button
                                className="btn btn-sm btn-outline-secondary ms-1"
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(page + 1)}
                            >다음</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
