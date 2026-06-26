"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

interface AdminIP {
  adminIPIdx: number;
  adminIP: string;
  memo: string;
}

interface Manager {
  managerIdx: number;
  registerUserId: string;
  registerUserNickName: string;
  userId: string;
  nickName: string;
  userRoleIdx: number;
  userStatusIdx: number;
  memo: string;
  registerDate: string;
}

export default function ManagerSettingPage() {
  const [adminIPs, setAdminIPs] = useState<AdminIP[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [showModalManager, setShowModalManager] = useState(false);
  const [showModalAddManager, setShowModalAddManager] = useState(false);
  const [showModalAdminIP, setShowModalAdminIP] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [formData, setFormData] = useState({
    managerIdx: "",
    userID: "",
    password: "",
    nickName: "",
    userStatusIdx: "2",
    adminLiveInfoAuth: "",
    adminAlarmCountAuth: "",
    adminDashboardAuth: "",
    memo: "",
    readYN: {} as Record<number, boolean>,
    writeYN: {} as Record<number, boolean>,
  });
  const [adminIPForm, setAdminIPForm] = useState({
    adminIP: "",
    memo: "",
  });

  useEffect(() => {
    // Load initial data
    loadAdminIPs();
    loadManagers();
  }, []);

  const loadAdminIPs = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/manager-setting/ips`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setAdminIPs(data.data);
      }
    } catch (error) {
      console.error("Failed to load admin IPs:", error);
    }
  };

  const loadManagers = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/manager-setting/managers`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setManagers(data.data);
      }
    } catch (error) {
      console.error("Failed to load managers:", error);
    }
  };

  const handleSetAdminIPDelete = async (adminIPIdx: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/manager-setting/ips/${adminIPIdx}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        alert("IP 주소가 삭제되었습니다.");
        loadAdminIPs(); // Reload the list
      } else {
        alert(data.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to delete admin IP:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleIdNickCheck = async () => {
    if (formData.managerIdx === "") {
      if (formData.userID === "") {
        alert("아이디는 필수 입력입니다.");
        return;
      } else if (formData.password === "") {
        alert("비밀번호는 필수 입력입니다.");
        return;
      } else if (formData.nickName === "") {
        alert("닉네임은 필수 입력입니다.");
        return;
      } else {
        try {
          const response = await fetch(
            `${BACKEND_URL}/api/admin/manager-setting/check-credentials`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                userID: formData.userID,
                nickName: formData.nickName,
              }),
            }
          );
          const ret = await response.json();
          if (ret.ReturnCode !== 0) {
            alert(ret.ReturnMessage);
          } else {
            await handleManagerSubmit();
          }
        } catch (e: any) {
          alert("오류가 발생했습니다.");
        }
      }
    } else {
      await handleManagerSubmit();
    }
  };

  const handleManagerSubmit = async () => {
    try {
      const isEdit = formData.managerIdx !== "";
      const url = isEdit
        ? `${BACKEND_URL}/api/admin/manager-setting/managers/${formData.managerIdx}`
        : `${BACKEND_URL}/api/admin/manager-setting/managers`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userID: formData.userID,
          password: formData.password,
          nickName: formData.nickName,
          userStatusIdx: formData.userStatusIdx,
          adminLiveInfoAuth: formData.adminLiveInfoAuth,
          adminAlarmCountAuth: formData.adminAlarmCountAuth,
          adminDashboardAuth: formData.adminDashboardAuth,
          memo: formData.memo,
          readYN: formData.readYN,
          writeYN: formData.writeYN,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setShowModalManager(false);
        setShowModalAddManager(false);
        loadManagers(); // Reload the list
      } else {
        alert(data.message || "저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to save manager:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleRwControlChange = (area: string, checked: boolean) => {
    const checkboxes = document.querySelectorAll(
      `.${area}`
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  const handleCheckboxChange = (type: "readYN" | "writeYN", id: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: !prev[type][id],
      },
    }));
  };

  const handleOpenEditManager = async (manager: Manager) => {
    // Load full manager details
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/manager-setting/managers/${manager.managerIdx}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        const mgr = data.data;
        setSelectedManager(manager);
        setFormData({
          managerIdx: mgr.managerIdx.toString(),
          userID: mgr.userId,
          password: "",
          nickName: mgr.nickName,
          userStatusIdx: mgr.userStatusIdx.toString(),
          adminLiveInfoAuth: mgr.allowLiveInfo ? "" : "1",
          adminAlarmCountAuth: mgr.allowAlarmCount ? "" : "1",
          adminDashboardAuth: mgr.allowDashboard ? "" : "1",
          memo: mgr.memo || "",
          readYN: mgr.permissions?.readYN || {},
          writeYN: mgr.permissions?.writeYN || {},
        });
        setShowModalManager(true);
      }
    } catch (error) {
      console.error("Failed to load manager details:", error);
      alert("관리자 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleOpenAddManager = () => {
    setSelectedManager(null);
    setFormData({
      managerIdx: "",
      userID: "",
      password: "",
      nickName: "",
      userStatusIdx: "2",
      adminLiveInfoAuth: "",
      adminAlarmCountAuth: "",
      adminDashboardAuth: "",
      memo: "",
      readYN: {},
      writeYN: {},
    });
    setShowModalAddManager(true);
  };

  const permissionTables = [
    {
      title: "정산 관리",
      items: [
        { id: 19, name: "파트너 정산" },
        { id: 20, name: "일자별 정산" },
      ],
    },
    {
      title: "회원 관리",
      items: [
        { id: 11, name: "회원 목록" },
        { id: 57, name: "회원 트리뷰" },
        { id: 18, name: "현재 접속자" },
        { id: 22, name: "회원 레벨별 설정" },
        { id: 21, name: "파트너 단계 설정" },
        { id: 23, name: "로그인 로그" },
        { id: 24, name: "차단 IP" },
        { id: 31, name: "회원 일괄 적용" },
        { id: 34, name: "변경내역 로그" },
        { id: 35, name: "쿠폰 현황" },
      ],
    },
    {
      title: "머니/포인트 관리",
      items: [
        { id: 4, name: "충전 신청내역" },
        { id: 5, name: "환전 신청내역" },
        { id: 65, name: "페이백 신청 내역" },
        { id: 32, name: "파트너 지급/회수 내역" },
        { id: 17, name: "포인트 내역" },
        { id: 16, name: "전체 머니 내역" },
        { id: 29, name: "게임 머니전환내역" },
      ],
    },
    {
      title: "베팅내역 관리",
      items: [
        { id: 61, name: "스포츠 베팅 내역" },
        { id: 14, name: "카지노 베팅 내역" },
        { id: 15, name: "슬롯 베팅 내역" },
        { id: 36, name: "보드게임 베팅 내역" },
        { id: 41, name: "미니게임 베팅 내역" },
      ],
    },
    {
      title: "게임 관리",
      items: [
        { id: 58, name: "스포츠게임 관리" },
        { id: 40, name: "미니게임 관리" },
      ],
    },
    {
      title: "게시판 관리",
      items: [
        { id: 8, name: "게시판 관리" },
        { id: 9, name: "1:1문의" },
        { id: 10, name: "답변 템플릿" },
        { id: 12, name: "쪽지 관리" },
        { id: 13, name: "쪽지 템플릿" },
      ],
    },
    {
      title: "사이트 설정",
      items: [
        { id: 1, name: "사이트 설정" },
        { id: 2, name: "관리자 설정" },
        { id: 3, name: "은행 설정" },
        { id: 25, name: "이벤트 설정" },
        { id: 62, name: "알람 설정" },
      ],
    },
    {
      title: "게임 설정",
      items: [
        { id: 64, name: "게임 설정" },
        { id: 28, name: "카지노 설정" },
        { id: 39, name: "미니게임 설정" },
      ],
    },
    {
      title: "스포츠 설정",
      items: [
        { id: 50, name: "종목 설정" },
        { id: 51, name: "리그 설정" },
        { id: 53, name: "마켓 설정" },
        { id: 54, name: "기본배당 설정" },
        { id: 55, name: "합배당 설정" },
        { id: 59, name: "조합 설정" },
      ],
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/manager/setting">
          <i className="fa fa-users-cog me-2"></i>관리자 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col-4">
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
                관리자 IP 설정
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
              <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>No.</th>
                    <th>관리자 IP</th>
                    <th>메모</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {adminIPs.map((ip, index) => (
                    <tr key={ip.adminIPIdx}>
                      <td>{index + 1}</td>
                      <td>{ip.adminIP}</td>
                      <td>{ip.memo}</td>
                      <td className="p-1">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-danger btn-sm text-white"
                          onClick={() => handleSetAdminIPDelete(ip.adminIPIdx)}
                        >
                          <i className="fa fa-trash-alt me-1"></i>삭제
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="col text-end">
                <a
                  href="javascript:void(0);"
                  className="btn btn-sm btn-success width-65 text-white"
                  onClick={() => setShowModalAdminIP(true)}
                >
                  <i className="fa fa-plus me-1"></i>등록
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
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
                관리자 설정
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
              <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>No.</th>
                    <th>등록 아이디(닉네임)</th>
                    <th>아이디(닉네임)</th>
                    <th>등급</th>
                    <th>로그인 허용</th>
                    <th>메모</th>
                    <th>등록일시</th>
                    <th style={{ width: "1%" }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((manager, index) => (
                    <tr key={manager.managerIdx}>
                      <td>{index + 1}</td>
                      <td>
                        {manager.registerUserId
                          ? `${manager.registerUserId}(${manager.registerUserNickName})`
                          : ""}
                      </td>
                      <td>
                        {manager.userId}({manager.nickName})
                      </td>
                      <td>
                        <span className="badge bg-warning">운영자</span>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {manager.userStatusIdx === 2 ? "허용" : "불가"}
                        </span>
                      </td>
                      <td>{manager.memo}</td>
                      <td>{manager.registerDate}</td>
                      <td className="p-1" style={{ whiteSpace: "nowrap" }}>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-sm btn-primary w-60px text-white"
                          onClick={() => handleOpenEditManager(manager)}
                        >
                          <i className="fa fa-pencil-alt me-1"></i>
                          수정
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row">
                <div className="col text-end">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-sm btn-success width-65 text-white"
                    onClick={handleOpenAddManager}
                  >
                    <i className="fa fa-user-plus me-1"></i>등록
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Manager Edit */}
      {showModalManager && (
        <div
          className="modal fade show"
          id="modalManager"
          tabIndex={-1}
          data-bs-backdrop="static"
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="panel panel-inverse mb-0">
                <div className="panel-heading ui-draggable-handle">
                  <h4 className="panel-title">
                    <span className="me-2 pull-left">
                      <i className="fa fa-user-plus"></i>
                    </span>
                    <span id="modalTitle">관리자 수정</span>
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
                      onClick={() => setShowModalManager(false)}
                    >
                      <i className="fa fa-times"></i>
                    </a>
                  </div>
                </div>
                <div
                  className="panel-body"
                  style={{ maxHeight: "800px", overflowY: "scroll" }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleIdNickCheck();
                    }}
                    autoComplete="off"
                  >
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">아이디</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          id="userID"
                          name="userID"
                          className="form-control"
                          value={formData.userID}
                          readOnly
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        패스워드
                      </label>
                      <div className="col-md-8">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          maxLength={16}
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                        <small className="text-danger">
                          <i className="fa fa-asterisk"></i>변경시에만 입력
                        </small>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">닉네임</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          id="nickName"
                          name="nickName"
                          className="form-control"
                          value={formData.nickName}
                          readOnly
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        실시간 정보 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminLiveInfoAuthY"
                            name="adminLiveInfoAuth"
                            checked={formData.adminLiveInfoAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminLiveInfoAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminLiveInfoAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminLiveInfoAuthN"
                            name="adminLiveInfoAuth"
                            value="1"
                            checked={formData.adminLiveInfoAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminLiveInfoAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminLiveInfoAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        상단알람 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminAlarmCountAuthY"
                            name="adminAlarmCountAuth"
                            checked={formData.adminAlarmCountAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminAlarmCountAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminAlarmCountAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminAlarmCountAuthN"
                            name="adminAlarmCountAuth"
                            value="1"
                            checked={formData.adminAlarmCountAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminAlarmCountAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminAlarmCountAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        대쉬보드 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminDashboardAuthY"
                            name="adminDashboardAuth"
                            checked={formData.adminDashboardAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminDashboardAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminDashboardAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminDashboardAuthN"
                            name="adminDashboardAuth"
                            value="1"
                            checked={formData.adminDashboardAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminDashboardAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminDashboardAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">메모</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          name="memo"
                          className="form-control"
                          value={formData.memo}
                          onChange={(e) =>
                            setFormData({ ...formData, memo: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="row">
                      {permissionTables.map((table, tableIndex) => (
                        <div key={tableIndex} className="col-md-6">
                          <table className="table table-striped table-bordered table-td-valign-middle">
                            <thead className="bg-dark text-white">
                              <tr>
                                <th
                                  className="text-center align-middle"
                                  rowSpan={2}
                                >
                                  {table.title}
                                </th>
                                <th className="text-center">보기</th>
                                <th className="text-center">수정</th>
                              </tr>
                              <tr>
                                <th className="text-center">
                                  <div className="form-check-inline me-0 form-switch">
                                    <input
                                      className="form-check-input w-35px rwControl"
                                      data-area="readYN"
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleRwControlChange(
                                          "readYN",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                </th>
                                <th className="text-center">
                                  <div className="form-check-inline me-0 form-switch">
                                    <input
                                      className="form-check-input w-35px rwControl"
                                      data-area="writeYN"
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleRwControlChange(
                                          "writeYN",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.items.map((item) => (
                                <tr key={item.id}>
                                  <td className="text-center">{item.name}</td>
                                  <td className="text-center">
                                    <div className="form-check-inline me-0 form-switch">
                                      <input
                                        className="form-check-input w-35px readYN"
                                        type="checkbox"
                                        id={`checkbox_read_${item.id}`}
                                        name={`readYN[${item.id}]`}
                                        value="1"
                                        checked={
                                          formData.readYN[item.id] || false
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(
                                            "readYN",
                                            item.id
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className="form-check-inline me-0 form-switch">
                                      <input
                                        className="form-check-input w-35px writeYN"
                                        type="checkbox"
                                        id={`checkbox_write_${item.id}`}
                                        name={`writeYN[${item.id}]`}
                                        value="1"
                                        checked={
                                          formData.writeYN[item.id] || false
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(
                                            "writeYN",
                                            item.id
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>

                    <div className="row">
                      <div className="col text-center">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleIdNickCheck}
                        >
                          <i className="fa fa-save me-2"></i>저장
                        </button>
                        <a
                          href="javascript:;"
                          className="btn btn-danger text-white"
                          onClick={() => setShowModalManager(false)}
                        >
                          <i className="fa-solid fa-xmark me-2"></i>취소
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Manager */}
      {showModalAddManager && (
        <div
          className="modal fade show"
          id="modalAddManager"
          tabIndex={-1}
          data-bs-backdrop="static"
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="panel panel-inverse mb-0">
                <div className="panel-heading ui-draggable-handle">
                  <h4 className="panel-title">
                    <span className="me-2 pull-left">
                      <i className="fa fa-user-plus"></i>
                    </span>
                    <span id="modalTitle">관리자 등록</span>
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
                      onClick={() => setShowModalAddManager(false)}
                    >
                      <i className="fa fa-times"></i>
                    </a>
                  </div>
                </div>
                <div
                  className="panel-body"
                  style={{ maxHeight: "800px", overflowY: "scroll" }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleIdNickCheck();
                    }}
                    autoComplete="off"
                  >
                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">아이디</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          id="userID"
                          name="userID"
                          className="form-control"
                          value={formData.userID}
                          onChange={(e) =>
                            setFormData({ ...formData, userID: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        패스워드
                      </label>
                      <div className="col-md-8">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          maxLength={16}
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">닉네임</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          id="nickName"
                          name="nickName"
                          className="form-control"
                          value={formData.nickName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nickName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        로그인 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="inlineCssRadio1"
                            name="userStatusIdx"
                            checked={formData.userStatusIdx === "2"}
                            onChange={() =>
                              setFormData({ ...formData, userStatusIdx: "2" })
                            }
                            value="2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCssRadio1"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="inlineCssRadio2"
                            name="userStatusIdx"
                            value="3"
                            checked={formData.userStatusIdx === "3"}
                            onChange={() =>
                              setFormData({ ...formData, userStatusIdx: "3" })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCssRadio2"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        실시간 정보 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminLiveInfoAuthY"
                            name="adminLiveInfoAuth"
                            checked={formData.adminLiveInfoAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminLiveInfoAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminLiveInfoAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminLiveInfoAuthN"
                            name="adminLiveInfoAuth"
                            value="1"
                            checked={formData.adminLiveInfoAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminLiveInfoAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminLiveInfoAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        상단알람 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminAlarmCountAuthY"
                            name="adminAlarmCountAuth"
                            checked={formData.adminAlarmCountAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminAlarmCountAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminAlarmCountAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminAlarmCountAuthN"
                            name="adminAlarmCountAuth"
                            value="1"
                            checked={formData.adminAlarmCountAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminAlarmCountAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminAlarmCountAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">
                        대쉬보드 허용
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-valid"
                            type="radio"
                            id="adminDashboardAuthY"
                            name="adminDashboardAuth"
                            checked={formData.adminDashboardAuth === ""}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminDashboardAuth: "",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminDashboardAuthY"
                          >
                            허용
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input is-invalid"
                            type="radio"
                            id="adminDashboardAuthN"
                            name="adminDashboardAuth"
                            value="1"
                            checked={formData.adminDashboardAuth === "1"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                adminDashboardAuth: "1",
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="adminDashboardAuthN"
                          >
                            불가
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-form-label col-md-4">메모</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          name="memo"
                          className="form-control"
                          value={formData.memo}
                          onChange={(e) =>
                            setFormData({ ...formData, memo: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="row">
                      {permissionTables.map((table, tableIndex) => (
                        <div key={tableIndex} className="col-md-6">
                          <table className="table table-striped table-bordered table-td-valign-middle">
                            <thead className="bg-dark text-white">
                              <tr>
                                <th
                                  className="text-center align-middle"
                                  rowSpan={2}
                                >
                                  {table.title}
                                </th>
                                <th className="text-center">보기</th>
                                <th className="text-center">수정</th>
                              </tr>
                              <tr>
                                <th className="text-center">
                                  <div className="form-check-inline me-0 form-switch">
                                    <input
                                      className="form-check-input w-35px rwControl"
                                      data-area="readYN"
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleRwControlChange(
                                          "readYN",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                </th>
                                <th className="text-center">
                                  <div className="form-check-inline me-0 form-switch">
                                    <input
                                      className="form-check-input w-35px rwControl"
                                      data-area="writeYN"
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleRwControlChange(
                                          "writeYN",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.items.map((item) => (
                                <tr key={item.id}>
                                  <td className="text-center">{item.name}</td>
                                  <td className="text-center">
                                    <div className="form-check-inline me-0 form-switch">
                                      <input
                                        className="form-check-input w-35px readYN"
                                        type="checkbox"
                                        id={`checkbox_read_${item.id}`}
                                        name={`readYN[${item.id}]`}
                                        value="1"
                                        checked={
                                          formData.readYN[item.id] || false
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(
                                            "readYN",
                                            item.id
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className="form-check-inline me-0 form-switch">
                                      <input
                                        className="form-check-input w-35px writeYN"
                                        type="checkbox"
                                        id={`checkbox_write_${item.id}`}
                                        name={`writeYN[${item.id}]`}
                                        value="1"
                                        checked={
                                          formData.writeYN[item.id] || false
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(
                                            "writeYN",
                                            item.id
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>

                    <div className="row">
                      <div className="col text-center">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleIdNickCheck}
                        >
                          <i className="fa fa-save me-2"></i>저장
                        </button>
                        <a
                          href="javascript:;"
                          className="btn btn-danger text-white"
                          onClick={() => setShowModalAddManager(false)}
                        >
                          <i className="fa-solid fa-xmark me-2"></i>취소
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Admin IP */}
      {showModalAdminIP && (
        <div
          className="modal fade show"
          id="modalAdminIP"
          tabIndex={-1}
          aria-hidden="true"
          data-bs-backdrop="static"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="panel panel-inverse mb-0">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <span className="me-2 pull-left">
                      <i className="fa fa-user-plus"></i>
                    </span>
                    관리자 IP 등록
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
                      onClick={() => setShowModalAdminIP(false)}
                    >
                      <i className="fa fa-times"></i>
                    </a>
                  </div>
                </div>
                <div className="panel-body">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await fetch(
                          `${BACKEND_URL}/api/admin/manager-setting/ips`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                              adminIP: adminIPForm.adminIP,
                              memo: adminIPForm.memo,
                            }),
                          }
                        );
                        const data = await response.json();

                        if (data.success) {
                          alert(data.message);
                          setShowModalAdminIP(false);
                          setAdminIPForm({ adminIP: "", memo: "" });
                          loadAdminIPs();
                        } else {
                          alert(data.message || "등록에 실패했습니다.");
                        }
                      } catch (error) {
                        console.error("Failed to add admin IP:", error);
                        alert("등록 중 오류가 발생했습니다.");
                      }
                    }}
                  >
                    <label className="col-form-label w-auto ms-1 me-1">
                      관리자 IP
                    </label>
                    <input
                      type="text"
                      name="adminIP"
                      id="adminIP"
                      className="form-control"
                      value={adminIPForm.adminIP}
                      onChange={(e) =>
                        setAdminIPForm({
                          ...adminIPForm,
                          adminIP: e.target.value,
                        })
                      }
                      required
                    />
                    <label className="col-form-label w-auto ms-1 me-1">
                      메모
                    </label>
                    <input
                      type="text"
                      name="memo"
                      id="memo"
                      className="form-control"
                      value={adminIPForm.memo}
                      onChange={(e) =>
                        setAdminIPForm({ ...adminIPForm, memo: e.target.value })
                      }
                    />
                    <div className="row mt-2">
                      <div className="col text-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm text-white"
                        >
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-secondary btn-sm text-white"
                          onClick={() => {
                            setShowModalAdminIP(false);
                            setAdminIPForm({ adminIP: "", memo: "" });
                          }}
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
      )}
    </Layout>
  );
}
