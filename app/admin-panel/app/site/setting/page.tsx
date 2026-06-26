"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

export default function SettingPage() {
  // Refs for the textareas to be converted into CKEditor
  const chargeNoticeRef = useRef<HTMLTextAreaElement>(null);
  const paybackNoticeRef = useRef<HTMLTextAreaElement>(null);
  const exchangeNoticeRef = useRef<HTMLTextAreaElement>(null);
  const couponMemoRef = useRef<HTMLTextAreaElement>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});

  const BACKEND_URL = ""; // Use relative path for proxy

  const updateSetting = useCallback(
    async (key: string, value: string) => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/admin/site-setting/${key}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ value }),
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Update failed");
      } catch (error) {
        console.error(`Failed to update ${key}:`, error);
      }
    },
    [BACKEND_URL]
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const id = e.target.id;
      const value = e.target.value;
      setSettings((prev) => ({ ...prev, [id]: value }));
      updateSetting(id, value);
    },
    [updateSetting]
  );

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const parts = e.currentTarget.id.split("-");
      const key = parts[0];
      const value = parts[1];
      setSettings((prev) => ({ ...prev, [key]: value }));
      updateSetting(key, value);
    },
    [updateSetting]
  );

  const handleSave = useCallback(() => {
    alert("설정 저장되었습니다.");
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/site-setting`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.data || {});
        // Set CKEditor textarea values
        if (chargeNoticeRef.current)
          chargeNoticeRef.current.value = data.data?.chargeNotice || "";
        if (paybackNoticeRef.current)
          paybackNoticeRef.current.value = data.data?.paybackNotice || "";
        if (exchangeNoticeRef.current)
          exchangeNoticeRef.current.value = data.data?.exchangeNotice || "";
        if (couponMemoRef.current)
          couponMemoRef.current.value = data.data?.couponMemo || "";
        // Re-init CKEditors
        setTimeout(() => {
          if (typeof window !== "undefined" && (window as any).ClassicEditor) {
            initCKEditors();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Load settings failed:", error);
    }
  }, [BACKEND_URL]);

  const initCKEditors = useCallback(() => {
    if (typeof window === "undefined" || !(window as any).ClassicEditor) return;

    const commonConfig = {
      extraPlugins: [(window as any).CkUploadAdapterPlugin],
    };

    if (chargeNoticeRef.current) {
      (window as any).ClassicEditor.create(
        chargeNoticeRef.current,
        commonConfig
      )
        .then((editor: any) => {
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            chargeNoticeRef.current!.value = data;
            updateSetting("chargeNotice", data);
          });
        })
        .catch(console.error);
    }

    if (paybackNoticeRef.current) {
      (window as any).ClassicEditor.create(
        paybackNoticeRef.current,
        commonConfig
      )
        .then((editor: any) => {
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            paybackNoticeRef.current!.value = data;
            updateSetting("paybackNotice", data);
          });
        })
        .catch(console.error);
    }

    if (exchangeNoticeRef.current) {
      (window as any).ClassicEditor.create(
        exchangeNoticeRef.current,
        commonConfig
      )
        .then((editor: any) => {
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            exchangeNoticeRef.current!.value = data;
            updateSetting("exchangeNotice", data);
          });
        })
        .catch(console.error);
    }

    if (couponMemoRef.current) {
      (window as any).ClassicEditor.create(couponMemoRef.current, commonConfig)
        .then((editor: any) => {
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            couponMemoRef.current!.value = data;
            updateSetting("couponMemo", data);
          });
        })
        .catch(console.error);
    }
  }, [updateSetting]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);
  return (
    <Layout>
      <style jsx>{`
        .userDuplicateColor .sp-replacer,
        .warningUserColor .sp-replacer {
          height: 34px;
          width: 50px;
        }
      `}</style>
      <h1 className="page-header">
        <a href="/setting/site">
          <i className="fa fa-cog me-2"></i>사이트 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="panel panel-inverse" data-sortable-id="form-1">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                사이트 점검
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="mb-3">
                <h6>
                  <i className="fa fa-genderless me-2"></i>유저 웹사이트
                </h6>
                <div className="btn-group">
                  <button
                    type="button"
                    id="userSiteStatus-0"
                    className="btn btn-default"
                    onClick={handleToggle}
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    id="userSiteStatus-1"
                    className="btn btn-default btn-green"
                    onClick={handleToggle}
                  >
                    운영중
                  </button>
                </div>
                <div className="mt-2">
                  <textarea
                    id="userSiteInspectionNotice"
                    name="userSiteInspectionNotice"
                    rows={5}
                    className="w-100"
                    placeholder="점검 내용"
                    defaultValue="<p>긴급서버점검중!!!</p><p>안녕하세요.&nbsp;</p><p>서버보안 및 속도 개선을 위한 점검으로 현재 이용이 불가합니다.</p><p>양해 부탁드리며, 최대한 빠른 점검 후 정상적인 이용이 가능하도록 최대한 노력하겠습니다.&nbsp;</p><p>서버 점검 시간 중 문의사항은 24시 실시간 텔레그램으로 연락 바랍니다.&nbsp;</p><p>감사합니다.</p>"
                  />
                </div>
              </div>
              <div className="mb-3">
                <h6>
                  <i className="fa fa-genderless me-2"></i>파트너 웹사이트
                </h6>
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <button
                    type="button"
                    id="partnerSiteStatus-0"
                    className="btn btn-default"
                    onClick={handleToggle}
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    id="partnerSiteStatus-1"
                    className="btn btn-default btn-green"
                    onClick={handleToggle}
                  >
                    운영중
                  </button>
                </div>
                <div className="mt-2">
                  <textarea
                    id="partnerSiteInspectionNotice"
                    name="partnerSiteInspectionNotice"
                    rows={5}
                    className="w-100"
                    placeholder="점검 내용"
                    defaultValue="<p>파트너 사이트 점검중~!</p><p>서버보안 및 속도 개선을 위한 점검으로 현재 이용이 불가합니다.</p><p>&nbsp;</p>"
                  />
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => console.log("Save site inspection notice")}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-7">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                사이트 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">사이트명</label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <input
                      type="text"
                      id="siteName"
                      className="form-control"
                      value={settings.siteName || "샘플1"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  로그인공지 (300자)
                </label>
                <div className="col-md-7">
                  <div className="d-flex">
                    <input
                      type="text"
                      id="loginNotice"
                      className="form-control"
                      value={settings.loginNotice || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  파트너 유저웹 로그인 설정
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerUserWebLoginYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner user web login to 0")
                      }
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerUserWebLoginYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle partner user web login to 1")
                      }
                    >
                      허용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  파트너 유저웹 충/환전 설정
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerUserWebInoutYN-0"
                      className="btn btn-default btn-danger"
                      onClick={() =>
                        console.log("Toggle partner user web inout to 0")
                      }
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerUserWebInoutYN-1"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner user web inout to 1")
                      }
                    >
                      허용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  카지노머니 자동 전환
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="moneyInoutTransferAuto-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle money inout transfer auto to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="moneyInoutTransferAuto-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle money inout transfer auto to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  무효 베팅 수수료
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="invalidBettingCommission-0"
                      className="btn btn-default btn-danger"
                      onClick={() =>
                        console.log("Toggle invalid betting commission to 0")
                      }
                    >
                      미포함
                    </button>
                    <button
                      type="button"
                      id="invalidBettingCommission-1"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle invalid betting commission to 1")
                      }
                    >
                      포함
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  퍼팩트 페어 당첨 회수
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="perfectPairWithdraw-0"
                      className="btn btn-default btn-danger"
                      onClick={() =>
                        console.log("Toggle perfect pair withdraw to 0")
                      }
                    >
                      미사용
                    </button>
                    <button
                      type="button"
                      id="perfectPairWithdraw-1"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle perfect pair withdraw to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  중복정보 ID 색 지정
                </label>
                <div className="col-md-7">
                  <div className="btn-group userDuplicateColor d-inline-flex">
                    <input
                      type="text"
                      name="userDuplicateColor"
                      id="userDuplicateColor"
                      className="color-picker mt-2"
                      value={settings.userDuplicateColor || "#f44336"}
                      onChange={handleChange}
                    />
                    <label className="col-form-label ms-1">
                      ※ 예금주명, 계좌번호, IP
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  주의회원 색 지정
                </label>
                <div className="col-md-7">
                  <div className="btn-group warningUserColor d-inline-flex">
                    <input
                      type="text"
                      name="warningUserColor"
                      id="warningUserColor"
                      className="color-picker mt-2"
                      value={settings.warningUserColor || "#6aa84f"}
                      onChange={handleChange}
                    />
                    <label className="col-form-label ms-1">
                      ※ 중복정보 ID 색 지정보다 우선순위가 높음
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  주의회원2 색 지정
                </label>
                <div className="col-md-7">
                  <div className="btn-group warningUserColor d-inline-flex">
                    <input
                      type="text"
                      name="warningUserColor2"
                      id="warningUserColor2"
                      className="color-picker mt-2"
                      value={settings.warningUserColor2 || "#744700"}
                      onChange={handleChange}
                    />
                    <label className="col-form-label ms-1">
                      ※ 중복정보 ID 색 지정보다 우선순위가 높음
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  파트너등록 권한정보
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="isRegisterParentFollow-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle register parent follow to 0")
                      }
                    >
                      개별설정
                    </button>
                    <button
                      type="button"
                      id="isRegisterParentFollow-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle register parent follow to 1")
                      }
                    >
                      상부동일
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  카카오톡 고객센터 ID
                </label>
                <div className="col-md-7">
                  <div className="d-flex">
                    <input
                      type="text"
                      id="kakaoQnaID"
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  텔레그램 고객센터 ID
                </label>
                <div className="col-md-7">
                  <div className="d-flex">
                    <input
                      type="text"
                      id="telegramQnaID"
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => console.log("Save default settings")}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-8">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-tasks"></i>
                </span>
                롤링 공지 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <div className="col d-inline-flex">
                  <div className="col-form-label w-auto py-1">
                    <input
                      type="text"
                      name="noticeRollingColor"
                      className="color-picker mt-2"
                    />
                  </div>
                  <input
                    type="text"
                    name="noticeRollingContent"
                    className="form-control ms-2"
                    placeholder="500자 까지 등록 가능"
                  />
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success text-white text-nowrap ms-2"
                    onClick={() => console.log("Add new rolling notice")}
                  >
                    <i className="fa-solid fa-plus me-2"></i>추가
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="panel panel-inverse" data-sortable-id="form-9">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                유저 사이트 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  포인트 최소 전환금액
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="pointTransformMin"
                      className="form-control amount"
                      defaultValue="1000"
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  포인트 전환 최소 단위
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="pointTransformMinUnit"
                      id="pointTransformMinUnit"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="10">10 P</option>
                      <option value="100">100 P</option>
                      <option value="1000">1,000 P</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  충환전 최소 단위
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      충전
                    </label>
                    <select
                      name="chargeMinUnit"
                      id="chargeMinUnit"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="100">100원</option>
                      <option value="1000">1,000원</option>
                      <option value="10000">10,000원</option>
                      <option value="100000">100,000원</option>
                    </select>
                    <label className="input-group-text col-form-label">
                      환전
                    </label>
                    <select
                      name="exchangeMinUnit"
                      id="exchangeMinUnit"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="100">100원</option>
                      <option value="1000">1,000원</option>
                      <option value="10000">10,000원</option>
                      <option value="100000">100,000원</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  충전 재신청 대기시간
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="chargeRequestDelayTime"
                      className="form-control amount"
                      defaultValue="0"
                    />
                    <label className="input-group-text col-form-label">
                      분
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  환전 재신청 대기시간
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="exchangeRequestDelayTime"
                      className="form-control amount"
                      defaultValue="0"
                    />
                    <label className="input-group-text col-form-label">
                      분
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">환전 비밀번호</label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle user site exchange password to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle user site exchange password to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  쪽지 강제 읽기
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="messageReadRequiredUse-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle message read required to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="messageReadRequiredUse-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle message read required to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  로그인 보안코드
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="userSiteCaptchaUseYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle user site captcha to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSiteCaptchaUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle user site captcha to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  로그인 실패시 IP 차단
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="loginFailBlockCount"
                      id="loginFailBlockCount"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">사용 안함</option>
                      <option value="3">3회 실패시 차단</option>
                      <option value="5">5회 실패시 차단</option>
                      <option value="5">7회 실패시 차단</option>
                      <option value="10">10회 실패시 차단</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  포인트 전환내역 출력일수
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="pointHistoryDay"
                      id="pointHistoryDay"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">사용 안함</option>
                      <option value="1">1일</option>
                      <option value="2">2일</option>
                      <option value="3">3일</option>
                      <option value="4">4일</option>
                      <option value="5">5일</option>
                      <option value="6">6일</option>
                      <option value="7">7일</option>
                      <option value="8">8일</option>
                      <option value="9">9일</option>
                      <option value="10">10일</option>
                      <option value="15">15일</option>
                      <option value="20">20일</option>
                      <option value="25">25일</option>
                      <option value="30">30일</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  베팅내역 출력일수
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="betHistoryDay"
                      id="betHistoryDay"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">사용 안함</option>
                      <option value="1">1일</option>
                      <option value="2">2일</option>
                      <option value="3">3일</option>
                      <option value="4">4일</option>
                      <option value="5">5일</option>
                      <option value="6">6일</option>
                      <option value="7">7일</option>
                      <option value="8">8일</option>
                      <option value="9">9일</option>
                      <option value="10">10일</option>
                      <option value="15">15일</option>
                      <option value="20">20일</option>
                      <option value="25">25일</option>
                      <option value="30">30일</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  비밀번호 변경 사용여부
                  <span className="text-red">(유저웹)</span>
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="userSitePasswordEditYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle user site password edit to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSitePasswordEditYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle user site password edit to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  스포츠 베팅마감 시간<span className="text-red">(유저웹)</span>
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="number"
                      id="sportBettingDeadlineMinute"
                      className="form-control px-0"
                      min="0"
                      defaultValue=""
                      style={{ textAlign: "right" }}
                    />
                    <label className="input-group-text col-form-label">
                      분
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  스포츠 베팅내역 취소 제한
                  <span className="text-red">(유저웹)</span>
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <label className="col-form-label">1일</label>
                    <input
                      type="number"
                      id="sportBettingCancelNum"
                      className="form-control w-50px ms-1 px-0"
                      min="0"
                      defaultValue="10"
                      style={{ textAlign: "right" }}
                    />
                    <label className="col-form-label ms-1">건,</label>
                  </div>
                  <div className="d-inline-flex">
                    <label className="col-form-label">제한 시간</label>
                    <input
                      type="number"
                      id="sportBettingCancelLimitMinute"
                      className="form-control w-50px ms-1 px-0"
                      min="0"
                      defaultValue="10"
                      style={{ textAlign: "right" }}
                    />
                    <label className="col-form-label ms-1">분,</label>
                  </div>
                  <div className="d-inline-flex mt-1">
                    <label className="col-form-label">베팅마감</label>
                    <input
                      type="number"
                      id="sportBettingDeadLineCancelMinute"
                      className="form-control w-50px ms-1 px-0"
                      min="0"
                      defaultValue="1"
                      style={{ textAlign: "right" }}
                    />
                    <label className="col-form-label ms-1">
                      분 전 취소 가능(※ 0이면 무제한)
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  스포츠 라이브 대기 시간
                  <span className="text-red">(유저웹)</span>
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="number"
                      id="sportLiveWaitHour"
                      className="form-control px-0 w-80px"
                      min="0"
                      max="255"
                      defaultValue="24"
                      style={{ textAlign: "right" }}
                      required
                    />
                    <label className="input-group-text col-form-label">
                      시간 (0~255)
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  중복 로그인 허용여부
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="isUserDuplicateLogin-0"
                      className="btn btn-default btn-danger"
                      onClick={() =>
                        console.log("Toggle user duplicate login to 0")
                      }
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="isUserDuplicateLogin-1"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle user duplicate login to 1")
                      }
                    >
                      허용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  중복 로그인 딜레이
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="number"
                      id="userSiteDuplicateLoginTime"
                      className="form-control px-0 w-80px"
                      min="0"
                      max="255"
                      defaultValue="3"
                      style={{ textAlign: "right" }}
                      required
                    />
                    <label className="input-group-text col-form-label">
                      분 (0~255)
                    </label>
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => console.log("Save user site settings")}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-10">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                파트너 사이트 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  포인트 최소 전환금액
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="partnerPointTransformMin"
                      className="form-control amount"
                      defaultValue="10"
                    />
                    <label className="input-group-text col-form-label ms-1">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  포인트 전환 최소 단위
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="partnerPointTransformMinUnit"
                      id="partnerPointTransformMinUnit"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="10">10 P</option>
                      <option value="100">100 P</option>
                      <option value="1000">1,000 P</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  충환전 최소 단위
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      충전
                    </label>
                    <select
                      name="partnerChargeMinUnit"
                      id="partnerChargeMinUnit"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="100">100원</option>
                      <option value="1000">1,000원</option>
                      <option value="10000">10,000원</option>
                      <option value="100000">100,000원</option>
                    </select>
                    <label className="input-group-text col-form-label">
                      환전
                    </label>
                    <select
                      name="partnerExchangeMinUnit"
                      id="partnerExchangeMinUnit"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="">선택 안함</option>
                      <option value="100">100원</option>
                      <option value="1000">1,000원</option>
                      <option value="10000">10,000원</option>
                      <option value="100000">100,000원</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  충전 재신청 대기시간
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="partnerChargeRequestDelayTime"
                      className="form-control amount"
                      defaultValue="0"
                    />
                    <label className="input-group-text col-form-label ms-1">
                      분
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  환전 재신청 대기시간
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="partnerExchangeRequestDelayTime"
                      className="form-control amount"
                      defaultValue="0"
                    />
                    <label className="input-group-text col-form-label ms-1">
                      분
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">환전 비밀번호</label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log(
                          "Toggle partner site exchange password to 0"
                        )
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log(
                          "Toggle partner site exchange password to 1"
                        )
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  쪽지 강제 읽기
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerMessageReadRequiredUse-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner message read required to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerMessageReadRequiredUse-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle partner message read required to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  로그인 보안코드
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerSiteCaptchaUseYN-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner site captcha to 0")
                      }
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteCaptchaUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle partner site captcha to 1")
                      }
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  로그인 실패시 IP 차단
                </label>
                <div className="col-md-7">
                  <div className="d-inline-flex">
                    <select
                      name="partnerLoginFailBlockCount"
                      id="partnerLoginFailBlockCount"
                      className="form-select w-auto"
                      defaultValue=""
                    >
                      <option value="">사용 안함</option>
                      <option value="3">3회 실패시 차단</option>
                      <option value="5">5회 실패시 차단</option>
                      <option value="5">7회 실패시 차단</option>
                      <option value="10">10회 실패시 차단</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  중복 로그인 허용여부
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="isPartnerDuplicateLogin-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner duplicate login to 0")
                      }
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="isPartnerDuplicateLogin-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle partner duplicate login to 1")
                      }
                    >
                      허용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  중복 로그인 딜레이
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="number"
                      id="partnerSiteDuplicateLoginTime"
                      className="form-control"
                      min="0"
                      max="255"
                      defaultValue="3"
                      style={{ textAlign: "right" }}
                      required
                    />
                    <label className="input-group-text col-form-label">
                      분 (0~255)
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  파트너 환전신청 계좌체크
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerBankCheck-0"
                      className="btn btn-default btn-danger"
                      onClick={() =>
                        console.log("Toggle partner bank check to 0")
                      }
                    >
                      체크 안함
                    </button>
                    <button
                      type="button"
                      id="partnerBankCheck-1"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle partner bank check to 1")
                      }
                    >
                      체크함
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mt-3">
                <div className="col-md-5">
                  <label className="col-form-label">첫 충전 보너스</label>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <select
                      name="partnerEveryChargeBonus"
                      id="partnerEveryChargeBonus"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="1">사용</option>
                      <option value="0">사용 안함</option>
                    </select>
                    <select
                      name="partnerEveryChargeExchange"
                      id="partnerEveryChargeExchange"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="1">금일환전 가능</option>
                      <option value="0">금일환전 불가</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="input-group pt-1">
                        <input
                          type="text"
                          id="partnerEveryChargeBonusCommission"
                          className="form-control commission"
                          defaultValue="1.00"
                          style={{ textAlign: "right" }}
                        />
                        <label className="input-group-text col-form-label px-2">
                          %
                        </label>
                      </div>
                    </div>
                    <div className="col-8 ps-0">
                      <div className="input-group pt-1">
                        <label className="input-group-text col-form-label px-2">
                          최대 보너스
                        </label>
                        <input
                          type="text"
                          id="partnerEveryChargeBonusLimit"
                          className="form-control amount"
                          defaultValue="5000"
                          style={{ textAlign: "right" }}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-red">
                      ※ 최대 보너스 미입력 시 0으로 입력되어 지급되지 않습니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row mt-3">
                <div className="col-md-5">
                  <label className="col-form-label">매 충전 보너스</label>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <select
                      name="partnerEveryChargeBonus"
                      className="form-select"
                    >
                      <option value="1" selected>
                        사용
                      </option>
                      <option value="0">사용 안함</option>
                    </select>
                    <select
                      name="partnerEveryChargeExchange"
                      id="partnerEveryChargeExchange"
                      className="form-select"
                    >
                      <option value="1">금일환전 가능</option>
                      <option value="0" selected>
                        금일환전 불가
                      </option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="input-group pt-1">
                        <input
                          type="text"
                          id="partnerEveryChargeBonusCommission"
                          className="form-control commission"
                          value="1.00"
                          style={{ textAlign: "right" }}
                        />
                        <label className="input-group-text col-form-label px-2">
                          %
                        </label>
                      </div>
                    </div>
                    <div className="col-8 ps-0">
                      <div className="input-group pt-1">
                        <label className="input-group-text col-form-label px-2">
                          최대 보너스
                        </label>
                        <input
                          type="text"
                          id="partnerEveryChargeBonusLimit"
                          className="form-control amount"
                          value="5000"
                          style={{ textAlign: "right" }}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-red">
                      ※ 최대 보너스 미입력 시 0으로 입력되어 지급되지 않습니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => console.log("Save partner site settings")}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-2">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-user-plus"></i>
                </span>
                회원가입 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  회원 가입시 포인트 지급
                </label>
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      type="text"
                      id="registerPoint"
                      className="form-control amount"
                      defaultValue="0"
                    />
                    <label className="input-group-text col-form-label">P</label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  회원 가입 사용 여부
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="registerApproval-0"
                      className="btn btn-default"
                      onClick={() =>
                        console.log("Toggle register approval to 0")
                      }
                    >
                      즉시 가입
                    </button>
                    <button
                      type="button"
                      id="registerApproval-1"
                      className="btn btn-default btn-green"
                      onClick={() =>
                        console.log("Toggle register approval to 1")
                      }
                    >
                      관리자 승인
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  추천인 사용 여부
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="recommendUse-0"
                      className="btn btn-default"
                      onClick={() => console.log("Toggle recommend use to 0")}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="recommendUse-1"
                      className="btn btn-default btn-green"
                      onClick={() => console.log("Toggle recommend use to 1")}
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-12">
                  사용불가 ID / 닉네임
                </label>
                <div className="col-md-12">
                  <input
                    type="text"
                    id="prohibitID"
                    className="form-control w-100"
                    defaultValue="admin,관리자,test"
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-12">
                  회원가입 축하 쪽지 내용
                </label>
                <div className="col-md-12">
                  <textarea
                    id="congratulationMessage"
                    className="form-control w-100"
                    defaultValue="<p>회원님 안녕하세요.&nbsp;<br><br>가입을 진심으로 감사드립니다.</p><p>게시판 공지사항에 이용규정 및 이벤트 내용 필독 부탁드립니다.</p><p>국내 최대 카지노 슬롯 회사로 다양한 게임을 제공하고 있습니다.</p><p>이용시 불편사항이나 문의사항은 고객센터로 문의 부탁드립니다.</p><p>즐거운 시간 보내시기 바랍니다.</p><p>감사합니다.</p>"
                  />
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => console.log("Save registration settings")}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6">
          <div className="panel panel-inverse" data-sortable-id="form-3">
            {/* 충전 설정 */}
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                충전 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">충전 상태</label>
                <div className="col-md-8">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="chargeStatus-0"
                      className={`btn btn-default ${
                        settings.chargeStatus === "0" ? "active" : ""
                      }`}
                      onClick={handleToggle}
                    >
                      점검중
                    </button>
                    <button
                      type="button"
                      id="chargeStatus-1"
                      className={`btn btn-default btn-green ${
                        settings.chargeStatus === "1" ? "active" : ""
                      }`}
                      onClick={handleToggle}
                    >
                      운영중
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="col-form-label">점검내용</label>
                <textarea
                  id="chargeInspectionNotice"
                  name="chargeInspectionNotice"
                  rows={5}
                  className="w-100"
                  placeholder="점검내용"
                >
                  죄송합니다. 잠시 점검 중입니다. 다른 기능은 정상 이용
                  가능합니다.
                </textarea>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  유저웹 충전 신청
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최소
                    </label>
                    <input
                      type="text"
                      id="minChargeAmount"
                      className="form-control amount"
                      value={settings.minChargeAmount || "1000"}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group pt-1">
                    <label className="input-group-text col-form-label">
                      최대
                    </label>
                    <input
                      type="text"
                      id="maxChargeAmount"
                      className="form-control amount"
                      value="99000000"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  파트너웹 충전 신청
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최소
                    </label>
                    <input
                      type="text"
                      id="partnerMinChargeAmount"
                      className="form-control amount"
                      value=""
                    />
                  </div>
                  <div className="input-group pt-1">
                    <label className="input-group-text col-form-label">
                      최대
                    </label>
                    <input
                      type="text"
                      id="partnerMaxChargeAmount"
                      className="form-control amount"
                      value=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  가입 첫충 보너스
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <input
                      type="text"
                      id="registerFirstChargeCommission"
                      className="form-control commission"
                      value="3.00"
                    />
                    <label className="input-group-text col-form-label">%</label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  가입 첫충 보너스 최대 금액
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <input
                      type="text"
                      id="registerFirstChargeBonusLimit"
                      className="form-control amount"
                      value="1000"
                    />
                    <label className="input-group-text col-form-label">P</label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-md-4">
                  첫 충전 보너스
                </label>
                <div className="col-md-8">
                  <div className="row mb-2">
                    <div className="col">
                      <label className="col-form-label me-1">금일 환전</label>
                    </div>
                    <div className="col">
                      <select id="firstChargeBonus" className="form-select">
                        <option value="1" selected>
                          가능
                        </option>
                        <option value="0">불가</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      스포츠
                    </label>
                    <input
                      type="text"
                      id="gameGroup_1_firstChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_1_firstChargeBonusLimit"
                      className="form-control amount"
                      value="1"
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      카지노
                    </label>
                    <input
                      type="text"
                      id="gameGroup_2_firstChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_2_firstChargeBonusLimit"
                      className="form-control amount"
                      value="1"
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      슬롯
                    </label>
                    <input
                      type="text"
                      id="gameGroup_3_firstChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_3_firstChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      미니게임
                    </label>
                    <input
                      type="text"
                      id="gameGroup_4_firstChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_4_firstChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      보드게임
                    </label>
                    <input
                      type="text"
                      id="gameGroup_5_firstChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_5_firstChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mt-3">
                <label className="col-form-label col-md-4">
                  매 충전 보너스
                </label>
                <div className="col-md-8">
                  <div className="row mb-2">
                    <div className="col">
                      <label className="col-form-label me-2">금일 환전</label>
                    </div>
                    <div className="col">
                      <select id="everyChargeBonus" className="form-select">
                        <option value="1" selected={true}>
                          가능
                        </option>
                        <option value="0">불가</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      스포츠
                    </label>
                    <input
                      type="text"
                      id="gameGroup_1_everyChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_1_everyChargeBonusLimit"
                      className="form-control amount"
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      카지노
                    </label>
                    <input
                      type="text"
                      id="gameGroup_2_everyChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_2_everyChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      슬롯
                    </label>
                    <input
                      type="text"
                      id="gameGroup_3_everyChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_3_everyChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      미니게임
                    </label>
                    <input
                      type="text"
                      id="gameGroup_4_everyChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_4_everyChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-md-5">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      보드게임
                    </label>
                    <input
                      type="text"
                      id="gameGroup_5_everyChargeCommission"
                      className="form-control commission"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      %
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <label className="input-group-text col-form-label px-2">
                      최대 보너스 금액
                    </label>
                    <input
                      type="text"
                      id="gameGroup_5_everyChargeBonusLimit"
                      className="form-control amount"
                      value=""
                    />
                    <label className="input-group-text col-form-label px-2">
                      P
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group row mt-4">
                <label className="col-form-label col-md-4">
                  통합 충전 보너스
                </label>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col">
                      <label className="col-form-label me-2">사용여부</label>
                    </div>
                    <div className="col">
                      <select
                        id="siteIntegrateChargeBonusUseYN"
                        className="form-select"
                      >
                        <option value="1">사용</option>
                        <option value="" selected={false}>
                          사용 안함
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row mt-1">
                <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                  <tbody>
                    <tr>
                      <td rowSpan={2} className="bg-gray-300">
                        통합충전1
                      </td>
                      <td className="py-1">
                        <input
                          type="text"
                          id="siteIntegrateChargeBonusText_1"
                          maxLength={100}
                          className="form-control"
                          placeholder="텍스트 문구 지정"
                          value=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <div className="d-flex">
                          <input
                            type="text"
                            id="siteIntegrateChargeBonus_1"
                            className="form-control commission w-60px me-1"
                            value=""
                          />
                          <label className="col-form-label w-auto me-3">
                            %
                          </label>
                          <label className="col-form-label w-auto me-1">
                            최대
                          </label>
                          <input
                            type="text"
                            id="siteIntegrateChargeBonusMax_1"
                            className="form-control amount w-80px"
                            value=""
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2} className="bg-gray-300">
                        통합충전2
                      </td>
                      <td className="py-1">
                        <input
                          type="text"
                          id="siteIntegrateChargeBonusText_2"
                          maxLength={100}
                          className="form-control"
                          placeholder="텍스트 문구 지정"
                          value=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <div className="d-flex">
                          <input
                            type="text"
                            id="siteIntegrateChargeBonus_2"
                            className="form-control commission w-60px me-1"
                            value=""
                          />
                          <label className="col-form-label w-auto me-3">
                            %
                          </label>
                          <label className="col-form-label w-auto me-1">
                            최대
                          </label>
                          <input
                            type="text"
                            id="siteIntegrateChargeBonusMax_2"
                            className="form-control amount w-80px"
                            value=""
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2} className="bg-gray-300">
                        통합충전3
                      </td>
                      <td className="py-1">
                        <input
                          type="text"
                          id="siteIntegrateChargeBonusText_3"
                          maxLength={100}
                          className="form-control"
                          placeholder="텍스트 문구 지정"
                          value=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <div className="d-flex">
                          <input
                            type="text"
                            id="siteIntegrateChargeBonus_3"
                            className="form-control commission w-60px me-1"
                            value=""
                          />
                          <label className="col-form-label w-auto me-3">
                            %
                          </label>
                          <label className="col-form-label w-auto me-1">
                            최대
                          </label>
                          <input
                            type="text"
                            id="siteIntegrateChargeBonusMax_3"
                            className="form-control amount w-80px"
                            value=""
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2} className="bg-gray-300">
                        통합충전4
                      </td>
                      <td className="py-1">
                        <input
                          type="text"
                          id="siteIntegrateChargeBonusText_4"
                          maxLength={100}
                          className="form-control"
                          placeholder="텍스트 문구 지정"
                          value=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <div className="d-flex">
                          <input
                            type="text"
                            id="siteIntegrateChargeBonus_4"
                            className="form-control commission w-60px me-1"
                            value=""
                          />
                          <label className="col-form-label w-auto me-3">
                            %
                          </label>
                          <label className="col-form-label w-auto me-1">
                            최대
                          </label>
                          <input
                            type="text"
                            id="siteIntegrateChargeBonusMax_4"
                            className="form-control amount w-80px"
                            value=""
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-4">
            {/* 충전 안내 문구 설정  */}
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                충전 안내 문구 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body p-0 pb-3">
              <textarea
                className="ckeditor"
                id="chargeNotice"
                name="chargeNotice"
                rows={20}
              >
                &lt;p&gt;- 입금자명과 통장 예금주가 일치하지 않을 경우 처리가
                불가능 합니다.&lt;/p&gt;&lt;p&gt;- 계좌번호 및 예금자명 등을
                변경하셔야 할 경우 고객센터로 문의 바랍니다.&lt;/p&gt;&lt;p&gt;-
                은행 점검시간(23:30~00:30)에는 신청을 피해 주시기
                바랍니다.&lt;/p&gt;&lt;p&gt;- 1회 최대 입금 금액은 500만원
                이하로 부탁드립니다.&lt;/p&gt;&lt;p&gt;- 동일계좌로 재 입금 요청
                시 5~10분의 간격을 두어야 합니다.&lt;/p&gt;
              </textarea>
              <div className="row text-center mt-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end panel */}
          <div className="panel panel-inverse" data-sortable-id="form-4">
            {/* 페이백 안내 문구 설정 */}
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                페이백 안내 문구 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body p-0 pb-3">
              <textarea
                ref={paybackNoticeRef}
                id="paybackNotice"
                name="paybackNotice"
                rows={20}
              >
                &lt;p&gt;&lt;span className=&quot;text-big&quot;&gt;-
                테스트&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;span
                className=&quot;text-big&quot;&gt;- 준거 또 주고 또 주고 또 준다
                !!&lt;/span&gt;&lt;/p&gt;
              </textarea>
              <div className="row text-center mt-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 ">
          <div className="panel panel-inverse" data-sortable-id="form-5">
            {/* 환전 설정  */}
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                환전 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">환전 상태</label>
                <div className="col-md-8">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="exchangeStatus-0"
                      className="btn btn-default"
                      onClick={handleToggle}
                    >
                      점검중
                    </button>
                    <button
                      type="button"
                      id="exchangeStatus-1"
                      className="btn btn-default btn-green"
                      onClick={handleToggle}
                    >
                      운영중
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="col-form-label">점검내용</label>
                <textarea
                  id="exchangeInspectionNotice"
                  name="exchangeInspectionNotice"
                  rows={5}
                  className="w-100"
                >
                  죄송합니다. 잠시 점검 중입니다. 다른 기능은 정상 이용
                  가능합니다.
                </textarea>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  환전 점검 시간
                </label>
                <div className="col-md-8">
                  <div className="row mb-2">
                    <div className="col p-0">
                      <input
                        type="time"
                        id="exchangeDenyStartTime"
                        className="form-control"
                        value="23:59"
                      />
                    </div>
                    <div className="col p-1 flex-grow-0">~</div>
                    <div className="col p-0">
                      <input
                        type="time"
                        id="exchangeDenyEndTime"
                        className="form-control"
                        value="00:01"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  유저웹 환전 신청
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최소
                    </label>
                    <input
                      type="text"
                      id="minExchangeAmount"
                      className="form-control amount"
                      value="1000"
                      style={{ textAlign: "right" }}
                    />
                  </div>
                  <div className="input-group pt-1">
                    <label className="input-group-text col-form-label">
                      최대
                    </label>
                    <input
                      type="text"
                      id="maxExchangeAmount"
                      className="form-control amount"
                      value="30000000"
                      style={{ textAlign: "right" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  파트너웹 환전 신청
                </label>
                <div className="col-md-8">
                  <div className="input-group">
                    <label className="input-group-text col-form-label">
                      최소
                    </label>
                    <input
                      type="text"
                      id="partnerMinExchangeAmount"
                      className="form-control amount"
                      value=""
                      style={{ textAlign: "right" }}
                    />
                  </div>
                  <div className="input-group pt-1">
                    <label className="input-group-text col-form-label">
                      최대
                    </label>
                    <input
                      type="text"
                      id="partnerMaxExchangeAmount"
                      className="form-control amount"
                      value=""
                      style={{ textAlign: "right" }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  유저 웹 환전 비밀번호
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN-0"
                      className="btn btn-default"
                      onClick={handleToggle}
                    >
                      사용안함
                    </button>
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={handleToggle}
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-4">
                  파트너 웹 환전 비밀번호
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN-0"
                      className="btn btn-default"
                      onClick={handleToggle}
                    >
                      사용안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN-1"
                      className="btn btn-default btn-green"
                      onClick={handleToggle}
                    >
                      사용
                    </button>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-6">
            {/* 환전 안내 문구 설정 */}
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                환전 안내 문구 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body p-0 pb-3">
              <textarea id="exchangeNotice" name="exchangeNotice" rows={20}>
                &lt;p&gt;- 환전 신청 후 계좌 입금까지 3-5분 소요되며, 보유머니는
                환전 신청 즉시 차감됩니다.&lt;/p&gt;&lt;p&gt;- 10분 이상 입금이
                지연되는 경우 및 계좌번호, 예금주의 변경 등은 고객센터에 문의해
                주세요.&lt;/p&gt;&lt;p&gt;- 은행 점검시간(23:30~00:30)에는
                신청을 피해 주시기 바랍니다.&lt;/p&gt;&lt;p&gt;- 30분 단위로만
                재 신청 가능합니다.&lt;/p&gt;
              </textarea>
              <div className="row text-center mt-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    // onClick={{ handleSave }}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse" data-sortable-id="form-6">
            {/* 쿠폰 기본 문구 설정 */}
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-won-sign"></i>
                </span>
                쿠폰 기본 문구 설정
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
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body p-0 pb-3">
              <textarea id="couponMemo" name="couponMemo" rows={20}>
                &lt;p&gt;닉네임님,&lt;/p&gt;&lt;p&gt;‘쿠폰제목’ 쿠폰이
                발급되었습니다.&lt;/p&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;span
                style="color:hsl(226,100%,49%);"&gt;쿠폰함&lt;/span&gt;에서
                확인해주세요.&lt;/p&gt;
              </textarea>
              <div className="row text-center mt-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    // onClick="fnCouponMemo();"
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
