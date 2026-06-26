"use client";
import { useRouter } from "next/navigation";
import UserStatistics from "@/app/user/statistics/page";

export default function UserStatisticsModal() {
  const router = useRouter();
  return (
    <div className="dialog-root dialog-visible">
      <div className="dialog-list">
        <div
          className="dialog-overlayer"
          style={
            {
              ["--scroll" as any]: "100%",
              zIndex: "1006",
            } as React.CSSProperties
          }
        >
          <div className="dialog-item">
            <div className="dialog-title">
              <button
                className="button button-m dialog-back p-0! absolute right-auto left-4"
                type="button"
                onClick={() => router.back()}
              >
                <div className="icon size-5!">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
              Statistics details
              <div className="ml-auto absolute right-4 top-0 flex items-center h-full" />
            </div>
            <div className="scroll-y dialog-content">
              <UserStatistics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
