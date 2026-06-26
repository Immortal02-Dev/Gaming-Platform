"use client";

import { useState } from "react";
import ReusableSelect from "@/components/ui/dropdown/ReusableSelect";

export default function WalletBetHistory() {
  // This will control which one is open: 'category', 'coin', 'pass', or null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // States for selected values
  const [category, setCategory] = useState("all");
  const [coin, setCoin] = useState("All Assets");
  const [pass, setPass] = useState("pass-24-hours");

  // Helper for toggling
  const handleToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const gameOptions = [
    { label: "All", value: "all" },
    { label: "Original", value: "original" },
    { label: "Live", value: "live" },
    { label: "Sports", value: "sports" },
    { label: "Slots", value: "slots" },
    { label: "Horse", value: "horse" },
    { label: "Trading", value: "trading" },
    { label: "Lottery", value: "lottery" },
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

  return (
    <div className="sm:mx-0 rounded-xl flex-auto bg-layer4 lg:px-8">
      <div
        className="sticky z-10 grid gap-2 py-4 grid-cols-2 bg-inherit sm:grid-cols-3 top-15 [&>button]:bg-input_bright"
        style={
          {
            ["--offsetTop" as any]: "120px",
          } as React.CSSProperties
        }
      >
        {/* 1. Category Select */}
        <ReusableSelect
          options={gameOptions}
          value={category}
          onChange={setCategory}
          isOpen={activeDropdown === "category"}
          onToggle={() => handleToggle("category")}
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

        {/* 3. Pass Select */}
        <ReusableSelect
          options={passOptions}
          value={pass}
          onChange={setPass}
          isOpen={activeDropdown === "pass"}
          onToggle={() => handleToggle("pass")}
        />
      </div>
      <div className="flex flex-none justify-between rounded-xl px-4 py-3 mt-3 bg-input_bright">
        <div className="flex-1">Type</div>
        <div className="flex-1 text-center">Time</div>
        <div className="flex-1 text-center">Payout</div>
        <div className="flex-1 text-right">Profit</div>
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
  );
}

