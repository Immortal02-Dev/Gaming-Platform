import React, { useState, useEffect, useCallback } from "react";

interface TabMessageProps {
    userIdx: string | null;
    onWriteMessage?: () => void;
}

const BACKEND_URL = ""; // Use relative path for proxy

interface MessageLog {
    id: number;
    subject: string;
    isRead: boolean;
    readAt: string | null;
    createdAt: string;
}

interface PaginationData {
    totalPages: number;
}

export default function TabMessage({ userIdx, onWriteMessage }: TabMessageProps) {
    const [logs, setLogs] = useState<MessageLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("50");
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const openMessageEditPopup = (messageIdx: number) => {
        const width = 800;
        const height = 800;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
            `/message/edit?messageIdx=${messageIdx}`,
            "MessageEdit",
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };

    const fetchLogs = useCallback(async () => {
        if (!userIdx) return;
        setLoading(true);
        try {
            const query = new URLSearchParams({
                userIdx,
                page: page.toString(),
                pageSize,
                searchText,
                searchType
            }).toString();

            const response = await fetch(`${BACKEND_URL}/api/admin/messages?${query}`, {
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
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    }, [userIdx, page, pageSize, searchText, searchType]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return (
        <div>
            <div className="row mb-2">
                <div className="col">
                    <div className="d-flex bg-white p-2 rounded border">
                        <form className="w-100" onSubmit={(e) => { e.preventDefault(); fetchLogs(); }}>
                            <div className="row">
                                <div className="col">
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
                                        <select
                                            name="searchType"
                                            className="form-select w-100px me-2"
                                            value={searchType}
                                            onChange={(e) => setSearchType(e.target.value)}
                                        >
                                            <option value="">전체</option>
                                            <option value="subject">제목</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="searchText"
                                            className="form-control w-150px me-2"
                                            placeholder="검색어 입력"
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
                                        <button
                                            type="button"
                                            className="btn btn-primary ms-auto"
                                            onClick={() => onWriteMessage && onWriteMessage()}
                                        >
                                            <i className="fas fa-edit me-1" />
                                            쪽지 발송
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
                                <th>제목</th>
                                <th>확인</th>
                                <th>확인시간</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={5}>데이터가 없습니다.</td></tr>
                            ) : logs.map((log: MessageLog, index: number) => (
                                <tr key={log.id}>
                                    <td>{((page - 1) * parseInt(pageSize)) + index + 1}</td>
                                    <td className="text-start ps-3">
                                        <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); openMessageEditPopup(log.id); }}>
                                            {log.subject}
                                        </a>
                                    </td>
                                    <td>{log.isRead ? <span className="text-success">예</span> : <span className="text-danger">아니요</span>}</td>
                                    <td>{log.readAt || "-"}</td>
                                    <td>{log.createdAt}</td>
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
