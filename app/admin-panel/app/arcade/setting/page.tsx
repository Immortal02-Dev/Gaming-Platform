"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = "";

interface GameType {
  gameTypeIdx: number;
  gameTypeName: string;
}
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
interface PickState {
  gamePickIdx: number;
  label: string;
  value: string;
  sortOrder: number;
}
interface CodeState {
  gameCodeIdx: number;
  codeName: string;
  gameCodeUseYN: number;
  sortOrder: number;
  picks: PickState[];
  isEmptyFallback?: boolean;
}
interface StatusState {
  gameTypeUseYN: number;
  gameTypeClose: number;
}

const EMPTY_BASE_FORM: BaseFormState = {
  endTimeSeconds: "0",
  bettingType: "",
  singleBetMinMoney: "0",
  singleBetMaxMoney: "0",
  singleBetWinMoney: "0",
  multiBetMinMoney: "0",
  multiBetMaxMoney: "0",
  multiBetWinMoney: "0",
  gameNotice: "",
};
const formatValue = (value: unknown, emptyValue = "0") =>
  value === null || value === undefined || value === ""
    ? emptyValue
    : String(value);
const toNumber = (value: string, emptyValue: number | null = 0) => {
  const parsed = Number(value.replace(/,/g, "").trim());
  return value.trim() && !Number.isNaN(parsed) ? parsed : emptyValue;
};
const readApiResponse = async <T = Record<string, unknown>,>(
  response: Response,
) => {
  const responseText = await response.text();
  if (!responseText) return {};
  try {
    return JSON.parse(responseText) as {
      ReturnCode?: number;
      ReturnMessage?: string;
      data?: T;
    };
  } catch {
    throw new Error(
      `API returned an invalid response (${response.status} ${response.statusText})`,
    );
  }
};
const tabId = (idx: number) => `gamecode-tab-${idx}`;

const STATIC_GAME_CODE_TABS: Array<{
  gameCodeIdx: number;
  codeName: string;
  picks: Array<{ gamePickIdx: number; label: string }>;
}> = [
  {
    gameCodeIdx: 6,
    codeName: "파워볼",
    picks: [
      { gamePickIdx: 1, label: "파워 홀" },
      { gamePickIdx: 2, label: "파워 짝" },
      { gamePickIdx: 3, label: "파워 언더" },
      { gamePickIdx: 4, label: "파워 오버" },
    ],
  },
  {
    gameCodeIdx: 7,
    codeName: "일반볼",
    picks: [
      { gamePickIdx: 5, label: "일반 홀" },
      { gamePickIdx: 6, label: "일반 짝" },
      { gamePickIdx: 7, label: "일반 언더" },
      { gamePickIdx: 8, label: "일반 오버" },
    ],
  },
  {
    gameCodeIdx: 8,
    codeName: "파워볼 조합",
    picks: [
      { gamePickIdx: 9, label: "홀+언더" },
      { gamePickIdx: 10, label: "홀+오버" },
      { gamePickIdx: 11, label: "짝+언더" },
      { gamePickIdx: 12, label: "짝+오버" },
    ],
  },
  {
    gameCodeIdx: 9,
    codeName: "일반볼 조합",
    picks: [
      { gamePickIdx: 13, label: "홀+언더" },
      { gamePickIdx: 14, label: "홀+오버" },
      { gamePickIdx: 15, label: "짝+언더" },
      { gamePickIdx: 16, label: "짝+오버" },
    ],
  },
  {
    gameCodeIdx: 10,
    codeName: "일반볼 대중소",
    picks: [
      { gamePickIdx: 17, label: "일반볼 대" },
      { gamePickIdx: 18, label: "일반볼 중" },
      { gamePickIdx: 19, label: "일반볼 소" },
    ],
  },
  {
    gameCodeIdx: 11,
    codeName: "파워볼+일반볼 조합",
    picks: [
      { gamePickIdx: 20, label: "파홀+일홀" },
      { gamePickIdx: 21, label: "파홀+일짝" },
      { gamePickIdx: 22, label: "파짝+일홀" },
      { gamePickIdx: 23, label: "파짝+일짝" },
      { gamePickIdx: 24, label: "파언+일언" },
      { gamePickIdx: 25, label: "파언+일옵" },
      { gamePickIdx: 26, label: "파옵+일언" },
      { gamePickIdx: 27, label: "파옵+일옵" },
    ],
  },
  {
    gameCodeIdx: 13,
    codeName: "파워볼 숫자 맞추기",
    picks: Array.from({ length: 10 }, (_, index) => ({
      gamePickIdx: index + 28,
      label: String(index),
    })),
  },
  {
    gameCodeIdx: 14,
    codeName: "일반 홀짝+일반 언오버+파워 홀짝",
    picks: [
      { gamePickIdx: 38, label: "홀+언더+P홀" },
      { gamePickIdx: 39, label: "홀+언더+P짝" },
      { gamePickIdx: 40, label: "홀+오버+P홀" },
      { gamePickIdx: 41, label: "홀+오버+P짝" },
      { gamePickIdx: 42, label: "짝+언더+P홀" },
      { gamePickIdx: 43, label: "짝+언더+P짝" },
      { gamePickIdx: 44, label: "짝+오버+P홀" },
      { gamePickIdx: 45, label: "짝+오버+P짝" },
    ],
  },
];

