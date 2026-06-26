"use client";

import { useState } from "react";
import ReusableSelect from "@/components/ui/dropdown/ReusableSelect";

export default function WalletTransaction() {
  // This will control which one is open: 'allStatus', 'allType', or null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // States for selected values
  const [bill, setBill] = useState("bill");
  const [coin, setCoin] = useState("All Assets");
  const [pass, setPass] = useState("pass-24-hours");
  const [allType, setAllType] = useState("all-type");

  // Helper for toggling
  const handleToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const billOptions = [
    { label: "Bill", value: "bill" },
    { label: "Deposit", value: "deposit" },
    { label: "Withdraw", value: "withdraw" },
    { label: "Transfer", value: "transfer" },
    { label: "Swap", value: "swap" },
    { label: "Buy Crypto", value: "buy-crypto" },
    { label: "Bonus", value: "bonus" },
  ];

  const coinOptions = [
    { label: "All Assets", value: "All Assets" },
    {
      label: "BCD",
      value: "bcd",
      icon: "https://imgxcut.com/coin/BCD.black.png",
    },
    {
      label: "Bitcoin",
      value: "btc",
      icon: "https://imgxcut.com/coin/BTC.png",
    },
  ];

  const passOptions = [
    { label: "Past 90 days", value: "past-90-days" },
    { label: "Past 60 days", value: "past-60-days" },
    { label: "Past 30 days", value: "past-30-days" },
    { label: "Past 7 days", value: "past-7-days" },
    { label: "Pass 24 Hours", value: "pass-24-hours" },
  ];

  const allTypeOptions = [
    { label: "All Type", value: "all-type" },
    { label: "Game", value: "game" },
    { label: "Affiliate", value: "affiliate" },
    { label: "Vault", value: "vault" },
    { label: "Swap", value: "swap" },
  ];
  return (
    <div>
      <div className="sm:mx-0 rounded-xl flex-auto bg-layer4 lg:px-8">
        <div
          className="sticky z-10 grid gap-2 py-4 grid-cols-2 bg-inherit sm:grid-cols-3 top-15 [&>button]:bg-input_bright"
          style={
            {
              ["--offsetTop" as any]: "120px",
            } as React.CSSProperties
          }
        >
          <ReusableSelect
            options={billOptions}
            value={bill}
            onChange={setBill}
            onToggle={() => handleToggle("bill")}
            isOpen={activeDropdown === "bill"}
          />

          {/* 2. Coin Select (May Search) */}
          <ReusableSelect
            options={coinOptions}
            value={coin}
            onChange={setCoin}
            isOpen={activeDropdown === "coin"}
            onToggle={() => handleToggle("coin")}
            showSearch={true}
            placeholder="Search coins..."
          />

          <ReusableSelect
            options={passOptions}
            value={pass}
            onChange={setPass}
            onToggle={() => handleToggle("pass")}
            isOpen={activeDropdown === "pass"}
          />

          <ReusableSelect
            options={allTypeOptions}
            value={allType}
            onChange={setAllType}
            onToggle={() => handleToggle("allType")}
            isOpen={activeDropdown === "allType"}
          />
        </div>
        <div className="mb-3 flex cursor-pointer items-center text-secondary underline sm:mb-4">
          <div className="icon mr-1 size-4!">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
            </svg>
          </div>
          Fiat deposit issues or disputes
        </div>
        <div className="flex flex-none justify-between rounded-xl px-4 py-3 mt-3 bg-input_bright">
          <div className="flex-1">Type</div>
          <div className="flex-1 text-center">Time</div>
          <div className="flex-1 text-center">Amount</div>
          <div className="flex-1 text-right">Balance</div>
        </div>
        <div className="grid grid-cols-1">
          <section className="py-10 text-center center flex-col col-span-full">
            <img
              className="w-48 h-48"
              src="https://bc.game/substation/bc/common/empty_w.png"
            />
            <div className="leading-5 mt-4">Stay tuned—something's coming!</div>
          </section>
        </div>
      </div>
    </div>
  );
}

