"use client";

import { useState, useEffect, useRef } from "react";

const BACKEND_URL = ""; // Use relative path for proxy

interface DuplicateUser {
  id: number;
  userIdx: number;
  userID: string;
  nickname: string;
  roleType: string;
  roleLevel: number;
  status: string;
  money: number;
  points: number;
  totalCharge: number;
  totalExchange: number;
  totalInout: number;
  registerDate: string;
  lastLoginDate: string | null;
  parentId: number;
  parentUsername: string | null;
  bankerName: string;
  bankNumber: string;
  ipAddress: string;
  domain: string;
  lastLogIdx: number | null;
}

interface DuplicateListResponse {
  success: boolean;
  data: DuplicateUser[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export default function DuplicateListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [searchType, setSearchType] = useState("ip");
  const [searchText, setSearchText] = useState("");
  const [duplicates, setDuplicates] = useState<DuplicateUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDuplicates = async (page: number = 1, type_override?: string, text_override?: string) => {
    const activeType = type_override || searchType;
    const activeText = text_override !== undefined ? text_override : searchText;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize);
      params.append('searchType', activeType);
      if (activeText) {
        params.append('searchText', activeText);
      }

      const response = await fetch(`${BACKEND_URL}/api/admin/user/duplicate/list?${params.toString()}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData);
        throw new Error(errorData.error || `Failed to fetch duplicates: ${response.status}`);
      }

      const data: DuplicateListResponse = await response.json();
      setDuplicates(data.data || []);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching duplicates:', error);
      setDuplicates([]);
    } finally {
      setLoading(false);
    }
  };

  const isMounted = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get('searchType');
    const textFromUrl = urlParams.get('searchText');

    let currentType = searchType;
    let currentText = searchText;

    if (typeFromUrl) {
      setSearchType(typeFromUrl);
      currentType = typeFromUrl;
    }
    if (textFromUrl) {
      setSearchText(textFromUrl);
      currentText = textFromUrl;
    }

    // Always fetch on mount to show data initially
    fetchDuplicates(1, currentType, currentText);
    isMounted.current = true;
  }, []);

  useEffect(() => {
    // Only fetch on updates, not on initial mount (handled above)
    if (isMounted.current) {
      fetchDuplicates(1);
    }
  }, [pageSize, searchType]);

  useEffect(() => {
    // Re-initialize dropdowns whenever data changes
    if (duplicates.length > 0) {
      const timer = setTimeout(() => {
        if (typeof (window as any).bootstrap !== 'undefined') {
          const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
          dropdownElementList.forEach(dropdownToggleEl => {
            (window as any).bootstrap.Dropdown.getOrCreateInstance(dropdownToggleEl);
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [duplicates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDuplicates(1);
  };

  const [isIPModalOpen, setIsIPModalOpen] = useState(false);
  const [isIDModalOpen, setIsIDModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DuplicateUser | null>(null);
  const [blockMemo, setBlockMemo] = useState("");

  const fnIPBlack = (user: DuplicateUser) => {
    setSelectedUser(user);
    setBlockMemo("");
    setIsIPModalOpen(true);
  };

  const fnIDBlack = (user: DuplicateUser) => {
    setSelectedUser(user);
    setBlockMemo("");
    setIsIDModalOpen(true);
  };

  const handleIPBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      let response;
      if (selectedUser.lastLogIdx) {
        response = await fetch(`${BACKEND_URL}/api/admin/blacklist/ips/block`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            logIdx: selectedUser.lastLogIdx,
            logMemo: blockMemo
          }),
          credentials: 'include'
        });
      } else {
        response = await fetch(`${BACKEND_URL}/api/admin/blacklist/ips/block-direct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: selectedUser.ipAddress,
            domain: selectedUser.domain,
            memo: blockMemo,
            userId: selectedUser.userID,
            nickname: selectedUser.nickname
          }),
          credentials: 'include'
        });
      }

      const data = await response.json();
      if (data.success) {
        alert("IP가 차단되었습니다.");
        setIsIPModalOpen(false);
      } else {
        alert(data.error || "IP 차단에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error blocking IP:", error);
      alert("IP 차단 중 오류가 발생했습니다.");
    }
  };

  const handleIDBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      // Assuming there's a similar API for ID blocking
      const response = await fetch(`${BACKEND_URL}/api/admin/blacklist/users/block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIdx: selectedUser.userIdx,
          logMemo: blockMemo
        }),
        credentials: 'include'
      });

      const data = await response.json();
      if (data.success) {
        alert("ID가 차단되었습니다.");
        setIsIDModalOpen(false);
      } else {
        alert(data.error || "ID 차단에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error blocking ID:", error);
      alert("ID 차단 중 오류가 발생했습니다.");
    }
  };

  const getStatusName = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': '가입대기',
      'active': '정상',
      'suspended': '정지',
      'withdrawn': '탈퇴',
      'tester': '테스터'
    };
    return statusMap[status] || status;
  };

  return (
    <div id="app" className="app p-3">
      <div className="panel panel-inverse">
        <div className="panel-heading">
          <h4 className="panel-title">중복 가입 확인</h4>
        </div>
        <div className="panel-body">
          <style jsx>{`
        .duplicateUser {
          color: #f44336 !important;
        }

        .duplicateUser a {
          color: #f44336 !important;
        }
      `}</style>
          <form onSubmit={handleSearch} method="get">
            <div className="d-flex mb-3">
              <select
                name="pageSize"
                className="form-select w-80px me-2"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="500">500</option>
                <option value="1000">1,000</option>
              </select>
              <select
                name="searchType"
                id="searchType"
                className="form-select w-100px me-2"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="ip">IP</option>
                <option value="bname">예금주명</option>
                <option value="bnumber">계좌번호</option>
              </select>
              <input
                type="text"
                name="searchText"
                id="searchText"
                className="form-control w-150px me-2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="검색"
              />
              <button className="btn btn-lime" id="btnSearch" type="submit">
                <i className="fa-solid fa-magnifying-glass me-2"></i>검색
              </button>
            </div>
          </form>

          <div className="row gx-0">
            <div className="col">
              <div>
                <table
                  id="userlisttable"
                  className="table dataTable table-striped table-bordered align-middle bg-white text-center fw-bold m-0"
                >
                  <thead className="bg-dark bg-gradient text-white">
                    <tr>
                      <th>추천인</th>
                      <th>아이디(닉네임)</th>
                      <th>상태</th>
                      <th>예금주</th>
                      <th>은행명</th>
                      <th>계좌번호</th>
                      <th>IP</th>
                      <th>도메인</th>
                      <th>기능</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={9}>Loading...</td>
                      </tr>
                    ) : duplicates.length === 0 ? (
                      <tr>
                        <td colSpan={9}>No duplicate users found.</td>
                      </tr>
                    ) : (
                      duplicates.map((user) => (
                        <tr key={user.id}>
                          <td className="p-1">
                            {user.parentUsername && (
                              <div className="input-group w-auto d-flex user-action">
                                <div className="input-group-text p-1 cursor-pointer d-inline" style={{ backgroundColor: "#f4a29c" }}>
                                  {user.roleType}
                                </div>
                                <label className="form-control p-1 cursor-pointer">
                                  {user.parentUsername} ({user.parentId})
                                </label>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="dropdown">
                              <div
                                className="input-group w-auto d-inline-flex user-action dropdown-toggle"
                                data-bs-toggle="dropdown"
                                data-bs-display="static"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  className="input-group-text p-1"
                                  style={{
                                    backgroundColor: user.roleType === 'partner' ? (user.roleLevel === 1 ? '#f4a29c' : '#f4dc95') : '#ffffff',
                                  }}
                                >
                                  {user.roleType === 'partner' ? (user.roleLevel === 1 ? '부본사' : '총판') : '회원'}
                                </div>
                                <div className="form-control p-1 cursor-pointer">
                                  {user.userID} ({user.nickname})
                                </div>
                              </div>
                              <ul className="dropdown-menu dropdown-menu-dark py-0">
                                <li className="fw-600 text-white" style={{ padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)" }}>
                                  <i className="fa fa-user me-2"></i>{user.userID} ({user.nickname})
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail && (window as any).userDetail(user.userIdx, 1)}
                                  >
                                    정보수정
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail && (window as any).userDetail(user.userIdx, 17)}
                                  >
                                    수수료율
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail && (window as any).userDetail(user.userIdx, 3)}
                                  >
                                    머니지급/차감
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail && (window as any).userDetail(user.userIdx, 6)}
                                  >
                                    포인트지급/차감
                                  </a>
                                </li>
                                <li className="bg-gray-700">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).messageWrite && (window as any).messageWrite(user.userIdx)}
                                  >
                                    쪽지보내기
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail && (window as any).userDetail(user.userIdx, 8)}
                                  >
                                    베팅내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail(user.userIdx, 4)}
                                  >
                                    충환전내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail(user.userIdx, 5)}
                                  >
                                    머니거래내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail(user.userIdx, 7)}
                                  >
                                    포인트거래내역
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                    onClick={() => (window as any).userDetail(user.userIdx, 15)}
                                  >
                                    쿠폰 현황
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                          <td className="">{getStatusName(user.status)}</td>
                          <td className="">{user.bankerName}</td>
                          <td></td> {/* Bank Name is missing in the interface, assuming it's not available from backend */}
                          <td className="">{user.bankNumber}</td>
                          <td className="duplicateUser">{user.ipAddress}</td>
                          <td>{user.domain}</td>
                          <td>
                            <button className="btn btn-gray" type="button" onClick={() => fnIPBlack(user)}>IP 차단</button>
                            <button className="btn btn-default ms-2" type="button" onClick={() => fnIDBlack(user)}>ID 차단</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* IP Block Modal */}
          {isIPModalOpen && (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ width: '700px' }}>
                  <div className="panel panel-inverse mb-0">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa-solid fa-xmark me-1"></i>
                        </span>
                        <span style={{ margin: 0 }}>차단 IP 등록</span>
                      </h4>
                      <div className="panel-heading-btn">
                        <button className="btn btn-xs btn-icon btn-danger" onClick={() => setIsIPModalOpen(false)}>
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body">
                      <form onSubmit={handleIPBlockSubmit}>
                        <div className="mb-3">
                          <label className="col-form-label w-auto ms-1 me-1">IP: {selectedUser?.ipAddress}</label>
                        </div>
                        <div className="mb-3">
                          <label className="col-form-label w-auto ms-1 me-1">차단 내용</label>
                          <input
                            type="text"
                            className="form-control"
                            value={blockMemo}
                            onChange={(e) => setBlockMemo(e.target.value)}
                            required
                          />
                        </div>
                        <div className="row mt-2">
                          <div className="col text-center">
                            <button type="submit" className="btn btn-success btn-sm text-white me-2">
                              <i className="fa fa-save me-1"></i>저장
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm text-white" onClick={() => setIsIPModalOpen(false)}>
                              <i className="fa-solid fa-xmark me-2"></i>닫기
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ID Block Modal */}
          {isIDModalOpen && (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ width: '700px' }}>
                  <div className="panel panel-inverse mb-0">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa-solid fa-xmark me-1"></i>
                        </span>
                        <span style={{ margin: 0 }}>차단 ID 등록</span>
                      </h4>
                      <div className="panel-heading-btn">
                        <button className="btn btn-xs btn-icon btn-danger" onClick={() => setIsIDModalOpen(false)}>
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body">
                      <form onSubmit={handleIDBlockSubmit}>
                        <div className="mb-3">
                          <label className="col-form-label w-auto ms-1 me-1">ID: {selectedUser?.userID} ({selectedUser?.nickname})</label>
                        </div>
                        <div className="mb-3">
                          <label className="col-form-label w-auto ms-1 me-1">차단 내용</label>
                          <input
                            type="text"
                            className="form-control"
                            value={blockMemo}
                            onChange={(e) => setBlockMemo(e.target.value)}
                            required
                          />
                        </div>
                        <div className="row mt-2">
                          <div className="col text-center">
                            <button type="submit" className="btn btn-success btn-sm text-white me-2">
                              <i className="fa fa-save me-1"></i>저장
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm text-white" onClick={() => setIsIDModalOpen(false)}>
                              <i className="fa-solid fa-xmark me-2"></i>닫기
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
