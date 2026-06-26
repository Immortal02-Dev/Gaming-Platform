"use client";

import { useState, useEffect } from "react";

export default function UserAddPage() {
  const [formData, setFormData] = useState({
    parentUserID: "",
    parentUserIdx: "",
    userRoleIdx: "",
    userID: "",
    nickName: "",
    password: "",
    passwordConfirm: "",
    exchangePassword: "",
    bankIdx: "",
    bankerName: "",
    bankNumber: "",
  });

  // This would normally be fetched from an API
  const [banks, setBanks] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Mock fetching banks
    // fetch('/api/banks').then(res => res.json()).then(data => setBanks(data));
    setBanks([
      { id: 1, name: "국민은행" },
      { id: 2, name: "신한은행" },
      { id: 3, name: "우리은행" },
      { id: 4, name: "하나은행" },
      { id: 5, name: "농협" },
      // Add more as needed
    ]);

    // Handle window resize to match original popup size
    if (typeof window !== "undefined") {
      // window.resizeTo(750, 655); // Browsers often block this
    }

    // Expose function for popup callback
    (window as any).fnSelectUser = (userIdx: string, text: string, child: any) => {
      setFormData((prev) => ({
        ...prev,
        parentUserID: text,
        parentUserIdx: userIdx,
      }));
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const userSelectPopup = () => {
    const nWidth = 750;
    const nHeight = 655;
    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;

    const nLeft = curX + curWidth / 2 - nWidth / 2;
    const nTop = curY + curHeight / 2 - nHeight / 2;

    window.open(
      "/user/select?onlyPartner=true&checkOne=true",
      "userSelect",
      `top=${nTop},left=${nLeft},width=${nWidth},height=${nHeight},status=no,menubar=no,toolbar=no`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/admin/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("회원이 등록되었습니다.");
        if (window.opener && !window.opener.closed) {
          window.opener.location.reload();
        }
        window.close();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "회원 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-user-plus me-2"></i>회원 등록
          </h4>
          <div className="panel-heading-btn"></div>
        </div>
        <div className="panel-body bg-gray-200">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">상부 선택</label>
              <div className="col col-9">
                <div className="input-group me-2" style={{ width: "300px" }}>
                  <input
                    type="text"
                    name="parentUserID"
                    id="parentUserID"
                    onClick={userSelectPopup}
                    className="form-control"
                    required
                    readOnly
                    value={formData.parentUserID}
                  />
                  <input
                    type="hidden"
                    name="parentUserIdx"
                    id="parentUserIdx"
                    className="form-control"
                    value={formData.parentUserIdx}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={userSelectPopup}
                  >
                    <i className="fas fa-check me-2"></i>선택
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">회원 등급 지정</label>
              <div className="col col-9">
                <select
                  name="userRoleIdx"
                  id="userRoleIdx"
                  className="form-select w-auto"
                  required
                  value={formData.userRoleIdx}
                  onChange={handleChange}
                >
                  <option value="">선택</option>
                  <option value="3">파트너</option>
                  <option value="4">회원</option>
                </select>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">회원 ID</label>
              <div className="col col-9">
                <input
                  type="text"
                  name="userID"
                  id="userID"
                  className="form-control w-300px"
                  required
                  value={formData.userID}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">회원 닉네임</label>
              <div className="col col-9">
                <input
                  type="text"
                  name="nickName"
                  id="nickName"
                  className="form-control w-300px"
                  required
                  value={formData.nickName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">회원 비번</label>
              <div className="col col-9">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control w-300px"
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">회원 비번 확인</label>
              <div className="col col-9">
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="form-control w-300px"
                  required
                  autoComplete="new-password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">환전 비번</label>
              <div className="col col-9">
                <input
                  type="password"
                  name="exchangePassword"
                  id="exchangePassword"
                  className="form-control w-300px"
                  autoComplete="new-password"
                  value={formData.exchangePassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">은행명</label>
              <div className="col col-9">
                <select
                  name="bankIdx"
                  id="bankIdx"
                  className="form-select w-auto"
                  value={formData.bankIdx}
                  onChange={handleChange}
                >
                  <option value="">선택</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">예금주</label>
              <div className="col col-9">
                <input
                  type="text"
                  name="bankerName"
                  id="bankerName"
                  className="form-control w-300px"
                  value={formData.bankerName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-form-label col-3">계좌번호</label>
              <div className="col col-9">
                <input
                  type="text"
                  name="bankNumber"
                  id="bankNumber"
                  className="form-control w-300px"
                  value={formData.bankNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col text-center mt-3">
              <button className="btn btn-success me-1">
                <i className="fa fa-save me-1"></i>저장
              </button>
              <button
                type="button"
                className="btn btn-gray"
                onClick={() => window.close()}
              >
                <i className="fa-solid fa-xmark me-2"></i>닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
