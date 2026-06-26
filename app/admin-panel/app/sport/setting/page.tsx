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

type SortField = "sort" | "sportName" | "displayName" | "updatedAt";

interface SportSettingRecord {
  no: number;
  sportIdx: number;
  sportName: string;
  displayName: string;
  sortOrder: number | null;
  useYN: number;
  deadlineSeconds: number;
  imageUrl: string;
  updateUserName: string;
  updatedAt: string;
}

interface ModalFormState {
  sportName: string;
  displayName: string;
  useYN: boolean;
  sort: string;
  deadline: string;
  imageUrl: string;
  updateUserName: string;
  updateDate: string;
}

const defaultModalState: ModalFormState = {
  sportName: "",
  displayName: "",
  useYN: false,
  sort: "",
  deadline: "",
  imageUrl: "",
  updateUserName: "",
  updateDate: "",
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

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "";
  }
  const date =
    typeof value === "string" ? new Date(value.replace(" ", "T")) : value;
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};

const deadlineText = (seconds?: number | null) => `${Number(seconds ?? 0)} 초`;

const renderSortIndicator = (
  field: SortField,
  sortState: { field: SortField; order: "asc" | "desc" }
) => {
  if (sortState.field !== field) return null;
  return (
    <span className="ms-1">
      {sortState.order === "asc" ? (
        <i className="fa-solid fa-caret-up" />
      ) : (
        <i className="fa-solid fa-caret-down" />
      )}
    </span>
  );
};

