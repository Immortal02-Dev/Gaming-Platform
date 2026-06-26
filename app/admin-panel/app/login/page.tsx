"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      // Use the relative path to go through the Next.js API proxy
      // This avoids CORS issues and ensures headers are forwarded correctly
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        setError("서버에서 올바르지 않은 응답을 받았습니다. (Empty or invalid JSON)");
        setIsLoading(false);
        return;
      }

      if (response.ok && data.success) {
        const adminData = data.data;
        // Check if user is admin or super_admin
        if (adminData.user?.role === 'admin' || adminData.user?.role === 'super_admin') {
          // Store token in cookie for the proxy and middleware to use
          document.cookie = `token=${adminData.token}; path=/; max-age=86400; SameSite=Lax`;
          
          // Also store in localStorage for components that might need it
          localStorage.setItem('adminToken', adminData.token);
          localStorage.setItem('adminUser', JSON.stringify(adminData.user));
          
          // Login successful - redirect to admin dashboard
          router.push("/dashboard");
        } else {
          setError("관리자 권한이 필요합니다.");
          setIsLoading(false);
        }
      } else {
        // Login failed
        setError(data.message || data.error || "로그인에 실패했습니다.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("서버 연결 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
      setIsLoading(false);
    }
  };

  return (
    <div className="app login login-v1">
      <div className="login-container">
        <div className="login-header">
          <div className="brand">
            <div className="d-flex align-items-center">
              <span className="logo"></span> <b>Super</b> Admin
            </div>
            <small></small>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="login-body">
          <div className="login-content fs-13px">
            <form onSubmit={handleSubmit} className="margin-bottom-0" autoComplete="off">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <div className="form-floating mb-20px">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control fs-13px h-45px"
                  placeholder="ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <label htmlFor="username" className="d-flex align-items-center py-0">
                  ID
                </label>
              </div>
              <div className="form-floating mb-20px">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control fs-13px h-45px"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <label htmlFor="password" className="d-flex align-items-center py-0">
                  Password
                </label>
              </div>
              <div className="login-buttons">
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-lg w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      로그인 중...
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

