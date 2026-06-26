"use client";

import { useState } from "react";

export default function UserExcelUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("userExcelFile", file);

    try {
      const response = await fetch("/api/admin/user/excel-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("업로드가 완료되었습니다.");
        if (window.opener && !window.opener.closed) {
          window.opener.location.reload();
        }
        window.close();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div id="app" className="app" style={{ height: "inherit" }}>
      <div className="panel panel-inverse" style={{ height: "inherit" }}>
        <div className="panel-heading">
          <h4 className="panel-title text-center">
            <i className="fas fa-user-plus me-2"></i>회원 일괄 등록
          </h4>
          <div className="panel-heading-btn"></div>
        </div>
        <div className="panel-body bg-gray-200">
          <a
            href="/storage/userExcelUpload.xlsx"
            className="btn btn-success text-white mb-2"
          >
            샘플 다운로드
          </a>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <div className="custom-file text-left">
                <input
                  type="file"
                  name="userExcelFile"
                  className="form-control"
                  id="userExcelFile"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="col text-center">
              <button className="btn btn-primary" disabled={uploading}>
                {uploading ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-1"></i>업로드 중...
                  </>
                ) : (
                  "업로드"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
