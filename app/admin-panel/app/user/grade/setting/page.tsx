"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

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

export default function UserGradeSettingPage() {
  const [activeGrade, setActiveGrade] = useState(1);
  const [gradeSettings, setGradeSettings] = useState<{ [key: number]: GradeSetting }>({});
  const [loading, setLoading] = useState(false);

  const fetchGradeSettings = async (gradeLevel: number) => {
    if (gradeSettings[gradeLevel]) return; // Already loaded
    
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/user/grade/setting?gradeLevel=${gradeLevel}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch grade settings');
      }

      const result: GradeSettingsResponse = await response.json();
      
      if (result.success && result.data.length > 0) {
        const setting = result.data[0];
        // Parse gameSettings if it's a string
        if (setting.gameSettings && typeof setting.gameSettings === 'string') {
          try {
            setting.gameSettings = JSON.parse(`[${setting.gameSettings}]`);
          } catch (e) {
            setting.gameSettings = [];
          }
        }
        setGradeSettings(prev => ({
          ...prev,
          [gradeLevel]: setting
        }));
      } else {
        // Initialize empty setting if not found
        setGradeSettings(prev => ({
          ...prev,
          [gradeLevel]: {
            grade_level: gradeLevel,
            min_charge_amount: 0,
            max_charge_amount: 0,
            register_first_charge_commission: 0,
            register_first_charge_bonus_limit: 0,
            first_charge_bonus_exchange_today: '0',
            every_charge_bonus_exchange_today: '0',
            grade_integrate_charge_bonus_use_yn: '0',
            grade_payback_percent: 0,
            grade_payback_min: 0,
            grade_payback_max: 0,
            grade_payback_type: '',
            grade_payback_date_type: '',
            grade_payback_date_allow: '0',
            gameSettings: [],
            integrateChargeSettings: []
          }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch grade settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGradeSettings(activeGrade);
  }, [activeGrade]);

  const handleGradeTabClick = (level: number) => {
    setActiveGrade(level);
  };

  const getGameSetting = (gradeLevel: number, gameTypeId: number): GameSetting | null => {
    const settings = gradeSettings[gradeLevel];
    if (!settings || !settings.gameSettings) return null;
    return settings.gameSettings.find(gs => gs.gameTypeId === gameTypeId) || null;
  };
  return (
    <Layout>
      <h1 className="page-header">
        <a href="/userGradeSetting.html">
          <i className="fa-solid fa-layer-group me-2"></i>회원 레벨별 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          <ul className="nav nav-pills mb-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((level) => (
              <li key={level} className="nav-item">
                <a
                  href={`#grade-tab-${level}`}
                  data-bs-toggle="tab"
                  className={`nav-link ${level === activeGrade ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGradeTabClick(level);
                  }}
                >
                  {level}레벨
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-content panel p-3 rounded">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((level) => {
              const settings = gradeSettings[level] || {
                grade_level: level,
                min_charge_amount: 0,
                max_charge_amount: 0,
                register_first_charge_commission: 0,
                register_first_charge_bonus_limit: 0,
                first_charge_bonus_exchange_today: '0',
                every_charge_bonus_exchange_today: '0',
                grade_integrate_charge_bonus_use_yn: '0',
                grade_payback_percent: 0,
                grade_payback_min: 0,
                grade_payback_max: 0,
                grade_payback_type: '',
                grade_payback_date_type: '',
                grade_payback_date_allow: '0',
                gameSettings: [],
                integrateChargeSettings: []
              };
              
              return (
                <div 
                  key={level} 
                  className={`tab-pane fade ${level === activeGrade ? "active show" : ""}`} 
                  id={`grade-tab-${level}`}
                >
              <div className="row">
                <div className="col-3">
                  {/* 충전 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa fa-won-sign"></i>
                        </span>
                        ₩ 1레벨 충전 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <form action="/userGrade/userGradeSetting.html" method="post">
                        <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                        <input type="hidden" name="userGradeIdx" value={level} />
                        
                        <div className="form-group row mb-3">
                          <label className="col-form-label col-md-4">최소 충전 금액</label>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="minChargeAmount"
                              className="form-control amount"
                              defaultValue={settings.min_charge_amount || ''}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group row mb-3">
                          <label className="col-form-label col-md-4">최대 충전 금액</label>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="maxChargeAmount"
                              className="form-control amount"
                              defaultValue={settings.max_charge_amount || ''}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group row mb-3">
                          <label className="col-form-label col-md-4">가입 첫충 보너스</label>
                          <div className="col-md-8">
                            <div className="d-inline-flex">
                              <input
                                type="text"
                                name="registerFirstChargeCommission"
                                className="form-control commission"
                                defaultValue={settings.register_first_charge_commission || ''}
                              />
                              <label className="col-form-label ms-1 w-auto">%</label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group row mb-3">
                          <label className="col-form-label col-md-4">가입 첫충 보너스 최대 금액</label>
                          <div className="col-md-8">
                            <div className="d-inline-flex">
                              <input
                                type="text"
                                name="registerFirstChargeBonusLimit"
                                className="form-control amount"
                                defaultValue={settings.register_first_charge_bonus_limit || ''}
                              />
                              <label className="col-form-label ms-1 w-auto">P</label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group row mb-1">
                          <label className="col-form-label col-md-4">첫 충전 보너스</label>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col">
                                <label className="col-form-label me-1">금일 환전</label>
                              </div>
                              <div className="col">
                                <select name="firstChargeBonus" className="form-select" defaultValue={settings.first_charge_bonus_exchange_today || '0'}>
                                  <option value="1">가능</option>
                                  <option value="0">불가</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {gameTypes.map((gameType) => {
                          const gameSetting = getGameSetting(level, gameType.id);
                          return (
                            <div key={gameType.id} className="form-group row mb-1">
                              <div className="col-md-5">
                                <div className="input-group">
                                  <label className="input-group-text col-form-label px-2">
                                    {gameType.name}
                                  </label>
                                  <input
                                    type="text"
                                    name={`firstChargeCommission[${gameType.id}]`}
                                    className="form-control commission"
                                    defaultValue={gameSetting?.firstChargeCommission || ''}
                                  />
                                  <label className="input-group-text col-form-label px-2">%</label>
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="input-group">
                                  <label className="input-group-text col-form-label">최대 보너스 금액</label>
                                  <input
                                    type="text"
                                    name={`firstChargeBonusLimit[${gameType.id}]`}
                                    className="form-control amount"
                                    defaultValue={gameSetting?.firstChargeBonusLimit || ''}
                                  />
                                  <label className="input-group-text col-form-label px-2">P</label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        <div className="form-group row mb-1 mt-2">
                          <label className="col-form-label col-md-4">매 충전 보너스</label>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col">
                                <label className="col-form-label me-2">금일 환전</label>
                              </div>
                              <div className="col">
                                <select name="everyChargeBonus" className="form-select" defaultValue={settings.every_charge_bonus_exchange_today || '0'}>
                                  <option value="1">가능</option>
                                  <option value="0">불가</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {gameTypes.map((gameType) => {
                          const gameSetting = getGameSetting(level, gameType.id);
                          return (
                            <div key={gameType.id} className="form-group row mb-1">
                              <div className="col-md-5">
                                <div className="input-group">
                                  <label className="input-group-text col-form-label px-2">
                                    {gameType.name}
                                  </label>
                                  <input
                                    type="text"
                                    name={`everyChargeCommission[${gameType.id}]`}
                                    className="form-control commission"
                                    defaultValue={gameSetting?.everyChargeCommission || ''}
                                  />
                                  <label className="input-group-text col-form-label px-2">%</label>
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="input-group">
                                  <label className="input-group-text col-form-label">최대 보너스 금액</label>
                                  <input
                                    type="text"
                                    name={`everyChargeBonusLimit[${gameType.id}]`}
                                    className="form-control amount"
                                    defaultValue={gameSetting?.everyChargeBonusLimit || ''}
                                  />
                                  <label className="input-group-text col-form-label px-2">P</label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        <div className="row text-center">
                          <div className="col">
                            <button type="submit" className="btn btn-success">
                              <i className="fa fa-save me-1"></i>저장
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* 통합 충전 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa fa-won-sign"></i>
                        </span>
                        {level}레벨 통합 충전 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <form action="/userGrade/integrateChargeBonusSetting" method="post">
                        <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                        <input type="hidden" name="userGradeIdx" value={level} />
                        <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                          <tbody>
                            <tr>
                              <th className="bg-gray-300">사용유무</th>
                              <td className="py-1">
                                <div className="d-flex">
                                  <select name="gradeIntegrateChargeBonusUseYN" className="form-select w-auto" defaultValue={settings.grade_integrate_charge_bonus_use_yn || '0'}>
                                    <option value="0">사용 안함</option>
                                    <option value="1">사용</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                            {[1, 2, 3, 4].map((num) => {
                              const integrateSetting = settings.integrateChargeSettings?.find(ics => ics.charge_number === num);
                              return (
                                <React.Fragment key={num}>
                                  <tr>
                                    <th rowSpan={2} className="bg-gray-300 p-0">
                                      통합충전{num}
                                    </th>
                                    <td className="py-1">
                                      <input
                                        type="text"
                                        name={`updateData[${num}][gradeIntegrateChargeBonusText]`}
                                        maxLength={100}
                                        className="form-control w-250px me-3"
                                        placeholder="텍스트 문구 지정"
                                        defaultValue={integrateSetting?.bonus_text || ''}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-1">
                                      <div className="d-flex">
                                        <input
                                          type="text"
                                          name={`updateData[${num}][gradeIntegrateChargeBonus]`}
                                          className="form-control commission w-60px me-1"
                                          defaultValue={integrateSetting?.bonus_commission || ''}
                                        />
                                        <label className="col-form-label w-auto me-3">%</label>
                                        <label className="col-form-label w-auto me-1">최대</label>
                                        <input
                                          type="text"
                                          name={`updateData[${num}][gradeIntegrateChargeBonusMax]`}
                                          className="form-control amount w-80px"
                                          defaultValue={integrateSetting?.bonus_max || ''}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                        <div className="col text-center">
                          <button type="submit" className="btn btn-success">
                            <i className="fa fa-save me-1"></i>저장
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* 벤더 스킨 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa-solid fa-bolt"></i>
                        </span>
                        1레벨 벤더 스킨 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <form action="/userGrade/userGradeVendorSkin" method="post">
                        <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                        <input type="hidden" name="userGradeIdx" value="1" />
                        <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                          <thead className="bg-dark bg-gradient text-white">
                            <tr>
                              <th>벤더</th>
                              <th>스킨</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                        <div className="col text-center">
                          <button type="submit" className="btn btn-success">
                            <i className="fa fa-save me-1"></i>저장
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* 페이백 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa-solid fa-bolt"></i>
                        </span>
                        {level}레벨 페이백 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <form action="/userGrade/setPayback" method="post">
                        <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                        <input type="hidden" name="userGradeIdx" value={level} />
                        <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                          <tbody>
                            <tr>
                              <td>페이백 %</td>
                              <td className="p-1">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="gradePaybackPercent"
                                    className="form-control commission"
                                    defaultValue={settings.grade_payback_percent || ''}
                                  />
                                  <label className="input-group-text col-form-label px-2">%</label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>지급 설정</td>
                              <td className="p-1">
                                <div className="col">
                                  <div className="input-group">
                                    <label className="input-group-text col-form-label px-2">최소 금액</label>
                                    <input
                                      type="text"
                                      name="gradePaybackMin"
                                      className="form-control amount"
                                      defaultValue={settings.grade_payback_min || ''}
                                      style={{ textAlign: "right" }}
                                    />
                                  </div>
                                </div>
                                <div className="col pt-1">
                                  <div className="input-group">
                                    <label className="input-group-text col-form-label px-2">최대 금액</label>
                                    <input
                                      type="text"
                                      name="gradePaybackMax"
                                      className="form-control amount"
                                      defaultValue={settings.grade_payback_max || ''}
                                      style={{ textAlign: "right" }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>페이백 타입</td>
                              <td className="p-1">
                                <select className="form-select" name="gradePaybackType" defaultValue={settings.grade_payback_type || ''}>
                                  <option value="">페이백 타입 선택</option>
                                  <option value="1">총베팅금-총당첨금 (스포츠만)</option>
                                  <option value="2">입금-출금</option>
                                  <option value="3">입금-출금-보유금액</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>페이백 적용</td>
                              <td className="p-1">
                                <div className="row">
                                  <div className="col pe-1">
                                    <select className="form-select" name="gradePaybackDateType" data-value="">
                                      <option value="">페이백 적용 날짜</option>
                                      <option value="1">최근 일주일</option>
                                      <option value="2">최근 15일</option>
                                      <option value="3">최근 한달</option>
                                    </select>
                                  </div>
                                  <div className="col ps-1">
                                    <select className="form-select" name="gradePaybackDateAllow" data-value=""></select>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="col text-center">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {/* setPayback(this.form) */}}
                          >
                            <i className="fa fa-save me-1"></i>저장
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-9">
                  {/* 돌발 이벤트 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa-solid fa-bolt"></i>
                        </span>
                        ▶ 1레벨 돌발 이벤트 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <div className="text-end mb-2">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-success btn-sm text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEvent"
                          onClick={(e) => {
                            e.preventDefault();
                            // Set the userGradeIdx for the form
                            const form = document.getElementById("userGradeChargeEventNew") as HTMLFormElement;
                            if (form) {
                              const hiddenInput = form.querySelector("#userGradeIdx") as HTMLInputElement;
                              if (hiddenInput) {
                                hiddenInput.value = "1";
                              }
                            }
                            // Reset form fields
                            const startTime = document.getElementById("stratTime") as HTMLInputElement;
                            const endTime = document.getElementById("endTime") as HTMLInputElement;
                            const bonusCommission = document.getElementById("eventBonusCommission") as HTMLInputElement;
                            const bonusLimit = document.getElementById("eventBonusLimit") as HTMLInputElement;
                            const useYN = document.getElementById("eventUseYN") as HTMLSelectElement;
                            if (startTime) startTime.value = "";
                            if (endTime) endTime.value = "";
                            if (bonusCommission) bonusCommission.value = "";
                            if (bonusLimit) bonusLimit.value = "";
                            if (useYN) useYN.value = "1";
                            // Update modal title
                            const modalTitle = document.getElementById("modalTitle");
                            if (modalTitle) modalTitle.textContent = "돌발 이벤트 추가";
                          }}
                        >
                          <i className="fa fa-plus me-1"></i>이벤트 추가
                        </a>
                      </div>
                      <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                        <thead className="bg-dark bg-gradient text-white">
                          <tr>
                            <th>번호</th>
                            <th>지정 시간</th>
                            <th>돌발 보너스 %</th>
                            <th>보너스 최대금액</th>
                            <th>사용 여부</th>
                            <th>기능</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((num) => (
                            <tr key={num}>
                              <td>{num}</td>
                              <td>
                                <div className="d-inline-flex">
                                  <input
                                    type="time"
                                    className="form-control w-auto"
                                    name="stratTime"
                                    defaultValue={num === 1 ? "00:59" : num === 2 ? "01:00" : "02:00"}
                                  />
                                  <label className="col-form-label w-auto ms-1 me-1">~</label>
                                  <input
                                    type="time"
                                    className="form-control w-auto"
                                    name="endTime"
                                    defaultValue={num === 1 ? "01:00" : num === 2 ? "02:00" : "03:00"}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-inline-flex">
                                  <input
                                    type="text"
                                    name="eventBonusCommission"
                                    className="form-control w-80px commission"
                                    defaultValue={`${num}.00`}
                                  />
                                  <label className="col-form-label w-auto ms-1 me-1">%</label>
                                </div>
                              </td>
                              <td>
                                <div className="d-inline-flex">
                                  <input
                                    type="text"
                                    name="eventBonusLimit"
                                    className="form-control w-auto amount"
                                    defaultValue={num}
                                    style={{ textAlign: "right" }}
                                  />
                                  <label className="col-form-label w-auto ms-1 me-1">P</label>
                                </div>
                              </td>
                              <td>
                                <select name="eventUseYN" className="form-select">
                                  <option value="1" selected>사용</option>
                                  <option value="0">중지</option>
                                </select>
                              </td>
                              <td>
                                <div className="d-block">
                                  <button type="submit" className="btn btn-primary btn-sm text-white me-1">
                                    <i className="fas fa-edit me-1"></i>변경
                                  </button>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-danger btn-sm text-white"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (confirm("삭제 하시겠습니까?")) {
                                        const deleteForm = document.getElementById("userGradeChargeEventDelete") as HTMLFormElement;
                                        if (deleteForm) {
                                          const userGradeIdxInput = deleteForm.querySelector("#deleteUserGradeIdx") as HTMLInputElement;
                                          const eventIdxInput = deleteForm.querySelector("#userGradeChargeEventIdx") as HTMLInputElement;
                                          if (userGradeIdxInput) userGradeIdxInput.value = "1";
                                          if (eventIdxInput) eventIdxInput.value = "3"; // This should be dynamic based on the actual event
                                          deleteForm.submit();
                                        }
                                      }
                                    }}
                                  >
                                    <i className="fa-solid fa-trash-can me-1"></i>삭제
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 스포츠 베팅 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa fa-gamepad"></i>
                        </span>
                        ● 스포츠 베팅 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <form action="/userGrade/userGradeSport" method="post">
                        <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                        <input type="hidden" name="userGradeIdx" value="1" />
                        
                        <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                          <tbody>
                            <tr>
                              <th>1폴더 베팅 유무</th>
                              <td>
                                <div className="input-group">
                                  <div className="input-group-text">베팅 가능 유무</div>
                                  <select name="singleBetUseYN" className="form-select w-auto">
                                    <option value="1" selected>가능</option>
                                    <option value="0">불가</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>1폴더 비적중 포인트</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-20">
                                    <div className="input-group-text">크로스</div>
                                    <input
                                      type="text"
                                      name="singleBetLosePrematch"
                                      className="form-control text-end commission"
                                      defaultValue="0.01"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">스페셜</div>
                                    <input
                                      type="text"
                                      name="singleBetLosePrematchSpecial"
                                      className="form-control text-end commission"
                                      defaultValue="0.02"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">프리매치</div>
                                    <input
                                      type="text"
                                      name="singleBetLosePrematchMix"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">라이브.크로스</div>
                                    <input
                                      type="text"
                                      name="singleBetLoseLive"
                                      className="form-control text-end commission"
                                      defaultValue="0.0"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">라이브-스페셜</div>
                                    <input
                                      type="text"
                                      name="singleBetLoseLiveSpecial"
                                      className="form-control text-end commission"
                                      defaultValue="0.0"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>다폴더 비적중 포인트</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">크로스</div>
                                    <input
                                      type="text"
                                      name="multiBetLosePrematch"
                                      className="form-control text-end commission"
                                      defaultValue="0.10"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">스페셜</div>
                                    <input
                                      type="text"
                                      name="multiBetLosePrematchSpecial"
                                      className="form-control text-end commission"
                                      defaultValue="0.20"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">프리매치</div>
                                    <input
                                      type="text"
                                      name="multiBetLosePrematchMix"
                                      className="form-control text-end commission"
                                      defaultValue="0.30"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                </div>
                                <div className="row d-flex mt-2">
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">라이브-크로스</div>
                                    <input
                                      type="text"
                                      name="multiBetLoseLive"
                                      className="form-control text-end commission"
                                      defaultValue="0.40"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">라이브-스페셜</div>
                                    <input
                                      type="text"
                                      name="multiBetLoseLiveSpecial"
                                      className="form-control text-end commission"
                                      defaultValue="0.50"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                  <div className="input-group" style={{ width: "33.3%" }}>
                                    <div className="input-group-text">라이브-통합</div>
                                    <input
                                      type="text"
                                      name="multiBetLoseLiveMix"
                                      className="form-control text-end commission"
                                      defaultValue="0.60"
                                    />
                                    <div className="input-group-text">%</div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>크로스 1폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">단폴더 페널티</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchPenalty"
                                      className="form-control text-end commission"
                                      defaultValue="0.10"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>크로스 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>크로스 다폴더 배당 보너스</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-25">
                                    <div className="input-group-text">기준배당</div>
                                    <input
                                      type="text"
                                      name="multiBetDefaultOdds"
                                      className="form-control text-end commission"
                                      defaultValue="1.30"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiBet1Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3" selected>3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiBet1Odds"
                                      className="form-control text-end commission"
                                      defaultValue="1.03"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiBet2Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5" selected>5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiBet2Odds"
                                      className="form-control text-end commission"
                                      defaultValue="1.05"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiBet3Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7" selected>7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiBet3Odds"
                                      className="form-control text-end commission"
                                      defaultValue="1.07"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>스페셜 1폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchSpecialMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchSpecialMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchSpecialWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">단폴더 페널티</div>
                                    <input
                                      type="text"
                                      name="singleBetPrematchSpecialPenalty"
                                      className="form-control text-end commission"
                                      defaultValue="0.20"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>스페셜 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchSpecialMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>스페셜 다폴더 배당 보너스</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-25">
                                    <div className="input-group-text">기준배당</div>
                                    <input
                                      type="text"
                                      name="multiSpecialBetDefaultOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiSpecialBet1Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiSpecialBet1Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiSpecialBet2Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiSpecialBet2Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiSpecialBet3Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiSpecialBet3Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>프리매치 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetPrematchMixMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>프리매치 다폴더 배당 보너스</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-25">
                                    <div className="input-group-text">기준배당</div>
                                    <input
                                      type="text"
                                      name="multiMixBetDefaultOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiMixBet1Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiMixBet1Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiMixBet2Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiMixBet2Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <select name="multiMixBet3Count" className="form-select w-auto">
                                      <option value=""></option>
                                      <option value="1">1폴더</option>
                                      <option value="2">2폴더</option>
                                      <option value="3">3폴더</option>
                                      <option value="4">4폴더</option>
                                      <option value="5">5폴더</option>
                                      <option value="6">6폴더</option>
                                      <option value="7">7폴더</option>
                                      <option value="8">8폴더</option>
                                      <option value="9">9폴더</option>
                                      <option value="10">10폴더</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="multiMixBet3Odds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>라이브 크로스 1폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>라이브 크로스 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>라이브 스페셜 1폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveSpecialMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveSpecialMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="singleBetLiveSpecialWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>라이브 스페셜 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveSpecialMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>라이브 통합 다폴더 제약</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-40">
                                    <div className="input-group-text">베팅금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixMinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="1,000"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixMaxMoney"
                                      className="form-control text-end amount"
                                      defaultValue="3,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대 당첨금액</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="5,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">폴더수</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixMinCount"
                                      className="form-control text-end amount"
                                      defaultValue="2"
                                    />
                                    <div className="input-group-text">~</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixMaxCount"
                                      className="form-control text-end amount"
                                      defaultValue="10"
                                    />
                                  </div>
                                  <div className="input-group w-20">
                                    <div className="input-group-text">최대배당</div>
                                    <input
                                      type="text"
                                      name="multiBetLiveMixMaxOdds"
                                      className="form-control text-end commission"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>축베팅 제한 - 프리매치</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-25">
                                    <div className="input-group-text">크로스 당첨금</div>
                                    <input
                                      type="text"
                                      name="axisPrematchCrossBetWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="100,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <div className="input-group-text">스페셜 당첨금</div>
                                    <input
                                      type="text"
                                      name="axisPrematchSpecialBetWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="100,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <div className="input-group-text">프리매치 당첨금</div>
                                    <input
                                      type="text"
                                      name="axisPrematchMixBetWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>축베팅 제한 - 라이브</th>
                              <td>
                                <div className="row d-flex">
                                  <div className="input-group w-25">
                                    <div className="input-group-text">크로스 당첨금</div>
                                    <input
                                      type="text"
                                      name="axisLiveCrossBetWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="100,000,000"
                                    />
                                  </div>
                                  <div className="input-group w-25">
                                    <div className="input-group-text">스페셜 당첨금</div>
                                    <input
                                      type="text"
                                      name="axisLiveSpecialBetWinMoney"
                                      className="form-control text-end amount"
                                      defaultValue="100,000,000"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <div className="row text-center mt-3">
                          <div className="col">
                            <button type="submit" className="btn btn-success">
                              <i className="fa fa-save me-1"></i>저장
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* 미니게임 설정 */}
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <span className="me-2 pull-left">
                          <i className="fa fa-gamepad"></i>
                        </span>
                        • 미니게임 설정
                      </h4>
                    </div>
                    <div className="panel-body border">
                      <ul className="nav nav-pills mb-1">
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-4"
                            data-bs-toggle="tab"
                            className="nav-link active"
                          >
                            파워볼(PBG)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-10"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            EOS파워볼5분
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-11"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            EOS파워볼3분
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-12"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            코인파워볼5분
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-13"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            코인파워볼3분
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-14"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            코인사다리5분
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#user-minigame-tab-1-15"
                            data-bs-toggle="tab"
                            className="nav-link"
                          >
                            코인사다리3분
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content panel rounded mb-0">
                        {[
                          { id: 4, name: "파워볼(PBG)", tabId: "user-minigame-tab-1-4", active: true },
                          { id: 10, name: "EOS파워볼5분", tabId: "user-minigame-tab-1-10", active: false },
                          { id: 11, name: "EOS파워볼3분", tabId: "user-minigame-tab-1-11", active: false },
                          { id: 12, name: "코인파워볼5분", tabId: "user-minigame-tab-1-12", active: false },
                          { id: 13, name: "코인파워볼3분", tabId: "user-minigame-tab-1-13", active: false },
                          { id: 14, name: "코인사다리5분", tabId: "user-minigame-tab-1-14", active: false },
                          { id: 15, name: "코인사다리3분", tabId: "user-minigame-tab-1-15", active: false },
                        ].map((game) => (
                          <div
                            key={game.id}
                            className={`tab-pane fade ${game.active ? "active show" : ""}`}
                            id={game.tabId}
                          >
                            <form action="/userGrade/userGradeArcade" method="post">
                              <input type="hidden" name="_token" value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8" />
                              <input type="hidden" name="userGradeIdx" value="1" />
                              <input type="hidden" name="gameGroupIdx" value="4" />
                              <input type="hidden" name="gameTypeIdx" value={game.id} />
                              <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                                <tbody>
                                  <tr>
                                    <th>단폴더 제약</th>
                                    <td>
                                      <div className="row d-flex">
                                        <div className="input-group w-50">
                                          <div className="input-group-text">베팅금액</div>
                                          <input
                                            type="text"
                                            name="singleBetMinMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                          <div className="input-group-text">~</div>
                                          <input
                                            type="text"
                                            name="singleBetMaxMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                        </div>
                                        <div className="input-group w-25">
                                          <div className="input-group-text">최대 당첨금액</div>
                                          <input
                                            type="text"
                                            name="singleBetWinMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>조합 제약</th>
                                    <td>
                                      <div className="row d-flex">
                                        <div className="input-group w-50">
                                          <div className="input-group-text">베팅금액</div>
                                          <input
                                            type="text"
                                            name="multiBetMinMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                          <div className="input-group-text">~</div>
                                          <input
                                            type="text"
                                            name="multiBetMaxMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                        </div>
                                        <div className="input-group w-25">
                                          <div className="input-group-text">최대 당첨금액</div>
                                          <input
                                            type="text"
                                            name="multiBetWinMoney"
                                            className="form-control text-end amount"
                                            defaultValue=""
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="col text-center">
                                <button type="submit" className="btn btn-success">
                                  <i className="fa fa-save me-1"></i>저장
                                </button>
                              </div>
                            </form>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 돌발 이벤트 추가/수정 Modal */}
      <div
        className="modal fade"
        id="modalEvent"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: "700px" }}>
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-bolt me-1"></i>
                  </span>
                  <span id="modalTitle">돌발 이벤트 추가</span>
                </h4>
                <div className="panel-heading-btn">
                  <a
                    href="javascript:;"
                    className="btn btn-xs btn-icon btn-default"
                    data-toggle="panel-expand"
                    data-tooltip-init="true"
                  >
                    <i className="fa fa-expand"></i>
                  </a>
                  <a
                    href="javascript:;"
                    className="btn btn-xs btn-icon btn-danger"
                    data-bs-dismiss="modal"
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form
                  id="userGradeChargeEventNew"
                  action="/userGrade/userGradeChargeEventNew"
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8"
                  />
                  <input
                    type="hidden"
                    id="userGradeIdx"
                    name="userGradeIdx"
                    value=""
                  />
                  <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
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
                          <div className="d-inline-flex">
                            <input
                              type="time"
                              className="form-control w-auto"
                              id="stratTime"
                              name="stratTime"
                            />
                            <label className="col-form-label w-auto ms-1 me-1">~</label>
                            <input
                              type="time"
                              className="form-control w-auto"
                              id="endTime"
                              name="endTime"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              type="text"
                              id="eventBonusCommission"
                              name="eventBonusCommission"
                              className="form-control w-70px commission"
                            />
                            <label className="col-form-label w-auto ms-1 me-1">%</label>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              type="text"
                              id="eventBonusLimit"
                              name="eventBonusLimit"
                              className="form-control w-150px amount"
                            />
                            <label className="col-form-label w-auto ms-1 me-1">P</label>
                          </div>
                        </td>
                        <td>
                          <select
                            id="eventUseYN"
                            name="eventUseYN"
                            className="form-select w-auto"
                          >
                            <option value="1">사용</option>
                            <option value="0">중지</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-secondary btn-sm text-white"
                        data-bs-dismiss="modal"
                      >
                        <i className="fa-solid fa-xmark me-2"></i>닫기
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 돌발 이벤트 삭제 Form */}
      <form
        id="userGradeChargeEventDelete"
        action="/userGrade/userGradeChargeEventDelete"
        method="post"
      >
        <input
          type="hidden"
          name="_token"
          value="sw75cDvVpYe7fkeS0HZxrF0a3ozd1p3xYwMWbxk8"
        />
        <input
          type="hidden"
          id="deleteUserGradeIdx"
          name="userGradeIdx"
          value=""
        />
        <input
          type="hidden"
          id="userGradeChargeEventIdx"
          name="userGradeChargeEventIdx"
          value=""
        />
      </form>
    </Layout>
  );
}
