"use client";

import Layout from "@/components/Layout";
import { HexColorPicker } from "react-colorful";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface DistributorLevel {
  step: number;
  idx: number;
  fullName: string;
  shortName: string;
  color: string;
}

type LevelFormState = Record<
  number,
  {
    fullName: string;
    shortName: string;
    color: string;
  }
>;

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

const API_BASE_URL = ""; // Use relative path for proxy

const PRESET_COLORS = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#ffffff",
  "#f2f2f2",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
  "#ea9999",
  "#f9cb9c",
  "#ffe599",
  "#b6d7a8",
  "#a2c4c9",
  "#9fc5e8",
  "#b4a7d6",
  "#d5a6bd",
  "#e06666",
  "#f6b26b",
  "#ffd966",
  "#93c47d",
  "#76a5af",
  "#6fa8dc",
  "#8e7cc3",
  "#c27ba0",
  "#cc0000",
  "#e69138",
  "#f1c232",
  "#6aa84f",
  "#45818e",
  "#3d85c6",
  "#674ea7",
  "#a64d79",
  "#990000",
  "#b45f06",
  "#bf9000",
  "#38761d",
  "#134f5c",
  "#0b5394",
  "#351c75",
  "#741b47",
];

const sanitizeHex = (value: string) => {
  if (!value) return "#000000";
  const trimmed = value.trim();
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  return withHash.slice(0, 7).toUpperCase();
};

const normalizeLevel = (payload: any): DistributorLevel => ({
  idx: Number(payload?.idx ?? payload?.levelIdx ?? 0),
  step: Number(payload?.step ?? 0),
  fullName: String(payload?.fullName ?? payload?.full_name ?? ""),
  shortName: String(payload?.shortName ?? payload?.short_name ?? ""),
  color: sanitizeHex(payload?.color ?? "#000000"),
});

