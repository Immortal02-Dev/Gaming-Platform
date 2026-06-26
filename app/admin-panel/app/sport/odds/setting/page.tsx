"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

const marketNames = ["승무패", "승패", "핸디캡", "오버언더", "기타"];

interface OddsItem {
  levelIdx: number;
  groupIdx: number;
  marketIdx: number;
  fromOdds: string;
  toOdds: string;
  returnRate: string;
}

export default function SportOddsSettingPage() {
  const [sportIdx, setSportIdx] = useState<number>(1);
  const [typeFlagIdx, setTypeFlagIdx] = useState<number>(1); // 1: prematch, 2: live
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultSettings = useMemo(() => {
    const result: Record<string, OddsItem> = {};
    // The original HTML contains rows for levels 1..10. Keep parity with that structure.
    for (let level = 1; level <= 10; level++) {
      for (let group = 1; group <= 2; group++) {
        for (let market = 1; market <= 5; market++) {
          const key = `${level}_${group}_${market}`;
          result[key] = {
            levelIdx: level,
            groupIdx: group,
            marketIdx: market,
            fromOdds: "",
            toOdds: "",
            returnRate: "",
          };
        }
      }
    }
    return result;
  }, []);

  const [settingsMap, setSettingsMap] =
    useState<Record<string, OddsItem>>(defaultSettings);

  const fetchSports = useCallback(async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/sport-setting?page=1&pageSize=200`,
        { credentials: "include" }
      );
      const json = await res.json();
      if (!res.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "Failed to load sports");
      setSports(json.data?.items || []);
      if ((json.data?.items || []).length > 0)
        setSportIdx(json.data.items[0].sportIdx || 1);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        sportIdx: String(sportIdx),
        typeFlagIdx: String(typeFlagIdx),
      });
      const res = await fetch(
        `${BACKEND_URL}/api/admin/sport-odds-setting?${params.toString()}`,
        { credentials: "include" }
      );
      const json = await res.json();
      if (!res.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "Failed to load odds settings");

      const items: OddsItem[] = (json.data?.items || []).map((it: any) => ({
        levelIdx: it.levelIdx,
        groupIdx: it.groupIdx,
        marketIdx: it.marketIdx,
        fromOdds: it.fromOdds || "",
        toOdds: it.toOdds || "",
        returnRate: it.returnRate || "",
      }));

      const nextMap = { ...defaultSettings } as Record<string, OddsItem>;
      items.forEach((it) => {
        const key = `${it.levelIdx}_${it.groupIdx}_${it.marketIdx}`;
        nextMap[key] = it;
      });
      setSettingsMap(nextMap);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "설정 로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [sportIdx, typeFlagIdx, defaultSettings]);

  useEffect(() => {
    fetchSports();
  }, [fetchSports]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleInputChange = (
    level: number,
    group: number,
    market: number,
    field: keyof OddsItem,
    value: string
  ) => {
    const key = `${level}_${group}_${market}`;
    setSettingsMap((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const items = Object.values(settingsMap).map((it) => ({
        levelIdx: it.levelIdx,
        groupIdx: it.groupIdx,
        marketIdx: it.marketIdx,
        fromOdds: it.fromOdds,
        toOdds: it.toOdds,
        returnRate: it.returnRate,
      }));

      const res = await fetch(`${BACKEND_URL}/api/admin/sport-odds-setting`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sportIdx, typeFlagIdx, items }),
      });
      const json = await res.json();
      if (!res.ok || json.ReturnCode !== 0)
        throw new Error(json.ReturnMessage || "저장에 실패했습니다.");
      alert(json.ReturnMessage || "저장되었습니다.");
      await fetchSettings();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "저장 실패");
      alert(err?.message || "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/sport/odds/setting">
          <i className="fa fa-futbol me-2" />
          스포츠 기본배당 설정
        </a>
        <small />
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form className="d-flex align-items-center gap-2">
              <select
                name="sportIdx"
                className="form-select w-auto"
                value={sportIdx}
                onChange={(e) => setSportIdx(Number(e.target.value))}
              >
                {sports.map((s) => (
                  <option key={s.sportIdx} value={s.sportIdx}>
                    {s.sportName}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-lime"
                type="button"
                onClick={fetchSettings}
              >
                <i className="fa-solid fa-magnifying-glass me-2" />
                검색
              </button>
            </form>
            <div className="ms-auto">
              <button
                className="btn btn-success"
                onClick={handleSave}
                disabled={saving}
              >
                <i className="fa fa-save me-1" /> 저장
              </button>
            </div>
          </div>

          <div className="mt-2">
            <ul className="nav nav-pills mb-2">
              <li className="nav-item">
                <a
                  href="#typeFlag-tab-1"
                  data-bs-toggle="tab"
                  className={`nav-link ${typeFlagIdx === 1 ? "active" : ""}`}
                  onClick={() => setTypeFlagIdx(1)}
                >
                  프리매치
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#typeFlag-tab-2"
                  data-bs-toggle="tab"
                  className={`nav-link ${typeFlagIdx === 2 ? "active" : ""}`}
                  onClick={() => setTypeFlagIdx(2)}
                >
                  라이브
                </a>
              </li>
            </ul>
            <div className="tab-content panel p-3 rounded">
              <div
                className={`tab-pane fade ${
                  typeFlagIdx === 1 ? "active show" : ""
                }`}
                id="typeFlag-tab-1"
              >
                <div style={{ overflow: "auto" }}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <table
                    className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold"
                    style={{ minWidth: 2500 }}
                  >
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th rowSpan={3} className="align-middle">
                          단계
                        </th>
                        <th colSpan={15} className="align-middle">
                          {typeFlagIdx === 1 ? "프리매치" : "라이브"}
                        </th>
                        <th colSpan={15} className="align-middle">
                          {typeFlagIdx === 1
                            ? "프리매치 스페셜"
                            : "라이브 스페셜"}
                        </th>
                      </tr>
                      <tr>
                        {[...Array(2)].map((_, g) => (
                          <React.Fragment key={g}>
                            <th colSpan={3}>승무패</th>
                            <th colSpan={3}>승패</th>
                            <th colSpan={3}>핸디캡</th>
                            <th colSpan={3}>오버언더</th>
                            <th colSpan={3}>기타</th>
                          </React.Fragment>
                        ))}
                      </tr>
                      <tr>
                        {[...Array(10)].map((_, i) => (
                          <React.Fragment key={i}>
                            <th>시작 배당</th>
                            <th>종료 배당</th>
                            <th>배당률(%)</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={31}>
                            <div className="d-flex justify-content-center align-items-center py-4">
                              <div
                                className="spinner-border text-primary me-2"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              데이터를 불러오는 중입니다...
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {/* Render levels 1..10 to match original HTML */}
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                            <tr key={level}>
                              <td>{level}</td>
                              {[1, 2].map((group) => (
                                <React.Fragment key={group}>
                                  {marketNames.map((mName, mIdx) => {
                                    const market = mIdx + 1;
                                    const key = `${level}_${group}_${market}`;
                                    const it =
                                      settingsMap[key] ||
                                      ({
                                        fromOdds: "",
                                        toOdds: "",
                                        returnRate: "",
                                      } as OddsItem);
                                    return (
                                      <React.Fragment key={key}>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            className="form-control commission"
                                            value={it.fromOdds}
                                            onChange={(e) =>
                                              handleInputChange(
                                                level,
                                                group,
                                                market,
                                                "fromOdds",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            className="form-control commission"
                                            value={it.toOdds}
                                            onChange={(e) =>
                                              handleInputChange(
                                                level,
                                                group,
                                                market,
                                                "toOdds",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="p-1">
                                          <div className="input-group">
                                            <input
                                              type="text"
                                              className="form-control number"
                                              value={it.returnRate}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  level,
                                                  group,
                                                  market,
                                                  "returnRate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <div className="input-group-text p-1">
                                              %
                                            </div>
                                          </div>
                                        </td>
                                      </React.Fragment>
                                    );
                                  })}
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        className="btn btn-success"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        <i className="fa fa-save me-1" /> 저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  typeFlagIdx === 2 ? "active show" : ""
                }`}
                id="typeFlag-tab-2"
              >
                <div style={{ overflow: "auto" }}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <table
                    className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold"
                    style={{ minWidth: 2500 }}
                  >
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th rowSpan={3} className="align-middle">
                          단계
                        </th>
                        <th colSpan={15} className="align-middle">
                          {typeFlagIdx === 2 ? "라이브" : "프리매치"}
                        </th>
                        <th colSpan={15} className="align-middle">
                          {typeFlagIdx === 2
                            ? "라이브 스페셜"
                            : "프리매치 스페셜"}
                        </th>
                      </tr>
                      <tr>
                        {[...Array(2)].map((_, g) => (
                          <React.Fragment key={g}>
                            <th colSpan={3}>승무패</th>
                            <th colSpan={3}>승패</th>
                            <th colSpan={3}>핸디캡</th>
                            <th colSpan={3}>오버언더</th>
                            <th colSpan={3}>기타</th>
                          </React.Fragment>
                        ))}
                      </tr>
                      <tr>
                        {[...Array(10)].map((_, i) => (
                          <React.Fragment key={i}>
                            <th>시작 배당</th>
                            <th>종료 배당</th>
                            <th>배당률(%)</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={31}>
                            <div className="d-flex justify-content-center align-items-center py-4">
                              <div
                                className="spinner-border text-primary me-2"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              데이터를 불러오는 중입니다...
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {/* Render levels 1..10 to match original HTML */}
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                            <tr key={level}>
                              <td>{level}</td>
                              {[1, 2].map((group) => (
                                <React.Fragment key={group}>
                                  {marketNames.map((mName, mIdx) => {
                                    const market = mIdx + 1;
                                    const key = `${level}_${group}_${market}`;
                                    const it =
                                      settingsMap[key] ||
                                      ({
                                        fromOdds: "",
                                        toOdds: "",
                                        returnRate: "",
                                      } as OddsItem);
                                    return (
                                      <React.Fragment key={key}>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            className="form-control commission"
                                            value={it.fromOdds}
                                            onChange={(e) =>
                                              handleInputChange(
                                                level,
                                                group,
                                                market,
                                                "fromOdds",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            className="form-control commission"
                                            value={it.toOdds}
                                            onChange={(e) =>
                                              handleInputChange(
                                                level,
                                                group,
                                                market,
                                                "toOdds",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="p-1">
                                          <div className="input-group">
                                            <input
                                              type="text"
                                              className="form-control number"
                                              value={it.returnRate}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  level,
                                                  group,
                                                  market,
                                                  "returnRate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <div className="input-group-text p-1">
                                              %
                                            </div>
                                          </div>
                                        </td>
                                      </React.Fragment>
                                    );
                                  })}
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        className="btn btn-success"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        <i className="fa fa-save me-1" /> 저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
