import React, { useState, useEffect, useCallback } from "react";

interface TabChangeLogProps {
    userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface ChangeLog {
    id: number;
    change_item: string;
    before_value: string;
    after_value: string;
    ip_address: string;
    processor_name: string;
    updated_at: string;
}

interface PaginationData {
    totalPages: number;
}

export default function TabChangeLog({ userIdx }: TabChangeLogProps) {
    const [logs, setLogs] = useState<ChangeLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const fetchLogs = useCallback(async () => {
        if (!userIdx) return;
        setLoading(true);
        try {
            const query = new URLSearchParams({
                userIdx,
                page: page.toString(),
                pageSize,
                startDate,
                endDate
            }).toString();

            const response = await fetch(`${BACKEND_URL}/api/admin/user-edit-logs?${query}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                setLogs(result.data);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch change logs:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, page, pageSize, startDate, endDate]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchLogs();
    };

    return (
        <div>
            <div className="row mb-2">
                <div className="col">
                    <div className="d-flex bg-white p-2 border rounded align-items-center">
                        <form className="w-100 d-flex align-items-center" onSubmit={handleSearch}>
                            <select
                                name="pageSize"
                                className="form-select w-80px me-2"
                                value={pageSize}
                                onChange={(e) => setPageSize(e.target.value)}
                            >
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <input
                                type="date"
                                className="form-control w-150px me-2"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span className="me-2">~</span>
                            <input
                                type="date"
                                className="form-control w-150px me-2"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-lime"
                            >
                                <i className="fa-solid fa-magnifying-glass me-2" />
                                검색
                            </button>
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
                                <th>변경 항목</th>
                                <th>변경 전</th>
                                <th>변경 후</th>
                                <th>아이피</th>
                                <th>처리자</th>
                                <th>수정시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={7}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: ChangeLog, index: number) => (
                                <tr key={log.id}>
                                    <td>{((page - 1) * parseInt(pageSize)) + index + 1}</td>
                                    <td>{log.change_item}</td>
                                    <td className="text-danger">{log.before_value || "-"}</td>
                                    <td className="text-primary">{log.after_value || "-"}</td>
                                    <td>{log.ip_address || "-"}</td>
                                    <td>{log.processor_name || "시스템"}</td>
                                    <td>{new Date(log.updated_at).toLocaleString()}</td>
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
