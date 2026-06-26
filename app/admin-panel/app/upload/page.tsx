"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

const BACKEND_URL = ""; // Use relative path for proxy

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadResult(`업로드 성공: ${data.data.url}`);
      } else {
        setUploadResult(`업로드 실패: ${data.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error(error);
      setUploadResult("업로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/upload">
          <i className="fa fa-cloud-upload-alt me-2"></i>업로드 관리
        </a>
        <small></small>
      </h1>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">이미지 업로드</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                서버에 이미지를 업로드하고 URL을 생성합니다. 지원되는 형식: JPG, PNG, GIF.
              </p>
              <div className="mb-4">
                <label className="form-label fw-bold">파일 선택</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="upload-input"
                  />
                  <label className="input-group-text" htmlFor="upload-input">
                    <i className="fa fa-image"></i>
                  </label>
                </div>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={!file || loading}
                  onClick={handleUpload}
                >
                  {loading ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i>업로드 중...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-cloud-upload-alt me-2"></i>업로드 실행
                    </>
                  )}
                </button>
              </div>

              {uploadResult && (
                <div className={`alert ${uploadResult.includes('성공') ? 'alert-success' : 'alert-danger'} mt-4 mb-0`} role="alert">
                  <i className={`fa ${uploadResult.includes('성공') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                  {uploadResult}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">업로드 도움말</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center">
                  <i className="fa fa-info-circle text-primary me-3"></i>
                  파일 크기는 5MB를 초과할 수 없습니다.
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="fa fa-info-circle text-primary me-3"></i>
                  업로드된 이미지는 프로모션, 팝업 등에 사용 가능합니다.
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="fa fa-info-circle text-primary me-3"></i>
                  개인정보가 포함된 이미지는 업로드하지 마세요.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
