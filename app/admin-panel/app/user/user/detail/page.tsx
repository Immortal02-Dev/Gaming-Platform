"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BACKEND_URL = ""; // Use relative path for proxy

import TabBasicInfo from "./components/TabBasicInfo";
import TabMoneyAction from "./components/TabMoneyAction";
import TabChargeExchange from "./components/TabChargeExchange";
import TabMoneyLog from "./components/TabMoneyLog";
import TabPointAction from "./components/TabPointAction";
import TabPointLog from "./components/TabPointLog";
import TabBettingLog from "./components/TabBettingLog";
import TabMessage from "./components/TabMessage";
import TabInquiry from "./components/TabInquiry";
import TabPartnerAuth from "./components/TabPartnerAuth";
import TabChangeLog from "./components/TabChangeLog";
import TabCoupon from "./components/TabCoupon";
import TabEmptyBet from "./components/TabEmptyBet";
import TabCommission from "./components/TabCommission";
import TabCasinoMoney from "./components/TabCasinoMoney";

interface UserDetailPageInnerProps {
    userIdxProp?: string | null;
    tabTypeProp?: string | null;
}

interface UserData {
    id: string;
    nickname: string;
    role: string;
    totalCharge?: number;
    totalExchange?: number;
    chargeProfit?: number;
    totalBetting?: number;
    totalWin?: number;
    totalEvent?: number;
    money: number;
    point: number;
    userIdx?: number;
    roleIdx?: number;
    level?: number;
    status?: number;
    recommendCode?: string;
    warningColorIdx?: number | string;
    parentUser?: string;
    parentUserIdx?: number | string;
    phoneNumber?: string;
    bankIdx?: number | string;
    bankNumber?: string;
    bankerName?: string;
    memo?: string;
    chargeBankIdx?: number | string;
    gameLevel?: { [key: number]: number };
}

