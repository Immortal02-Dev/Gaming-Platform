import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 포인트전환 | My Account',
  description: 'TB-14 gaming platform point conversion page',
}

export default function PointPage() {
  return (
    <MyLayout>
      <div className="user-main">
              <div className="deposit-section">
                <div className="deposit-container">
                  {/* Deposit Form */}
                  <form action="" className="deposit-form">
                    {/* Deposit Title */}
                    <div className="deposit-title">
                      <p>포인트전환</p>
                    </div>

                    {/* Holding Amount */}
                    <div className="holding-amount">
                      <div className="holding-head">
                        <div className="holding-title">
                          <span className="holding-title-text">보유포인트</span>
                        </div>
                      </div>

                      <div className="holding-value">
                        <span className="holding-value-text">0P</span>
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
                                  placeholder="최소 1P 이상 1P 단위 전환가능"
                                  spellCheck="false"
                                  className="amount-input"
                                  type="text"
                                  defaultValue=""
                                  name="amount"
                                />
                              </div>
                              {/* <button type="button" className="amount-input-btn"> 
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
                              </button> */}
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
                          <div className="amount-btn-title">전액</div>
                        </button>
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
                        <p>포인트 전환 안내사항</p>
                        <ul>
                          <li>
                            <p>
                              포인트를 머니로 1:1 비율로 전환할 수 있습니다.
                            </p>
                          </li>
                          <li>
                            <p>
                              포인트 전환은 관리자의 승인없이 즉시 전환이
                              가능합니다.
                            </p>
                          </li>
                          <li>
                            <p>
                              포인트는 각종 이벤트를 통해 획득할 수 있습니다.
                            </p>
                          </li>
                        </ul>
                        <p style={{ margin: '10px 0' }}><br /></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deposit History */}
                <div className="deposit-history">
                  <div className="history-header">
                    <div className="history-title">
                      <p>포인트내역</p>
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
                              <div className="filter-value-text">전체</div>
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
                                  <div className="filter-option-item">전체</div>
                                  <div className="filter-option-item">입금</div>
                                  <div className="filter-option-item">
                                    입금 보너스
                                  </div>
                                  <div className="filter-option-item">출금</div>
                                  <div className="filter-option-item">
                                    출금 취소
                                  </div>
                                  <div className="filter-option-item">
                                    포인트 전환
                                  </div>
                                  <div className="filter-option-item">
                                    수동 처리
                                  </div>
                                  <div className="filter-option-item">
                                    스포츠 베팅
                                  </div>
                                  <div className="filter-option-item">
                                    스포츠 베팅취소
                                  </div>
                                  <div className="filter-option-item">
                                    스포츠 적중
                                  </div>
                                  <div className="filter-option-item">
                                    스포츠 적중취소
                                  </div>
                                  <div className="filter-option-item">
                                    실시간 베팅
                                  </div>
                                  <div className="filter-option-item">
                                    실시간 취소
                                  </div>
                                  <div className="filter-option-item">
                                    실시간 적중
                                  </div>
                                  <div className="filter-option-item">
                                    실시간 적중취소
                                  </div>
                                  <div className="filter-option-item">
                                    카지노 베팅
                                  </div>
                                  <div className="filter-option-item">
                                    카지노 적중
                                  </div>
                                  <div className="filter-option-item">
                                    카지노 베팅취소
                                  </div>
                                  <div className="filter-option-item">
                                    슬롯 베팅
                                  </div>
                                  <div className="filter-option-item">
                                    슬롯 적중
                                  </div>
                                  <div className="filter-option-item">
                                    슬롯 베팅취소
                                  </div>
                                  <div className="filter-option-item">
                                    슬롯 보너스
                                  </div>
                                  <div className="filter-option-item">
                                    미니게임 베팅
                                  </div>
                                  <div className="filter-option-item">
                                    미니게임 베팅취소
                                  </div>
                                  <div className="filter-option-item">
                                    미니게임 적중
                                  </div>
                                  <div className="filter-option-item">
                                    미니게임 적중취소
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                          id="start"
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
                          id="end"
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
                          <th>일시</th>
                          <th>종류</th>
                          <th>변동 포인트</th>
                          <th>누적 포인트</th>
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