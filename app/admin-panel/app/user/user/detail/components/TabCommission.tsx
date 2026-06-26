import React, { useState } from "react";

interface TabCommissionProps {
    userIdx: string | null;
}

export default function TabCommission({ userIdx }: TabCommissionProps) {
    const [gameGroup, setGameGroup] = useState("0"); // 0: Common, 2: Casino/Slot, 5: Board, 4: Mini, 1: Sport
    const [boardGameTab, setBoardGameTab] = useState("play"); // play, papa, wild, ...

    return (
        <div>
            <div className="row mb-2">
                <div className="col">
                    <div className="d-flex bg-white p-2 border rounded">
                        <div className="btn-group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="gameGroupIdx"
                                id="gameGroupIdx0"
                                checked={gameGroup === "0"}
                                onChange={() => setGameGroup("0")}
                            />
                            <label className="btn btn-outline-primary" htmlFor="gameGroupIdx0">공통</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="gameGroupIdx"
                                id="gameGroupIdx2"
                                checked={gameGroup === "2"}
                                onChange={() => setGameGroup("2")}
                            />
                            <label className="btn btn-outline-primary" htmlFor="gameGroupIdx2">카지노/슬롯</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="gameGroupIdx"
                                id="gameGroupIdx5"
                                checked={gameGroup === "5"}
                                onChange={() => setGameGroup("5")}
                            />
                            <label className="btn btn-outline-primary" htmlFor="gameGroupIdx5">보드게임</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="gameGroupIdx"
                                id="gameGroupIdx4"
                                checked={gameGroup === "4"}
                                onChange={() => setGameGroup("4")}
                            />
                            <label className="btn btn-outline-primary" htmlFor="gameGroupIdx4">미니게임</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="gameGroupIdx"
                                id="gameGroupIdx1"
                                checked={gameGroup === "1"}
                                onChange={() => setGameGroup("1")}
                            />
                            <label className="btn btn-outline-primary" htmlFor="gameGroupIdx1">스포츠</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-tab-content bg-white p-3 border rounded">
                {gameGroup === "0" && (
                    <div id="tabContent0">
                        <h5 className="mt-2"><i className="fa fa-cog me-1" />통합 충전 보너스</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Integrate Charge Bonus"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">사용유무</td>
                                        <td className="py-1 text-start ps-3">
                                            <select name="userIntegrateChargeBonusUseYN" className="form-select d-inline w-auto me-2" defaultValue="">
                                                <option value="">사용 안함</option>
                                                <option value="1">사용</option>
                                            </select>
                                            <span className="me-2">포함</span>
                                            <select name="userIntegrateChargeBonusUseYNType" className="form-select d-inline w-auto" defaultValue="0">
                                                <option value="0">선택</option>
                                                <option value="1">본인만</option>
                                                <option value="2">본인+직속회원</option>
                                                <option value="3">전체</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {[1, 2, 3, 4].map(idx => (
                                        <tr key={idx}>
                                            <td className="bg-light w-150px">통합충전{idx}</td>
                                            <td className="py-1 text-start ps-3">
                                                <input
                                                    type="text"
                                                    className="form-control d-inline w-300px me-2"
                                                    placeholder="텍스트 문구 지정"
                                                />
                                                <input type="text" className="form-control d-inline w-60px me-1" />
                                                <span className="me-3">%</span>
                                                <span className="me-1">최대</span>
                                                <input type="text" className="form-control d-inline w-80px text-end" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>

                        <h5 className="mt-4"><i className="fa fa-cog me-1" />루징 설정</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Losing Setting Common"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">충환 루징</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" />
                                            <span className="me-2">%</span>
                                            <span>하부 설정 X</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-light w-150px">루징타입</td>
                                        <td className="py-1 text-start ps-3">
                                            <select className="form-select d-inline w-auto" defaultValue="">
                                                <option value="">선택 : 적용안됨</option>
                                                <option value="1">충전-환전-롤링</option>
                                                <option value="2">총베팅-총당첨-롤링</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {gameGroup === "2" && (
                    <div id="tabContent2">
                        <h5 className="mt-2"><i className="fa fa-cog me-1" />제한 설정</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Game Limit"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">카지노 사용유무</td>
                                        <td className="py-1 text-start ps-3">
                                            <select className="form-select d-inline w-auto me-2" name="data[2][useYN]" defaultValue="">
                                                <option value="">선택</option>
                                                <option value="1">사용</option>
                                                <option value="0">미사용</option>
                                            </select>
                                            <span className="me-2">지정선택</span>
                                            <select className="form-select d-inline w-auto" name="data[2][useChildYN]" defaultValue="">
                                                <option value="">지정선택</option>
                                                <option value="0">직속 회원만</option>
                                                <option value="1">하위 포함</option>
                                                <option value="2">본인만</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-light w-150px">슬롯 사용유무</td>
                                        <td className="py-1 text-start ps-3">
                                            <select className="form-select d-inline w-auto me-2" name="data[3][useYN]" defaultValue="">
                                                <option value="">선택</option>
                                                <option value="1">사용</option>
                                                <option value="0">미사용</option>
                                            </select>
                                            <span className="me-2">지정선택</span>
                                            <select className="form-select d-inline w-auto" name="data[3][useChildYN]" defaultValue="">
                                                <option value="">지정선택</option>
                                                <option value="0">직속 회원만</option>
                                                <option value="1">하위 포함</option>
                                                <option value="2">본인만</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>

                        <h5 className="mt-4"><i className="fa fa-cog me-1" />베팅 수수료</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Betting Commission"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">카지노</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" name="data[4][commission]" />
                                            <span className="me-2">%</span>
                                            <span>하부 설정 X</span>
                                        </td>
                                        <td className="bg-light w-150px">슬롯</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" name="data[5][commission]" />
                                            <span className="me-2">%</span>
                                            <span>하부 설정 X</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-light w-150px">무효베팅 수수료</td>
                                        <td className="py-1 text-start ps-3" colSpan={3}>
                                            <select className="form-select d-inline w-auto" name="invalidBettingCommission" defaultValue="">
                                                <option value="">선택</option>
                                                <option value="0">미포함</option>
                                                <option value="1">포함</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>

                        <h5 className="mt-4"><i className="fa fa-cog me-1" />루징 설정</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Losing Setting"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">카지노</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" name="data[2][losing]" />
                                            <span className="me-2">%</span>
                                            <span>하부 설정 X</span>
                                        </td>
                                        <td className="bg-light w-150px">슬롯</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" name="data[3][losing]" />
                                            <span className="me-2">%</span>
                                            <span>하부 설정 X</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>

                        <h5 className="mt-4"><i className="fa fa-cog me-1" />회원콤프 설정</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Comp Setting"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">회원콤프</td>
                                        <td className="py-1 text-start ps-3">
                                            <input type="text" className="form-control d-inline w-80px me-1" name="comp" />
                                            <span className="me-1">%</span>
                                            <small className="text-muted ms-2">회원 콤프는 회원 본인만 적용됩니다. 카지노/슬롯 게임에만 적용됩니다.</small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                            </div>
                        </form>

                        <h5 className="mt-4"><i className="fa fa-cog me-1" />충전 보너스 설정 <small className="text-danger fs-6">- 초기화시 레벨별 설정에 따라 지급 됩니다.</small></h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Saved Charge Bonus Setting"); }}>
                            <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                <tbody>
                                    <tr>
                                        <td className="bg-light w-150px">첫충 보너스</td>
                                        <td className="py-1 text-start ps-3">
                                            <span className="me-1">카지노</span>
                                            <input type="text" className="form-control d-inline w-50px me-1" name="firstChargeCommission[2]" />
                                            <span className="me-2">%</span>
                                            <span className="me-1">슬롯</span>
                                            <input type="text" className="form-control d-inline w-50px me-1" name="firstChargeCommission[3]" />
                                            <span className="me-2">%</span>
                                            <span className="me-1">최대 보너스</span>
                                            <input type="text" className="form-control d-inline w-70px me-2 text-end" name="firstChargeBonusLimit[2]" />
                                            <span className="text-danger">0 입력시 보너스 지급하지 않음</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-light w-150px">매충 보너스</td>
                                        <td className="py-1 text-start ps-3">
                                            <span className="me-1">카지노</span>
                                            <input type="text" className="form-control d-inline w-50px me-1" name="everyChargeCommission[2]" />
                                            <span className="me-2">%</span>
                                            <span className="me-1">슬롯</span>
                                            <input type="text" className="form-control d-inline w-50px me-1" name="everyChargeCommission[3]" />
                                            <span className="me-2">%</span>
                                            <span className="me-1">최대 보너스</span>
                                            <input type="text" className="form-control d-inline w-70px me-2 text-end" name="everyChargeBonusLimit[2]" />
                                            <span className="text-danger">0 입력시 보너스 지급하지 않음</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success me-1">
                                    <i className="fa fa-save me-1" />저장
                                </button>
                                <button type="button" className="btn btn-danger me-1" onClick={() => alert("Reset Charge Bonus")}>
                                    <i className="fa-solid fa-trash-can me-1" />초기화
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {gameGroup === "5" && (
                    <div id="tabContent5">
                        <div className="btn-group mb-3">
                            <button className={`btn ${boardGameTab === 'play' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('play')}>플레이홀덤</button>
                            <button className={`btn ${boardGameTab === 'papa' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('papa')}>파파홀덤</button>
                            <button className={`btn ${boardGameTab === 'wild' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('wild')}>와일드홀덤</button>
                            <button className={`btn ${boardGameTab === 'kor' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('kor')}>웹맞고</button>
                            <button className={`btn ${boardGameTab === 'baduki' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('baduki')}>웹바둑이</button>
                            <button className={`btn ${boardGameTab === 'royal' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setBoardGameTab('royal')}>로얄홀덤</button>
                        </div>

                        {boardGameTab === 'play' && (
                            <div>
                                <h5 className="mt-2"><i className="fa fa-cog me-1" />플레이홀덤 - 제한 설정</h5>
                                {/* Simulating form content */}
                                <form onSubmit={(e) => { e.preventDefault(); alert("Saved PlayHoldem Settings"); }}>
                                    <table className="table table-bordered table-responsive align-middle text-center fw-bold">
                                        <tbody>
                                            <tr>
                                                <td className="bg-light w-150px">플레이홀덤 사용유무</td>
                                                <td className="py-1 text-start ps-3">
                                                    <select className="form-select d-inline w-auto me-2" defaultValue="">
                                                        <option value="">선택</option>
                                                        <option value="1">사용</option>
                                                        <option value="0">미사용</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success"><i className="fa fa-save me-1" />저장</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {/* Add other board game tabs placeholders or implementation */}
                        {boardGameTab !== 'play' && (
                            <div className="p-5 text-center bg-light border rounded">
                                <p className="text-muted">설정 내용 ({boardGameTab})</p>
                            </div>
                        )}
                    </div>
                )}

                {(gameGroup === "4" || gameGroup === "1") && (
                    <div className="p-5 text-center bg-light border rounded">
                        <p className="text-muted">준비중...</p>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col text-center mt-3">
                    <button type="button" className="btn btn-gray" onClick={() => window.close()}>
                        <i className="fa-solid fa-xmark me-2" />
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
