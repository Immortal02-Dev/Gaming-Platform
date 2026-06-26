import React, { useState } from "react";

interface User {
    userIdx?: number;
    point?: number;
}

interface TabPointActionProps {
    user: User | null;
}

const BACKEND_URL = ""; // Use relative path for proxy

export default function TabPointAction({ user }: TabPointActionProps) {
    const [point, setPoint] = useState("");

    const handleAddAmount = (amount: number) => {
        if (amount === 0) {
            setPoint("");
            return;
        }
        const current = parseInt(point.replace(/,/g, "")) || 0;
        setPoint((current + amount).toLocaleString());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const logTypeIdx = formData.get("logTypeIdx");
        const amount = parseInt(point.replace(/,/g, "")) || 0;
        const logMemo = formData.get("logMemo");

        if (!logTypeIdx || amount <= 0) {
            alert("구분과 금액을 확인해주세요.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/user/point-action`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userIdx: user?.userIdx,
                    logTypeIdx: parseInt(logTypeIdx as string),
                    amount: amount,
                    memo: logMemo,
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert("저장되었습니다.");
                window.location.reload();
            } else {
                alert(result.error || "실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row mb-3">
                <label className="col-form-label col-md-2">회원 보유 포인트</label>
                <div className="col-md-10 d-flex align-items-center">
                    <label className="col-form-label text-blue fw-bold">{user?.point?.toLocaleString() || 0}</label>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-form-label col-md-2">구분</label>
                <div className="col-md-10">
                    <select
                        name="logTypeIdx"
                        className="form-select w-100px"
                        required
                        defaultValue=""
                    >
                        <option value="">구분</option>
                        <option value={20}>지급</option>
                        <option value={21}>회수</option>
                    </select>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-form-label col-md-2">금액</label>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-auto">
                            <input
                                type="text"
                                name="point"
                                className="form-control amount w-150px"
                                value={point}
                                onChange={(e) => setPoint(e.target.value)}
                                style={{ textAlign: "right" }}
                                required
                            />
                        </div>
                        <div className="col-auto">
                            {[1000, 5000, 10000, 50000, 100000, 500000, 1000000].map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    className="btn btn-secondary text-white btn-sm me-1"
                                    onClick={() => handleAddAmount(amt)}
                                >
                                    {amt.toLocaleString()}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="btn btn-danger text-white btn-sm"
                                onClick={() => handleAddAmount(0)}
                            >
                                초기화
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-form-label col-md-2">메모</label>
                <div className="col-md-10">
                    <input
                        type="text"
                        name="logMemo"
                        className="form-control"
                        defaultValue=""
                        required
                    />
                </div>
            </div>
            <div className="col text-center border-top pt-3">
                <button type="submit" className="btn btn-success">
                    <i className="fa fa-save me-1" />
                    저장
                </button>
                <button type="button" className="btn btn-gray ms-1" onClick={() => window.close()}>
                    <i className="fa-solid fa-xmark me-2" />
                    닫기
                </button>
            </div>
        </form>
    );
}
