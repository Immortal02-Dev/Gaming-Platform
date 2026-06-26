"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface CustomWindow extends Window {
  userSelectPopup?: () => void;
  fnSelectUser?: (userIdx: string | number, text: string, child: string) => void;
  fnDeSelectUser?: () => void;
  depthControl?: (obj: HTMLElement, depth: string, level: number, userIdx: string | number) => void;
  userDetail?: (userIdx: string | number, tab: number) => void;
  messageWrite?: (userIdx: string | number) => void;
  flatpickr?: (element: HTMLElement | string, options?: Record<string, unknown>) => unknown;
}

declare const window: CustomWindow;

const GAME_GROUPS = [
  { idx: "2", width: "1900px", label: "카지노/슬롯", active: true },
  { idx: "5", width: "2230px", label: "보드게임", active: false },
  { idx: "4", width: "17280px", label: "미니게임", active: false },
  { idx: "1", width: "3420px", label: "스포츠", active: false },
] as const;

const GAME_TYPES = [
  { groupIdx: "5", idx: "8", width: "830px", label: "플레이홀덤" },
  { groupIdx: "5", idx: "18", width: "830px", label: "와일드홀덤" },
  { groupIdx: "5", idx: "19", width: "830px", label: "웹맞고" },
  { groupIdx: "5", idx: "20", width: "830px", label: "웹바둑이" },
  { groupIdx: "5", idx: "22", width: "830px", label: "로얄홀덤" },
  { groupIdx: "4", idx: "4", width: "3280px", label: "파워볼(PBG)" },
  { groupIdx: "4", idx: "10", width: "3280px", label: "EOS파워볼5분" },
  { groupIdx: "4", idx: "11", width: "3280px", label: "EOS파워볼3분" },
  { groupIdx: "4", idx: "12", width: "3280px", label: "코인파워볼5분" },
  { groupIdx: "4", idx: "13", width: "3280px", label: "코인파워볼3분" },
  { groupIdx: "4", idx: "14", width: "1880px", label: "코인사다리5분" },
  { groupIdx: "4", idx: "15", width: "1880px", label: "코인사다리3분" },
] as const;

const COMMISSION_TYPES = ["롤링", "루징", "콤프", "첫충", "매충"] as const;

interface CommissionRate {
  game_group_idx: number;
  game_type_idx: number;
  rolling_rate: number | string | null;
  losing_rate: number | string | null;
  comp_rate: number | string | null;
  first_charge_rate: number | string | null;
  every_charge_rate: number | string | null;
}

interface TreeNode {
  userIdx: number;
  userID: string;
  nickname: string;
  balance: number;
  points: number;
  roleType: string;
  roleLevel: number;
  parent_id: number | null;
  depth: number;
  path: string;
  child_count: number;
  status: string;
  childBalance: number | null;
  childPoints: number | null;
  children?: TreeNode[];
  commissions?: CommissionRate[];
}

interface TreeListResponse {
  success: boolean;
  data: TreeNode[];
}

const handleUserSelect = () => {
  if (window.userSelectPopup) {
    window.userSelectPopup();
  }
};

