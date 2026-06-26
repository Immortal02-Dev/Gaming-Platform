"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    $: any;
    io: any;
    AudioContext: any;
    webkitAudioContext: any;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface Bank {
  bankIdx: number;
  bankName: string;
  useYN: number;
  created_at: string;
  updated_at: string;
}

interface ChargeBank {
  bankIdx: number;
  bankName: string;
  bankerName: string;
  bankNumber: string;
  useYN: number;
  autoYN: number;
  registerDate: string;
  updated_at: string;
}

export default function BankSettingPage() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [chargeBanks, setChargeBanks] = useState<ChargeBank[]>([]);
  const [bankName, setBankName] = useState("");
  const [chargeBankName, setChargeBankName] = useState("");
  const [chargeBankerName, setChargeBankerName] = useState("");
  const [chargeBankNumber, setChargeBankNumber] = useState("");

  // Fetch banks
  const fetchBanks = async () => {
    try {
      const response = await fetch("/api/admin/bank-setting/banks", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setBanks(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch banks:", error);
    }
  };

  // Fetch charge banks
  const fetchChargeBanks = async () => {
    try {
      const response = await fetch("/api/admin/bank-setting/charge-banks", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setChargeBanks(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch charge banks:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchBanks(), fetchChargeBanks()]);
    };
    loadData();
  }, []);

  // Bank CRUD operations
  const handleBankUpdate = async (bankIdx: number, useYN: number) => {
    try {
      const response = await fetch(`/api/admin/bank-setting/banks/${bankIdx}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ useYN }),
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        fetchBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to update bank:", error);
      alert("은행 정보 수정에 실패했습니다.");
    }
  };

  const handleBankDelete = async (bankIdx: number) => {
    if (!confirm("삭제 하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/admin/bank-setting/banks/${bankIdx}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        fetchBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to delete bank:", error);
      alert("은행 삭제에 실패했습니다.");
    }
  };

  const handleBankAdd = async () => {
    if (!bankName.trim()) {
      alert("은행명은 필수 입력입니다.");
      return;
    }

    try {
      const response = await fetch("/api/admin/bank-setting/banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bankName }),
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setBankName("");
        fetchBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to add bank:", error);
      alert("은행 등록에 실패했습니다.");
    }
  };

  // Charge Bank CRUD operations
  const handleChargeBankUpdate = async (bankIdx: number, useYN: number) => {
    try {
      const response = await fetch(
        `/api/admin/bank-setting/charge-banks/${bankIdx}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ useYN }),
        },
      );
      const data = await response.json();
      if (data.ReturnCode === 0) {
        fetchChargeBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to update charge bank:", error);
      alert("충전 은행 정보 수정에 실패했습니다.");
    }
  };

  const handleChargeBankDelete = async (bankIdx: number) => {
    if (!confirm("삭제 하시겠습니까?")) return;

    try {
      const response = await fetch(
        `/api/admin/bank-setting/charge-banks/${bankIdx}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.ReturnCode === 0) {
        fetchChargeBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to delete charge bank:", error);
      alert("충전 은행 삭제에 실패했습니다.");
    }
  };

  const handleChargeBankAdd = async () => {
    if (!chargeBankName.trim()) {
      alert("은행명은 필수 입력입니다.");
      return;
    }
    if (!chargeBankerName.trim()) {
      alert("예금주는 필수 입력입니다.");
      return;
    }
    if (!chargeBankNumber.trim()) {
      alert("계좌번호는 필수 입력입니다.");
      return;
    }

    try {
      const response = await fetch("/api/admin/bank-setting/charge-banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          chargeBankName,
          chargeBankerName,
          chargeBankNumber,
        }),
      });
      const data = await response.json();
      if (data.ReturnCode === 0) {
        setChargeBankName("");
        setChargeBankerName("");
        setChargeBankNumber("");
        fetchChargeBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to add charge bank:", error);
      alert("충전 은행 등록에 실패했습니다.");
    }
  };

  const handleAutoYN = async (bankIdx: number) => {
    try {
      const response = await fetch(
        `/api/admin/bank-setting/charge-banks/${bankIdx}/auto`,
        {
          method: "PUT",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.ReturnCode === 0) {
        fetchChargeBanks();
      } else {
        alert(data.ReturnMessage);
      }
    } catch (error) {
      console.error("Failed to toggle auto registration:", error);
      alert("자동등록 지정에 실패했습니다.");
    }
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/bank/setting">
          <i className="fa fa-money-check-alt me-2"></i>은행 설정
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      {/* begin row */}
      <div className="row">
        {/* begin col-3 */}
        <div className="col-xl-3 col-md-6">
          {/* begin panel */}
          <div
            className="panel panel-inverse"
            data-sortable-id="form-1"
            data-sortable="false"
          >
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                은행 등록
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
              <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th className="text-center">은행명</th>
                    <th className="text-center width-70">사용여부</th>
                    <th className="text-center" style={{ width: "1%" }}>
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((bank) => (
                    <tr key={bank.bankIdx}>
                      <td className="text-center">{bank.bankName}</td>
                      <td className="text-center align-center">
                        <div className="form-check-inline me-0 form-switch align-center">
                          <input
                            className="form-check-input w-35px"
                            type="checkbox"
                            role="switch"
                            id={`switcher_bank_${bank.bankIdx}`}
                            checked={bank.useYN === 1}
                            onChange={(e) =>
                              handleBankUpdate(
                                bank.bankIdx,
                                e.target.checked ? 1 : 0,
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="with-btn text-center p-1">
                        <button
                          onClick={() => handleBankDelete(bank.bankIdx)}
                          className="btn btn-sm btn-danger w-60px text-white"
                        >
                          <i className="fa fa-trash-alt me-1"></i>삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-center p-1">
                      <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        name="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="은행명 입력"
                      />
                    </td>
                    <td className="text-center"></td>
                    <td className="text-center p-1">
                      <button
                        onClick={handleBankAdd}
                        className="btn btn-sm btn-success w-60px text-white"
                      >
                        <i className="fa fa-plus me-1"></i>등록
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* end panel */}
        </div>

        <div className="col-xl-9 col-md-6">
          {/* begin panel */}
          <div
            className="panel panel-inverse"
            data-sortable-id="form-1"
            data-sortable="false"
          >
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                충전 은행 등록
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
              <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                <thead className="bg-dark bg-gradient text-white">
                  <tr>
                    <th>No.</th>
                    <th>은행명</th>
                    <th>예금주</th>
                    <th>계좌번호</th>
                    <th>등록일자</th>
                    <th>사용여부</th>
                    <th>자동등록지정</th>
                    <th style={{ width: "1%" }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {chargeBanks.map((bank, index) => (
                    <tr key={bank.bankIdx}>
                      <td>{index + 1}</td>
                      <td>{bank.bankName}</td>
                      <td>{bank.bankerName}</td>
                      <td>{bank.bankNumber}</td>
                      <td>
                        {new Date(bank.registerDate).toLocaleDateString(
                          "ko-KR",
                        )}
                      </td>
                      <td className="text-center align-center">
                        <div className="form-check-inline me-0 form-switch align-center">
                          <input
                            className="form-check-input w-35px"
                            type="checkbox"
                            role="switch"
                            checked={bank.useYN === 1}
                            onChange={(e) =>
                              handleChargeBankUpdate(
                                bank.bankIdx,
                                e.target.checked ? 1 : 0,
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="text-center align-center">
                        <div className="form-check-inline me-0 form-switch align-center">
                          <input
                            className="form-check-input w-35px"
                            type="checkbox"
                            role="switch"
                            checked={bank.autoYN === 1}
                            onChange={() => handleAutoYN(bank.bankIdx)}
                          />
                        </div>
                      </td>
                      <td className="with-btn text-center p-1">
                        <button
                          onClick={() => handleChargeBankDelete(bank.bankIdx)}
                          className="btn btn-sm btn-danger w-60px text-white"
                        >
                          <i className="fa fa-trash-alt me-1"></i>삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-center p-1">
                      <input
                        type="text"
                        className="form-control"
                        id="chargeBankName"
                        name="chargeBankName"
                        value={chargeBankName}
                        onChange={(e) => setChargeBankName(e.target.value)}
                        placeholder="은행명"
                      />
                    </td>
                    <td className="text-center p-1">
                      <input
                        type="text"
                        className="form-control"
                        id="chargeBankerName"
                        name="chargeBankerName"
                        value={chargeBankerName}
                        onChange={(e) => setChargeBankerName(e.target.value)}
                        placeholder="예금주"
                      />
                    </td>
                    <td className="text-center p-1">
                      <input
                        type="text"
                        className="form-control"
                        id="chargeBankNumber"
                        name="chargeBankNumber"
                        value={chargeBankNumber}
                        onChange={(e) => setChargeBankNumber(e.target.value)}
                        placeholder="계좌번호"
                      />
                    </td>
                    <td className="text-center"></td>
                    <td className="text-center"></td>
                    <td className="text-center"></td>
                    <td className="text-center p-1">
                      <button
                        onClick={handleChargeBankAdd}
                        className="btn btn-sm btn-success w-60px text-white"
                      >
                        <i className="fa fa-plus me-1"></i>등록
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* end panel */}
        </div>
      </div>
      {/* end row */}
    </Layout>
  );
}
