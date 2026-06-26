import React, { useState, useEffect, useCallback } from "react";

interface TabPointLogProps {
    userIdx: string | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface PointLog {
    id: number;
    no: number;
    logTypeGroup: string;
    logType: string;
    beforeAmount: number;
    amountDisplay: string;
    amountClass: string;
    afterAmount: number;
    memo: string;
    transactionDate: string;
}

interface PaginationData {
    totalPages: number;
}

export default function TabPointLog({ userIdx }: TabPointLogProps) {
    const [logTypeGroup, setLogTypeGroup] = useState("");
    const [logType, setLogType] = useState("");
    const [logs, setLogs] = useState<PointLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchText, setSearchText] = useState("");

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
                logTypeGroupIdx: logTypeGroup,
                logTypeIdx: logType,
                searchText
            }).toString();

            const response = await fetch(`${BACKEND_URL}/api/admin/point-logs?${query}`, {
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
            console.error("Failed to fetch point logs:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, page, pageSize, startDate, endDate, logTypeGroup, logType, searchText]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // Mapping for dependent dropdowns
    // 9=Event, 10=Commission, 11=Admin, 12=PointConvert
    const logTypes = [
        { value: "15", label: "출석 체크", group: "9" },
        { value: "16", label: "첫충", group: "9" },
        { value: "17", label: "매충", group: "9" },
        { value: "18", label: "베팅", group: "10" },
        { value: "19", label: "베팅 취소", group: "10" },
        { value: "20", label: "관리자 지급", group: "11" },
        { value: "21", label: "관리자 회수", group: "11" },
        { value: "22", label: "유저웹 포인트 전환", group: "12" },
        { value: "23", label: "회원 가입", group: "9" },
        { value: "24", label: "타이", group: "10" },
        { value: "25", label: "돌발 이벤트", group: "9" },
        { value: "26", label: "가입 첫충", group: "9" },
        { value: "27", label: "회원 콤프", group: "10" },
        { value: "28", label: "회원 콤프 취소", group: "10" },
        { value: "29", label: "회원 콤프 타이 취소", group: "10" },
        { value: "38", label: "파트너웹 포인트 전환", group: "12" },
        { value: "42", label: "루징 수수료", group: "10" },
        { value: "43", label: "낙첨 수수료", group: "10" },
        { value: "44", label: "낙첨 수수료 취소", group: "10" },
        { value: "46", label: "페이백 지급", group: "10" },
        { value: "47", label: "통합 충전 보너스", group: "9" },
    ];

    const filteredLogTypes = logTypeGroup
        ? logTypes.filter((t) => t.group === logTypeGroup)
        : logTypes;

    return (
        <div>
            <div className="row mb-2">
                <div className="col">
                    <div className="d-flex bg-white p-2 rounded border">
                        <form className="w-100" onSubmit={(e) => { e.preventDefault(); fetchLogs(); }}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <select
                                        name="pageSize"
                                        className="form-select w-80px me-2"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(e.target.value)}
                                    >
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="1000">1,000</option>
                                    </select>
                                </div>
                                <div className="col-auto">
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
                                </div>
                                <div className="col-auto">
                                    <select
                                        className="form-select me-2"
                                        style={{ width: 130 }}
                                        value={logTypeGroup}
                                        onChange={(e) => {
                                            setLogTypeGroup(e.target.value);
                                            setLogType("");
                                        }}
                                    >
                                        <option value="">구분</option>
                                        <option value="9">이벤트</option>
                                        <option value="10">수수료</option>
                                        <option value="11">관리자</option>
                                        <option value="12">포인트 전환</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <select
                                        className="form-select me-2"
                                        style={{ width: 130 }}
                                        value={logType}
                                        onChange={(e) => setLogType(e.target.value)}
                                    >
                                        <option value="">구분 내용</option>
                                        {filteredLogTypes.map((t) => (
                                            <option key={t.value} value={t.value}>
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="로그 메모 검색"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-lime">
                                        <i className="fa-solid fa-magnifying-glass me-2" />
                                        검색
                                    </button>
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
                                <th>구분 내용</th>
                                <th>이전 금액</th>
                                <th>신청 금액</th>
                                <th>이후 금액</th>
                                <th>메모</th>
                                <th>거래일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={8}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={8}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: PointLog) => (
                                <tr key={log.id}>
                                    <td>{log.no}</td>
                                    <td>{log.logTypeGroup}</td>
                                    <td>{log.logType}</td>
                                    <td>{log.beforeAmount}</td>
                                    <td className={log.amountClass}>{log.amountDisplay}</td>
                                    <td>{log.afterAmount}</td>
                                    <td>{log.memo}</td>
                                    <td>{log.transactionDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagination && pagination.totalPages > 1 && (
                        <div className="d-flex justify-content-center">
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
