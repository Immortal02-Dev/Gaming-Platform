"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Layout from "@/components/Layout";

const BACKEND_URL = "";

interface InoutPopup {
  userIdx: string;
  userID: string;
  nickname: string;
  type: "money" | "point" | "casinoMoney";
  action: "in" | "out";
  logTypeIdx: string;
  currentAmount: string;
}

interface CustomWindow extends Window {
  flatpickr?: (
    element: HTMLElement | string,
    options?: Record<string, unknown>,
  ) => unknown;
  userDetail?: (userIdx: string | number, tab: number) => void;
  userStatusChange?: (id: number, type: number) => void;
  messageWrite?: (userIdx: string | number) => void;
  duplicateWindowOpen?: (type: string) => void;
  userExcel?: () => void;
  userRoleChange?: () => void;
}

declare let window: CustomWindow;

if (typeof window !== "undefined") {
  window.userStatusChange = (id: number, type: number) => {
    const statusMap: { [key: number]: string } = {
      1: "PENDING",
      2: "ACTIVE",
      3: "SUSPENDED",
      4: "WITHDRAWN",
      5: "TESTER",
    };
    const newStatus = statusMap[type] || "";
    if (newStatus && confirm(`상태를 변경하시겠습니까?`)) {
      fetch(`/api/admin/user/status`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, status: newStatus }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("변경되었습니다.");
            window.location.reload();
          } else {
            alert(data.message || "오류가 발생했습니다.");
          }
        })
        .catch(() => alert("네트워크 오류가 발생했습니다."));
    }
  };

  window.messageWrite = (userIdx: string | number) => {
    window.open(
      `/message/write?receiverId=${userIdx}`,
      "popup",
      `width=750,height=655,top=${window.innerHeight / 2 - 327.5},left=${window.innerWidth / 2 - 375}`,
    );
  };

  window.duplicateWindowOpen = (type: string) => {
    const width = type === "ip" ? 500 : 550;
    window.open(
      `/duplicate/${type}`,
      "popup",
      `width=${width},height=400,top=${window.innerHeight / 2 - 200},left=${window.innerWidth / 2 - 250}`,
    );
  };

  window.userExcel = () => {
    window.open(
      "/user/excel/upload",
      "popup",
      `width=500,height=370,top=${window.innerHeight / 2 - 185},left=${window.innerWidth / 2 - 250}`,
    );
  };
}

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
  holdemMoney: number;
  totalCharge: number;
  totalExchange: number;
  totalInout: number;
  totalRollingPointSum: number;
  totalPointSum: number;
  totalPointPlusMinusSum: number;
  totalPrematchBetting: number;
  totalPrematchWin: number;
  totalPrematchBetWin: number;
  totalLiveBetting: number;
  totalLiveWin: number;
  totalLiveBetWin: number;
  totalCasinoBetting: number;
  totalCasinoWin: number;
  totalCasinoBetWin: number;
  totalSlotBetting: number;
  totalSlotWin: number;
  totalSlotBetWin: number;
  totalHoldemBetting: number;
  totalHoldemWin: number;
  totalHoldemBetWin: number;
  totalArcadeFolder1BetMoneySum: number;
  totalArcadeFolder1WinMoneySum: number;
  totalArcadeFolder1PlusMinusSum: number;
  totalArcadeFolderNBetMoneySum: number;
  totalArcadeFolderNWinMoneySum: number;
  totalArcadeFolderNPlusMinusSum: number;
  registerDate: string;
  lastLoginDate: string | null;
  parentId: number | null;
  parentUsername: string | null;
  parentRoleLevel: number | null;
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
  return oneYearAgo.toISOString().split("T")[0];
};

const getDefaultEndDate = () => {
  return new Date().toISOString().split("T")[0];
};

