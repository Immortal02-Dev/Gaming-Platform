"use client";

import ViewInCurrencyModal from "@/components/shared/modals/ViewInCurrency";
import LanguageModal from "@/components/shared/modals/Language";

import { useState } from "react";

export default function SettingPreferences() {
  const [showViewInCurrencyModal, setShowViewInCurrencyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  return (
    <div className="w-full py-4 text-base sm:py-0">
      <div className="w-full bg-layer4 rounded-lg p-3 sm:py-4 sm:px-6">
        <div className="flex items-center h-11 border-b border-third pb-3">
          <span className="font-extrabold">Account Preferences</span>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">View in currency</span>
          <div className="ml-auto flex items-center flex-none">
            <button
              className="button button-m h-8 py-0 px-2 pb-0.5 setting-button"
              type="button"
              onClick={() => setShowViewInCurrencyModal(true)}
            >
              <img
                alt="coin"
                className="size-4"
                src="https://bc.game/coin/KRW.rect.png"
              />
              <span className="text-sm ml-1 font-semibold">KRW</span>
            </button>
            <div
              className="icon size-5! fill-secondary ml-1.5 cursor-pointer"
              onClick={() => setShowViewInCurrencyModal(true)}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6084 8.27708C21.3744 8.37616 22.0993 8.74507 22.7856 9.3814C23.4977 10.0419 23.8779 10.7757 23.927 11.582C23.9608 12.141 23.7522 12.6863 23.3535 13.0802L11.268 25.0416L5.94215 26.8813C5.60466 26.9981 5.23655 26.8193 5.11976 26.4818C5.07304 26.3449 5.07304 26.1967 5.11976 26.0589L6.95948 20.7331L18.9958 8.82079C19.4211 8.40113 20.0164 8.19976 20.6084 8.27708ZM24.6938 5.21061C25.6435 5.50381 26.399 6.22391 26.7389 7.15182L26.7913 7.30809C27.0966 8.29561 26.8316 9.37174 26.101 10.1039L25.9963 10.2086L25.8054 10.4003L25.5702 10.6355L25.4453 10.7588C25.3164 10.886 25.2415 10.9585 25.2206 10.9763C25.1167 11.0649 24.9516 11.0117 24.9443 10.8997C24.8767 9.82764 24.49 8.94403 23.7812 8.2497C23.0901 7.57229 22.2242 7.18002 21.1827 7.0745C21.0442 7.06 20.8162 7.00442 21.0506 6.75553C21.1287 6.67256 21.3374 6.46153 21.6773 6.12161L21.8972 5.90252C22.6285 5.17195 23.7047 4.90614 24.693 5.21142L24.6938 5.21061Z" />
              </svg>
            </div>

            {showViewInCurrencyModal && (
              <ViewInCurrencyModal
                onClose={() => setShowViewInCurrencyModal(false)}
              />
            )}
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">Change Language</span>
          <div className="ml-auto flex items-center flex-none">
            <button
              className="button button-m h-8 py-0 px-2 pb-0.5 setting-button"
              type="button"
              onClick={() => setShowLanguageModal(true)}
            >
              <span className="text-sm font-semibold">English</span>
            </button>
            <div
              className="icon size-5! fill-secondary ml-1.5 cursor-pointer"
              onClick={() => setShowLanguageModal(true)}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6084 8.27708C21.3744 8.37616 22.0993 8.74507 22.7856 9.3814C23.4977 10.0419 23.8779 10.7757 23.927 11.582C23.9608 12.141 23.7522 12.6863 23.3535 13.0802L11.268 25.0416L5.94215 26.8813C5.60466 26.9981 5.23655 26.8193 5.11976 26.4818C5.07304 26.3449 5.07304 26.1967 5.11976 26.0589L6.95948 20.7331L18.9958 8.82079C19.4211 8.40113 20.0164 8.19976 20.6084 8.27708ZM24.6938 5.21061C25.6435 5.50381 26.399 6.22391 26.7389 7.15182L26.7913 7.30809C27.0966 8.29561 26.8316 9.37174 26.101 10.1039L25.9963 10.2086L25.8054 10.4003L25.5702 10.6355L25.4453 10.7588C25.3164 10.886 25.2415 10.9585 25.2206 10.9763C25.1167 11.0649 24.9516 11.0117 24.9443 10.8997C24.8767 9.82764 24.49 8.94403 23.7812 8.2497C23.0901 7.57229 22.2242 7.18002 21.1827 7.0745C21.0442 7.06 20.8162 7.00442 21.0506 6.75553C21.1287 6.67256 21.3374 6.46153 21.6773 6.12161L21.8972 5.90252C22.6285 5.17195 23.7047 4.90614 24.693 5.21142L24.6938 5.21061Z" />
              </svg>
            </div>
            {showLanguageModal && (
              <LanguageModal onClose={() => setShowLanguageModal(false)} />
            )}
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Show full name of currency in Crypto list
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">Display mode</span>
          <div className="ml-auto flex items-center flex-none cursor-pointer">
            <div className="h-11 p-1 rounded-lg bg-layer5 relative flex">
              <div
                className="w-9 h-9 rounded-lg bg-layer6 absolute top-1 transition-all ease-out"
                style={{
                  left: "2.625rem",
                }}
              />
              <div className="w-9 h-9 center relative">
                <div className="icon size-5! fill-quarterary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4301 19.6621C18.7339 18.9421 14.2649 14.488 13.5284 8.86041L13.5217 8.79669C13.4696 8.37131 13.4398 7.87807 13.4398 7.37821C13.4398 6.64165 13.5044 5.92 13.6285 5.21903L13.6177 5.29352C13.626 5.24138 13.631 5.18179 13.631 5.12138C13.631 4.50234 13.1286 4 12.5096 4C12.378 4 12.2514 4.02234 12.1347 4.06455L12.1421 4.06207C7.48201 5.91338 4.2478 10.3832 4.2478 15.6086C4.2478 22.4519 9.79594 28 16.6393 28C21.3921 28 25.5201 25.3236 27.599 21.3959L27.6313 21.3288C27.7074 21.1823 27.7521 21.0094 27.7521 20.8257C27.7521 20.2149 27.2564 19.7192 26.6456 19.7192C26.6241 19.7192 26.6017 19.72 26.5802 19.7208H26.5835C26.3593 19.7357 26.0977 19.744 25.8346 19.744C25.3397 19.744 24.8514 19.7142 24.3722 19.6563L24.4301 19.6621Z" />
                  </svg>
                </div>
              </div>
              <div className="w-9 h-9 center ml-0.5 relative">
                <div className="icon size-5! fill-primary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9053 24.3657C10.9583 24.3699 11.0104 24.3841 11.0584 24.4083L13.1591 25.458C13.3675 25.5624 13.4547 25.8202 13.3529 26.0338C13.3293 26.0831 13.2967 26.1273 13.2576 26.164L10.9265 28.3303C10.7547 28.4897 10.4893 28.4764 10.3329 28.3003C10.2556 28.2127 10.2165 28.0967 10.2255 27.9799L10.4559 24.7638C10.473 24.5268 10.6741 24.3482 10.9053 24.3657ZM21.5024 24.6069C21.526 24.6561 21.5399 24.7095 21.5439 24.7638L21.7744 27.9799C21.7915 28.2169 21.6172 28.4238 21.386 28.4405C21.2712 28.4488 21.158 28.4088 21.0733 28.3303L18.7422 26.164C18.5704 26.0046 18.5574 25.7318 18.7129 25.5557C18.7487 25.5148 18.7919 25.4822 18.8399 25.458L20.9406 24.4083C21.149 24.304 21.4006 24.3924 21.5024 24.6069ZM15.9999 8.83009C20.1769 8.83009 23.5624 12.3007 23.5624 16.5816C23.5624 20.8625 20.176 24.3323 15.9991 24.3323C11.8222 24.3323 8.43581 20.8617 8.43581 16.5816C8.43581 12.3015 11.8222 8.83009 15.9991 8.83009H15.9999ZM25.5328 17.1825C25.5849 17.195 25.6346 17.2175 25.6777 17.2484L28.2612 19.0884C28.4518 19.2244 28.499 19.4923 28.3663 19.6876C28.3003 19.7844 28.1994 19.8495 28.0854 19.867L24.9759 20.3602C24.7463 20.3969 24.5321 20.2358 24.4963 20.0005C24.4882 19.9463 24.4898 19.8912 24.502 19.8378L25.028 17.5037C25.0801 17.2717 25.3056 17.1274 25.532 17.1808L25.5328 17.1825ZM6.90671 17.356C6.93683 17.4011 6.95882 17.4512 6.97103 17.5046L7.49702 19.8386C7.54913 20.0706 7.40827 20.3018 7.18191 20.3552C7.1298 20.3677 7.07607 20.3694 7.02314 20.361L3.91364 19.8678C3.68403 19.8311 3.52688 19.6116 3.56271 19.3763C3.58062 19.2595 3.64331 19.156 3.73776 19.0884L6.32128 17.2484C6.51181 17.1124 6.7748 17.1608 6.90671 17.356ZM26.0376 8.61312C26.0718 8.72578 26.0588 8.84761 26.0034 8.95025L24.4686 11.765C24.3554 11.9728 24.0998 12.047 23.897 11.931C23.8506 11.9043 23.8091 11.8685 23.7757 11.8259L22.3052 9.96415C22.1595 9.77973 22.1872 9.50852 22.3671 9.35832C22.4086 9.3241 22.4567 9.29823 22.5072 9.28154L25.5124 8.32773C25.7339 8.25763 25.9692 8.38447 26.0384 8.61145L26.0376 8.61312ZM6.4882 8.3294L9.49348 9.28321C9.71495 9.35331 9.83953 9.59448 9.77032 9.82229C9.75485 9.87486 9.72879 9.92326 9.69541 9.96582L8.22493 11.8276C8.07918 12.012 7.81456 12.0412 7.63381 11.891C7.59228 11.8568 7.55727 11.8142 7.53121 11.7666L5.99641 8.95192C5.88323 8.74414 5.9557 8.48211 6.15844 8.36611C6.25859 8.30853 6.37746 8.29602 6.48738 8.33107L6.4882 8.3294ZM16.1562 3.58868C16.2629 3.63208 16.3476 3.71886 16.3899 3.82818L17.5583 6.82231C17.6446 7.04345 17.5396 7.2938 17.3247 7.38225C17.275 7.40228 17.2221 7.41313 17.1683 7.41313H14.8315C14.5995 7.41313 14.4114 7.22036 14.4114 6.98254C14.4114 6.92746 14.422 6.87322 14.4415 6.82231L15.6099 3.82818C15.6962 3.60704 15.9405 3.50023 16.1562 3.58868Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-layer4 rounded-lg p-3 mt-3 sm:py-4 sm:px-6 sm:mt-4">
        <div className="flex items-center h-11 border-b border-third pb-3">
          <span className="font-extrabold">Privacy Preferences</span>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">Hide my gaming data on profile</span>
          <div className="ml-auto flex items-center flex-none">
            <div className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Hide my username from public lists
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">Refuse tip from strangers</span>
          <div className="ml-auto flex items-center flex-none">
            <div className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">Max profit alert</span>
          <div className="ml-auto flex items-center flex-none">
            <div aria-checked="true" className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-layer4 rounded-lg p-3 mt-3 sm:py-4 sm:px-6 sm:mt-4">
        <div className="flex items-center h-11 border-b border-third pb-3">
          <span className="font-extrabold">Email Notifications</span>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Receive deposit successful email
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div aria-checked="true" className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Receive withdraw successful email
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div aria-checked="true" className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-layer4 rounded-lg p-3 mt-3 sm:py-4 sm:px-6 sm:mt-4">
        <div className="flex items-center h-11 border-b border-third pb-3">
          <span className="font-extrabold">Marketing</span>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Receive marketing promotions by Email
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div aria-checked="true" className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center h-12 mt-3">
          <span className="font-semibold">
            Receive marketing promotions by SMS
          </span>
          <div className="ml-auto flex items-center flex-none">
            <div aria-checked="true" className="switch switch-xs">
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
