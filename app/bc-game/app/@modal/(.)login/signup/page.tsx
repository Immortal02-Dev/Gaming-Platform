"use client";
import SignUpPage from "@/app/login/signup/page";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpModal() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null;
  }
  return (
    <div className="dialog-root dialog-visible">
      <div className="dialog-list md:w-117.5! md:h-180!">
        <div
          className="dialog-overlayer"
          style={
            {
              width: "29.375rem !important",
              height: "45rem !important",
              "--scroll": "100%",
              "z-index": "1006",
            } as React.CSSProperties
          }
        >
          <div className="dialog-item dialog-transparent-title login-layout-dialog">
            <div className="scroll-y dialog-content px-0!">
              <div className="scroll-container">
                <SignUpPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
