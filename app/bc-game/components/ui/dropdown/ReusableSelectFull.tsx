"use client";

import { useState } from "react";

interface Option {
  value: string;
  label: string;
  icon?: string;
  balance?: string; // Added: Para sa amount (e.g., "0.00")
  category?: string; // Added: Para sa sticky header (e.g., "Cash")
}

interface ReusableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  showSearch?: boolean;
  placeholder?: string;
}

const ReusableSelectFull = ({
  options,
  value,
  onChange,
  isOpen,
  onToggle,
  showSearch = false,
  placeholder = "Search",
}: ReusableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    onToggle();
    setSearchTerm("");
  };

  return (
    <div className="relative">
      {/* TRIGGER BUTTON */}
      <button
        className="button button-m not-full w-full border border-input bg-input_bright"
        type="button"
        onClick={onToggle}
      >
        {selectedOption?.icon && (
          <img src={selectedOption.icon} className="size-6!" alt="" />
        )}

        <div className="mx-2 text-base">
          {selectedOption?.label || "Select..."}
        </div>

        <div className="button-input center ml-auto size-6 rounded-lg bg-input_button">
          <div
            className={`icon size-4! transition-all ${isOpen ? "rotate-90" : "-rotate-90"}`}
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
            </svg>
          </div>
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="scroll-y dropdown-layer bg-layer3 min-h-[80vh] sm:min-h-100 w-full absolute top-12 left-1">
          <div className="scroll-container">
            {/* SEARCH BAR */}
            {showSearch && (
              <div className="sticky top-0 z-20 flex items-center justify-between pb-2 sm:pt-4 bg-layer3">
                <div className="input flex-auto text-base h-40">
                  <div className="icon size-6! fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z"></path>
                    </svg>
                  </div>
                  <input
                    className="bg-transparent border-none outline-none w-full"
                    placeholder={placeholder}
                    value={searchTerm}
                    autoFocus
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* OPTIONS LIST */}
            <div className="pb-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected = value === option.value;
                  const showHeader =
                    index === 0 ||
                    options[index - 1].category !== option.category;

                  return (
                    <div key={option.value}>
                      {/* STICKY HEADER (CASH / CRYPTO) */}
                      {showHeader && option.category && (
                        <div className="sticky z-10 py-2 font-extrabold leading-6 text-secondary bg-layer3 top-14 sm:top-16">
                          {option.category}
                        </div>
                      )}

                      <div
                        onClick={() => handleSelect(option.value)}
                        className={`mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! scroll-target bg-layer4 fix-light-hover ${
                          isSelected ? "darkness-3" : ""
                        }`}
                      >
                        {option.icon && (
                          <img
                            className="h-6 w-6 shrink-0"
                            src={option.icon}
                            alt=""
                          />
                        )}
                        <div className="ml-2">
                          <div className="flex items-center text-base font-extrabold">
                            {option.label}
                          </div>
                        </div>
                        {option.balance && (
                          <div className="text-seconday ml-auto text-right">
                            {option.label} {option.balance}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No results found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableSelectFull;
