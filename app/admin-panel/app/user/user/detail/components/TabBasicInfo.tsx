import React from "react";

interface UserData {
  userIdx?: number;
  id?: string;
  nickname?: string;
  role?: string;
  roleIdx?: number;
  level?: number;
  status?: number;
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
}

export default function TabBasicInfo({ user }: TabBasicInfoProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="hidden"
        name="_token"
        defaultValue="6vZ92tB27jHohsdPMCpiblrvCrfISz6Ebbd8TvTy"
      />
      <input type="hidden" name="userIdx" defaultValue={user?.userIdx || 14} />
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
                  {user?.id || "ma999"}
                </label>
                <select
                  className="form-select w-auto ms-2"
                  name="warningColorIdx"
                  id="warningColorIdx"
                  defaultValue={user?.warningColorIdx || ""}
                >
                  <option value="" style={{ backgroundColor: "#fff" }} />
                  <option value={1} style={{ backgroundColor: "#6aa84f" }} />
                  <option value={2} style={{ backgroundColor: "#744700" }} />
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
                    name="nickName"
                    className="form-control"
                    defaultValue={user?.nickname || "전테스트"}
                    autoComplete="off"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="recommendCode"
                    className="form-control"
                    defaultValue={user?.recommendCode || ""}
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
                autoComplete="new-password"
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
                    defaultValue={user?.parentUser || ""}
                    onClick={() => alert("User Select Popup")}
                  />
                  <input
                    type="hidden"
                    name="parentUserIdx"
                    id="parentUserIdx"
                    defaultValue={user?.parentUserIdx || ""}
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
                    defaultValue={user?.status || 2}
                  >
                    <option value={1}>가입대기</option>
                    <option value={2}>정상</option>
                    <option value={3}>정지</option>
                    <option value={4}>탈퇴</option>
                    <option value={5}>테스터</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    name="userStatusIdxChangeType"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="">본인만</option>
                    <option value={1}>본인+직속회원</option>
                    <option value={2}>전체</option>
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
                    defaultValue={user?.roleIdx || 3}
                    onChange={() => alert("User Select Popup")}
                  >
                    <option value={3}>파트너</option>
                    <option disabled value={4}>
                      회원
                    </option>
                  </select>
                </div>
                <div className="col">
                  <select
                    name="userGradeIdx"
                    className="form-select"
                    defaultValue={user?.level || 1}
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
                        defaultValue={user?.gameLevel?.[idx + 1] || 1}
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
          {/* ... Add other rows ... */}
          <tr>
            <th className="bg-gray-300">연락처</th>
            <td className="p-1">
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                defaultValue={user?.phoneNumber || ""}
              />
            </td>
            <th className="bg-gray-300">충전 계좌 지정</th>
            <td className="p-1">
              <select
                name="chargeBankIdx"
                className="form-select"
                defaultValue={user?.chargeBankIdx || ""}
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
                defaultValue={user?.bankIdx || ""}
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
                defaultValue={user?.bankNumber || ""}
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
                defaultValue={user?.bankerName || ""}
              />
            </td>
            <th className="bg-gray-300">환전비번</th>
            <td className="p-1">
              <input
                type="password"
                name="exchangePassword"
                className="form-control"
                autoComplete="new-password"
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
                defaultValue={user?.memo || ""}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="col text-center">
        <button type="submit" className="btn btn-success">
          <i className="fa fa-save me-1" />
          저장
        </button>
        <button
          type="button"
          className="btn btn-gray ms-1"
          onClick={() => window.close()}
        >
          <i className="fa-solid fa-xmark me-2" />
          닫기
        </button>
      </div>
    </form>
  );
}
