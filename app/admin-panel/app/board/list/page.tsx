"use client";

import Layout from "@/components/Layout";

export default function BoardListPage() {
  return (
    <Layout>
      <h1 className="page-header">
        <a href="/board">
          <i className="fa fa-list me-2"></i>게시판 관리
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form action="/board" method="post">
              <div className="d-flex">
                <select name="pageSize" className="form-select w-80px me-2">
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>

                <select name="boardType" id="boardType" className="form-select w-150px me-2">
                  <option value="">선택</option>
                  <option value="notice">공지사항</option>
                  <option value="event">이벤트게시판</option>
                  <option value="partnerNotice">파트너 공지</option>
                  <option value="free">자유게시판</option>
                  <option value="popup">팝업</option>
                </select>

                <select name="searchType" className="form-select w-100px me-2">
                  <option value="" selected>전체</option>
                  <option value="subject">제목</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="parent">소속ID</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  defaultValue=""
                />

                <button className="btn btn-lime" id="btnSearch">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto">
              <button
                onClick={() => (location.href = '/board/write.html')}
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-edit me-2"></i>글쓰기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-80px">No.</th>
                <th className="w-80px">게시판</th>
                <th>소속</th>
                <th>작성자</th>
                <th style={{ width: "40%" }}>제목</th>
                <th className="w-80px">조회수</th>
                <th className="w-100px">노출</th>
                <th className="w-150px">작성일자</th>
                <th className="w-80px">관리</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample board entries */}
              <tr>
                <td>
                  <span className="badge bg-danger">공지</span>
                </td>
                <td>
                  <span className="badge bg-primary">공지사항</span>
                </td>
                <td className="p-1">관리자</td>
                <td className="p-1">운영자</td>
                <td className="text-start">
                  <a href="/board/view.html?idx=1" className="text-decoration-none">
                    시스템 정기 점검 안내
                  </a>
                </td>
                <td>1,254</td>
                <td>
                  <span className="badge bg-success">노출</span>
                </td>
                <td>2025-03-01 09:30:15</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => {/* editBoard() */}}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {/* deleteBoard() */}}
                  >
                    삭제
                  </button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <span className="badge bg-info">이벤트</span>
                </td>
                <td className="p-1">관리자</td>
                <td className="p-1">운영자</td>
                <td className="text-start">
                  <a href="/board/view.html?idx=2" className="text-decoration-none">
                    3월 신규 가입 이벤트 진행
                  </a>
                </td>
                <td>856</td>
                <td>
                  <span className="badge bg-success">노출</span>
                </td>
                <td>2025-03-02 14:20:30</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => {/* editBoard() */}}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {/* deleteBoard() */}}
                  >
                    삭제
                  </button>
                </td>
              </tr>

              <tr>
                <td>3</td>
                <td>
                  <span className="badge bg-warning">파트너</span>
                </td>
                <td className="p-1">
                  <div
                    className="input-group w-auto d-flex user-action"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      className="input-group-text p-1 cursor-pointer d-inline"
                      style={{ backgroundColor: "#f4a29c" }}
                    >
                      부본사
                    </div>
                    <label className="form-control p-1 cursor-pointer">
                      pstest (pstest)
                    </label>
                  </div>
                </td>
                <td className="p-1">pstest</td>
                <td className="text-start">
                  <a href="/board/view.html?idx=3" className="text-decoration-none">
                    정산 관련 문의드립니다
                  </a>
                </td>
                <td>125</td>
                <td>
                  <span className="badge bg-secondary">숨김</span>
                </td>
                <td>2025-03-04 16:45:20</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => {/* editBoard() */}}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {/* deleteBoard() */}}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