export function UserDetailPageInner({ userIdxProp, tabTypeProp }: UserDetailPageInnerProps) {
    const searchParams = useSearchParams();
    const userIdx = userIdxProp ?? searchParams.get("userIdx");
    const tabType = tabTypeProp ?? searchParams.get("tabType");

    const [activeTab, setActiveTab] = useState("basic");
    const [userData, setUserData] = useState<UserData | null>(null);

    const openMessageWritePopup = () => {
        if (!userIdx) return;
        const width = 800;
        const height = 800;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
            `/message/write?receiverId=${userIdx}`,
            "MessageWrite",
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };

    useEffect(() => {
        if (tabType === "1") setActiveTab("basic");
        else if (tabType === "2" || tabType === "17") setActiveTab("commission");
        else if (tabType === "3") setActiveTab("money_action");
        else if (tabType === "4") setActiveTab("charge_exchange");
        else if (tabType === "5") setActiveTab("money_log");
        else if (tabType === "6") setActiveTab("point_action");
        else if (tabType === "7") setActiveTab("point_log");
        else if (tabType === "8") setActiveTab("betting_log");
        else if (tabType === "15") setActiveTab("coupon");
    }, [tabType]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userIdx) return;

            try {
                const response = await fetch(`${BACKEND_URL}/api/admin/user/detail?userIdx=${userIdx}`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();

                if (result.success) {
                    setUserData(result.data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userIdx]);

    const tabs = [
        { id: "basic", label: "기본 정보" },
        { id: "commission", label: "수수료" },
        { id: "money_action", label: "머니 지급/차감" },
        { id: "charge_exchange", label: "충환전내역" },
        { id: "money_log", label: "머니 거래내역" },
        { id: "point_action", label: "포인트 지급/차감" },
        { id: "point_log", label: "포인트 거래내역" },
        { id: "betting_log", label: "베팅내역" },
        { id: "message", label: "쪽지" },
        { id: "inquiry", label: "문의" },
        { id: "tree_view", label: "소속 트리뷰" },
        { id: "permissions", label: "권한 설정" },
        { id: "change_log", label: "변경 내역" },
        { id: "coupon", label: "쿠폰 발급/현황" },
        { id: "empty_bet", label: "공베팅 설정" },
        { id: "holdem_money", label: "홀덤머니 차감" },
    ];

    return (

        <div id="app" className="app" style={{ height: "inherit" }}>
            <div className="panel panel-inverse" style={{ height: "inherit" }}>
                <div className="panel-heading p-1">
                    <h4 className="panel-title text-center">
                        <span className="pull-left">
                            <span className="badge me-2" style={{ backgroundColor: "#f4a29c" }}>
                                {userData?.role || "부본사"}
                            </span>
                            <i className="fa fa-user me-2" />
                            {userData ? `${userData.id} / ${userData.nickname}` : "ma999 / 전테스트"}
                        </span>
                    </h4>
                    <div className="panel-heading-btn">
                        <button
                            className="btn btn-primary btn-sm ms-auto"
                            onClick={openMessageWritePopup}
                        >
                            <i className="fas fa-edit me-1" />
                            쪽지 발송
                        </button>
                    </div>
                </div>
                <div className="panel-body bg-gray-200">
                    {/* Summary Table */}
                    <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                            <tr>
                                <th>누적 충전</th>
                                <th>누적 환전</th>
                                <th>충전 손익</th>
                                <th>누적 베팅</th>
                                <th>누적 당첨</th>
                                <th>누적 이벤트</th>
                                <th>보유 머니</th>
                                <th>보유 포인트</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userData?.totalCharge?.toLocaleString() || 0}</td>
                                <td>{userData?.totalExchange?.toLocaleString() || 0}</td>
                                <td className="text-red">{userData?.chargeProfit?.toLocaleString() || 0}</td>
                                <td>{userData?.totalBetting?.toLocaleString() || 0}</td>
                                <td>{userData?.totalWin?.toLocaleString() || 0}</td>
                                <td>{userData?.totalEvent?.toLocaleString() || 0}</td>
                                <td>{userData?.money?.toLocaleString() || 0}</td>
                                <td>{userData?.point?.toLocaleString() || 0}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Tabs Navigation */}
                    <ul className="nav nav-tabs mb-3" style={{ overflowX: "auto" }}>
                        {tabs.map((tab) => (
                            <li className="nav-item" key={tab.id}>
                                <button
                                    className={`nav-link bg-primary text-dark ${activeTab === tab.id ? "active fw-bold" : "bg-gray-200"}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content panel p-3 rounded mb-0 bg-white">
                        {activeTab === "basic" && <TabBasicInfo user={userData} />}
                        {activeTab === "money_action" && <TabMoneyAction user={userData} />}
                        {activeTab === "charge_exchange" && <TabChargeExchange userIdx={userIdx} />}

                        {/* Placeholders for other tabs */}
                        {activeTab === "money_log" && <TabMoneyLog userIdx={userIdx} />}
                        {activeTab === "point_action" && <TabPointAction user={userData} />}
                        {activeTab === "point_log" && <TabPointLog userIdx={userIdx} />}
                        {activeTab === "betting_log" && <TabBettingLog userIdx={userIdx} />}
                        {activeTab === "commission" && <TabCommission userIdx={userIdx} />}
                        {activeTab === "message" && <TabMessage userIdx={userIdx} onWriteMessage={openMessageWritePopup} />}
                        {activeTab === "inquiry" && <TabInquiry userIdx={userIdx} />}
                        {activeTab === "permissions" && <TabPartnerAuth userIdx={userIdx} />}
                        {activeTab === "change_log" && <TabChangeLog userIdx={userIdx} />}
                        {activeTab === "coupon" && <TabCoupon userIdx={userIdx} />}
                        {activeTab === "empty_bet" && <TabEmptyBet userIdx={userIdx} />}
                        {activeTab === "holdem_money" && <TabCasinoMoney userIdx={userIdx} />}
                        {activeTab === "tree_view" && <div className="p-3 text-center">소속 트리뷰 내용 준비중</div>}
                    </div>
                </div>
            </div>
        </div>


    );
}

export default function UserDetailPage() {
  return (
    <Suspense fallback={null}>
      <UserDetailPageWrapper />
    </Suspense>
  );
}

function UserDetailPageWrapper() {
  const searchParams = useSearchParams();
  return <UserDetailPageInner userIdxProp={searchParams.get("userIdx")} tabTypeProp={searchParams.get("tabType")} />;
}
