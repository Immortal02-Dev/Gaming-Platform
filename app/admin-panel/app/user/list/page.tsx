"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";

// Use relative path for the proxy to handle cookies correctly
const BACKEND_URL = ""; 

interface InoutPopup {
  userIdx: string;
  userID: string;
  nickname: string;
  type: "money" | "point" | "casinoMoney";
  action: "in" | "out";
  logTypeIdx: string;
  currentAmount: string;
  buttonElement: HTMLElement | null;
}

interface CustomWindow extends Window {
  flatpickr?: (element: HTMLElement | string, options?: Record<string, unknown>) => unknown;
  userDetail?: (userIdx: string | number, tab: number) => void;
  userStatusChange?: (id: number, type: number) => void;
  messageWrite?: (userIdx: string | number) => void;
}

declare const window: CustomWindow;

interface User {
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
  registration_ip: string | null;
  bank_account: string | null;
  bank_depositor: string | null;
  domain: string | null;
}

interface UserListResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalMoney: number;
    totalPoints: number;
    totalCharge: number;
    totalExchange: number;
    totalInout: number;
  };
}

const getDefaultStartDate = () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return oneYearAgo.toISOString().split('T')[0];
};

const getDefaultEndDate = () => {
  return new Date().toISOString().split('T')[0];
};

