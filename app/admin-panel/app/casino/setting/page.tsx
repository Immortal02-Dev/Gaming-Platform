"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

const API_BASE_URL = "/api/admin";

interface Vendor {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

interface VendorResponse {
  ReturnCode: number;
  ReturnMessage: string;
  data: Vendor[];
}

export default function CasinoSetting() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorStates, setVendorStates] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/casino-setting`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch vendors: ${response.status} ${response.statusText}`,
        );
      }

      const result: VendorResponse = await response.json();

      if (result.ReturnCode === 0 && result.data) {
        setVendors(result.data);
        const states = result.data.reduce(
          (acc, vendor) => {
            acc[vendor.id] = vendor.checked;
            return acc;
          },
          {} as Record<string, boolean>,
        );
        setVendorStates(states);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      alert("벤더 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const vendorUseYN = async (
    obj: HTMLInputElement | string,
    useYN?: number,
  ) => {
    let vendorIdx: string;
    let useYNValue: number;

    // Handle both React call pattern and original inline handler pattern
    if (typeof obj === "string") {
      vendorIdx = obj;
      useYNValue = useYN || 0;
    } else {
      vendorIdx = obj.value;
      useYNValue = obj.checked ? 1 : 0;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/casino-setting/vendorUseYN`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorIdx: vendorIdx,
            vendorUseYN: useYNValue,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const ret = await response.json();
      if (ret.ReturnCode != 0) {
        alert(ret.ReturnMessage);
        // Revert the state on error
        if (typeof obj === "string") {
          setVendorStates((prev) => ({
            ...prev,
            [vendorIdx]: !(useYNValue === 1),
          }));
        } else {
          obj.checked = !obj.checked;
          setVendorStates((prev) => ({
            ...prev,
            [vendorIdx]: !(useYNValue === 1),
          }));
        }
      } else {
        // Update state without reloading
        setVendorStates((prev) => ({
          ...prev,
          [vendorIdx]: useYNValue === 1,
        }));
        // Update the vendor in the vendors array
        setVendors((prev) =>
          prev.map((v) =>
            v.id === vendorIdx ? { ...v, checked: useYNValue === 1 } : v,
          ),
        );
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : String(error || "Error occurred");
      alert(errorMsg);
      // Revert the state on error
      if (typeof obj === "string") {
        setVendorStates((prev) => ({
          ...prev,
          [vendorIdx]: !(useYNValue === 1),
        }));
      } else {
        obj.checked = !obj.checked;
        setVendorStates((prev) => ({
          ...prev,
          [vendorIdx]: !(useYNValue === 1),
        }));
      }
    }
  };

  const handleVendorChange = (vendorId: string, checked: boolean) => {
    setVendorStates((prev) => ({ ...prev, [vendorId]: checked }));
    vendorUseYN(vendorId, checked ? 1 : 0);
  };

  // Expose vendorUseYN globally for compatibility with inline handlers
  useEffect(() => {
    const win = window as Window & {
      vendorUseYN?: (obj: HTMLInputElement) => void;
    };

    win.vendorUseYN = (obj: HTMLInputElement) => {
      vendorUseYN(obj);
    };

    return () => {
      delete win.vendorUseYN;
    };
  }, []);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/casino/setting">
          <i className="fa fa-dice me-2"></i>카지노 설정
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col-12">
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="pull-left">
                  <i className="fa fa-cog me-2"></i>카지노 벤더 설정
                </span>
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
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">벤더 목록을 불러오는 중...</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Skin settings functionality can be implemented later
                    alert("스킨 설정 기능은 추후 구현 예정입니다.");
                  }}
                >
                  <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        <th>벤더명</th>
                        <th>카테고리</th>
                        <th>사용여부</th>
                        <th>스킨 설정</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center p-4">
                            벤더 데이터가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        vendors.map((vendor) => (
                          <tr key={vendor.id}>
                            <td>{vendor.name}</td>
                            <td>{vendor.category}</td>
                            <td>
                              <div className="form-check-inline me-0 form-switch">
                                <input
                                  className="form-check-input w-35px"
                                  type="checkbox"
                                  id={`switcher_charge_${vendor.id}`}
                                  checked={vendorStates[vendor.id] || false}
                                  onChange={(e) => {
                                    handleVendorChange(
                                      vendor.id,
                                      e.target.checked,
                                    );
                                  }}
                                  value={vendor.id}
                                />
                              </div>
                            </td>
                            <td className="p-0"></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="col text-center">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-save me-1"></i>저장
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
