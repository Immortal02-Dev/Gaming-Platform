"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const BACKEND_URL = "";

const bankOptionsList = [
  { id: "1", name: "국민은행 123-456-78901 (예금주: 주식회사 겜플)" },
  { id: "2", name: "신한은행 987-654-32100 (예금주: 주식회사 겜플)" },
  { id: "3", name: "우리은행 1002-123-45678 (예금주: 주식회사 겜플)" },
  { id: "4", name: "하나은행 555-91001-12345 (예금주: 주식회사 겜플)" },
  { id: "5", name: "농협은행 301-0123-4567-89 (예금주: 주식회사 겜플)" },
  { id: "6", name: "카카오뱅크 3333-01-9876543 (예금주: 주식회사 겜플)" },
];

const chargeApiOptionsList = [
  { id: "1", name: "기본 PG 결제 모듈" },
  { id: "2", name: "가상계좌 자동입금 1호" },
  { id: "3", name: "코인 자동결제 API" },
];

declare global {
  interface Window {
    fnSelectUser?: (userIdx: string | number, text: string, child: string) => void;
    removeCommas?: (str: string) => string;
  }
}

export default function UserBatchPage() {
  // Target Selection State
  const [checkAll, setCheckAll] = useState(false);
  const [userID, setUserID] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [child, setChild] = useState("");
  const [userDistributor, setUserDistributor] = useState("");
  const [userGrade, setUserGrade] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Inputs State
  const [bankIdx, setBankIdx] = useState("");
  const [firstChargeBonus, setFirstChargeBonus] = useState("");
  const [everyChargeBonus, setEveryChargeBonus] = useState("");

  const [firstChargeComm, setFirstChargeComm] = useState<{ [key: number]: string }>({});
  const [firstChargeLimit, setFirstChargeLimit] = useState<{ [key: number]: string }>({});

  const [everyChargeComm, setEveryChargeComm] = useState<{ [key: number]: string }>({});
  const [everyChargeLimit, setEveryChargeLimit] = useState<{ [key: number]: string }>({});

  const [integrateBonusUseYN, setIntegrateBonusUseYN] = useState("");
  const [integrateBonusAuth, setIntegrateBonusAuth] = useState("");

  const [integrateText, setIntegrateText] = useState<{ [key: number]: string }>({});
  const [integrateComm, setIntegrateComm] = useState<{ [key: number]: string }>({});
  const [integrateMax, setIntegrateMax] = useState<{ [key: number]: string }>({});

  const [comp, setComp] = useState("");

  // Auth permissions state
  const [partnerAddAuth, setPartnerAddAuth] = useState("0");
  const [partnerAddAuthLock, setPartnerAddAuthLock] = useState("");

  const [partnerModifyAuth, setPartnerModifyAuth] = useState("0");
  const [partnerModifyAuthLock, setPartnerModifyAuthLock] = useState("");

  const [partnerPasswordModifyAuth, setPartnerPasswordModifyAuth] = useState("0");
  const [partnerPasswordModifyAuthLock, setPartnerPasswordModifyAuthLock] = useState("");

  const [partnerCommissionAuth, setPartnerCommissionAuth] = useState("0");
  const [partnerCommissionAuthLock, setPartnerCommissionAuthLock] = useState("");

  const [userAddAuth, setUserAddAuth] = useState("0");
  const [userAddAuthLock, setUserAddAuthLock] = useState("");
  const [userMultiRegisterAuth, setUserMultiRegisterAuth] = useState("0");

  const [userModifyAuth, setUserModifyAuth] = useState("0");
  const [userModifyAuthLock, setUserModifyAuthLock] = useState("");

  const [userPasswordModifyAuth, setUserPasswordModifyAuth] = useState("0");
  const [userPasswordModifyAuthLock, setUserPasswordModifyAuthLock] = useState("");

  const [userCommissionAuth, setUserCommissionAuth] = useState("0");
  const [userCommissionAuthLock, setUserCommissionAuthLock] = useState("");

  const [userMoneyChargeAuth, setUserMoneyChargeAuth] = useState("0");
  const [userMoneyChargeAuthLock, setUserMoneyChargeAuthLock] = useState("");

  const [userCasinoMoneyChargeAuth, setUserCasinoMoneyChargeAuth] = useState("0");
  const [userCasinoMoneyChargeAuthLock, setUserCasinoMoneyChargeAuthLock] = useState("");

  const [pointChangeAuth, setPointChangeAuth] = useState("0");
  const [pointChangeAuthLock, setPointChangeAuthLock] = useState("");

  const [pointChangeUserWebAuth, setPointChangeUserWebAuth] = useState("0");
  const [pointChangeUserWebAuthLock, setPointChangeUserWebAuthLock] = useState("");

  const [exchangePasswordUseYN, setExchangePasswordUseYN] = useState("0");
  const [isUseChargeBonus, setIsUseChargeBonus] = useState("0");
  const [userSitePasswordEditYN, setUserSitePasswordEditYN] = useState("");

  const [userGradeModify, setUserGradeModify] = useState("1");
  const [userGameGradeGameGroupIdx, setUserGameGradeGameGroupIdx] = useState("1");
  const [userGameGradeUserGradeIdx, setUserGameGradeUserGradeIdx] = useState("1");

  const [chargeApiIdx, setChargeApiIdx] = useState("");
  const [userStatusIdx, setUserStatusIdx] = useState("2");

  const [lastSave, setLastSave] = useState<{ actionName: string; target: string; time: string } | null>(null);

  useEffect(() => {
    window.fnSelectUser = (selectedIdx: string | number, text: string, selectedChild: string) => {
      setUserIdx(selectedIdx.toString());
      setUserID(text);
      setChild(selectedChild);
      setCheckAll(false);
    };
  }, []);

  const fninit = () => {
    setCheckAll(false);
    setUserID("");
    setUserIdx("");
    setChild("");
    setUserDistributor("");
    setUserGrade("");
  };

  const userSelectPopup = () => {
    const nWidth = "750";
    const nHeight = "655";
    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;
    const nLeft = curX + curWidth / 2 - parseInt(nWidth) / 2;
    const nTop = curY + curHeight / 2 - parseInt(nHeight) / 2;

    window.open(
      "/user/select?cancel=true&onlyPartner=true&checkOne=true",
      "userSelect",
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const validateSelection = () => {
    if (!checkAll && !userIdx && !userDistributor && !userGrade) {
      alert("대상을 선택하세요.");
      return false;
    }
    return true;
  };

  const getTargetDescription = (): string => {
    if (checkAll) return "전체 회원";
    if (userIdx) return `유저: ${userID}`;
    if (userDistributor) {
      const names: Record<string, string> = {
        "0": "파트너 전체", "1": "부본사", "2": "총판",
        "3": "대리점1단계", "4": "대리점2단계", "5": "대리점3단계",
        "6": "대리점4단계", "7": "대리점5단계",
      };
      return `파트너 단계: ${names[userDistributor] ?? userDistributor}`;
    }
    if (userGrade) return userGrade === "0" ? "유저 전체" : `${userGrade}레벨 유저`;
    return "알 수 없는 대상";
  };

  const resetForm = () => {
    setBankIdx("");
    setFirstChargeBonus("");
    setEveryChargeBonus("");
    setFirstChargeComm({});
    setFirstChargeLimit({});
    setEveryChargeComm({});
    setEveryChargeLimit({});
    setIntegrateBonusUseYN("");
    setIntegrateBonusAuth("");
    setIntegrateText({});
    setIntegrateComm({});
    setIntegrateMax({});
    setComp("");
    setPartnerAddAuth("0");
    setPartnerAddAuthLock("");
    setPartnerModifyAuth("0");
    setPartnerModifyAuthLock("");
    setPartnerPasswordModifyAuth("0");
    setPartnerPasswordModifyAuthLock("");
    setPartnerCommissionAuth("0");
    setPartnerCommissionAuthLock("");
    setUserAddAuth("0");
    setUserAddAuthLock("");
    setUserMultiRegisterAuth("0");
    setUserModifyAuth("0");
    setUserModifyAuthLock("");
    setUserPasswordModifyAuth("0");
    setUserPasswordModifyAuthLock("");
    setUserCommissionAuth("0");
    setUserCommissionAuthLock("");
    setUserMoneyChargeAuth("0");
    setUserMoneyChargeAuthLock("");
    setUserCasinoMoneyChargeAuth("0");
    setUserCasinoMoneyChargeAuthLock("");
    setPointChangeAuth("0");
    setPointChangeAuthLock("");
    setPointChangeUserWebAuth("0");
    setPointChangeUserWebAuthLock("");
    setExchangePasswordUseYN("0");
    setIsUseChargeBonus("0");
    setUserSitePasswordEditYN("");
    setUserGradeModify("1");
    setUserGameGradeGameGroupIdx("1");
    setUserGameGradeUserGradeIdx("1");
    setChargeApiIdx("");
    setUserStatusIdx("2");
    setLastSave(null);
  };

  const makeRequest = async (actionName: string, endpoint: string, payload: Record<string, unknown>) => {
    if (!validateSelection()) return false;
    if (!confirm(`[${actionName}] 일괄 적용하시겠습니까?`)) return false;

    const targetDesc = getTargetDescription();

    setIsProcessing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/user/batch${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          checkAll: checkAll ? 1 : 0,
          userIdx,
          child,
          userDistributor,
          userGrade,
          ...payload,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success || data.ReturnCode === 0) {
          const now = new Date().toLocaleTimeString("ko-KR");
          setLastSave({ actionName, target: targetDesc, time: now });
          fninit();
          return true;
        } else {
          alert(data.message || data.ReturnMessage || "처리에 실패했습니다.");
          return false;
        }
      } else {
        alert(`[${actionName}] 처리에 실패했습니다. (${response.status})`);
        return false;
      }
    } catch (error) {
      console.error(error);
      alert(`[${actionName}] 요청 중 오류가 발생했습니다.`);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const gameNames = ["", "스포츠", "카지노", "슬롯", "미니게임", "보드게임"];

  return (
    <Layout>
      <h1 className="page-header">
        <Link href="/user/batch">
          <i className="fa fa-users me-2"></i>회원 일괄 적용
        </Link>
      </h1>

      <div className="row mb-2">
        <div className="col-md-12 col-lg-10">
          <div className="panel panel-inverse mb-3">
            <div className="panel-heading bg-dark text-white p-2 rounded-top d-flex justify-content-between align-items-center">
              <h4 className="panel-title mb-0 fs-6 fw-bold">
                <i className="fa fa-cog me-2"></i>회원 일괄 적용
              </h4>
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={resetForm}
                title="모든 폼 입력값을 기본값으로 초기화합니다"
              >
                <i className="fa-solid fa-trash-can me-1"></i>폼 초기화
              </button>
            </div>
            <div className="panel-body border p-3 bg-white rounded-bottom">
              {/* Target Selection Header */}
              <div className="row mb-3 bg-light p-3 rounded align-items-center border">
                <label className="col-form-label col-md-2 fw-bold text-dark fs-6">
                  대상 선택
                </label>
                <div className="col-md-10 d-flex flex-wrap align-items-center gap-2">
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                      checked={checkAll}
                      onChange={(e) => setCheckAll(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="checkAll">
                      전체
                    </label>
                  </div>

                  <div className="input-group input-group-sm" style={{ width: "260px" }}>
                    <input
                      type="text"
                      className="form-control bg-white"
                      placeholder="유저 선택"
                      value={userID}
                      readOnly
                      onClick={userSelectPopup}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={userSelectPopup}
                    >
                      <i className="fas fa-check me-1"></i>선택
                    </button>
                  </div>

                  <select
                    className="form-select form-select-sm w-auto"
                    value={userDistributor}
                    onChange={(e) => setUserDistributor(e.target.value)}
                  >
                    <option value="">파트너 단계</option>
                    <option value="0">파트너 전체</option>
                    <option value="1">부본사</option>
                    <option value="2">총판</option>
                    <option value="3">대리점1단계</option>
                    <option value="4">대리점2단계</option>
                    <option value="5">대리점3단계</option>
                    <option value="6">대리점4단계</option>
                    <option value="7">대리점5단계</option>
                  </select>

                  <select
                    className="form-select form-select-sm w-auto"
                    value={userGrade}
                    onChange={(e) => setUserGrade(e.target.value)}
                  >
                    <option value="">유저 레벨</option>
                    <option value="0">유저 전체</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((lvl) => (
                      <option key={lvl} value={lvl.toString()}>
                        {lvl}레벨
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={fninit}
                  >
                    <i className="fa-solid fa-rotate-left me-1"></i>선택 초기화
                  </button>
                </div>
              </div>

              {/* Save Summary Banner */}
              {lastSave && (
                <div
                  className="alert alert-success d-flex align-items-center py-2 mb-3"
                  role="alert"
                  style={{ borderLeft: "4px solid #198754" }}
                >
                  <i className="fa fa-check-circle me-2 fs-5 text-success"></i>
                  <div className="flex-grow-1 small">
                    <strong>[{lastSave.actionName}]</strong>{" "}
                    이(가){" "}
                    <strong>{lastSave.target}</strong>에
                    성공적으로 일괄 적용되었습니다.
                    <span className="text-muted ms-2">{lastSave.time}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-sm ms-2"
                    onClick={() => setLastSave(null)}
                    aria-label="닫기"
                  />
                </div>
              )}

              {/* 충전 계좌 지정 */}
              <div className="row mb-3 align-items-center border-bottom pb-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">충전 계좌 지정</label>
                <div className="col-md-9 d-flex gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={bankIdx}
                    onChange={(e) => setBankIdx(e.target.value)}
                  >
                    <option value="">충전 계좌 선택</option>
                    {bankOptionsList.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("충전 계좌 지정", "/chargeBank", { bankIdx })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 충전 API 지정 */}
              <div className="row mb-3 align-items-center border-bottom pb-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">충전 API 지정</label>
                <div className="col-md-9 d-flex gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={chargeApiIdx}
                    onChange={(e) => setChargeApiIdx(e.target.value)}
                  >
                    <option value="">충전 API 선택</option>
                    {chargeApiOptionsList.map((api) => (
                      <option key={api.id} value={api.id}>
                        {api.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("충전 API 지정", "/chargeApiIdx", { chargeApiIdx })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 첫충 보너스 */}
              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">첫충 보너스 (금일환전)</label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={firstChargeBonus}
                    onChange={(e) => setFirstChargeBonus(e.target.value)}
                  >
                    <option value="">선택</option>
                    <option value="1">가능</option>
                    <option value="0">불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("첫충 보너스 금일환전", "/firstCharge", { firstChargeBonus })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {[1, 2, 3, 4, 5].map((gameGroupIdx) => (
                <div key={gameGroupIdx} className="row mb-2 align-items-center ms-2">
                  <div className="col-md-4">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">{gameNames[gameGroupIdx]}</span>
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="요율"
                        value={firstChargeComm[gameGroupIdx] || ""}
                        onChange={(e) =>
                          setFirstChargeComm({ ...firstChargeComm, [gameGroupIdx]: e.target.value })
                        }
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">최대 보너스</span>
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="최대금액"
                        value={firstChargeLimit[gameGroupIdx] || ""}
                        onChange={(e) =>
                          setFirstChargeLimit({ ...firstChargeLimit, [gameGroupIdx]: e.target.value })
                        }
                      />
                      <span className="input-group-text">P</span>
                      <button
                        type="button"
                        className="btn btn-success px-3"
                        onClick={() =>
                          makeRequest(`첫충 (${gameNames[gameGroupIdx]}) 요율`, "/firstChargeCommission", {
                            gameGroupIdx,
                            firstChargeCommission: firstChargeComm[gameGroupIdx] || "",
                            firstChargeBonusLimit: firstChargeLimit[gameGroupIdx] || "",
                          })
                        }
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* 매충 보너스 */}
              <div className="row mb-2 align-items-center mt-3 border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">매충 보너스 (금일환전)</label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={everyChargeBonus}
                    onChange={(e) => setEveryChargeBonus(e.target.value)}
                  >
                    <option value="">선택</option>
                    <option value="1">가능</option>
                    <option value="0">불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("매충 보너스 금일환전", "/everyCharge", { everyChargeBonus })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {[1, 2, 3, 4, 5].map((gameGroupIdx) => (
                <div key={gameGroupIdx} className="row mb-2 align-items-center ms-2">
                  <div className="col-md-4">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">{gameNames[gameGroupIdx]}</span>
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="요율"
                        value={everyChargeComm[gameGroupIdx] || ""}
                        onChange={(e) =>
                          setEveryChargeComm({ ...everyChargeComm, [gameGroupIdx]: e.target.value })
                        }
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">최대 보너스</span>
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="최대금액"
                        value={everyChargeLimit[gameGroupIdx] || ""}
                        onChange={(e) =>
                          setEveryChargeLimit({ ...everyChargeLimit, [gameGroupIdx]: e.target.value })
                        }
                      />
                      <span className="input-group-text">P</span>
                      <button
                        type="button"
                        className="btn btn-success px-3"
                        onClick={() =>
                          makeRequest(`매충 (${gameNames[gameGroupIdx]}) 요율`, "/everyChargeCommission", {
                            gameGroupIdx,
                            everyChargeCommission: everyChargeComm[gameGroupIdx] || "",
                            everyChargeBonusLimit: everyChargeLimit[gameGroupIdx] || "",
                          })
                        }
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* 통합 보너스 */}
              <div className="row mb-2 align-items-center mt-3 border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">통합 보너스 설정</label>
                <div className="col-md-9 d-flex flex-wrap align-items-center gap-2">
                  <span className="fs-7">사용유무</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={integrateBonusUseYN}
                    onChange={(e) => setIntegrateBonusUseYN(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3 me-3"
                    onClick={() =>
                      makeRequest("통합 보너스 사용유무", "/userIntegrateChargeBonusUseYN", {
                        value: integrateBonusUseYN,
                      })
                    }
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>

                  <span className="fs-7">사용권한</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={integrateBonusAuth}
                    onChange={(e) => setIntegrateBonusAuth(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() =>
                      makeRequest("통합 보너스 사용권한", "/userIntegrateChargeBonusAuth", {
                        value: integrateBonusAuth,
                      })
                    }
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="row mb-2 align-items-center ms-2">
                  <div className="col-md-4">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">통합충전{num}</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="충전 문구 지정"
                        value={integrateText[num] || ""}
                        onChange={(e) =>
                          setIntegrateText({ ...integrateText, [num]: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="요율"
                        value={integrateComm[num] || ""}
                        onChange={(e) =>
                          setIntegrateComm({ ...integrateComm, [num]: e.target.value })
                        }
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">최대 보너스</span>
                      <input
                        type="text"
                        className="form-control text-end"
                        placeholder="최대금액"
                        value={integrateMax[num] || ""}
                        onChange={(e) =>
                          setIntegrateMax({ ...integrateMax, [num]: e.target.value })
                        }
                      />
                      <span className="input-group-text">P</span>
                      <button
                        type="button"
                        className="btn btn-success px-3"
                        onClick={() =>
                          makeRequest(`통합충전 ${num}차`, "/userIntegrateChargeBonus", {
                            userIntegrateChargeNumber: num,
                            userIntegrateChargeBonusText: integrateText[num] || "",
                            userIntegrateChargeBonus: integrateComm[num] || "",
                            userIntegrateChargeBonusMax: integrateMax[num] || "",
                          })
                        }
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* 회원 콤프 */}
              <div className="row mb-3 align-items-center mt-3 border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 콤프 요율</label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm w-auto">
                    <input
                      type="text"
                      className="form-control text-end"
                      style={{ width: "80px" }}
                      value={comp}
                      onChange={(e) => setComp(e.target.value)}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("회원 콤프 요율", "/comp", { comp })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 파트너 권한 설정 */}
              <div className="row mb-2 align-items-center border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">파트너 등록 권한</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerAddAuth}
                    onChange={(e) => setPartnerAddAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 등록 권한", "/partnerAddAuth", { partnerAddAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">등록 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerAddAuthLock}
                    onChange={(e) => setPartnerAddAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 등록 잠금", "/partnerAddAuthLock", { value: partnerAddAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">파트너 수정 권한</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerModifyAuth}
                    onChange={(e) => setPartnerModifyAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 수정 권한", "/partnerModifyAuth", { partnerModifyAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수정 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerModifyAuthLock}
                    onChange={(e) => setPartnerModifyAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 수정 잠금", "/partnerModifyAuthLock", { value: partnerModifyAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">파트너 비밀번호 수정</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerPasswordModifyAuth}
                    onChange={(e) => setPartnerPasswordModifyAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 비밀번호 수정", "/partnerPasswordModifyAuth", { partnerPasswordModifyAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수정 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerPasswordModifyAuthLock}
                    onChange={(e) => setPartnerPasswordModifyAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 비밀번호 수정 잠금", "/partnerPasswordModifyAuthLock", { value: partnerPasswordModifyAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">파트너 수수료 등록/수정</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerCommissionAuth}
                    onChange={(e) => setPartnerCommissionAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 수수료 등록/수정", "/partnerCommissionAuth", { partnerCommissionAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수수료 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={partnerCommissionAuthLock}
                    onChange={(e) => setPartnerCommissionAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("파트너 수수료 등록/수정 잠금", "/partnerCommissionAuthLock", { value: partnerCommissionAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 회원 권한 설정 */}
              <div className="row mb-2 align-items-center border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 등록 권한</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userAddAuth}
                    onChange={(e) => setUserAddAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 등록 권한", "/userAddAuth", { userAddAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">등록 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userAddAuthLock}
                    onChange={(e) => setUserAddAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 등록 잠금", "/userAddAuthLock", { value: userAddAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 일괄 등록 권한</label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userMultiRegisterAuth}
                    onChange={(e) => setUserMultiRegisterAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("회원 일괄 등록 권한", "/userMultiRegisterAuth", { value: userMultiRegisterAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 수정 권한</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userModifyAuth}
                    onChange={(e) => setUserModifyAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 수정 권한", "/userModifyAuth", { userModifyAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수정 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userModifyAuthLock}
                    onChange={(e) => setUserModifyAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 수정 잠금", "/userModifyAuthLock", { value: userModifyAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 비밀번호 수정</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userPasswordModifyAuth}
                    onChange={(e) => setUserPasswordModifyAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 비밀번호 수정", "/userPasswordModifyAuth", { userPasswordModifyAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수정 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userPasswordModifyAuthLock}
                    onChange={(e) => setUserPasswordModifyAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 비밀번호 수정 잠금", "/userPasswordModifyAuthLock", { value: userPasswordModifyAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 수수료 등록/수정</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userCommissionAuth}
                    onChange={(e) => setUserCommissionAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 수수료 등록/수정", "/userCommissionAuth", { userCommissionAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">수수료 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userCommissionAuthLock}
                    onChange={(e) => setUserCommissionAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("회원 수수료 잠금", "/userCommissionAuthLock", { value: userCommissionAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">게임머니 지급/회수</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userMoneyChargeAuth}
                    onChange={(e) => setUserMoneyChargeAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("게임머니 지급/회수", "/userMoneyChargeAuth", { userMoneyChargeAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">지급/회수 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userMoneyChargeAuthLock}
                    onChange={(e) => setUserMoneyChargeAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("게임머니 지급/회수 잠금", "/userMoneyChargeAuthLock", { value: userMoneyChargeAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">카지노머니 지급/회수</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userCasinoMoneyChargeAuth}
                    onChange={(e) => setUserCasinoMoneyChargeAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("카지노머니 지급/회수", "/userCasinoMoneyChargeAuth", { userCasinoMoneyChargeAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">지급/회수 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userCasinoMoneyChargeAuthLock}
                    onChange={(e) => setUserCasinoMoneyChargeAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("카지노머니 지급/회수 잠금", "/userCasinoMoneyChargeAuthLock", { value: userCasinoMoneyChargeAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 포인트 전환 & 유저웹 비밀번호 */}
              <div className="row mb-2 align-items-center border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">포인트 전환 사용</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={pointChangeAuth}
                    onChange={(e) => setPointChangeAuth(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("포인트 전환 사용", "/pointChangeAuth", { pointChangeAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">전환 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={pointChangeAuthLock}
                    onChange={(e) => setPointChangeAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("포인트 전환 잠금", "/pointChangeAuthLock", { value: pointChangeAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">포인트 유저웹 표시</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={pointChangeUserWebAuth}
                    onChange={(e) => setPointChangeUserWebAuth(e.target.value)}
                  >
                    <option value="0">미표시</option>
                    <option value="1">표시</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("포인트 유저웹 표시", "/pointChangeUserWebAuth", { pointChangeUserWebAuth })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">표시 잠금</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={pointChangeUserWebAuthLock}
                    onChange={(e) => setPointChangeUserWebAuthLock(e.target.value)}
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("포인트 유저웹 표시 잠금", "/pointChangeUserWebAuthLock", { value: pointChangeUserWebAuthLock })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">환전 비밀번호 사용</label>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={exchangePasswordUseYN}
                    onChange={(e) => setExchangePasswordUseYN(e.target.value)}
                  >
                    <option value="0">미사용</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("환전 비밀번호 사용", "/exchangePasswordUseYN", { exchangePasswordUseYN })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
                <label className="col-form-label col-md-2 fw-bold fs-7 text-end">충전 보너스</label>
                <div className="col-md-3 d-flex align-items-center gap-2 mb-1">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={isUseChargeBonus}
                    onChange={(e) => setIsUseChargeBonus(e.target.value)}
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-2"
                    onClick={() => makeRequest("충전 보너스 사용유무", "/isUseChargeBonus", { value: isUseChargeBonus })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">
                  비밀번호 변경<span className="text-danger me-1">(유저웹)</span>
                </label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userSitePasswordEditYN}
                    onChange={(e) => setUserSitePasswordEditYN(e.target.value)}
                  >
                    <option value="">사이트 설정</option>
                    <option value="1">이용 가능</option>
                    <option value="0">이용 불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("비밀번호 변경(유저웹)", "/userSitePasswordEditYN", { userSitePasswordEditYN })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              {/* 회원 레벨 & 상태 일괄 변경 */}
              <div className="row mb-2 align-items-center border-top pt-2">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 레벨 변경</label>
                <div className="col-md-9 d-flex flex-wrap align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userGradeModify}
                    onChange={(e) => setUserGradeModify(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((lvl) => (
                      <option key={lvl} value={lvl.toString()}>
                        {lvl}레벨
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3 me-3"
                    onClick={() => makeRequest("회원 레벨 변경", "/userGradeModify", { userGradeModify })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>

                  <span className="fs-7 font-weight-bold me-1">게임별 레벨</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userGameGradeGameGroupIdx}
                    onChange={(e) => setUserGameGradeGameGroupIdx(e.target.value)}
                  >
                    <option value="1">스포츠</option>
                    <option value="2">카지노</option>
                    <option value="3">슬롯</option>
                    <option value="4">미니게임</option>
                    <option value="5">보드게임</option>
                  </select>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userGameGradeUserGradeIdx}
                    onChange={(e) => setUserGameGradeUserGradeIdx(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((lvl) => (
                      <option key={lvl} value={lvl.toString()}>
                        {lvl}레벨
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() =>
                      makeRequest("게임별 회원 레벨 변경", "/userGameGrade", {
                        gameGroupIdx: userGameGradeGameGroupIdx,
                        userGameGradeIdx: userGameGradeUserGradeIdx,
                      })
                    }
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2 align-items-center">
                <label className="col-form-label col-md-3 fw-bold fs-7">회원 상태 변경</label>
                <div className="col-md-9 d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm w-auto"
                    value={userStatusIdx}
                    onChange={(e) => setUserStatusIdx(e.target.value)}
                  >
                    <option value="1">가입대기</option>
                    <option value="2">정상</option>
                    <option value="3">정지</option>
                    <option value="4">탈퇴</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-3"
                    onClick={() => makeRequest("회원 상태 변경", "/userStatusIdx", { userStatusIdx })}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              처리중입니다. 잠시 기다려주십시오.
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
