"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";



const BACKEND_URL = ""; // Use relative path for proxy

interface MessageTemplate {
  id: number;
  templateName: string;
  subject: string;
  content: string;
  createdBy: number | null;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}

export default function MessageTemplatePage() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState("20");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");

  // Fetch templates from API
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/templates`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch templates: ${response.status}`);
      }

      const data = await response.json();
      setTemplates(data.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Filter templates based on search
  const filteredTemplates = templates.filter((template) => {
    if (!searchText) return true;

    if (searchType === "" || searchType === "subject") {
      return template.subject.toLowerCase().includes(searchText.toLowerCase());
    }

    return true;
  });

  // Apply pagination
  const paginatedTemplates = filteredTemplates.slice(0, parseInt(pageSize));

  // Function to open message template write popup
  const messageWrite = () => {
    const nWidth = 750;
    const nHeight = 690;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      "/message/template/write",
      "templateWrite",
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  // Function to open message template edit popup
  const messageEdit = (templateId: number) => {
    const nWidth = 750;
    const nHeight = 690;

    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      `/message/template/edit?templateId=${templateId}`,
      `templateEdit${templateId}`,
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  // Function to delete template
  const fnMessageDelete = async (templateId: number) => {
    if (!confirm("쪽지 템플릿을 삭제 하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/templates/${templateId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("템플릿이 삭제되었습니다.");
        fetchTemplates();
      } else {
        alert(result.message || "삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by filtering the templates array
  };

  return (
    <Layout>
      {/* Page Header */}
      <h1 className="page-header">
        <a href="/message/template">
          <i className="fas fa-envelope me-2"></i>쪽지 템플릿 관리
        </a>
        <small></small>
      </h1>

      {/* Search and Filter Row */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <div className="d-flex">
                <select
                  name="pageSize"
                  className="form-select w-80px me-2"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
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
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-lime" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <button
              onClick={messageWrite}
              className="btn btn-primary btn-sm ms-auto"
            >
              <i className="fas fa-edit me-2"></i>쪽지 템플릿 작성
            </button>
          </div>
        </div>
      </div>

      {/* Table Row */}
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-80px">No.</th>
                <th>제목</th>
                <th className="w-100px">상태</th>
                <th className="w-200px">작성자</th>
                <th className="w-150px">작성일자</th>
                <th className="w-80px">관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>로딩 중...</td>
                </tr>
              ) : paginatedTemplates.length === 0 ? (
                <tr>
                  <td colSpan={6}>쪽지 템플릿이 없습니다.</td>
                </tr>
              ) : (
                paginatedTemplates.map((template, index) => (
                  <tr key={template.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        href="javascript:void(0)"
                        onClick={() => messageEdit(template.id)}
                      >
                        {template.subject}
                      </a>
                    </td>
                    <td>
                      {template.isActive ? (
                        <span className="badge bg-success">사용 중</span>
                      ) : (
                        <span className="badge bg-danger">사용 안함</span>
                      )}
                    </td>
                    <td>{template.createdBy ? `관리자` : "시스템"}</td>
                    <td>{template.createdAt}</td>
                    <td className="p-1">
                      <a
                        className="btn btn-danger btn-sm"
                        onClick={() => fnMessageDelete(template.id)}
                      >
                        <i className="fas fa-trash-alt me-1"></i>삭제
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Row */}
      <div className="row">
        <div className="col text-center">
          <p className="text-muted">
            전체 {filteredTemplates.length}개 중 {paginatedTemplates.length}개
            표시
          </p>
        </div>
      </div>
    </Layout>
  );
}

