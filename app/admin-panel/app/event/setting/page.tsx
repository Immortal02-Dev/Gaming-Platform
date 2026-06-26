"use client";

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

interface ChargeEvent {
  chargeEventIdx: number;
  stratTime: string;
  endTime: string;
  eventBonusCommission: string;
  eventBonusLimit: string;
  eventUseYN: number;
  created_at: string;
  updated_at: string;
}

export default function EventSettingPage() {
  const [chargeEvents, setChargeEvents] = useState<ChargeEvent[]>([]);
  const [loading, setLoading] = useState(false);

  // General event settings state
  const [eventSettings, setEventSettings] = useState<Record<string, string>>(
    {},
  );
  const [generalLoading, setGeneralLoading] = useState(false);

  // Modal form state
  const [modalStratTime, setModalStratTime] = useState("");
  const [modalEndTime, setModalEndTime] = useState("");
  const [modalBonusCommission, setModalBonusCommission] = useState("");
  const [modalBonusLimit, setModalBonusLimit] = useState("");
  const [modalUseYN, setModalUseYN] = useState("1");

  // Fetch charge events
  const fetchChargeEvents = async () => {
    try {
      const response = await fetch("/api/admin/event-setting/charge-events", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setChargeEvents(data.data);
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to fetch charge events:", error);
      alert(
        "이벤트 목록을 불러오는데 실패했습니다. 백엔드가 실행 중인지 확인하세요.",
      );
    }
  };

  useEffect(() => {
    fetchChargeEvents();
    fetchEventSettings();
  }, []);

  // Fetch general event settings
  const fetchEventSettings = async () => {
    try {
      const response = await fetch("/api/admin/event-setting", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setEventSettings(data.data);
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to fetch event settings:", error);
      alert("이벤트 설정을 불러오는데 실패했습니다.");
    }
  };
  // Update general event settings
  const handleUpdateEventSettings = async (
    settings: Record<string, string>,
  ) => {
    try {
      setGeneralLoading(true);
      const response = await fetch("/api/admin/event-setting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.ReturnCode === 0) {
        alert(data.ReturnMessage);
        fetchEventSettings();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to update event settings:", error);
      alert("이벤트 설정 수정에 실패했습니다.");
    } finally {
      setGeneralLoading(false);
    }
  };
  // Update general event settings
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !modalStratTime ||
      !modalEndTime ||
      !modalBonusCommission ||
      !modalBonusLimit
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/admin/event-setting/charge-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          stratTime: modalStratTime,
          endTime: modalEndTime,
          eventBonusCommission: parseFloat(modalBonusCommission),
          eventBonusLimit: parseFloat(modalBonusLimit),
          eventUseYN: parseInt(modalUseYN),
        }),
      });
      const data = await response.json();

      if (data.ReturnCode === 0) {
        alert(data.ReturnMessage);
        // Reset form
        setModalStratTime("");
        setModalEndTime("");
        setModalBonusCommission("");
        setModalBonusLimit("");
        setModalUseYN("1");
        // Close modal
        if (typeof window !== "undefined" && (window as any).$) {
          (window as any).$("#modalEvent").modal("hide");
        }
        fetchChargeEvents();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to add charge event:", error);
      alert("이벤트 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Update charge event
  const handleUpdateEvent = async (
    chargeEventIdx: number,
    stratTime: string,
    endTime: string,
    eventBonusCommission: string,
    eventBonusLimit: string,
    eventUseYN: number,
  ) => {
    if (confirm("변경하시겠습니까?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/event-setting/charge-events/${chargeEventIdx}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              stratTime,
              endTime,
              eventBonusCommission: parseFloat(eventBonusCommission),
              eventBonusLimit: parseFloat(eventBonusLimit),
              eventUseYN,
            }),
          },
        );
        const data = await response.json();

        if (data.ReturnCode === 0) {
          alert(data.ReturnMessage);
          fetchChargeEvents();
        } else {
          alert(data.ReturnMessage);
        }
      } catch (error) {
        console.error("Failed to update charge event:", error);
        alert("이벤트 수정에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete charge event
  const handleDeleteEvent = async (chargeEventIdx: number) => {
    if (confirm("삭제 하시겠습니까?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/event-setting/charge-events/${chargeEventIdx}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );
        const data = await response.json();

        if (data.ReturnCode === 0) {
          alert(data.ReturnMessage);
          fetchChargeEvents();
        } else {
          alert(data.ReturnMessage);
        }
      } catch (error) {
        console.error("Failed to delete charge event:", error);
        alert("이벤트 삭제에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/event/setting">
          <i className="fa-solid fa-bolt me-2"></i>이벤트 설정
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      <div className="row">
        {/*일반 이벤트 설정*/}
        <div className="col-6 ui-sortable">
          <div className="panel panel-inverse">
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa-solid fa-cogs"></i>
                </span>
                일반 이벤트 설정
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
            <div className="panel-body border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const settings: Record<string, string> = {};
                  formData.forEach((value, key) => {
                    settings[key] = value as string;
                  });
                  handleUpdateEventSettings(settings);
                }}
              >
                <div className="mb-3">
                  <label className="form-label">이벤트 활성화</label>
                  <select
                    name="event_enabled"
                    className="form-select"
                    defaultValue={eventSettings.event_enabled || "1"}
                  >
                    <option value="1">활성화</option>
                    <option value="0">비활성화</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">돌발 이벤트 활성화</label>
                  <select
                    name="event_charge_enabled"
                    className="form-select"
                    defaultValue={eventSettings.event_charge_enabled || "1"}
                  >
                    <option value="1">활성화</option>
                    <option value="0">비활성화</option>
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={generalLoading}
                  >
                    {generalLoading ? "저장 중..." : "저장"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*돌발 이벤트*/}
        <div className="col-6 ui-sortable">
          <div className="panel panel-inverse">
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa-solid fa-bolt"></i>
                </span>
                돌발 이벤트 설정
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
            <div className="panel-body border">
              <div className="text-end mb-2">
                <a
                  href="javascript:void(0)"
                  className="btn btn-success btn-sm text-white"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).$) {
                      (window as any).$("#modalEvent").modal("show");
                    }
                  }}
                >
                  <i className="fa fa-plus me-1"></i>이벤트 추가
                </a>
              </div>
              <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>번호</th>
                    <th>지정 시간</th>
                    <th>돌발 보너스 %</th>
                    <th>보너스 최대금액</th>
                    <th>사용 여부</th>
                    <th>기능</th>
                  </tr>
                </thead>
                <tbody>
                  {chargeEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6}>등록된 이벤트가 없습니다.</td>
                    </tr>
                  ) : (
                    chargeEvents.map((event, index) => (
                      <EventRow
                        key={event.chargeEventIdx}
                        event={event}
                        index={index}
                        onUpdate={handleUpdateEvent}
                        onDelete={handleDeleteEvent}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*출석 이벤트*/}
      </div>

      <div
        className="modal fade"
        id="modalEvent"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: "700px" }}>
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-bolt me-1"></i>
                  </span>
                  <span id="modalTitle">돌발 이벤트 추가</span>
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
                <form id="chargeEventNew" onSubmit={handleAddEvent}>
                  <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th>지정 시간</th>
                        <th>돌발 보너스 %</th>
                        <th>보너스 최대금액</th>
                        <th>사용 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              type="time"
                              className="form-control w-auto"
                              id="stratTime"
                              name="stratTime"
                              value={modalStratTime}
                              onChange={(e) =>
                                setModalStratTime(e.target.value)
                              }
                            />
                            <label className="col-form-label w-auto ms-1 me-1">
                              ~
                            </label>
                            <input
                              type="time"
                              className="form-control w-auto"
                              id="endTime"
                              name="endTime"
                              value={modalEndTime}
                              onChange={(e) => setModalEndTime(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              type="text"
                              id="eventBonusCommission"
                              name="eventBonusCommission"
                              className="form-control w-70px commission"
                              value={modalBonusCommission}
                              onChange={(e) =>
                                setModalBonusCommission(e.target.value)
                              }
                            />
                            <label className="col-form-label w-auto ms-1 me-1">
                              %
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              type="text"
                              id="eventBonusLimit"
                              name="eventBonusLimit"
                              className="form-control w-150px amount"
                              style={{ textAlign: "right" }}
                              value={modalBonusLimit}
                              onChange={(e) =>
                                setModalBonusLimit(e.target.value)
                              }
                            />
                            <label className="col-form-label w-auto ms-1 me-1">
                              P
                            </label>
                          </div>
                        </td>
                        <td>
                          <select
                            id="eventUseYN"
                            name="eventUseYN"
                            className="form-select w-auto"
                            value={modalUseYN}
                            onChange={(e) => setModalUseYN(e.target.value)}
                          >
                            <option value="1">사용</option>
                            <option value="0">중지</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                        disabled={loading}
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-secondary btn-sm text-white"
                        data-bs-dismiss="modal"
                      >
                        <i className="fa-solid fa-xmark me-2"></i>닫기
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Separate component for each event row
function EventRow({
  event,
  index,
  onUpdate,
  onDelete,
}: {
  event: ChargeEvent;
  index: number;
  onUpdate: (
    chargeEventIdx: number,
    stratTime: string,
    endTime: string,
    eventBonusCommission: string,
    eventBonusLimit: string,
    eventUseYN: number,
  ) => void;
  onDelete: (chargeEventIdx: number) => void;
}) {
  const [stratTime, setStratTime] = useState(event.stratTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [bonusCommission, setBonusCommission] = useState(
    event.eventBonusCommission,
  );
  const [bonusLimit, setBonusLimit] = useState(event.eventBonusLimit);
  const [useYN, setUseYN] = useState(event.eventUseYN.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(
      event.chargeEventIdx,
      stratTime,
      endTime,
      bonusCommission,
      bonusLimit,
      parseInt(useYN),
    );
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="d-inline-flex">
          <input
            type="time"
            className="form-control w-auto"
            name="stratTime"
            value={stratTime}
            onChange={(e) => setStratTime(e.target.value)}
          />
          <label className="col-form-label w-auto ms-1 me-1">~</label>
          <input
            type="time"
            className="form-control w-auto"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </td>
      <td>
        <div className="d-inline-flex">
          <input
            type="text"
            name="eventBonusCommission"
            className="form-control w-70px commission"
            value={bonusCommission}
            onChange={(e) => setBonusCommission(e.target.value)}
          />
          <label className="col-form-label w-auto ms-1 me-1">%</label>
        </div>
      </td>
      <td>
        <div className="d-inline-flex">
          <input
            type="text"
            name="eventBonusLimit"
            className="form-control w-100px amount"
            value={bonusLimit}
            style={{ textAlign: "right" }}
            onChange={(e) => setBonusLimit(e.target.value)}
          />
          <label className="col-form-label w-auto ms-1 me-1">P</label>
        </div>
      </td>
      <td>
        <select
          name="eventUseYN"
          className="form-select"
          value={useYN}
          onChange={(e) => setUseYN(e.target.value)}
        >
          <option value="1">사용</option>
          <option value="0">중지</option>
        </select>
      </td>
      <td>
        <div className="d-block">
          <button
            type="button"
            className="btn btn-primary btn-sm text-white"
            onClick={handleSubmit}
          >
            <i className="fas fa-edit me-1"></i>변경
          </button>
          <a
            href="javascript:void(0);"
            className="btn btn-danger btn-sm text-white"
            onClick={() => onDelete(event.chargeEventIdx)}
          >
            <i className="fa-solid fa-trash-can me-1"></i>삭제
          </a>
        </div>
      </td>
    </tr>
  );
}
