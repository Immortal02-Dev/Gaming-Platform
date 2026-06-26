import type { Metadata } from 'next'
import CustomerLayout from '@/components/CustomerLayout'

export const metadata: Metadata = {
  title: 'TB-14 - 우회접속안내 | Customer Service',
  description: 'TB-14 gaming platform connection guide and alternative access methods',
}

export default function ConnectPage() {
  return (
    <CustomerLayout>
      <div className="customer-main">
        <div className="customer-inner">
          <div className="customer-header">
            <div className="customer-title">
              <p className="customer-text">우회접속안내</p>
            </div>
          </div>

          {/* Search Form */}
          <form className="search-form">
            <div className="search-inner">
              <label className="search-input">
                <div className="search-box">
                  <input
                    type="text"
                    name="searchValue"
                    placeholder="검색어 입력"
                    autoComplete="off"
                    spellCheck="false"
                    className="search-field"
                  />
                </div>
              </label>
            </div>
            <button type="submit" className="search-button">
              <div className="search-text">검색</div>
            </button>
          </form>

          {/* Tab Container */}
          <div className="customer-tab">
            <div className="customer-tab-scroll">
              <div className="customer-tab-area">
                <div className="customer-tab-inner">
                  <button className="customer-tab-item active">
                    <span className="customer-tab-text">전체</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 1 - 전체 (All) */}
          <div className="customer-table">
            <table className="customer-table-inner">
              <colgroup>
                <col width="90px" />
                <col width="90px" />
                <col width="auto" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>카테고리</th>
                  <th>제목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="customer-empty">
                    <div className="customer-table-empty">
                      <div className="customer-table-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.40c0 .63-.502 1.141-1.11 1.141Z"
                          />
                        </svg>
                      </div>
                      <p className="customer-table-desc">
                        현재 등록된 글이 없습니다.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}