export default function UserListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [userRoleIdx, setUserRoleIdx] = useState("");
  const [userStatusIdx, setUserStatusIdx] = useState("ACTIVE");
  const [searchText, setSearchText] = useState("");
  const [inoutPopup, setInoutPopup] = useState<InoutPopup | null>(null);
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.flatpickr) {
      if (startDateRef.current) {
        window.flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          minDate: new Date("2024-02-01"),
          onChange: (selectedDates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        window.flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          minDate: new Date("2024-02-01"),
          onChange: (selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }
  }, []);

  const fetchUsers = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize,
        ...(startDate && endDate && startDate.trim() && endDate.trim() && { startDate, endDate }),
        ...(userRoleIdx && { userRoleIdx }),
        ...(userStatusIdx && { userStatusIdx }),
        ...(searchText && { searchText }),
      });

      const response = await fetch(`${BACKEND_URL}/api/admin/user/list?${params.toString()}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data: UserListResponse = await response.json();
      setUsers(data.data || []);
      setCurrentPage(data.pagination.page);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [pageSize, startDate, endDate, userRoleIdx, userStatusIdx, searchText]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handleUserAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      "/user/user/add",
      "popup",
      `width=750,height=655,top=${window.innerHeight / 2 - 327.5},left=${window.innerWidth / 2 - 375}`
    );
  };

  const handleUserExcel = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      "/user/excel/upload",
      "popup",
      `width=500,height=370,top=${window.innerHeight / 2 - 185},left=${window.innerWidth / 2 - 250}`
    );
  };

  const handleExcelDownload = () => {
    window.location.href = "/excel/userExcelUpload.xlsx";
  };

  const removeCommas = (str: string) => {
    return str.replace(/,/g, "");
  };

  const addCommas = (num: number | string) => {
    const numStr = typeof num === "string" ? removeCommas(num) : String(num);
    if (numStr === "" || numStr === "0") return "0";
    return Number(numStr).toLocaleString("ko-KR");
  };

  const handleInoutControlClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    userIdx: string,
    userID: string,
    nickname: string,
    type: "money" | "point" | "casinoMoney",
    action: "in" | "out",
    logTypeIdx: string,
    currentAmount: string
  ) => {
    e.stopPropagation();
    if (
      inoutPopup &&
      inoutPopup.userIdx === userIdx &&
      inoutPopup.type === type &&
      inoutPopup.action === action
    ) {
      removeInoutForm();
      return;
    }
    removeInoutForm();
    const button = e.currentTarget;
    button.classList.remove("btn-lightgray");
    if (action === "in") {
      button.classList.add("btn-primary");
    } else {
      button.classList.add("btn-danger");
    }
    setInoutPopup({
      userIdx,
      userID,
      nickname,
      type,
      action,
      logTypeIdx,
      currentAmount,
      buttonElement: button,
    });
    setAmount("");
  };

  const removeInoutForm = useCallback(() => {
    if (inoutPopup?.buttonElement) {
      inoutPopup.buttonElement.classList.remove("btn-primary", "btn-danger");
      inoutPopup.buttonElement.classList.add("btn-lightgray");
    }
    setInoutPopup(null);
    setAmount("");
  }, [inoutPopup]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeCommas(e.target.value);
    if (value === "" || value === "0") {
      setAmount("");
    } else {
      setAmount(addCommas(value));
    }
  };

  const handlePresetAmountClick = (presetAmount: string) => {
    const current = removeCommas(amount) || "0";
    const preset = removeCommas(presetAmount);
    const total = Number(current) + Number(preset);
    if (total > 0) {
      setAmount(addCommas(String(total)));
    } else {
      setAmount("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inoutPopup) return;
    const confirmMessage = inoutPopup.action === "in" ? "지급하시겠습니까?" : "회수하시겠습니까?";
    if (!confirm(confirmMessage)) return;
    console.log("Submit:", {
      type: inoutPopup.type,
      action: inoutPopup.action,
      amount: removeCommas(amount),
      userIdx: inoutPopup.userIdx,
      logTypeIdx: inoutPopup.logTypeIdx,
    });
    removeInoutForm();
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

  const getRoleLevelName = (level: number) => {
    const levelMap: { [key: number]: string } = {
      1: '부본사',
      2: '총판',
      3: '대리점1단계',
      4: '대리점2단계',
      5: '대리점3단계',
      6: '대리점4단계',
      7: '대리점5단계'
    };
    return levelMap[level] || `${level}단계`;
  };

  useEffect(() => {
    if (inoutPopup && popupRef.current && inoutPopup.buttonElement) {
      const button = inoutPopup.buttonElement;
      const buttonParent = button.parentElement;
      if (buttonParent) {
        buttonParent.style.position = "relative";
        const buttonHeight = buttonParent.offsetHeight;
        const popupHeight = popupRef.current.offsetHeight;
        const popupWidth = popupRef.current.offsetWidth;
        popupRef.current.style.top = `${(popupHeight / 2) * -1 + buttonHeight / 2}px`;
        popupRef.current.style.right = `${popupWidth * -1}px`;
      }
    }
  }, [inoutPopup]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inoutPopup &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".inoutControl")
      ) {
        removeInoutForm();
      }
    };
    if (inoutPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [inoutPopup, removeInoutForm]);

  return (
    <Layout>
      <style jsx>{`
        .flex-none { flex: none !important; }
        .sticky { position: sticky !important; }
        .dataTable > :not(caption) > * > td { background-color: #ffffff; }
        .dataTable > tbody > tr:nth-of-type(odd) > td { background-color: #f0f2f4; }
        .dataTable td, th { border-left: 0; border-bottom: 1px solid rgb(206, 212, 218) !important; }
        .btn-lightgray { background-color: #ced4da; }
        .speech-bubble { position: absolute; background: #fedc62; border-radius: 0.4em; z-index: 999; width: 446px; }
        .speech-bubble:after { content: ""; position: absolute; left: 0; top: 50%; border: 13px solid transparent; border-right-color: #fedc62; border-left: 0; margin-top: -13px; margin-left: -13px; }
      `}</style>

      <h1 className="page-header d-flex">
        <a href="/userList.html"><i className="fa fa-users me-2"></i>회원 목록</a>
        <div className="ms-auto">
          <a href="#" className="btn btn-primary text-white me-1" onClick={handleUserAdd}><i className="fa fa-user-plus me-1"></i>회원 등록</a>
          <a href="#" className="btn btn-success text-white me-1" onClick={handleUserExcel}><i className="fa fa-user-plus me-1"></i>회원 일괄 등록</a>
          <button type="button" className="btn btn-primary" onClick={handleExcelDownload}>엑셀다운</button>
        </div>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch} className="d-flex w-100 align-items-center">
              <select className="form-select w-80px me-2" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                <option value="50">50</option><option value="100">100</option><option value="500">500</option>
              </select>
              <div className="input-group me-2" style={{ width: "250px" }}>
                <input ref={startDateRef} type="text" className="form-control" value={startDate} readOnly />
                <span className="input-group-text">~</span>
                <input ref={endDateRef} type="text" className="form-control" value={endDate} readOnly />
              </div>
              <select className="form-select w-auto me-2" value={userRoleIdx} onChange={(e) => setUserRoleIdx(e.target.value)}>
                <option value="">구분</option><option value="3">파트너</option><option value="4">회원</option>
              </select>
              <select className="form-select w-auto me-2" value={userStatusIdx} onChange={(e) => setUserStatusIdx(e.target.value)}>
                <option value="">상태</option><option value="ACTIVE">정상</option><option value="SUSPENDED">정지</option>
              </select>
              <input type="text" className="form-control w-150px me-2" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="검색어" />
              <button type="submit" className="btn btn-lime"><i className="fa-solid fa-magnifying-glass me-2"></i>검색</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row overflow-auto">
        <div className="col" style={{ minWidth: "3000px" }}>
          <table className="table dataTable table-striped table-bordered align-middle text-center fw-bold m-0">
            <thead className="bg-dark text-white sticky-top">
              <tr>
                <th>No.</th><th>추천인</th><th>등급</th><th>아이디(닉네임)</th><th>상태</th>
                <th colSpan={2}>보유머니</th><th>홀덤머니</th><th colSpan={2}>보유포인트</th>
                <th>충전금</th><th>환전금</th><th>환차액</th><th>롤링</th><th>서비스</th><th>정산차액</th>
                <th>가입일</th><th>최근접속일</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={18} className="p-4"><i className="fa fa-spinner fa-spin me-2"></i>로딩 중...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={18} className="p-4">데이터가 없습니다.</td></tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{(currentPage - 1) * parseInt(pageSize) + index + 1}</td>
                    <td>{user.parentUsername || "-"}</td>
                    <td>{user.roleType === 'partner' ? getRoleLevelName(user.roleLevel) : `${user.roleLevel}레벨`}</td>
                    <td className="p-1">
                      <div className="dropdown">
                        <button className="btn btn-link text-decoration-none dropdown-toggle p-0" data-bs-toggle="dropdown">
                          {user.userID} ({user.nickname})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          <li><a className="dropdown-item" href="#" onClick={() => window.userDetail?.(user.id, 1)}>정보수정</a></li>
                          <li><a className="dropdown-item" href="#" onClick={() => window.userDetail?.(user.id, 3)}>머니지급/차감</a></li>
                          <li><a className="dropdown-item" href="#" onClick={() => window.userDetail?.(user.id, 6)}>포인트지급/차감</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>{getStatusName(user.status)}</td>
                    <td>{addCommas(user.money)}</td>
                    <td className="p-1">
                      <button className="btn btn-sm btn-lightgray inoutControl in" onClick={(e) => handleInoutControlClick(e, user.id.toString(), user.userID, user.nickname, "money", "in", "10", user.money.toString())}>지급</button>
                      <button className="btn btn-sm btn-lightgray inoutControl out ms-1" onClick={(e) => handleInoutControlClick(e, user.id.toString(), user.userID, user.nickname, "money", "out", "11", user.money.toString())}>회수</button>
                    </td>
                    <td>0</td>
                    <td>{addCommas(user.points)}</td>
                    <td className="p-1">
                      <button className="btn btn-sm btn-lightgray inoutControl in" onClick={(e) => handleInoutControlClick(e, user.id.toString(), user.userID, user.nickname, "point", "in", "20", user.points.toString())}>지급</button>
                      <button className="btn btn-sm btn-lightgray inoutControl out ms-1" onClick={(e) => handleInoutControlClick(e, user.id.toString(), user.userID, user.nickname, "point", "out", "21", user.points.toString())}>회수</button>
                    </td>
                    <td>{addCommas(user.totalCharge)}</td>
                    <td>{addCommas(user.totalExchange)}</td>
                    <td className="text-danger">{addCommas(user.totalInout)}</td>
                    <td>0</td><td>0</td><td>0</td>
                    <td>{user.registerDate}</td>
                    <td>{user.lastLoginDate || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {inoutPopup && (
        <div ref={popupRef} className="speech-bubble p-2">
          <form onSubmit={handleFormSubmit}>
            <h5 className="text-center">{inoutPopup.userID} ({inoutPopup.nickname}) 보유액: {inoutPopup.currentAmount}</h5>
            <div className="input-group">
              <input type="text" className="form-control w-100px" value={inoutPopup.action === "in" ? "지급" : "회수"} readOnly />
              <input ref={amountInputRef} type="text" className="form-control" value={amount} onChange={handleAmountChange} />
              <button type="submit" className="btn btn-success">저장</button>
              <button type="button" className="btn btn-secondary" onClick={removeInoutForm}>취소</button>
            </div>
            <div className="input-group mt-2">
              {["10,000", "50,000", "100,000", "500,000"].map(v => (
                <button key={v} type="button" className="btn btn-sm btn-info" onClick={() => handlePresetAmountClick(v)}>{v}</button>
              ))}
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}