const PAGE_STYLES = `
  .flex-none { flex: none !important; }
  .sticky { position: -webkit-sticky !important; position: sticky !important; }
  table.dataTable > :not(caption) > * > td { background-color: #ffffff; }
  table.dataTable > tbody > tr:nth-of-type(odd) > td { background-color: #f0f2f4; }
  table.dataTable td, table.dataTable th {
    border-left: 0;
    border-bottom-style: solid !important;
    border-bottom: 1px solid rgb(206, 212, 218) !important;
  }
  .btn-lightgray { background-color: #ced4da; }
  .inoutControl.in.btn-lightgray:hover {
    --bs-btn-color: #ffffff; --bs-btn-bg: #348fe2; --bs-btn-border-color: #348fe2;
    --bs-btn-hover-color: #ffffff; --bs-btn-hover-bg: #348fe2; --bs-btn-hover-border-color: #348fe2;
    --bs-btn-focus-shadow-rgb: 82,160,230;
    --bs-btn-active-color: #ffffff; --bs-btn-active-bg: #348fe2; --bs-btn-active-border-color: #348fe2;
  }
  .inoutControl.out.btn-lightgray:hover {
    --bs-btn-color: #ffffff; --bs-btn-bg: #ff5b57; --bs-btn-border-color: #ff5b57;
    --bs-btn-hover-color: #ffffff; --bs-btn-hover-bg: #ff5b57; --bs-btn-hover-border-color: #ff5b57;
    --bs-btn-focus-shadow-rgb: 255,116,112;
    --bs-btn-active-color: #ffffff; --bs-btn-active-bg: #ff5b57; --bs-btn-active-border-color: #ff5b57;
  }
  .speech-bubble {
    position: absolute; background: #fedc62; border-radius: 0.4em; z-index: 999; width: 446px;
  }
  .speech-bubble:after {
    content: ''; position: absolute; left: 0; top: 50%;
    width: 0; height: 0; border: 13px solid transparent;
    border-right-color: #fedc62; border-left: 0;
    margin-top: -13px; margin-left: -13px;
  }
  .memo-container {
    padding: 5px; background-color: #ffebcd; font-size: 15px;
    position: absolute; display: none; z-index: 9999;
    border: 1px solid #dbc39f;
  }
  .user-memo { font-size: 1.5em; cursor: pointer; }
  .duplicateUser { color: #f44336 !important; }
  .duplicateUser .user-action { color: #f44336 !important; }
  .warningUser { color: #6aa84f !important; }
  .warningUser .user-action { color: #6aa84f !important; }
  .warningUser2 { color: #744700 !important; }
  .warningUser2 .user-action { color: #744700 !important; }
  .input-group { flex-wrap: nowrap !important; }
  .sorting { cursor: pointer; position: relative; padding-right: 26px; }
  .sorting:hover { background-color: #3a3f47 !important; }
  .sorting::before { position: absolute; display: block; opacity: 0.3; right: 10px; bottom: 50%; line-height: 9px; font-size: 0.8em; content: "▲"; }
  .sorting::after  { position: absolute; display: block; opacity: 0.3; right: 10px; top: 50%;  line-height: 9px; font-size: 0.8em; content: "▼"; }
  .sorting_asc::before  { opacity: 0.6; }
  .sorting_desc::after { opacity: 0.6; }
`;

const ROLE_LEVEL_COLOR: { [key: number]: string } = {
  1: "#f4a29c",
  2: "#f9c06a",
  3: "#a8d8a8",
  4: "#9ec8e0",
  5: "#c3a8d1",
  6: "#f7c5e0",
  7: "#b0c4de",
};

