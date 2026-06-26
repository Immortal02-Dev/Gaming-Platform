"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
const BACKEND_URL = ""; // Use relative path for proxy

interface User {
  id: number;
  username: string;
  nickname: string;
  display: string;
}

interface MessageTemplate {
  id: number;
  templateName: string;
  subject: string;
  content: string;
}

function MessageWritePageInner() {
  const searchParams = useSearchParams();
  const initialReceiverId = searchParams.get("receiverId");

  const [receiverId, setReceiverId] = useState<string | null>(
    initialReceiverId
  );
  const [receiverSearch, setReceiverSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedReceiver, setSelectedReceiver] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    fetchTemplates();

    // If receiverId is provided, try to fetch user info (optional - not required for sending)
    if (initialReceiverId) {
      fetchUserInfo(parseInt(initialReceiverId));
    }

    // Close search results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".receiver-search-container")) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [initialReceiverId]);

  const fetchUserInfo = async (userId: number) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BACKEND_URL}/api/admin/user/${userId}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Handle different response structures
        const user = data.user || data.data?.user || data.data;
        if (user) {
          const receiver = {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            display: `${user.username} (${user.nickname})`,
          };
          setSelectedReceiver(receiver);
          setReceiverId(user.id.toString());
        } else {
          console.error("User data not found in response:", data);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch user info:", response.status, errorData);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const searchUsers = async (searchText: string) => {
    if (!searchText || searchText.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Search by both ID and nickname
      const params = new URLSearchParams({
        page: "1",
        pageSize: "20",
        searchType: "id",
        searchText: searchText,
      });

      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${BACKEND_URL}/api/admin/user/list?${params.toString()}`,
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
        interface RawUser {
          id: number;
          userID?: string;
          username?: string;
          nickname: string;
        }
        const users: User[] = (data.data || []).map((user: RawUser) => ({
          id: user.id,
          username: user.userID || user.username || "",
          nickname: user.nickname,
          display: `${user.userID || user.username || ""} (${user.nickname})`,
        }));
        setSearchResults(users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (receiverSearch && receiverSearch.length >= 2 && !selectedReceiver) {
      timeoutId = setTimeout(() => {
        searchUsers(receiverSearch);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [receiverSearch, selectedReceiver]);

  const handleReceiverSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setReceiverSearch(value);
  };

  const selectReceiver = (user: User) => {
    setSelectedReceiver(user);
    setReceiverId(user.id.toString());
    setReceiverSearch(user.display);
    setSearchResults([]);
  };

  const clearReceiver = () => {
    setSelectedReceiver(null);
    setReceiverId(null);
    setReceiverSearch("");
    setSearchResults([]);
  };

  const fetchTemplates = async () => {
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

      if (response.ok) {
        const data = await response.json();
        setTemplates(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplate(templateId);
    if (!templateId) return;

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
        setMessageTitle(data.data.subject);
        setMessageContent(data.data.content);
      }
    } catch (error) {
      console.error("Error fetching template content:", error);
    }
  };

  const fnSave = async () => {
    // Validation: Check receiverId (either from URL or selected)
    const finalReceiverId = receiverId || initialReceiverId;
    if (!finalReceiverId) {
      alert("받는 사람을 선택해주세요.");
      return;
    }

    // Validate receiverId is a valid number
    const receiverIdNum = parseInt(finalReceiverId);
    if (isNaN(receiverIdNum) || receiverIdNum <= 0) {
      alert("유효하지 않은 받는 사람 ID입니다.");
      return;
    }

    if (!messageTitle || messageTitle.trim() === "") {
      alert("제목은 필수 입력입니다.");
      return;
    }

    if (!messageContent || messageContent.trim() === "") {
      alert("내용은 필수 입력입니다.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BACKEND_URL}/api/admin/messages`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          receiverId: receiverIdNum,
          messageTitle: messageTitle.trim(),
          messageContent: messageContent.trim(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message || "쪽지가 발송되었습니다.");
        if (window.opener) {
          window.opener.location.reload();
        }
        window.close();
      } else {
        alert(result.message || "쪽지 발송 실패");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("쪽지 발송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-envelope me-2"></i>쪽지 발송
          </h4>
          <div className="panel-heading-btn"></div>
        </div>
        <div className="panel-body bg-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fnSave();
            }}
            id="messageWrite"
          >
            {!initialReceiverId && (
              <div className="form-group row mb-2">
                <label className="col-form-label col-2">받는 사람</label>
                <div className="col col-10">
                  <div className="position-relative receiver-search-container">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="사용자 ID 또는 닉네임으로 검색 (최소 2자 이상)"
                      value={receiverSearch}
                      onChange={handleReceiverSearchChange}
                      disabled={!!selectedReceiver}
                    />
                    {selectedReceiver && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute"
                        style={{ right: "5px", top: "5px" }}
                        onClick={clearReceiver}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    )}
                    {searchResults.length > 0 && !selectedReceiver && (
                      <div
                        className="position-absolute w-100 bg-white border rounded shadow-lg"
                        style={{
                          zIndex: 1000,
                          maxHeight: "200px",
                          overflowY: "auto",
                          top: "100%",
                          marginTop: "2px",
                        }}
                      >
                        {searchResults.map((user) => (
                          <div
                            key={user.id}
                            className="p-2 cursor-pointer hover-bg-gray"
                            style={{
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f0f0f0";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                            }}
                            onClick={() => selectReceiver(user)}
                          >
                            {user.display}
                          </div>
                        ))}
                      </div>
                    )}
                    {isSearching && (
                      <div
                        className="position-absolute"
                        style={{ right: "10px", top: "8px" }}
                      >
                        <i className="fa fa-spinner fa-spin"></i>
                      </div>
                    )}
                  </div>
                  {selectedReceiver && (
                    <small className="text-muted mt-1 d-block">
                      선택된 사용자: {selectedReceiver.display}
                    </small>
                  )}
                </div>
              </div>
            )}
            {initialReceiverId && selectedReceiver && (
              <div className="form-group row mb-2">
                <label className="col-form-label col-2">받는 사람</label>
                <div className="col col-10">
                  <input
                    type="text"
                    className="form-control"
                    value={selectedReceiver.display}
                    disabled
                  />
                </div>
              </div>
            )}
            <div className="form-group row mb-2">
              <label className="col-form-label col-2">템플릿</label>
              <div className="col col-10">
                <select
                  className="form-select"
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                >
                  <option value="">템플릿 선택</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.templateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row mb-2">
              <label className="col-form-label col-2">제목</label>
              <div className="col col-10">
                <input
                  type="text"
                  name="messageTitle"
                  id="messageTitle"
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
              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="fa fa-save me-1"></i>저장
              </button>
              <button
                type="button"
                className="btn btn-gray"
                onClick={() => window.close()}
              >
                <i className="fa-solid fa-xmark me-2"></i>닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default function MessageWritePage() {
  return (
    <Suspense fallback={null}>
      <MessageWritePageInner />
    </Suspense>
  );
}

