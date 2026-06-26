"use client";

import { useState } from "react";
import ReusableSelectFull from "@/components/ui/dropdown/ReusableSelectFull";

export default function WalletWindrwaw() {
  // This will control which one is open: 'allStatus', 'allType', or null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // States for selected values
  const [selectedWallet, setSelectedWallet] = useState("krw");

  // Helper for toggling
  const handleToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const walletOptions = [
    {
      label: "ZAR",
      value: "zar",
      icon: "https://imgxcut.com/coin/ZAR.rect.png",
      balance: "0.00",
      category: "Cash",
    },
    {
      label: "KRW",
      value: "krw",
      icon: "https://imgxcut.com/coin/KRW.rect.png",
      balance: "0.00",
      category: "Cash",
    },
    {
      label: "ARS",
      value: "ars",
      icon: "https://imgxcut.com/coin/ARS.rect.png",
      balance: "0.00",
      category: "Cash",
    },

    {
      label: "CLP",
      value: "clp",
      icon: "https://imgxcut.com/coin/CLP.rect.png",
      balance: "0.00",
      category: "Cash",
    },
  ];

  return (
    <div className="page-container min-h-96 flex-1 rounded-xl">
      <div className="mt-1 rounded-xl bg-layer4 p-4 flex cursor-pointer items-center px-4 py-3 lg:px-8">
        <div className="flex h-full flex-none items-center overflow-hidden rounded-lg bg-layer3_alt">
          <div className="py-1">
            <img
              alt=""
              className="h-7 min-w-24"
              src="https://bc.game/modules/wallet2/assets/cwallet_w-CnOXM19u.png"
            />
          </div>
        </div>
        <div className="ml-2.5 mr-4 line-clamp-2">
          Connect Cwallet to earn bonus
        </div>
        <div className="icon ml-auto size-6! flex-none rotate-180 fill-secondary">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
          </svg>
        </div>
      </div>
      <div className="center relative flex px-3 py-1">
        <hr className="h-[.5px] flex-1 border-t-[0.5px] border-third" />
        <span className="mx-2 flex-none text-secondary">or</span>
        <hr className="h-[.5px] flex-1 border-t-[0.5px] border-third" />
      </div>
      <div className="mt-1 rounded-xl bg-layer4 p-4 lg:px-8">
        <div className="mb-1 text-secondary">Withdraw Currency</div>
        <ReusableSelectFull
          options={walletOptions}
          value={selectedWallet}
          onChange={setSelectedWallet}
          isOpen={activeDropdown === "wallet"}
          onToggle={() => handleToggle("wallet")}
          showSearch={true}
          placeholder="Search coins..."
        />
        <div className="mb-1 mt-5 text-secondary">Withdraw Method</div>
        <div className="rounded-xl bg-input_bright">
          <div className="divide-y divide-third px-4 @container p-2!">
            <div className="grid grid-cols-3 gap-x-1.5 gap-y-2 @[700px]:grid-cols-4">
              <div className="relative cursor-pointer overflow-hidden rounded-xl p-2 hover:opacity-90 border border-transparent bg-layer4">
                <div className="center absolute inset-0 flex size-full">
                  <div className="size-full rounded-lg bg-black_alpha20" />
                  <div className="absolute-center">
                    <div className="icon size-6! fill-alw_white">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.7363 24.8704C23.0324 24.8704 22.4627 24.299 22.4627 23.5935C22.4627 22.888 23.0333 22.3158 23.7363 22.3158C24.4402 22.3158 25.0099 22.888 25.0099 23.5935C25.0099 24.299 24.4394 24.8704 23.7363 24.8704ZM26.3616 21.0258C24.7571 19.5736 21.7268 16.7951 19.6522 14.8893C20.6104 12.1405 19.9946 8.96194 17.8023 6.76469C15.7607 4.7181 12.8694 4.04468 10.2663 4.73868L10.1173 5.14866L14.2714 9.31264L13.2457 13.1498L9.41756 14.178L5.19101 9.94078L4.79091 10.0873C4.01212 12.7456 4.6666 15.7373 6.7593 17.8341C8.94502 20.0247 12.103 20.6455 14.8403 19.6954C16.6877 21.7132 19.3805 24.6555 20.9858 26.414C22.3508 27.9082 24.8362 27.9296 26.4703 26.2617C28.0452 24.6539 27.7299 22.2615 26.3625 21.025L26.3616 21.0258Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="center relative rounded-lg bg-layer3_alt p-1">
                    <img
                      className="w-auto h-6 sm:h-9!"
                      alt="logo"
                      src="https://img2.distributedresourcestorage.com/fait/c6/45/b0/174675942443163.png"
                    />
                  </div>
                  <div className="ellipsis mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
