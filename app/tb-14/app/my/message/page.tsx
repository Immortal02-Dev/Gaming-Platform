import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 쪽지 | Message',
  description: 'TB-14 - 쪽지 | Message',
}

export default function MessagePage() {
  return (
    <MyLayout>
      <div className="user-main">
              <div className="deposit-section">
                {/* Deposit History */}
                <div className="deposit-history">
                  <div className="history-header">
                    <div className="history-title">
                      <p>쪽지</p>
                    </div>
                    <button type="button" className="history-delete-btn">
                      <div className="history-delete-text">전체삭제</div>
                    </button>
                  </div>

                  {/* Message Unread */}
                  <div className="message-unread">
                    <div className="unread-head">
                      <div className="unread-title">
                        <span className="unread-text">읽지않음 0건</span>
                      </div>
                    </div>
                    <button type="button" className="unread-btn">
                      <div className="unread-btn-text">전체읽음</div>
                    </button>
                  </div>

                  {/* Message Table */}
                  <table className="message-table">
                    <colgroup>
                      <col width="200px" />
                      <col width="auto" />
                      <col width="100px" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>전달시간</th>
                        <th>제목</th>
                        <th>확인</th>
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
                    <p className="empty-list-text">해당기간 입금내역이 없습니다.</p>
                  </div>
                </div>
              </div>
            </div>
    </MyLayout>
  )
}