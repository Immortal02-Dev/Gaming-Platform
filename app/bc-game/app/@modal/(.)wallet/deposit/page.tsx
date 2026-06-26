"use client";
import { useRouter } from "next/navigation";
import WalletDeposit from "@/app/wallet/deposit/page";
import { useEffect, useState } from "react";

export default function WalletDepositModal() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      if (!mobile) {
        // Force a page reload to escape the interception on desktop
        window.location.reload();
      } else {
        setIsMobile(true);
      }
    };
    checkMobile();
  }, []);

  if (isMobile === null) return null;
  return (
    <div className="dialog-root dialog-visible">
      <div className="dialog-list">
        <div
          className="dialog-overlayer"
          style={{ ["--scroll" as any]: "0%" } as React.CSSProperties}
        >
          <div className="dialog-item dialog-transparent-title scroll-noheader-dialog pt-12!">
            <div className="dialog-title h-12! bg-layer4">
              Deposit
              <button
                className="button dialog-back p-0! absolute left-3.5 right-auto"
                type="button"
                onClick={() => router.back()}
              >
                <div className="icon size-5!">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
              <div className="ml-auto absolute right-4 top-0 flex items-center h-full" />
            </div>
            <div className="scroll-y dialog-content">
              <div className="scroll-container py-4">
                <WalletDeposit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
