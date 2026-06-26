import React, { useState, useEffect, useCallback } from "react";

interface TabBettingLogProps {
    userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface BettingLog {
    id: number;
    no: number;
    transactionID: string;
    vendor: string;
    gameType: string;
    tableName: string;
    betMoney: number;
    winMoney: number;
    betStatusDisplay: string;
    betTime: string;
}

interface BettingSummary {
    totalBetMoney: number;
    totalWinMoney: number;
    totalEmptyBetMoney: number;
    totalEmptyWinMoney: number;
}

interface PaginationData {
    totalPages: number;
}

export default function TabBettingLog({ userIdx }: TabBettingLogProps) {
    const [filterType, setFilterType] = useState("casino");
    const [logs, setLogs] = useState<BettingLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [vendorIdx, setVendorIdx] = useState("");
    const [summary, setSummary] = useState<BettingSummary | null>(null);
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const fetchLogs = useCallback(async () => {
        if (!userIdx) return;
        setLoading(true);
        try {
            let endpoint = "/api/admin/casino-betting";
            if (filterType === "slot") endpoint = "/api/admin/slot-betting";
            // Add other types as needed

            const query = new URLSearchParams({
                userIdx,
                page: page.toString(),
                pageSize,
                startDate,
                endDate,
                vendorIdx
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
            console.error("Failed to fetch betting logs:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, filterType, page, pageSize]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return (
        <div>
            {/* Filter Buttons & Summary */}
            <div className="row mb-2">
                <div className="col">
                    <div className="row">
                        <div className="col mb-2">
                            <div className="d-flex align-items-center">
                                <div className="btn-group">
                                    <button
                                        className={`btn ${filterType === 'casino' ? 'btn-success' : 'btn-secondary'} text-white`}
                                        onClick={() => { setFilterType('casino'); setPage(1); }}
                                    >
                                        카지노
                                    </button>
                                    <button
                                        className={`btn ${filterType === 'slot' ? 'btn-success' : 'btn-secondary'} text-white`}
                                        onClick={() => { setFilterType('slot'); setPage(1); }}
                                    >
                                        슬롯
                                    </button>
                                    <button
                                        className={`btn ${filterType === 'board' ? 'btn-success' : 'btn-secondary'} text-white`}
                                        onClick={() => { setFilterType('board'); setPage(1); }}
                                        disabled
                                    >
                                        보드게임
                                    </button>
                                    <button
                                        className={`btn ${filterType === 'arcade' ? 'btn-success' : 'btn-secondary'} text-white`}
                                        onClick={() => { setFilterType('arcade'); setPage(1); }}
                                        disabled
                                    >
                                        미니게임
                                    </button>
                                    <button
                                        className={`btn ${filterType === 'sport' ? 'btn-success' : 'btn-secondary'} text-white`}
                                        onClick={() => { setFilterType('sport'); setPage(1); }}
                                        disabled
                                    >
                                        스포츠
                                    </button>
                                </div>
                                <div className="ms-auto align-self-center d-flex gap-3 fw-bold">
                                    <span>
                                        베팅금액 : <span className="text-primary">{summary?.totalBetMoney?.toLocaleString() || 0}</span>원
                                    </span>
                                    <span>
                                        당첨금액 : <span className="text-success">{summary?.totalWinMoney?.toLocaleString() || 0}</span>원
                                    </span>
                                    <span>
                                        공베팅금 : <span className="text-primary">{summary?.totalEmptyBetMoney?.toLocaleString() || 0}</span>
                                    </span>
                                    <span>
                                        공당첨금 : <span className="text-danger">{summary?.totalEmptyWinMoney?.toLocaleString() || 0}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className="d-flex bg-white p-2 rounded border">
                        <form className="w-100" onSubmit={(e) => { e.preventDefault(); fetchLogs(); }}>
                            <div className="d-flex align-items-center">
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
                                <div className="input-group me-2" style={{ width: 310 }}>
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
                                    name="vendorIdx"
                                    className="form-select w-auto me-2"
                                    value={vendorIdx}
                                    onChange={(e) => setVendorIdx(e.target.value)}
                                >
                                    <option value="">전체 벤더</option>
                                    <option value="1">에볼루션</option>
                                    <option value="2">프라그마틱</option>
                                </select>
                                <button type="submit" className="btn btn-lime">
                                    <i className="fa-solid fa-magnifying-glass me-2" />
                                    검색
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="row">
                <div className="col">
                    <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                            <tr>
                                <th>No.</th>
                                <th>트랜잭션ID</th>
                                <th>벤더</th>
                                <th>게임타입</th>
                                <th>테이블명</th>
                                <th>베팅액</th>
                                <th>당첨금</th>
                                <th>비고</th>
                                <th>베팅시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={9}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={9}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: BettingLog) => (
                                <tr key={log.id}>
                                    <td>{log.no}</td>
                                    <td>{log.transactionID}</td>
                                    <td>{log.vendor}</td>
                                    <td>{log.gameType}</td>
                                    <td>{log.tableName}</td>
                                    <td className="text-primary">{log.betMoney?.toLocaleString()}</td>
                                    <td className="text-success">{log.winMoney?.toLocaleString()}</td>
                                    <td>{log.betStatusDisplay}</td>
                                    <td>{log.betTime}</td>
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
