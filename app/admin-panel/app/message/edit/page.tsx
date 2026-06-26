"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
const BACKEND_URL = ""; // Use relative path for proxy

function MessageEditPageInner() {
  const searchParams = useSearchParams();
  const messageIdx = searchParams.get("messageIdx");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessage = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/${messageIdx}`,
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
        setMessageTitle(data.data.subject);
        setMessageContent(data.data.content);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    } finally {
      setLoading(false);
    }
  }, [messageIdx]);

  useEffect(() => {
    if (messageIdx) {
      fetchMessage();
    }
  }, [messageIdx, fetchMessage]);

  const fnUpdate = async () => {
    if (!messageTitle) {
      alert("제목은 필수 입력입니다.");
      return;
    } else if (!messageContent) {
      alert("내용은 필수 입력입니다.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/${messageIdx}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            messageTitle,
            messageContent,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        window.opener?.location.reload();
        window.close();
      } else {
        alert(result.message || "?? ?? ??");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      alert("?? ?? ? ??? ??????.");
    }
  };

  const fnUserMessageDelete = async () => {
    if (!confirm("삭제 하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("adminToken");      const response = await fetch(
        `${BACKEND_URL}/api/admin/messages/${messageIdx}`,
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
        alert(result.message);
        window.opener?.location.reload();
        window.close();
      } else {
        alert(result.message || "?? ??");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("?? ? ??? ??????.");
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-envelope me-2"></i>쪽지 수정
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
                <label className="col-form-label col-2">제목</label>
                <div className="col col-10">
                  <input
                    type="text"
                    name="messageTitle"
                    className="form-control"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-2">내용</label>
                <div className="col col-10">
                  <input
                    type="hidden"
                    name="messageContent"
                    value={messageContent}
                  />
                  <RichTextEditor
                    value={messageContent}
                    onChange={setMessageContent}
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
                  onClick={fnUserMessageDelete}
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
export default function MessageEditPage() {
  return (
    <Suspense fallback={null}>
      <MessageEditPageInner />
    </Suspense>
  );
}

