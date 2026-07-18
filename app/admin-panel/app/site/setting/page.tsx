"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

// ─── Sensible defaults for every toggle/select so buttons always show an active state ───
const DEFAULT_SETTINGS: Record<string, string> = {
  // Site status
  userSiteStatus: "1",
  partnerSiteStatus: "1",
  // Site settings
  partnerUserWebLoginYN: "1",
  partnerUserWebInoutYN: "1",
  moneyInoutTransferAuto: "0",
  invalidBettingCommission: "0",
  perfectPairWithdraw: "0",
  isRegisterParentFollow: "0",
  // User site settings
  userSiteExchangePasswordUseYN: "0",
  messageReadRequiredUse: "0",
  userSiteCaptchaUseYN: "0",
  userSitePasswordEditYN: "1",
  isUserDuplicateLogin: "0",
  // Partner site settings
  partnerSiteExchangePasswordUseYN: "0",
  partnerMessageReadRequiredUse: "0",
  partnerSiteCaptchaUseYN: "0",
  isPartnerDuplicateLogin: "0",
  partnerBankCheck: "0",
  // Registration
  registerApproval: "0",
  recommendUse: "0",
  // Charge / exchange
  chargeStatus: "1",
  exchangeStatus: "1",
  // Bonus selects
  firstChargeBonus: "1",
  everyChargeBonus: "1",
  siteIntegrateChargeBonusUseYN: "",
  partnerFirstChargeBonus: "1",
  partnerFirstChargeExchange: "1",
  partnerEveryChargeBonus: "1",
  partnerEveryChargeExchange: "0",
};

