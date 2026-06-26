"use client";

import Layout from "@/components/Layout";

export default function UserBatchPage() {
  return (
    <Layout>
      <h1 className="page-header">
        <a href="/userBatch.html">
          <i className="fa fa-users me-2"></i>회원 일괄 적용
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col-md-7">
          <div className="panel panel-inverse" data-sortable-id="form-1" data-sortable="false">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                회원 일괄 적용
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
              <div className="row mb-2 bg-gray-300 py-2 rounded">
                <label className="col-form-label w-220px">대상 선택</label>
                <div className="col d-inline-flex">
                  <div className="form-check form-check-inline col-form-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                      defaultValue="1"
                    />
                    <label className="form-check-label" htmlFor="checkAll">
                      전체
                    </label>
                  </div>

                  <div className="input-group me-2" style={{ width: "300px" }}>
                    <input
                      type="text"
                      name="userID"
                      id="userID"
                      onClick={() => {/* userSelectPopup() */}}
                      className="form-control"
                      required
                      readOnly
                      defaultValue=""
                    />
                    <input
                      type="hidden"
                      name="userIdx"
                      id="userIdx"
                      className="form-control"
                      defaultValue=""
                    />
                    <input
                      type="hidden"
                      name="child"
                      id="child"
                      className="form-control"
                      defaultValue=""
                    />
                    <a className="btn btn-primary" onClick={() => {/* userSelectPopup() */}}>
                      <i className="fas fa-check me-2"></i>선택
                    </a>
                  </div>

                  <select
                    name="userDistributor"
                    id="userDistributor"
                    className="form-select w-auto me-2"
                  >
                    <option value="">파트너 단계</option>
                    <option value="0">파트너 전체</option>
                    <option value="1">부본사</option>
                    <option value="2">총판</option>
                    <option value="3">대리점1단계</option>
                    <option value="4">대리점2단계</option>
                    <option value="5">대리점3단계</option>
                    <option value="6">대리점4단계</option>
                    <option value="7">대리점5단계</option>
                  </select>

                  <select
                    name="userGrade"
                    id="userGrade"
                    className="form-select w-auto me-2"
                  >
                    <option value="">유저 레벨</option>
                    <option value="0">유저 전체</option>
                    <option value="1">1레벨</option>
                    <option value="2">2레벨</option>
                    <option value="3">3레벨</option>
                    <option value="4">4레벨</option>
                    <option value="5">5레벨</option>
                    <option value="6">6레벨</option>
                    <option value="7">7레벨</option>
                    <option value="8">8레벨</option>
                    <option value="9">9레벨</option>
                    <option value="10">10레벨</option>
                    <option value="11">11레벨</option>
                    <option value="12">12레벨</option>
                    <option value="13">13레벨</option>
                    <option value="14">14레벨</option>
                    <option value="15">15레벨</option>
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">적용 항목</label>
                <div className="col">
                  <select name="batchType" id="batchType" className="form-select w-auto">
                    <option value="">적용할 항목을 선택하세요</option>
                    <option value="status">회원 상태 변경</option>
                    <option value="grade">회원 레벨 변경</option>
                    <option value="money">머니 지급/차감</option>
                    <option value="point">포인트 지급/차감</option>
                    <option value="message">쪽지 발송</option>
                    <option value="bonus">보너스 지급</option>
                  </select>
                </div>
              </div>

              {/* 회원 상태 변경 */}
              <div className="row mb-2 batch-option" id="statusOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">변경할 상태</label>
                <div className="col">
                  <select name="newStatus" className="form-select w-auto">
                    <option value="1">가입대기</option>
                    <option value="2">정상</option>
                    <option value="3">정지</option>
                    <option value="4">탈퇴</option>
                    <option value="5">테스터</option>
                  </select>
                </div>
              </div>

              {/* 회원 레벨 변경 */}
              <div className="row mb-2 batch-option" id="gradeOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">변경할 레벨</label>
                <div className="col">
                  <select name="newGrade" className="form-select w-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(level => (
                      <option key={level} value={level}>{level}레벨</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 머니 지급/차감 */}
              <div className="row mb-2 batch-option" id="moneyOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">머니 금액</label>
                <div className="col d-flex">
                  <select name="moneyType" className="form-select w-auto me-2">
                    <option value="plus">지급</option>
                    <option value="minus">차감</option>
                  </select>
                  <input
                    type="text"
                    name="moneyAmount"
                    className="form-control w-auto me-2"
                    placeholder="금액 입력"
                  />
                  <input
                    type="text"
                    name="moneyMemo"
                    className="form-control"
                    placeholder="메모 입력"
                  />
                </div>
              </div>

              {/* 포인트 지급/차감 */}
              <div className="row mb-2 batch-option" id="pointOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">포인트 금액</label>
                <div className="col d-flex">
                  <select name="pointType" className="form-select w-auto me-2">
                    <option value="plus">지급</option>
                    <option value="minus">차감</option>
                  </select>
                  <input
                    type="text"
                    name="pointAmount"
                    className="form-control w-auto me-2"
                    placeholder="포인트 입력"
                  />
                  <input
                    type="text"
                    name="pointMemo"
                    className="form-control"
                    placeholder="메모 입력"
                  />
                </div>
              </div>

              {/* 쪽지 발송 */}
              <div className="row mb-2 batch-option" id="messageOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">쪽지 내용</label>
                <div className="col">
                  <input
                    type="text"
                    name="messageTitle"
                    className="form-control mb-2"
                    placeholder="쪽지 제목"
                  />
                  <textarea
                    name="messageContent"
                    className="form-control"
                    rows={4}
                    placeholder="쪽지 내용을 입력하세요"
                  ></textarea>
                </div>
              </div>

              {/* 보너스 지급 */}
              <div className="row mb-2 batch-option" id="bonusOption" style={{ display: "none" }}>
                <label className="col-form-label w-220px">보너스 설정</label>
                <div className="col d-flex">
                  <select name="bonusType" className="form-select w-auto me-2">
                    <option value="first">첫충 보너스</option>
                    <option value="every">매충 보너스</option>
                    <option value="rolling">롤링 보너스</option>
                    <option value="attendance">출석 보너스</option>
                  </select>
                  <input
                    type="text"
                    name="bonusAmount"
                    className="form-control w-auto me-2"
                    placeholder="보너스 금액"
                  />
                  <input
                    type="text"
                    name="bonusMemo"
                    className="form-control"
                    placeholder="보너스 메모"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={() => {/* executeBatch() */}}
                  >
                    <i className="fa fa-check me-2"></i>일괄 적용 실행
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-lg ms-2"
                    onClick={() => {/* previewBatch() */}}
                  >
                    <i className="fa fa-eye me-2"></i>미리보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-info-circle"></i>
                </span>
                일괄 적용 안내
              </h4>
            </div>
            <div className="panel-body">
              <div className="alert alert-warning">
                <h5><i className="fa fa-exclamation-triangle me-2"></i>주의사항</h5>
                <ul className="mb-0">
                  <li>일괄 적용은 되돌릴 수 없으므로 신중하게 사용하세요.</li>
                  <li>대량의 데이터 처리 시 시간이 오래 걸릴 수 있습니다.</li>
                  <li>미리보기를 통해 적용 대상을 확인한 후 실행하세요.</li>
                  <li>머니/포인트 지급 시 충분한 잔액을 확인하세요.</li>
                </ul>
              </div>

              <div className="alert alert-info">
                <h5><i className="fa fa-info-circle me-2"></i>사용 방법</h5>
                <ol className="mb-0">
                  <li>적용할 대상을 선택합니다.</li>
                  <li>적용할 항목을 선택합니다.</li>
                  <li>세부 설정을 입력합니다.</li>
                  <li>미리보기로 확인 후 실행합니다.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="panel panel-inverse mt-3">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-history"></i>
                </span>
                최근 실행 내역
              </h4>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>실행일시</th>
                      <th>항목</th>
                      <th>대상수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-03-04 15:30</td>
                      <td>머니 지급</td>
                      <td>25명</td>
                    </tr>
                    <tr>
                      <td>2025-03-03 10:15</td>
                      <td>쪽지 발송</td>
                      <td>150명</td>
                    </tr>
                    <tr>
                      <td>2025-03-02 14:20</td>
                      <td>레벨 변경</td>
                      <td>8명</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