interface ColorPickerInputProps {
  id: string;
  nameAttr: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPickerInput({
  id,
  nameAttr,
  value,
  onChange,
}: ColorPickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleValueChange = (nextValue: string) => {
    onChange(sanitizeHex(nextValue));
  };

  return (
    <div className="color-picker-wrapper" ref={containerRef}>
      <div className="input-group input-group-sm">
        <input
          type="text"
          className="form-control"
          id={id}
          name={nameAttr}
          value={value}
          onChange={(event) => handleValueChange(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary dropdown-toggle color-picker-toggle"
          aria-label="색상 선택"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            backgroundColor: value,
            borderRadius: "4px",
          }}
        ></button>
      </div>
      {isOpen && (
        <div className="color-picker-popover card shadow">
          <div className="card-body">
            <div className="preset-grid mb-3">
              {PRESET_COLORS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  className={`preset-swatch ${
                    preset.toLowerCase() === value.toLowerCase() ? "active" : ""
                  }`}
                  style={{ backgroundColor: preset }}
                  onClick={() => handleValueChange(preset)}
                  aria-label={`색상 ${preset}`}
                ></button>
              ))}
            </div>
            <div className="picker-panel mb-3">
              <HexColorPicker color={value} onChange={handleValueChange} />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => setIsOpen(false)}
              >
                Choose
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .color-picker-wrapper {
          position: relative;
        }
        .color-picker-toggle {
          width: 2.25rem;
          height: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 1px solid #dee2e6 !important;
          border-left: none !important;
          position: relative;
        }
        .color-picker-popover {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          z-index: 1050;
          width: 280px;
        }
        .preset-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 4px;
        }
        .preset-swatch {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 0;
          cursor: pointer;
        }
        .preset-swatch.active {
          box-shadow: 0 0 0 2px #0d6efd;
        }
        .picker-panel :global(.react-colorful) {
          width: 100% !important;
          height: 180px !important;
        }
      `}</style>
    </div>
  );
}

export default function DistributorSettingPage() {
  const [levels, setLevels] = useState<DistributorLevel[]>([]);
  const [formState, setFormState] = useState<LevelFormState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertState>(null);
  const [savingIdx, setSavingIdx] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    fullName: "",
    shortName: "",
    color: "#000000",
  });

  const sortedLevels = useMemo(
    () => [...levels].sort((a, b) => a.step - b.step),
    [levels]
  );

  const syncFormState = useCallback((data: DistributorLevel[]) => {
    setFormState(
      data.reduce((acc, level) => {
        acc[level.idx] = {
          fullName: level.fullName,
          shortName: level.shortName,
          color: level.color,
        };
        return acc;
      }, {} as LevelFormState)
    );
  }, []);

  const fetchLevels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/distributor/levels`,
        {
          credentials: "include",
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload?.error || "레벨 정보를 불러오지 못했습니다.");
      }

      const data: DistributorLevel[] = Array.isArray(payload.data)
        ? payload.data.map(normalizeLevel)
        : [];
      setLevels(data);
      syncFormState(data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "레벨 정보를 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [syncFormState]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  useEffect(() => {
    if (!alert) return;
    const timeout = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const handleInputChange = (
    idx: number,
    field: keyof LevelFormState[number],
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [idx]: {
        ...prev[idx],
        [field]: field === "color" ? sanitizeHex(value) : value,
      },
    }));
  };

  const handleSave = async (idx: number) => {
    const values = formState[idx];
    const current = levels.find((level) => level.idx === idx);

    if (!values || !current) {
      setAlert({ type: "error", message: "저장할 단계를 찾을 수 없습니다." });
      return;
    }

    if (!values.fullName.trim() || !values.shortName.trim()) {
      setAlert({
        type: "error",
        message: "이름과 사용명을 모두 입력해주세요.",
      });
      return;
    }

    setSavingIdx(idx);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/distributor/levels/${idx}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: values.fullName.trim(),
            shortName: values.shortName.trim(),
            color: sanitizeHex(values.color),
            step: current.step,
          }),
        }
      );

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload?.error || "파트너 단계를 저장하지 못했습니다.");
      }

      const updated = normalizeLevel(payload.data);
      setLevels((prev) =>
        prev.map((level) => (level.idx === updated.idx ? updated : level))
      );
      setFormState((prev) => ({
        ...prev,
        [updated.idx]: {
          fullName: updated.fullName,
          shortName: updated.shortName,
          color: updated.color,
        },
      }));
      setAlert({ type: "success", message: "파트너 단계가 저장되었습니다." });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message:
          err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.",
      });
    } finally {
      setSavingIdx(null);
    }
  };

  const handleCreate = async (event: MouseEvent) => {
    event.preventDefault();

    if (!modalInputs.fullName.trim() || !modalInputs.shortName.trim()) {
      setAlert({
        type: "error",
        message: "새 단계의 이름과 사용명을 입력해주세요.",
      });
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/distributor/levels`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: modalInputs.fullName.trim(),
            shortName: modalInputs.shortName.trim(),
            color: sanitizeHex(modalInputs.color),
          }),
        }
      );

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload?.error || "파트너 단계를 추가하지 못했습니다.");
      }

      const created = normalizeLevel(payload.data);
      const nextLevels = [...levels, created];
      setLevels(nextLevels);
      syncFormState(nextLevels);
      setModalInputs({ fullName: "", shortName: "", color: "#000000" });
      setAlert({
        type: "success",
        message: "새 파트너 단계가 추가되었습니다.",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "단계 추가 중 오류가 발생했습니다.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/distributorSetting.html">
          <i className="fa fa-users me-2"></i>파트너 단계 설정
        </a>
        <small></small>
      </h1>

      {alert && (
        <div
          className={`alert ${
            alert.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      <div className="row">
        <div className="col-xl-6 col-md-6">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="text-center" style={{ width: "1%" }}>
                  단계
                </th>
                <th className="text-center width-70">이름</th>
                <th className="text-center width-70">사용명</th>
                <th className="text-center">색 선택</th>
                <th className="text-center" style={{ width: "1%" }}>
                  기능
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    레벨 정보를 불러오는 중입니다...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td colSpan={5} className="text-center text-danger py-4">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && sortedLevels.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    등록된 파트너 단계가 없습니다.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                sortedLevels.map((level) => {
                  const values = formState[level.idx] || {
                    fullName: "",
                    shortName: "",
                    color: "#000000",
                  };
                  return (
                    <tr key={level.idx}>
                      <td>{level.step}</td>
                      <td>
                        <input
                          type="text"
                          name={`userDistributorFullName[${level.idx}]`}
                          id={`userDistributorFullName_${level.idx}`}
                          className="form-control"
                          value={values.fullName}
                          onChange={(event) =>
                            handleInputChange(
                              level.idx,
                              "fullName",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`userDistributorName[${level.idx}]`}
                          id={`userDistributorName_${level.idx}`}
                          className="form-control"
                          value={values.shortName}
                          onChange={(event) =>
                            handleInputChange(
                              level.idx,
                              "shortName",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <ColorPickerInput
                          id={`userDistributorColor_${level.idx}`}
                          nameAttr={`userDistributorColor[${level.idx}]`}
                          value={values.color}
                          onChange={(nextColor) =>
                            handleInputChange(level.idx, "color", nextColor)
                          }
                        />
                      </td>
                      <td>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary btn-sm text-white"
                          onClick={(event: MouseEvent) => {
                            event.preventDefault();
                            handleSave(level.idx);
                          }}
                          aria-disabled={savingIdx === level.idx}
                        >
                          <i className="fas fa-edit me-1"></i>
                          {savingIdx === level.idx ? "저장 중..." : "수정"}
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="row">
            <div className="col text-end">
              <a
                href="javascript:void(0);"
                className="btn btn-success btn-sm text-white"
                data-bs-toggle="modal"
                data-bs-target="#modalManager"
              >
                <i className="fas fa-plus me-1"></i>단계 추가
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalManager"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa fa-user-plus"></i>
                  </span>
                  <span id="modalTitle">파트너 단계 추가</span>
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
                <table className="table mb-3">
                  <thead>
                    <tr>
                      <th className="text-center">이름</th>
                      <th className="text-center">사용명</th>
                      <th className="text-center">색선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center p-2">
                        <input
                          type="text"
                          id="userDistributorFullName"
                          className="form-control"
                          value={modalInputs.fullName}
                          onChange={(event) =>
                            setModalInputs((prev) => ({
                              ...prev,
                              fullName: event.target.value,
                            }))
                          }
                        />
                      </td>
                      <td className="text-center p-2">
                        <input
                          type="text"
                          id="userDistributorName"
                          className="form-control"
                          value={modalInputs.shortName}
                          onChange={(event) =>
                            setModalInputs((prev) => ({
                              ...prev,
                              shortName: event.target.value,
                            }))
                          }
                        />
                      </td>
                      <td className="text-center p-2">
                        <ColorPickerInput
                          id="userDistributorColor"
                          nameAttr="userDistributorColor"
                          value={modalInputs.color}
                          onChange={(nextColor) =>
                            setModalInputs((prev) => ({
                              ...prev,
                              color: nextColor,
                            }))
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="row">
                  <div className="col text-center">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-success btn-sm text-white"
                      onClick={handleCreate}
                      aria-disabled={isCreating}
                    >
                      <i className="fa fa-save me-1"></i>
                      {isCreating ? "저장 중..." : "저장"}
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-secondary btn-sm text-white"
                      data-bs-dismiss="modal"
                    >
                      <i className="fa-solid fa-xmark me-2"></i>닫기
                    </a>
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
