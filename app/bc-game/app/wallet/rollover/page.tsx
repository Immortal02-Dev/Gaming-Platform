"use client";

import { useState } from "react";
import ReusableSelect from "@/components/ui/dropdown/ReusableSelect";

export default function WalletRollover() {
  // This will control which one is open: 'allStatus', 'allType', or null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // States for selected values
  const [allStatus, setAllStatus] = useState("all-atatus");
  const [allType, setAllType] = useState("all-type");

  // Helper for toggling
  const handleToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const allStatusOptions = [
    { label: "All Status", value: "all-atatus" },
    { label: "Not Started", value: "not-started" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Done", value: "done" },
    { label: "Canceled/Fully Used", value: "canceled" },
    { label: "Expired", value: "expired" },
  ];

  const allTypeOptions = [
    { label: "All Type", value: "all-type" },
    { label: "Deposit", value: "deposit" },
    { label: "Bonus", value: "bonus" },
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
        <ReusableSelect
          options={allStatusOptions}
          value={allStatus}
          onChange={setAllStatus}
          isOpen={activeDropdown === "allStatus"}
          onToggle={() => handleToggle("allStatus")}
        />
        <ReusableSelect
          options={allTypeOptions}
          value={allType}
          onChange={setAllType}
          onToggle={() => handleToggle("allType")}
          isOpen={activeDropdown === "allType"}
        />
      </div>
      <div className="flex flex-none justify-between rounded-xl px-4 py-3 mt-3 bg-input_bright">
        <div className="flex-1">Type</div>
        <div className="flex-1 text-center">Time</div>
        <div className="flex-1 text-center">Amount</div>
        <div className="flex-1 text-right">Status</div>
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

