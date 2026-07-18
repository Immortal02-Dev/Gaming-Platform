"use client";
import React, { useState } from "react";

const BACKEND_URL = ""; // Use relative path for proxy

interface UserData {
  userIdx?: number;
  id?: string;
  nickname?: string;
  role?: string;
  roleIdx?: number;
  level?: number;
  status?: number | string;
  recommendCode?: string;
  warningColorIdx?: number | string;
  parentUser?: string;
  parentUserIdx?: number | string;
  phoneNumber?: string;
  money?: number;
  point?: number;
  bankIdx?: number | string;
  bankNumber?: string;
  bankerName?: string;
  memo?: string;
  chargeBankIdx?: number | string;
  gameLevel?: { [key: number]: number };
}

interface TabBasicInfoProps {
  user: UserData | null;
  onSaved?: () => void;
}

export default function TabBasicInfo({ user, onSaved }: TabBasicInfoProps) {
  const [saving, setSaving] = useState(false);

  // Controlled form state — initialized from user prop
  const [formData, setFormData] = useState({
    nickname: "",
    recommendCode: "",
    password: "",
    warningColorIdx: "",
    userStatusIdx: "2",
    userStatusIdxChangeType: "",
    userRoleIdx: "3",
    userGradeIdx: "1",
    phoneNumber: "",
    chargeBankIdx: "",
    bankIdx: "",
    bankNumber: "",
    bankerName: "",
    exchangePassword: "",
    memo: "",
    gameLevel: {} as { [key: number]: number },
  });

  const [prevUser, setPrevUser] = useState<UserData | null>(null);

  // Sync form when user data loads/changes
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setFormData({
        nickname: user.nickname || "",
        recommendCode: user.recommendCode || "",
        password: "",
        warningColorIdx: String(user.warningColorIdx ?? ""),
        userStatusIdx: String(user.status ?? "2"),
        userStatusIdxChangeType: "",
        userRoleIdx: String(user.roleIdx ?? "3"),
        userGradeIdx: String(user.level ?? "1"),
        phoneNumber: user.phoneNumber || "",
        chargeBankIdx: String(user.chargeBankIdx ?? ""),
        bankIdx: String(user.bankIdx ?? ""),
        bankNumber: user.bankNumber || "",
        bankerName: user.bankerName || "",
        exchangePassword: "",
        memo: user.memo || "",
        gameLevel: user.gameLevel || {},
      });
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGameLevelChange = (gameIdx: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      gameLevel: { ...prev.gameLevel, [gameIdx]: Number(value) },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userIdx) {
      alert("회원 정보를 불러올 수 없습니다.");
      return;
    }
    if (!confirm("저장하시겠습니까?")) return;

    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        nickname: formData.nickname,
        status: formData.userStatusIdx,
        level: formData.userGradeIdx,
        role: formData.userRoleIdx === "4" ? "user" : "admin",
        memo: formData.memo,
        recommendCode: formData.recommendCode,
        phoneNumber: formData.phoneNumber,
        bankIdx: formData.bankIdx,
        bankNumber: formData.bankNumber,
        bankerName: formData.bankerName,
        warningColorIdx: formData.warningColorIdx,
        chargeBankIdx: formData.chargeBankIdx,
        gameLevel: formData.gameLevel,
      };

      // Only include password if provided
      if (formData.password && formData.password.trim() !== "") {
        body.password = formData.password;
      }

      const res = await fetch(
        `${BACKEND_URL}/api/admin/users/${user.userIdx}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const data = await res.json();
      if (data.success) {
        alert("저장되었습니다.");
        onSaved?.();
      } else {
        alert(data.message || "저장 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="userIdx"
        value={user?.userIdx || ""}
        readOnly
      />
      <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
        <tbody>
          <tr>
            <th className="bg-gray-300" style={{ width: 170 }}>
              회원 ID
            </th>
            <td className="w-300px">
              <div className="d-inline-flex align-items-center">
                <span
                  className="badge me-2"
                  style={{ backgroundColor: "#f4a29c" }}
                >
                  {user?.role || "부본사"}
                </span>
                <label
                  className="col-form-label w-auto"
                  id="warningColorEnable"
                >
                  {user?.id || ""}
                </label>
                <select
                  className="form-select w-auto ms-2"
                  name="warningColorIdx"
                  id="warningColorIdx"
                  value={formData.warningColorIdx}
                  onChange={handleChange}
                  style={{
                    backgroundColor:
                      formData.warningColorIdx === "1"
                        ? "#6aa84f"
                        : formData.warningColorIdx === "2"
                          ? "#744700"
                          : "#fff",
                    color: formData.warningColorIdx ? "#fff" : "#000",
                  }}
                >
                  <option value="" style={{ backgroundColor: "#fff", color: "#000" }}>기본</option>
                  <option value="1" style={{ backgroundColor: "#6aa84f", color: "#fff" }}>주의</option>
                  <option value="2" style={{ backgroundColor: "#744700", color: "#fff" }}>경고</option>
                </select>
              </div>
            </td>
            <th className="bg-gray-300" style={{ width: 170 }}>
              회원 닉네임 / 추천인 코드
            </th>
            <td className="p-1 w-300px">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="nickname"
                    className="form-control"
                    value={formData.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="recommendCode"
                    className="form-control"
                    value={formData.recommendCode}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">비밀번호</th>
            <td className="p-1">
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="변경 시에만 입력"
              />
            </td>
            <th className="bg-gray-300">직속 상부 / 친구 추천</th>
            <td className="p-1">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="parentUserID"
                    id="parentUserID"
                    className="form-control"
                    readOnly
                    value={user?.parentUser || ""}
                    onClick={() => alert("User Select Popup")}
                  />
                  <input
                    type="hidden"
                    name="parentUserIdx"
                    id="parentUserIdx"
                    value={user?.parentUserIdx || ""}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label className="col-form-label w-auto"> () </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">상태</th>
            <td className="p-1">
              <div className="row">
                <div className="col">
                  <select
                    name="userStatusIdx"
                    className="form-select"
                    value={formData.userStatusIdx}
                    onChange={handleChange}
                  >
                    <option value="1">가입대기</option>
                    <option value="2">정상</option>
                    <option value="3">정지</option>
                    <option value="4">탈퇴</option>
                    <option value="5">테스터</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    name="userStatusIdxChangeType"
                    className="form-select"
                    value={formData.userStatusIdxChangeType}
                    onChange={handleChange}
                  >
                    <option value="">본인만</option>
                    <option value="1">본인+직속회원</option>
                    <option value="2">전체</option>
                  </select>
                </div>
              </div>
            </td>
            <th className="bg-gray-300">회원 등급 / 레벨</th>
            <td className="p-1">
              <div className="row">
                <div className="col">
                  <select
                    name="userRoleIdx"
                    className="form-select"
                    value={formData.userRoleIdx}
                    onChange={handleChange}
                  >
                    <option value="3">파트너</option>
                    <option value="4">회원</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    name="userGradeIdx"
                    className="form-select"
                    value={formData.userGradeIdx}
                    onChange={handleChange}
                  >
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(
                      (level) => (
                        <option key={level} value={level}>
                          {level}레벨
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">게임별 회원 레벨</th>
            <td colSpan={3} className="p-1">
              <div className="row d-flex">
                {["스포츠", "카지노", "슬롯", "미니게임", "보드게임"].map(
                  (game, idx) => (
                    <div className="input-group w-25 py-1" key={game}>
                      <div className="input-group-text">{game}</div>
                      <select
                        name={`userGameGroupGrade[${idx + 1}]`}
                        className="form-select w-auto"
                        value={formData.gameLevel[idx + 1] ?? 1}
                        onChange={(e) =>
                          handleGameLevelChange(idx + 1, e.target.value)
                        }
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(
                          (level) => (
                            <option key={level} value={level}>
                              {level}레벨
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  ),
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">연락처</th>
            <td className="p-1">
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </td>
            <th className="bg-gray-300">충전 계좌 지정</th>
            <td className="p-1">
              <select
                name="chargeBankIdx"
                className="form-select"
                value={formData.chargeBankIdx}
                onChange={handleChange}
              >
                <option value="">선택</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">보유 머니</th>
            <td>{user?.money ? user.money.toLocaleString() : "0"}</td>
            <th className="bg-gray-300">보유 포인트</th>
            <td>{user?.point ? user.point.toLocaleString() : "0"}</td>
          </tr>
          <tr>
            <th className="bg-gray-300">은행명</th>
            <td className="p-1">
              <select
                name="bankIdx"
                className="form-select"
                value={formData.bankIdx}
                onChange={handleChange}
              >
                <option value="">선택</option>
                <option value="1">하나은행</option>
              </select>
            </td>
            <th className="bg-gray-300">계좌번호</th>
            <td className="p-1">
              <input
                type="text"
                name="bankNumber"
                className="form-control"
                value={formData.bankNumber}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">예금주</th>
            <td className="p-1">
              <input
                type="text"
                name="bankerName"
                className="form-control"
                value={formData.bankerName}
                onChange={handleChange}
              />
            </td>
            <th className="bg-gray-300">환전비번</th>
            <td className="p-1">
              <input
                type="password"
                name="exchangePassword"
                className="form-control"
                value={formData.exchangePassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="변경 시에만 입력"
              />
            </td>
          </tr>
          <tr>
            <th className="bg-gray-300">메모</th>
            <td colSpan={3} className="p-1">
              <textarea
                name="memo"
                cols={30}
                rows={3}
                className="form-control"
                value={formData.memo}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="col text-center">
        <button type="submit" className="btn btn-success" disabled={saving}>
          <i className="fa fa-save me-1" />
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
