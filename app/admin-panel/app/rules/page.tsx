"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "@/components/Layout";
import RichTextEditor from "@/components/RichTextEditor";

const BACKEND_URL = ""; // Use relative path for proxy

interface Rule {
  id: number;
  category: string;
  title: string;
  content: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt?: string;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function PageContent() {
  const contentPreview = useCallback((html: string) => {
    const text = (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    return text.length > 120 ? `${text.slice(0, 120)}...` : text;
  }, []);

  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchType, setSearchType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState<string>("");

  const totalPages = useMemo(() => {
    const ps = parseInt(pageSize, 10) || 20;
    return Math.max(1, Math.ceil(total / ps));
  }, [total, pageSize]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<Rule | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    isActive: true,
    displayOrder: 0,
  });

  const [formContent, setFormContent] = useState("");

  const fetchRules = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize,
      });
      if (searchText.trim()) {
        if (searchType === "title" || searchType === "content" || searchType === "all") {
          params.set("searchType", searchType);
          params.set("searchText", searchText.trim());
        }
      }
      if (active === "true" || active === "false") {
        params.set("active", active);
      }
      const response = await fetch(`${BACKEND_URL}/api/admin/rules?${params.toString()}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRules(data.items || []);
      setCurrentPage(data.page || page);
      setTotal(data.total || 0);
    } catch (e: any) {
      setError(e.message);
      setRules([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [pageSize, searchText, searchType, active]);

  useEffect(() => {
    fetchRules(currentPage);
  }, [fetchRules, pageSize, active, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRules(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchRules(page);
  };

  const openCreateModal = () => {
    setCurrentRule(null);
    setFormData({ category: "", title: "", content: "", isActive: true, displayOrder: 0 });
    setFormContent("");
    setIsModalOpen(true);
  };

  const openEditModal = (rule: Rule) => {
    setCurrentRule(rule);
    setFormData({
      category: rule.category,
      title: rule.title,
      content: rule.content,
      isActive: rule.isActive,
      displayOrder: rule.displayOrder,
    });
    setFormContent(rule.content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRule(null);
    setFormData({ category: "", title: "", content: "", isActive: true, displayOrder: 0 });
    setFormContent("");
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "displayOrder" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.category.trim()) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    // For RichTextEditor, content might contain HTML tags like <p><br></p>
    // We check if there's any actual text content or images
    const strippedContent = formContent.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent && !formContent.includes("<img")) {
      alert("내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    const method = currentRule ? "PUT" : "POST";
    const url = currentRule
      ? `${BACKEND_URL}/api/admin/rules/${currentRule.id}`
      : `${BACKEND_URL}/api/admin/rules`;

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, content: formContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      closeModal();
      fetchRules(currentPage);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("규칙을 삭제하시겠습니까?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/rules/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchRules(currentPage);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleActiveToggle = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/rules/${id}/active`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setRules((prev) =>
        prev.map((rule) => (rule.id === id ? { ...rule, isActive } : rule))
      );
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDisplayOrderChange = (id: number, newOrder: number) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id ? { ...rule, displayOrder: newOrder } : rule
      )
    );
  };

  const handleDisplayOrderSave = async (id: number, displayOrder: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/rules/${id}/order`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayOrder }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchRules(currentPage);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="page-header">
        <i className="fa fa-gavel me-2"></i>규칙 관리
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2 ">
            <form onSubmit={handleSearch}>
              <div className="d-flex align-items-center">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-120px me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                </select>

                <select
                  name="active"
                  className="form-select w-120px me-2"
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <option value="">상태 전체</option>
                  <option value="true">운영중</option>
                  <option value="false">중지</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  className="form-control w-200px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime d-flex align-items-center justify-content-center" type="submit" style={{ width: "100%" }}>
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <button className="btn btn-primary btn-sm" onClick={openCreateModal}>
                <i className="fas fa-edit me-2"></i>규칙 등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th className="w-80px">No.</th>
                  <th className="w-150px">카테고리</th>
                  <th className="w-150px">제목</th>
                  <th style={{ width: "40%" }}>내용</th>
                  <th className="w-100px">순서</th>
                  <th className="w-100px">상태</th>
                  <th className="w-160px">작성일자</th>
                  <th className="w-160px">관리</th>
                </tr>
              </thead>
              <tbody>
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      규칙이 없습니다.
                    </td>
                  </tr>
                ) : (
                  rules.map((rule, index) => (
                    <tr key={rule.id}>
                      <td>{(currentPage - 1) * parseInt(pageSize) + index + 1}</td>
                      <td>{rule.category}</td>
                      <td>{rule.title}</td>
                      <td className="text-start">
                        <a
                          href="javascript:void(0)"
                          onClick={() => openEditModal(rule)}
                          className="text-decoration-none"
                        >
                          {contentPreview(rule.content)}
                        </a>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={rule.displayOrder}
                          onChange={(e) =>
                            handleDisplayOrderChange(rule.id, parseInt(e.target.value))
                          }
                          onBlur={() => handleDisplayOrderSave(rule.id, rule.displayOrder)}
                        />
                      </td>
                      <td className="p-1">
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={rule.isActive}
                            onChange={(e) => handleActiveToggle(rule.id, e.target.checked)}
                          />
                        </div>
                      </td>
                      <td>{new Date(rule.createdAt).toLocaleString()}</td>
                      <td className="p-1">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => openEditModal(rule)}
                          >
                            <i className="fa fa-pencil-alt me-1"></i>수정
                          </button>
                          <button
                            className="btn btn-sm btn-danger text-white"
                            onClick={() => handleDelete(rule.id)}
                          >
                            <i className="fa fa-trash-alt me-1"></i>삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <ul className="pagination m-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={() => handlePageChange(1)}
              >
                <i className="fa fa-angle-double-left"></i>
              </a>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="fa fa-angle-left"></i>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                  >
                    <a
                      className="page-link"
                      href="javascript:void(0)"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              }
              if (
                (page === currentPage - 3 && currentPage - 3 > 1) ||
                (page === currentPage + 3 && currentPage + 3 < totalPages)
              ) {
                return (
                  <li key={page} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                );
              }
              return null;
            })}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="fa fa-angle-right"></i>
              </a>
            </li>
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={() => handlePageChange(totalPages)}
              >
                <i className="fa fa-angle-double-right"></i>
              </a>
            </li>
          </ul>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal fade show"
          tabIndex={-1}
          data-bs-backdrop="static"
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="panel panel-inverse mb-0">
                <div className="panel-heading ui-draggable-handle">
                  <h4 className="panel-title">
                    <span className="me-2 pull-left">
                      <i className="fa fa-gavel"></i>
                    </span>
                    <span>{currentRule ? "규칙 수정" : "규칙 등록"}</span>
                  </h4>
                  <div className="panel-heading-btn">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-xs btn-icon btn-danger"
                      onClick={closeModal}
                    >
                      <i className="fa fa-times"></i>
                    </a>
                  </div>
                </div>
                <div className="panel-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">카테고리</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={formData.category}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">제목</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={formData.title}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">내용</label>
                      <div className="col-md-9">
                        <RichTextEditor
                          value={formContent}
                          onChange={setFormContent}
                          height="300px"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">순서</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          name="displayOrder"
                          value={formData.displayOrder}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">운영 여부</label>
                      <div className="col-md-9">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary width-65"
                        disabled={loading}
                      >
                        <i className="fa fa-save me-1"></i>
                        {currentRule ? "수정" : "등록"}
                      </button>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-danger width-65 ms-2"
                        onClick={closeModal}
                      >
                        <i className="fa fa-times me-1"></i>취소
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default function RulesPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  );
}
