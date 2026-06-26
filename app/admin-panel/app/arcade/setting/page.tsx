"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy
const DEFAULT_GAME_TYPE_IDX = 4;
const NAV_LINKS = [
  { label: "파워볼(PBG)", gameTypeIdx: 4 },
  { label: "EOS파워볼5분", gameTypeIdx: 10 },
  { label: "EOS파워볼3분", gameTypeIdx: 11 },
  { label: "코인파워볼5분", gameTypeIdx: 12 },
  { label: "코인파워볼3분", gameTypeIdx: 13 },
  { label: "코인사다리5분", gameTypeIdx: 14 },
  { label: "코인사다리3분", gameTypeIdx: 15 },
];

const buildTabId = (idx: number) => `gamecode-tab-${idx}`;

interface BaseFormState {
  endTimeSeconds: string;
  bettingType: string;
  singleBetMinMoney: string;
  singleBetMaxMoney: string;
  singleBetWinMoney: string;
  multiBetMinMoney: string;
  multiBetMaxMoney: string;
  multiBetWinMoney: string;
  gameNotice: string;
}

const DEFAULT_BASE_FORM: BaseFormState = {
  endTimeSeconds: "",
  bettingType: "",
  singleBetMinMoney: "",
  singleBetMaxMoney: "",
  singleBetWinMoney: "",
  multiBetMinMoney: "",
  multiBetMaxMoney: "",
  multiBetWinMoney: "",
  gameNotice: "",
};

interface ArcadeGamePickState {
  gamePickIdx: number;
  label: string;
  value: string;
  sortOrder: number;
}

interface ArcadeGameCodeState {
  gameCodeIdx: number;
  codeName: string;
  gameCodeUseYN: number;
  sortOrder: number;
  picks: ArcadeGamePickState[];
}

interface GameTypeStatusState {
  gameTypeUseYN: number;
  gameTypeClose: number;
}

