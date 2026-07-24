"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const BACKEND_URL = ""; // Use relative path for proxy

const gameTypes = [
  { id: 1, name: "스포츠" },
  { id: 2, name: "카지노" },
  { id: 3, name: "슬롯" },
  { id: 4, name: "미니게임" },
  { id: 5, name: "보드게임" },
];

interface GameSetting {
  gameTypeId: number;
  firstChargeCommission: number;
  firstChargeBonusLimit: number;
  everyChargeCommission: number;
  everyChargeBonusLimit: number;
}

interface IntegrateChargeSetting {
  charge_number: number;
  bonus_text: string;
  bonus_commission: number;
  bonus_max: number;
}

interface ChargeEvent {
  id: number;
  gradeLevel: number;
  startTime: string;
  endTime: string;
  bonusCommission: string;
  bonusLimit: string;
  useYN: string;
}

interface GradeSetting {
  grade_level: number;
  min_charge_amount: number;
  max_charge_amount: number;
  register_first_charge_commission: number;
  register_first_charge_bonus_limit: number;
  first_charge_bonus_exchange_today: string;
  every_charge_bonus_exchange_today: string;
  grade_integrate_charge_bonus_use_yn: string;
  grade_payback_percent: number;
  grade_payback_min: number;
  grade_payback_max: number;
  grade_payback_type: string;
  grade_payback_date_type: string;
  grade_payback_date_allow: string;
  gameSettings?: GameSetting[];
  integrateChargeSettings?: IntegrateChargeSetting[];
}

interface GradeSettingsResponse {
  success: boolean;
  data: GradeSetting[];
}

const vendorsList = [
  { id: 1, name: "에볼루션 (Evolution)" },
  { id: 2, name: "프라그마틱 (Pragmatic Play)" },
  { id: 3, name: "아시아게이밍 (Asia Gaming)" },
  { id: 4, name: "드림게이밍 (Dream Gaming)" },
  { id: 5, name: "마이크로게이밍 (Microgaming)" },
];

const minigamesList = [
  { id: 4, name: "파워볼(PBG)" },
  { id: 10, name: "EOS파워볼5분" },
  { id: 11, name: "EOS파워볼3분" },
  { id: 12, name: "코인파워볼5분" },
  { id: 13, name: "코인파워볼3분" },
  { id: 14, name: "코인사다리5분" },
  { id: 15, name: "코인사다리3분" },
];

