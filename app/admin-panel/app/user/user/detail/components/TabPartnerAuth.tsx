import React, { useState } from "react";

interface TabPartnerAuthProps {
    userIdx: string | null;
}

export default function TabPartnerAuth({ userIdx }: TabPartnerAuthProps) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); alert("Saved"); }}>
            <h5><i className="fa fa-cog me-1" />파트너 권한 설정</h5>
            <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                <tbody>
                    <tr>
                        <td className="bg-gray-300 w-150px">파트너 등록</td>
                        <td className="p-1 text-left">
                            <select name="partnerAddAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                                <option value="2">관리자 승인</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="partnerAddAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                        <td className="bg-gray-300 w-150px">파트너 수정</td>
                        <td className="p-1 text-left">
                            <select name="partnerModifyAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="partnerModifyAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">파트너 비밀번호 수정</td>
                        <td className="p-1 text-left">
                            <select name="partnerPasswordModifyAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="partnerPasswordModifyAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                        <td className="bg-gray-300" style={{ width: 180 }}>파트너 수수료 등록 / 수정</td>
                        <td className="p-1 text-left">
                            <select name="partnerCommissionAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="partnerCommissionAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">회원 등록</td>
                        <td className="p-1 text-left">
                            <select name="userAddAuth" className="form-select w-auto d-inline" defaultValue="2">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                                <option value="2">관리자 승인</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userAddAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userMultiRegisterAuth" defaultChecked value="1" />
                                <label htmlFor="userMultiRegisterAuth">일괄등록</label>
                            </div>
                        </td>
                        <td className="bg-gray-300 w-150px">회원 수정</td>
                        <td className="p-1 text-left">
                            <select name="userModifyAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userModifyAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="bg-gray-300 w-150px">회원 비밀번호 수정</td>
                        <td className="p-1 text-left">
                            <select name="userPasswordModifyAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userPasswordModifyAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                        <td className="bg-gray-300 w-150px">수수료 등록 / 수정</td>
                        <td className="p-1 text-left">
                            <select name="userCommissionAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userCommissionAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="bg-gray-300 w-150px">게임머니 지급 / 회수</td>
                        <td className="p-1 text-left">
                            <select name="userMoneyChargeAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userMoneyChargeAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userMoneyChargeAuthUserType" value="1" />
                                <label htmlFor="userMoneyChargeAuthUserType">회수불가</label>
                            </div>
                        </td>
                        <td className="bg-gray-300 w-150px">카지노머니 지급 / 회수</td>
                        <td className="p-1 text-left">
                            <select name="userCasinoMoneyChargeAuth" className="form-select w-auto d-inline" defaultValue="0">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                            <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                <input className="form-check-input" type="checkbox" id="userCasinoMoneyChargeAuthLock" value="1" />
                                <i className="fas fa-lg fa-fw fa-lock-open" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">파트너 로그인</td>
                        <td className="p-1 text-left" colSpan={3}>
                            <select name="partnerLoginAuth" className="form-select w-auto d-inline" defaultValue="1">
                                <option value="0">이용 불가</option>
                                <option value="1">이용 가능</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="bg-gray-300 w-150px">포인트 전환</td>
                        <td className="p-1" colSpan={3}>
                            <div className="d-flex align-items-center">
                                <label className="col-form-label mx-2">포인트 전환 사용유무</label>
                                <select name="pointChangeAuth" className="form-select w-auto" defaultValue="0">
                                    <option value="0">이용 가능</option>
                                    <option value="1">이용 불가</option>
                                </select>
                                <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                    <input className="form-check-input" type="checkbox" id="pointChangeAuthLock" value="1" />
                                    <i className="fas fa-lg fa-fw fa-lock-open" />
                                </div>

                                <label className="col-form-label mx-2">유저웹 표시여부</label>
                                <select name="pointChangeUserWebAuth" className="form-select w-auto" defaultValue="0">
                                    <option value="0">표시</option>
                                    <option value="1">미표시</option>
                                </select>
                                <div className="form-check form-check-inline ms-2" style={{ verticalAlign: "middle" }}>
                                    <input className="form-check-input" type="checkbox" id="pointChangeUserWebAuthLock" value="1" />
                                    <i className="fas fa-lg fa-fw fa-lock-open" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">충전 보너스 사용유무</td>
                        <td className="p-1" colSpan={3}>
                            <div className="d-flex align-items-center">
                                <label className="col-form-label mx-2">사용유무</label>
                                <select name="isUseChargeBonus" className="form-select w-auto" defaultValue="1">
                                    <option value="0">이용 불가</option>
                                    <option value="1">이용 가능</option>
                                </select>
                                <label className="col-form-label mx-2">포함</label>
                                <select name="isUseChargeBonusType" className="form-select w-auto" defaultValue="0">
                                    <option value="0">선택</option>
                                    <option value="1">본인만</option>
                                    <option value="2">본인+직속회원</option>
                                    <option value="3">전체</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-200px">통합 충전 보너스 사용유무</td>
                        <td className="p-1" colSpan={3}>
                            <div className="d-flex align-items-center">
                                <label className="col-form-label mx-2">사용유무</label>
                                <select name="userIntegrateChargeBonusAuth" className="form-select w-auto" defaultValue="0">
                                    <option value="0">이용 불가</option>
                                    <option value="1">이용 가능</option>
                                </select>
                                <label className="col-form-label mx-2">포함</label>
                                <select name="userIntegrateChargeBonusAuthType" className="form-select w-auto" defaultValue="0">
                                    <option value="0">선택</option>
                                    <option value="1">본인만</option>
                                    <option value="2">본인+직속회원</option>
                                    <option value="3">전체</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-200px">출석 이벤트 사용유무</td>
                        <td className="p-1" colSpan={3}>
                            <div className="d-flex align-items-center">
                                <label className="col-form-label mx-2">사용유무</label>
                                <select name="userAttendanceUseYN" className="form-select w-auto" defaultValue="">
                                    <option value="">사이트 설정</option>
                                    <option value="1">이용 불가</option>
                                </select>
                                <label className="col-form-label mx-2">포함</label>
                                <select name="userAttendanceUseYNType" className="form-select w-auto" defaultValue="0">
                                    <option value="0">선택</option>
                                    <option value="1">본인만</option>
                                    <option value="2">본인+직속회원</option>
                                    <option value="3">전체</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h5><i className="fa fa-cog me-1" />기본 설정</h5>
            <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                <tbody>
                    <tr>
                        <td className="bg-gray-300 w-150px">충전 재신청 대기시간</td>
                        <td className="text-start p-1">
                            <input type="text" name="chargeRequestDelayTime" className="form-control w-80px d-inline me-2" defaultValue="" />
                            <label className="col-form-label">분</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">환전 재신청 대기시간</td>
                        <td className="text-start p-1">
                            <input type="text" name="exchangeRequestDelayTime" className="form-control w-80px d-inline me-2" defaultValue="" />
                            <label className="col-form-label">분</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">환전 비밀번호 사용여부</td>
                        <td className="text-start p-1">
                            <select name="exchangePasswordUseYN" className="form-select w-auto me-2" defaultValue="">
                                <option value="">선택</option>
                                <option value="0">미사용</option>
                                <option value="1">사용</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gray-300 w-150px">유저웹 비밀번호 변경</td>
                        <td className="p-1" colSpan={3}>
                            <div className="d-flex flex-wrap align-items-center">
                                <label className="col-form-label mx-2">사용유무</label>
                                <select name="userSitePasswordEditYN" className="form-select w-auto" defaultValue="">
                                    <option value="">사이트 설정</option>
                                    <option value="0">이용 불가</option>
                                </select>
                                <span className="col-form-label ms-2 text-danger">* 사이트 설정 : 사이트 설정을 따라갑니다.</span>
                                <span className="col-form-label ms-2 text-danger">* 이용 불가 : 비밀번호 변경이 불가능합니다.</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="col text-center my-3">
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
