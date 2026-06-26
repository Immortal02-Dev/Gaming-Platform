"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface AlarmSetting {
  idx: number;
  alarm_id: number;
  name: string;
  sound_idx: number;
  count_type: number;
  win_amount: number;
  site_idx: number;
}

export default function AlarmSettingPage() {
  const [alarms, setAlarms] = useState<AlarmSetting[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlarmSettings();
  }, []);

  const fetchAlarmSettings = async () => {
    try {
      const response = await fetch("/api/admin/alarm-setting", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setAlarms(data.data);
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to fetch alarm settings:", error);
      alert(
        "알람 설정을 불러오는데 실패했습니다. 백엔드가 실행 중인지 확인하세요.",
      );
    }
  };

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((e) => console.error("Audio play failed", e));
  };

  const getSoundUrl = (soundIdx: number) => {
    const soundMap: { [key: number]: string } = {
      2: "/assets/sound/newuser.mp3",
      3: "/assets/sound/newpartner.mp3",
      4: "/assets/sound/charge.mp3",
      5: "/assets/sound/exchange.mp3",
      6: "/assets/sound/qna.mp3",
      7: "/assets/sound/payback.mp3",
      8: "/assets/sound/sportWin.mp3",
      9: "/assets/sound/casinoWin.mp3",
      10: "/assets/sound/slotWin.mp3",
      11: "/assets/sound/miniWin.mp3",
      12: "/assets/sound/boardWin.mp3",
    };
    return soundMap[soundIdx] || "";
  };

  const handleAlarmChange = (
    alarmId: number,
    field: keyof AlarmSetting,
    value: number | string,
  ) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.alarm_id === alarmId ? { ...alarm, [field]: value } : alarm,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm("적용하시겠습니까?")) {
      return;
    }

    const updateData: Record<
      string,
      { alarmIdx: number; alarmCountType: number }
    > = {};
    const winAlarmAmount: Record<string, number> = {};

    alarms.forEach((alarm) => {
      updateData[alarm.alarm_id] = {
        alarmIdx: alarm.sound_idx,
        alarmCountType: alarm.count_type,
      };

      // Map win amounts (Alarm ID 7-11 corresponds to Win Amount Index 1-5)
      if (alarm.alarm_id >= 7 && alarm.alarm_id <= 11) {
        const winIndex = alarm.alarm_id - 6;
        winAlarmAmount[winIndex] = alarm.win_amount;
      }
    });

    try {
      setLoading(true);
      const response = await fetch("/api/admin/alarm-setting/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ updateData, winAlarmAmount }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.ReturnCode === 0) {
        alert(data.ReturnMessage);
        fetchAlarmSettings();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to update alarm settings:", error);
      alert("설정 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getAlarm = (id: number) => {
    return (
      alarms.find((a) => a.alarm_id === id) || {
        alarm_id: id,
        sound_idx: 0,
        count_type: 1,
        win_amount: 0,
      }
    );
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/alarmSetting.html">
          <i className="fa fa-users-cog me-2"></i>알람 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col-12">
          <div className="panel panel-inverse" data-sortable-id="form-8">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-tasks"></i>
                </span>
                알람 설정
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
            <div className="panel-body p-0">
              <form onSubmit={handleSubmit}>
                <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold m-0">
                  <thead>
                    <tr>
                      {[
                        { name: "신규회원", color: "#6c757d" },
                        { name: "신규파트너", color: "#49b6d6" },
                        { name: "충전신청", color: "#90ca4b" },
                        { name: "환전신청", color: "#727cb6" },
                        { name: "문의알람", color: "#f59c1a" },
                        { name: "페이백알람", color: "#00acac" },
                      ].map((header, idx) => (
                        <th
                          key={idx}
                          className="text-white"
                          style={{ backgroundColor: header.color }}
                        >
                          {header.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {[1, 2, 3, 4, 5, 6].map((alarmId) => {
                        const alarm = getAlarm(alarmId);
                        return (
                          <td key={alarmId}>
                            <div className="row">
                              <div className="col pe-0">
                                <div className="input-group">
                                  <select
                                    className="form-select"
                                    value={alarm.sound_idx}
                                    onChange={(e) =>
                                      handleAlarmChange(
                                        alarmId,
                                        "sound_idx",
                                        parseInt(e.target.value),
                                      )
                                    }
                                  >
                                    <option value="0">무음</option>
                                    <option value="1">기본 알람</option>
                                    <option value="2">신규회원</option>
                                    <option value="3">신규파트너</option>
                                    <option value="4">충전</option>
                                    <option value="5">환전</option>
                                    <option value="6">문의</option>
                                    <option value="7">페이백</option>
                                  </select>
                                  {alarm.sound_idx > 1 && (
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      onClick={() =>
                                        playSound(getSoundUrl(alarm.sound_idx))
                                      }
                                    >
                                      <i className="fa fa-play"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="col">
                                <select
                                  className="form-select"
                                  value={alarm.count_type}
                                  onChange={(e) =>
                                    handleAlarmChange(
                                      alarmId,
                                      "count_type",
                                      parseInt(e.target.value),
                                    )
                                  }
                                >
                                  <option value="1">한 번만</option>
                                  <option value="2">반복</option>
                                  <option value="3">모두 처리시까지</option>
                                </select>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
                <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold m-0">
                  <thead>
                    <tr>
                      {[
                        "스포츠 당첨알람",
                        "카지노 당첨알람",
                        "슬롯 당첨알람",
                        "미니게임 당첨알람",
                        "보드게임 당첨알람",
                      ].map((name, idx) => (
                        <th
                          key={idx}
                          className="text-white"
                          style={{ backgroundColor: "#ff5b57" }}
                        >
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {[7, 8, 9, 10, 11].map((alarmId) => {
                        const alarm = getAlarm(alarmId);
                        return (
                          <td key={alarmId}>
                            <div className="row">
                              <div className="col pe-0">
                                <div className="input-group">
                                  <select
                                    className="form-select"
                                    value={alarm.sound_idx}
                                    onChange={(e) =>
                                      handleAlarmChange(
                                        alarmId,
                                        "sound_idx",
                                        parseInt(e.target.value),
                                      )
                                    }
                                  >
                                    <option value="0">무음</option>
                                    <option value="1">기본 알람</option>
                                    <option value="8">스포츠 당첨</option>
                                    <option value="9">카지노 당첨</option>
                                    <option value="10">슬롯 당첨</option>
                                    <option value="11">미니게임 당첨</option>
                                    <option value="12">보드게임 당첨</option>
                                  </select>
                                  {alarm.sound_idx > 1 && (
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      onClick={() =>
                                        playSound(getSoundUrl(alarm.sound_idx))
                                      }
                                    >
                                      <i className="fa fa-play"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="col">
                                <select
                                  className="form-select"
                                  value={alarm.count_type}
                                  onChange={(e) =>
                                    handleAlarmChange(
                                      alarmId,
                                      "count_type",
                                      parseInt(e.target.value),
                                    )
                                  }
                                >
                                  <option value="1">한 번만</option>
                                  <option value="2">반복</option>
                                </select>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mt-3 mb-3">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "저장 중..." : "적용하기"}
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-footer">
              <div>※ 미리듣기</div>
              <div>
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/newuser.mp3")}
                >
                  신규회원-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/newpartner.mp3")}
                >
                  신규파트너-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/charge.mp3")}
                >
                  충전신청-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/exchange.mp3")}
                >
                  환전신청-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/qna.mp3")}
                >
                  문의알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/payback.mp3")}
                >
                  페이백알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/sportWin.mp3")}
                >
                  스포츠 당첨알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/casinoWin.mp3")}
                >
                  카지노 당첨알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/slotWin.mp3")}
                >
                  슬롯 당첨알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/miniWin.mp3")}
                >
                  미니게임 당첨알람-기본
                </button>{" "}
                <button
                  className="btn btn-sm btn-secondary mt-1 btnEarlyPlay"
                  onClick={() => playSound("/assets/sound/boardWin.mp3")}
                >
                  보드게임 당첨알람-기본
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-tasks"></i>
                </span>
                당첨 금액 알람 설정
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
                <form onSubmit={handleSubmit}>
                  {[
                    { id: 7, label: "스포츠 알람 금액" },
                    { id: 8, label: "카지노 알람 금액" },
                    { id: 9, label: "슬롯 알람 금액" },
                    { id: 10, label: "미니게임 알람 금액" },
                    { id: 11, label: "보드게임 알람 금액" },
                  ].map((item) => {
                    const alarm = getAlarm(item.id);
                    return (
                      <div className="col-12 mb-2" key={item.id}>
                        <div className="input-group">
                          <label className="input-group-text col-form-label px-2">
                            {item.label}
                          </label>
                          <input
                            type="number"
                            className="form-control amount"
                            value={alarm.win_amount}
                            onChange={(e) =>
                              handleAlarmChange(
                                item.id,
                                "win_amount",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                          <label className="input-group-text col-form-label px-2">
                            원
                          </label>
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-center mt-3">
                    <button className="btn btn-primary" disabled={loading}>
                      {loading ? "저장 중..." : "적용하기"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div
          id="modal-spinner"
          className="modal show"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "block",
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
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
