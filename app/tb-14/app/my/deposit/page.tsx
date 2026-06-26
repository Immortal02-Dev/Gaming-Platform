import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 입금 | My Account',
  description: 'TB-14 gaming platform deposit page',
}

export default function DepositPage() {
  return (
    <MyLayout>
      <div className="user-main">
        <div className="deposit-section">
          <div className="deposit-container">
            {/* Deposit Form */}
            <form action="" className="deposit-form">
              {/* Deposit Title */}
              <div className="deposit-title">
                <p>입금 신청</p>
              </div>

              {/* Deposit Tab */}
              <div className="deposit-tab-container">
                <button className="deposit-tab-btn">
                  <div className="deposit-tab-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        d="M21.5 9v10M5.5 9v10m-3-10v10m16-10v10M2 21h20M0 23.5h24M12 11h-1a1 1 0 0 0-1 1v.375a1 1 0 0 0 .72.96l2.56.747a1 1 0 0 1 .72.96V16a1 1 0 0 1-1 1h-1m0-6h1a1 1 0 0 1 1 1v.5M12 11V9m0 8h-1a1 1 0 0 1-1-1v-.5m2 1.5v2M23.5 6.25V7H.5v-.75C5.5 4.5 8.5 3 11.75.5h.5C15.5 3 18.5 4.5 23.5 6.25Z"
                      />
                    </svg>
                  </div>
                  <div className="deposit-tab-text">현금 입금</div>
                </button>
                <div>
                  <div className="deposit-guide-list">
                    <div className="deposit-guide-item">
                      <h5>
                        <span>입금순서 안내</span>
                      </h5>
                      <ol>
                        <li>
                          <p>입금할 금액 입력, 보너스선택 (선택사항)</p>
                        </li>
                        <li><p>입금 계좌 요청 버튼 클릭</p></li>
                        <li><p>입금전용계좌 발급 알림</p></li>
                        <li><p>안내된 계좌로 5분 이내에 입금</p></li>
                        <li><p>입금 완료 확인 버튼 클릭</p></li>
                        <li>
                          <p>
                            담당 부서에서 입금 확인 후 관리자 승인 처리
                            (완료)
                          </p>
                        </li>
                      </ol>
                      <p><br /></p>
                      <h5>
                        <span>입금 주의사항</span>
                      </h5>
                      <ul>
                        <li><p>최소 만원 이상 입금 가능합니다.</p></li>
                        <li>
                          <p>
                            허위 신청시 경고없이 회원자격이 박탈됩니다.
                          </p>
                        </li>
                        <li>
                          <p>
                            입금전용계좌 발급 후 5분이내 입금이 완료되지
                            않을 경우 자동취소됩니다.
                          </p>
                        </li>
                        <li>
                          <p>
                            입금 보너스 미선택시 롤링규정은 입금액의 100%
                            입니다.
                          </p>
                        </li>
                        <li>
                          <p>
                            자정기준으로 출금기록이 있을경우 모든 보너스
                            대상에서 제외됩니다.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Amount */}
              <div className="deposit-amount">
                <div className="amount-container">
                  <div className="amount-inner">
                    <div className="amount-head">
                      <div className="amount-head-title">
                        <span className="amount-head-text">입금예정금액</span>
                      </div>
                    </div>
                    <label className="amount-input-form">
                      <label className="amount-label">
                        <div className="amount-input-box">
                          <input
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="숫자만 입력해주세요."
                            spellCheck="false"
                            className="amount-input"
                            type="text"
                            defaultValue="10,000"
                            name="amount"
                          />
                        </div>
                        <button type="button" className="amount-input-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="-2 -2 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m11.414 10l2.829-2.828a1 1 0 1 0-1.415-1.415L10 8.586L7.172 5.757a1 1 0 0 0-1.415 1.415L8.586 10l-2.829 2.828a1 1 0 0 0 1.415 1.415L10 11.414l2.828 2.829a1 1 0 0 0 1.415-1.415L11.414 10zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10z"
                            />
                          </svg>
                        </button>
                      </label>
                    </label>
                  </div>
                </div>
                <div className="amount-btns">
                  <button className="amount-btn">
                    <div className="amount-btn-title">+1만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+3만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+5만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+10만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+100만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+300만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+500만</div>
                  </button>
                  <button className="amount-btn">
                    <div className="amount-btn-title">+1,000만</div>
                  </button>
                </div>
              </div>

              {/* Deposit Bonus */}
              <div className="deposit-bonus">
                <div className="bonus-head">
                  <div className="bonus-head-title">
                    <span className="bonus-head-text">입금 보너스 선택</span>
                  </div>
                </div>
                <div className="bonus-item">
                  <div className="bonus-item-icon"></div>
                  <div className="bonus-item-text">
                    <div className="bonus-item-title">
                      미니게임, 슬롯, 카지노 전용
                    </div>
                    <div className="bonus-item-desc">
                      모든 게임 이용 가능하며 충전보너스 포인트 지급되지
                      않습니다.
                    </div>
                  </div>
                </div>
                <div className="bonus-item">
                  <div className="bonus-item-icon"></div>
                  <div className="bonus-item-text">
                    <div className="bonus-item-title">
                      매일 첫 충전(스포츠 전용)
                    </div>
                    <div className="bonus-item-desc">
                      최대 50만 포인트 지급 되며 스포츠게임 롤링 100%
                      충족되어야 출금 가능 합니다.
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Button */}
              <div className="deposit-button">
                <button type="submit" className="deposit-btn-submit disabled">
                  <div className="deposit-btn-text">입금계좌 요청하기</div>
                </button>
              </div>
            </form>

            {/* Deposit Guide */}
            <div className="deposit-guide">
              <div className="deposit-guide-list">
                <div className="deposit-guide-item">
                  <h5>
                    <span>입금순서 안내</span>
                  </h5>
                  <ol>
                    <li>
                      <p>입금할 금액 입력, 보너스선택 (선택사항)</p>
                    </li>
                    <li><p>입금 계좌 요청 버튼 클릭</p></li>
                    <li><p>입금전용계좌 발급 알림</p></li>
                    <li><p>안내된 계좌로 5분 이내에 입금</p></li>
                    <li><p>입금 완료 확인 버튼 클릭</p></li>
                    <li>
                      <p>
                        담당 부서에서 입금 확인 후 관리자 승인 처리 (완료)
                      </p>
                    </li>
                  </ol>
                  <p style={{ margin: '10px 0' }}><br /></p>
                  <h5>
                    <span>입금 주의사항</span>
                  </h5>
                  <ul>
                    <li><p>최소 만원 이상 입금 가능합니다.</p></li>
                    <li>
                      <p>허위 신청시 경고없이 회원자격이 박탈됩니다.</p>
                    </li>
                    <li>
                      <p>
                        입금전용계좌 발급 후 5분이내 입금이 완료되지 않을
                        경우 자동취소됩니다.
                      </p>
                    </li>
                    <li>
                      <p>
                        입금 보너스 미선택시 롤링규정은 입금액의 100%
                        입니다.
                      </p>
                    </li>
                    <li>
                      <p>
                        자정기준으로 출금기록이 있을경우 모든 보너스
                        대상에서 제외됩니다.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit History */}
          <div className="deposit-history">
            <div className="history-header">
              <div className="history-title">
                <p>입금내역</p>
              </div>
              <button type="button" className="history-delete-btn">
                <div className="history-delete-text">전체삭제</div>
              </button>
            </div>

            {/* Deposit History List */}
            <div className="history-list">
              {/* History Filter */}
              <div className="history-filter">
                <div className="filter-wrapper">
                  <div className="filter-inner" style={{ width: '140px' }}>
                    <div className="filter-select">
                      <div className="filter-value">
                        <div className="filter-value-text">최근 1주일</div>
                      </div>

                      <div className="filter-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19 "
                          height="19"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001c13.2-13.2 34.8-13.2 48 0l451.8 451.8l445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199z"
                          />
                        </svg>
                      </div>

                      <div className="filter-options">
                        <div className="filter-options-inner">
                          <div className="filter-options-list">
                            <div className="filter-option-item">오늘</div>
                            <div className="filter-option-item">어제</div>
                            <div className="filter-option-item">
                              최근 1주일
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="filter-date"
                    style={{ width: '170px' }}
                  >
                    <div className="filter-date-wrapper">
                      <span className="filter-date-value">2025-06-17</span>
                      <div className="filter-date-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className="filter-date"
                    style={{ width: '170px' }}
                  >
                    <div className="filter-date-wrapper">
                      <span className="filter-date-value">2025-06-24</span>
                      <div className="filter-date-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <table className="history-table">
                <thead>
                  <tr>
                    <th>신청일시</th>
                    <th>입금신청금액</th>
                    <th>보너스적용</th>
                    <th>보너스비율</th>
                    <th>목표롤링</th>
                    <th>보너스 포인트</th>
                    <th>상태</th>
                    <th style={{ width: '100px' }}>삭제</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>

              {/* Empty List */}
              <div className="empty-list">
                <div className="empty-list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14c0 .63-.502 1.141-1.11 1.141Z"
                    ></path>
                  </svg>
                </div>
                <p className="empty-list-text">
                  해당기간 입금내역이 없습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyLayout>
  )
}