"use client";

import React, { Suspense, useEffect, useMemo, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface MarketType {
  marketTypeIdx: number;
  sportIdx?: number | null;
  sportName: string;
  marketTypeName: string;
  displayName?: string | null;
  sort?: number | null;
  specialType?: string | null;
  division?: string | null;
  prematchUseYN: number;
  liveUseYN: number;
  prematchUsePoint?: string | null;
  liveUsePoint?: string | null;
  prematchMinPrice?: string | number | null;
  prematchMaxPrice?: string | number | null;
  liveMinPrice?: string | number | null;
  liveMaxPrice?: string | number | null;
  updateUserName?: string | null;
  updateDate?: string | null;
  isHandicap?: number | null;
  isOverUnder?: number | null;
}

interface Filters {
  sportIdx: string;
  searchType: string;
  searchText: string;
}

interface ModalData {
  marketTypeIdx: string;
  sportIdx: string;
  sportName: string;
  marketTypeName: string;
  displayName: string;
  sort: string;
  prematchUseYN: boolean;
  liveUseYN: boolean;
  prematchUsePoint: string[];
  liveUsePoint: string[];
  prematchMinPrice: string;
  prematchMaxPrice: string;
  liveMinPrice: string;
  liveMaxPrice: string;
  updateUserName: string;
  updateDate: string;
  isHandicap: number;
  isOverUnder: number;
}

const sportOptions = [
  { value: "1", label: "축구" },
  { value: "11", label: "농구" },
  { value: "3", label: "야구" },
  { value: "5", label: "배구" },
  { value: "2", label: "테니스" },
  { value: "6", label: "하키" },
  { value: "58", label: "이스포츠" },
];

const searchTypeOptions = [
  { value: "0", label: "전체" },
  { value: "1", label: "마켓 타입명" },
  { value: "2", label: "노출명" },
];

const defaultModalData: ModalData = {
  marketTypeIdx: "",
  sportIdx: "",
  sportName: "",
  marketTypeName: "",
  displayName: "",
  sort: "",
  prematchUseYN: false,
  liveUseYN: false,
  prematchUsePoint: [],
  liveUsePoint: [],
  prematchMinPrice: "",
  prematchMaxPrice: "",
  liveMinPrice: "",
  liveMaxPrice: "",
  updateUserName: "",
  updateDate: "",
  isHandicap: 0,
  isOverUnder: 0,
};

const InactiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="21px"
    height="21px"
    fill="currentColor"
  >
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
  </svg>
);

const generateUsePoints = ({
  isHandicap,
  isOverUnder,
}: {
  isHandicap: number;
  isOverUnder: number;
}) => {
  const result: string[] = [];

  if (isHandicap !== 1) {
    return result;
  }

  if (isOverUnder === 0) {
    for (let i = -50; i < 50; i += 1) {
      result.push(`${i}`);
      result.push(`${i + 0.5}`);
    }
    result.push("50");
  } else if (isOverUnder === 1) {
    for (let i = 0; i < 300; i += 1) {
      result.push(`${i}`);
      result.push(`${i + 0.5}`);
    }
    result.push("300");
  }

  return result;
};

const splitPoints = (value?: string | null) =>
  value?.length ? value.split(",").filter((v) => v !== "") : [];

function SportMarketTypeSettingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters: Filters = useMemo(
    () => ({
      sportIdx: searchParams.get("sportIdx") || "1",
      searchType: searchParams.get("searchType") || "0",
      searchText: searchParams.get("searchText") || "",
    }),
    [searchParams]
  );

  const [sportIdx, setSportIdx] = useState(initialFilters.sportIdx);
  const [searchType, setSearchType] = useState(initialFilters.searchType);
  const [searchText, setSearchText] = useState(initialFilters.searchText);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  const [marketTypes, setMarketTypes] = useState<MarketType[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState<ModalData>(defaultModalData);
  const [usePointOptions, setUsePointOptions] = useState<string[]>([]);

  useEffect(() => {
    const syncedFilters: Filters = {
      sportIdx: initialFilters.sportIdx,
      searchType: initialFilters.searchType,
      searchText: initialFilters.searchText,
    };

    setSportIdx(syncedFilters.sportIdx);
    setSearchType(syncedFilters.searchType);
    setSearchText(syncedFilters.searchText);
    setAppliedFilters((prev) =>
      prev.sportIdx === syncedFilters.sportIdx &&
      prev.searchType === syncedFilters.searchType &&
      prev.searchText === syncedFilters.searchText
        ? prev
        : syncedFilters
    );
  }, [
    initialFilters.sportIdx,
    initialFilters.searchType,
    initialFilters.searchText,
  ]);

  const fetchMarketTypes = React.useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = new URLSearchParams();
      if (appliedFilters.sportIdx)
        params.set("sportIdx", appliedFilters.sportIdx);
      if (appliedFilters.searchType)
        params.set("searchType", appliedFilters.searchType);
      if (appliedFilters.searchText)
        params.set("searchText", appliedFilters.searchText);

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-market-type-setting?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch market types: ${response.status}`);
      }

      const data = await response.json();
      const items =
        data?.data?.items ||
        data?.data?.marketTypes ||
        data?.items ||
        data?.marketTypes ||
        [];

      if (Array.isArray(items)) {
        setMarketTypes(items);
      } else {
        setMarketTypes([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching market types:", error);
      setMarketTypes([]);
      const message =
        error instanceof Error ? error.message : "데이터를 불러오지 못했습니다.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    fetchMarketTypes();
  }, [fetchMarketTypes]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sportIdx) params.set("sportIdx", sportIdx);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);

    router.push(`/sport/market/type/setting?${params.toString()}`);
    setAppliedFilters({
      sportIdx,
      searchType,
      searchText,
    });
  };

  const getDivisionLabel = (market: MarketType) => {
    if (market.division) {
      return market.division;
    }

    const divisions: string[] = [];
    if (market.prematchUseYN === 1) divisions.push("프리매치");
    if (market.liveUseYN === 1) divisions.push("라이브");
    return divisions.join(", ");
  };

  const handleEditClick = (market: MarketType) => {
    const isHandicap = market.isHandicap ?? 0;
    const isOverUnder = market.isOverUnder ?? 0;
    setUsePointOptions(generateUsePoints({ isHandicap, isOverUnder }));

    setModalData({
      marketTypeIdx: market.marketTypeIdx?.toString() || "",
      sportIdx: market.sportIdx?.toString() || appliedFilters.sportIdx,
      sportName: market.sportName || "",
      marketTypeName: market.marketTypeName || "",
      displayName: market.displayName || "",
      sort: market.sort?.toString() || "",
      prematchUseYN: market.prematchUseYN === 1,
      liveUseYN: market.liveUseYN === 1,
      prematchUsePoint: splitPoints(market.prematchUsePoint),
      liveUsePoint: splitPoints(market.liveUsePoint),
      prematchMinPrice: market.prematchMinPrice?.toString() || "",
      prematchMaxPrice: market.prematchMaxPrice?.toString() || "",
      liveMinPrice: market.liveMinPrice?.toString() || "",
      liveMaxPrice: market.liveMaxPrice?.toString() || "",
      updateUserName: market.updateUserName || "",
      updateDate: market.updateDate || "",
      isHandicap,
      isOverUnder,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!modalData.marketTypeIdx) {
      alert("필수 값이 누락되었습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("sportIdx", modalData.sportIdx);
      formData.append("marketTypeIdx", modalData.marketTypeIdx);
      formData.append("displayName", modalData.displayName);
      formData.append("sort", modalData.sort);
      formData.append("prematchUseYN", modalData.prematchUseYN ? "1" : "0");
      formData.append("liveUseYN", modalData.liveUseYN ? "1" : "0");
      formData.append("prematchUsePoint", modalData.prematchUsePoint.join(","));
      formData.append("liveUsePoint", modalData.liveUsePoint.join(","));
      formData.append("prematchMinPrice", modalData.prematchMinPrice);
      formData.append("prematchMaxPrice", modalData.prematchMaxPrice);
      formData.append("liveMinPrice", modalData.liveMinPrice);
      formData.append("liveMaxPrice", modalData.liveMaxPrice);

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-market-type-setting/${modalData.marketTypeIdx}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.ReturnMessage || "저장에 실패했습니다.");
      }

      const result = await response.json();
      if (result?.ReturnCode === 0 || result?.success) {
        alert("저장되었습니다.");
        setIsModalOpen(false);
        await fetchMarketTypes();
      } else {
        throw new Error(result?.ReturnMessage || "??? ??????.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLSelectElement && target.multiple) {
      const values = Array.from(target.selectedOptions).map(
        (option) => option.value
      );
      setModalData((prev) => ({
        ...prev,
        [name]: values,
      }));
      return;
    }

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setModalData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const modalClasses = `modal fade${isModalOpen ? " show" : ""}`;
  const modalStyle: React.CSSProperties = {
    display: isModalOpen ? "block" : "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/sport/market/type/setting">
          <i className="fa fa-futbol me-2"></i>스포츠 마켓 설정
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form
              action="/sport/market/type/setting"
              method="get"
              onSubmit={handleSearch}
            >
              <div className="d-flex">
                <select
                  name="sportIdx"
                  id="sportIdx"
                  className="form-select w-auto me-2 default-select2"
                  value={sportIdx}
                  onChange={(e) => setSportIdx(e.target.value)}
                >
                  {sportOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  name="searchType"
                  className="form-select w-auto me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  {searchTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button type="submit" className="btn btn-lime" id="btnSearch">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto"></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 mb-2">
              {errorMessage}
            </div>
          )}
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th rowSpan={2} className="align-middle">
                  번호
                </th>
                <th rowSpan={2} className="align-middle">
                  종목
                </th>
                <th rowSpan={2} className="align-middle">
                  마켓 타입명
                </th>
                <th rowSpan={2} className="align-middle">
                  노출명
                </th>
                <th rowSpan={2} className="align-middle">
                  정렬
                </th>
                <th rowSpan={2} className="align-middle">
                  스페셜 구분
                </th>
                <th rowSpan={2} className="align-middle">
                  구분
                </th>
                <th colSpan={2}>사용여부</th>
                <th rowSpan={2} className="align-middle">
                  설정
                </th>
                <th rowSpan={2} className="align-middle">
                  마지막 수정시간
                </th>
              </tr>
              <tr>
                <th>프리매치</th>
                <th>라이브</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="text-center">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    데이터 로딩 중...
                  </td>
                </tr>
              ) : marketTypes.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                marketTypes.map((market: MarketType, index: number) => (
                  <tr key={market.marketTypeIdx || index}>
                    <td>{index + 1}</td>
                    <td>{market.sportName}</td>
                    <td>{market.marketTypeName}</td>
                    <td>{market.displayName || ""}</td>
                    <td>{market.sort ?? ""}</td>
                    <td>{market.specialType || ""}</td>
                    <td>{getDivisionLabel(market)}</td>
                    <td>
                      {market.prematchUseYN === 1 ? (
                        <i className="fas fa-check text-blue"></i>
                      ) : (
                        <span className="text-red">
                          <InactiveIcon />
                        </span>
                      )}
                    </td>
                    <td>
                      {market.liveUseYN === 1 ? (
                        <i className="fas fa-check text-blue"></i>
                      ) : (
                        <span className="text-red">
                          <InactiveIcon />
                        </span>
                      )}
                    </td>
                    <td className="p-1" style={{ whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary w-60px text-white"
                        onClick={() => handleEditClick(market)}
                      >
                        <i className="fa fa-pencil-alt me-1"></i>수정
                      </button>
                    </td>
                    <td>{market.updateDate || ""}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={modalClasses}
        id="modalMarketType"
        tabIndex={-1}
        aria-hidden={!isModalOpen}
        data-bs-backdrop="static"
        style={modalStyle}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "1100px" }}
        >
          <div className="modal-content">
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-futbol me-1"></i>
                  </span>
                  <span id="modalTitle">스포츠 마켓 설정</span>
                </h4>
                <div className="panel-heading-btn">
                  <a
                    href="#"
                    className="btn btn-xs btn-icon btn-default"
                    data-toggle="panel-expand"
                    data-tooltip-init="true"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-expand"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-xs btn-icon btn-danger"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseModal();
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form
                  id="sportMarketTypeSetting"
                  action="/sport/market/type/setting"
                  method="post"
                  onSubmit={handleModalSubmit}
                >
                  <input
                    type="hidden"
                    name="sportIdx"
                    value={modalData.sportIdx}
                  />
                  <input
                    type="hidden"
                    name="marketTypeIdx"
                    value={modalData.marketTypeIdx}
                  />

                  <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                    <tbody>
                      <tr>
                        <th className="w-200px bg-gray-300">원 마켓타입명</th>
                        <td className="w-300px" id="marketTypeName">
                          {modalData.marketTypeName}
                        </td>
                        <th className="w-200px bg-gray-300">종목명</th>
                        <td className="w-300px" id="sportName">
                          {modalData.sportName}
                        </td>
                      </tr>
                      <tr>
                        <th className="w-200px bg-gray-300">노출명</th>
                        <td className="w-300px p-1">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            className="form-control"
                            value={modalData.displayName}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th className="w-200px bg-gray-300">순서</th>
                        <td className="w-300px p-1">
                          <input
                            type="text"
                            name="sort"
                            id="sort"
                            className="form-control w-80px number"
                            value={modalData.sort}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">프리매치 사용</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="prematchUseYN"
                              name="prematchUseYN"
                              checked={modalData.prematchUseYN}
                              onChange={handleInputChange}
                            />
                          </div>
                        </td>
                        <th className="bg-gray-300">라이브 사용</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="liveUseYN"
                              name="liveUseYN"
                              checked={modalData.liveUseYN}
                              onChange={handleInputChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {modalData.isHandicap === 0 &&
                      modalData.isOverUnder === 0 ? null : (
                        <tr id="usePoint">
                          <th className="bg-gray-300">
                            프리매치 전용 기준점
                          </th>
                          <td className="p-1">
                            <select
                              id="prematchUsePoint"
                              name="prematchUsePoint"
                              className="form-control"
                              multiple
                              value={modalData.prematchUsePoint}
                              onChange={handleInputChange}
                            >
                              {usePointOptions.map((option) => (
                                <option key={`pre-${option}`} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </td>
                          <th className="bg-gray-300">라이브 전용 기준점</th>
                          <td className="p-1">
                            <select
                              id="liveUsePoint"
                              name="liveUsePoint"
                              className="form-control"
                              multiple
                              value={modalData.liveUsePoint}
                              onChange={handleInputChange}
                            >
                              {usePointOptions.map((option) => (
                                <option key={`live-${option}`} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th className="bg-gray-300">프리매치 배당 설정</th>
                        <td className="p-1">
                          <div className="row ms-1">
                            <label className="col-form-label w-auto">
                              최소
                            </label>
                            <input
                              type="text"
                              name="prematchMinPrice"
                              id="prematchMinPrice"
                              className="form-control w-80px commission"
                              value={modalData.prematchMinPrice}
                              onChange={handleInputChange}
                            />
                            <label className="col-form-label w-auto">
                              최대
                            </label>
                            <input
                              type="text"
                              name="prematchMaxPrice"
                              id="prematchMaxPrice"
                              className="form-control w-80px commission"
                              value={modalData.prematchMaxPrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </td>
                        <th className="bg-gray-300">라이브 배당 설정</th>
                        <td className="p-1">
                          <div className="row ms-1">
                            <label className="col-form-label w-auto">
                              최소
                            </label>
                            <input
                              type="text"
                              name="liveMinPrice"
                              id="liveMinPrice"
                              className="form-control w-80px commission"
                              value={modalData.liveMinPrice}
                              onChange={handleInputChange}
                            />
                            <label className="col-form-label w-auto">
                              최대
                            </label>
                            <input
                              type="text"
                              name="liveMaxPrice"
                              id="liveMaxPrice"
                              className="form-control w-80px commission"
                              value={modalData.liveMaxPrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">수정자</th>
                        <td id="updateUserName">{modalData.updateUserName}</td>
                        <th className="bg-gray-300">수정일</th>
                        <td id="updateDate">{modalData.updateDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                        disabled={isSubmitting}
                      >
                        <i className="fa fa-save me-1"></i>??
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm text-white"
                        data-bs-dismiss="modal"
                        onClick={handleCloseModal}
                      >
                        <i className="fa-solid fa-xmark me-2"></i>??
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="modal-spinner"
        className={`modal${isSubmitting ? " show" : ""}`}
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-hidden={!isSubmitting}
        style={{
          display: isSubmitting ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            ??????. ?? ???????.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function SportMarketTypeSettingPage() {
  return (
    <Suspense fallback={null}>
      <SportMarketTypeSettingPageInner />
    </Suspense>
  );
}