const handleUserAdd = () => {
  const width = 750;
  const height = 655;
  const left = (window.innerWidth / 2) - (width / 2);
  const top = (window.innerHeight / 2) - (height / 2);
  window.open(
    '/user/user/add',
    'popup',
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

// Helper function to get commission values for a game type
const getCommissionValues = (commissions: CommissionRate[] | undefined, gameGroupIdx: number, gameTypeIdx: number): string[] => {
  if (!commissions) return ["&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%"];

  const commission = commissions.find(c =>
    c.game_group_idx === gameGroupIdx && c.game_type_idx === gameTypeIdx
  );

  if (!commission) return ["&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%"];

  // Helper function to safely convert and format rate
  const formatRate = (rate: number | string | null | undefined): string => {
    if (rate === null || rate === undefined || rate === '') return "&nbsp;%";
    const numRate = typeof rate === 'number' ? rate : parseFloat(rate);
    if (isNaN(numRate)) return "&nbsp;%";
    return `${numRate.toFixed(2)}&nbsp;%`;
  };

  return [
    formatRate(commission.rolling_rate),
    formatRate(commission.losing_rate),
    formatRate(commission.comp_rate),
    formatRate(commission.first_charge_rate),
    formatRate(commission.every_charge_rate)
  ];
};

// Helper function to generate all game commission columns
const renderGameColumns = (commissions?: CommissionRate[], casinoValues?: string[], slotValues?: string[]) => {
  const columns: React.JSX.Element[] = [];

  // 스포츠 columns (groupIdx1) - hidden by default
  const sportsTypes = [
    { typeIdx: "6", count: 7 },
    { typeIdx: "9", count: 7 },
    { typeIdx: "6", count: 7 },
    { typeIdx: "7", count: 25 },
  ];
  sportsTypes.forEach(({ typeIdx, count }, groupIdx) => {
    for (let i = 0; i < count; i++) {
      columns.push(
        <td key={`sports-${groupIdx}-${typeIdx}-${i}`} className={`game groupIdx1 typeIdx${typeIdx} d-none`}>
          {"\u00A0"}%
        </td>
      );
    }
  });

  // 카지노/슬롯 columns (groupIdx2/3) - shown when active
  if (commissions) {
    const casinoCommissions = getCommissionValues(commissions, 2, 2);
    const slotCommissions = getCommissionValues(commissions, 3, 3);
    for (let i = 0; i < 5; i++) {
      const value = casinoValues && casinoValues[i] !== undefined ? casinoValues[i] : casinoCommissions[i];
      columns.push(
        <td key={`casino-${i}`} className="game groupIdx2 typeIdx2 d-none" dangerouslySetInnerHTML={{ __html: value }} />
      );
    }
    for (let i = 0; i < 5; i++) {
      const value = slotValues && slotValues[i] !== undefined ? slotValues[i] : slotCommissions[i];
      columns.push(
        <td key={`slot-${i}`} className="game groupIdx3 typeIdx3 d-none" dangerouslySetInnerHTML={{ __html: value }} />
      );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const value = casinoValues && casinoValues[i] !== undefined ? casinoValues[i] : "&nbsp;%";
      columns.push(
        <td key={`casino-${i}`} className="game groupIdx2 typeIdx2 d-none" dangerouslySetInnerHTML={{ __html: value }} />
      );
    }
    for (let i = 0; i < 5; i++) {
      const value = slotValues && slotValues[i] !== undefined ? slotValues[i] : "&nbsp;%";
      columns.push(
        <td key={`slot-${i}`} className="game groupIdx3 typeIdx3 d-none" dangerouslySetInnerHTML={{ __html: value }} />
      );
    }
  }

  // 보드게임 columns (groupIdx5) - shown by default
  const boardGames = [
    { typeIdx: "8", count: 5 },
    { typeIdx: "18", count: 5 },
    { typeIdx: "19", count: 5 },
    { typeIdx: "20", count: 5 },
    { typeIdx: "22", count: 5 },
  ];
  boardGames.forEach(({ typeIdx }) => {
    const boardCommissions = commissions ? getCommissionValues(commissions, 5, parseInt(typeIdx)) : ["&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%", "&nbsp;%"];
    for (let i = 0; i < 5; i++) {
      columns.push(
        <td key={`board-${typeIdx}-${i}`} className={`game groupIdx5 typeIdx${typeIdx}`} dangerouslySetInnerHTML={{ __html: boardCommissions[i] }} />
      );
    }
  });

  // 미니게임 columns (groupIdx4) - hidden by default
  const miniGames = [
    { typeIdx: "4", count: 5 },
    { typeIdx: "10", count: 25 },
    { typeIdx: "11", count: 25 },
    { typeIdx: "12", count: 25 },
    { typeIdx: "13", count: 25 },
    { typeIdx: "14", count: 20 },
    { typeIdx: "15", count: 20 },
  ];
  miniGames.forEach(({ typeIdx, count }, groupIdx) => {
    for (let i = 0; i < count; i++) {
      columns.push(
        <td key={`mini-${groupIdx}-${typeIdx}-${i}`} className={`game groupIdx4 typeIdx${typeIdx} d-none`}>
          {"\u00A0"}%
        </td>
      );
    }
  });

  return columns;
};

// Helper function to render user dropdown menu
const renderUserDropdown = (userIdx: number, username: string) => (
  <ul className="dropdown-menu dropdown-menu-dark py-0">
    <li
      className="fw-600 text-white"
      style={{
        padding: "var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x)",
      }}
    >
      <i className="fa fa-user me-2"></i>{username}
    </li>
    <li className="bg-gray-700">
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 1); }}
      >
        정보수정
      </a>
    </li>
    <li className="bg-gray-700">
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 17); }}
      >
        수수료율
      </a>
    </li>
    <li className="bg-gray-700">
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 3); }}
      >
        머니지급/차감
      </a>
    </li>
    <li className="bg-gray-700">
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 6); }}
      >
        포인트지급/차감
      </a>
    </li>
    <li className="bg-gray-700">
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.messageWrite?.(userIdx); }}
      >
        쪽지보내기
      </a>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 8); }}
      >
        베팅내역
      </a>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 4); }}
      >
        충환전내역
      </a>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 5); }}
      >
        머니거래내역
      </a>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 7); }}
      >
        포인트거래내역
      </a>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={(e) => { e.preventDefault(); window.userDetail?.(userIdx, 15); }}
      >
        쿠폰 현황
      </a>
    </li>
  </ul>
);

