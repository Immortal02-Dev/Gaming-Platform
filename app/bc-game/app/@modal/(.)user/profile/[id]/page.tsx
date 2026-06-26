"use client";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/user/profile/page";

export default function UserProfileModal() {
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
              My Profile
              <div className="ml-auto absolute right-4 top-0 flex items-center h-full">
                <button
                  className="button button-m dialog-close ml-2 p-0!"
                  type="button"
                  onClick={() => router.back()}
                >
                  <div className="icon size-3!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="scroll-y dialog-content">
              <div className="scroll-container">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
