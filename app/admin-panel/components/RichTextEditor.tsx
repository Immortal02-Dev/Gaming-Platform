"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        minHeight: "400px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <p>에디터를 불러오는 중...</p>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
  height?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  height = "400px",
}: RichTextEditorProps) {

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];



  return (
    <div style={{ width: "100%" }}>
      <style jsx global>{`
        .quill {
          background: white;
        }
        .ql-container {
          min-height: ${height};
          font-size: 14px;
        }
        .ql-editor {
          min-height: ${height};
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요..."
      />
    </div>
  );
}
