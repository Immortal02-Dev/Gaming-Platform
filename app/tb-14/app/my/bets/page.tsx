'use client'

import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
import { useTabs } from '@/lib/hooks/useTabs'

export default function BetsPage() {
  const { activeTab, switchTab, isActive } = useTabs({ 
    defaultTab: 0, 
    totalTabs: 5 
  })

  const tabs = ['스포츠', '인플레이', '카지노', '슬롯', '미니게임']

  return (
    <MyLayout>
      <div className="user-main">
              <div className="deposit-section">
                {/* Deposit History */}
                <div className="deposit-history">
                  <div className="history-header">
                    <div className="history-title">
                      <p>베팅내역</p>
                    </div>
                    <button type="button" className="history-delete-btn">
                      <div className="history-delete-text">전체삭제</div>
                    </button>
                  </div>

                  {/* Tab Container */}
                  <div className="user-tab">
                    <div className="user-tab-scroll">
                      <div className="user-tab-area">
                        <div className="user-tab-inner">
                          {tabs.map((tab, index) => (
                            <button 
                              key={index}
                              className={`user-tab-item ${isActive(index) ? 'active' : ''}`}
                              onClick={() => switchTab(index)}
                            >
                              <span className="user-tab-text">{tab}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Detail Table */}

                  {/* Tab 1 - Sports Table */}
                  {activeTab === 0 && (
                  <div className="history-list">
                    {/* Bet History Filter */}
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
                                  <div className="filter-option-item">전체상태</div>
                                  <div className="filter-option-item">체결</div>
                                  <div className="filter-option-item">취소</div>
                                  <div className="filter-option-item">출금</div>
                                  <div className="filter-option-item">완료</div>
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

                    {/* Bet History Table */}
                    <div className="bet-history-table">
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
                  )}

                  {/* Tab 2 - INPLAY Table */}
                  {activeTab === 1 && (
                  <div className="history-list">
                    {/* Bet History Filter */}
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
                                  <div className="filter-option-item">전체상태</div>
                                  <div className="filter-option-item">체결</div>
                                  <div className="filter-option-item">취소</div>
                                  <div className="filter-option-item">출금</div>
                                  <div className="filter-option-item">완료</div>
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

                    {/* Bet History Table */}
                    <div className="bet-history-table">
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
                  )}

                  {/* Tab 3 - Casino Table */}
                  {activeTab === 2 && (
                  <div className="history-list">
                    <div className="history-wrapper">
                      {/* Bet History Filter */}
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

                      {/* Bet History Table */}
                      <div className="bet-history-table">
                        <table className="table-bet-casino">
                          <colgroup>
                            <col />
                            <col />
                            <col style={{ width: '300px' }} />
                            <col style={{ width: '200px' }} />
                            <col />
                            <col />
                            <col />
                          </colgroup>
                          <thead>
                            <tr>
                              <th><strong>벤더명</strong></th>
                              <th><strong>게임타입</strong></th>
                              <th>게임명</th>
                              <th><strong>트랜잭션</strong></th>
                              <th><strong>트랜잭션타입</strong></th>
                              <th><strong>금액</strong></th>
                              <th><strong>시간</strong></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="bet-casino-item">에볼루션</td>
                              <td className="bet-casino-item">CASINO</td>
                              <td className="bet-casino-item">용호</td>
                              <td className="bet-casino-item">
                                <p className="bet-casino-trans">
                                  <strong> 1304017644305864730 </strong>
                                  <br />
                                  <span>1304037643709596493</span>
                                </p>
                              </td>
                              <td className="bet-casino-item">
                                <span className="bet-casino-trans win">WIN</span>
                              </td>
                              <td className="bet-casino-item">2,000원</td>
                              <td className="bet-casino-item">06.25<br />06:14</td>
                            </tr>
                            <tr>
                              <td className="bet-casino-item">에볼루션</td>
                              <td className="bet-casino-item">CASINO</td>
                              <td className="bet-casino-item">용호</td>
                              <td className="bet-casino-item">
                                <p className="bet-casino-trans">
                                  <strong>1304037643709596493</strong
                                  ><br /><span>1304037643709596466</span>
                                </p>
                              </td>
                              <td className="bet-casino-item">
                                <span className="bet-casino-trans bet">BET</span>
                              </td>
                              <td className="bet-casino-item">1,000원</td>
                              <td className="bet-casino-item">06.25<br />06:13</td>
                            </tr>
                            <tr>
                              <td className="bet-casino-item">에볼루션</td>
                              <td className="bet-casino-item">CASINO</td>
                              <td className="bet-casino-item">용호</td>
                              <td className="bet-casino-item">
                                <p className="bet-casino-trans">
                                  <strong>1304047641801399573</strong>
                                  <br />
                                  <span>1304047641203063819</span>
                                </p>
                              </td>
                              <td className="bet-casino-item">
                                <span className="bet-casino-trans win">WIN</span>
                              </td>
                              <td className="bet-casino-item">4,000원</td>
                              <td className="bet-casino-item">06.25<br />06:13</td>
                            </tr>
                            <tr>
                              <td className="bet-casino-item">에볼루션</td>
                              <td className="bet-casino-item">CASINO</td>
                              <td className="bet-casino-item">용호</td>
                              <td className="bet-casino-item">
                                <p className="bet-casino-trans">
                                  <strong>1304047641203063819</strong>
                                  <br />
                                  <span>1304047641203063799</span>
                                </p>
                              </td>
                              <td className="bet-casino-item">
                                <span className="bet-casino-trans bet">BET</span>
                              </td>
                              <td className="bet-casino-item">2,000원</td>
                              <td className="bet-casino-item">06.25<br />06:13</td>
                            </tr>

                            <tr>
                              <td className="bet-casino-item">에볼루션</td>
                              <td className="bet-casino-item">CASINO</td>
                              <td className="bet-casino-item">용호</td>
                              <td className="bet-casino-item">
                                <p className="bet-casino-trans">
                                  <strong>1304027639405773624</strong>
                                  <br />
                                  <span>1304087638903388123</span>
                                </p>
                              </td>
                              <td className="bet-casino-item">
                                <span className="bet-casino-trans win">WIN</span>
                              </td>
                              <td className="bet-casino-item">0원</td>
                              <td className="bet-casino-item">06.25<br />06:13</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Tab 4 - Slot Table */}
                  {activeTab === 3 && (
                  <div className="history-list">
                    {/* Bet History Filter */}
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

                        {/* Bet History Table */}
                    <div className="bet-history-table">
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
                  )}

                        {/* Tab 5 - Minigame Table */}
                  {activeTab === 4 && (
                  <div className="history-list">
                    {/* Bet History Filter */}
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
                                  <div className="filter-option-item">전체상태</div>
                                  <div className="filter-option-item">체결</div>
                                  <div className="filter-option-item">취소</div>
                                  <div className="filter-option-item">출금</div>
                                  <div className="filter-option-item">완료</div>
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

                    {/* Bet History Table */}
                    <div className="bet-history-table">
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
                  )}
                </div>
              </div>
            </div>
    </MyLayout>
  )
}