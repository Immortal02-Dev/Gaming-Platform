"use client";

import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

// Extend Window interface for jQuery
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface CrossMarket {
  value: number;
  text: string;
  all: number;
  sportIdx: number;
}

interface MarketType {
  sportName: string;
  marketTypeIdx: number;
  marketTypeName: string;
  displayName?: string;
  typeFlag: number;
  typeCrossSpecial: number;
  sportIdx: number;
  useSingle: boolean;
}

interface CrossSetting {
  id: string;
  typeFlag: string;
  typeSameMatch: string;
  crossSetting: string; // JSON string
  markets?: CrossMarket[]; // optional for compatibility
}

const PageContent = () => {
  const [sportIdx, setSportIdx] = useState<string>("");
  const [typeCrossSpecial, setTypeCrossSpecial] = useState<string>("");
  const [marketTypes, setMarketTypes] = useState<MarketType[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<CrossMarket[]>([]);
  const [crossSettingIdx, setCrossSettingIdx] = useState<string>("");
  const [typeFlag, setTypeFlag] = useState<string>("");
  const [typeSameMatch, setTypeSameMatch] = useState<string>("");
  const [crossSettings, setCrossSettings] = useState<CrossSetting[]>([]);

  const fetchMarketTypes = useCallback(async () => {
    const params = new URLSearchParams({
      sportIdx: sportIdx || "",
      typeCrossSpecial: typeCrossSpecial || "",
    });
    const res = await fetch(
      `${BACKEND_URL}/api/admin/sport-cross-setting/sportCrossMarketTypeList?${params}`,
      {
        credentials: "include",
      }
    );
    if (res.ok) {
      const data: MarketType[] = await res.json();
      setMarketTypes(data);
    }
  }, [sportIdx, typeCrossSpecial]);

  const fetchCrossSettings = useCallback(async () => {
    const res = await fetch(`${BACKEND_URL}/api/admin/sport-cross-setting`, {
      credentials: "include",
    });
    if (res.ok) {
      const result = await res.json();
      setCrossSettings(result.data || result);
    }
  }, []);

  useEffect(() => {
    fetchMarketTypes();
    fetchCrossSettings();
  }, [fetchMarketTypes, fetchCrossSettings]);

  const handleSearch = () => {
    fetchMarketTypes();
  };

  const marketSelect = (market: CrossMarket) => {
    if (selectedMarkets.some((m) => m.value === market.value)) return;
    setSelectedMarkets([...selectedMarkets, market]);
  };

  const removeMarket = (value: number) => {
    setSelectedMarkets((prev) => prev.filter((m) => m.value !== value));
  };

  const handleSingleToggle = async (
    marketTypeIdx: number,
    useSingle: number
  ) => {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/sport-cross-setting/single`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ marketTypeIdx, useSingle }),
      }
    );
    if (res.ok) {
      const result = await res.json();
      if (result.ReturnCode === 0) {
        setMarketTypes((prev) =>
          prev.map((m) =>
            m.marketTypeIdx === marketTypeIdx
              ? { ...m, useSingle: useSingle === 1 }
              : m
          )
        );
      } else {
        alert(result.ReturnMessage);
      }
    }
  };

  const handleSave = async () => {
    if (!typeFlag || !typeSameMatch || selectedMarkets.length === 0) {
      alert("필수 항목입니다.");
      return;
    }
    const data = {
      crossSettingIdx,
      typeFlag,
      typeSameMatch,
      typeUse: typeSameMatch,
      crossSetting: JSON.stringify(selectedMarkets),
    };
    const url = crossSettingIdx
      ? `/api/admin/sport-cross-setting/update`
      : `${BACKEND_URL}/api/admin/sport-cross-setting`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.ReturnCode === 0) {
        alert("저장 완료!");
        setCrossSettingIdx("");
        setTypeFlag("");
        setTypeSameMatch("");
        setSelectedMarkets([]);
        fetchMarketTypes();
        fetchCrossSettings();
      } else {
        alert(result.ReturnMessage);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/sport-cross-setting/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crossSettingIdx: id }),
      }
    );
    if (res.ok) {
      const result = await res.json();
      if (result.ReturnCode === 0) {
        alert("삭제 완료!");
        fetchCrossSettings();
      } else {
        alert(result.ReturnMessage);
      }
    }
  };

  const handleEdit = (
    id: string,
    flag: string,
    same: string,
    settingCross: string
  ) => {
    const markets = JSON.parse(settingCross || "[]") as CrossMarket[];
    setCrossSettingIdx(id);
    setTypeFlag(flag);
    setTypeSameMatch(same);
    setSelectedMarkets(markets);
  };

  const handleInit = () => {
    setCrossSettingIdx("");
    setTypeFlag("");
    setTypeSameMatch("");
    setSelectedMarkets([]);
  };

  const getTypeFlagText = (flag: string) => {
    if (flag === "1") return "프리매치, 라이브";
    if (flag === "2") return "프리매치";
    return "라이브";
  };

  return (
    <>
      <h1 className="page-header">
        <a href="/admin/sport/cross/setting">
          <i className="fa fa-futbol me-2" />
          스포츠 조합 설정
        </a>
      </h1>
      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <div className="d-flex">
              <select
                className="form-select w-auto me-2 default-select2"
                value={sportIdx}
                onChange={(e) => setSportIdx(e.target.value)}
              >
                <option value="1">축구</option>
                <option value="2">아이스하키</option>
                <option value="3">농구</option>
                <option value="5">배구</option>
                <option value="6">미식축구</option>
                <option value="11">야구</option>
                <option value="58">리그오브레전드</option>
              </select>
              <select
                className="form-select w-auto me-2"
                value={typeCrossSpecial}
                onChange={(e) => setTypeCrossSpecial(e.target.value)}
              >
                <option value="">스페셜 구분</option>
                <option value="1">크로스</option>
                <option value="2">스페셜</option>
              </select>
              <a
                className="btn btn-lime text-white"
                href="javascript:void(0);"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-magnifying-glass me-2"></i>검색
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th>종목</th>
                <th>마켓타입ID</th>
                <th>원본 마켓명</th>
                <th>노출명</th>
                <th>마켓 그룹</th>
                <th>스페셜 구분</th>
                <th>단폴더</th>
              </tr>
            </thead>
            <tbody id="marketTypeList">
              {marketTypes.map((item) => (
                <tr key={item.marketTypeIdx}>
                  <td>{item.sportName}</td>
                  <td>{item.marketTypeIdx}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() =>
                      marketSelect({
                        value: item.marketTypeIdx,
                        text: `${item.sportName}-${item.marketTypeName}`,
                        all: 0,
                        sportIdx: item.sportIdx,
                      })
                    }
                  >
                    {item.marketTypeName}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() =>
                      marketSelect({
                        value: item.marketTypeIdx,
                        text:
                          item.displayName ||
                          `${item.sportName}-${item.marketTypeName}`,
                        all: 0,
                        sportIdx: item.sportIdx,
                      })
                    }
                  >
                    {item.displayName || ""}
                  </td>
                  <td>{getTypeFlagText(item.typeFlag.toString())}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() =>
                      marketSelect({
                        value: 100000 * item.sportIdx + item.typeCrossSpecial,
                        text: `${item.sportName}-${
                          item.typeCrossSpecial === 1
                            ? "크로스 타입 전체"
                            : "스페셜 타입 전체"
                        }`,
                        all: 1,
                        sportIdx: item.sportIdx,
                      })
                    }
                  >
                    {item.typeCrossSpecial === 1 ? "크로스" : "스페셜"}
                  </td>
                  <td>
                    <div className="form-check-inline me-0 form-switch">
                      <input
                        className="form-check-input w-35px"
                        type="checkbox"
                        name="sportCrossSettingSingle"
                        checked={item.useSingle}
                        onChange={(e) =>
                          handleSingleToggle(
                            item.marketTypeIdx,
                            e.target.checked ? 1 : 0
                          )
                        }
                        value={item.marketTypeIdx}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <div className="row">
            <div>
              <div
                className="panel panel-inverse"
                data-sortable-id="form-1"
                data-sortable="false"
              >
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <span className="me-2 pull-left">
                      <i className="fa fa-cog"></i>
                    </span>
                    게임 조합 추가
                  </h4>
                </div>
                <div className="panel-body">
                  <input
                    type="hidden"
                    name="crossSettingIdx"
                    value={crossSettingIdx}
                  />
                  <div className="row">
                    <div className="col">
                      <div className="d-flex bg-white">
                        <select
                          name="typeFlag"
                          className="form-select w-auto me-2"
                          value={typeFlag}
                          onChange={(e) => setTypeFlag(e.target.value)}
                        >
                          <option value="">적용 페이지</option>
                          <option value="1">프리매치, 라이브</option>
                          <option value="2">프리매치</option>
                          <option value="3">라이브</option>
                        </select>
                        <select
                          name="typeSameMatch"
                          className="form-select w-auto me-2"
                          value={typeSameMatch}
                          onChange={(e) => setTypeSameMatch(e.target.value)}
                        >
                          <option value="">조건</option>
                          <option value="1">동일 경기 조합 가능</option>
                          <option value="2">다른 경기 조합 불가</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <input
                        type="text"
                        id="marketIdxs"
                        className="form-control w-100"
                        value={selectedMarkets.map((m) => m.text).join(", ")}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      <i className="fa fa-save me-1"></i>
                      {crossSettingIdx ? "수정" : "저장"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleInit}
                    >
                      <i className="fa fa-xmark me-1"></i>초기화
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>적용 페이지</th>
                    <th>조건</th>
                    <th>구분</th>
                    <th>마켓 조합 내용</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {crossSettings.map((setting) => {
                    const markets = JSON.parse(
                      setting.crossSetting || "[]"
                    ) as CrossMarket[];
                    return (
                      <tr key={setting.id}>
                        <td>{getTypeFlagText(setting.typeFlag)}</td>
                        <td>동일 경기</td>
                        <td>조합 가능</td>
                        <td className="text-wrap">
                          {JSON.stringify(markets.map((m) => m.text))}
                        </td>
                        <td className="p-1">
                          <a
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              handleEdit(
                                setting.id,
                                setting.typeFlag,
                                setting.typeSameMatch,
                                setting.crossSetting
                              )
                            }
                          >
                            <i className="fa fa-pencil-alt me-1"></i>수정
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(setting.id)}
                          >
                            <i className="fas fa-trash-alt me-1"></i>삭제
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  );
}