export default function SettingPage() {
  // Refs for the textareas to be converted into CKEditor
  const chargeNoticeRef = useRef<HTMLTextAreaElement>(null);
  const paybackNoticeRef = useRef<HTMLTextAreaElement>(null);
  const exchangeNoticeRef = useRef<HTMLTextAreaElement>(null);
  const couponMemoRef = useRef<HTMLTextAreaElement>(null);

  // Initialise with defaults so every toggle shows an active state immediately
  const [settings, setSettings] =
    useState<Record<string, string>>(DEFAULT_SETTINGS);

  // The backend exposes: GET /api/admin/settings  and  PUT /api/admin/settings/:key
  // The proxy at /api/[...path] forwards /api/* → backend /api/*
  const API_BASE = "/api/admin";

  const updateSetting = useCallback(
    async (key: string, value: string) => {
      try {
        const res = await fetch(`${API_BASE}/settings/${key}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Update failed");
      } catch (error) {
        console.error(`Failed to update ${key}:`, error);
      }
    },
    [API_BASE],
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const id = e.target.id || e.target.name;
      const value = e.target.value;
      setSettings((prev) => ({ ...prev, [id]: value }));
      updateSetting(id, value);
    },
    [updateSetting],
  );

  /**
   * Toggle button IDs use underscore as delimiter: `settingKey_value`
   * e.g. id="chargeStatus_1"  →  key="chargeStatus", value="1"
   * Falls back to last-hyphen-segment split for any legacy IDs.
   */
  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rawId = e.currentTarget.id;
      let key: string;
      let value: string;
      const lastUnderscore = rawId.lastIndexOf("_");
      if (lastUnderscore !== -1) {
        key = rawId.slice(0, lastUnderscore);
        value = rawId.slice(lastUnderscore + 1);
      } else {
        const parts = rawId.split("-");
        value = parts[parts.length - 1];
        key = parts.slice(0, -1).join("-");
      }
      setSettings((prev) => ({ ...prev, [key]: value }));
      updateSetting(key, value);
    },
    [updateSetting],
  );

  const handleSave = useCallback(() => {
    alert("설정 저장되었습니다.");
  }, []);

  const initCKEditors = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window === "undefined" || !(window as any).ClassicEditor) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadPlugin = (window as any).CkUploadAdapterPlugin;
    if (!uploadPlugin) {
      console.error("CkUploadAdapterPlugin is not defined");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commonConfig = {
      extraPlugins: [uploadPlugin],
    };

    if (chargeNoticeRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ClassicEditor.create(
        chargeNoticeRef.current,
        commonConfig,
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ClassicEditor.create(
        paybackNoticeRef.current,
        commonConfig,
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ClassicEditor.create(
        exchangeNoticeRef.current,
        commonConfig,
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ClassicEditor.create(couponMemoRef.current, commonConfig)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const loaded = data.data || {};
        // Merge over defaults – keys missing from the backend keep their sensible default
        setSettings({ ...DEFAULT_SETTINGS, ...loaded });
        if (chargeNoticeRef.current)
          chargeNoticeRef.current.value = loaded?.chargeNotice || "";
        if (paybackNoticeRef.current)
          paybackNoticeRef.current.value = loaded?.paybackNotice || "";
        if (exchangeNoticeRef.current)
          exchangeNoticeRef.current.value = loaded?.exchangeNotice || "";
        if (couponMemoRef.current)
          couponMemoRef.current.value = loaded?.couponMemo || "";
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof window !== "undefined" && (window as any).ClassicEditor) {
            initCKEditors();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Load settings failed:", error);
    }
  }, [API_BASE, initCKEditors]);

  useEffect(() => {
    setTimeout(() => {
      loadSettings();
    }, 0);
  }, [loadSettings]);

  /** Helper: active class for toggle buttons */
  const activeClass = (
    key: string,
    val: string,
    colorClass: string = "btn-green",
  ) =>
    String(settings[key] ?? "") === String(val)
      ? ` ${colorClass} active`
      : " btn-default";

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/setting/site">
          <i className="fa fa-cog me-2"></i>사이트 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        {/* ─────────────── Column 1 ─────────────── */}
        <div className="col-xl-3 col-lg-6 col-md-6">
          {/* 사이트 점검 */}
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
                    id="userSiteStatus_0"
                    className={`btn${activeClass("userSiteStatus", "0", "btn-danger")}`}
                    onClick={handleToggle}
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    id="userSiteStatus_1"
                    className={`btn${activeClass("userSiteStatus", "1", "btn-green")}`}
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
                    value={
                      settings.userSiteInspectionNotice ||
                      "<p>긴급서버점검중!!!</p>"
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <h6>
                  <i className="fa fa-genderless me-2"></i>파트너 웹사이트
                </h6>
                <div className="btn-group">
                  <button
                    type="button"
                    id="partnerSiteStatus_0"
                    className={`btn${activeClass("partnerSiteStatus", "0", "btn-danger")}`}
                    onClick={handleToggle}
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    id="partnerSiteStatus_1"
                    className={`btn${activeClass("partnerSiteStatus", "1", "btn-green")}`}
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
                    value={
                      settings.partnerSiteInspectionNotice ||
                      "<p>파트너 사이트 점검중~!</p>"
                    }
                    onChange={handleChange}
                  />
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

          {/* 사이트 설정 */}
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
                      value={settings.siteName || ""}
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
                      id="partnerUserWebLoginYN_0"
                      className={`btn${activeClass("partnerUserWebLoginYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerUserWebLoginYN_1"
                      className={`btn${activeClass("partnerUserWebLoginYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="partnerUserWebInoutYN_0"
                      className={`btn${activeClass("partnerUserWebInoutYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerUserWebInoutYN_1"
                      className={`btn${activeClass("partnerUserWebInoutYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="moneyInoutTransferAuto_0"
                      className={`btn${activeClass("moneyInoutTransferAuto", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="moneyInoutTransferAuto_1"
                      className={`btn${activeClass("moneyInoutTransferAuto", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="invalidBettingCommission_0"
                      className={`btn${activeClass("invalidBettingCommission", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      미포함
                    </button>
                    <button
                      type="button"
                      id="invalidBettingCommission_1"
                      className={`btn${activeClass("invalidBettingCommission", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="perfectPairWithdraw_0"
                      className={`btn${activeClass("perfectPairWithdraw", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      미사용
                    </button>
                    <button
                      type="button"
                      id="perfectPairWithdraw_1"
                      className={`btn${activeClass("perfectPairWithdraw", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                  <div className="d-inline-flex">
                    <input
                      type="color"
                      name="userDuplicateColor"
                      id="userDuplicateColor"
                      className="form-control form-control-color mt-2"
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
                  <div className="d-inline-flex">
                    <input
                      type="color"
                      name="warningUserColor"
                      id="warningUserColor"
                      className="form-control form-control-color mt-2"
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
                  <div className="d-inline-flex">
                    <input
                      type="color"
                      name="warningUserColor2"
                      id="warningUserColor2"
                      className="form-control form-control-color mt-2"
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
                      id="isRegisterParentFollow_0"
                      className={`btn${activeClass("isRegisterParentFollow", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      개별설정
                    </button>
                    <button
                      type="button"
                      id="isRegisterParentFollow_1"
                      className={`btn${activeClass("isRegisterParentFollow", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      value={settings.kakaoQnaID || ""}
                      onChange={handleChange}
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
                      value={settings.telegramQnaID || ""}
                      onChange={handleChange}
                    />
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

          {/* 롤링 공지 설정 */}
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
                      type="color"
                      id="noticeRollingColor"
                      name="noticeRollingColor"
                      className="form-control form-control-color mt-2"
                      value={settings.noticeRollingColor || "#000000"}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    id="noticeRollingContent"
                    name="noticeRollingContent"
                    className="form-control ms-2"
                    placeholder="500자 까지 등록 가능"
                    value={settings.noticeRollingContent || ""}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-success text-white text-nowrap ms-2"
                    onClick={handleSave}
                  >
                    <i className="fa-solid fa-plus me-2"></i>추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────── Column 2 ─────────────── */}
        <div className="col-xl-3 col-lg-6 col-md-6">
          {/* 유저 사이트 설정 */}
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
                      className="form-control"
                      value={settings.pointTransformMin || "1000"}
                      onChange={handleChange}
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
                      id="pointTransformMinUnit"
                      name="pointTransformMinUnit"
                      className="form-select w-auto"
                      value={settings.pointTransformMinUnit || ""}
                      onChange={handleChange}
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
                      id="chargeMinUnit"
                      name="chargeMinUnit"
                      className="form-select"
                      value={settings.chargeMinUnit || ""}
                      onChange={handleChange}
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
                      id="exchangeMinUnit"
                      name="exchangeMinUnit"
                      className="form-select"
                      value={settings.exchangeMinUnit || ""}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.chargeRequestDelayTime || "0"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.exchangeRequestDelayTime || "0"}
                      onChange={handleChange}
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
                      id="userSiteExchangePasswordUseYN_0"
                      className={`btn${activeClass("userSiteExchangePasswordUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN_1"
                      className={`btn${activeClass("userSiteExchangePasswordUseYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="messageReadRequiredUse_0"
                      className={`btn${activeClass("messageReadRequiredUse", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="messageReadRequiredUse_1"
                      className={`btn${activeClass("messageReadRequiredUse", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="userSiteCaptchaUseYN_0"
                      className={`btn${activeClass("userSiteCaptchaUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSiteCaptchaUseYN_1"
                      className={`btn${activeClass("userSiteCaptchaUseYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="loginFailBlockCount"
                      name="loginFailBlockCount"
                      className="form-select w-auto"
                      value={settings.loginFailBlockCount || ""}
                      onChange={handleChange}
                    >
                      <option value="">사용 안함</option>
                      <option value="3">3회 실패시 차단</option>
                      <option value="5">5회 실패시 차단</option>
                      <option value="7">7회 실패시 차단</option>
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
                      id="pointHistoryDay"
                      name="pointHistoryDay"
                      className="form-select w-auto"
                      value={settings.pointHistoryDay || ""}
                      onChange={handleChange}
                    >
                      <option value="">사용 안함</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map(
                        (d) => (
                          <option key={d} value={String(d)}>
                            {d}일
                          </option>
                        ),
                      )}
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
                      id="betHistoryDay"
                      name="betHistoryDay"
                      className="form-select w-auto"
                      value={settings.betHistoryDay || ""}
                      onChange={handleChange}
                    >
                      <option value="">사용 안함</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map(
                        (d) => (
                          <option key={d} value={String(d)}>
                            {d}일
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row mb-3">
                <label className="col-form-label col-md-5">
                  비밀번호 변경 사용여부{" "}
                  <span className="text-red">(유저웹)</span>
                </label>
                <div className="col-md-7">
                  <div className="btn-group">
                    <button
                      type="button"
                      id="userSitePasswordEditYN_0"
                      className={`btn${activeClass("userSitePasswordEditYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="userSitePasswordEditYN_1"
                      className={`btn${activeClass("userSitePasswordEditYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      value={settings.sportBettingDeadlineMinute || ""}
                      onChange={handleChange}
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
                  스포츠 베팅내역 취소 제한{" "}
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
                      value={settings.sportBettingCancelNum || "10"}
                      onChange={handleChange}
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
                      value={settings.sportBettingCancelLimitMinute || "10"}
                      onChange={handleChange}
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
                      value={settings.sportBettingDeadLineCancelMinute || "1"}
                      onChange={handleChange}
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
                  스포츠 라이브 대기 시간{" "}
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
                      value={settings.sportLiveWaitHour || "24"}
                      onChange={handleChange}
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
                      id="isUserDuplicateLogin_0"
                      className={`btn${activeClass("isUserDuplicateLogin", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="isUserDuplicateLogin_1"
                      className={`btn${activeClass("isUserDuplicateLogin", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      value={settings.userSiteDuplicateLoginTime || "3"}
                      onChange={handleChange}
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
                    onClick={handleSave}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 파트너 사이트 설정 */}
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
                      className="form-control"
                      value={settings.partnerPointTransformMin || "10"}
                      onChange={handleChange}
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
                      id="partnerPointTransformMinUnit"
                      name="partnerPointTransformMinUnit"
                      className="form-select w-auto"
                      value={settings.partnerPointTransformMinUnit || ""}
                      onChange={handleChange}
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
                      id="partnerChargeMinUnit"
                      name="partnerChargeMinUnit"
                      className="form-select"
                      value={settings.partnerChargeMinUnit || ""}
                      onChange={handleChange}
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
                      id="partnerExchangeMinUnit"
                      name="partnerExchangeMinUnit"
                      className="form-select"
                      value={settings.partnerExchangeMinUnit || ""}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.partnerChargeRequestDelayTime || "0"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.partnerExchangeRequestDelayTime || "0"}
                      onChange={handleChange}
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
                      id="partnerSiteExchangePasswordUseYN_0"
                      className={`btn${activeClass("partnerSiteExchangePasswordUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN_1"
                      className={`btn${activeClass("partnerSiteExchangePasswordUseYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="partnerMessageReadRequiredUse_0"
                      className={`btn${activeClass("partnerMessageReadRequiredUse", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerMessageReadRequiredUse_1"
                      className={`btn${activeClass("partnerMessageReadRequiredUse", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="partnerSiteCaptchaUseYN_0"
                      className={`btn${activeClass("partnerSiteCaptchaUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteCaptchaUseYN_1"
                      className={`btn${activeClass("partnerSiteCaptchaUseYN", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="partnerLoginFailBlockCount"
                      name="partnerLoginFailBlockCount"
                      className="form-select w-auto"
                      value={settings.partnerLoginFailBlockCount || ""}
                      onChange={handleChange}
                    >
                      <option value="">사용 안함</option>
                      <option value="3">3회 실패시 차단</option>
                      <option value="5">5회 실패시 차단</option>
                      <option value="7">7회 실패시 차단</option>
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
                      id="isPartnerDuplicateLogin_0"
                      className={`btn${activeClass("isPartnerDuplicateLogin", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      허용 안함
                    </button>
                    <button
                      type="button"
                      id="isPartnerDuplicateLogin_1"
                      className={`btn${activeClass("isPartnerDuplicateLogin", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      value={settings.partnerSiteDuplicateLoginTime || "3"}
                      onChange={handleChange}
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
                      id="partnerBankCheck_0"
                      className={`btn${activeClass("partnerBankCheck", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      체크 안함
                    </button>
                    <button
                      type="button"
                      id="partnerBankCheck_1"
                      className={`btn${activeClass("partnerBankCheck", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="partnerFirstChargeBonus"
                      name="partnerFirstChargeBonus"
                      className="form-select"
                      value={settings.partnerFirstChargeBonus || "1"}
                      onChange={handleChange}
                    >
                      <option value="1">사용</option>
                      <option value="0">사용 안함</option>
                    </select>
                    <select
                      id="partnerFirstChargeExchange"
                      name="partnerFirstChargeExchange"
                      className="form-select"
                      value={settings.partnerFirstChargeExchange || "1"}
                      onChange={handleChange}
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
                          id="partnerFirstChargeBonusCommission"
                          className="form-control"
                          value={
                            settings.partnerFirstChargeBonusCommission || "1.00"
                          }
                          onChange={handleChange}
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
                          id="partnerFirstChargeBonusLimit"
                          className="form-control"
                          value={
                            settings.partnerFirstChargeBonusLimit || "5000"
                          }
                          onChange={handleChange}
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
                      id="partnerEveryChargeBonus"
                      name="partnerEveryChargeBonus"
                      className="form-select"
                      value={settings.partnerEveryChargeBonus || "1"}
                      onChange={handleChange}
                    >
                      <option value="1">사용</option>
                      <option value="0">사용 안함</option>
                    </select>
                    <select
                      id="partnerEveryChargeExchange"
                      name="partnerEveryChargeExchange"
                      className="form-select"
                      value={settings.partnerEveryChargeExchange || "0"}
                      onChange={handleChange}
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
                          className="form-control"
                          value={
                            settings.partnerEveryChargeBonusCommission || "1.00"
                          }
                          onChange={handleChange}
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
                          className="form-control"
                          value={
                            settings.partnerEveryChargeBonusLimit || "5000"
                          }
                          onChange={handleChange}
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

          {/* 회원가입 설정 */}
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
                      className="form-control"
                      value={settings.registerPoint || "0"}
                      onChange={handleChange}
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
                      id="registerApproval_0"
                      className={`btn${activeClass("registerApproval", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      즉시 가입
                    </button>
                    <button
                      type="button"
                      id="registerApproval_1"
                      className={`btn${activeClass("registerApproval", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                      id="recommendUse_0"
                      className={`btn${activeClass("recommendUse", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용 안함
                    </button>
                    <button
                      type="button"
                      id="recommendUse_1"
                      className={`btn${activeClass("recommendUse", "1", "btn-green")}`}
                      onClick={handleToggle}
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
                    value={settings.prohibitID || "admin,관리자,test"}
                    onChange={handleChange}
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
                    rows={5}
                    value={settings.congratulationMessage || ""}
                    onChange={handleChange}
                  />
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
        </div>

        {/* ─────────────── Column 3 ─────────────── */}
        <div className="col-xl-3 col-lg-3 col-md-6">
          {/* 충전 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-3">
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
                      id="chargeStatus_0"
                      className={`btn${activeClass("chargeStatus", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      점검중
                    </button>
                    <button
                      type="button"
                      id="chargeStatus_1"
                      className={`btn${activeClass("chargeStatus", "1", "btn-green")}`}
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
                  value={
                    settings.chargeInspectionNotice ||
                    "죄송합니다. 잠시 점검 중입니다."
                  }
                  onChange={handleChange}
                />
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
                      className="form-control"
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
                      className="form-control"
                      value={settings.maxChargeAmount || "99000000"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.partnerMinChargeAmount || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group pt-1">
                    <label className="input-group-text col-form-label">
                      최대
                    </label>
                    <input
                      type="text"
                      id="partnerMaxChargeAmount"
                      className="form-control"
                      value={settings.partnerMaxChargeAmount || ""}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.registerFirstChargeCommission || "3.00"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.registerFirstChargeBonusLimit || "1000"}
                      onChange={handleChange}
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
                      <select
                        id="firstChargeBonus"
                        name="firstChargeBonus"
                        className="form-select"
                        value={settings.firstChargeBonus || "1"}
                        onChange={handleChange}
                      >
                        <option value="1">가능</option>
                        <option value="0">불가</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {[
                { key: "1", label: "스포츠" },
                { key: "2", label: "카지노" },
                { key: "3", label: "슬롯" },
                { key: "4", label: "미니게임" },
                { key: "5", label: "보드게임" },
              ].map(({ key, label }) => (
                <div className="form-group row mb-1" key={key}>
                  <div className="col-md-5">
                    <div className="input-group">
                      <label className="input-group-text col-form-label px-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        id={`gameGroup_${key}_firstChargeCommission`}
                        className="form-control"
                        value={
                          settings[`gameGroup_${key}_firstChargeCommission`] ||
                          ""
                        }
                        onChange={handleChange}
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
                        id={`gameGroup_${key}_firstChargeBonusLimit`}
                        className="form-control"
                        value={
                          settings[`gameGroup_${key}_firstChargeBonusLimit`] ||
                          ""
                        }
                        onChange={handleChange}
                      />
                      <label className="input-group-text col-form-label px-2">
                        P
                      </label>
                    </div>
                  </div>
                </div>
              ))}

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
                      <select
                        id="everyChargeBonus"
                        name="everyChargeBonus"
                        className="form-select"
                        value={settings.everyChargeBonus || "1"}
                        onChange={handleChange}
                      >
                        <option value="1">가능</option>
                        <option value="0">불가</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {[
                { key: "1", label: "스포츠" },
                { key: "2", label: "카지노" },
                { key: "3", label: "슬롯" },
                { key: "4", label: "미니게임" },
                { key: "5", label: "보드게임" },
              ].map(({ key, label }) => (
                <div className="form-group row mb-1" key={key}>
                  <div className="col-md-5">
                    <div className="input-group">
                      <label className="input-group-text col-form-label px-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        id={`gameGroup_${key}_everyChargeCommission`}
                        className="form-control"
                        value={
                          settings[`gameGroup_${key}_everyChargeCommission`] ||
                          ""
                        }
                        onChange={handleChange}
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
                        id={`gameGroup_${key}_everyChargeBonusLimit`}
                        className="form-control"
                        value={
                          settings[`gameGroup_${key}_everyChargeBonusLimit`] ||
                          ""
                        }
                        onChange={handleChange}
                      />
                      <label className="input-group-text col-form-label px-2">
                        P
                      </label>
                    </div>
                  </div>
                </div>
              ))}

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
                        name="siteIntegrateChargeBonusUseYN"
                        className="form-select"
                        value={settings.siteIntegrateChargeBonusUseYN || ""}
                        onChange={handleChange}
                      >
                        <option value="1">사용</option>
                        <option value="">사용 안함</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row mt-1">
                <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                  <tbody>
                    {[1, 2, 3, 4].map((n) => (
                      <>
                        <tr key={`text-${n}`}>
                          <td rowSpan={2} className="bg-gray-300">
                            통합충전{n}
                          </td>
                          <td className="py-1">
                            <input
                              type="text"
                              id={`siteIntegrateChargeBonusText_${n}`}
                              maxLength={100}
                              className="form-control"
                              placeholder="텍스트 문구 지정"
                              value={
                                settings[`siteIntegrateChargeBonusText_${n}`] ||
                                ""
                              }
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        <tr key={`val-${n}`}>
                          <td className="py-1">
                            <div className="d-flex">
                              <input
                                type="text"
                                id={`siteIntegrateChargeBonus_${n}`}
                                className="form-control w-60px me-1"
                                value={
                                  settings[`siteIntegrateChargeBonus_${n}`] ||
                                  ""
                                }
                                onChange={handleChange}
                              />
                              <label className="col-form-label w-auto me-3">
                                %
                              </label>
                              <label className="col-form-label w-auto me-1">
                                최대
                              </label>
                              <input
                                type="text"
                                id={`siteIntegrateChargeBonusMax_${n}`}
                                className="form-control w-80px"
                                value={
                                  settings[
                                    `siteIntegrateChargeBonusMax_${n}`
                                  ] || ""
                                }
                                onChange={handleChange}
                              />
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
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

          {/* 충전 안내 문구 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-4a">
            <div className="panel-heading">
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
                ref={chargeNoticeRef}
                className="ckeditor"
                id="chargeNotice"
                name="chargeNotice"
                rows={20}
              />
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

          {/* 페이백 안내 문구 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-4b">
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
              />
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

        {/* ─────────────── Column 4 ─────────────── */}
        <div className="col-xl-3 col-lg-3 col-md-6">
          {/* 환전 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-5">
            <div className="panel-heading">
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
                      id="exchangeStatus_0"
                      className={`btn${activeClass("exchangeStatus", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      점검중
                    </button>
                    <button
                      type="button"
                      id="exchangeStatus_1"
                      className={`btn${activeClass("exchangeStatus", "1", "btn-green")}`}
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
                  value={
                    settings.exchangeInspectionNotice ||
                    "죄송합니다. 잠시 점검 중입니다."
                  }
                  onChange={handleChange}
                />
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
                        value={settings.exchangeDenyStartTime || "23:59"}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col p-1 flex-grow-0">~</div>
                    <div className="col p-0">
                      <input
                        type="time"
                        id="exchangeDenyEndTime"
                        className="form-control"
                        value={settings.exchangeDenyEndTime || "00:01"}
                        onChange={handleChange}
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
                      className="form-control"
                      value={settings.minExchangeAmount || "1000"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.maxExchangeAmount || "30000000"}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.partnerMinExchangeAmount || ""}
                      onChange={handleChange}
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
                      className="form-control"
                      value={settings.partnerMaxExchangeAmount || ""}
                      onChange={handleChange}
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
                      id="userSiteExchangePasswordUseYN_0"
                      className={`btn${activeClass("userSiteExchangePasswordUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용안함
                    </button>
                    <button
                      type="button"
                      id="userSiteExchangePasswordUseYN_1"
                      className={`btn${activeClass("userSiteExchangePasswordUseYN", "1", "btn-green")}`}
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
                      id="partnerSiteExchangePasswordUseYN_0"
                      className={`btn${activeClass("partnerSiteExchangePasswordUseYN", "0", "btn-danger")}`}
                      onClick={handleToggle}
                    >
                      사용안함
                    </button>
                    <button
                      type="button"
                      id="partnerSiteExchangePasswordUseYN_1"
                      className={`btn${activeClass("partnerSiteExchangePasswordUseYN", "1", "btn-green")}`}
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

          {/* 환전 안내 문구 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-6a">
            <div className="panel-heading">
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
                ref={exchangeNoticeRef}
                id="exchangeNotice"
                name="exchangeNotice"
                rows={20}
              />
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

          {/* 쿠폰 기본 문구 설정 */}
          <div className="panel panel-inverse" data-sortable-id="form-6b">
            <div className="panel-heading">
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
                ref={couponMemoRef}
                id="couponMemo"
                name="couponMemo"
                rows={20}
              />
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
      </div>
    </Layout>
  );
}
