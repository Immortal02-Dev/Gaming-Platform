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

function BoardWritePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [error, setError] = useState<string | null>(null);

  // Read boardType from URL parameter on mount
  useEffect(() => {
    const boardTypeParam = searchParams.get("boardType");
    if (boardTypeParam) {
      setFormData((prev) => ({
        ...prev,
        boardType: boardTypeParam,
      }));
    }
  }, [searchParams]);

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

  const handleBoardTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      boardType: value,
    }));
  };

  const formatDateTimeForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    // Convert "YYYY-MM-DD HH:mm:ss" to "YYYY-MM-DDTHH:mm"
    return dateStr.replace(" ", "T").slice(0, 16);
  };

  const formatDateTimeForSubmit = (dateStr: string): string => {
    if (!dateStr) return "";
    // Convert datetime-local format to "YYYY-MM-DD HH:mm:ss"
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

    console.log("=== Form Submission Started ===");
    console.log("Current form data:", formData);

    // Validation
    if (!formData.boardType) {
      const errorMsg = "???? ??????.";
      console.error("Validation error:", errorMsg);
      setError(errorMsg);
      return;
    }

    if (!formData.boardTitle.trim()) {
      const errorMsg = "??? ??????.";
      console.error("Validation error:", errorMsg);
      setError(errorMsg);
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

      console.log("Submitting data to backend:", submitData);
      console.log("API URL:", `${BACKEND_URL}/api/admin/boards`);

      const response = await fetch(`${BACKEND_URL}/api/admin/boards`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "??? ??? ??????.");
      }

      // Success - redirect to board list
      console.log("Board created successfully! ID:", data.data?.id);
      if (typeof window !== "undefined" && window.alert) {
        window.alert("???? ???????.");
      }
      router.push("/board");
    } catch (err: any) {
      const errorMessage = err.message || "??? ?? ? ??? ??????.";
      console.error("Error creating board:", err);
      console.error("Error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log("=== Form Submission Ended ===");
    }
  };

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
                        onChange={handleBoardTypeChange}
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
                            value={formatDateTimeForInput(formData.viewDate)}
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
                            <i className="fas fa-edit me-2"></i>
                            ???
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
export default function BoardWritePage() {
  return (
    <Suspense fallback={null}>
      <BoardWritePageInner />
    </Suspense>
  );
}