export default function UserListPage() {
  const [pageSize, setPageSize] = useState("50");
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [userRoleIdx, setUserRoleIdx] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [userStatusIdx, setUserStatusIdx] = useState("ACTIVE");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [inoutPopup, setInoutPopup] = useState<InoutPopup | null>(null);
  const [amount, setAmount] = useState("");
  const [logMemo, setLogMemo] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalMoney: 0,
    totalPoints: 0,
    totalCharge: 0,
    totalExchange: 0,
    totalInout: 0,
  });
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const tableRef = useRef<HTMLTableElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeCellRef = useRef<HTMLTableCellElement | null>(null);
  const memoRef = useRef<HTMLDivElement>(null);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set());

  // Visible level options based on selected role
  const levelOptions =
    userRoleIdx === "3"
      ? [
          { value: "3|1", label: "부본사" },
          { value: "3|2", label: "총판" },
          { value: "3|3", label: "대리점1단계" },
          { value: "3|4", label: "대리점2단계" },
          { value: "3|5", label: "대리점3단계" },
          { value: "3|6", label: "대리점4단계" },
          { value: "3|7", label: "대리점5단계" },
        ]
      : userRoleIdx === "4"
        ? Array.from({ length: 15 }, (_, i) => ({
            value: `4|${i + 1}`,
            label: `${i + 1}레벨`,
          }))
        : [
            { value: "3|1", label: "부본사" },
            { value: "3|2", label: "총판" },
            { value: "3|3", label: "대리점1단계" },
            { value: "3|4", label: "대리점2단계" },
            { value: "3|5", label: "대리점3단계" },
            { value: "3|6", label: "대리점4단계" },
            { value: "3|7", label: "대리점5단계" },
            ...Array.from({ length: 15 }, (_, i) => ({
              value: `4|${i + 1}`,
              label: `${i + 1}레벨`,
            })),
          ];

  // Keep refs to the initial date values so the flatpickr effect can read
  // them without adding startDate/endDate to its dependency array
  // (flatpickr only needs the defaultDate at mount time).
  const initialStartDateRef = useRef(startDate);
  const initialEndDateRef = useRef(endDate);

  useEffect(() => {
    if (typeof window !== "undefined" && window.flatpickr) {
      if (startDateRef.current) {
        window.flatpickr(startDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: initialStartDateRef.current,
          onChange: (_selectedDates: Date[], dateStr: string) => {
            setStartDate(dateStr);
          },
        });
      }
      if (endDateRef.current) {
        window.flatpickr(endDateRef.current, {
          locale: "ko",
          dateFormat: "Y-m-d",
          disableMobile: true,
          defaultDate: initialEndDateRef.current,
          onChange: (_selectedDates: Date[], dateStr: string) => {
            setEndDate(dateStr);
          },
        });
      }
    }
  }, []);

  const fetchUsers = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize,
          ...(startDate &&
            endDate &&
            startDate.trim() &&
            endDate.trim() && { startDate, endDate }),
          ...(userRoleIdx && { userRoleIdx }),
          ...(userLevel && { userLevel }),
          ...(userStatusIdx && { userStatusIdx }),
          ...(searchType && { searchType }),
          ...(searchText && { searchText }),
          ...(sortField && { sortField, sortOrder }),
        });

        const response = await fetch(
          `${BACKEND_URL}/api/admin/user/list?${params.toString()}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data: UserListResponse = await response.json();
        setUsers(data.data || []);
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.totalPages || 1);
        if (data.summary) setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [
      pageSize,
      startDate,
      endDate,
      userRoleIdx,
      userLevel,
      userStatusIdx,
      searchType,
      searchText,
      sortField,
      sortOrder,
    ],
  );

  useEffect(() => {
    void Promise.resolve().then(() => fetchUsers(1));
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getSortClass = (field: string) => {
    if (sortField !== field) return "sorting";
    return sortOrder === "asc" ? "sorting sorting_asc" : "sorting sorting_desc";
  };

  const totalColCount = 36;

  const handleUserAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      "/user/user/add",
      "popup",
      `width=500,height=370,top=${window.innerHeight / 2 - 185},left=${window.innerWidth / 2 - 250}`,
    );
  };

  const handleUserExcel = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      "/user/excel/upload",
      "popup",
      `width=500,height=370,top=${window.innerHeight / 2 - 185},left=${window.innerWidth / 2 - 250}`,
    );
  };

  const handleExcelDownload = () => {
    window.location.href = "/storage/userExcelUpload.xlsx";
  };

  // Replicate original jQuery sticky-column logic from userList.html
  const adjustStickyColumns = useCallback(() => {
    const table = tableRef.current;
    if (!table) return;

    // Thead rows: stick first 4 th to left + top
    table.querySelectorAll("thead tr").forEach((row) => {
      let left = 0;
      const headers = row.querySelectorAll("th");
      headers.forEach((th, i) => {
        const cell = th as HTMLTableHeaderCellElement;
        if (!cell.classList.contains("sticky")) cell.classList.add("sticky");
        cell.style.top = "0px";
        cell.style.zIndex = i < 4 ? "3" : "2";
        if (i < 4) {
          cell.style.left = `${left}px`;
          if (i > 0)
            left += (headers[i - 1] as HTMLElement).getBoundingClientRect()
              .width;
        }
      });
    });

    // Tbody rows: first row sticky on top (below header), first 4 cols sticky to left
    const thHeight =
      (
        table.querySelector("thead tr th") as HTMLElement
      )?.getBoundingClientRect().height ?? 49;
    table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
      let left = 0;
      const cells = row.querySelectorAll("td");
      cells.forEach((td, i) => {
        const cell = td as HTMLTableCellElement;
        // First tbody row: sticky top below header
        if (rowIndex === 0) {
          if (!cell.classList.contains("sticky")) cell.classList.add("sticky");
          cell.style.top = `${thHeight}px`;
          cell.style.zIndex = i === 0 ? "3" : "2";
        }
        // First 4 cols: sticky left (for all rows except row 0 first cell)
        if (rowIndex > 0 && i < 4) {
          if (!cell.classList.contains("sticky")) cell.classList.add("sticky");
          cell.style.left = `${left}px`;
          cell.style.zIndex = "1";
          if (i < 3)
            left +=
              (cells[i] as HTMLElement).getBoundingClientRect().width + 0.05;
        } else if (rowIndex === 0 && i === 0) {
          if (!cell.classList.contains("sticky")) cell.classList.add("sticky");
          cell.style.left = "0px";
          cell.style.zIndex = "3";
        }
      });
    });
  }, []);

  // Checkbox handling (matching HTML #checkAll and individual checkboxes)
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    if (checked) {
      setCheckedRows(new Set(users.map((u) => u.userIdx || u.id)));
    } else {
      setCheckedRows(new Set());
    }
  };

  const handleRowCheck = (id: number, checked: boolean) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else {
        next.delete(id);
        setCheckAll(false);
      }
      return next;
    });
  };

  // Batch approve selected users (matches #btnReg in HTML)
  const handleBatchApprove = async () => {
    if (checkedRows.size < 1) {
      alert("한 명 이상의 회원을 선택하여주십시오.");
      return;
    }
    if (!confirm("선택하신 회원들을 승인처리하시겠습니까?")) return;
    const list = Array.from(checkedRows).sort();
    const res = await fetch("/api/admin/user/selectStatusChange", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIdx: list.join(","), userStatusIdx: 2 }),
    });
    const data = await res.json();
    if (data.success || data.ReturnCode === 0) {
      fetchUsers(currentPage);
      setCheckedRows(new Set());
      setCheckAll(false);
    } else alert(data.message || data.ReturnMessage || "오류가 발생했습니다.");
  };

  const removeCommas = (str: string) => str.replace(/,/g, "");

  const addCommas = (num: number | string) => {
    const numStr =
      typeof num === "string" ? removeCommas(num) : String(num ?? 0);
    if (numStr === "" || numStr === "0" || numStr === "NaN") return "0";
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
    currentAmount: string,
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
    activeButtonRef.current = button;
    activeCellRef.current = button.parentElement as HTMLTableCellElement;
    if (activeCellRef.current) {
      activeCellRef.current.style.position = "relative";
    }
    setInoutPopup({
      userIdx,
      userID,
      nickname,
      type,
      action,
      logTypeIdx,
      currentAmount,
    });
    setAmount("");
    setLogMemo("");
  };

  const removeInoutForm = useCallback(() => {
    if (activeButtonRef.current) {
      activeButtonRef.current.classList.remove("btn-primary", "btn-danger");
      activeButtonRef.current.classList.add("btn-lightgray");
      activeButtonRef.current = null;
    }
    if (activeCellRef.current) {
      activeCellRef.current.style.position = "";
      activeCellRef.current = null;
    }
    setInoutPopup(null);
    setAmount("");
    setLogMemo("");
  }, []);

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
      setAmount("0");
    }
  };

  const getInoutTypeLabel = (type: InoutPopup["type"]) => {
    if (type === "money") return "보유머니";
    if (type === "point") return "보유포인트";
    return "카지노머니";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inoutPopup) return;
    const confirmMessage =
      inoutPopup.action === "in" ? "지급하시겠습니까?" : "회수하시겠습니까?";
    if (!confirm(confirmMessage)) return;
    const rawAmount = Number(removeCommas(amount));
    if (!rawAmount || rawAmount <= 0) {
      alert("금액을 입력해주세요.");
      return;
    }
    if (
      (inoutPopup.type === "money" || inoutPopup.type === "point") &&
      !logMemo.trim()
    ) {
      alert("메모를 입력해주세요.");
      return;
    }
    setSubmitLoading(true);
    try {
      const currency = inoutPopup.type === "point" ? "POINT" : "KRW";
      const type = inoutPopup.action === "in" ? "credit" : "debit";
      const memoNote = logMemo.trim();
      const res = await fetch(`/api/admin/wallets/adjust-balance`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: inoutPopup.userIdx,
          amount: rawAmount,
          type,
          currency,
          notes: memoNote
            ? memoNote
            : `관리자 ${inoutPopup.action === "in" ? "지급" : "회수"} (${inoutPopup.type})`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("완료되었습니다.");
        removeInoutForm();
        fetchUsers(currentPage);
      } else {
        alert(data.message || "오류가 발생했습니다.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getStatusName = (status: string) => {
    const s = (status || "").toLowerCase();
    const statusMap: { [key: string]: string } = {
      pending: "가입대기",
      active: "정상",
      suspended: "정지",
      withdrawn: "탈퇴",
      tester: "테스터",
    };
    return statusMap[s] || status;
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    const colorMap: { [key: string]: string } = {
      pending: "text-warning",
      active: "",
      suspended: "text-danger",
      withdrawn: "text-secondary",
      tester: "text-info",
    };
    return colorMap[s] || "";
  };

  const getRoleLevelName = (roleType: string, level: number) => {
    if (roleType === "partner") {
      const levelMap: { [key: number]: string } = {
        1: "부본사",
        2: "총판",
        3: "대리점1단계",
        4: "대리점2단계",
        5: "대리점3단계",
        6: "대리점4단계",
        7: "대리점5단계",
      };
      return levelMap[level] || `파트너${level}`;
    }
    return `${level}레벨`;
  };

  useEffect(() => {
    if (inoutPopup && popupRef.current && activeButtonRef.current) {
      const parent = activeButtonRef.current.parentElement;
      if (!parent) return;

      const height = parent.getBoundingClientRect().height / 2;
      const inoutHeight =
        (inoutPopup.type === "money" || inoutPopup.type === "point"
          ? 153.5
          : 112) / 2;
      const inoutWidth = popupRef.current.offsetWidth;

      popupRef.current.style.top = `${inoutHeight * -1 + height}px`;
      popupRef.current.style.right = `${inoutWidth * -1}px`;
      popupRef.current.style.left = "";
    }
  }, [inoutPopup]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inoutPopup &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".inoutControl") &&
        !(e.target as HTMLElement).closest("#inoutControlWrap")
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

  // Adjust sticky after data load
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        adjustStickyColumns();
        // resizeContent equivalent - set max-height on table wrapper
        const tableEl = tableRef.current;
        if (tableEl) {
          const wrapper = tableEl.parentElement;
          if (wrapper) {
            const height = window.innerHeight - 277;
            wrapper.style.maxHeight = `${Math.max(height, 500)}px`;
            wrapper.style.minHeight = "500px";
            const overflowEl = wrapper.parentElement;
            if (overflowEl) overflowEl.style.overflow = "auto";
          }
        }
      }, 150);

      const handleResize = () => {
        adjustStickyColumns();
        const tableEl = tableRef.current;
        if (tableEl) {
          const wrapper = tableEl.parentElement;
          if (wrapper) {
            const height = window.innerHeight - 277;
            wrapper.style.maxHeight = `${Math.max(height, 500)}px`;
          }
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [loading, users, adjustStickyColumns]);

  return (
    <Layout>
      <style>{PAGE_STYLES}</style>

      <h1 className="page-header d-flex">
        <a href="/user/list">
          <i className="fa fa-users me-2"></i>회원 목록
        </a>
        <small></small>
        <div className="ms-auto">
          <a
            href="#"
            className="btn btn-primary text-white"
            onClick={handleUserAdd}
          >
            <i className="fa fa-user-plus me-1"></i>회원 등록
          </a>
          <a
            href="#"
            className="btn btn-success text-white ms-1"
            onClick={handleUserExcel}
          >
            <i className="fa fa-user-plus me-1"></i>회원 일괄 등록
          </a>
          <button
            type="button"
            className="btn btn-primary ms-1"
            onClick={handleExcelDownload}
          >
            엑셀다운
          </button>
        </div>
      </h1>

      {/* Search / Filter Form */}
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form onSubmit={handleSearch}>
              <div className="d-flex flex-wrap align-items-center gap-2">
                {/* Page size */}
                <select
                  name="pageSize"
                  className="form-select w-80px"
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

                {/* Date range */}
                <div className="input-group" style={{ width: "280px" }}>
                  <input
                    ref={startDateRef}
                    type="text"
                    id="startDate"
                    name="startDate"
                    className="form-control date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    ref={endDateRef}
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                {/* Role (구분) */}
                <select
                  name="userRoleIdx"
                  id="userRoleIdx"
                  className="form-select w-auto"
                  value={userRoleIdx}
                  onChange={(e) => {
                    setUserRoleIdx(e.target.value);
                    setUserLevel("");
                  }}
                >
                  <option value="">구분</option>
                  <option value="3">파트너</option>
                  <option value="4">회원</option>
                </select>

                {/* Level (단계) */}
                <select
                  name="userLevel"
                  id="userLevel"
                  className="form-select w-auto"
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value)}
                >
                  <option value="">단계</option>
                  {levelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Status (상태) */}
                <select
                  name="userStatusIdx"
                  className="form-select w-auto"
                  value={userStatusIdx}
                  onChange={(e) => setUserStatusIdx(e.target.value)}
                >
                  <option value="">상태</option>
                  <option value="PENDING">가입대기</option>
                  <option value="ACTIVE">정상</option>
                  <option value="SUSPENDED">정지</option>
                  <option value="WITHDRAWN">탈퇴</option>
                  <option value="TESTER">테스터</option>
                </select>

                {/* Search type (항목) */}
                <select
                  name="searchType"
                  className="form-select w-auto"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="">항목</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                  <option value="recommend">추천인 코드</option>
                  <option value="bankername">예금주명</option>
                  <option value="register">가입일</option>
                </select>

                {/* Search text */}
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="검색어"
                />

                {/* Search button */}
                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>

                {/* Duplicate check buttons */}
                {/* <button
                  className="btn btn-purple"
                  type="button"
                  onClick={() => window.duplicateWindowOpen?.("ip")}
                >
                  <i className="fa-solid fa-copy me-2"></i>IP 중복체크
                </button>
                <button
                  className="btn btn-purple"
                  type="button"
                  onClick={() => window.duplicateWindowOpen?.("bname")}
                >
                  <i className="fa-solid fa-copy me-2"></i>예금주 중복체크
                </button>
                <button
                  className="btn btn-purple"
                  type="button"
                  onClick={() => window.duplicateWindowOpen?.("bnumber")}
                >
                  <i className="fa-solid fa-copy me-2"></i>계좌번호 중복체크
                </button> */}
              </div>
            </form>
            {/* <div className="ms-auto">
              <button className="btn btn-warning" onClick={handleBatchApprove}>
                선택 승인
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="row"
        style={{ "--bs-gutter-x": "0" } as React.CSSProperties}
      >
        <div className="col" style={{ overflowX: "scroll" }}>
          <div style={{ minWidth: "5000px" }}>
            <table
              ref={tableRef}
              id="userlisttable"
              className="table dataTable table-striped table-bordered align-middle bg-white text-center fw-bold m-0"
              style={{
                width: "100%",
                margin: "0 !important",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th className="bg-dark bg-gradient text-white">
                    <input
                      id="checkAll"
                      type="checkbox"
                      checked={checkAll}
                      onChange={handleCheckAll}
                    />
                  </th>
                  <th className="bg-dark bg-gradient text-white">No.</th>
                  <th className="bg-dark bg-gradient text-white">추천인</th>
                  <th className="bg-dark bg-gradient text-white">등급</th>
                  <th className="bg-dark bg-gradient text-white">
                    아이디(닉네임)
                  </th>
                  <th className="bg-dark bg-gradient text-white">상태</th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("money")}`}
                    colSpan={2}
                    onClick={() => handleSort("money")}
                  >
                    보유머니
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("holdemMoney")}`}
                    onClick={() => handleSort("holdemMoney")}
                  >
                    홀덤머니
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("point")}`}
                    colSpan={2}
                    onClick={() => handleSort("point")}
                  >
                    보유포인트
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalCharge")}`}
                    onClick={() => handleSort("totalCharge")}
                  >
                    충전금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalExchange")}`}
                    onClick={() => handleSort("totalExchange")}
                  >
                    환전금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalInout")}`}
                    onClick={() => handleSort("totalInout")}
                  >
                    환차액
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalRollingPointSum")}`}
                    onClick={() => handleSort("totalRollingPointSum")}
                  >
                    롤링 포인트
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalPointSum")}`}
                    onClick={() => handleSort("totalPointSum")}
                  >
                    서비스 포인트
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalPointPlusMinusSum")}`}
                    title="환차액 - 롤링포인트 - 서비스 포인트"
                    onClick={() => handleSort("totalPointPlusMinusSum")}
                  >
                    정산차액
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalPrematchBetting")}`}
                    onClick={() => handleSort("totalPrematchBetting")}
                  >
                    í¼ë리매치 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalPrematchWin")}`}
                    onClick={() => handleSort("totalPrematchWin")}
                  >
                    프리매치 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalPrematchBetWin")}`}
                    onClick={() => handleSort("totalPrematchBetWin")}
                  >
                    프리매치 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalLiveBetting")}`}
                    onClick={() => handleSort("totalLiveBetting")}
                  >
                    라이브 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalLiveWin")}`}
                    onClick={() => handleSort("totalLiveWin")}
                  >
                    라이브 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalLiveBetWin")}`}
                    onClick={() => handleSort("totalLiveBetWin")}
                  >
                    라이브 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalCasinoBetting")}`}
                    onClick={() => handleSort("totalCasinoBetting")}
                  >
                    카지노 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalCasinoWin")}`}
                    onClick={() => handleSort("totalCasinoWin")}
                  >
                    카지노 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalCasinoBetWin")}`}
                    onClick={() => handleSort("totalCasinoBetWin")}
                  >
                    카지노 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalSlotBetting")}`}
                    onClick={() => handleSort("totalSlotBetting")}
                  >
                    슬롯 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalSlotWin")}`}
                    onClick={() => handleSort("totalSlotWin")}
                  >
                    슬롯 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalSlotBetWin")}`}
                    onClick={() => handleSort("totalSlotBetWin")}
                  >
                    슬롯 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalHoldemBetting")}`}
                    onClick={() => handleSort("totalHoldemBetting")}
                  >
                    보드게임 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalHoldemWin")}`}
                    onClick={() => handleSort("totalHoldemWin")}
                  >
                    보드게임 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalHoldemBetWin")}`}
                    onClick={() => handleSort("totalHoldemBetWin")}
                  >
                    보드게임 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolder1BetMoneySum")}`}
                    onClick={() => handleSort("totalArcadeFolder1BetMoneySum")}
                  >
                    미니게임 단폴 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolder1WinMoneySum")}`}
                    onClick={() => handleSort("totalArcadeFolder1WinMoneySum")}
                  >
                    미니게임 단폴 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolder1PlusMinusSum")}`}
                    onClick={() => handleSort("totalArcadeFolder1PlusMinusSum")}
                  >
                    미니게임 단폴 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolderNBetMoneySum")}`}
                    onClick={() => handleSort("totalArcadeFolderNBetMoneySum")}
                  >
                    미니게임 다폴 베팅금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolderNWinMoneySum")}`}
                    onClick={() => handleSort("totalArcadeFolderNWinMoneySum")}
                  >
                    미니게임 다폴 당첨금
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("totalArcadeFolderNPlusMinusSum")}`}
                    onClick={() => handleSort("totalArcadeFolderNPlusMinusSum")}
                  >
                    미니게임 다폴 베팅차익
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("registerDate")}`}
                    onClick={() => handleSort("registerDate")}
                  >
                    가입일
                  </th>
                  <th
                    className={`bg-dark bg-gradient text-white ${getSortClass("lastLoginDate")}`}
                    onClick={() => handleSort("lastLoginDate")}
                  >
                    최근접속일
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Summary row */}
                <tr>
                  <td></td>
                  <td colSpan={4}>합계</td>
                  <td></td>
                  <td colSpan={2}>{addCommas(summary.totalMoney)}</td>
                  <td>0</td>
                  <td colSpan={2}>{addCommas(summary.totalPoints)}</td>
                  <td>{addCommas(summary.totalCharge)}</td>
                  <td>{addCommas(summary.totalExchange)}</td>
                  <td className="text-danger">
                    {addCommas(summary.totalInout)}
                  </td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td>0</td>
                  <td>0</td>
                  <td className="text-danger">0</td>
                  <td colSpan={2}></td>
                </tr>

                {loading ? (
                  <tr>
                    <td colSpan={totalColCount} className="p-4">
                      <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={totalColCount} className="p-4">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      key={user.userIdx || user.id}
                      data-useridx={user.userIdx || user.id}
                      data-userid={user.userID}
                      data-nickname={user.nickname}
                    >
                      {/* Checkbox */}
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedRows.has(user.userIdx || user.id)}
                          onChange={(e) =>
                            handleRowCheck(
                              user.userIdx || user.id,
                              e.target.checked,
                            )
                          }
                        />
                      </td>

                      {/* No. */}
                      <td>
                        {(currentPage - 1) * parseInt(pageSize) + index + 1}
                      </td>

                      {/* 추천인 (parent) */}
                      <td className="p-1">
                        {user.parentUsername ? (
                          <div className="dropdown">
                            <div
                              className="input-group w-auto d-flex user-action cursor-pointer"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <div
                                className="input-group-text p-1 d-inline"
                                style={{
                                  backgroundColor:
                                    ROLE_LEVEL_COLOR[
                                      user.parentRoleLevel ?? 1
                                    ] || "#f4a29c",
                                }}
                              >
                                {getRoleLevelName(
                                  "partner",
                                  user.parentRoleLevel ?? 1,
                                )}
                              </div>
                              <label className="form-control p-1 cursor-pointer">
                                {user.parentUsername}
                              </label>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-dark py-0">
                              <li
                                className="fw-600 text-white"
                                style={{
                                  padding:
                                    "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                                }}
                              >
                                <i className="fa fa-user me-2"></i>
                                {user.parentUsername}
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    window.userDetail?.(user.parentId ?? 0, 1)
                                  }
                                >
                                  정보수정
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    window.messageWrite?.(user.parentId ?? 0)
                                  }
                                >
                                  쪽지보내기
                                </a>
                              </li>
                              <li className="bg-gray-700">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    window.userDetail?.(user.parentId ?? 0, 4)
                                  }
                                >
                                  충환전내역
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                      {/* 등급 */}
                      <td>{getRoleLevelName(user.roleType, user.roleLevel)}</td>

                      {/* 아이디(닉네임) - with dropdown */}
                      <td className="p-1">
                        <a
                          href="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="user-action"
                        >
                          {user.userID} ({user.nickname})
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark py-0">
                          <li
                            className="fw-600 text-white"
                            style={{
                              padding:
                                "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                            }}
                          >
                            <i className="fa fa-user me-2"></i>
                            {user.userID} ({user.nickname})
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 1)
                              }
                            >
                              정보수정
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 17)
                              }
                            >
                              수수료율
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 3)
                              }
                            >
                              머니지급/차감
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 6)
                              }
                            >
                              포인트지급/차감
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.messageWrite?.(user.userIdx || user.id)
                              }
                            >
                              쪽지보내기
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 8)
                              }
                            >
                              베팅내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 4)
                              }
                            >
                              충환전내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 5)
                              }
                            >
                              머니거래내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 7)
                              }
                            >
                              포인트거래내역
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userDetail?.(user.userIdx || user.id, 15)
                              }
                            >
                              쿠폰 현황
                            </a>
                          </li>
                        </ul>
                      </td>

                      {/* 상태 - with status change dropdown */}
                      <td className={`p-1 ${getStatusColor(user.status)}`}>
                        <a
                          href="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className={getStatusColor(user.status)}
                        >
                          {getStatusName(user.status)}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark py-0">
                          <li
                            className="fw-600 text-white"
                            style={{
                              padding:
                                "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
                            }}
                          >
                            <i className="fa fa-user me-2"></i>
                            {user.userID}({user.nickname})
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userStatusChange?.(
                                  user.userIdx || user.id,
                                  2,
                                )
                              }
                            >
                              정상
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userStatusChange?.(
                                  user.userIdx || user.id,
                                  3,
                                )
                              }
                            >
                              정지
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userStatusChange?.(
                                  user.userIdx || user.id,
                                  4,
                                )
                              }
                            >
                              탈퇴
                            </a>
                          </li>
                          <li className="bg-gray-700">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() =>
                                window.userStatusChange?.(
                                  user.userIdx || user.id,
                                  5,
                                )
                              }
                            >
                              테스터
                            </a>
                          </li>
                        </ul>
                      </td>

                      {/* 보유머니 */}
                      <td>{addCommas(user.money ?? 0)}</td>
                      <td className="p-1">
                        <button
                          className="btn btn-sm btn-lightgray inoutControl in"
                          data-type="money"
                          data-action="in"
                          data-logtypeidx="10"
                          onClick={(e) =>
                            handleInoutControlClick(
                              e,
                              String(user.userIdx || user.id),
                              user.userID,
                              user.nickname,
                              "money",
                              "in",
                              "10",
                              String(user.money ?? 0),
                            )
                          }
                        >
                          지급
                        </button>
                        <button
                          className="btn btn-sm btn-lightgray inoutControl out ms-2"
                          data-type="money"
                          data-action="out"
                          data-logtypeidx="11"
                          onClick={(e) =>
                            handleInoutControlClick(
                              e,
                              String(user.userIdx || user.id),
                              user.userID,
                              user.nickname,
                              "money",
                              "out",
                              "11",
                              String(user.money ?? 0),
                            )
                          }
                        >
                          회수
                        </button>
                      </td>

                      {/* 홀덤머니 */}
                      <td>{addCommas(user.holdemMoney ?? 0)}</td>

                      {/* 보유포인트 */}
                      <td>{addCommas(user.points ?? 0)}</td>
                      <td className="p-1">
                        <button
                          className="btn btn-sm btn-lightgray inoutControl in"
                          data-type="point"
                          data-action="in"
                          data-logtypeidx="20"
                          onClick={(e) =>
                            handleInoutControlClick(
                              e,
                              String(user.userIdx || user.id),
                              user.userID,
                              user.nickname,
                              "point",
                              "in",
                              "20",
                              String(user.points ?? 0),
                            )
                          }
                        >
                          지급
                        </button>
                        <button
                          className="btn btn-sm btn-lightgray inoutControl out ms-2"
                          data-type="point"
                          data-action="out"
                          data-logtypeidx="21"
                          onClick={(e) =>
                            handleInoutControlClick(
                              e,
                              String(user.userIdx || user.id),
                              user.userID,
                              user.nickname,
                              "point",
                              "out",
                              "21",
                              String(user.points ?? 0),
                            )
                          }
                        >
                          회수
                        </button>
                      </td>

                      {/* 충전금 */}
                      <td>{addCommas(user.totalCharge ?? 0)}</td>
                      {/* 환전금 */}
                      <td>{addCommas(user.totalExchange ?? 0)}</td>
                      {/* 환차액 */}
                      <td className="text-danger">
                        {addCommas(user.totalInout ?? 0)}
                      </td>
                      {/* 롤링 포인트 */}
                      <td>{addCommas(user.totalRollingPointSum ?? 0)}</td>
                      {/* 서비스 포인트 */}
                      <td>{addCommas(user.totalPointSum ?? 0)}</td>
                      {/* 정산차액 */}
                      <td className="text-danger">
                        {addCommas(user.totalPointPlusMinusSum ?? 0)}
                      </td>
                      {/* 프리매치 베팅금 */}
                      <td>{addCommas(user.totalPrematchBetting ?? 0)}</td>
                      {/* 프리매치 당첨금 */}
                      <td>{addCommas(user.totalPrematchWin ?? 0)}</td>
                      {/* 프리매치 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalPrematchBetWin ?? 0)}
                      </td>
                      {/* 라이브 베팅금 */}
                      <td>{addCommas(user.totalLiveBetting ?? 0)}</td>
                      {/* 라이브 당첨금 */}
                      <td>{addCommas(user.totalLiveWin ?? 0)}</td>
                      {/* 라이브 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalLiveBetWin ?? 0)}
                      </td>
                      {/* 카지노 베팅금 */}
                      <td>{addCommas(user.totalCasinoBetting ?? 0)}</td>
                      {/* 카지노 당첨금 */}
                      <td>{addCommas(user.totalCasinoWin ?? 0)}</td>
                      {/* 카지노 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalCasinoBetWin ?? 0)}
                      </td>
                      {/* 슬롯 베팅금 */}
                      <td>{addCommas(user.totalSlotBetting ?? 0)}</td>
                      {/* 슬롯 당첨금 */}
                      <td>{addCommas(user.totalSlotWin ?? 0)}</td>
                      {/* 슬롯 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalSlotBetWin ?? 0)}
                      </td>
                      {/* 보드게임 베팅금 */}
                      <td>{addCommas(user.totalHoldemBetting ?? 0)}</td>
                      {/* 보드게임 당첨금 */}
                      <td>{addCommas(user.totalHoldemWin ?? 0)}</td>
                      {/* 보드게임 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalHoldemBetWin ?? 0)}
                      </td>
                      {/* 미니게임 단폴 베팅금 */}
                      <td>
                        {addCommas(user.totalArcadeFolder1BetMoneySum ?? 0)}
                      </td>
                      {/* 미니게임 단폴 당첨금 */}
                      <td>
                        {addCommas(user.totalArcadeFolder1WinMoneySum ?? 0)}
                      </td>
                      {/* 미니게임 단폴 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalArcadeFolder1PlusMinusSum ?? 0)}
                      </td>
                      {/* 미니게임 다폴 베팅금 */}
                      <td>
                        {addCommas(user.totalArcadeFolderNBetMoneySum ?? 0)}
                      </td>
                      {/* 미니게임 다폴 당첨금 */}
                      <td>
                        {addCommas(user.totalArcadeFolderNWinMoneySum ?? 0)}
                      </td>
                      {/* 미니게임 다폴 베팅차익 */}
                      <td className="text-danger">
                        {addCommas(user.totalArcadeFolderNPlusMinusSum ?? 0)}
                      </td>
                      {/* 가입일 */}
                      <td>{user.registerDate || ""}</td>
                      {/* 최근접속일 */}
                      <td>{user.lastLoginDate || ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inout popup (speech bubble) — portaled into the clicked button's table cell */}
      {inoutPopup &&
        activeCellRef.current &&
        createPortal(
          <div
            id="inoutControlWrap"
            ref={popupRef}
            className="speech-bubble p-2"
            data-type={inoutPopup.type}
            data-action={inoutPopup.action}
          >
            <form id="frmInout" name="frmInout" onSubmit={handleFormSubmit}>
              <h5 className="text-center">
                {inoutPopup.userID} ({inoutPopup.nickname}){" "}
                {getInoutTypeLabel(inoutPopup.type)} :{" "}
                <b>{addCommas(inoutPopup.currentAmount)}</b>
              </h5>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control flex-none"
                  value={inoutPopup.action === "in" ? "지급" : "회수"}
                  style={{ width: "105px" }}
                  readOnly
                />
                <input
                  ref={amountInputRef}
                  type="text"
                  name={inoutPopup.type}
                  className="form-control amount"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{ textAlign: "right" }}
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-success"
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "저장"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-sm moneyControl btn-secondary"
                  onClick={removeInoutForm}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-sm moneyControl btn-danger moneyReset"
                  onClick={() => setAmount("")}
                >
                  초기화
                </button>
              </div>
              <div className="input-group mt-2">
                {[
                  "1,000",
                  "5,000",
                  "10,000",
                  "50,000",
                  "100,000",
                  "500,000",
                  "1,000,000",
                ].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-sm moneyControl btn-info"
                    onClick={() => handlePresetAmountClick(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {(inoutPopup.type === "money" || inoutPopup.type === "point") && (
                <input
                  type="text"
                  className="form-control mt-2"
                  name="logMemo"
                  placeholder="메모"
                  value={logMemo}
                  onChange={(e) => setLogMemo(e.target.value)}
                  required
                />
              )}
            </form>
          </div>,
          activeCellRef.current,
        )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => fetchUsers(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
              const start = Math.max(1, currentPage - 4);
              const page = start + i;
              if (page > totalPages) return null;
              return (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchUsers(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => fetchUsers(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* Floating memo tooltip container - used by .user-memo hover */}
      <div className="memo-container" ref={memoRef}></div>
    </Layout>
  );
}