export default function UserGradeSettingPage() {
  const [activeGrade, setActiveGrade] = useState(1);
  const [gradeSettings, setGradeSettings] = useState<{
    [key: number]: GradeSetting;
  }>({});
  const [activeMinigameTab, setActiveMinigameTab] = useState(4);

  // Events state management
  const [events, setEvents] = useState<ChargeEvent[]>([
    { id: 1, gradeLevel: 1, startTime: "00:59", endTime: "01:00", bonusCommission: "1.00", bonusLimit: "100,000", useYN: "1" },
    { id: 2, gradeLevel: 1, startTime: "01:00", endTime: "02:00", bonusCommission: "2.00", bonusLimit: "200,000", useYN: "1" },
    { id: 3, gradeLevel: 1, startTime: "02:00", endTime: "03:00", bonusCommission: "3.00", bonusLimit: "300,000", useYN: "1" },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [eventForm, setEventForm] = useState({
    startTime: "",
    endTime: "",
    bonusCommission: "",
    bonusLimit: "",
    useYN: "1",
  });

  const createDefaultGradeSetting = (gradeLevel: number): GradeSetting => ({
    grade_level: gradeLevel,
    min_charge_amount: 10000,
    max_charge_amount: 10000000,
    register_first_charge_commission: 10,
    register_first_charge_bonus_limit: 500000,
    first_charge_bonus_exchange_today: "0",
    every_charge_bonus_exchange_today: "0",
    grade_integrate_charge_bonus_use_yn: "0",
    grade_payback_percent: 5,
    grade_payback_min: 10000,
    grade_payback_max: 1000000,
    grade_payback_type: "1",
    grade_payback_date_type: "1",
    grade_payback_date_allow: "1",
    gameSettings: gameTypes.map((gt) => ({
      gameTypeId: gt.id,
      firstChargeCommission: 5,
      firstChargeBonusLimit: 100000,
      everyChargeCommission: 3,
      everyChargeBonusLimit: 50000,
    })),
    integrateChargeSettings: [1, 2, 3, 4].map((num) => ({
      charge_number: num,
      bonus_text: `통합충전 ${num}차 이벤트`,
      bonus_commission: 5,
      bonus_max: 100000,
    })),
  });

  useEffect(() => {
    let isSubscribed = true;
    if (gradeSettings[activeGrade]) return;

    const fetchGradeSettings = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/admin/user/grade/setting?gradeLevel=${activeGrade}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grade settings");
        }

        const result: GradeSettingsResponse = await response.json();
        if (!isSubscribed) return;

        if (result.success && result.data.length > 0) {
          const setting = result.data[0];
          if (setting.gameSettings && typeof setting.gameSettings === "string") {
            try {
              setting.gameSettings = JSON.parse(`[${setting.gameSettings}]`);
            } catch {
              setting.gameSettings = [];
            }
          }
          setGradeSettings((prev) => ({
            ...prev,
            [activeGrade]: setting,
          }));
        } else {
          setGradeSettings((prev) => ({
            ...prev,
            [activeGrade]: createDefaultGradeSetting(activeGrade),
          }));
        }
      } catch (error) {
        console.error("Failed to fetch grade settings:", error);
        if (isSubscribed) {
          setGradeSettings((prev) => ({
            ...prev,
            [activeGrade]: createDefaultGradeSetting(activeGrade),
          }));
        }
      }
    };

    fetchGradeSettings();

    return () => {
      isSubscribed = false;
    };
  }, [activeGrade, gradeSettings]);

  const handleGradeTabClick = (level: number) => {
    setActiveGrade(level);
  };

  const getGameSetting = (
    gradeLevel: number,
    gameTypeId: number
  ): GameSetting | null => {
    const settings = gradeSettings[gradeLevel];
    if (!settings || !settings.gameSettings) return null;
    return (
      settings.gameSettings.find((gs) => gs.gameTypeId === gameTypeId) || null
    );
  };

  const handleFormSubmit = (e: React.FormEvent, formName: string) => {
    e.preventDefault();
    alert(`[${activeGrade}레벨] ${formName}이(가) 성공적으로 저장되었습니다.`);
  };

  const openAddEventModal = () => {
    setEditingEventId(null);
    setEventForm({
      startTime: "",
      endTime: "",
      bonusCommission: "",
      bonusLimit: "",
      useYN: "1",
    });
    setShowEventModal(true);
  };

  const openEditEventModal = (event: ChargeEvent) => {
    setEditingEventId(event.id);
    setEventForm({
      startTime: event.startTime,
      endTime: event.endTime,
      bonusCommission: event.bonusCommission,
      bonusLimit: event.bonusLimit,
      useYN: event.useYN,
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.startTime || !eventForm.endTime) {
      alert("지정 시간을 입력해주세요.");
      return;
    }

    if (editingEventId !== null) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEventId
            ? { ...ev, ...eventForm, gradeLevel: activeGrade }
            : ev
        )
      );
    } else {
      const newEvent: ChargeEvent = {
        id: Date.now(),
        gradeLevel: activeGrade,
        ...eventForm,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm("해당 돌발 이벤트를 삭제하시겠습니까?")) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    }
  };

  const settings = gradeSettings[activeGrade] || createDefaultGradeSetting(activeGrade);
  const currentGradeEvents = events.filter((ev) => ev.gradeLevel === activeGrade);

  return (
    <Layout>
      <h1 className="page-header">
        <Link href="/user/grade/setting">
          <i className="fa-solid fa-layer-group me-2"></i>회원 레벨별 설정
        </Link>
      </h1>

      <div className="row">
        <div className="col">
          {/* Grade Level Tabs */}
          <ul className="nav nav-pills mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (level) => (
                <li key={level} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${level === activeGrade ? "active" : ""}`}
                    onClick={() => handleGradeTabClick(level)}
                  >
                    {level}레벨
                  </button>
                </li>
              )
            )}
          </ul>

          {/* Active Tab Panel */}
          <div className="tab-content panel p-3 rounded">
            <div className="row">
              {/* Left Column (Col 3) */}
              <div className="col-lg-3 col-md-12 mb-3">
                {/* 충전 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa fa-won-sign me-2"></i>
                      ₩ {activeGrade}레벨 충전 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <form onSubmit={(e) => handleFormSubmit(e, "충전 설정")}>
                      <input type="hidden" name="userGradeIdx" value={activeGrade} />

                      <div className="form-group row mb-3">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          최소 충전 금액
                        </label>
                        <div className="col-md-7">
                          <input
                            type="text"
                            name="minChargeAmount"
                            className="form-control amount form-control-sm"
                            defaultValue={settings.min_charge_amount || ""}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          최대 충전 금액
                        </label>
                        <div className="col-md-7">
                          <input
                            type="text"
                            name="maxChargeAmount"
                            className="form-control amount form-control-sm"
                            defaultValue={settings.max_charge_amount || ""}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          가입 첫충 보너스
                        </label>
                        <div className="col-md-7">
                          <div className="d-inline-flex align-items-center w-100">
                            <input
                              type="text"
                              name="registerFirstChargeCommission"
                              className="form-control commission form-control-sm"
                              defaultValue={
                                settings.register_first_charge_commission || ""
                              }
                            />
                            <span className="ms-1 fw-bold">%</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          가입 첫충 보너스 최대
                        </label>
                        <div className="col-md-7">
                          <div className="d-inline-flex align-items-center w-100">
                            <input
                              type="text"
                              name="registerFirstChargeBonusLimit"
                              className="form-control amount form-control-sm"
                              defaultValue={
                                settings.register_first_charge_bonus_limit || ""
                              }
                            />
                            <span className="ms-1 fw-bold">P</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          첫 충전 보너스
                        </label>
                        <div className="col-md-7">
                          <div className="row align-items-center">
                            <div className="col">
                              <span className="me-1 fs-7">금일 환전</span>
                            </div>
                            <div className="col">
                              <select
                                name="firstChargeBonus"
                                className="form-select form-select-sm"
                                defaultValue={
                                  settings.first_charge_bonus_exchange_today || "0"
                                }
                              >
                                <option value="1">가능</option>
                                <option value="0">불가</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {gameTypes.map((gameType) => {
                        const gameSetting = getGameSetting(
                          activeGrade,
                          gameType.id
                        );
                        return (
                          <div key={gameType.id} className="form-group row mb-2">
                            <div className="col-md-5">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text px-1 fs-7">
                                  {gameType.name}
                                </span>
                                <input
                                  type="text"
                                  name={`firstChargeCommission[${gameType.id}]`}
                                  className="form-control commission text-end px-1"
                                  defaultValue={
                                    gameSetting?.firstChargeCommission || ""
                                  }
                                />
                                <span className="input-group-text px-1">%</span>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text px-1 fs-7">
                                  최대
                                </span>
                                <input
                                  type="text"
                                  name={`firstChargeBonusLimit[${gameType.id}]`}
                                  className="form-control amount text-end px-1"
                                  defaultValue={
                                    gameSetting?.firstChargeBonusLimit || ""
                                  }
                                />
                                <span className="input-group-text px-1">P</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="form-group row mb-2 mt-3">
                        <label className="col-form-label col-md-5 fw-semibold fs-7">
                          매 충전 보너스
                        </label>
                        <div className="col-md-7">
                          <div className="row align-items-center">
                            <div className="col">
                              <span className="me-1 fs-7">금일 환전</span>
                            </div>
                            <div className="col">
                              <select
                                name="everyChargeBonus"
                                className="form-select form-select-sm"
                                defaultValue={
                                  settings.every_charge_bonus_exchange_today || "0"
                                }
                              >
                                <option value="1">가능</option>
                                <option value="0">불가</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {gameTypes.map((gameType) => {
                        const gameSetting = getGameSetting(
                          activeGrade,
                          gameType.id
                        );
                        return (
                          <div key={gameType.id} className="form-group row mb-2">
                            <div className="col-md-5">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text px-1 fs-7">
                                  {gameType.name}
                                </span>
                                <input
                                  type="text"
                                  name={`everyChargeCommission[${gameType.id}]`}
                                  className="form-control commission text-end px-1"
                                  defaultValue={
                                    gameSetting?.everyChargeCommission || ""
                                  }
                                />
                                <span className="input-group-text px-1">%</span>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text px-1 fs-7">
                                  최대
                                </span>
                                <input
                                  type="text"
                                  name={`everyChargeBonusLimit[${gameType.id}]`}
                                  className="form-control amount text-end px-1"
                                  defaultValue={
                                    gameSetting?.everyChargeBonusLimit || ""
                                  }
                                />
                                <span className="input-group-text px-1">P</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="row text-center mt-3">
                        <div className="col">
                          <button type="submit" className="btn btn-success btn-sm w-100">
                            <i className="fa fa-save me-1"></i>저장
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 통합 충전 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa fa-won-sign me-2"></i>
                      {activeGrade}레벨 통합 충전 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <form onSubmit={(e) => handleFormSubmit(e, "통합 충전 설정")}>
                      <input type="hidden" name="userGradeIdx" value={activeGrade} />
                      <table className="table table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                        <tbody>
                          <tr>
                            <th className="bg-light align-middle" style={{ width: "30%" }}>
                              사용유무
                            </th>
                            <td className="py-1">
                              <select
                                name="gradeIntegrateChargeBonusUseYN"
                                className="form-select form-select-sm"
                                defaultValue={
                                  settings.grade_integrate_charge_bonus_use_yn || "0"
                                }
                              >
                                <option value="0">사용 안함</option>
                                <option value="1">사용</option>
                              </select>
                            </td>
                          </tr>
                          {[1, 2, 3, 4].map((num) => {
                            const integrateSetting =
                              settings.integrateChargeSettings?.find(
                                (ics) => ics.charge_number === num
                              );
                            return (
                              <React.Fragment key={num}>
                                <tr>
                                  <th
                                    rowSpan={2}
                                    className="bg-light align-middle p-1"
                                  >
                                    통합충전{num}
                                  </th>
                                  <td className="py-1">
                                    <input
                                      type="text"
                                      name={`updateData[${num}][gradeIntegrateChargeBonusText]`}
                                      maxLength={100}
                                      className="form-control form-control-sm"
                                      placeholder="텍스트 문구 지정"
                                      defaultValue={
                                        integrateSetting?.bonus_text || ""
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1">
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="text"
                                        name={`updateData[${num}][gradeIntegrateChargeBonus]`}
                                        className="form-control form-control-sm commission text-end me-1"
                                        style={{ width: "50px" }}
                                        defaultValue={
                                          integrateSetting?.bonus_commission || ""
                                        }
                                      />
                                      <span className="me-2">%</span>
                                      <span className="me-1 ms-1">최대</span>
                                      <input
                                        type="text"
                                        name={`updateData[${num}][gradeIntegrateChargeBonusMax]`}
                                        className="form-control form-control-sm amount text-end"
                                        defaultValue={
                                          integrateSetting?.bonus_max || ""
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success btn-sm w-100">
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 벤더 스킨 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa-solid fa-bolt me-2"></i>
                      {activeGrade}레벨 벤더 스킨 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <form onSubmit={(e) => handleFormSubmit(e, "벤더 스킨 설정")}>
                      <input type="hidden" name="userGradeIdx" value={activeGrade} />
                      <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                        <thead className="table-dark">
                          <tr>
                            <th>벤더</th>
                            <th>스킨</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorsList.map((vendor) => (
                            <tr key={vendor.id}>
                              <td className="align-middle text-start ps-2">{vendor.name}</td>
                              <td className="p-1">
                                <select
                                  name={`vendorSkin[${vendor.id}]`}
                                  className="form-select form-select-sm"
                                  defaultValue="default"
                                >
                                  <option value="default">기본 스킨</option>
                                  <option value="skin_a">스킨 A</option>
                                  <option value="skin_b">스킨 B</option>
                                  <option value="skin_c">스킨 C</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success btn-sm w-100">
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 페이백 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa-solid fa-bolt me-2"></i>
                      {activeGrade}레벨 페이백 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <form onSubmit={(e) => handleFormSubmit(e, "페이백 설정")}>
                      <input type="hidden" name="userGradeIdx" value={activeGrade} />
                      <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                        <tbody>
                          <tr>
                            <td className="bg-light" style={{ width: "35%" }}>
                              페이백 %
                            </td>
                            <td className="p-1">
                              <div className="input-group input-group-sm">
                                <input
                                  type="text"
                                  name="gradePaybackPercent"
                                  className="form-control commission text-end"
                                  defaultValue={settings.grade_payback_percent || ""}
                                />
                                <span className="input-group-text">%</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light">지급 설정</td>
                            <td className="p-1">
                              <div className="input-group input-group-sm mb-1">
                                <span className="input-group-text px-1">최소</span>
                                <input
                                  type="text"
                                  name="gradePaybackMin"
                                  className="form-control amount text-end"
                                  defaultValue={settings.grade_payback_min || ""}
                                />
                              </div>
                              <div className="input-group input-group-sm">
                                <span className="input-group-text px-1">최대</span>
                                <input
                                  type="text"
                                  name="gradePaybackMax"
                                  className="form-control amount text-end"
                                  defaultValue={settings.grade_payback_max || ""}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light">페이백 타입</td>
                            <td className="p-1">
                              <select
                                className="form-select form-select-sm"
                                name="gradePaybackType"
                                defaultValue={settings.grade_payback_type || "1"}
                              >
                                <option value="">페이백 타입 선택</option>
                                <option value="1">총베팅금-총당첨금 (스포츠만)</option>
                                <option value="2">입금-출금</option>
                                <option value="3">입금-출금-보유금액</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light">페이백 적용</td>
                            <td className="p-1">
                              <div className="row g-1">
                                <div className="col-6">
                                  <select
                                    className="form-select form-select-sm"
                                    name="gradePaybackDateType"
                                    defaultValue={settings.grade_payback_date_type || "1"}
                                  >
                                    <option value="">적용 날짜</option>
                                    <option value="1">최근 일주일</option>
                                    <option value="2">최근 15일</option>
                                    <option value="3">최근 한달</option>
                                  </select>
                                </div>
                                <div className="col-6">
                                  <select
                                    className="form-select form-select-sm"
                                    name="gradePaybackDateAllow"
                                    defaultValue={settings.grade_payback_date_allow || "1"}
                                  >
                                    <option value="1">매일</option>
                                    <option value="2">월요일</option>
                                    <option value="3">화요일</option>
                                    <option value="4">수요일</option>
                                    <option value="5">목요일</option>
                                    <option value="6">금요일</option>
                                    <option value="7">토요일</option>
                                    <option value="8">일요일</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success btn-sm w-100">
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column (Col 9) */}
              <div className="col-lg-9 col-md-12">
                {/* 돌발 이벤트 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top d-flex justify-content-between align-items-center">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa-solid fa-bolt me-2"></i>
                      ▶ {activeGrade}레벨 돌발 이벤트 설정
                    </h4>
                    <button
                      type="button"
                      className="btn btn-success btn-sm text-white"
                      onClick={openAddEventModal}
                    >
                      <i className="fa fa-plus me-1"></i>이벤트 추가
                    </button>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: "8%" }}>번호</th>
                          <th style={{ width: "30%" }}>지정 시간</th>
                          <th style={{ width: "18%" }}>돌발 보너스 %</th>
                          <th style={{ width: "20%" }}>보너스 최대금액</th>
                          <th style={{ width: "12%" }}>사용 여부</th>
                          <th style={{ width: "12%" }}>기능</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentGradeEvents.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-muted py-3">
                              등록된 돌발 이벤트가 없습니다.
                            </td>
                          </tr>
                        ) : (
                          currentGradeEvents.map((ev, index) => (
                            <tr key={ev.id}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-inline-flex align-items-center justify-content-center">
                                  <input
                                    type="time"
                                    className="form-control form-control-sm w-auto"
                                    value={ev.startTime}
                                    onChange={(e) =>
                                      setEvents((prev) =>
                                        prev.map((item) =>
                                          item.id === ev.id
                                            ? { ...item, startTime: e.target.value }
                                            : item
                                        )
                                      )
                                    }
                                  />
                                  <span className="mx-1">~</span>
                                  <input
                                    type="time"
                                    className="form-control form-control-sm w-auto"
                                    value={ev.endTime}
                                    onChange={(e) =>
                                      setEvents((prev) =>
                                        prev.map((item) =>
                                          item.id === ev.id
                                            ? { ...item, endTime: e.target.value }
                                            : item
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-inline-flex align-items-center justify-content-center">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm commission text-end me-1"
                                    style={{ width: "70px" }}
                                    value={ev.bonusCommission}
                                    onChange={(e) =>
                                      setEvents((prev) =>
                                        prev.map((item) =>
                                          item.id === ev.id
                                            ? { ...item, bonusCommission: e.target.value }
                                            : item
                                        )
                                      )
                                    }
                                  />
                                  <span>%</span>
                                </div>
                              </td>
                              <td>
                                <div className="d-inline-flex align-items-center justify-content-center">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm amount text-end me-1"
                                    style={{ width: "100px" }}
                                    value={ev.bonusLimit}
                                    onChange={(e) =>
                                      setEvents((prev) =>
                                        prev.map((item) =>
                                          item.id === ev.id
                                            ? { ...item, bonusLimit: e.target.value }
                                            : item
                                        )
                                      )
                                    }
                                  />
                                  <span>P</span>
                                </div>
                              </td>
                              <td>
                                <select
                                  className="form-select form-select-sm"
                                  value={ev.useYN}
                                  onChange={(e) =>
                                    setEvents((prev) =>
                                      prev.map((item) =>
                                        item.id === ev.id
                                          ? { ...item, useYN: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                >
                                  <option value="1">사용</option>
                                  <option value="0">중지</option>
                                </select>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-1">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm px-2 py-0"
                                    onClick={() => openEditEventModal(ev)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm px-2 py-0"
                                    onClick={() => handleDeleteEvent(ev.id)}
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 스포츠 베팅 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa fa-gamepad me-2"></i>
                      ● 스포츠 베팅 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    <form onSubmit={(e) => handleFormSubmit(e, "스포츠 베팅 설정")}>
                      <input type="hidden" name="userGradeIdx" value={activeGrade} />
                      <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                        <tbody>
                          <tr>
                            <th className="bg-light" style={{ width: "20%" }}>1폴더 베팅 유무</th>
                            <td>
                              <div className="input-group input-group-sm w-auto d-inline-flex">
                                <span className="input-group-text">베팅 가능 유무</span>
                                <select name="singleBetUseYN" className="form-select" defaultValue="1">
                                  <option value="1">가능</option>
                                  <option value="0">불가</option>
                                </select>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">1폴더 비적중 포인트</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-2.4 col-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">크로스</span>
                                    <input type="text" name="singleBetLosePrematch" className="form-control text-end commission" defaultValue="0.01" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-2.4 col-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">스페셜</span>
                                    <input type="text" name="singleBetLosePrematchSpecial" className="form-control text-end commission" defaultValue="0.02" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-2.4 col-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">프리매치</span>
                                    <input type="text" name="singleBetLosePrematchMix" className="form-control text-end commission" defaultValue="0.00" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-2.4 col-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브.크로스</span>
                                    <input type="text" name="singleBetLoseLive" className="form-control text-end commission" defaultValue="0.00" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-2.4 col-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브-스페셜</span>
                                    <input type="text" name="singleBetLoseLiveSpecial" className="form-control text-end commission" defaultValue="0.00" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">다폴더 비적중 포인트</th>
                            <td>
                              <div className="row g-2 mb-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">크로스</span>
                                    <input type="text" name="multiBetLosePrematch" className="form-control text-end commission" defaultValue="0.10" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">스페셜</span>
                                    <input type="text" name="multiBetLosePrematchSpecial" className="form-control text-end commission" defaultValue="0.20" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">프리매치</span>
                                    <input type="text" name="multiBetLosePrematchMix" className="form-control text-end commission" defaultValue="0.30" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브-크로스</span>
                                    <input type="text" name="multiBetLoseLive" className="form-control text-end commission" defaultValue="0.40" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브-스페셜</span>
                                    <input type="text" name="multiBetLoseLiveSpecial" className="form-control text-end commission" defaultValue="0.50" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브-통합</span>
                                    <input type="text" name="multiBetLoseLiveMix" className="form-control text-end commission" defaultValue="0.60" />
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">크로스 1폴더 제약</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-5">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">베팅금액</span>
                                    <input type="text" name="singleBetPrematchMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="singleBetPrematchMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대 당첨금액</span>
                                    <input type="text" name="singleBetPrematchWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">단폴더 페널티</span>
                                    <input type="text" name="singleBetPrematchPenalty" className="form-control text-end commission" defaultValue="0.10" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">크로스 다폴더 제약</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">베팅금액</span>
                                    <input type="text" name="multiBetPrematchMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대 당첨금액</span>
                                    <input type="text" name="multiBetPrematchWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">폴더수</span>
                                    <input type="text" name="multiBetPrematchMinCount" className="form-control text-end amount" defaultValue="2" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchMaxCount" className="form-control text-end amount" defaultValue="10" />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대배당</span>
                                    <input type="text" name="multiBetPrematchMaxOdds" className="form-control text-end commission" defaultValue="100.0" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">크로스 다폴더 배당 보너스</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">기준배당</span>
                                    <input type="text" name="multiBetDefaultOdds" className="form-control text-end commission" defaultValue="1.30" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <select name="multiBet1Count" className="form-select" defaultValue="3">
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                    </select>
                                    <input type="text" name="multiBet1Odds" className="form-control text-end commission" defaultValue="1.03" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <select name="multiBet2Count" className="form-select" defaultValue="5">
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                    </select>
                                    <input type="text" name="multiBet2Odds" className="form-control text-end commission" defaultValue="1.05" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <select name="multiBet3Count" className="form-select" defaultValue="7">
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                    </select>
                                    <input type="text" name="multiBet3Odds" className="form-control text-end commission" defaultValue="1.07" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">스페셜 1폴더 제약</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-5">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">베팅금액</span>
                                    <input type="text" name="singleBetPrematchSpecialMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="singleBetPrematchSpecialMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대 당첨금액</span>
                                    <input type="text" name="singleBetPrematchSpecialWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">단폴더 페널티</span>
                                    <input type="text" name="singleBetPrematchSpecialPenalty" className="form-control text-end commission" defaultValue="0.20" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">스페셜 다폴더 제약</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">베팅금액</span>
                                    <input type="text" name="multiBetPrematchSpecialMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchSpecialMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대 당첨금액</span>
                                    <input type="text" name="multiBetPrematchSpecialWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">폴더수</span>
                                    <input type="text" name="multiBetPrematchSpecialMinCount" className="form-control text-end amount" defaultValue="2" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchSpecialMaxCount" className="form-control text-end amount" defaultValue="10" />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대배당</span>
                                    <input type="text" name="multiBetPrematchSpecialMaxOdds" className="form-control text-end commission" defaultValue="100.0" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">프리매치 다폴더 제약</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">베팅금액</span>
                                    <input type="text" name="multiBetPrematchMixMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchMixMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대 당첨금액</span>
                                    <input type="text" name="multiBetPrematchMixWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">폴더수</span>
                                    <input type="text" name="multiBetPrematchMixMinCount" className="form-control text-end amount" defaultValue="2" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetPrematchMixMaxCount" className="form-control text-end amount" defaultValue="10" />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">최대배당</span>
                                    <input type="text" name="multiBetPrematchMixMaxOdds" className="form-control text-end commission" defaultValue="100.0" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">라이브 크로스 1폴더/다폴더</th>
                            <td>
                              <div className="row g-2 mb-2">
                                <div className="col-md-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">1폴더 베팅</span>
                                    <input type="text" name="singleBetLiveMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="singleBetLiveMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                    <span className="input-group-text">최대 당첨</span>
                                    <input type="text" name="singleBetLiveWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">다폴더 베팅</span>
                                    <input type="text" name="multiBetLiveMinMoney" className="form-control text-end amount" defaultValue="1,000" />
                                    <span className="input-group-text">~</span>
                                    <input type="text" name="multiBetLiveMaxMoney" className="form-control text-end amount" defaultValue="3,000,000" />
                                    <span className="input-group-text">최대 당첨</span>
                                    <input type="text" name="multiBetLiveWinMoney" className="form-control text-end amount" defaultValue="5,000,000" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <th className="bg-light">축베팅 제한</th>
                            <td>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">프리매치 크로스</span>
                                    <input type="text" name="axisPrematchCrossBetWinMoney" className="form-control text-end amount" defaultValue="100,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">프리매치 스페셜</span>
                                    <input type="text" name="axisPrematchSpecialBetWinMoney" className="form-control text-end amount" defaultValue="100,000,000" />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text">라이브 크로스</span>
                                    <input type="text" name="axisLiveCrossBetWinMoney" className="form-control text-end amount" defaultValue="100,000,000" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="text-center">
                        <button type="submit" className="btn btn-success btn-sm px-4">
                          <i className="fa fa-save me-1"></i>스포츠 베팅 설정 저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 미니게임 설정 */}
                <div className="panel panel-inverse mb-3">
                  <div className="panel-heading bg-dark text-white p-2 rounded-top">
                    <h4 className="panel-title mb-0 fs-6 fw-bold">
                      <i className="fa fa-gamepad me-2"></i>
                      • 미니게임 설정
                    </h4>
                  </div>
                  <div className="panel-body border p-3 bg-white rounded-bottom">
                    {/* Minigame Sub-tabs */}
                    <ul className="nav nav-pills mb-3 border-bottom pb-2">
                      {minigamesList.map((game) => (
                        <li key={game.id} className="nav-item me-1">
                          <button
                            type="button"
                            className={`nav-link btn-sm ${
                              activeMinigameTab === game.id ? "active" : ""
                            }`}
                            onClick={() => setActiveMinigameTab(game.id)}
                          >
                            {game.name}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Active Minigame Tab Content */}
                    <div>
                      {minigamesList.map((game) => {
                        if (game.id !== activeMinigameTab) return null;
                        return (
                          <form
                            key={game.id}
                            onSubmit={(e) =>
                              handleFormSubmit(e, `미니게임 (${game.name}) 설정`)
                            }
                          >
                            <input type="hidden" name="userGradeIdx" value={activeGrade} />
                            <input type="hidden" name="gameGroupIdx" value="4" />
                            <input type="hidden" name="gameTypeIdx" value={game.id} />
                            <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                              <tbody>
                                <tr>
                                  <th className="bg-light" style={{ width: "20%" }}>
                                    단폴더 제약
                                  </th>
                                  <td>
                                    <div className="row g-2">
                                      <div className="col-md-7">
                                        <div className="input-group input-group-sm">
                                          <span className="input-group-text">베팅금액</span>
                                          <input
                                            type="text"
                                            name="singleBetMinMoney"
                                            className="form-control text-end amount"
                                            defaultValue="5,000"
                                          />
                                          <span className="input-group-text">~</span>
                                          <input
                                            type="text"
                                            name="singleBetMaxMoney"
                                            className="form-control text-end amount"
                                            defaultValue="1,000,000"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-5">
                                        <div className="input-group input-group-sm">
                                          <span className="input-group-text">
                                            최대 당첨금액
                                          </span>
                                          <input
                                            type="text"
                                            name="singleBetWinMoney"
                                            className="form-control text-end amount"
                                            defaultValue="2,000,000"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th className="bg-light">조합 제약</th>
                                  <td>
                                    <div className="row g-2">
                                      <div className="col-md-7">
                                        <div className="input-group input-group-sm">
                                          <span className="input-group-text">베팅금액</span>
                                          <input
                                            type="text"
                                            name="multiBetMinMoney"
                                            className="form-control text-end amount"
                                            defaultValue="5,000"
                                          />
                                          <span className="input-group-text">~</span>
                                          <input
                                            type="text"
                                            name="multiBetMaxMoney"
                                            className="form-control text-end amount"
                                            defaultValue="1,000,000"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-5">
                                        <div className="input-group input-group-sm">
                                          <span className="input-group-text">
                                            최대 당첨금액
                                          </span>
                                          <input
                                            type="text"
                                            name="multiBetWinMoney"
                                            className="form-control text-end amount"
                                            defaultValue="3,000,000"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="text-center">
                              <button type="submit" className="btn btn-success btn-sm px-4">
                                <i className="fa fa-save me-1"></i>{game.name} 설정 저장
                              </button>
                            </div>
                          </form>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 돌발 이벤트 추가/수정 Modal */}
      {showEventModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="panel panel-inverse mb-0">
                <div className="panel-heading bg-dark text-white p-2 rounded-top d-flex justify-content-between align-items-center">
                  <h4 className="panel-title mb-0 fs-6 fw-bold">
                    <i className="fa-solid fa-bolt me-2"></i>
                    {editingEventId !== null ? "돌발 이벤트 수정" : "돌발 이벤트 추가"}
                  </h4>
                  <button
                    type="button"
                    className="btn btn-xs btn-icon btn-danger"
                    onClick={() => setShowEventModal(false)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="panel-body p-3 bg-white rounded-bottom">
                  <form onSubmit={handleSaveEvent}>
                    <table className="table table-striped table-bordered align-middle bg-white text-center fw-bold fs-7 mb-3">
                      <thead className="table-dark">
                        <tr>
                          <th>지정 시간</th>
                          <th>돌발 보너스 %</th>
                          <th>보너스 최대금액</th>
                          <th>사용 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-inline-flex align-items-center">
                              <input
                                type="time"
                                className="form-control form-control-sm"
                                value={eventForm.startTime}
                                onChange={(e) =>
                                  setEventForm({ ...eventForm, startTime: e.target.value })
                                }
                                required
                              />
                              <span className="mx-1">~</span>
                              <input
                                type="time"
                                className="form-control form-control-sm"
                                value={eventForm.endTime}
                                onChange={(e) =>
                                  setEventForm({ ...eventForm, endTime: e.target.value })
                                }
                                required
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-inline-flex align-items-center">
                              <input
                                type="text"
                                className="form-control form-control-sm commission text-end me-1"
                                style={{ width: "70px" }}
                                value={eventForm.bonusCommission}
                                onChange={(e) =>
                                  setEventForm({ ...eventForm, bonusCommission: e.target.value })
                                }
                                placeholder="1.00"
                              />
                              <span>%</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-inline-flex align-items-center">
                              <input
                                type="text"
                                className="form-control form-control-sm amount text-end me-1"
                                style={{ width: "120px" }}
                                value={eventForm.bonusLimit}
                                onChange={(e) =>
                                  setEventForm({ ...eventForm, bonusLimit: e.target.value })
                                }
                                placeholder="100,000"
                              />
                              <span>P</span>
                            </div>
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={eventForm.useYN}
                              onChange={(e) =>
                                setEventForm({ ...eventForm, useYN: e.target.value })
                              }
                            >
                              <option value="1">사용</option>
                              <option value="0">중지</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center gap-2 d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-sm text-white px-3">
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm text-white px-3"
                        onClick={() => setShowEventModal(false)}
                      >
                        <i className="fa-solid fa-xmark me-1"></i>닫기
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
