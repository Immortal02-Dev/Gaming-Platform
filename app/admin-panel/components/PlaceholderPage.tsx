"use client";

import Layout from "@/components/Layout";
import { useEffect, useState, useCallback } from "react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backendNote?: string;
  apiEndpoint?: string;
}

export default function PlaceholderPage({
  title,
  description,
  backendNote,
  apiEndpoint,
}: PlaceholderPageProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${apiEndpoint}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setData(result.data);
      } else if (Array.isArray(result)) {
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    if (apiEndpoint) {
      fetchData();
    }
  }, [apiEndpoint, fetchData]);

  return (
    <Layout>
      <h1 className="page-header">
        <a href="#">
          <i className="fa fa-list me-2"></i>
          {title}
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col">
          <p>{description}</p>
          {backendNote ? (
            <div className="alert alert-info mt-3">
              <strong>Backend note:</strong> {backendNote}
            </div>
          ) : null}

          {apiEndpoint && (
            <div className="mt-4">
              <h5>Data Table</h5>
              {loading ? (
                <div className="text-center p-4">
                  <i className="fa fa-spinner fa-spin me-2"></i>로딩 중...
                </div>
              ) : data.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover align-middle bg-white text-center fw-bold">
                    <thead className="bg-dark bg-gradient text-white">
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 10).map((item, index) => (
                        <tr key={index}>
                          {Object.values(item).map((value: unknown, i) => (
                            <td key={i}>
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.length > 10 && (
                    <p className="text-muted mt-2">
                      Showing first 10 rows of {data.length} total.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-center p-4">데이터가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
