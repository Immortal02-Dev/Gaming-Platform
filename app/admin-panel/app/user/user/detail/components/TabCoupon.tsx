import React, { useState, useEffect, useCallback } from "react";

interface TabCouponProps {
    userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface CouponLog {
    id: number;
    subject: string;
    amount: number;
    status: string;
    register_id_display: string;
    register_date: string;
    use_date: string | null;
    expire_date: string;
}

interface CouponSummary {
    waitAmount: number;
    useAmount: number;
    cancelAmount: number;
    expireAmount: number;
}

interface PaginationData {
    totalPages: number;
}

export default function TabCoupon({ userIdx }: TabCouponProps) {
    const [logs, setLogs] = useState<CouponLog[]>([]);
    const [summary, setSummary] = useState<CouponSummary | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchDateType, setSearchDateType] = useState("register");
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
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
                endDate,
                searchDateType,
                searchText,
                searchType
            }).toString();

            const response = await fetch(`${BACKEND_URL}/api/admin/coupons?${query}`, {
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
            console.error("Failed to fetch coupons:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, page, pageSize, startDate, endDate, searchDateType, searchText, searchType]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchLogs();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "0": return <span className="badge bg-warning text-dark">대기</span>;
            case "1": return <span className="badge bg-success">사용</span>;
            case "2": return <span className="badge bg-danger">취소</span>;
            case "3": return <span className="badge bg-secondary">만료</span>;
            default: return status;
        }
    };

    return (
        <div>
            {summary && (
                <div className="row mb-3 text-center">
                    <div className="col-3">
                        <div className="bg-light p-2 border rounded">
                            <div className="small text-muted">대기 금액</div>
                            <div className="fw-bold text-warning">{summary.waitAmount?.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="bg-light p-2 border rounded">
                            <div className="small text-muted">사용 금액</div>
                            <div className="fw-bold text-success">{summary.useAmount?.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="bg-light p-2 border rounded">
                            <div className="small text-muted">취소 금액</div>
                            <div className="fw-bold text-danger">{summary.cancelAmount?.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="bg-light p-2 border rounded">
                            <div className="small text-muted">만료 금액</div>
                            <div className="fw-bold text-secondary">{summary.expireAmount?.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mb-2">
                <div className="col-12">
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
                            <div className="input-group me-2" style={{ width: 335 }}>
                                <select
                                    name="searchDateType"
                                    className="form-select"
                                    style={{ paddingRight: 0 }}
                                    value={searchDateType}
                                    onChange={(e) => setSearchDateType(e.target.value)}
                                >
                                    <option value="register">지급일</option>
                                    <option value="use">사용일</option>
                                    <option value="expire">만료일</option>
                                </select>
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
                                name="searchType"
                                className="form-select me-2"
                                style={{ width: 100, paddingRight: 0 }}
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option value="">항목</option>
                                <option value="subject">쿠폰 제목</option>
                            </select>
                            <input
                                type="text"
                                className="form-control w-150px me-2"
                                placeholder="검색"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-lime"
                            >
                                <i className="fa-solid fa-magnifying-glass me-2" />
                                검색
                            </button>
                        </form>
                        <div className="ms-auto">
                            <button type="button" className="btn btn-primary" onClick={() => alert("Issue Coupon")}>
                                <i className="fa-solid fa-credit-card me-2" />
                                발급
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                            <tr>
                                <th>No.</th>
                                <th>쿠폰 제목</th>
                                <th>쿠폰 금액</th>
                                <th>쿠폰 상태</th>
                                <th>지급한 관리자</th>
                                <th>지급일시</th>
                                <th>사용일시</th>
                                <th>만료날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={8}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={8}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: CouponLog, index: number) => (
                                <tr key={log.id}>
                                    <td>{((page - 1) * parseInt(pageSize)) + index + 1}</td>
                                    <td className="text-start ps-3">{log.subject}</td>
                                    <td className="text-end pe-3">{log.amount?.toLocaleString()}</td>
                                    <td>{getStatusBadge(log.status)}</td>
                                    <td>{log.register_id_display || "-"}</td>
                                    <td>{new Date(log.register_date).toLocaleString()}</td>
                                    <td>{log.use_date ? new Date(log.use_date).toLocaleString() : "-"}</td>
                                    <td>{new Date(log.expire_date).toLocaleDateString()}</td>
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