const formatNumberValue = (value?: number | null) => {
  if (value === null || value === undefined) {
    return "";
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? "" : `${parsed}`;
};

const toNumberOrDefault = (value: string, defaultValue = 0) => {
  const cleaned = value ? value.replace(/,/g, "").trim() : "";
  if (!cleaned) {
    return defaultValue;
  }
  const parsed = Number(cleaned);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

const toNumberOrNull = (value: string) => {
  const cleaned = value ? value.replace(/,/g, "").trim() : "";
  if (!cleaned) {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isNaN(parsed) ? null : parsed;
};

export default function ArcadeSettingPage() {
  const [selectedGameTypeIdx, setSelectedGameTypeIdx] = useState(
    DEFAULT_GAME_TYPE_IDX
  );
  const [baseForm, setBaseForm] = useState<BaseFormState>(DEFAULT_BASE_FORM);
  const [gameCodes, setGameCodes] = useState<ArcadeGameCodeState[]>([]);
  const [gameTypeStatus, setGameTypeStatus] = useState<GameTypeStatusState>({
    gameTypeUseYN: 1,
    gameTypeClose: 0,
  });
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const navLinks = useMemo(() => NAV_LINKS, []);

  const fetchSettings = useCallback(
    async (options?: { withSpinner?: boolean }) => {
      const showSpinner = options?.withSpinner !== false;
      if (showSpinner) {
        setGlobalLoading(true);
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/admin/arcade-setting?gameTypeIdx=${selectedGameTypeIdx}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("미니게임 설정을 불러오지 못했습니다.");
        }

        const json = await response.json();
        if (json.ReturnCode !== 0) {
          throw new Error(
            json.ReturnMessage || "미니게임 설정을 불러오지 못했습니다."
          );
        }

        const payload = json.data || {};
        setGameTypeStatus({
          gameTypeUseYN: payload.gameType?.gameTypeUseYN ?? 1,
          gameTypeClose: payload.gameType?.gameTypeClose ?? 0,
        });

        const base = payload.baseSettings || null;
        setBaseForm({
          endTimeSeconds: formatNumberValue(base?.endTimeSeconds ?? 60),
          bettingType:
            base?.bettingType === null || base?.bettingType === undefined
              ? ""
              : `${base.bettingType}`,
          singleBetMinMoney: formatNumberValue(base?.singleBetMinMoney ?? 1000),
          singleBetMaxMoney: formatNumberValue(base?.singleBetMaxMoney),
          singleBetWinMoney: formatNumberValue(base?.singleBetWinMoney),
          multiBetMinMoney: formatNumberValue(base?.multiBetMinMoney ?? 1000),
          multiBetMaxMoney: formatNumberValue(base?.multiBetMaxMoney),
          multiBetWinMoney: formatNumberValue(base?.multiBetWinMoney),
          gameNotice: base?.gameNotice ?? "",
        });

        const codes: ArcadeGameCodeState[] = (payload.gameCodes || []).map(
          (code: any) => ({
            gameCodeIdx: code.gameCodeIdx,
            codeName: code.codeName,
            gameCodeUseYN: code.gameCodeUseYN,
            sortOrder: code.sortOrder ?? 0,
            picks: (code.picks || []).map((pick: any) => ({
              gamePickIdx: pick.gamePickIdx,
              label: pick.label,
              value: formatNumberValue(pick.odds),
              sortOrder: pick.sortOrder ?? 0,
            })),
          })
        );

        setGameCodes(codes);
        setActiveTab((prev) => {
          if (
            prev &&
            codes.some((code) => buildTabId(code.gameCodeIdx) === prev)
          ) {
            return prev;
          }
          return codes.length ? buildTabId(codes[0].gameCodeIdx) : null;
        });
      } catch (error: any) {
        console.error("Failed to fetch arcade settings:", error);
        alert(error?.message || "미니게임 설정을 불러오지 못했습니다.");
      } finally {
        if (showSpinner) {
          setGlobalLoading(false);
        }
      }
    },
    [selectedGameTypeIdx]
  );

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleBaseInputChange =
    (field: keyof BaseFormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { value } = event.target;
      setBaseForm((prev) => ({ ...prev, [field]: value }));
    };

  const getToggleButtonClass = (
    buttonValue: number,
    currentValue: number,
    positiveValue = 1
  ) => {
    const base = "btn btn-default";
    if (buttonValue !== currentValue) {
      return base;
    }
    return `${base} ${
      buttonValue === positiveValue ? "btn-green" : "btn-danger"
    }`;
  };

  const handleGameTypeStatusChange = async (
    key: "gameTypeUseYN" | "gameTypeClose",
    value: number
  ) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("상태 변경 하시겠습니까?")
    ) {
      return;
    }

    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/game-setting/${selectedGameTypeIdx}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, value }),
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "상태 변경에 실패했습니다.");
      }

      setGameTypeStatus((prev) => ({ ...prev, [key]: value }));
      alert(json.ReturnMessage || "상태 변경 완료");
    } catch (error: any) {
      alert(error?.message || "상태 변경 중 오류가 발생했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleGameCodeStatusChange = async (
    gameCodeIdx: number,
    value: number
  ) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("상태 변경 하시겠습니까?")
    ) {
      return;
    }

    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/game-codes/${gameCodeIdx}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ useYN: value }),
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "상태 변경에 실패했습니다.");
      }

      setGameCodes((prev) =>
        prev.map((code) =>
          code.gameCodeIdx === gameCodeIdx
            ? { ...code, gameCodeUseYN: value }
            : code
        )
      );
      alert(json.ReturnMessage || "상태 변경 완료");
    } catch (error: any) {
      alert(error?.message || "상태 변경 중 오류가 발생했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleBaseFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGlobalLoading(true);
    try {
      const payload = {
        endTimeSeconds: toNumberOrDefault(baseForm.endTimeSeconds, 60),
        bettingType:
          baseForm.bettingType === "" ? null : Number(baseForm.bettingType),
        singleBetMinMoney: toNumberOrDefault(baseForm.singleBetMinMoney, 0),
        singleBetMaxMoney: toNumberOrNull(baseForm.singleBetMaxMoney),
        singleBetWinMoney: toNumberOrNull(baseForm.singleBetWinMoney),
        multiBetMinMoney: toNumberOrDefault(baseForm.multiBetMinMoney, 0),
        multiBetMaxMoney: toNumberOrNull(baseForm.multiBetMaxMoney),
        multiBetWinMoney: toNumberOrNull(baseForm.multiBetWinMoney),
        gameNotice: baseForm.gameNotice ?? "",
      };

      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/${selectedGameTypeIdx}/base-settings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "저장에 실패했습니다.");
      }

      alert(json.ReturnMessage || "저장되었습니다.");
      await fetchSettings({ withSpinner: false });
    } catch (error: any) {
      alert(error?.message || "요청 중 오류가 발생했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handlePickInputChange = (
    gameCodeIdx: number,
    gamePickIdx: number,
    value: string
  ) => {
    setGameCodes((prev) =>
      prev.map((code) =>
        code.gameCodeIdx === gameCodeIdx
          ? {
              ...code,
              picks: code.picks.map((pick) =>
                pick.gamePickIdx === gamePickIdx ? { ...pick, value } : pick
              ),
            }
          : code
      )
    );
  };

  const handlePickFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    gameCodeIdx: number
  ) => {
    event.preventDefault();
    const targetCode = gameCodes.find(
      (code) => code.gameCodeIdx === gameCodeIdx
    );
    if (!targetCode) {
      return;
    }

    setGlobalLoading(true);
    try {
      const payload = {
        picks: targetCode.picks.map((pick) => ({
          gamePickIdx: pick.gamePickIdx,
          odds: toNumberOrDefault(pick.value, 0),
        })),
      };

      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/game-codes/${gameCodeIdx}/picks`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "저장에 실패했습니다.");
      }

      alert(json.ReturnMessage || "저장되었습니다.");
      await fetchSettings({ withSpinner: false });
    } catch (error: any) {
      alert(error?.message || "요청 중 오류가 발생했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/arcade/setting">
          <i className="fa fa-gamepad me-2"></i>미니게임 설정
        </a>
        <small></small>
      </h1>

      <div className="d-inline-block fs-6 align-top mb-2">
        <ul className="nav nav-pills">
          {navLinks.map((link) => (
            <li className="nav-item" key={link.label}>
              <a
                href="#"
                className={`nav-link ${
                  selectedGameTypeIdx === link.gameTypeIdx ? "active" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  if (selectedGameTypeIdx !== link.gameTypeIdx) {
                    setSelectedGameTypeIdx(link.gameTypeIdx);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="row">
        <div className="col-md-4 ui-sortable">
          <div className="panel panel-inverse">
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                기본 설정
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
              <div className="row mb-2">
                <label className="col-form-label w-auto text-nowrap">
                  사용 여부
                </label>
                <div className="btn-group w-auto">
                  <button
                    type="button"
                    id="gameTypeUseYN_4_0"
                    className={getToggleButtonClass(
                      0,
                      gameTypeStatus.gameTypeUseYN,
                      1
                    )}
                    onClick={() =>
                      handleGameTypeStatusChange("gameTypeUseYN", 0)
                    }
                  >
                    사용 안함
                  </button>
                  <button
                    type="button"
                    id="gameTypeUseYN_4_1"
                    className={getToggleButtonClass(
                      1,
                      gameTypeStatus.gameTypeUseYN,
                      1
                    )}
                    onClick={() =>
                      handleGameTypeStatusChange("gameTypeUseYN", 1)
                    }
                  >
                    사용
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-auto text-nowrap">
                  점검 여부
                </label>
                <div className="btn-group w-auto">
                  <button
                    type="button"
                    id="gameTypeClose_4_1"
                    className={getToggleButtonClass(
                      1,
                      gameTypeStatus.gameTypeClose,
                      0
                    )}
                    onClick={() =>
                      handleGameTypeStatusChange("gameTypeClose", 1)
                    }
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    id="gameTypeClose_4_0"
                    className={getToggleButtonClass(
                      0,
                      gameTypeStatus.gameTypeClose,
                      0
                    )}
                    onClick={() =>
                      handleGameTypeStatusChange("gameTypeClose", 0)
                    }
                  >
                    운영중
                  </button>
                </div>
              </div>

              <form
                action="/arcadeSetting.html"
                method="post"
                onSubmit={handleBaseFormSubmit}
              >
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    베팅 마감
                  </label>
                  <div className="d-flex w-auto">
                    <input
                      type="text"
                      className="form-control w-80px"
                      value={baseForm.endTimeSeconds}
                      onChange={handleBaseInputChange("endTimeSeconds")}
                    />
                    <label className="col-form-label w-auto text-nowrap ms-2">
                      초
                    </label>
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    베팅제약
                  </label>
                  <div className="d-flex w-auto">
                    <select
                      className="form-select w-auto"
                      value={baseForm.bettingType}
                      onChange={handleBaseInputChange("bettingType")}
                    >
                      <option value="">제약 타입 선택</option>
                      <option value="1">한 회차에 한번만 베팅 가능</option>
                      <option value="2">
                        한 회차에 단폴더 한번, 조합 한번 베팅 가능
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    단폴더&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="col d-flex">
                    <div className="input-group">
                      <div className="input-group-text">베팅금액</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.singleBetMinMoney}
                        onChange={handleBaseInputChange("singleBetMinMoney")}
                        style={{ textAlign: "right" }}
                      />
                      <div className="input-group-text">~</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.singleBetMaxMoney}
                        onChange={handleBaseInputChange("singleBetMaxMoney")}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                    <div className="input-group ms-2">
                      <div className="input-group-text">최대 당첨금액</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.singleBetWinMoney}
                        onChange={handleBaseInputChange("singleBetWinMoney")}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    조합 베팅
                  </label>
                  <div className="col d-flex">
                    <div className="input-group">
                      <div className="input-group-text">베팅금액</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.multiBetMinMoney}
                        onChange={handleBaseInputChange("multiBetMinMoney")}
                        style={{ textAlign: "right" }}
                      />
                      <div className="input-group-text">~</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.multiBetMaxMoney}
                        onChange={handleBaseInputChange("multiBetMaxMoney")}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                    <div className="input-group ms-2">
                      <div className="input-group-text">최대 당첨금액</div>
                      <input
                        type="text"
                        className="form-control text-end amount"
                        value={baseForm.multiBetWinMoney}
                        onChange={handleBaseInputChange("multiBetWinMoney")}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    게임 공지
                  </label>
                  <textarea
                    className="col ms-2 form-control"
                    placeholder="공지 내용"
                    value={baseForm.gameNotice}
                    onChange={handleBaseInputChange("gameNotice")}
                  ></textarea>
                </div>
                <div className="row mt-2">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-save me-1"></i>저장
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8 ui-sortable">
          <div className="panel panel-inverse">
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                게임 설정
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
              <div className="row">
                <div className="col ui-sortable">
                  <ul className="nav nav-pills mb-2" role="tablist">
                    {gameCodes.map((code) => {
                      const tabId = buildTabId(code.gameCodeIdx);
                      return (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={tabId}
                        >
                          <a
                            href={`#${tabId}`}
                            data-bs-toggle="tab"
                            className={`nav-link ${
                              activeTab === tabId ? "active" : ""
                            }`}
                            aria-selected={activeTab === tabId}
                            role="tab"
                            onClick={(event) => {
                              event.preventDefault();
                              setActiveTab(tabId);
                            }}
                          >
                            {code.codeName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="tab-content panel p-3 rounded border">
                    {gameCodes.length === 0 && (
                      <div className="text-center text-muted py-4">
                        등록된 게임 코드가 없습니다.
                      </div>
                    )}
                    {gameCodes.map((code) => {
                      const tabId = buildTabId(code.gameCodeIdx);
                      return (
                        <div
                          key={tabId}
                          className={`tab-pane fade ${
                            activeTab === tabId ? "active show" : ""
                          }`}
                          id={tabId}
                          role="tabpanel"
                        >
                          <div className="row mb-2">
                            <label className="col-form-label w-auto text-nowrap">
                              사용 여부
                            </label>
                            <div className="btn-group w-auto">
                              <button
                                type="button"
                                id={`gameCodeUseYN_${code.gameCodeIdx}_0`}
                                className={getToggleButtonClass(
                                  0,
                                  code.gameCodeUseYN,
                                  1
                                )}
                                onClick={() =>
                                  handleGameCodeStatusChange(
                                    code.gameCodeIdx,
                                    0
                                  )
                                }
                              >
                                사용 안함
                              </button>
                              <button
                                type="button"
                                id={`gameCodeUseYN_${code.gameCodeIdx}_1`}
                                className={getToggleButtonClass(
                                  1,
                                  code.gameCodeUseYN,
                                  1
                                )}
                                onClick={() =>
                                  handleGameCodeStatusChange(
                                    code.gameCodeIdx,
                                    1
                                  )
                                }
                              >
                                사용
                              </button>
                            </div>
                          </div>
                          <form
                            action="/arcadePickSetting"
                            method="post"
                            onSubmit={(event) =>
                              handlePickFormSubmit(event, code.gameCodeIdx)
                            }
                          >
                            {code.picks.map((pick) => (
                              <div className="row mb-2" key={pick.gamePickIdx}>
                                <label className="col-form-label col-2 text-nowrap">
                                  {pick.label}
                                </label>
                                <input
                                  type="text"
                                  className="form-control w-auto"
                                  value={pick.value}
                                  onChange={(event) =>
                                    handlePickInputChange(
                                      code.gameCodeIdx,
                                      pick.gamePickIdx,
                                      event.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <div className="row mt-2">
                              <div className="col text-center">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  <i className="fa fa-save me-1"></i>저장
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {globalLoading && (
        <div
          id="modal-spinner"
          className="modal show"
          data-bs-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "block",
          }}
        >
          <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              처리중입니다. 잠시 기다려주십시오.
            </button>
          </div>
        </div>
      )}

      <a
        href="javascript:;"
        className="btn btn-icon btn-success btn-circle btn-theme btn-scroll-to-top"
        data-toggle="scroll-to-top"
      >
        <i className="fa fa-angle-up"></i>
      </a>
    </Layout>
  );
}
