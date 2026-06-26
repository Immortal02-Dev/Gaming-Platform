"use client";

import Layout from "@/components/Layout";

export default function UserLoginLogPage() {
  return (
    <Layout>
      <h1 className="page-header">
        <a href="/loginLogList.html">
          <i className="fa fa-list me-2"></i>로그인 로그
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form action="/loginLogList.html" method="get">
              <div className="d-flex">
                <select name="pageSize" className="form-select w-80px me-2">
                  <option value="50">50</option>
                  <option value="100" selected>100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                </select>
                <div className="input-group me-2" style={{ width: "250px" }}>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    className="form-control date"
                    defaultValue="2025-03-04"
                    readOnly
                  />
                  <div className="input-group-text">~</div>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    className="form-control date"
                    defaultValue="2025-03-04"
                    readOnly
                  />
                  <div className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>

                <select name="userRoleIdx" className="form-select w-auto me-2">
                  <option value="" selected>구분</option>
                  <option value="1">운영자</option>
                  <option value="3">파트너</option>
                  <option value="4">회원</option>
                </select>

                <select name="searchType" className="form-select w-auto me-2">
                  <option value="" selected>항목</option>
                  <option value="id">ID</option>
                  <option value="nick">닉네임</option>
                  <option value="ip">IP</option>
                  <option value="domain">도메인</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  className="form-control w-150px me-2"
                  defaultValue=""
                  placeholder="검색어"
                />

                <button className="btn btn-lime" id="btnSearch">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-responsive align-middle bg-white text-center fw-bold">
            <thead className="bg-dark bg-gradient text-white">
              <tr>
                <th className="w-80px">No.</th>
                <th className="w-80px">등급</th>
                <th>아이디(닉네임)</th>
                <th>구분</th>
                <th className="w-150px">IP</th>
                <th className="w-150px">도메인</th>
                <th className="w-150px">상태</th>
                <th className="w-150px">로그인 일시</th>
                <th className="w-80px">차단</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample login log entries */}
              <tr>
                <td>938</td>
                <td>운영자</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="user-action"
                  >
                    utop (유탑)
                  </a>
                </td>
                <td>
                  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
                  (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
                </td>
                <td>136.158.40.215</td>
                <td>site.nss-01.com</td>
                <td>정상</td>
                <td>2025-03-07 10:15:37</td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success btn-sm text-white"
                    onClick={() => {/* fnIPBlack(6692) */}}
                  >
                    IP 차단
                  </a>
                </td>
              </tr>
              <tr>
                <td>937</td>
                <td>운영자</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="user-action"
                  >
                    utop (유탑)
                  </a>
                </td>
                <td>
                  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
                  (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
                </td>
                <td>182.172.141.86</td>
                <td>site.nss-01.com</td>
                <td>정상</td>
                <td>2025-03-06 07:56:44</td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success btn-sm text-white"
                    onClick={() => {/* fnIPBlack(6682) */}}
                  >
                    IP 차단
                  </a>
                </td>
              </tr>
              <tr>
                <td>936</td>
                <td>부본사</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="user-action"
                  >
                    pstest (pstest)
                  </a>
                </td>
                <td>
                  Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15
                  (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
                </td>
                <td>192.168.1.100</td>
                <td>site.nss-01.com</td>
                <td>정상</td>
                <td>2025-03-06 15:22:18</td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success btn-sm text-white"
                    onClick={() => {/* fnIPBlack(6681) */}}
                  >
                    IP 차단
                  </a>
                </td>
              </tr>
              <tr>
                <td>935</td>
                <td>회원</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="user-action"
                  >
                    user123 (user123)
                  </a>
                </td>
                <td>
                  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
                  (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
                </td>
                <td>127.0.0.1</td>
                <td>site.nss-01.com</td>
                <td>정상</td>
                <td>2025-03-05 20:45:12</td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success btn-sm text-white"
                    onClick={() => {/* fnIPBlack(6680) */}}
                  >
                    IP 차단
                  </a>
                </td>
              </tr>
              <tr>
                <td>934</td>
                <td>총판</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="user-action"
                  >
                    ddol (또리)
                  </a>
                </td>
                <td>
                  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
                  (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
                </td>
                <td>203.245.1.15</td>
                <td>site.nss-01.com</td>
                <td>정상</td>
                <td>2025-03-05 14:30:45</td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-success btn-sm text-white"
                    onClick={() => {/* fnIPBlack(6679) */}}
                  >
                    IP 차단
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
