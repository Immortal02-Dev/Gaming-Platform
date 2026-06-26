import React, { useState } from "react";

interface TabEmptyBetProps {
    userIdx: string | null;
}

export default function TabEmptyBet({ userIdx }: TabEmptyBetProps) {
    return (
        <div>
            {/* Casino Empty Bet Settings */}
            <form onSubmit={(e) => { e.preventDefault(); alert("Saved Casino Empty Bet"); }}>
                <h5><i className="fa fa-cog me-1" />카지노 공베팅 설정</h5>
                <div className="form-group row mb-2">
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">사용 유무</label>
                        <div className="col-md-10">
                            <select name="emptyBetUseYN" className="form-select w-auto" required defaultValue="0">
                                <option value="0">사용 안함</option>
                                <option value="1">사용</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">지정 선택</label>
                        <div className="col-md-10">
                            <select name="emptyBetHierarchy" className="form-select w-auto" required defaultValue="0">
                                <option value="0">하위 포함 안함</option>
                                <option value="1">하위 포함</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">사용 타입</label>
                        <div className="col-md-10">
                            <select name="emptyBetType" className="form-select w-auto" required defaultValue="1">
                                <option value="1">판수</option>
                                <option value="2">차감(%)</option>
                            </select>
                        </div>
                    </div>

                    {/* Simplified for now, logic for switching tabs based on type can be added */}
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">판수 선택</label>
                        <div className="col-md-10">
                            <div className="row ps-2 align-items-center">
                                <input type="number" className="form-control w-70px" min="0" defaultValue="" />
                                <label className="col-form-label w-auto">판 이후부터 </label>
                                <input type="number" className="form-control w-70px" min="0" defaultValue="" />
                                <label className="col-form-label w-auto">판 사이에 한판을 뺍니다.</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">예외 선택</label>
                        <div className="col-md-10">
                            <div className="row mb-2 align-items-center">
                                <label className="col-form-label w-auto">당첨인 경우 </label>
                                <select name="emptyBetWinBet" className="form-select w-auto" required defaultValue="0">
                                    <option value="0">포함 안함</option>
                                    <option value="1">포함</option>
                                </select>
                            </div>
                            <div className="row align-items-center">
                                <label className="col-form-label w-auto">1일 초기화 </label>
                                <select name="emptyBetDayInit" className="form-select w-auto" required defaultValue="0">
                                    <option value="1">초기화</option>
                                    <option value="0">초기화 안함</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col text-center mb-4">
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

            <hr />

            {/* Slot Empty Bet Settings */}
            <form onSubmit={(e) => { e.preventDefault(); alert("Saved Slot Empty Bet"); }}>
                <h5><i className="fa fa-cog me-1" />슬롯 공베팅 설정</h5>
                <div className="form-group row mb-2">
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">사용 유무</label>
                        <div className="col-md-10">
                            <select name="emptyBetUseYN" className="form-select w-auto" required defaultValue="1">
                                <option value="0">사용 안함</option>
                                <option value="1">사용</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">지정 선택</label>
                        <div className="col-md-10">
                            <select name="emptyBetHierarchy" className="form-select w-auto" required defaultValue="1">
                                <option value="0">하위 포함 안함</option>
                                <option value="1">하위 포함</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">사용 타입</label>
                        <div className="col-md-10">
                            <select name="emptyBetType" className="form-select w-auto" required defaultValue="1">
                                <option value="1">판수</option>
                                <option value="2">차감(%)</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">판수 선택</label>
                        <div className="col-md-10">
                            <div className="row ps-2 align-items-center">
                                <input type="number" className="form-control w-70px" min="0" defaultValue="10" />
                                <label className="col-form-label w-auto">판 이후부터 </label>
                                <input type="number" className="form-control w-70px" min="0" defaultValue="10" />
                                <label className="col-form-label w-auto">판 사이에 한판을 뺍니다.</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-md-2">예외 선택</label>
                        <div className="col-md-10">
                            <div className="row mb-2 align-items-center">
                                <label className="col-form-label w-auto">당첨인 경우 </label>
                                <select name="emptyBetWinBet" className="form-select w-auto" required defaultValue="1">
                                    <option value="0">포함 안함</option>
                                    <option value="1">포함</option>
                                </select>
                            </div>
                            <div className="row align-items-center">
                                <label className="col-form-label w-auto">1일 초기화 </label>
                                <select name="emptyBetDayInit" className="form-select w-auto" required defaultValue="0">
                                    <option value="1">초기화</option>
                                    <option value="0">초기화 안함</option>
                                </select>
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