export default function ArcadeSettingPage() {
  const [gameTypes, setGameTypes] = useState<GameType[]>([]);
  const [selectedGameTypeIdx, setSelectedGameTypeIdx] = useState<number | null>(
    null,
  );
  const [baseForm, setBaseForm] = useState<BaseFormState>(EMPTY_BASE_FORM);
  const [gameCodes, setGameCodes] = useState<CodeState[]>([]);
  const [gameTypeStatus, setGameTypeStatus] = useState<StatusState>({
    gameTypeUseYN: 0,
    gameTypeClose: 0,
  });
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const fetchSettings = useCallback(async (gameTypeIdx: number) => {
    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting?gameTypeIdx=${gameTypeIdx}`,
        { credentials: "include" },
      );
      const json = await readApiResponse<{
        gameType?: Partial<StatusState>;
        baseSettings?: Partial<BaseFormState>;
        gameCodes?: CodeState[];
      }>(response);
      if (!response.ok || json.ReturnCode !== 0)
        throw new Error(
          json.ReturnMessage || "미니게임 설정을 불러오지 못했습니다.",
        );
      const payload = json.data || {};
      setGameTypeStatus({
        gameTypeUseYN: Number(payload.gameType?.gameTypeUseYN ?? 0),
        gameTypeClose: Number(payload.gameType?.gameTypeClose ?? 0),
      });
      const base = payload.baseSettings || {};
      setBaseForm({
        endTimeSeconds: formatValue(base.endTimeSeconds),
        bettingType: formatValue(base.bettingType, ""),
        singleBetMinMoney: formatValue(base.singleBetMinMoney),
        singleBetMaxMoney: formatValue(base.singleBetMaxMoney),
        singleBetWinMoney: formatValue(base.singleBetWinMoney),
        multiBetMinMoney: formatValue(base.multiBetMinMoney),
        multiBetMaxMoney: formatValue(base.multiBetMaxMoney),
        multiBetWinMoney: formatValue(base.multiBetWinMoney),
        gameNotice: formatValue(base.gameNotice, ""),
      });
      const codes: CodeState[] = Array.isArray(payload.gameCodes)
        ? payload.gameCodes.map((code: CodeState) => ({
            ...code,
            gameCodeUseYN: Number(code.gameCodeUseYN ?? 0),
            picks: Array.isArray(code.picks)
              ? code.picks.map((pick: PickState) => ({
                  ...pick,
                  value: formatValue(pick.value),
                  sortOrder: Number(pick.sortOrder ?? 0),
                }))
              : [],
          }))
        : [];
      codes.sort((first, second) => first.sortOrder - second.sortOrder);
      setGameCodes(codes);
      setActiveTab((current) =>
        current && codes.some((code) => tabId(code.gameCodeIdx) === current)
          ? current
          : codes.length
            ? tabId(codes[0].gameCodeIdx)
            : null,
      );
    } catch (error) {
      setBaseForm(EMPTY_BASE_FORM);
      setGameCodes([]);
      setActiveTab(null);
      alert(
        error instanceof Error
          ? error.message
          : "미니게임 설정을 불러오지 못했습니다.",
      );
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BACKEND_URL}/api/admin/arcade-setting`, { credentials: "include" })
      .then(async (response) => {
        const json = await readApiResponse<{
          items?: Array<{
            gameTypeIdx?: number;
            gameTypeId?: number;
            gameTypeName?: string;
          }>;
        }>(response);
        if (!response.ok || json.ReturnCode !== 0)
          throw new Error(
            json.ReturnMessage || "게임 종류를 불러오지 못했습니다.",
          );
        return Array.isArray(json.data?.items)
          ? json.data.items.map(
              (item: {
                gameTypeIdx?: number;
                gameTypeId?: number;
                gameTypeName?: string;
              }) => ({
                gameTypeIdx: item.gameTypeIdx ?? item.gameTypeId ?? 0,
                gameTypeName: item.gameTypeName ?? "",
              }),
            )
          : [];
      })
      .then((types: GameType[]) => {
        if (!cancelled) {
          setGameTypes(types);
          setSelectedGameTypeIdx(types[0]?.gameTypeIdx ?? null);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setGameTypes([]);
          alert(
            error instanceof Error
              ? error.message
              : "게임 종류를 불러오지 못했습니다.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (selectedGameTypeIdx === null) return;
    const timer = setTimeout(() => fetchSettings(selectedGameTypeIdx), 0);
    return () => clearTimeout(timer);
  }, [fetchSettings, selectedGameTypeIdx]);

  const handleBaseInputChange =
    (field: keyof BaseFormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setBaseForm((previous) => ({ ...previous, [field]: event.target.value }));
  const toggleClass = (
    buttonValue: number,
    currentValue: number,
    positiveValue = 1,
  ) =>
    buttonValue === currentValue
      ? `btn btn-default ${buttonValue === positiveValue ? "btn-green" : "btn-danger"}`
      : "btn btn-default";

  const handleStatusChange = async (
    key: "gameTypeUseYN" | "gameTypeClose",
    value: number,
  ) => {
    if (
      selectedGameTypeIdx === null ||
      !window.confirm("상태 변경 하시겠습니까?")
    )
      return;
    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/${selectedGameTypeIdx}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        },
      );
      const json = await readApiResponse(response);
      if (!response.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "상태 변경에 실패했습니다.");
      setGameTypeStatus((previous) => ({ ...previous, [key]: value }));
      alert(json.ReturnMessage || "상태 변경 완료");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "상태 변경 중 오류가 발생했습니다.",
      );
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleCodeStatusChange = async (gameCodeIdx: number, value: number) => {
    if (
      selectedGameTypeIdx === null ||
      !window.confirm("상태 변경 하시겠습니까?")
    )
      return;
    const currentCode = gameCodes.find(
      (code) => code.gameCodeIdx === gameCodeIdx,
    );
    if (!currentCode || currentCode.isEmptyFallback) {
      const staticTab = STATIC_GAME_CODE_TABS.find(
        (tab) => tab.gameCodeIdx === gameCodeIdx,
      );
      if (!staticTab) return;
      setGameCodes((previous) =>
        previous.some((code) => code.gameCodeIdx === gameCodeIdx)
          ? previous.map((code) =>
              code.gameCodeIdx === gameCodeIdx
                ? { ...code, gameCodeUseYN: value }
                : code,
            )
          : [
              ...previous,
              {
                gameCodeIdx,
                codeName: staticTab.codeName,
                gameCodeUseYN: value,
                sortOrder: staticTab.gameCodeIdx,
                isEmptyFallback: true,
                picks: staticTab.picks.map((pick) => ({
                  ...pick,
                  value: "0",
                  sortOrder: pick.gamePickIdx,
                })),
              },
            ],
      );
      return;
    }
    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/${selectedGameTypeIdx}/game-codes/${gameCodeIdx}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useYN: value }),
        },
      );
      const json = await readApiResponse(response);
      if (!response.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "상태 변경에 실패했습니다.");
      setGameCodes((previous) =>
        previous.map((code) =>
          code.gameCodeIdx === gameCodeIdx
            ? { ...code, gameCodeUseYN: value }
            : code,
        ),
      );
      alert(json.ReturnMessage || "상태 변경 완료");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "상태 변경 중 오류가 발생했습니다.",
      );
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleBaseFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedGameTypeIdx === null) return;
    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/${selectedGameTypeIdx}/base-settings`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endTimeSeconds: toNumber(baseForm.endTimeSeconds),
            bettingType: baseForm.bettingType
              ? toNumber(baseForm.bettingType, null)
              : null,
            singleBetMinMoney: toNumber(baseForm.singleBetMinMoney),
            singleBetMaxMoney: toNumber(baseForm.singleBetMaxMoney),
            singleBetWinMoney: toNumber(baseForm.singleBetWinMoney),
            multiBetMinMoney: toNumber(baseForm.multiBetMinMoney),
            multiBetMaxMoney: toNumber(baseForm.multiBetMaxMoney),
            multiBetWinMoney: toNumber(baseForm.multiBetWinMoney),
            gameNotice: baseForm.gameNotice,
          }),
        },
      );
      const json = await readApiResponse(response);
      if (!response.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "기본 설정 저장에 실패했습니다.");
      alert(json.ReturnMessage || "기본 설정이 저장되었습니다.");
      await fetchSettings(selectedGameTypeIdx);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
      );
    } finally {
      setGlobalLoading(false);
    }
  };

  const handlePickFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    code: CodeState,
  ) => {
    event.preventDefault();
    if (selectedGameTypeIdx === null) return;
    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/arcade-setting/${selectedGameTypeIdx}/game-codes/${code.gameCodeIdx}/picks`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            picks: code.picks.map((pick) => ({
              gamePickIdx: pick.gamePickIdx,
              odds: toNumber(pick.value),
            })),
          }),
        },
      );
      const json = await readApiResponse(response);
      if (!response.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "배당률 저장에 실패했습니다.");
      alert(json.ReturnMessage || "배당률이 저장되었습니다.");
      if (!code.isEmptyFallback) {
        await fetchSettings(selectedGameTypeIdx);
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
      );
    } finally {
      setGlobalLoading(false);
    }
  };

  const handlePickValueChange = (
    gameCodeIdx: number,
    gamePickIdx: number,
    value: string,
  ) => {
    setGameCodes((previous) =>
      previous.some((code) => code.gameCodeIdx === gameCodeIdx)
        ? previous.map((code) =>
            code.gameCodeIdx === gameCodeIdx
              ? {
                  ...code,
                  picks: code.picks.map((pick) =>
                    pick.gamePickIdx === gamePickIdx
                      ? { ...pick, value }
                      : pick,
                  ),
                }
              : code,
          )
        : [
            ...previous,
            (() => {
              const staticTab = STATIC_GAME_CODE_TABS.find(
                (tab) => tab.gameCodeIdx === gameCodeIdx,
              );
              return {
                gameCodeIdx,
                codeName: staticTab?.codeName ?? "0",
                gameCodeUseYN: 0,
                sortOrder: staticTab?.gameCodeIdx ?? 0,
                isEmptyFallback: true,
                picks: (staticTab?.picks ?? []).map((pick) => ({
                  ...pick,
                  value: pick.gamePickIdx === gamePickIdx ? value : "0",
                  sortOrder: pick.gamePickIdx,
                })),
              };
            })(),
          ],
    );
  };

  const displayGameCodes: CodeState[] = STATIC_GAME_CODE_TABS.map((tab) => {
    const apiCode = gameCodes.find(
      (code) => code.gameCodeIdx === tab.gameCodeIdx,
    );
    return {
      gameCodeIdx: tab.gameCodeIdx,
      codeName: apiCode?.codeName || tab.codeName,
      gameCodeUseYN: Number(apiCode?.gameCodeUseYN ?? 0),
      sortOrder: apiCode?.sortOrder ?? tab.gameCodeIdx,
      isEmptyFallback: !apiCode,
      picks: tab.picks.map((staticPick) => {
        const apiPick = apiCode?.picks.find(
          (pick) => pick.gamePickIdx === staticPick.gamePickIdx,
        );
        return {
          gamePickIdx: staticPick.gamePickIdx,
          label: staticPick.label,
          value: formatValue(apiPick?.value),
          sortOrder: apiPick?.sortOrder ?? staticPick.gamePickIdx,
        };
      }),
    };
  });
  const displayActiveTab = activeTab ?? tabId(displayGameCodes[0].gameCodeIdx);

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
          {gameTypes.map((type) => (
            <li className="nav-item" key={type.gameTypeIdx}>
              <a
                href="#"
                className={`nav-link ${selectedGameTypeIdx === type.gameTypeIdx ? "active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedGameTypeIdx(type.gameTypeIdx);
                }}
              >
                {type.gameTypeName}
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
                  href="#"
                  className="btn btn-xs btn-icon btn-default"
                  data-toggle="panel-expand"
                  data-tooltip-init="true"
                >
                  <i className="fa fa-expand"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="#"
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
                    className={toggleClass(0, gameTypeStatus.gameTypeUseYN)}
                    onClick={() => handleStatusChange("gameTypeUseYN", 0)}
                  >
                    사용 안함
                  </button>
                  <button
                    type="button"
                    className={toggleClass(1, gameTypeStatus.gameTypeUseYN)}
                    onClick={() => handleStatusChange("gameTypeUseYN", 1)}
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
                    className={toggleClass(1, gameTypeStatus.gameTypeClose, 0)}
                    onClick={() => handleStatusChange("gameTypeClose", 1)}
                  >
                    점검중
                  </button>
                  <button
                    type="button"
                    className={toggleClass(0, gameTypeStatus.gameTypeClose, 0)}
                    onClick={() => handleStatusChange("gameTypeClose", 0)}
                  >
                    운영중
                  </button>
                </div>
              </div>
              <form onSubmit={handleBaseFormSubmit}>
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
                {[
                  [
                    "단폴더",
                    "singleBetMinMoney",
                    "singleBetMaxMoney",
                    "singleBetWinMoney",
                  ],
                  [
                    "조합 베팅",
                    "multiBetMinMoney",
                    "multiBetMaxMoney",
                    "multiBetWinMoney",
                  ],
                ].map(([label, min, max, win]) => (
                  <div className="row mb-2" key={label}>
                    <label className="col-form-label w-auto text-nowrap">
                      {label}
                    </label>
                    <div className="col d-flex">
                      <div className="input-group">
                        <div className="input-group-text">베팅금액</div>
                        <input
                          type="text"
                          className="form-control text-end amount"
                          value={baseForm[min as keyof BaseFormState]}
                          onChange={handleBaseInputChange(
                            min as keyof BaseFormState,
                          )}
                        />
                        <div className="input-group-text">~</div>
                        <input
                          type="text"
                          className="form-control text-end amount"
                          value={baseForm[max as keyof BaseFormState]}
                          onChange={handleBaseInputChange(
                            max as keyof BaseFormState,
                          )}
                        />
                      </div>
                      <div className="input-group ms-2">
                        <div className="input-group-text">최대 당첨금액</div>
                        <input
                          type="text"
                          className="form-control text-end amount"
                          value={baseForm[win as keyof BaseFormState]}
                          onChange={handleBaseInputChange(
                            win as keyof BaseFormState,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
                  href="#"
                  className="btn btn-xs btn-icon btn-default"
                  data-toggle="panel-expand"
                  data-tooltip-init="true"
                >
                  <i className="fa fa-expand"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <ul className="nav nav-pills mb-2" role="tablist">
                {displayGameCodes.map((code) => (
                  <li className="nav-item" key={code.gameCodeIdx}>
                    <a
                      href={`#${tabId(code.gameCodeIdx)}`}
                      className={`nav-link ${displayActiveTab === tabId(code.gameCodeIdx) ? "active" : ""}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveTab(tabId(code.gameCodeIdx));
                      }}
                    >
                      {code.codeName}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="tab-content panel p-3 rounded border">
                {displayGameCodes.map((code) => (
                  <div
                    key={code.gameCodeIdx}
                    className={`tab-pane fade ${displayActiveTab === tabId(code.gameCodeIdx) ? "active show" : ""}`}
                    id={tabId(code.gameCodeIdx)}
                    role="tabpanel"
                  >
                    <div className="row mb-2">
                      <label className="col-form-label w-auto text-nowrap">
                        사용 여부
                      </label>
                      <div className="btn-group w-auto">
                        <button
                          type="button"
                          className={toggleClass(0, code.gameCodeUseYN)}
                          onClick={() =>
                            handleCodeStatusChange(code.gameCodeIdx, 0)
                          }
                        >
                          사용 안함
                        </button>
                        <button
                          type="button"
                          className={toggleClass(1, code.gameCodeUseYN)}
                          onClick={() =>
                            handleCodeStatusChange(code.gameCodeIdx, 1)
                          }
                        >
                          사용
                        </button>
                      </div>
                    </div>
                    <form
                      onSubmit={(event) => handlePickFormSubmit(event, code)}
                    >
                      {code.picks.length === 0 ? (
                        <p className="text-center text-muted">
                          데이터가 없습니다.
                        </p>
                      ) : (
                        code.picks
                          .slice()
                          .sort(
                            (first, second) =>
                              first.sortOrder - second.sortOrder,
                          )
                          .map((pick) => (
                            <div className="row mb-2" key={pick.gamePickIdx}>
                              <label className="col-form-label col-2 text-nowrap">
                                {pick.label}
                              </label>
                              <input
                                type="text"
                                name={`gamePickIdx[${pick.gamePickIdx}]`}
                                className="form-control w-auto"
                                value={pick.value}
                                onChange={(event) =>
                                  handlePickValueChange(
                                    code.gameCodeIdx,
                                    pick.gamePickIdx,
                                    event.target.value,
                                  )
                                }
                              />
                            </div>
                          ))
                      )}
                      <div className="row mt-2">
                        <div className="col text-center">
                          <button type="submit" className="btn btn-success">
                            <i className="fa fa-save me-1"></i>저장
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
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
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", display: "block" }}
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
        href="#"
        className="btn btn-icon btn-success btn-circle btn-theme btn-scroll-to-top"
        data-toggle="scroll-to-top"
      >
        <i className="fa fa-angle-up"></i>
      </a>
    </Layout>
  );
}
