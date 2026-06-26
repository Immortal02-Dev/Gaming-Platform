"use client";

import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
const BACKEND_URL = ""; // Use relative path for proxy

export default function MessageTemplateWritePage() {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const fnSave = async () => {
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
        `${BACKEND_URL}/api/admin/messages/templates`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            templateName,
            subject,
            content,
            isActive: true,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("템플릿이 저장되었습니다.");
        window.opener?.location.reload();
        window.close();
      } else {
        alert(result.message || "템플릿 저장 실패");
      }
    } catch (error) {
      console.error("Error saving template:", error);
      alert("템플릿 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-envelope me-2"></i>쪽지 템플릿 작성
          </h4>
          <div className="panel-heading-btn"></div>
        </div>
        <div className="panel-body bg-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fnSave();
            }}
            id="templateWrite"
          >
            <div className="form-group row mb-2">
              <label className="col-form-label col-2">템플릿 이름</label>
              <div className="col col-10">
                <input
                  type="text"
                  name="templateName"
                  id="templateName"
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
                  id="subject"
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
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
              <button type="submit" className="btn btn-success me-1">
                <i className="fa fa-save me-1"></i>저장
              </button>
              <button type="button" className="btn btn-gray" onClick={() => window.close()}>
                <i className="fa-solid fa-xmark me-2"></i>닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

