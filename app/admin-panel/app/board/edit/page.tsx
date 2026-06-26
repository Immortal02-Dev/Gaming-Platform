"use client";

import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

// Load RichTextEditor dynamically (client-side only)
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <p>Editor? ???? ?...</p>,
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
}

function BoardEditPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardIdx = searchParams.get("boardIdx");

  const [formData, setFormData] = useState<FormData>({
    boardType: "",
    boardTitle: "",
    boardTitleColor: "#000000",
    boardTitleWeight: "",
    boardContent: "",
    noticeTopYN: false,
    boardSort: "",
    viewDate: "",
    noticePopupYN: false,
    boardUserDel: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (boardIdx) {
      fetchBoardData();
    }
  }, [boardIdx]);

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
      });
    } catch (err: any) {
      setError("???? ????? ??????.");
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
      setError("??? ??????.");
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
        throw new Error(data.message || "??? ??? ??????.");
      }

      if (typeof window !== "undefined" && window.alert) {
        window.alert("???? ???????.");
      }
      router.push("/board");
    } catch (err: any) {
      setError(err.message || "??? ?? ? ??? ??????.");
      console.error("Error updating board:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Layout>
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  const showConditionalFields = formData.boardType !== "reply";

  return (
    <Layout>
      <div>
        <h1 className="page-header">
          <i className="fa fa-tasks me-2"></i>
          ??? ??
        </h1>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-3">
            <strong>??!</strong> {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row">
          <div className="col">
            <div className="panel panel-inverse">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2">
                    <i className="fas fa-edit"></i>
                  </span>
                  ??? ??
                </h4>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row mb-2">
                    <label className="col-form-label col-md-1 text-center">
                      ???<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-11">
                      <select
                        name="boardType"
                        id="boardType"
                        className="form-select w-auto"
                        value={formData.boardType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">??</option>
                        <option value="notice">????</option>
                        <option value="event">??????</option>
                        <option value="partnerNotice">??? ??</option>
                        <option value="free">?????</option>
                        <option value="popup">??</option>
                        <option value="qna">1:1??</option>
                        <option value="reply">?? ???</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label className="col-form-label col-md-1 text-center">
                      ??<span className="text-danger">*</span>
                    </label>
                    <div className="col-form-label w-auto py-1">
                      <input
                        type="color"
                        name="boardTitleColor"
                        className="form-control form-control-color"
                        value={formData.boardTitleColor}
                        onChange={handleInputChange}
                        title="?? ?? ??"
                      />
                    </div>
                    <select
                      name="boardTitleWeight"
                      className="form-select w-auto"
                      value={formData.boardTitleWeight}
                      onChange={handleInputChange}
                    >
                      <option value="">??</option>
                      <option value="bold">??</option>
                    </select>
                    <div className="col w-auto">
                      <input
                        type="text"
                        name="boardTitle"
                        className="form-control"
                        value={formData.boardTitle}
                        onChange={handleInputChange}
                        placeholder="??? ?????"
                        required
                      />
                    </div>
                  </div>

                  {showConditionalFields && (
                    <React.Fragment>
                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-1 text-center">
                          ?? ??
                        </label>
                        <div className="col-form-label col-md-11">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              name="noticeTopYN"
                              checked={formData.noticeTopYN}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-1 text-center">
                          ?? ??
                        </label>
                        <div className="col w-auto">
                          <input
                            type="number"
                            name="boardSort"
                            id="boardSort"
                            className="form-control w-100px"
                            value={formData.boardSort}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-1 text-center">
                          ????
                        </label>
                        <div className="col w-auto">
                          <input
                            type="datetime-local"
                            name="viewDate"
                            id="viewDate"
                            className="form-control"
                            value={formData.viewDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-1 text-center">
                          ?? ??
                        </label>
                        <div className="col-form-label w-auto">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              name="noticePopupYN"
                              checked={formData.noticePopupYN}
                              onChange={handleInputChange}
                            />
                          </div>
                          <label className="col-form-label ms-2">
                            (????? ?? ???? ?????)
                          </label>
                        </div>
                      </div>
                    </React.Fragment>
                  )}

                  <div className="form-group row mb-2">
                    <label className="col-form-label col-md-1 text-center">
                      ?? ??
                    </label>
                    <div className="col-form-label col-md-11">
                      <div className="form-check-inline me-0 form-switch">
                        <input
                          className="form-check-input w-35px"
                          type="checkbox"
                          name="boardUserDel"
                          checked={formData.boardUserDel}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label className="col-form-label col-md-1 text-center">
                      ??
                    </label>
                    <div className="col-md-11">
                      <RichTextEditor
                        value={formData.boardContent}
                        onChange={(data) =>
                          setFormData((prev) => ({
                            ...prev,
                            boardContent: data,
                          }))
                        }
                        height="400px"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm ms-auto"
                        disabled={loading}
                      >
                        {loading ? (
                          <React.Fragment>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            ???...
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <i className="fas fa-save me-2"></i>
                            ????
                          </React.Fragment>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm text-white ms-2"
                        onClick={() => router.back()}
                        disabled={loading}
                      >
                        <i className="fa-solid fa-xmark me-2"></i>
                        ??
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default function BoardEditPage() {
  return (
    <Suspense fallback={null}>
      <BoardEditPageInner />
    </Suspense>
  );
}
