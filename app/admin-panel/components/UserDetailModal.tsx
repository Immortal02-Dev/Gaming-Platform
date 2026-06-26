"use client";

import { Suspense } from "react";
import { UserDetailPageInner } from "../app/user/user/detail/page";

interface UserDetailModalProps {
  isOpen: boolean;
  userIdx: string | number;
  tabIdx: number;
  onClose: () => void;
}

export default function UserDetailModal({ isOpen, userIdx, tabIdx, onClose }: UserDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        data-bs-backdrop="static"
        aria-modal="true"
        role="dialog"
        style={{ display: "block", zIndex: 1060 }}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style={{ maxWidth: '1200px', width: '95%' }}>
          <div className="modal-content" style={{ height: '90vh' }}>
            <div className="modal-header bg-dark text-white p-2">
              <h5 className="modal-title">회원 상세 정보</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body p-0" style={{ overflow: 'auto' }}>
              <Suspense fallback={<div className="p-5 text-center"><div className="spinner-border"></div></div>}>
                <UserDetailPageInner 
                  userIdxProp={userIdx.toString()} 
                  tabTypeProp={tabIdx.toString()} 
                />
              </Suspense>
            </div>
            <div className="modal-footer p-2">
              <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
    </>
  );
}
