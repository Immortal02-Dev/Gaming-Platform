"use client";

import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface CustomWindow extends Window {
  userDetail?: (userIdx: string | number, tab: number) => void;
  messageWrite?: (userIdx: string | number, type?: number) => void;
}

declare const window: CustomWindow;

interface LoginSession {
  id: string;
  user_id: number;
  username: string;
  nickname: string;
  balance: number;
  game_money: number;
  current_page: string;
  current_url: string;
  page_accessed_at: string;
  ip_address: string;
  created_at: string;
  last_login: string;
  roleType: string;
  roleLevel: number;
}

interface LoginListResponse {
  success: boolean;
  data: LoginSession[];
}

export default function UserLoginPage() {
  const [showType, setShowType] = useState<string>("");
  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLoginSessions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (showType) params.append('showType', showType);

      const url = `${BACKEND_URL}/api/admin/user/login/list?${params.toString()}`;
      console.log('Fetching login sessions from:', url);
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData, 'URL:', url);

        if (response.status === 403) {
          const roleInfo = errorData.details ? ` (현재 역할: ${errorData.details.userRole}, 필요 역할: ${errorData.details.requiredRoles?.join(', ') || 'admin'})` : '';
          throw new Error(`권한이 부족합니다. 관리자 계정으로 로그인해주세요.${roleInfo}`);
        } else if (response.status === 401) {
          throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
        }
        throw new Error(errorData.error || `Failed to fetch login sessions: ${response.status}`);
      }

      const result: LoginListResponse = await response.json();

      if (result.success) {
        setSessions(result.data || []);
      } else {
        console.error('API returned success: false', result);
        setSessions([]);
      }
    } catch (error) {
      console.error('Failed to fetch login sessions:', error);
    } finally {
      setLoading(false);
    }
  }, [showType]);

  useEffect(() => {
    fetchLoginSessions();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLoginSessions, 30000);
    return () => clearInterval(interval);
  }, [fetchLoginSessions]);

  const handleTabClick = (value: string) => {
    setShowType(value);
  };

  const getRoleLabel = (roleType: string, roleLevel: number): string => {
    if (roleType === 'partner') {
      return roleLevel === 1 ? '부본사' : '총판';
    }
    return '회원';
  };

  const formatNumber = (num: number | null): string => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString('ko-KR');
  };

  const formatDateTime = (dateString: string): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderUserDropdown = (userId: number, username: string, nickname: string, roleType: string) => (
    <ul className="dropdown-menu dropdown-menu-dark py-0">
      <li
        className="fw-600 text-white"
        style={{
          padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
        }}
      >
        <i className="fa fa-user me-2"></i>{username}({nickname})
      </li>
      <li className="bg-gray-700">
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 1); }}
        >
          정보수정
        </a>
      </li>
      {roleType === 'partner' ? (
        <>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 17); }}
            >
              수수료율
            </a>
          </li>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 3); }}
            >
              머니지급/차감
            </a>
          </li>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 6); }}
            >
              포인트지급/차감
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 2); }}
            >
              수수료율
            </a>
          </li>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 3); }}
            >
              머니지급/차감
            </a>
          </li>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 6); }}
            >
              포인트지급/차감
            </a>
          </li>
          <li className="bg-gray-700">
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 13); }}
            >
              카지노머니지급/차감
            </a>
          </li>
        </>
      )}
      <li className="bg-gray-700">
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.messageWrite?.(userId, roleType === 'member' ? 9 : undefined); }}
        >
          쪽지보내기
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 8); }}
        >
          베팅내역
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 4); }}
        >
          충환전내역
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 5); }}
        >
          머니거래내역
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => { e.preventDefault(); window.userDetail?.(userId, 7); }}
        >
          포인트거래내역
        </a>
      </li>
    </ul>
  );

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{
        __html: `
          .warningUser {
            color: #6aa84f !important;
          }

          .warningUser .user-action {
            color: #6aa84f !important;
          }

          .warningUser .user-action label {
            color: #6aa84f !important;
          }

          .warningUser2 {
            color: #744700 !important;
          }

          .warningUser2 .user-action {
            color: #744700 !important;
          }

          .warningUser2 .user-action label {
            color: #744700 !important;
          }
        `
      }} />

      <h1 className="page-header">
        <a href="/userLoginList.html">
          <i className="fa fa-users me-2"></i>현재 접속자(실시간)
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          <div className="d-flex bg-white p-2 mb-2">
            <div className="input-group" style={{ width: "auto" }}>
              <button
                className={`btn btn-info show-type ${showType === "" ? "active" : ""}`}
                type="button"
                data-value=""
                onClick={() => handleTabClick("")}
              >
                <i className="fa-solid fa-list me-2"></i>전체
              </button>
              <button
                className={`btn btn-info show-type ${showType === "3" ? "active" : ""}`}
                type="button"
                data-value="3"
                onClick={() => handleTabClick("3")}
              >
                <i className="fa-solid fa-handshake me-2"></i>파트너
              </button>
              <button
                className={`btn btn-info show-type ${showType === "4" ? "active" : ""}`}
                type="button"
                data-value="4"
                onClick={() => handleTabClick("4")}
              >
                <i className="fa-solid fa-user me-2"></i>회원
              </button>
            </div>
          </div>
          <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>No.</th>
                <th>등급</th>
                <th>아이디(닉네임)</th>
                <th>보유머니</th>
                <th>게임중 머니</th>
                <th>접속 페이지</th>
                <th>접속 URL</th>
                <th>페이지 접속 시간</th>
                <th>접속 IP</th>
                <th>최근 로그인</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody id="loginList">
              {loading ? (
                <tr>
                  <td colSpan={11} className="text-center p-4">
                    <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center p-4">
                    현재 접속 중인 사용자가 없습니다.
                  </td>
                </tr>
              ) : (
                sessions.map((session, index) => (
                  <tr key={session.id} data-roleidx={session.roleType === 'partner' ? '3' : '4'}>
                    <td>{index + 1}</td>
                    <td>{getRoleLabel(session.roleType, session.roleLevel)}</td>
                    <td>
                      <a
                        className=""
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {session.username}({session.nickname})
                      </a>
                      {renderUserDropdown(session.user_id, session.username, session.nickname, session.roleType)}
                    </td>
                    <td>{formatNumber(session.balance)}</td>
                    <td>{formatNumber(session.game_money)}</td>
                    <td>
                      {session.current_page || '-'} <br />
                    </td>
                    <td>
                      {session.current_url || '-'} <br />
                    </td>
                    <td>
                      {formatDateTime(session.page_accessed_at)} <br />
                    </td>
                    <td>
                      {session.ip_address || '-'} <br />
                    </td>
                    <td>{formatDateTime(session.last_login)}</td>
                    <td className="p-1">
                      <a
                        className="btn btn-primary btn-sm text-white me-1"
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.messageWrite?.(session.user_id, session.roleType === 'member' ? 9 : undefined); }}
                      >
                        <i className="fas fa-edit me-1"></i>쪽지
                      </a>
                      <a
                        className="btn btn-lime btn-sm text-white me-1"
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.userDetail?.(session.user_id, 8); }}
                      >
                        <i className="fa fa-dice me-1"></i>베팅내역
                      </a>
                      <a
                        data-key={session.user_id}
                        className="btn btn-danger btn-sm text-white me-1 gameClose"
                      >
                        <i className="fas fa-xmark me-1"></i>게임 종료
                      </a>
                      <a
                        data-key={session.user_id}
                        className="btn btn-danger btn-sm text-white userLogoutLink"
                      >
                        <i className="fas fa-share me-1"></i>로그아웃
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}


