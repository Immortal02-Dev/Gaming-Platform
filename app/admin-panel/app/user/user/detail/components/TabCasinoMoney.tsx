import React, { useState } from "react";

interface TabCasinoMoneyProps {
    userIdx: string | null;
}

export default function TabCasinoMoney({ userIdx }: TabCasinoMoneyProps) {
    const [money, setMoney] = useState("");

    const handleAddAmount = (amount: number) => {
        if (amount === 0) {
            setMoney("");
            return;
        }
        const current = parseInt(money.replace(/,/g, "")) || 0;
        setMoney((current + amount).toLocaleString());
    };

    return (
        <div>
            <div className="row mb-2">
                <button type="button" className="btn btn-success w-auto" onClick={() => alert("Check Casino Money")}>
                    <i className="fa fa-search me-1" />
                    카지노 머니 조회
                </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Saved"); }}>
                <div className="form-group row mb-2">
                    <label className="col-form-label col-md-2">보유 카지노 머니</label>
                    <label className="col-form-label col-md-10">0</label>
                </div>

                <div className="form-group row mb-3">
                    <label className="col-form-label col-md-2">구분</label>
                    <div className="col-md-10">
                        <select name="logTypeIdx" className="form-select w-100px" required defaultValue="">
                            <option value="">구분</option>
                            <option value="10">지급</option>
                            <option value="11">회수</option>
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
                                    name="casinoMoney"
                                    className="form-control amount w-150px"
                                    value={money}
                                    onChange={(e) => setMoney(e.target.value)}
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

                <div className="col text-center">
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
        </div>
    );
}
