"use client";

import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import RichTextEditor from "@/components/RichTextEditor";

const BACKEND_URL = ""; // Use relative path for proxy

interface FaqItem {
  id: number;
  category: string;
  title: string;
  content: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchType, setSearchType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [formCategory, setFormCategory] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formDisplayOrder, setFormDisplayOrder] = useState<string>("0");
  const [formIsActive, setFormIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const totalPages = useMemo(() => {
    const ps = parseInt(pageSize, 10) || 20;
    return Math.max(1, Math.ceil(total / ps));
  }, [total, pageSize]);

  const fetchFaqs = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize,
      });
      if (searchText.trim()) {
        if (searchType === "title" || searchType === "category" || searchType === "all") {
          params.set("searchType", searchType);
          params.set("searchText", searchText.trim());
        }
      }
      if (active === "true" || active === "false") {
        params.set("active", active);
      }
      const res = await fetch(`${BACKEND_URL}/api/admin/faqs?${params.toString()}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setItems(data.items || []);
      setCurrentPage(data.page || page);
      setTotal(data.total || 0);
    } catch (e) {
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs(1);
  }, [pageSize, active]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFaqs(1);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormCategory("");
    setFormTitle("");
    setFormContent("");
    setFormDisplayOrder("0");
    setFormIsActive(true);
    setModalOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormContent(item.content || "");
    setFormDisplayOrder(String(item.displayOrder ?? 0));
    setFormIsActive(!!item.isActive);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitting(false);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formCategory.trim()) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    if (!formTitle.trim()) {
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

    setSubmitting(true);
    try {
      const payload = {
        category: formCategory.trim(),
        title: formTitle.trim(),
        content: formContent,
        displayOrder: Number(formDisplayOrder) || 0,
        isActive: !!formIsActive,
      };
      const url = editingItem
        ? `${BACKEND_URL}/api/admin/faqs/${editingItem.id}`
        : `${BACKEND_URL}/api/admin/faqs`;
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      closeModal();
      fetchFaqs(currentPage);
    } catch (err) {
      setSubmitting(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("FAQ를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/faqs/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      fetchFaqs(currentPage);
    } catch (err) {}
  };

  const updateActive = async (id: number, next: boolean) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/faqs/${id}/active`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, isActive: next } : it))
      );
    } catch (err) {}
  };

  const updateOrder = async (id: number, nextOrder: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/faqs/${id}/order`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: nextOrder }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setItems((prev) =>
        prev
          .map((it) => (it.id === id ? { ...it, displayOrder: nextOrder } : it))
          .sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id)
      );
    } catch (err) {}
  };

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return iso.replace("T", " ").slice(0, 19);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/faq">
          <i className="fa fa-question-circle me-2"></i>FAQ 관리
        </a>
        <small></small>
      </h1>

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
                  <option value="category">카테고리</option>
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

                <button className="btn btn-lime d-flex align-items-center justify-content-center" type="submit" style={{width: "100%"}}>
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <button className="btn btn-primary btn-sm" onClick={openCreate}>
                <i className="fas fa-edit me-2"></i>FAQ 등록
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
                  <th style={{ width: "40%" }}>제목</th>
                  <th className="w-100px">순서</th>
                  <th className="w-100px">상태</th>
                  <th className="w-160px">작성일자</th>
                  <th className="w-160px">관리</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-4">
                      FAQ가 없습니다.
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td>{it.category}</td>
                      <td className="text-start">
                        <a
                          href="javascript:void(0)"
                          onClick={() => openEdit(it)}
                          className="text-decoration-none"
                        >
                          {it.title}
                        </a>
                      </td>
                      <td className="p-1">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={it.displayOrder ?? 0}
                            onChange={(e) => {
                              const next = Number(e.target.value) || 0;
                              setItems((prev) =>
                                prev.map((x) =>
                                  x.id === it.id
                                    ? { ...x, displayOrder: next }
                                    : x
                                )
                              );
                            }}
                            onBlur={(e) =>
                              updateOrder(it.id, Number(e.target.value) || 0)
                            }
                          />
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={it.isActive}
                            onChange={(e) => updateActive(it.id, e.target.checked)}
                          />
                        </div>
                      </td>
                      <td>{formatDate(it.createdAt)}</td>
                      <td className="p-1">
                        <div className="btn-group">
                          <a
                            href="javascript:void(0)"
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => openEdit(it)}
                          >
                            <i className="fa fa-pencil-alt me-1"></i>수정
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn btn-sm btn-danger text-white"
                            onClick={() => deleteItem(it.id)}
                          >
                            <i className="fa fa-trash-alt me-1"></i>삭제
                          </a>
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
        <div className="row mt-3">
          <div className="col text-center">
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => {
                      const next = Math.max(1, currentPage - 1);
                      setCurrentPage(next);
                      fetchFaqs(next);
                    }}
                    disabled={currentPage === 1}
                  >
                    이전
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      (p >= currentPage - 2 && p <= currentPage + 2)
                  )
                  .map((p, idx, arr) => (
                    <span key={p} className="d-inline-flex">
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                      <li className={`page-item ${currentPage === p ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => {
                            setCurrentPage(p);
                            fetchFaqs(p);
                          }}
                        >
                          {p}
                        </button>
                      </li>
                    </span>
                  ))}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      const next = Math.min(totalPages, currentPage + 1);
                      setCurrentPage(next);
                      fetchFaqs(next);
                    }}
                    disabled={currentPage === totalPages}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {modalOpen && (
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
                      <i className="fa fa-question-circle"></i>
                    </span>
                    <span>{editingItem ? "FAQ 수정" : "FAQ 등록"}</span>
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
                  <form onSubmit={submitForm}>
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-3">카테고리</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
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
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
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
                          value={formDisplayOrder}
                          onChange={(e) => setFormDisplayOrder(e.target.value)}
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
                            checked={formIsActive}
                            onChange={(e) => setFormIsActive(e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary width-65"
                        disabled={submitting}
                      >
                        <i className="fa fa-save me-1"></i>
                        {editingItem ? "수정" : "등록"}
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
    </Layout>
  );
}
