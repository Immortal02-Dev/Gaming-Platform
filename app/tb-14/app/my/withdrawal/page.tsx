import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 출금 | Withdrawal',
  description: 'TB-14 - 출금 | Withdrawal',
}

export default function WithdrawalPage() {
  return (
    <MyLayout>
      
      <div className="user-main">
              <div className="deposit-section">
                <div className="deposit-container">

                  {/* Deposit Form */}
                  <form action="" className="deposit-form">
                    {/* Deposit Title */}
                    <div className="deposit-title">
                      <p>출금 신청</p>
                    </div>

                    {/* Holding Amount */}
                    <div className="holding-amount">
                      <div className="holding-head">
                        <div className="holding-title">
                          <span className="holding-title-text">보유금액</span>
                        </div>
                      </div>

                      <div className="holding-value">
                        <span className="holding-value-text">866,389원</span>
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
                                  
                                  autoComplete="off"
                                  placeholder="숫자만 입력해주세요."
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

                    {/* Member Account Information */}
                    <div className="member-info">
                      <div className="member-info-head">
                        <div className="member-info-title">
                          <span className="member-info-text">회원 계좌 정보</span>
                        </div>
                      </div>

                      <div className="member-info-select">
                        <label className="member-info-label">
                          <div className="member-info-value">
                            <span className="member-value-text">
                              등록된 출금계좌 없음
                            </span>
                          </div>

                          <div className="member-info-arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19 "
                              height="19"
                              viewBox="0 0 1024 1024"
                            >
                              <path
                                fill="currentColor"
                                d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001c13.2-13.2 34.8-13.2 48 0l451.8 451.8l445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199z"
                              ></path>
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Rolling Information */}
                    <div className="rolling-info">
                      <div className="rolling-info-head">
                        <div className="rolling-info-title">
                          <span className="rolling-info-text">롤링 정보</span>
                        </div>
                      </div>

                      <div className="rolling-container">
                        <div className="rolling-wrapper">
                          <div className="rolling-form-title">
                            <strong>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                >
                                  <path
                                    d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                  />
                                  <path
                                    d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                  />
                                </g>
                              </svg>
                              달성
                            </strong>
                            <p>
                              입금액 1,000,000원 : 미니게임, 슬롯, 카지노 전용
                            </p>
                          </div>

                          <div className="rolling-box">
                            <div className="rolling-item">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">스포츠 100%</div>
                              <div className="rolling-item-desc">
                                790,000원 롤링 남음
                              </div>
                            </div>
                            <div className="rolling-item">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">실시간 100%</div>
                              <div className="rolling-item-desc">
                                970,000원 롤링 남음
                              </div>
                            </div>
                            <div className="rolling-item">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">
                                미니게임 100%
                              </div>
                              <div className="rolling-item-desc">
                                622,798원 롤링 남음
                              </div>
                            </div>
                            <div className="rolling-item">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">카지노 100%</div>
                              <div className="rolling-item-desc">
                                626,600원 롤링 남음
                              </div>
                            </div>
                            <div className="rolling-item selected">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">슬롯 100%</div>
                              <div className="rolling-item-desc">
                                1,000,000원 롤링 완료
                              </div>
                            </div>
                            <div className="rolling-item">
                              <div className="rolling-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  >
                                    <path
                                      d="m8.667 12.333l1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9"
                                    />
                                    <path
                                      d="M9.833 4.08c.55-.47.826-.704 1.114-.841a2.442 2.442 0 0 1 2.106 0c.288.137.563.372 1.114.841a3.132 3.132 0 0 0 1.9.788c.722.057 1.083.086 1.384.192a2.442 2.442 0 0 1 1.489 1.49c.106.3.135.66.192 1.382a3.13 3.13 0 0 0 .788 1.901c.47.55.704.826.841 1.114c.319.666.319 1.44 0 2.106c-.137.288-.372.563-.841 1.114a3.13 3.13 0 0 0-.788 1.9c-.057.722-.086 1.083-.192 1.384a2.442 2.442 0 0 1-1.49 1.489c-.3.106-.66.135-1.382.192a3.131 3.131 0 0 0-1.901.788c-.55.47-.826.704-1.114.841a2.441 2.441 0 0 1-2.106 0c-.288-.137-.563-.372-1.114-.841a3.13 3.13 0 0 0-1.9-.788c-.722-.057-1.083-.086-1.384-.192a2.442 2.442 0 0 1-1.489-1.49c-.106-.3-.135-.66-.192-1.382a3.132 3.132 0 0 0-.788-1.901c-.47-.55-.704-.826-.841-1.114a2.442 2.442 0 0 1 0-2.106c.137-.288.372-.563.841-1.114a3.131 3.131 0 0 0 .788-1.9c.057-.722.086-1.083.192-1.384A2.442 2.442 0 0 1 6.55 5.06c.3-.106.66-.135 1.382-.192a3.131 3.131 0 0 0 1.901-.788Z"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="rolling-item-label">
                                가상게임 100%
                              </div>
                              <div className="rolling-item-desc">-</div>
                            </div>
                          </div>

                          <div className="rolling-desc">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none">
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="9.25"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeWidth="1.5"
                                  d="M12 11.813v5"
                                />
                                <circle
                                  cx="12"
                                  cy="8.438"
                                  r="1.25"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                            한가지만 달성해도 출금할 수 있습니다.
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
                          <span>출금순서 안내</span>
                        </h5>
                        <ul>
                          <li><p>1회 최대 환전금액 무제한</p></li>
                          <li><p>1일 최대 환전금액 전레벨 무제한</p></li>
                          <li><p>최소 환전신청금액은 10,000원 입니다.</p></li>
                          <li><p>환전간격은 1시간마다 가능합니다.</p></li>
                          <li>
                            <p>
                              모든 환전은 순차적으로 진행되며 환전 대기 인원이
                              많을 경우 최대 30분까지 소요될 수도 있습니다.
                            </p>
                          </li>
                          <li>
                            <p>
                              회원가입시 기재된 본의 명의로된 계좌로만 출금이
                              가능합니다.
                            </p>
                          </li>
                          <li>
                            <p>
                              은행별 점검 시간에는 환전업무가 지연될 수 있습니다
                              (23:30~00:30까지)
                            </p>
                          </li>
                          <li>
                            <p>
                              충전 후 베팅내역이나 이용내역이 없으실 경우 돈세탁
                              등 악의적인 목적으로 보안에 수 있기에 환전처리가
                              불가합니다.
                            </p>
                          </li>
                        </ul>
                        <p style={{ margin: '10px 0' }}><br /></p>
                        <h5>
                          <span>보너스 미선택시 필요 롤링 안내</span>
                        </h5>
                        <ul>
                          <li><p>스포츠 100%</p></li>
                          <li><p>실시간 100%</p></li>
                          <li><p>미니게임 100%</p></li>
                          <li><p>카지노/슬롯 100%</p></li>
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