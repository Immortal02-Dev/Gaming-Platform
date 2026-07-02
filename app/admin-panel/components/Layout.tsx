"use client";

import { ReactNode, useEffect, useState, useRef, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import UserDetailModal from "./UserDetailModal";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Record<number, number>>({});
  const prevCountsRef = useRef<Record<number, number>>({});
  const mobileSidebarCloseTimerRef = useRef<number | null>(null);
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    userIdx: string | number;
    tabIdx: number;
  }>({
    isOpen: false,
    userIdx: "",
    tabIdx: 1,
  });

  const getSoundUrl = (soundIdx: number) => {
    const soundMap: { [key: number]: string } = {
      2: "/assets/sound/newuser.mp3",
      3: "/assets/sound/newpartner.mp3",
      4: "/assets/sound/charge.mp3",
      5: "/assets/sound/exchange.mp3",
      6: "/assets/sound/qna.mp3",
      7: "/assets/sound/payback.mp3",
      8: "/assets/sound/sportWin.mp3",
      9: "/assets/sound/casinoWin.mp3",
      10: "/assets/sound/slotWin.mp3",
      11: "/assets/sound/miniWin.mp3",
      12: "/assets/sound/boardWin.mp3",
    };
    return soundMap[soundIdx] || "";
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/admin/alarm/counts");
        const json = await res.json();
        if (json.success) {
          const newCounts = json.data;
          const settings = json.settings;

          // Check for increases and play sound
          Object.keys(newCounts).forEach((id) => {
            const alarmId = parseInt(id);
            const currentCount = newCounts[alarmId];
            const previousCount = prevCountsRef.current[alarmId] || 0;

            if (currentCount > previousCount) {
              const setting = settings[alarmId];
              if (setting && setting.sound_idx > 1) {
                const audioUrl = getSoundUrl(setting.sound_idx);
                if (audioUrl) {
                  const audio = new Audio(audioUrl);
                  audio
                    .play()
                    .catch((e) => console.error("Alarm play failed", e));
                }
              }
            }
          });

          prevCountsRef.current = newCounts;
          setCounts(newCounts);
        }
      } catch (err) {
        console.error("Alarm polling failed", err);
      }
    };

    const interval = setInterval(fetchCounts, 10000); // Polling every 10 seconds
    fetchCounts();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let attempts = 0;
    const fixLayout = () => {
      window.dispatchEvent(new Event("resize"));

      const sidebarContent = document.querySelector(
        ".app-sidebar-content",
      ) as HTMLElement | null;
      if (sidebarContent) {
        interface PSElement extends HTMLElement {
          _ps_?: { destroy?: () => void };
          ps?: { destroy?: () => void };
        }
        const psEl = sidebarContent as PSElement;

        if (psEl._ps_ && typeof psEl._ps_.destroy === "function") {
          psEl._ps_.destroy();
          delete psEl._ps_;
        }
        if (psEl.ps && typeof psEl.ps.destroy === "function") {
          psEl.ps.destroy();
          delete psEl.ps;
        }

        sidebarContent.classList.remove("ps", "ps--active-y", "ps--active-x");
        sidebarContent
          .querySelectorAll(".ps__rail-x, .ps__rail-y")
          .forEach((el) => el.remove());

        sidebarContent.style.overflow = "";
        sidebarContent.style.overflowY = "auto";
        sidebarContent.style.overflowX = "hidden";
      }

      attempts++;
      if (attempts < 10) {
        setTimeout(fixLayout, 500);
      }
    };

    fixLayout();
  }, []);

  const clearMobileSidebarCloseTimer = () => {
    if (mobileSidebarCloseTimerRef.current === null) return;
    window.clearTimeout(mobileSidebarCloseTimerRef.current);
    mobileSidebarCloseTimerRef.current = null;
  };

  const finishMobileSidebarClose = () => {
    const app = document.getElementById("app");
    if (!app) return;
    app.classList.remove("app-sidebar-mobile-closed");
    clearMobileSidebarCloseTimer();
  };

  const closeMobileSidebar = () => {
    const app = document.getElementById("app");
    if (!app) return;

    clearMobileSidebarCloseTimer();
    app.classList.remove("app-sidebar-mobile-toggled");
    app.classList.add("app-sidebar-mobile-closed");

    const sidebar = document.querySelector(
      ".app-sidebar:not(.app-sidebar-end)",
    );
    sidebar?.addEventListener("animationend", finishMobileSidebarClose, {
      once: true,
    });
    mobileSidebarCloseTimerRef.current = window.setTimeout(
      finishMobileSidebarClose,
      250,
    );
  };

  const openMobileSidebar = () => {
    const app = document.getElementById("app");
    if (!app) return;

    clearMobileSidebarCloseTimer();
    app.classList.remove("app-sidebar-mobile-closed");
    app.classList.add("app-sidebar-mobile-toggled");
  };

  const toggleMobileSidebar = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const app = document.getElementById("app");
    if (!app) return;

    if (app.classList.contains("app-sidebar-mobile-toggled")) {
      closeMobileSidebar();
      return;
    }

    openMobileSidebar();
  };

  const dismissMobileSidebar = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMobileSidebar();
  };

  useEffect(() => {
    return () => {
      clearMobileSidebarCloseTimer();
    };
  }, []);

  // Add global messageWrite function for use in href="javascript:messageWrite(userId)"
  useEffect(() => {
    if (typeof window !== "undefined") {
      interface CustomWindow extends Window {
        messageWrite: (receiverId: string | number) => void;
        userDetail: (userIdx: string | number, tab: number) => void;
        openUserDetailModal: (userIdx: string | number, tab: number) => void;
      }

      const customWindow = window as unknown as CustomWindow;

      customWindow.openUserDetailModal = (
        userIdx: string | number,
        tab: number = 1,
      ) => {
        setDetailModal({ isOpen: true, userIdx, tabIdx: tab });
      };

      customWindow.messageWrite = (receiverId: string | number) => {
        const nWidth = 750;
        const nHeight = 690;

        const curX = window.screenLeft || window.screenX || 0;
        const curY = window.screenTop || window.screenY || 0;
        const curWidth =
          window.innerWidth || document.documentElement.clientWidth;
        const curHeight =
          window.innerHeight || document.documentElement.clientHeight;

        const nLeft = curX + curWidth / 2 - nWidth / 2;
        const nTop = curY + curHeight / 2 - nHeight / 2;

        window.open(
          `/message/write?receiverId=${receiverId}`,
          `messageWrite${receiverId}`,
          `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no, resizable=yes, scrollbars=yes`,
        );
      };

      customWindow.userDetail = (userIdx: string | number, tab: number = 1) => {
        setDetailModal({ isOpen: true, userIdx, tabIdx: tab });
      };
    }
  }, []);

  return (
    <div id="app" className="app app-header-fixed app-sidebar-fixed">
      <div id="header" className="app-header">
        <div className="navbar-header">
          <a href="/dashboard" className="navbar-brand">
            <span className="navbar-logo"></span> <b>샘플1</b> Admin
          </a>
          <button
            type="button"
            className="navbar-mobile-toggler"
            data-toggle="app-sidebar-mobile"
            onClick={toggleMobileSidebar}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="d-flex flex-grow-1">
          <div className="navbar-nav justify-content-start moneyinfo">
            {/* Preserved structure; dynamic numbers are handled by existing JS */}
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  신규<span className="d-none d-md-inline">회원</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="userRegisterRequestCount">
                    {counts[1] || 0}
                  </span>
                  /<span id="userRegisterCompleteCount">0</span>
                </div>
              </div>
            </div>
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  신규<span className="d-none d-md-inline">파트너</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="partnerRegisterRequestCount">
                    {counts[2] || 0}
                  </span>
                  /<span id="partnerRegisterCompleteCount">0</span>
                </div>
              </div>
            </div>
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  문의<span className="d-none d-md-inline">신청</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="qnaRequestCount">
                    {counts[5] || 0}
                  </span>
                  /<span id="qnaCompleteCount">0</span>
                </div>
              </div>
            </div>
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  충전<span className="d-none d-md-inline">신청</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="chargeRequestCount">
                    {counts[3] || 0}
                  </span>
                  /<span id="chargeWaitCount">0</span>/
                  <span id="chargeCancelCount">0</span>/
                  <span id="chargeCompleteCount">0</span>
                </div>
              </div>
            </div>
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  환전<span className="d-none d-md-inline">신청</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="exchangeRequestCount">
                    {counts[4] || 0}
                  </span>
                  /<span id="exchangeWaitCount">0</span>/
                  <span id="exchangeCancelCount">0</span>/
                  <span id="exchangeCompleteCount">0</span>
                </div>
              </div>
            </div>
            <div className="navbar-text px-1">
              <div className="input-group input-group-sm cursor-pointer">
                <div className="input-group-text">
                  페이백<span className="d-none d-md-inline">신청</span>
                </div>
                <div className="form-control fs-5">
                  <span className="text-red" id="paybackRequestCount">
                    {counts[6] || 0}
                  </span>
                  /<span id="paybackCompleteCount">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-nav logout flex-grow-0">
            {/* <div className="navbar-item">
              <a
                href="/partner/login"
                target="_blank"
                className="btn btn-lime d-flex align-items-center text-white"
                style={{ whiteSpace: "nowrap" }}
              >
                <i className="fa-solid fa-users me-2"> </i>
                파트너
              </a>
            </div> */}
            <div className="navbar-item dropdown">
              <a
                href="#"
                data-bs-toggle="dropdown"
                className="navbar-link dropdown-toggle icon"
                aria-expanded="false"
              >
                <i className="fa fa-bell"></i>
                <span className="badge alram_count">0</span>
              </a>
              <div className="dropdown-menu media-list dropdown-menu-end alram-setting">
                <div className="dropdown-header">알림 소리 설정</div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="newuserAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="newuserAlram"
                      >
                        신규회원 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="newpartnerAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="newpartnerAlram"
                      >
                        신규파트너 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="chargeAlram"
                      />
                      <label className="form-check-label" htmlFor="chargeAlram">
                        충전신청 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="exchangeAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exchangeAlram"
                      >
                        환전신청 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="qnaAlram"
                      />
                      <label className="form-check-label" htmlFor="qnaAlram">
                        문의알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="paybackAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="paybackAlram"
                      >
                        페이백알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="sportWinAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sportWinAlram"
                      >
                        스포츠 당첨알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="casinoWinAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="casinoWinAlram"
                      >
                        카지노 당첨알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="slotWinAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="slotWinAlram"
                      >
                        슬롯 당첨알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="miniWinAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="miniWinAlram"
                      >
                        미니게임 당첨알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="boardWinAlram"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="boardWinAlram"
                      >
                        보드게임 당첨알람 알림
                      </label>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item media">
                  <div className="media-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input alram"
                        type="checkbox"
                        id="allAlram"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="allAlram">
                        전체 알림
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-item navbar-user dropdown">
              <a
                href="#"
                className="navbar-link dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <span className="d-none d-md-inline me-1 badge bg-warning position-static">
                  운영자
                </span>
                <span>
                  <span className="d-none d-md-inline">유탑</span>
                  <b className="caret"></b>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end me-1">
                <a href="/logout" className="dropdown-item">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sidebar" className="app-sidebar">
        <div className="app-sidebar-content" data-height="100%">
          <div className="menu">
            <div className="menu-profile p-3">
              <div id="casinoInfo"></div>
              <div id="holdemInfo"></div>
              <div className="d-flex">
                <div className="d-linline">충전금액</div>
                <div className="ms-auto">
                  <span id="userChargeAmount" className="text-blue">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">환전금액</div>
                <div className="ms-auto">
                  <span id="userExchangeAmount" className="text-red">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">파트너지급</div>
                <div className="ms-auto">
                  <span id="partnerChargeAmount" className="text-blue">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="d-linline">파트너회수</div>
                <div className="ms-auto">
                  <span id="partnerExchangeAmount" className="text-red">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">총 베팅금액</div>
                <div className="ms-auto">
                  <span id="totalBettingAmount" className="text-blue">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="d-linline">총 당첨금액</div>
                <div className="ms-auto">
                  <span id="totalWinAmount" className="text-red">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">총 보유금액</div>
                <div className="ms-auto">
                  <span id="userTotalMoney" className="text-yellow">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="d-linline">총 보유포인트</div>
                <div className="ms-auto">
                  <span id="userTotalPoint" className="text-yellow">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">총 유저</div>
                <div className="ms-auto">
                  <span id="userCount" className="text-yellow">
                    0
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-linline">접속 유저</div>
                <div className="ms-auto">
                  <span id="userLoginCount" className="text-yellow">
                    0
                  </span>
                </div>
              </div>
            </div>

            <div className="menu-header">Navigation</div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-calculator"></i>
                </div>
                <div className="menu-text">정산 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/statistics/partner/list" ? "active" : ""
                  }`}
                >
                  <a href="/statistics/partner/list" className="menu-link">
                    <div className="menu-text">파트너 정산</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/statistics/date/list" ? "active" : ""
                  }`}
                >
                  <a href="/statistics/date/list" className="menu-link">
                    <div className="menu-text">일자별 정산</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-users"></i>
                </div>
                <div className="menu-text">회원 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/user/list" ? "active" : ""
                  }`}
                >
                  <a href="/user/list" className="menu-link">
                    <div className="menu-text">회원 목록</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/kyc" ? "active" : ""
                  }`}
                >
                  <a href="/user/kyc" className="menu-link">
                    <div className="menu-text">KYC 본인인증</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/responsible" ? "active" : ""
                  }`}
                >
                  <a href="/user/responsible" className="menu-link">
                    <div className="menu-text">건전한 게임 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/tree/list" ? "active" : ""
                  }`}
                >
                  <a href="/user/tree/list" className="menu-link">
                    <div className="menu-text">회원 트리뷰</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/login/list" ? "active" : ""
                  }`}
                >
                  <a href="/user/login/list" className="menu-link">
                    <div className="menu-text">현재 접속자</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/grade/setting" ? "active" : ""
                  }`}
                >
                  <a href="/user/grade/setting" className="menu-link">
                    <div className="menu-text">회원 레벨별 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/distributor/setting" ? "active" : ""
                  }`}
                >
                  <a href="/distributor/setting" className="menu-link">
                    <div className="menu-text">파트너 단계 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/login/log/list" ? "active" : ""
                  }`}
                >
                  <a href="/login/log/list" className="menu-link">
                    <div className="menu-text" style={{ fontSize: "12px" }}>
                      로그인 로그
                    </div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/black/ip/list" ? "active" : ""
                  }`}
                >
                  <a href="/black/ip/list" className="menu-link">
                    <div className="menu-text">차단 IP</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/batch" ? "active" : ""
                  }`}
                >
                  <a href="/user/batch" className="menu-link">
                    <div className="menu-text">회원 일괄 적용</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/user/all/edit/log/list" ? "active" : ""
                  }`}
                >
                  <a href="/user/all/edit/log/list" className="menu-link">
                    <div className="menu-text">변경내역 로그</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/coupon/list" ? "active" : ""
                  }`}
                >
                  <a href="/coupon/list" className="menu-link">
                    <div className="menu-text">쿠폰 현황</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-won-sign"></i>
                </div>
                <div className="menu-text">머니/포인트 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/charge" ? "active" : ""
                  }`}
                >
                  <a href="/charge" className="menu-link">
                    <div className="menu-text">충전 신청내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/exchange" ? "active" : ""
                  }`}
                >
                  <a href="/exchange" className="menu-link">
                    <div className="menu-text">환전 신청내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/payback/list" ? "active" : ""
                  }`}
                >
                  <a href="/payback/list" className="menu-link">
                    <div className="menu-text">페이백 신청 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/money/deposit/withdraw/list" ? "active" : ""
                  }`}
                >
                  <a href="/money/deposit/withdraw/list" className="menu-link">
                    <div className="menu-text">파트너 지급/회수 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/point/log/list" ? "active" : ""
                  }`}
                >
                  <a href="/point/log/list" className="menu-link">
                    <div className="menu-text">포인트 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/money/log/list" ? "active" : ""
                  }`}
                >
                  <a href="/money/log/list" className="menu-link">
                    <div className="menu-text">전체 머니 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/casino/inout" ? "active" : ""
                  }`}
                >
                  <a href="/casino/inout" className="menu-link">
                    <div className="menu-text">게임 머니전환내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/vault" ? "active" : ""
                  }`}
                >
                  <a href="/vault" className="menu-link">
                    <div className="menu-text">금고 관리(Vault)</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-clipboard-list"></i>
                </div>
                <div className="menu-text">베팅내역 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/sport/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/sport/betting/list" className="menu-link">
                    <div className="menu-text">스포츠 베팅 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/casino/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/casino/betting/list" className="menu-link">
                    <div className="menu-text">카지노 베팅 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/slot/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/slot/betting/list" className="menu-link">
                    <div className="menu-text">슬롯 베팅 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/board/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/board/betting/list" className="menu-link">
                    <div className="menu-text">보드게임 베팅 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/arcade/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/arcade/betting/list" className="menu-link">
                    <div className="menu-text">미니게임 베팅 내역</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/trading/betting/list" ? "active" : ""
                  }`}
                >
                  <a href="/trading/betting/list" className="menu-link">
                    <div className="menu-text">트레이딩 베팅 내역</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-chart-line"></i>
                </div>
                <div className="menu-text">트레이딩 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/trading/market/list" ? "active" : ""
                  }`}
                >
                  <a href="/trading/market/list" className="menu-link">
                    <div className="menu-text">트레이딩 마켓 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/trading/round/list" ? "active" : ""
                  }`}
                >
                  <a href="/trading/round/list" className="menu-link">
                    <div className="menu-text">트레이딩 회차 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/trading/setting" ? "active" : ""
                  }`}
                >
                  <a href="/trading/setting" className="menu-link">
                    <div className="menu-text">트레이딩 일반 설정</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-dice"></i>
                </div>
                <div className="menu-text">게임 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/sport/game/list" ? "active" : ""
                  }`}
                >
                  <a href="/sport/game/list" className="menu-link">
                    <div className="menu-text">스포츠게임 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/arcade/game/list" ? "active" : ""
                  }`}
                >
                  <a href="/arcade/game/list" className="menu-link">
                    <div className="menu-text">미니게임 관리</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-tasks"></i>
                </div>
                <div className="menu-text">게시판 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/board" ? "active" : ""
                  }`}
                >
                  <a href="/board" className="menu-link">
                    <div className="menu-text">게시판 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/board/qna" ? "active" : ""
                  }`}
                >
                  <a href="/board/qna" className="menu-link">
                    <div className="menu-text">1:1문의</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${pathname === "/faq" ? "active" : ""}`}
                >
                  <a href="/faq" className="menu-link">
                    <div className="menu-text">FAQ</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/board/reply" ? "active" : ""
                  }`}
                >
                  <a href="/board/reply" className="menu-link">
                    <div className="menu-text">답변 템플릿</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/message" ? "active" : ""
                  }`}
                >
                  <a href="/message" className="menu-link">
                    <div className="menu-text">쪽지 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/message/template" ? "active" : ""
                  }`}
                >
                  <a href="/message/template" className="menu-link">
                    <div className="menu-text">쪽지 템플릿</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/guide" ? "active" : ""
                  }`}
                >
                  <a href="/guide" className="menu-link">
                    <div className="menu-text">가이드</div>
                  </a>
                </div>

                <div
                  className={`menu-item ${
                    pathname === "/rules" ? "active" : ""
                  }`}
                >
                  <a href="/rules" className="menu-link">
                    <div className="menu-text">베팅 규정</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-cog"></i>
                </div>
                <div className="menu-text">사이트 설정</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/site/setting" ? "active" : ""
                  }`}
                >
                  <a href="/site/setting" className="menu-link">
                    <div className="menu-text">사이트 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/manager/setting" ? "active" : ""
                  }`}
                >
                  <a href="/manager/setting" className="menu-link">
                    <div className="menu-text">관리자 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/bank/setting" ? "active" : ""
                  }`}
                >
                  <a href="/bank/setting" className="menu-link">
                    <div className="menu-text">은행 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/event/setting" ? "active" : ""
                  }`}
                >
                  <a href="/event/setting" className="menu-link">
                    <div className="menu-text">이벤트 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/alarm/setting" ? "active" : ""
                  }`}
                >
                  <a href="/alarm/setting" className="menu-link">
                    <div className="menu-text">알람 설정</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-bullhorn"></i>
                </div>
                <div className="menu-text">마케팅 관리</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/promotion" ? "active" : ""
                  }`}
                >
                  <a href="/promotion" className="menu-link">
                    <div className="menu-text">프로모션 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/bonus" ? "active" : ""
                  }`}
                >
                  <a href="/bonus" className="menu-link">
                    <div className="menu-text">보너스 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/lottery" ? "active" : ""
                  }`}
                >
                  <a href="/lottery" className="menu-link">
                    <div className="menu-text">로또 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/referral" ? "active" : ""
                  }`}
                >
                  <a href="/referral" className="menu-link">
                    <div className="menu-text">추천인 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/quest" ? "active" : ""
                  }`}
                >
                  <a href="/quest" className="menu-link">
                    <div className="menu-text">퀘스트 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${pathname === "/vip" ? "active" : ""}`}
                >
                  <a href="/vip" className="menu-link">
                    <div className="menu-text">VIP 관리</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sponsorship" ? "active" : ""
                  }`}
                >
                  <a href="/sponsorship" className="menu-link">
                    <div className="menu-text">스폰서십 관리</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-server"></i>
                </div>
                <div className="menu-text">플랫폼 설정</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div className={`menu-item ${pathname === "/platform/currencies" ? "active" : ""}`}>
                  <a href="/platform/currencies" className="menu-link">
                    <div className="menu-text">통화 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/platform/languages" ? "active" : ""}`}>
                  <a href="/platform/languages" className="menu-link">
                    <div className="menu-text">언어 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/platform/chat" ? "active" : ""}`}>
                  <a href="/platform/chat" className="menu-link">
                    <div className="menu-text">채팅 모니터링</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/platform/api-keys" ? "active" : ""}`}>
                  <a href="/platform/api-keys" className="menu-link">
                    <div className="menu-text">API 키 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/platform/payment-gateways" ? "active" : ""}`}>
                  <a href="/platform/payment-gateways" className="menu-link">
                    <div className="menu-text">결제 게이트웨이</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/platform/audit-logs" ? "active" : ""}`}>
                  <a href="/platform/audit-logs" className="menu-link">
                    <div className="menu-text">어드민 활동 로그</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/provider" ? "active" : ""}`}>
                  <a href="/provider" className="menu-link">
                    <div className="menu-text">공급자 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/swap" ? "active" : ""}`}>
                  <a href="/swap" className="menu-link">
                    <div className="menu-text">스왑 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/notification" ? "active" : ""}`}>
                  <a href="/notification" className="menu-link">
                    <div className="menu-text">알림 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/webhook" ? "active" : ""}`}>
                  <a href="/webhook" className="menu-link">
                    <div className="menu-text">웹훅 관리</div>
                  </a>
                </div>
                <div className={`menu-item ${pathname === "/upload" ? "active" : ""}`}>
                  <a href="/upload" className="menu-link">
                    <div className="menu-text">업로드 관리</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-dice"></i>
                </div>
                <div className="menu-text">게임 설정</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/game/setting" ? "active" : ""
                  }`}
                >
                  <a href="/game/setting" className="menu-link">
                    <div className="menu-text">게임 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/casino/setting" ? "active" : ""
                  }`}
                >
                  <a href="/casino/setting" className="menu-link">
                    <div className="menu-text">카지노 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/arcade/setting" ? "active" : ""
                  }`}
                >
                  <a href="/arcade/setting" className="menu-link">
                    <div className="menu-text">미니게임 설정</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item has-sub menu-group active">
              <a href="#" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-futbol"></i>
                </div>
                <div className="menu-text">스포츠 설정</div>
                <div className="menu-caret"></div>
              </a>
              <div className="menu-submenu">
                <div
                  className={`menu-item ${
                    pathname === "/sport/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/setting" className="menu-link">
                    <div className="menu-text">종목 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sport/competition/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/competition/setting" className="menu-link">
                    <div className="menu-text">리그 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sport/market/type/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/market/type/setting" className="menu-link">
                    <div className="menu-text">마켓 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sport/odds/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/odds/setting" className="menu-link">
                    <div className="menu-text">기본배당 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sport/sum/odds/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/sum/odds/setting" className="menu-link">
                    <div className="menu-text">합배당 설정</div>
                  </a>
                </div>
                <div
                  className={`menu-item ${
                    pathname === "/sport/cross/setting" ? "active" : ""
                  }`}
                >
                  <a href="/sport/cross/setting" className="menu-link">
                    <div className="menu-text">조합 설정</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item d-flex">
              <a
                href="#"
                className="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none"
                data-toggle="app-sidebar-minify"
              >
                <i className="fa fa-angle-double-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="app-sidebar-bg"></div>
      <div className="app-sidebar-mobile-backdrop">
        <a
          href="#"
          data-dismiss="app-sidebar-mobile"
          className="stretched-link"
          onClick={dismissMobileSidebar}
        ></a>
      </div>

      <div id="content" className="app-content">
        <main>{children}</main>
      </div>

      <a
        href="#"
        className="btn btn-icon btn-success btn-circle btn-theme btn-scroll-to-top"
        data-toggle="scroll-to-top"
      >
        <i className="fa fa-angle-up"></i>
      </a>
      {/* Global User Detail Modal */}
      <UserDetailModal
        isOpen={detailModal.isOpen}
        userIdx={detailModal.userIdx}
        tabIdx={detailModal.tabIdx}
        onClose={() => setDetailModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
