import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 출석부 | My Account',
  description: 'TB-14 gaming platform attendance page',
}

export default function AttendancePage() {
  return (
    <MyLayout>
      <div className="user-main">
              <div className="attendance-container">
                <div className="attendance-inner">
                  <div className="attendance-wrapper">
                    <div className="attendance-box">
                      <div className="react-calendar">
                        <div className="react-calendar__navigation">
                          <button
                            className="react-calendar__navigation__arrow react-calendar__navigation__prev-button"
                            type="button"
                          >
                            <div className="attendance-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="19"
                                viewBox="0 0 1024 1024"
                              >
                                <path
                                  fill="currentColor"
                                  d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099c13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474c-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"
                                />
                              </svg>
                            </div>
                          </button>
                          <button
                            aria-live="polite"
                            className="react-calendar__navigation__label"
                              disabled={true}
                            type="button"
                            style={{ flexGrow: 1 }}
                          >
                            <span
                              className="react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from"
                            >
                              2025년 6월
                            </span>
                          </button>
                          <button
                            className="react-calendar__navigation__arrow react-calendar__navigation__next-button"
                            disabled={true}
                            type="button"
                          >
                            <div className="attendance-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="19"
                                viewBox="0 0 1024 1024"
                              >
                                <path
                                  fill="currentColor"
                                  d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                        <div className="react-calendar__viewContainer">
                          <div className="react-calendar__month-view">
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                              <div style={{ flexGrow: 1, width: '100%' }}>
                                <div
                                  className="react-calendar__month-view__weekdays"
                                  style={{ display: 'flex', flexWrap: 'nowrap' }}
                                >
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--weekend"
                                  >
                                    <abbr aria-label="일요일" title="일요일"
                                      >일</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday"
                                  >
                                    <abbr aria-label="월요일" title="월요일"
                                      >월</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday"
                                  >
                                    <abbr aria-label="화요일" title="화요일"
                                      >화</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--current"
                                  >
                                    <abbr aria-label="수요일" title="수요일"
                                      >수</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday"
                                  >
                                    <abbr aria-label="목요일" title="목요일"
                                      >목</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday"
                                  >
                                    <abbr aria-label="금요일" title="금요일"
                                      >금</abbr
                                    >
                                  </div>
                                  <div
                                    className="react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--weekend"
                                  >
                                    <abbr aria-label="토요일" title="토요일"
                                      >토</abbr
                                    >
                                  </div>
                                </div>
                                <div className="react-calendar__month-view__days">
                                  <button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 1일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text">
                                        1
                                      </span>
                                    </div>
                                  </button>
                                  <button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 2일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >2</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 3일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >3</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 4일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >4</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 5일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >5</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 6일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >6</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 7일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >7</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 8일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >8</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 9일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >9</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 10일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >10</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 11일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >11</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 12일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >12</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 13일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >13</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 14일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >14</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 15일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >15</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 16일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >16</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 17일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >17</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 18일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >18</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 19일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >19</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 20일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >20</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 21일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >21</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 22일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >22</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 23일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >23</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 24일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >24</span
                                      >
                                    </div>
                                  </button>
                                  <button
                                    className="react-calendar__tile react-calendar__tile--now react-calendar__month-view__days__day"
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 25일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text red"
                                        >오늘</span
                                      >
                                      <span className="attendance-date-text red"
                                        >25</span
                                      >
                                    </div>
                                  </button>
                                  <button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 26일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >26</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 27일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >27</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 28일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >28</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 29일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >29</span
                                      >
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 6월 30일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"
                                        >30</span
                                      >
                                    </div>
                                  </button>
                                  <button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 7월 1일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"></span>
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 7월 2일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"></span>
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 7월 3일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"></span>
                                    </div></button
                                  ><button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 7월 4일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text"></span>
                                    </div>
                                  </button>
                                  <button
                                    className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend react-calendar__month-view__days__day--neighboringMonth"
                                    disabled={true}
                                    type="button"
                                  >
                                    <abbr aria-label="2025년 7월 5일"></abbr>
                                    <div className="attendance-date">
                                      <span className="attendance-date-text">
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="attendance-btn">
                        <div className="attendance-btn-text">출석하기</div>
                      </button>
                    </div>
                  </div>

                  <div className="attendance-guide">
                    <div className="attendance-guide-info">
                      연속 출석일수 :<em>미출석</em>
                    </div>

                    <div className="deposit-guide">
                      <div className="deposit-guide-list">
                        <div className="deposit-guide-item">
                          <h5>
                            <span>출석일수 및 포인트 안내 </span>
                          </h5>
                          <ul>
                            <li><p>10일 연속 출석시 2만 포인트 지급</p></li>
                            <li><p>20일 연속 출석시 5만 포인트 지급</p></li>
                            <li><p>30일 연속 출석시 10만 포인트 지급</p></li>
                          </ul>
                          <p style={{ margin: '10px 0' }}><br /></p>
                          <h5>
                            <span>주의사항 안내</span>
                          </h5>
                          <ul>
                            <li>
                              <p>
                                지급된 포인트는 롤링 100% 후 환전 가능합니다.
                              </p>
                            </li>
                            <li>
                              <p>빠짐없이 연속으로 출석시에만 인정됩니다.</p>
                            </li>
                            <li>
                              <p>
                                매월 1일을 기준으로 연속 출석 일수가 초기화
                                됩니다.
                              </p>
                            </li>
                            <li>
                              <p>1일 입금 금액 5만원 이상시 출석 인정됩니다.</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </MyLayout>
  )
}