// Helper function to update odd/even row classes
const updateTableOddEven = () => {
  if (typeof document === 'undefined') return;
  const rows = document.querySelectorAll("#listTable tbody tr");
  let oddeven = 0;
  rows.forEach((row) => {
    row.classList.remove("odd");
    const computedStyle = window.getComputedStyle(row);
    if (computedStyle.display !== "none") {
      oddeven++;
      if (oddeven % 2 === 1) {
        row.classList.add("odd");
      }
    }
  });
};

export default function UserTreeListPage() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const searchFormRef = useRef<HTMLFormElement>(null);

  const fetchTreeData = useCallback(async (userIdx?: number, userID?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userIdx) params.append('userIdx', userIdx.toString());
      if (userID) params.append('userID', userID);

      const response = await fetch(`${BACKEND_URL}/api/admin/user/tree/list?${params.toString()}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData);

        if (response.status === 500) {
          throw new Error(`서버 오류가 발생했습니다: ${errorData.error || 'Internal Server Error'}`);
        } else if (response.status === 403) {
          throw new Error('권한이 부족합니다. 관리자 계정으로 로그인해주세요.');
        } else if (response.status === 401) {
          throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
        }
        throw new Error(errorData.error || `Failed to fetch tree data: ${response.status}`);
      }

      const result: TreeListResponse = await response.json();

      if (result.success) {
        setTreeData(result.data || []);
        console.log('Tree data loaded:', result.data?.length || 0, 'root users');
        // Debug: Log children structure
        result.data?.forEach((node, idx) => {
          console.log(`Root node ${idx}:`, {
            userID: node.userID,
            child_count: node.child_count,
            childrenLength: node.children?.length || 0,
            children: node.children
          });
        });
      } else {
        console.error('API returned error:', result);
      }
    } catch (error) {
      console.error('Failed to fetch tree data:', error);
      setTreeData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  useEffect(() => {
    // Update odd/even after data changes
    setTimeout(() => {
      updateTableOddEven();
    }, 100);
  }, [treeData, expandedNodes]);

  const getRoleLabel = (roleType: string, roleLevel: number): string => {
    if (roleType === 'partner') {
      return roleLevel === 1 ? '부본사' : '총판';
    }
    return '회원';
  };

  const getRoleColor = (roleType: string, roleLevel: number): string => {
    if (roleType === 'partner') {
      return roleLevel === 1 ? '#f4a29c' : '#f4dc95';
    }
    return '#ffffff';
  };

  const toggleNode = useCallback((path: string) => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      return newExpanded;
    });
  }, []);

  const formatNumber = (num: number | null): string => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString('ko-KR');
  };

  const renderTreeRow = (node: TreeNode, depth: number, path: string, rowNum: { current: number }, isChild: boolean = false, parentPath?: string): React.JSX.Element[] => {
    const rows: React.JSX.Element[] = [];
    const isExpanded = expandedNodes.has(path);
    // For children, check if their parent path is expanded
    const isParentExpanded = parentPath ? expandedNodes.has(parentPath) : false;
    // Show if: not a child, or this node is expanded, or parent is expanded
    const shouldShow = !isChild || isExpanded || isParentExpanded;
    // Check both child_count and children array
    const hasChildren = (node.child_count && node.child_count > 0) || (node.children && node.children.length > 0);
    const paddingLeft = isChild ? `${depth * 25}px` : '5px';
    const displayStyle = !shouldShow ? { display: 'none' as const } : {};
    const currentRowNum = rowNum.current++;

    // Debug logging for children visibility
    if (isChild && hasChildren) {
      console.log(`[renderTreeRow] Child ${node.userID}: path=${path}, parentPath=${parentPath}, isExpanded=${isExpanded}, isParentExpanded=${isParentExpanded}, shouldShow=${shouldShow}`);
    }

    rows.push(
      <tr
        key={`${path}-${node.userIdx}`}
        data-depth={path}
        className={`depthclose ${isExpanded ? '' : 'depthclose'} ${hasChildren ? 'depthLoad' : ''} ${currentRowNum % 2 === 0 ? 'odd' : ''}`}
        style={displayStyle}
      >
        <td>{!isChild ? currentRowNum : ''}</td>
        <td
          className="text-start"
          style={{
            paddingLeft,
            paddingRight: "5px",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className="input-group w-auto d-inline-flex user-action"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div
              className="input-group-text p-1 cursor-pointer"
              style={{ backgroundColor: getRoleColor(node.roleType, node.roleLevel) }}
            >
              {getRoleLabel(node.roleType, node.roleLevel)}
            </div>
            <label className="form-control p-1 cursor-pointer">
              {node.userID} ({node.nickname})
            </label>
          </div>
          {renderUserDropdown(node.userIdx, `${node.userID} (${node.nickname})`)}
          {hasChildren && (
            <div
              className="input-group w-auto d-inline-flex btn-fold"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(path);
              }}
            >
              <label className="input-group-text bg-white p-1 cursor-pointer">
                <i className={`fa ${isExpanded ? 'fa-minus' : 'fa-plus'}`}></i>({node.child_count || node.children?.length || 0})
              </label>
            </div>
          )}
        </td>
        <td className="">{formatNumber(node.balance)}</td>
        <td className="">{formatNumber(node.points)}</td>
        <td className="">{formatNumber(node.childBalance)}</td>
        <td className="">{formatNumber(node.childPoints)}</td>
        {renderGameColumns(node.commissions)}
      </tr>
    );

    // Render children recursively
    if (hasChildren && node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childPath = `${path}-${child.userIdx}`;
        // Pass the current path as parentPath so children know if their parent is expanded
        const childRows = renderTreeRow(child, depth + 1, childPath, rowNum, true, path);
        rows.push(...childRows);
      });
    } else if (hasChildren && node.child_count > 0 && (!node.children || node.children.length === 0)) {
      // If child_count > 0 but children array is empty, log for debugging
      console.warn(`Node ${node.userID} has child_count=${node.child_count} but no children array`, node);
    }

    return rows;
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{
        __html: `
          #listTable tbody .odd td {
            background-color: rgba(
              var(--bs-gray-200-rgb),
              var(--bs-bg-opacity)
            ) !important;
            color: var(--bs-table-striped-color);
          }

          #listTable thead th,
          .table tbody td {
            word-break: keep-all;
          }

          .sticky {
            position: -webkit-sticky !important;
            position: sticky !important;
          }

          #listTable > :not(caption) > * > td {
            background-color: #ffffff;
          }

          #listTable td,
          th {
            border-left: 0;
            border-bottom-style: solid !important;
            border-bottom: 1px;
            border-bottom-color: rgb(206, 212, 218);
          }

          #listTable {
            margin: 0 !important;
            border-collapse: separate !important;
            border-spacing: 0 !important;
          }

          #listTable td.sticky,
          #listTable th.sticky {
            position: sticky;
            background-color: inherit;
          }

          #listTable td.sticky:first-child,
          #listTable th.sticky:first-child {
            border-right: 1px solid rgb(206, 212, 218);
          }

          #listTable td.sticky:nth-child(2),
          #listTable th.sticky:nth-child(2) {
            border-right: 1px solid rgb(206, 212, 218);
          }

          #content .dropdown-toggle::after {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 0.255em;
            vertical-align: 0.255em;
            content: "";
            border-top: 0.3em solid;
            border-right: 0.3em solid transparent;
            border-bottom: 0;
            border-left: 0.3em solid transparent;
          }

          .warningUser {
            color: #6aa84f !important;
          }

          .warningUser .user-action label {
            color: #6aa84f !important;
          }

          .warningUser .user-action {
            color: #6aa84f !important;
          }

          .warningUser2 {
            color: #744700 !important;
          }

          .warningUser2 .user-action label {
            color: #744700 !important;
          }

          .warningUser2 .user-action {
            color: #744700 !important;
          }

          /* Sub-rows are hidden by default via inline styles - JavaScript will control visibility */
        `
      }} />

      <h1 className="page-header">
        <a href="/user/tree/list">
          <i className="fa fa-users me-2"></i>회원 트리뷰
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form
              ref={searchFormRef}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const userIdx = formData.get('userIdx') as string;
                const userID = formData.get('userID') as string;
                if (userIdx) {
                  fetchTreeData(parseInt(userIdx, 10));
                } else if (userID) {
                  fetchTreeData(undefined, userID);
                } else {
                  fetchTreeData();
                }
              }}
              id="searchForm"
            >
              <div className="d-flex">
                <div className="input-group me-2" style={{ width: "200px" }}>
                  <input
                    type="text"
                    name="userID"
                    id="userID"
                    onClick={handleUserSelect}
                    className="form-control"
                    required
                    readOnly
                    value=""
                  />
                  <input
                    type="hidden"
                    name="userIdx"
                    id="userIdx"
                    value=""
                  />
                  <input
                    type="hidden"
                    name="child"
                    id="child"
                    value=""
                  />
                  <a
                    className="btn btn-primary"
                    onClick={handleUserSelect}
                  >
                    <i className="fas fa-check me-2"></i>선택
                  </a>
                </div>
                <button className="btn btn-lime" id="btnSearch" type="submit">
                  <i
                    className="fa-solid fa-magnifying-glass me-2"
                    data-idx="null"
                  ></i>
                  검색
                </button>
                {GAME_GROUPS.map((group) => (
                  <div key={group.idx} className="input-group-append ms-2">
                    <button
                      className={`btn btn-info gameGroup ${group.active ? "active" : ""}`}
                      type="button"
                      data-idx={group.idx}
                      data-width={group.width}
                    >
                      <i className="fa-solid fa-music me-2"></i>{group.label}
                    </button>
                  </div>
                ))}
              </div>
              <div className="col-12">
                <div className="d-flex">
                  <div className="btn-radio game-type">
                    {GAME_TYPES.map((type) => (
                      <button
                        key={`${type.groupIdx}-${type.idx}`}
                        type="button"
                        className={`btn btn-sm groupIdx${type.groupIdx} gameType btn-success d-none mt-2 ${type.groupIdx === "5" ? "ms-2" : ""}`}
                        data-idx={type.idx}
                        data-width={type.width}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </form>
            <div className="ms-auto">
              <a
                href="#"
                className="btn btn-primary text-white"
                onClick={handleUserAdd}
              >
                <i className="fa fa-user-plus me-1"></i>회원 등록
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col" style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "2230px", maxHeight: "663px", minHeight: "500px" }}>
            <table
              className="table table-bordered table-responsive align-middle bg-white text-center fw-bold"
              id="listTable"
              style={{
                width: "100%",
                borderSpacing: "0",
              }}
            >
              <colgroup>
                <col width="80px" />
                <col width="*" />
                <col width="120px" />
                <col width="120px" />
                <col width="120px" />
                <col width="120px" />
                {/* 카지노/슬롯 columns */}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`casino-${i}`} width="70px" className="game groupIdx2 typeIdx2 d-none" />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`slot-${i}`} width="70px" className="game groupIdx3 typeIdx3 d-none" />
                ))}
                {/* 보드게임 columns */}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`playholdem-${i}`} width="70px" className="game groupIdx5 typeIdx8" />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`wildholdem-${i}`} width="70px" className="game groupIdx5 typeIdx18" />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`matgo-${i}`} width="70px" className="game groupIdx5 typeIdx19" />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`baduk-${i}`} width="70px" className="game groupIdx5 typeIdx20" />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                  <col key={`royalholdem-${i}`} width="70px" className="game groupIdx5 typeIdx22" />
                ))}
                {/* Additional game columns would continue here - structure preserved */}
              </colgroup>
              <thead className="sticky" style={{ zIndex: 2, top: 0 }}>
                <tr>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white align-middle"
                  >
                    No.
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white align-middle"
                  >
                    아이디 / 닉네임
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white sticky align-middle"
                  >
                    보유 금액
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white sticky align-middle"
                  >
                    보유 포인트
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white sticky align-middle"
                  >
                    하부 보유 금액
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-dark bg-gradient text-white sticky align-middle"
                  >
                    하부 보유 포인트
                  </th>
                  {/* 카지노/슬롯 headers */}
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx2 typeIdx2 d-none"
                    colSpan={5}
                  >
                    카지노 수수료
                  </th>
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx3 typeIdx3 d-none"
                    colSpan={5}
                  >
                    슬롯 수수료
                  </th>
                  {/* 보드게임 headers */}
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx5 typeIdx8"
                    colSpan={5}
                  >
                    플레이홀덤 수수료
                  </th>
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx5 typeIdx18"
                    colSpan={5}
                  >
                    와일드홀덤 수수료
                  </th>
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx5 typeIdx19"
                    colSpan={5}
                  >
                    웹맞고 수수료
                  </th>
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx5 typeIdx20"
                    colSpan={5}
                  >
                    웹바둑이 수수료
                  </th>
                  <th
                    className="bg-dark bg-gradient text-white sticky game groupIdx5 typeIdx22"
                    colSpan={5}
                  >
                    로얄홀덤 수수료
                  </th>
                </tr>
                <tr>
                  {/* 카지노/슬롯 second row headers */}
                  {Array.from({ length: 2 }, (_, groupIdx) => (
                    COMMISSION_TYPES.map((type, typeIdx) => (
                      <th
                        key={`casino-slot-${groupIdx}-${typeIdx}`}
                        className={`bg-dark bg-gradient text-white sticky game ${groupIdx === 0 ? "groupIdx2 typeIdx2" : "groupIdx3 typeIdx3"} d-none`}
                      >
                        {type}
                      </th>
                    ))
                  ))}
                  {/* 보드게임 second row headers */}
                  {[
                    { groupIdx: "5", typeIdx: "8" },
                    { groupIdx: "5", typeIdx: "18" },
                    { groupIdx: "5", typeIdx: "19" },
                    { groupIdx: "5", typeIdx: "20" },
                    { groupIdx: "5", typeIdx: "22" },
                  ].map((game) => (
                    COMMISSION_TYPES.map((type) => (
                      <th
                        key={`board-${game.typeIdx}-${type}`}
                        className={`bg-dark bg-gradient text-white sticky game groupIdx${game.groupIdx} typeIdx${game.typeIdx}`}
                      >
                        {type}
                      </th>
                    ))
                  ))}
                </tr>
              </thead>
              <tbody id="listTableBody">
                {loading ? (
                  <tr>
                    <td colSpan={40} className="text-center p-4">
                      <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                    </td>
                  </tr>
                ) : treeData.length === 0 ? (
                  <tr>
                    <td colSpan={40} className="text-center p-4">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  treeData.flatMap((node, index) => {
                    const rowNum = { current: index + 1 };
                    return renderTreeRow(node, 0, String(node.userIdx), rowNum, false);
                  })
                )}
                {/* Static rows removed - now using dynamic rendering */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
