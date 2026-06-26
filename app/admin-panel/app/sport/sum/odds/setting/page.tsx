"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

const sports = [
  { value: 1, label: "축구" },
  { value: 2, label: "아이스하키" },
  { value: 3, label: "농구" },
  { value: 5, label: "배구" },
  { value: 6, label: "미식축구" },
  { value: 11, label: "야구" },
  { value: 58, label: "리그오브레전드" },
];

const categoryList = ["승패", "핸디캡", "오버언더", "기타"];

export default function SportSumOddsSettingPage() {
  const [typeFlag, setTypeFlag] = useState(1); // 1: prematch, 2: live
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/sport-sum-odds-setting?typeFlag=${typeFlag}&page=1&pageSize=200`,
        { credentials: "include" }
      );
      const json = await res.json();
      if (!res.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "불러오지 못했습니다.");
      }
      // Backend returns flat rows (one per sport_id + category). Group by sport_id
      const rawItems = json.data?.items || [];

      // Fetch sport names so we can display them
      const spRes = await fetch(
        `${BACKEND_URL}/api/admin/sport-setting?page=1&pageSize=200`,
        { credentials: "include" }
      );
      const spJson = await spRes.json();
      const sportMap: Record<string, string> = {};
      if (spRes.ok && spJson.ReturnCode === 0) {
        (spJson.data?.items || []).forEach((s: any) => {
          sportMap[
            String(s.sportIdx ?? s.sport_id ?? s.sportId ?? s.sportIdx)
          ] = s.sportName ?? s.sport_name ?? s.sportName ?? String(s.sportIdx);
        });
      }

      const group: Record<string, any> = {};
      const groupIndexes = [1, 2];

      // Pre-populate group with all known sports so every sport appears in UI
      if (spRes.ok && spJson.ReturnCode === 0) {
        (spJson.data?.items || []).forEach((s: any) => {
          const sid = String(
            s.sportIdx ?? s.sport_id ?? s.sportId ?? s.sportIdx
          );
          if (!group[sid]) {
            const base: Record<string, any> = {
              sport_id: Number(sid),
              sportName:
                sportMap[sid] || (s.sportName ?? s.sport_name ?? String(sid)),
            };
            // initialize groups
            base.groups = {};
            groupIndexes.forEach((gid) => {
              base.groups[gid] = {};
              categoryList.forEach((cat) => {
                base.groups[gid][cat] = { sum_odds: "", default_odds: "" };
              });
            });
            group[sid] = base;
          }
        });
      }

      const categoryNameMap: Record<number, string> = {
        2: "승패",
        3: "핸디캡",
        4: "오버언더",
        5: "기타",
      };

      // Override with actual DB rows (respect group_idx)
      (rawItems || []).forEach((row: any) => {
        const sid = String(row.sport_id ?? row.sportIdx ?? row.sportId ?? "0");
        if (!group[sid]) {
          const base: Record<string, any> = {
            sport_id: Number(sid),
            sportName: sportMap[sid] || "",
          };
          base.groups = {};
          groupIndexes.forEach((gid) => {
            base.groups[gid] = {};
            categoryList.forEach((cat) => {
              base.groups[gid][cat] = { sum_odds: "", default_odds: "" };
            });
          });
          group[sid] = base;
        }

        let catName: string | undefined;
        const rawCategory = row.category;

        if (typeof rawCategory === "number") {
          // If category is numeric ID (e.g., 2), map it to name ("승패")
          catName = categoryNameMap[rawCategory];
        } else if (
          typeof rawCategory === "string" &&
          categoryList.includes(rawCategory)
        ) {
          // If category is already a string name (e.g., "승패"), use it directly
          catName = rawCategory;
        }

        const gid = row.group_idx ?? row.groupIdx ?? 1;

        if (catName) {
          if (!group[sid].groups) {
            group[sid].groups = {};
          }
          if (!group[sid].groups[gid]) {
            group[sid].groups[gid] = {};
            categoryList.forEach(
              (c) =>
                (group[sid].groups[gid][c] = { sum_odds: "", default_odds: "" })
            );
          }
          group[sid].groups[gid][catName] = {
            sum_odds: row.sum_odds ?? row.sumOdds ?? "",
            default_odds: row.default_odds ?? row.defaultOdds ?? "",
          };
        }
      });

      const normalized = Object.values(group);
      setSettings(normalized);
    } catch (err: any) {
      setError(err?.message || "서버 요청 실패");
    } finally {
      setLoading(false);
    }
  }, [typeFlag]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleInputChange = (
    idx: number,
    gid: number,
    cat: string,
    kind: "sum_odds" | "default_odds",
    value: string
  ) => {
    setSettings((prev) =>
      prev.map((row, ridx) =>
        ridx === idx
          ? {
              ...row,
              groups: {
                ...(row.groups || {}),
                [gid]: {
                  ...((row.groups || {})[gid] || {}),
                  [cat]: {
                    ...(((row.groups || {})[gid] || {})[cat] || {}),
                    [kind]: value,
                  },
                },
              },
            }
          : row
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const categoryIdMap: Record<string, number> = {
        승패: 2,
        핸디캡: 3,
        오버언더: 4,
        기타: 5,
      };

      const sumOdds: Record<string, any> = {};
      const defaultOdds: Record<string, any> = {};

      settings.forEach((row) => {
        const sportId = row.sport_id ?? row.sportIdx ?? row.sportId;
        if (!sportId) return;

        sumOdds[sportId] = {};
        defaultOdds[sportId] = {};

        const groupIndexes = [1, 2];
        groupIndexes.forEach((gid) => {
          sumOdds[sportId][gid] = {};
          defaultOdds[sportId][gid] = {};

          const groupData = (row.groups || {})[gid] || {};
          categoryList.forEach((catName) => {
            const catId = categoryIdMap[catName];
            if (!catId) return;

            const sumOddsValue = parseFloat(groupData[catName]?.sum_odds);
            const defaultOddsValue = parseFloat(
              groupData[catName]?.default_odds
            );

            sumOdds[sportId][gid][catId] = isNaN(sumOddsValue)
              ? ""
              : String(sumOddsValue);
            defaultOdds[sportId][gid][catId] = isNaN(defaultOddsValue)
              ? ""
              : String(defaultOddsValue);
          });
        });
      });

      const payload = {
        typeFlagIdx: typeFlag,
        sumOdds: sumOdds,
        defaultOdds: defaultOdds,
      };

      const res = await fetch(
        `${BACKEND_URL}/api/admin/sport-sum-odds-setting`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "저장에 실패했습니다.");
      }
      alert(json.ReturnMessage || "저장되었습니다.");
      await fetchSettings();
    } catch (err: any) {
      setError(err?.message || "저장 실패");
      alert(err?.message || "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/sportSumOddsSetting.html">
          <i className="fa fa-futbol me-2" />
          스포츠 합배당 설정
        </a>
        <small />
      </h1>
      <ul className="nav nav-pills mb-2">
        <li className="nav-item">
          <button
            className={`nav-link${typeFlag === 1 ? " active" : ""}`}
            onClick={() => setTypeFlag(1)}
            type="button"
          >
            프리매치
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link${typeFlag === 2 ? " active" : ""}`}
            onClick={() => setTypeFlag(2)}
            type="button"
          >
            라이브
          </button>
        </li>
      </ul>
      {error && (
        <div className="alert alert-danger py-2 px-3 mb-2">{error}</div>
      )}
      <div className="tab-content panel p-3 rounded">
        {loading ? (
          <div className="text-center py-4">
            <span className="spinner-border" /> 불러오는 중...
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th rowSpan={3}>종목</th>
                  {[1, 2].map((gid) => (
                    <th
                      key={`group-head-${gid}`}
                      colSpan={categoryList.length * 2}
                    >
                      {typeFlag === 1
                        ? gid === 1
                          ? "프리매치"
                          : "프리매치 스페셜"
                        : gid === 1
                        ? "라이브"
                        : "라이브 스페셜"}
                    </th>
                  ))}
                </tr>
                <tr>
                  {[1, 2].map((gid) => (
                    <React.Fragment key={`group-catrow-${gid}`}>
                      {categoryList.map((cat) => (
                        <th key={`g${gid}-cat-${cat}`} colSpan={2}>
                          {cat}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
                <tr>
                  {[1, 2].map((gid) => (
                    <React.Fragment key={`group-subhead-${gid}`}>
                      {categoryList.map((cat) => (
                        <React.Fragment key={`g${gid}-${cat}-sub`}>
                          <th>합배당</th>
                          <th>기준배당</th>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {settings.map((row, idx) => (
                  <tr key={row.sport_id ?? row.sportIdx}>
                    <td>
                      {row.sportName || String(row.sport_id ?? row.sportIdx)}
                    </td>
                    {[1, 2].map((gid) => {
                      const groupVals = (row.groups || {})[gid] || {};
                      return (
                        <React.Fragment key={`r${idx}-g${gid}`}>
                          {categoryList.map((cat) => (
                            <React.Fragment key={`r${idx}-g${gid}-${cat}`}>
                              <td className="p-1">
                                <input
                                  type="text"
                                  className="form-control commission w-100"
                                  value={groupVals[cat]?.sum_odds || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      idx,
                                      gid,
                                      cat,
                                      "sum_odds",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="p-1">
                                <input
                                  type="text"
                                  className="form-control commission w-100"
                                  value={groupVals[cat]?.default_odds || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      idx,
                                      gid,
                                      cat,
                                      "default_odds",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-success" disabled={saving}>
                  <i className="fa fa-save me-1" /> 저장
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