export default function SportSettingPage() {
  const [sports, setSports] = useState<SportSettingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchType, setSearchType] = useState("0");
  const [searchInput, setSearchInput] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    searchType: "0",
    searchText: "",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    totalPages: 1,
  });

  const [sort, setSort] = useState<{ field: SortField; order: "asc" | "desc" }>(
    { field: "sort", order: "asc" }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSportIdx, setSelectedSportIdx] = useState<number | null>(null);
  const [formState, setFormState] = useState<ModalFormState>(defaultModalState);

  const modalClasses = useMemo(
    () => `modal fade${isModalOpen ? " show" : ""}`,
    [isModalOpen]
  );

  const modalStyle = useMemo(
    () => ({ display: isModalOpen ? "block" : "none" }),
    [isModalOpen]
  );

  const fetchSportSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        searchType: appliedFilters.searchType,
        searchText: appliedFilters.searchText,
        sortField: sort.field,
        sortOrder: sort.order,
      });

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-setting?${params.toString()}`,
        {
          credentials: "include",
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(
          json.ReturnMessage || "스포츠 설정을 불러오지 못했습니다."
        );
      }

      const items = (json.data?.items || []).map((item: any) => ({
        no: item.no ?? 0,
        sportIdx: item.sportIdx,
        sportName: item.sportName,
        displayName: item.displayName ?? "",
        sortOrder: item.sortOrder ?? null,
        useYN: item.useYN ?? 0,
        deadlineSeconds: item.deadlineSeconds ?? 0,
        imageUrl: item.imageUrl ?? "",
        updateUserName: item.updateUserName ?? "",
        updatedAt: formatDateTime(item.updatedAt),
      }));

      setSports(items);
      setPaginationInfo({
        total: json.data?.pagination?.total ?? items.length,
        totalPages: json.data?.pagination?.totalPages ?? 1,
      });
    } catch (err: any) {
      console.error("Failed to fetch sport settings:", err);
      setError(err?.message || "데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, appliedFilters, sort]);

  useEffect(() => {
    fetchSportSettings();
  }, [fetchSportSettings]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters({
      searchType,
      searchText: searchInput.trim(),
    });
  };

  const handleEditClick = (sport: SportSettingRecord) => {
    setSelectedSportIdx(sport.sportIdx);
    setFormState({
      sportName: sport.sportName,
      displayName: sport.displayName,
      useYN: sport.useYN === 1,
      sort: sport.sortOrder !== null ? String(sport.sortOrder) : "",
      deadline: String(sport.deadlineSeconds ?? 0),
      imageUrl: sport.imageUrl,
      updateUserName: sport.updateUserName,
      updateDate: sport.updatedAt,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSportIdx(null);
    setFormState(defaultModalState);
  };

  const handleFormChange =
    (field: keyof ModalFormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { type, value } = event.target;
      const newValue =
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value;
      setFormState((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    };

  const handleModalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedSportIdx == null) return;

    setGlobalLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-setting/${selectedSportIdx}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: formState.displayName,
            useYN: formState.useYN ? 1 : 0,
            sortOrder: formState.sort,
            deadlineSeconds: formState.deadline,
            imageUrl: formState.imageUrl,
          }),
        }
      );

      const json = await response.json();
      if (!response.ok || json.ReturnCode !== 0) {
        throw new Error(json.ReturnMessage || "저장에 실패했습니다.");
      }

      alert(json.ReturnMessage || "저장되었습니다.");
      await fetchSportSettings();
      handleModalClose();
    } catch (err: any) {
      console.error("Failed to update sport setting:", err);
      alert(err?.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleSortChange = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (nextPage: number) => {
    setPage((prev) => {
      const totalPages = paginationInfo.totalPages || 1;
      if (nextPage < 1 || nextPage > totalPages) {
        return prev;
      }
      return nextPage;
    });
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/sport/setting">
          <i className="fa fa-futbol me-2"></i>스포츠 종목 설정
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2 flex-wrap gap-2 align-items-center">
            <form
              className="d-flex flex-wrap gap-2"
              onSubmit={handleSearchSubmit}
            >
              <select
                name="searchType"
                className="form-select w-auto"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="0">전체</option>
                <option value="1">원본 종목명</option>
                <option value="2">노출명</option>
              </select>

              <input
                type="text"
                name="searchText"
                id="searchText"
                className="form-control w-150px"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <button className="btn btn-lime" id="btnSearch">
                <i className="fa-solid fa-magnifying-glass me-2" />
                검색
              </button>
            </form>
            <div className="ms-auto d-flex align-items-center gap-2">
              <label className="mb-0">페이지당</label>
              <select
                className="form-select w-auto"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th style={{ width: "80px" }}>번호</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("sportName")}
                >
                  원본 종목명
                  {renderSortIndicator("sportName", sort)}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("displayName")}
                >
                  노출명
                  {renderSortIndicator("displayName", sort)}
                </th>
                <th>표시이미지</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("sort")}
                >
                  정렬
                  {renderSortIndicator("sort", sort)}
                </th>
                <th>사용여부</th>
                <th>베팅 마감시간</th>
                <th>설정</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("updatedAt")}
                >
                  마지막 수정시간
                  {renderSortIndicator("updatedAt", sort)}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9}>
                    <div className="d-flex justify-content-center align-items-center py-4">
                      <div
                        className="spinner-border text-primary me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      데이터를 불러오는 중입니다...
                    </div>
                  </td>
                </tr>
              ) : sports.length === 0 ? (
                <tr>
                  <td colSpan={9}>등록된 종목이 없습니다.</td>
                </tr>
              ) : (
                sports.map((sport) => (
                  <tr key={sport.sportIdx}>
                    <td>{sport.no}</td>
                    <td>{sport.sportName}</td>
                    <td>{sport.displayName}</td>
                    <td className="p-1">
                      {sport.imageUrl && (
                        <img
                          src={sport.imageUrl}
                          alt={`${sport.sportName} 이미지`}
                          style={{ width: "auto", height: "30px" }}
                        />
                      )}
                    </td>
                    <td>{sport.sortOrder ?? ""}</td>
                    <td>
                      {sport.useYN === 1 ? (
                        <i className="fas fa-check text-blue" />
                      ) : (
                        <span className="text-red">
                          <InactiveIcon />
                        </span>
                      )}
                    </td>
                    <td>{deadlineText(sport.deadlineSeconds)}</td>
                    <td className="p-1" style={{ whiteSpace: "nowrap" }}>
                      <a
                        href="#"
                        className="btn btn-sm btn-primary w-60px text-white"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEditClick(sport);
                        }}
                      >
                        <i className="fa fa-pencil-alt me-1" />
                        수정
                      </a>
                    </td>
                    <td>{sport.updatedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
            <div>
              총 {paginationInfo.total}건 / {paginationInfo.totalPages}페이지
            </div>
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                이전
              </button>
              <span className="btn btn-outline-secondary disabled">
                {page} / {paginationInfo.totalPages || 1}
              </span>
              <button
                className="btn btn-outline-secondary"
                disabled={page >= (paginationInfo.totalPages || 1)}
                onClick={() => handlePageChange(page + 1)}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={modalClasses}
        id="modalSport"
        tabIndex={-1}
        aria-hidden={!isModalOpen}
        data-bs-backdrop="static"
        style={modalStyle}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "900px" }}
        >
          <div className="modal-content">
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-futbol me-1" />
                  </span>
                  <span id="modalTitle">스포츠 종목 설정</span>
                </h4>
                <div className="panel-heading-btn">
                  <a
                    href="javascript:;"
                    className="btn btn-xs btn-icon btn-default"
                    data-toggle="panel-expand"
                    data-tooltip-init="true"
                  >
                    <i className="fa fa-expand" />
                  </a>
                  <button
                    type="button"
                    className="btn btn-xs btn-icon btn-danger"
                    onClick={handleModalClose}
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
              <div className="panel-body">
                <form
                  id="sportSetting"
                  action="/sport/setting"
                  method="post"
                  onSubmit={handleModalSubmit}
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="BjlqAVXKTlyDRhwk9lpmthJm7KqUb0YSkSJLGS6h"
                  />
                  <input
                    type="hidden"
                    id="sportIdx"
                    name="sportIdx"
                    value={selectedSportIdx ?? ""}
                  />
                  <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                    <tbody>
                      <tr>
                        <th className="w-150px bg-gray-300">원본 종목명</th>
                        <td className="w-300px" id="sportName">
                          {formState.sportName}
                        </td>
                        <th className="w-150px bg-gray-300">노출명</th>
                        <td className="w-300px p-1">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            className="form-control"
                            value={formState.displayName}
                            onChange={handleFormChange("displayName")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">사용유무</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="useYN"
                              name="useYN"
                              checked={formState.useYN}
                              onChange={handleFormChange("useYN")}
                            />
                          </div>
                        </td>
                        <th className="bg-gray-300">정렬</th>
                        <td className="p-1">
                          <input
                            type="text"
                            name="sort"
                            id="sort"
                            className="form-control w-80px number"
                            value={formState.sort}
                            onChange={handleFormChange("sort")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">베팅 마감시간</th>
                        <td className="p-1">
                          <div className="row ms-1">
                            <input
                              type="text"
                              name="deadline"
                              id="deadline"
                              className="form-control w-80px number"
                              value={formState.deadline}
                              onChange={handleFormChange("deadline")}
                            />
                            <label className="col-form-label w-auto">초</label>
                          </div>
                        </td>
                        <th className="bg-gray-300">종목 이미지</th>
                        <td className="p-1">
                          <div className="d-flex flex-column flex-md-row gap-2">
                            {formState.imageUrl && (
                              <img
                                id="oldImage"
                                src={formState.imageUrl}
                                alt={`${formState.sportName} 이미지`}
                                style={{ width: "auto", height: "30px" }}
                              />
                            )}
                            <input
                              type="text"
                              name="imageUrl"
                              id="imageUrl"
                              className="form-control w-250px"
                              value={formState.imageUrl}
                              onChange={handleFormChange("imageUrl")}
                              placeholder="/storage/sports/images/example.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">수정자</th>
                        <td id="updateUserName">{formState.updateUserName}</td>
                        <th className="bg-gray-300">수정 시간</th>
                        <td id="updateDate">{formState.updateDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                      >
                        <i className="fa fa-save me-1" />
                        저장
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm text-white ms-2"
                        onClick={handleModalClose}
                      >
                        <i className="fa-solid fa-xmark me-2" />
                        닫기
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <div className="modal-backdrop fade show" />}

      {globalLoading && (
        <div
          id="modal-spinner"
          className="modal show"
          data-bs-backdrop="static"
          tabIndex={-1}
          aria-hidden="false"
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
              />
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
        <i className="fa fa-angle-up" />
      </a>
    </Layout>
  );
}
