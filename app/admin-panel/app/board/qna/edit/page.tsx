"use client";

import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Load RichTextEditor dynamically (client-side only)
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <p>Editor를 불러오는 중...</p>,
});

const BACKEND_URL = ""; // Use relative path for proxy

interface FormData {
    boardType: string;
    boardTitle: string;
    boardTitleColor: string;
    boardTitleWeight: string;
    boardContent: string;
    noticeTopYN: boolean;
    boardSort: string;
    viewDate: string;
    noticePopupYN: boolean;
    boardUserDel: boolean;
    replyContent: string;
}

function QnaEditPopupPageInner() {
    const searchParams = useSearchParams();
    const boardIdx = searchParams.get("boardIdx");

    const [formData, setFormData] = useState<FormData>({
        boardType: "qna",
        boardTitle: "",
        boardTitleColor: "#000000",
        boardTitleWeight: "",
        boardContent: "",
        noticeTopYN: false,
        boardSort: "",
        viewDate: "",
        noticePopupYN: false,
        boardUserDel: false,
        replyContent: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [replyTemplates, setReplyTemplates] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");

    useEffect(() => {
        if (boardIdx) {
            fetchBoardData();
            fetchReplyTemplates();
        }
    }, [boardIdx]);

    const fetchReplyTemplates = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/boards?boardType=reply`, {
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setReplyTemplates(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    const fetchBoardData = async () => {
        if (!boardIdx) return;

        setFetching(true);
        try {
            const response = await fetch(
                `${BACKEND_URL}/api/admin/boards/${boardIdx}`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch board data");
            }

            const result = await response.json();
            const data = result.data;

            // Extract plain title and styling from HTML
            let plainTitle = data.subject;
            let titleColor = "#000000";
            let titleWeight = "";

            // Parse HTML span if exists
            const spanMatch = data.subject.match(
                /<span style="([^"]+)">([^<]+)<\/span>/
            );
            if (spanMatch) {
                const styles = spanMatch[1];
                plainTitle = spanMatch[2];

                const colorMatch = styles.match(/color:([^;]+)/);
                if (colorMatch) {
                    titleColor = colorMatch[1];
                }

                if (styles.includes("font-weight:bold")) {
                    titleWeight = "bold";
                }
            }

            setFormData({
                boardType: data.boardType,
                boardTitle: plainTitle,
                boardTitleColor: titleColor,
                boardTitleWeight: titleWeight,
                boardContent: data.content || "",
                noticeTopYN: data.isPinned === "Y",
                boardSort: data.displayOrder?.toString() || "",
                viewDate: data.displayDate
                    ? data.displayDate.replace(" ", "T").slice(0, 16)
                    : "",
                noticePopupYN: data.isPopup === "Y",
                boardUserDel: data.isDisabled === "Y",
                replyContent: data.replyContent || "",
            });
        } catch (err: any) {
            setError("게시글을 불러오는데 실패했습니다.");
            console.error("Error fetching board:", err);
        } finally {
            setFetching(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const formatDateTimeForSubmit = (dateStr: string): string => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = "00";

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.boardTitle.trim()) {
            setError("제목을 입력해주세요.");
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                boardType: formData.boardType,
                boardTitle: formData.boardTitle,
                boardTitleColor:
                    formData.boardTitleColor !== "#000000"
                        ? formData.boardTitleColor
                        : "",
                boardTitleWeight: formData.boardTitleWeight,
                boardContent: formData.boardContent,
                noticeTopYN: formData.noticeTopYN,
                boardSort: formData.boardSort,
                viewDate: formData.viewDate
                    ? formatDateTimeForSubmit(formData.viewDate)
                    : "",
                noticePopupYN: formData.noticePopupYN,
                boardUserDel: formData.boardUserDel,
                replyContent: formData.replyContent,
            };

            const response = await fetch(
                `${BACKEND_URL}/api/admin/boards/${boardIdx}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submitData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "게시글 수정에 실패했습니다.");
            }

            alert("게시글이 수정되었습니다.");
            if (window.opener) {
                window.opener.location.reload();
            }
            window.close();
        } catch (err: any) {
            setError(err.message || "게시글 수정 중 오류가 발생했습니다.");
            console.error("Error updating board:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateId = e.target.value;
        setSelectedTemplate(templateId);
        
        if (templateId) {
            const template = replyTemplates.find(t => t.id.toString() === templateId);
            if (template) {
                setFormData(prev => ({
                    ...prev,
                    replyContent: template.content || ""
                }));
            }
        }
    };

    if (fetching) {
        return (
            <div id="app" className="app" style={{ height: "inherit" }}>
                <div className="panel panel-inverse" style={{ height: "inherit" }}>
                    <div className="panel-body text-center p-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="app" className="app" style={{ height: "inherit" }}>
            <div className="panel panel-inverse" style={{ height: "inherit" }}>
                <div className="panel-heading">
                    <h4 className="panel-title text-center">
                        <i className="fa fa-question-circle me-2"></i>문의 수정
                    </h4>
                    <div className="panel-heading-btn"></div>
                </div>
                <div className="panel-body bg-gray-200">
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show mb-3">
                            <strong>오류!</strong> {error}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError(null)}
                                aria-label="Close"
                            ></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-2">
                            <label className="col-form-label col-md-2 text-center bg-gray-100 fw-bold">
                                제목<span className="text-danger">*</span>
                            </label>
                            <div className="col-md-10 d-flex align-items-center">
                                <div className="col-form-label w-auto py-1 me-2">
                                    <input
                                        type="color"
                                        name="boardTitleColor"
                                        className="form-control form-control-color"
                                        value={formData.boardTitleColor}
                                        onChange={handleInputChange}
                                        title="제목 색상 선택"
                                    />
                                </div>
                                <select
                                    name="boardTitleWeight"
                                    className="form-select w-auto me-2"
                                    value={formData.boardTitleWeight}
                                    onChange={handleInputChange}
                                >
                                    <option value="">보통</option>
                                    <option value="bold">굵게</option>
                                </select>
                                <div className="col">
                                    <input
                                        type="text"
                                        name="boardTitle"
                                        className="form-control"
                                        value={formData.boardTitle}
                                        onChange={handleInputChange}
                                        placeholder="제목을 입력하세요"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-form-label col-md-2 text-center bg-gray-100 fw-bold">
                                문의 내용
                            </label>
                            <div className="col-md-10">
                                <div className="p-3 bg-white border" style={{ minHeight: "150px", maxHeight: "300px", overflowY: "auto" }} dangerouslySetInnerHTML={{ __html: formData.boardContent }} />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-form-label col-md-2 text-center bg-gray-100 fw-bold">
                                답변 템플릿
                            </label>
                            <div className="col-md-10">
                                <select 
                                    className="form-select w-auto" 
                                    value={selectedTemplate}
                                    onChange={handleTemplateChange}
                                >
                                    <option value="">템플릿 선택</option>
                                    {replyTemplates.map(t => (
                                        <option key={t.id} value={t.id}>{t.subject}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-form-label col-md-2 text-center bg-gray-100 fw-bold">
                                답변 작성
                            </label>
                            <div className="col-md-10">
                                <RichTextEditor
                                    value={formData.replyContent}
                                    onChange={(data) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            replyContent: data,
                                        }))
                                    }
                                    height="300px"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <React.Fragment>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            처리중...
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-save me-2"></i>
                                            저장
                                        </React.Fragment>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-gray ms-2"
                                    onClick={() => window.close()}
                                    disabled={loading}
                                >
                                    <i className="fa-solid fa-xmark me-2"></i>
                                    닫기
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function QnaEditPopupPage() {
  return (
    <Suspense fallback={null}>
      <QnaEditPopupPageInner />
    </Suspense>
  );
}
