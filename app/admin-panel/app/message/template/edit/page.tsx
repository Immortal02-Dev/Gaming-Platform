"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
const BACKEND_URL = ""; // Use relative path for proxy

function MessageTemplateEditPageInner() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchTemplate = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/templates/${templateId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTemplateName(data.data.templateName || "");
        setSubject(data.data.subject);
        setContent(data.data.content);
        setIsActive(data.data.isActive === 1 || data.data.isActive === true);
      }
    } catch (error) {
      console.error("Error fetching template:", error);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, [templateId, fetchTemplate]);

  const fnUpdate = async () => {
    if (!templateName) {
      alert("템플릿 이름은 필수 입력입니다.");
      return;
    } else if (!subject) {
      alert("제목은 필수 입력입니다.");
      return;
    } else if (!content) {
      alert("내용은 필수 입력입니다.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/templates/${templateId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            templateName,
            subject,
            content,
            isActive,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("템플릿이 수정되었습니다.");
        window.opener?.location.reload();
        window.close();
      } else {
        alert(result.message || "템플릿 수정 실패");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      alert("템플릿 수정 중 오류가 발생했습니다.");
    }
  };

  const fnTemplateDelete = async () => {
    if (!confirm("템플릿을 삭제 하시겠습니까?")) return;

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
        window.opener?.location.reload();
        window.close();
      } else {
        alert(result.message || "삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-envelope me-2"></i>쪽지 템플릿 수정
          </h4>
          <div className="panel-heading-btn"></div>
        </div>
        <div className="panel-body bg-gray-200">
          {loading ? (
            <div className="text-center p-5">로딩 중...</div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fnUpdate();
              }}
            >
              <div className="form-group row mb-2">
                <label className="col-form-label col-2">템플릿 이름</label>
                <div className="col col-10">
                  <input
                    type="text"
                    name="templateName"
                    className="form-control"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    required
                    placeholder="템플릿을 식별할 수 있는 이름"
                  />
                </div>
              </div>

              <div className="form-group row mb-2">
                <label className="col-form-label col-2">제목</label>
                <div className="col col-10">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mb-2">
                <label className="col-form-label col-2">사용 여부</label>
                <div className="col col-10 d-flex align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      {isActive ? "사용 중" : "사용 안함"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-2">내용</label>
                <div className="col col-10">
                  <input type="hidden" name="content" value={content} />
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    height="400px"
                  />
                </div>
              </div>
              <div className="col text-center">
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-save me-1"></i>저장
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={fnTemplateDelete}
                >
                  <i className="fa fa-trash me-1"></i>삭제
                </button>
                <a className="btn btn-gray" onClick={() => window.close()}>
                  <i className="fa-solid fa-xmark me-2"></i>닫기
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default function MessageTemplateEditPage() {
  return (
    <Suspense fallback={null}>
      <MessageTemplateEditPageInner />
    </Suspense>
  );
}

